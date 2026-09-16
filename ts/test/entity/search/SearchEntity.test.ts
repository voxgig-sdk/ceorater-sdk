

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CeoraterSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('SearchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CEORATER_TEST_LIVE=TRUE.
  afterEach(liveDelay('CEORATER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CeoraterSDK.test()
    const ent = testsdk.Search()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CEORATER_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'search.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"double","name":"ceo_compensation","req":false,"short":"Total CEO compensation","type":"`$NUMBER`","index$":0},{"active":true,"name":"ceo_name","req":false,"short":"Name of the CEO","type":"`$STRING`","index$":1},{"active":true,"name":"company_name","req":false,"short":"Name of the company","type":"`$STRING`","index$":2},{"active":true,"name":"employees","req":false,"short":"Number of employees","type":"`$INTEGER`","index$":3},{"active":true,"name":"headquarters","req":false,"short":"Company headquarters location","type":"`$STRING`","index$":4},{"active":true,"name":"id","req":false,"short":"Unique identifier for the company","type":"`$STRING`","index$":5},{"active":true,"name":"industry","req":false,"short":"Industry sector","type":"`$STRING`","index$":6},{"active":true,"name":"performance_metrics","req":false,"type":"`$OBJECT`","index$":7},{"active":true,"format":"double","name":"revenue","req":false,"short":"Annual revenue","type":"`$NUMBER`","index$":8}],"id":{"field":"id","name":"id"},"name":"search","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"field","orig":"field","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"q","orig":"q","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /search","json":"{\"operationId\":\"searchCompanies\",\"parameters\":[{\"description\":\"Search query string\",\"in\":\"query\",\"name\":\"q\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Field to search in (e.g., company_name, ceo_name)\",\"in\":\"query\",\"name\":\"field\",\"required\":false,\"schema\":{\"enum\":[\"company_name\",\"ceo_name\",\"all\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"results\":{\"items\":{\"properties\":{\"ceo_compensation\":{\"description\":\"Total CEO compensation\",\"format\":\"double\",\"type\":\"number\"},\"ceo_name\":{\"description\":\"Name of the CEO\",\"type\":\"string\"},\"company_name\":{\"description\":\"Name of the company\",\"type\":\"string\"},\"employees\":{\"description\":\"Number of employees\",\"type\":\"integer\"},\"headquarters\":{\"description\":\"Company headquarters location\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the company\",\"type\":\"string\"},\"industry\":{\"description\":\"Industry sector\",\"type\":\"string\"},\"performance_metrics\":{\"properties\":{\"efficiency_rating\":{\"description\":\"Compensation efficiency rating\",\"format\":\"double\",\"type\":\"number\"},\"performance_score\":{\"description\":\"Overall performance score\",\"format\":\"double\",\"type\":\"number\"},\"revenue_growth\":{\"description\":\"Revenue growth percentage\",\"format\":\"double\",\"type\":\"number\"},\"stock_performance\":{\"description\":\"Stock performance percentage\",\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"revenue\":{\"description\":\"Annual revenue\",\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful search response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Invalid search parameters\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/search","segments":[{"lit":"search"}],"select":{"exist":["field","q"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"search","name__orig":"search","Name":"Search","name_":"search","name-":"search","NAME":"SEARCH","index$":5}, {"active":true,"entity":"search","key$":"BasicSearchFlow","kind":"basic","name":"BasicSearchFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"search_ref01"}}],"index$":0}]}, 'Search')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let search_ref01_data = Object.values(setup.data.existing.search)[0] as any

    // LIST
    const search_ref01_ent = client.Search()
    const search_ref01_match: any = {}

    const search_ref01_list = (await search_ref01_ent.list(search_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/search/SearchTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CeoraterSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['search01','search02','search03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CEORATER_TEST_SEARCH_ENTID': idmap,
    'CEORATER_TEST_LIVE': 'FALSE',
    'CEORATER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CEORATER_TEST_SEARCH_ENTID']

  const live = 'TRUE' === env.CEORATER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CEORATER_TEST_SEARCH_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CeoraterSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.CEORATER_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
