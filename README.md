# Ceorater SDK

Look up CEO performance metrics, compensation efficiency, and company data by stock ticker

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About CEORater API

CEORater API exposes CEO performance metrics, executive compensation efficiency, and related company information through a small HTTP interface. The service is hosted at `https://ceorater-api.onrender.com` and is catalogued on [Free Public APIs](https://freepublicapis.com/ceorater-api).

What you get from the API:

- Company lookup by stock ticker symbol (e.g. `AAPL`) via `GET /v1/company/{ticker}`.
- CEO performance metrics and compensation-efficiency figures bundled with the company response.
- A `format=raw` query parameter to request the unprocessed payload.

Operational notes: requests are authenticated with an `api_key` query parameter; a public demo key (`CEORATER_PUBLIC_V1`) is documented in the catalogue listing. CORS is enabled. The catalogue page notes the hosted instance has been intermittently unavailable, so expect transient errors against the public host.

## Try it

**TypeScript**
```bash
npm install ceorater
```

**Python**
```bash
pip install ceorater-sdk
```

**PHP**
```bash
composer require voxgig/ceorater-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/ceorater-sdk/go
```

**Ruby**
```bash
gem install ceorater-sdk
```

**Lua**
```bash
luarocks install ceorater-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { CeoraterSDK } from 'ceorater'

const client = new CeoraterSDK({})

// List all ceoperformances
const ceoperformances = await client.CeoPerformance().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o ceorater-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "ceorater": {
      "command": "/abs/path/to/ceorater-mcp"
    }
  }
}
```

## Entities

The API exposes 6 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **CeoPerformance** | CEO performance metrics returned as part of the company payload from `GET /v1/company/{ticker}`. | `/metrics/ceo-performance` |
| **Company** | Company record looked up by stock ticker via `GET /v1/company/{ticker}`. | `/companies` |
| **CompensationEfficiency** | Executive compensation-efficiency figures included in the company response. | `/metrics/compensation-efficiency` |
| **General** | Miscellaneous service-level operations exposed by the API. | `/health` |
| **GetRoot** | Root endpoint of the service, typically used for a service banner or health probe. | `/` |
| **Search** | Lookup operations for locating CEOs or companies in the dataset. | `/search` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from ceorater_sdk import CeoraterSDK

client = CeoraterSDK({})

# List all ceoperformances
ceoperformances, err = client.CeoPerformance(None).list(None, None)
```

### PHP

```php
<?php
require_once 'ceorater_sdk.php';

$client = new CeoraterSDK([]);

// List all ceoperformances
[$ceoperformances, $err] = $client->CeoPerformance(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/ceorater-sdk/go"

client := sdk.NewCeoraterSDK(map[string]any{})

// List all ceoperformances
ceoperformances, err := client.CeoPerformance(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Ceorater_sdk"

client = CeoraterSDK.new({})

# List all ceoperformances
ceoperformances, err = client.CeoPerformance(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("ceorater_sdk")

local client = sdk.new({})

-- List all ceoperformances
local ceoperformances, err = client:CeoPerformance(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = CeoraterSDK.test()
const result = await client.CeoPerformance().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = CeoraterSDK.test(None, None)
result, err = client.CeoPerformance(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = CeoraterSDK::test(null, null);
[$result, $err] = $client->CeoPerformance(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.CeoPerformance(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = CeoraterSDK.test(nil, nil)
result, err = client.CeoPerformance(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:CeoPerformance(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the CEORater API

- Upstream: [https://ceorater-api.onrender.com](https://ceorater-api.onrender.com)
- API docs: [https://freepublicapis.com/ceorater-api](https://freepublicapis.com/ceorater-api)

- No licence terms are published on the API endpoint or its catalogue page.
- A public demo API key (`CEORATER_PUBLIC_V1`) is documented for trial use; treat returned data as sample/demo only.
- Confirm permitted use with the CEORater operator before redistributing data.

---

Generated from the CEORater API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
