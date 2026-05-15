# Ceorater Golang SDK Reference

Complete API reference for the Ceorater Golang SDK.


## CeoraterSDK

### Constructor

```go
func NewCeoraterSDK(options map[string]any) *CeoraterSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TestSDK(testopts, sdkopts map[string]any) *CeoraterSDK`

Create a test client with mock features active. Both arguments may be `nil`.

```go
client := sdk.TestSDK(nil, nil)
```


### Instance Methods

#### `CeoPerformance(data map[string]any) CeoraterEntity`

Create a new `CeoPerformance` entity instance. Pass `nil` for no initial data.

#### `Company(data map[string]any) CeoraterEntity`

Create a new `Company` entity instance. Pass `nil` for no initial data.

#### `CompensationEfficiency(data map[string]any) CeoraterEntity`

Create a new `CompensationEfficiency` entity instance. Pass `nil` for no initial data.

#### `General(data map[string]any) CeoraterEntity`

Create a new `General` entity instance. Pass `nil` for no initial data.

#### `GetRoot(data map[string]any) CeoraterEntity`

Create a new `GetRoot` entity instance. Pass `nil` for no initial data.

#### `Search(data map[string]any) CeoraterEntity`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## CeoPerformanceEntity

```go
ceo_performance := client.CeoPerformance(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ceo_name` | ``$STRING`` | No |  |
| `company_name` | ``$STRING`` | No |  |
| `compensation` | ``$NUMBER`` | No |  |
| `performance_score` | ``$NUMBER`` | No |  |
| `tenure_year` | ``$INTEGER`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.CeoPerformance(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CeoPerformanceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CompanyEntity

```go
company := client.Company(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ceo_compensation` | ``$NUMBER`` | No |  |
| `ceo_name` | ``$STRING`` | No |  |
| `company_name` | ``$STRING`` | No |  |
| `employee` | ``$INTEGER`` | No |  |
| `headquarter` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `industry` | ``$STRING`` | No |  |
| `performance_metric` | ``$OBJECT`` | No |  |
| `revenue` | ``$NUMBER`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Company(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Company(nil).Load(map[string]any{"id": "company_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CompanyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CompensationEfficiencyEntity

```go
compensation_efficiency := client.CompensationEfficiency(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ceo_name` | ``$STRING`` | No |  |
| `company_name` | ``$STRING`` | No |  |
| `efficiency_ratio` | ``$NUMBER`` | No |  |
| `performance_score` | ``$NUMBER`` | No |  |
| `total_compensation` | ``$NUMBER`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.CompensationEfficiency(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CompensationEfficiencyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GeneralEntity

```go
general := client.General(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | ``$STRING`` | No |  |
| `timestamp` | ``$STRING`` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.General(nil).Load(map[string]any{"id": "general_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GeneralEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GetRootEntity

```go
get_root := client.GetRoot(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `documentation` | ``$STRING`` | No |  |
| `message` | ``$STRING`` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.GetRoot(nil).Load(map[string]any{"id": "get_root_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GetRootEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SearchEntity

```go
search := client.Search(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ceo_compensation` | ``$NUMBER`` | No |  |
| `ceo_name` | ``$STRING`` | No |  |
| `company_name` | ``$STRING`` | No |  |
| `employee` | ``$INTEGER`` | No |  |
| `headquarter` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `industry` | ``$STRING`` | No |  |
| `performance_metric` | ``$OBJECT`` | No |  |
| `revenue` | ``$NUMBER`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Search(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewCeoraterSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

