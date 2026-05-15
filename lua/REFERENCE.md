# Ceorater Lua SDK Reference

Complete API reference for the Ceorater Lua SDK.


## CeoraterSDK

### Constructor

```lua
local sdk = require("ceorater_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts, sdkopts)`

Create a test client with mock features active. Both arguments may be `nil`.

```lua
local client = sdk.test(nil, nil)
```


### Instance Methods

#### `CeoPerformance(data)`

Create a new `CeoPerformance` entity instance. Pass `nil` for no initial data.

#### `Company(data)`

Create a new `Company` entity instance. Pass `nil` for no initial data.

#### `CompensationEfficiency(data)`

Create a new `CompensationEfficiency` entity instance. Pass `nil` for no initial data.

#### `General(data)`

Create a new `General` entity instance. Pass `nil` for no initial data.

#### `GetRoot(data)`

Create a new `GetRoot` entity instance. Pass `nil` for no initial data.

#### `Search(data)`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## CeoPerformanceEntity

```lua
local ceo_performance = client:CeoPerformance(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:CeoPerformance(nil):list(nil, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CeoPerformanceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CompanyEntity

```lua
local company = client:Company(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Company(nil):list(nil, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Company(nil):load({ id = "company_id" }, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CompanyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CompensationEfficiencyEntity

```lua
local compensation_efficiency = client:CompensationEfficiency(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:CompensationEfficiency(nil):list(nil, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CompensationEfficiencyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GeneralEntity

```lua
local general = client:General(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | ``$STRING`` | No |  |
| `timestamp` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:General(nil):load({ id = "general_id" }, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GeneralEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GetRootEntity

```lua
local get_root = client:GetRoot(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `documentation` | ``$STRING`` | No |  |
| `message` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:GetRoot(nil):load({ id = "get_root_id" }, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetRootEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SearchEntity

```lua
local search = client:Search(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Search(nil):list(nil, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

