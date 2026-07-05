# Ceorater Ruby SDK



The Ruby SDK for the Ceorater API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.CeoPerformance` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/ceorater-sdk/releases](https://github.com/voxgig-sdk/ceorater-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Ceorater_sdk"

client = CeoraterSDK.new
```

### 2. List ceoperformance records

```ruby
begin
  # list returns an Array of CeoPerformance records — iterate directly.
  ceoperformances = client.CeoPerformance.list
  ceoperformances.each do |item|
    puts "#{item["ceo_name"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  ceoperformances = client.CeoPerformance.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = CeoraterSDK.test

# Entity ops return the bare mock record (raises on error).
ceoperformance = client.CeoPerformance.list()
puts ceoperformance
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = CeoraterSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### CeoraterSDK

```ruby
require_relative "Ceorater_sdk"
client = CeoraterSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = CeoraterSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### CeoraterSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `CeoPerformance` | `(data) -> CeoPerformanceEntity` | Create a CeoPerformance entity instance. |
| `Company` | `(data) -> CompanyEntity` | Create a Company entity instance. |
| `CompensationEfficiency` | `(data) -> CompensationEfficiencyEntity` | Create a CompensationEfficiency entity instance. |
| `General` | `(data) -> GeneralEntity` | Create a General entity instance. |
| `GetRoot` | `(data) -> GetRootEntity` | Create a GetRoot entity instance. |
| `Search` | `(data) -> SearchEntity` | Create a Search entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `CeoraterError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### CeoPerformance

| Field | Description |
| --- | --- |
| `ceo_name` |  |
| `company_name` |  |
| `compensation` |  |
| `performance_score` |  |
| `tenure_year` |  |

Operations: List.

API path: `/metrics/ceo-performance`

#### Company

| Field | Description |
| --- | --- |
| `ceo_compensation` |  |
| `ceo_name` |  |
| `company_name` |  |
| `employee` |  |
| `headquarter` |  |
| `id` |  |
| `industry` |  |
| `performance_metric` |  |
| `revenue` |  |

Operations: List, Load.

API path: `/companies`

#### CompensationEfficiency

| Field | Description |
| --- | --- |
| `ceo_name` |  |
| `company_name` |  |
| `efficiency_ratio` |  |
| `performance_score` |  |
| `total_compensation` |  |

Operations: List.

API path: `/metrics/compensation-efficiency`

#### General

| Field | Description |
| --- | --- |
| `status` |  |
| `timestamp` |  |

Operations: Load.

API path: `/health`

#### GetRoot

| Field | Description |
| --- | --- |
| `documentation` |  |
| `message` |  |

Operations: Load.

API path: `/`

#### Search

| Field | Description |
| --- | --- |
| `ceo_compensation` |  |
| `ceo_name` |  |
| `company_name` |  |
| `employee` |  |
| `headquarter` |  |
| `id` |  |
| `industry` |  |
| `performance_metric` |  |
| `revenue` |  |

Operations: List.

API path: `/search`



## Entities


### CeoPerformance

Create an instance: `ceo_performance = client.CeoPerformance`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ceo_name` | `String` |  |
| `company_name` | `String` |  |
| `compensation` | `Float` |  |
| `performance_score` | `Float` |  |
| `tenure_year` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of CeoPerformance records (raises on error).
ceo_performances = client.CeoPerformance.list
```


### Company

Create an instance: `company = client.Company`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ceo_compensation` | `Float` |  |
| `ceo_name` | `String` |  |
| `company_name` | `String` |  |
| `employee` | `Integer` |  |
| `headquarter` | `String` |  |
| `id` | `String` |  |
| `industry` | `String` |  |
| `performance_metric` | `Hash` |  |
| `revenue` | `Float` |  |

#### Example: Load

```ruby
# load returns the bare Company record (raises on error).
company = client.Company.load({ "id" => "company_id" })
```

#### Example: List

```ruby
# list returns an Array of Company records (raises on error).
companys = client.Company.list
```


### CompensationEfficiency

Create an instance: `compensation_efficiency = client.CompensationEfficiency`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ceo_name` | `String` |  |
| `company_name` | `String` |  |
| `efficiency_ratio` | `Float` |  |
| `performance_score` | `Float` |  |
| `total_compensation` | `Float` |  |

#### Example: List

```ruby
# list returns an Array of CompensationEfficiency records (raises on error).
compensation_efficiencys = client.CompensationEfficiency.list
```


### General

Create an instance: `general = client.General`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `status` | `String` |  |
| `timestamp` | `String` |  |

#### Example: Load

```ruby
# load returns the bare General record (raises on error).
general = client.General.load()
```


### GetRoot

Create an instance: `get_root = client.GetRoot`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `documentation` | `String` |  |
| `message` | `String` |  |

#### Example: Load

```ruby
# load returns the bare GetRoot record (raises on error).
get_root = client.GetRoot.load()
```


### Search

Create an instance: `search = client.Search`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ceo_compensation` | `Float` |  |
| `ceo_name` | `String` |  |
| `company_name` | `String` |  |
| `employee` | `Integer` |  |
| `headquarter` | `String` |  |
| `id` | `String` |  |
| `industry` | `String` |  |
| `performance_metric` | `Hash` |  |
| `revenue` | `Float` |  |

#### Example: List

```ruby
# list returns an Array of Search records (raises on error).
searchs = client.Search.list
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Ceorater_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Ceorater_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
ceoperformance = client.CeoPerformance
ceoperformance.list()

# ceoperformance.data_get now returns the ceoperformance data from the last list
# ceoperformance.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
