# Ceorater TypeScript SDK

The TypeScript SDK for the Ceorater API. Provides a type-safe, entity-oriented interface with full async/await support.


## Install
```bash
npm install ceorater
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { CeoraterSDK } from 'ceorater'

const client = new CeoraterSDK({
  apikey: process.env.CEORATER_APIKEY,
})
```

### 2. List ceoperformances

```ts
const result = await client.CeoPerformance().list()

if (result.ok) {
  for (const item of result.data) {
    console.log(item.id, item.name)
  }
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = CeoraterSDK.test()

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new CeoraterSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new CeoraterSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
CEORATER_TEST_LIVE=TRUE
CEORATER_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```


## Reference

### CeoraterSDK

#### Constructor

```ts
new CeoraterSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `CeoPerformance(data?)` | `CeoPerformanceEntity` | Create a CeoPerformance entity instance. |
| `Company(data?)` | `CompanyEntity` | Create a Company entity instance. |
| `CompensationEfficiency(data?)` | `CompensationEfficiencyEntity` | Create a CompensationEfficiency entity instance. |
| `General(data?)` | `GeneralEntity` | Create a General entity instance. |
| `GetRoot(data?)` | `GetRootEntity` | Create a GetRoot entity instance. |
| `Search(data?)` | `SearchEntity` | Create a Search entity instance. |
| `tester(testopts?, sdkopts?)` | `CeoraterSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `CeoraterSDK.test(testopts?, sdkopts?)` | `CeoraterSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): CeoraterSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### CeoPerformance

| Field | Description |
| --- | --- |
| `ceo_name` |  |
| `company_name` |  |
| `compensation` |  |
| `performance_score` |  |
| `tenure_year` |  |

Operations: list.

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

Operations: list, load.

API path: `/companies`

#### CompensationEfficiency

| Field | Description |
| --- | --- |
| `ceo_name` |  |
| `company_name` |  |
| `efficiency_ratio` |  |
| `performance_score` |  |
| `total_compensation` |  |

Operations: list.

API path: `/metrics/compensation-efficiency`

#### General

| Field | Description |
| --- | --- |
| `status` |  |
| `timestamp` |  |

Operations: load.

API path: `/health`

#### GetRoot

| Field | Description |
| --- | --- |
| `documentation` |  |
| `message` |  |

Operations: load.

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

Operations: list.

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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
ceorater/
├── src/
│   ├── CeoraterSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { CeoraterSDK } from 'ceorater'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
