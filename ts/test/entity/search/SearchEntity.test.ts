

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ceo_compensation":{"a":true,"fo":"double","h":"Ceo Compensation","n":"ceo_compensation","r":false,"sh":"Total CEO compensation","t":"`$NUMBER`","key$":"ceo_compensation","index$":0},"ceo_name":{"a":true,"h":"Ceo Name","n":"ceo_name","r":false,"sh":"Name of the CEO","t":"`$STRING`","key$":"ceo_name","index$":1},"company_name":{"a":true,"h":"Company Name","n":"company_name","r":false,"sh":"Name of the company","t":"`$STRING`","key$":"company_name","index$":2},"employees":{"a":true,"h":"Employees","n":"employees","r":false,"sh":"Number of employees","t":"`$INTEGER`","key$":"employees","index$":3},"headquarters":{"a":true,"h":"Headquarters","n":"headquarters","r":false,"sh":"Company headquarters location","t":"`$STRING`","key$":"headquarters","index$":4},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the company","t":"`$STRING`","key$":"id","index$":5},"industry":{"a":true,"h":"Industry","n":"industry","r":false,"sh":"Industry sector","t":"`$STRING`","key$":"industry","index$":6},"performance_metrics":{"a":true,"h":"Performance Metrics","n":"performance_metrics","r":false,"t":"`$OBJECT`","key$":"performance_metrics","index$":7},"revenue":{"a":true,"fo":"double","h":"Revenue","n":"revenue","r":false,"sh":"Annual revenue","t":"`$NUMBER`","key$":"revenue","index$":8}},"id":{"field":"id","name":"id"},"name":"search","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /search","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"field","or":"field","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"q","or":"q","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/search","q":{"exist":["field","q"]},"r":{},"s":[{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"search","name__orig":"search","Name":"Search","name_":"search","name-":"search","NAME":"SEARCH","index$":5}, {"active":true,"entity":"search","key$":"BasicSearchFlow","kind":"basic","name":"BasicSearchFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"search_ref01"}}],"index$":0}]}, 'Search', {"GET /search":{"protocol":"http","operationId":"searchCompanies","responses":{"200":{"description":"Successful search response","content":{"application/json":{"schema":{"type":"object","properties":{"results":{"items":{"properties":{"ceo_compensation":{"description":"Total CEO compensation","format":"double","type":"number","key$":"ceo_compensation"},"ceo_name":{"description":"Name of the CEO","type":"string","key$":"ceo_name"},"company_name":{"description":"Name of the company","type":"string","key$":"company_name"},"employees":{"description":"Number of employees","type":"integer","key$":"employees"},"headquarters":{"description":"Company headquarters location","type":"string","key$":"headquarters"},"id":{"description":"Unique identifier for the company","type":"string","key$":"id"},"industry":{"description":"Industry sector","type":"string","key$":"industry"},"performance_metrics":{"properties":{"efficiency_rating":{"description":"Compensation efficiency rating","format":"double","type":"number","key$":"efficiency_rating"},"performance_score":{"description":"Overall performance score","format":"double","type":"number","key$":"performance_score"},"revenue_growth":{"description":"Revenue growth percentage","format":"double","type":"number","key$":"revenue_growth"},"stock_performance":{"description":"Stock performance percentage","format":"double","type":"number","key$":"stock_performance"}},"type":"object","x-ref":"#/components/schemas/PerformanceMetrics","key$":"performance_metrics"},"revenue":{"description":"Annual revenue","format":"double","type":"number","key$":"revenue"}},"type":"object","x-ref":"#/components/schemas/Company","index$":0},"key$":"results","type":"array"},"total":{"key$":"total","type":"integer"}}}}}},"400":{"description":"Invalid search parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"},"details":{"type":"string","description":"Additional error details"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"q","in":"query","description":"Search query string","required":true,"schema":{"type":"string"},"index$":0},{"name":"field","in":"query","description":"Field to search in (e.g., company_name, ceo_name)","required":false,"schema":{"type":"string","enum":["company_name","ceo_name","all"]},"index$":1}],"securitySource":"unspecified"}})
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
  
