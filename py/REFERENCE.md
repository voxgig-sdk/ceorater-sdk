# Ceorater Python SDK Reference

Complete API reference for the Ceorater Python SDK.


## CeoraterSDK

### Constructor

```python
from ceorater_sdk import CeoraterSDK

client = CeoraterSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CeoraterSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = CeoraterSDK.test()
```


### Instance Methods

#### `CeoPerformance(data=None)`

Create a new `CeoPerformanceEntity` instance. Pass `None` for no initial data.

#### `Company(data=None)`

Create a new `CompanyEntity` instance. Pass `None` for no initial data.

#### `CompensationEfficiency(data=None)`

Create a new `CompensationEfficiencyEntity` instance. Pass `None` for no initial data.

#### `General(data=None)`

Create a new `GeneralEntity` instance. Pass `None` for no initial data.

#### `GetRoot(data=None)`

Create a new `GetRootEntity` instance. Pass `None` for no initial data.

#### `Search(data=None)`

Create a new `SearchEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> tuple`

Make a direct HTTP request to any API endpoint. Returns `(result, err)`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `(result_dict, err)`

#### `prepare(fetchargs=None) -> tuple`

Prepare a fetch definition without sending. Returns `(fetchdef, err)`.


---

## CeoPerformanceEntity

```python
ceo_performance = client.CeoPerformance()
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.CeoPerformance().list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CeoPerformanceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CompanyEntity

```python
company = client.Company()
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Company().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Company().load({"id": "company_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CompanyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CompensationEfficiencyEntity

```python
compensation_efficiency = client.CompensationEfficiency()
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.CompensationEfficiency().list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CompensationEfficiencyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GeneralEntity

```python
general = client.General()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | ``$STRING`` | No |  |
| `timestamp` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.General().load({"id": "general_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GeneralEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GetRootEntity

```python
get_root = client.GetRoot()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `documentation` | ``$STRING`` | No |  |
| `message` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.GetRoot().load({"id": "get_root_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetRootEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SearchEntity

```python
search = client.Search()
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Search().list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = CeoraterSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

