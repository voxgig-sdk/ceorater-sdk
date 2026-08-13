# Ceorater Python SDK



The Python SDK for the Ceorater API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.CeoPerformance()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/ceorater-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from ceorater_sdk import CeoraterSDK

client = CeoraterSDK()
```

### 2. List ceoperformance records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    ceoperformances = client.CeoPerformance().list()
    for ceoperformance in ceoperformances:
        print(ceoperformance)
except Exception as err:
    print(f"list failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    general = client.General().load()
    print(general)
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = CeoraterSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
general = client.General().load()
# general contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = CeoraterSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### CeoraterSDK

```python
from ceorater_sdk import CeoraterSDK

client = CeoraterSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = CeoraterSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### CeoraterSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### CeoPerformance

| Field | Description |
| --- | --- |
| `ceo_name` |  |
| `company_name` |  |
| `compensation` |  |
| `performance_score` |  |
| `tenure_years` |  |

Operations: List.

API path: `/metrics/ceo-performance`

#### Company

| Field | Description |
| --- | --- |
| `ceo_compensation` |  |
| `ceo_name` |  |
| `company_name` |  |
| `efficiency_rating` |  |
| `employees` |  |
| `headquarters` |  |
| `id` |  |
| `industry` |  |
| `performance_metrics` |  |
| `performance_score` |  |
| `revenue` |  |
| `revenue_growth` |  |
| `stock_performance` |  |

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
| `employees` |  |
| `headquarters` |  |
| `id` |  |
| `industry` |  |
| `performance_metrics` |  |
| `revenue` |  |

Operations: List.

API path: `/search`



## Entities


### CeoPerformance

Create an instance: `ceo_performance = client.CeoPerformance()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ceo_name` | `str` |  |
| `company_name` | `str` |  |
| `compensation` | `float` |  |
| `performance_score` | `float` |  |
| `tenure_years` | `int` |  |

#### Example: List

```python
ceo_performances = client.CeoPerformance().list()
```


### Company

Create an instance: `company = client.Company()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ceo_compensation` | `float` |  |
| `ceo_name` | `str` |  |
| `company_name` | `str` |  |
| `efficiency_rating` | `float` |  |
| `employees` | `int` |  |
| `headquarters` | `str` |  |
| `id` | `str` |  |
| `industry` | `str` |  |
| `performance_metrics` | `dict` |  |
| `performance_score` | `float` |  |
| `revenue` | `float` |  |
| `revenue_growth` | `float` |  |
| `stock_performance` | `float` |  |

#### Example: Load

```python
company = client.Company().load({"id": "company_id"})
```

#### Example: List

```python
companys = client.Company().list()
```


### CompensationEfficiency

Create an instance: `compensation_efficiency = client.CompensationEfficiency()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ceo_name` | `str` |  |
| `company_name` | `str` |  |
| `efficiency_ratio` | `float` |  |
| `performance_score` | `float` |  |
| `total_compensation` | `float` |  |

#### Example: List

```python
compensation_efficiencys = client.CompensationEfficiency().list()
```


### General

Create an instance: `general = client.General()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `status` | `str` |  |
| `timestamp` | `str` |  |

#### Example: Load

```python
general = client.General().load()
```


### GetRoot

Create an instance: `get_root = client.GetRoot()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `documentation` | `str` |  |
| `message` | `str` |  |

#### Example: Load

```python
get_root = client.GetRoot().load()
```


### Search

Create an instance: `search = client.Search()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ceo_compensation` | `float` |  |
| `ceo_name` | `str` |  |
| `company_name` | `str` |  |
| `employees` | `int` |  |
| `headquarters` | `str` |  |
| `id` | `str` |  |
| `industry` | `str` |  |
| `performance_metrics` | `dict` |  |
| `revenue` | `float` |  |

#### Example: List

```python
searchs = client.Search().list()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── ceorater_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`ceorater_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
general = client.General()
general.load()

# general.data_get() now returns the general data from the last load
# general.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
