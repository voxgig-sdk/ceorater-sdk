# Ceorater Ruby SDK Reference

Complete API reference for the Ceorater Ruby SDK.


## CeoraterSDK

### Constructor

```ruby
require_relative 'ceorater_sdk'

client = CeoraterSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CeoraterSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = CeoraterSDK.test
```


### Instance Methods

#### `CeoPerformance(data = nil)`

Create a new `CeoPerformance` entity instance. Pass `nil` for no initial data.

#### `Company(data = nil)`

Create a new `Company` entity instance. Pass `nil` for no initial data.

#### `CompensationEfficiency(data = nil)`

Create a new `CompensationEfficiency` entity instance. Pass `nil` for no initial data.

#### `General(data = nil)`

Create a new `General` entity instance. Pass `nil` for no initial data.

#### `GetRoot(data = nil)`

Create a new `GetRoot` entity instance. Pass `nil` for no initial data.

#### `Search(data = nil)`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash, err`

#### `prepare(fetchargs = {}) -> Hash, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Hash, err`


---

## CeoPerformanceEntity

```ruby
ceo_performance = client.CeoPerformance
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

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.CeoPerformance.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CeoPerformanceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CompanyEntity

```ruby
company = client.Company
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

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Company.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.Company.load({ "id" => "company_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CompanyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CompensationEfficiencyEntity

```ruby
compensation_efficiency = client.CompensationEfficiency
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

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.CompensationEfficiency.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CompensationEfficiencyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GeneralEntity

```ruby
general = client.General
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | ``$STRING`` | No |  |
| `timestamp` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.General.load({ "id" => "general_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GeneralEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GetRootEntity

```ruby
get_root = client.GetRoot
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `documentation` | ``$STRING`` | No |  |
| `message` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.GetRoot.load({ "id" => "get_root_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GetRootEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SearchEntity

```ruby
search = client.Search
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

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.Search.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = CeoraterSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

