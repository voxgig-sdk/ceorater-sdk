# Ceorater PHP SDK Reference

Complete API reference for the Ceorater PHP SDK.


## CeoraterSDK

### Constructor

```php
require_once __DIR__ . '/ceorater_sdk.php';

$client = new CeoraterSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CeoraterSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = CeoraterSDK::test();
```


### Instance Methods

#### `CeoPerformance($data = null)`

Create a new `CeoPerformanceEntity` instance. Pass `null` for no initial data.

#### `Company($data = null)`

Create a new `CompanyEntity` instance. Pass `null` for no initial data.

#### `CompensationEfficiency($data = null)`

Create a new `CompensationEfficiencyEntity` instance. Pass `null` for no initial data.

#### `General($data = null)`

Create a new `GeneralEntity` instance. Pass `null` for no initial data.

#### `GetRoot($data = null)`

Create a new `GetRootEntity` instance. Pass `null` for no initial data.

#### `Search($data = null)`

Create a new `SearchEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## CeoPerformanceEntity

```php
$ceo_performance = $client->CeoPerformance();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->CeoPerformance()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CeoPerformanceEntity`

Create a new `CeoPerformanceEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CompanyEntity

```php
$company = $client->Company();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Company()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Company()->load(["id" => "company_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CompanyEntity`

Create a new `CompanyEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CompensationEfficiencyEntity

```php
$compensation_efficiency = $client->CompensationEfficiency();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->CompensationEfficiency()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CompensationEfficiencyEntity`

Create a new `CompensationEfficiencyEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GeneralEntity

```php
$general = $client->General();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | ``$STRING`` | No |  |
| `timestamp` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->General()->load(["id" => "general_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GeneralEntity`

Create a new `GeneralEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GetRootEntity

```php
$get_root = $client->GetRoot();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `documentation` | ``$STRING`` | No |  |
| `message` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->GetRoot()->load(["id" => "get_root_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GetRootEntity`

Create a new `GetRootEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SearchEntity

```php
$search = $client->Search();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Search()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SearchEntity`

Create a new `SearchEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new CeoraterSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

