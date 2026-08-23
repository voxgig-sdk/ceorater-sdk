# Ceorater Golang SDK



The Golang SDK for the Ceorater API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.CeoPerformance(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/ceorater-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/ceorater-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/ceorater-sdk/go=../ceorater-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/ceorater-sdk/go"
)

func main() {
    client := sdk.New()

    // List ceoPerformance records — the value is the array of records itself.
    ceoPerformances, err := client.CeoPerformance(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range ceoPerformances.([]any) {
        fmt.Println(item)
    }
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
general, err := client.General(nil).Load(nil, nil)
if err != nil {
    // handle err
    return
}
_ = general
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

general, err := client.General(nil).Load(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(general) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewCeoraterSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
CEORATER_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewCeoraterSDK

```go
func NewCeoraterSDK(options map[string]any) *CeoraterSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *CeoraterSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### CeoraterSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `CeoPerformance` | `(data map[string]any) CeoraterEntity` | Create a CeoPerformance entity instance. |
| `Company` | `(data map[string]any) CeoraterEntity` | Create a Company entity instance. |
| `CompensationEfficiency` | `(data map[string]any) CeoraterEntity` | Create a CompensationEfficiency entity instance. |
| `General` | `(data map[string]any) CeoraterEntity` | Create a General entity instance. |
| `GetRoot` | `(data map[string]any) CeoraterEntity` | Create a GetRoot entity instance. |
| `Search` | `(data map[string]any) CeoraterEntity` | Create a Search entity instance. |

### Entity interface (CeoraterEntity)

All entities implement the `CeoraterEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    ceoPerformance, err := client.CeoPerformance(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // ceoPerformance is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### CeoPerformance

| Field | Description |
| --- | --- |
| `"ceo_name"` |  |
| `"company_name"` |  |
| `"compensation"` |  |
| `"performance_score"` |  |
| `"tenure_years"` |  |

Operations: List.

API path: `/metrics/ceo-performance`

#### Company

| Field | Description |
| --- | --- |
| `"ceo_compensation"` | Total CEO compensation |
| `"ceo_name"` | Name of the CEO |
| `"company_name"` | Name of the company |
| `"efficiency_rating"` | Compensation efficiency rating |
| `"employees"` | Number of employees |
| `"headquarters"` | Company headquarters location |
| `"id"` | Unique identifier for the company |
| `"industry"` | Industry sector |
| `"performance_metrics"` |  |
| `"performance_score"` | Overall performance score |
| `"revenue"` | Annual revenue |
| `"revenue_growth"` | Revenue growth percentage |
| `"stock_performance"` | Stock performance percentage |

Operations: List, Load.

API path: `/companies`

#### CompensationEfficiency

| Field | Description |
| --- | --- |
| `"ceo_name"` |  |
| `"company_name"` |  |
| `"efficiency_ratio"` | Performance per compensation dollar |
| `"performance_score"` |  |
| `"total_compensation"` |  |

Operations: List.

API path: `/metrics/compensation-efficiency`

#### General

| Field | Description |
| --- | --- |
| `"status"` |  |
| `"timestamp"` |  |

Operations: Load.

API path: `/health`

#### GetRoot

| Field | Description |
| --- | --- |
| `"documentation"` |  |
| `"message"` |  |

Operations: Load.

API path: `/`

#### Search

| Field | Description |
| --- | --- |
| `"ceo_compensation"` | Total CEO compensation |
| `"ceo_name"` | Name of the CEO |
| `"company_name"` | Name of the company |
| `"employees"` | Number of employees |
| `"headquarters"` | Company headquarters location |
| `"id"` | Unique identifier for the company |
| `"industry"` | Industry sector |
| `"performance_metrics"` |  |
| `"revenue"` | Annual revenue |

Operations: List.

API path: `/search`



## Entities


### CeoPerformance

Create an instance: `ceoPerformance := client.CeoPerformance(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ceo_name` | `string` |  |
| `company_name` | `string` |  |
| `compensation` | `float64` |  |
| `performance_score` | `float64` |  |
| `tenure_years` | `int` |  |

#### Example: List

```go
ceoPerformances, err := client.CeoPerformance(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(ceoPerformances) // the array of records
```


### Company

Create an instance: `company := client.Company(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ceo_compensation` | `float64` | Total CEO compensation |
| `ceo_name` | `string` | Name of the CEO |
| `company_name` | `string` | Name of the company |
| `efficiency_rating` | `float64` | Compensation efficiency rating |
| `employees` | `int` | Number of employees |
| `headquarters` | `string` | Company headquarters location |
| `id` | `string` | Unique identifier for the company |
| `industry` | `string` | Industry sector |
| `performance_metrics` | `map[string]any` |  |
| `performance_score` | `float64` | Overall performance score |
| `revenue` | `float64` | Annual revenue |
| `revenue_growth` | `float64` | Revenue growth percentage |
| `stock_performance` | `float64` | Stock performance percentage |

#### Example: Load

```go
company, err := client.Company(nil).Load(map[string]any{"id": "company_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(company) // the loaded record
```

#### Example: List

```go
companys, err := client.Company(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(companys) // the array of records
```


### CompensationEfficiency

Create an instance: `compensationEfficiency := client.CompensationEfficiency(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ceo_name` | `string` |  |
| `company_name` | `string` |  |
| `efficiency_ratio` | `float64` | Performance per compensation dollar |
| `performance_score` | `float64` |  |
| `total_compensation` | `float64` |  |

#### Example: List

```go
compensationEfficiencys, err := client.CompensationEfficiency(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(compensationEfficiencys) // the array of records
```


### General

Create an instance: `general := client.General(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `status` | `string` |  |
| `timestamp` | `string` |  |

#### Example: Load

```go
general, err := client.General(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(general) // the loaded record
```


### GetRoot

Create an instance: `getRoot := client.GetRoot(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `documentation` | `string` |  |
| `message` | `string` |  |

#### Example: Load

```go
getRoot, err := client.GetRoot(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(getRoot) // the loaded record
```


### Search

Create an instance: `search := client.Search(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ceo_compensation` | `float64` | Total CEO compensation |
| `ceo_name` | `string` | Name of the CEO |
| `company_name` | `string` | Name of the company |
| `employees` | `int` | Number of employees |
| `headquarters` | `string` | Company headquarters location |
| `id` | `string` | Unique identifier for the company |
| `industry` | `string` | Industry sector |
| `performance_metrics` | `map[string]any` |  |
| `revenue` | `float64` | Annual revenue |

#### Example: List

```go
searchs, err := client.Search(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(searchs) // the array of records
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/ceorater-sdk/go/
├── ceorater.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/ceorater-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
general := client.General(nil)
general.Load(nil, nil)

// general.Data() now returns the general data from the last load
// general.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
