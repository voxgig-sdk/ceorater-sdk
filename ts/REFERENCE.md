# Ceorater TypeScript SDK Reference

Complete API reference for the Ceorater TypeScript SDK.


## CeoraterSDK

### Constructor

```ts
new CeoraterSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CeoraterSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = CeoraterSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `CeoraterSDK` instance in test mode.


### Instance Methods

#### `CeoPerformance(data?: object)`

Create a new `CeoPerformance` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CeoPerformanceEntity` instance.

#### `Company(data?: object)`

Create a new `Company` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CompanyEntity` instance.

#### `CompensationEfficiency(data?: object)`

Create a new `CompensationEfficiency` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CompensationEfficiencyEntity` instance.

#### `General(data?: object)`

Create a new `General` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GeneralEntity` instance.

#### `GetRoot(data?: object)`

Create a new `GetRoot` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GetRootEntity` instance.

#### `Search(data?: object)`

Create a new `Search` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SearchEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `CeoraterSDK.test()`.

**Returns:** `CeoraterSDK` instance in test mode.


---

## CeoPerformanceEntity

```ts
const ceo_performance = client.CeoPerformance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ceo_name` | `string` | No |  |
| `company_name` | `string` | No |  |
| `compensation` | `number` | No |  |
| `performance_score` | `number` | No |  |
| `tenure_years` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.CeoPerformance().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CeoPerformanceEntity` instance with the same client and
options.

#### `client()`

Return the parent `CeoraterSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CompanyEntity

```ts
const company = client.Company()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ceo_compensation` | `number` | No | Total CEO compensation |
| `ceo_name` | `string` | No | Name of the CEO |
| `company_name` | `string` | No | Name of the company |
| `efficiency_rating` | `number` | No | Compensation efficiency rating |
| `employees` | `number` | No | Number of employees |
| `headquarters` | `string` | No | Company headquarters location |
| `id` | `string` | No | Unique identifier for the company |
| `industry` | `string` | No | Industry sector |
| `performance_metrics` | `Record<string, any>` | No |  |
| `performance_score` | `number` | No | Overall performance score |
| `revenue` | `number` | No | Annual revenue |
| `revenue_growth` | `number` | No | Revenue growth percentage |
| `stock_performance` | `number` | No | Stock performance percentage |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Company().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Company().load({ id: 'company_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CompanyEntity` instance with the same client and
options.

#### `client()`

Return the parent `CeoraterSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CompensationEfficiencyEntity

```ts
const compensation_efficiency = client.CompensationEfficiency()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ceo_name` | `string` | No |  |
| `company_name` | `string` | No |  |
| `efficiency_ratio` | `number` | No | Performance per compensation dollar |
| `performance_score` | `number` | No |  |
| `total_compensation` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.CompensationEfficiency().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CompensationEfficiencyEntity` instance with the same client and
options.

#### `client()`

Return the parent `CeoraterSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GeneralEntity

```ts
const general = client.General()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | `string` | No |  |
| `timestamp` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.General().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GeneralEntity` instance with the same client and
options.

#### `client()`

Return the parent `CeoraterSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GetRootEntity

```ts
const get_root = client.GetRoot()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `documentation` | `string` | No |  |
| `message` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GetRoot().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GetRootEntity` instance with the same client and
options.

#### `client()`

Return the parent `CeoraterSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SearchEntity

```ts
const search = client.Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ceo_compensation` | `number` | No | Total CEO compensation |
| `ceo_name` | `string` | No | Name of the CEO |
| `company_name` | `string` | No | Name of the company |
| `employees` | `number` | No | Number of employees |
| `headquarters` | `string` | No | Company headquarters location |
| `id` | `string` | No | Unique identifier for the company |
| `industry` | `string` | No | Industry sector |
| `performance_metrics` | `Record<string, any>` | No |  |
| `revenue` | `number` | No | Annual revenue |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Search().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SearchEntity` instance with the same client and
options.

#### `client()`

Return the parent `CeoraterSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new CeoraterSDK({
  feature: {
    test: { active: true },
  }
})
```

