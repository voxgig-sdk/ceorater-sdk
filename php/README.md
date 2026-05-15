# Ceorater PHP SDK

The PHP SDK for the Ceorater API. Provides an entity-oriented interface using PHP conventions.


## Install
```bash
composer require voxgig/ceorater-sdk
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'ceorater_sdk.php';

$client = new CeoraterSDK([
    "apikey" => getenv("CEORATER_APIKEY"),
]);
```

### 2. List ceoperformances

```php
[$result, $err] = $client->CeoPerformance(null)->list(null, null);
if ($err) { throw new \Exception($err); }

if (is_array($result)) {
    foreach ($result as $item) {
        $d = $item->data_get();
        echo $d["id"] . " " . $d["name"] . "\n";
    }
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
if ($err) { throw new \Exception($err); }

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
}
```

### Prepare a request without sending it

```php
[$fetchdef, $err] = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);
if ($err) { throw new \Exception($err); }

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = CeoraterSDK::test(null, null);

[$result, $err] = $client->Ceorater(null)->load(
    ["id" => "test01"], null
);
// $result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new CeoraterSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
CEORATER_TEST_LIVE=TRUE
CEORATER_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### CeoraterSDK

```php
require_once 'ceorater_sdk.php';
$client = new CeoraterSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = CeoraterSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### CeoraterSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `CeoPerformance` | `($data): CeoPerformanceEntity` | Create a CeoPerformance entity instance. |
| `Company` | `($data): CompanyEntity` | Create a Company entity instance. |
| `CompensationEfficiency` | `($data): CompensationEfficiencyEntity` | Create a CompensationEfficiency entity instance. |
| `General` | `($data): GeneralEntity` | Create a General entity instance. |
| `GetRoot` | `($data): GetRootEntity` | Create a GetRoot entity instance. |
| `Search` | `($data): SearchEntity` | Create a Search entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return `[$result, $err]`. The first value is an
`array` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `const ceo_performance = client.CeoPerformance()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ceo_name` | ``$STRING`` |  |
| `company_name` | ``$STRING`` |  |
| `compensation` | ``$NUMBER`` |  |
| `performance_score` | ``$NUMBER`` |  |
| `tenure_year` | ``$INTEGER`` |  |

#### Example: List

```ts
const ceo_performances = await client.CeoPerformance().list()
```


### Company

Create an instance: `const company = client.Company()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ceo_compensation` | ``$NUMBER`` |  |
| `ceo_name` | ``$STRING`` |  |
| `company_name` | ``$STRING`` |  |
| `employee` | ``$INTEGER`` |  |
| `headquarter` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `industry` | ``$STRING`` |  |
| `performance_metric` | ``$OBJECT`` |  |
| `revenue` | ``$NUMBER`` |  |

#### Example: Load

```ts
const company = await client.Company().load({ id: 'company_id' })
```

#### Example: List

```ts
const companys = await client.Company().list()
```


### CompensationEfficiency

Create an instance: `const compensation_efficiency = client.CompensationEfficiency()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ceo_name` | ``$STRING`` |  |
| `company_name` | ``$STRING`` |  |
| `efficiency_ratio` | ``$NUMBER`` |  |
| `performance_score` | ``$NUMBER`` |  |
| `total_compensation` | ``$NUMBER`` |  |

#### Example: List

```ts
const compensation_efficiencys = await client.CompensationEfficiency().list()
```


### General

Create an instance: `const general = client.General()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `status` | ``$STRING`` |  |
| `timestamp` | ``$STRING`` |  |

#### Example: Load

```ts
const general = await client.General().load({ id: 'general_id' })
```


### GetRoot

Create an instance: `const get_root = client.GetRoot()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `documentation` | ``$STRING`` |  |
| `message` | ``$STRING`` |  |

#### Example: Load

```ts
const get_root = await client.GetRoot().load({ id: 'get_root_id' })
```


### Search

Create an instance: `const search = client.Search()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ceo_compensation` | ``$NUMBER`` |  |
| `ceo_name` | ``$STRING`` |  |
| `company_name` | ``$STRING`` |  |
| `employee` | ``$INTEGER`` |  |
| `headquarter` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `industry` | ``$STRING`` |  |
| `performance_metric` | ``$OBJECT`` |  |
| `revenue` | ``$NUMBER`` |  |

#### Example: List

```ts
const searchs = await client.Search().list()
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── ceorater_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`ceorater_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$moon = $client->Moon();
[$result, $err] = $moon->load(["planet_id" => "earth", "id" => "luna"]);

// $moon->dataGet() now returns the loaded moon data
// $moon->matchGet() returns the last match criteria
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
