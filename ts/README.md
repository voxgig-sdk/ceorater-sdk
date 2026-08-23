# Ceorater TypeScript SDK



The TypeScript SDK for the Ceorater API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.CeoPerformance()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/ceorater-sdk/releases](https://github.com/voxgig-sdk/ceorater-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { CeoraterSDK } from '@voxgig-sdk/ceorater'

const client = new CeoraterSDK()
```

### 2. List ceoperformance records

`list()` resolves to an array of CeoPerformance ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const ceoperformances = await client.CeoPerformance().list()

for (const ceoperformance of ceoperformances) {
  console.log(ceoperformance)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const general = await client.General().load()
  console.log(general)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
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

if (result instanceof Error) {
  throw result
}
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

const general = await client.General().load()
// general is the entity, populated with mock response data
// — call general.data() for the record itself
console.log(general)
```

You can also use the instance method:

```ts
const client = new CeoraterSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.General()

// First call runs the operation and stores its result
await entity.load()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
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
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
CEORATER_TEST_LIVE=TRUE
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
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
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
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): CeoraterSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

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
| `tenure_years` |  |

Operations: list.

API path: `/metrics/ceo-performance`

#### Company

| Field | Description |
| --- | --- |
| `ceo_compensation` | Total CEO compensation |
| `ceo_name` | Name of the CEO |
| `company_name` | Name of the company |
| `efficiency_rating` | Compensation efficiency rating |
| `employees` | Number of employees |
| `headquarters` | Company headquarters location |
| `id` | Unique identifier for the company |
| `industry` | Industry sector |
| `performance_metrics` |  |
| `performance_score` | Overall performance score |
| `revenue` | Annual revenue |
| `revenue_growth` | Revenue growth percentage |
| `stock_performance` | Stock performance percentage |

Operations: list, load.

API path: `/companies`

#### CompensationEfficiency

| Field | Description |
| --- | --- |
| `ceo_name` |  |
| `company_name` |  |
| `efficiency_ratio` | Performance per compensation dollar |
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
| `ceo_compensation` | Total CEO compensation |
| `ceo_name` | Name of the CEO |
| `company_name` | Name of the company |
| `employees` | Number of employees |
| `headquarters` | Company headquarters location |
| `id` | Unique identifier for the company |
| `industry` | Industry sector |
| `performance_metrics` |  |
| `revenue` | Annual revenue |

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
| `ceo_name` | `string` |  |
| `company_name` | `string` |  |
| `compensation` | `number` |  |
| `performance_score` | `number` |  |
| `tenure_years` | `number` |  |

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
| `ceo_compensation` | `number` | Total CEO compensation |
| `ceo_name` | `string` | Name of the CEO |
| `company_name` | `string` | Name of the company |
| `efficiency_rating` | `number` | Compensation efficiency rating |
| `employees` | `number` | Number of employees |
| `headquarters` | `string` | Company headquarters location |
| `id` | `string` | Unique identifier for the company |
| `industry` | `string` | Industry sector |
| `performance_metrics` | `Record<string, any>` |  |
| `performance_score` | `number` | Overall performance score |
| `revenue` | `number` | Annual revenue |
| `revenue_growth` | `number` | Revenue growth percentage |
| `stock_performance` | `number` | Stock performance percentage |

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
| `ceo_name` | `string` |  |
| `company_name` | `string` |  |
| `efficiency_ratio` | `number` | Performance per compensation dollar |
| `performance_score` | `number` |  |
| `total_compensation` | `number` |  |

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
| `status` | `string` |  |
| `timestamp` | `string` |  |

#### Example: Load

```ts
const general = await client.General().load()
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
| `documentation` | `string` |  |
| `message` | `string` |  |

#### Example: Load

```ts
const get_root = await client.GetRoot().load()
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
| `ceo_compensation` | `number` | Total CEO compensation |
| `ceo_name` | `string` | Name of the CEO |
| `company_name` | `string` | Name of the company |
| `employees` | `number` | Number of employees |
| `headquarters` | `string` | Company headquarters location |
| `id` | `string` | Unique identifier for the company |
| `industry` | `string` | Industry sector |
| `performance_metrics` | `Record<string, any>` |  |
| `revenue` | `number` | Annual revenue |

#### Example: List

```ts
const searchs = await client.Search().list()
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
import { CeoraterSDK } from '@voxgig-sdk/ceorater'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const general = client.General()
await general.load()

// general.data() now returns the general data from the last `load`
// general.match() returns the last match criteria
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
