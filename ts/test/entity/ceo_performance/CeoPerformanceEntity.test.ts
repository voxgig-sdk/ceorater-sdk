

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


describe('CeoPerformanceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CEORATER_TEST_LIVE=TRUE.
  afterEach(liveDelay('CEORATER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CeoraterSDK.test()
    const ent = testsdk.CeoPerformance()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CEORATER_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ceo_performance.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ceo_name":{"a":true,"h":"Ceo Name","n":"ceo_name","r":false,"t":"`$STRING`","key$":"ceo_name","index$":0},"company_name":{"a":true,"h":"Company Name","n":"company_name","r":false,"t":"`$STRING`","key$":"company_name","index$":1},"compensation":{"a":true,"fo":"double","h":"Compensation","n":"compensation","r":false,"t":"`$NUMBER`","key$":"compensation","index$":2},"performance_score":{"a":true,"fo":"double","h":"Performance Score","n":"performance_score","r":false,"t":"`$NUMBER`","key$":"performance_score","index$":3},"tenure_years":{"a":true,"h":"Tenure Years","n":"tenure_years","r":false,"t":"`$INTEGER`","key$":"tenure_years","index$":4}},"name":"ceo_performance","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /metrics/ceo-performance","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"desc","k":"query","n":"order","or":"order","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"sort_by","or":"sort_by","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/metrics/ceo-performance","q":{"exist":["order","sort_by"]},"r":{},"s":[{"lit":"metrics"},{"lit":"ceo-performance"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"ceo_performance","name__orig":"ceo_performance","Name":"CeoPerformance","name_":"ceo_performance","name-":"ceo-performance","NAME":"CEO_PERFORMANCE","index$":0}, {"active":true,"entity":"ceo_performance","key$":"BasicCeoPerformanceFlow","kind":"basic","name":"BasicCeoPerformanceFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"ceo_performance_ref01"}}],"index$":0}]}, 'CeoPerformance', {"GET /metrics/ceo-performance":{"protocol":"http","operationId":"getCEOPerformanceMetrics","responses":{"200":{"description":"Successful response with CEO performance metrics","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"ceo_name":{"type":"string","key$":"ceo_name"},"company_name":{"type":"string","key$":"company_name"},"performance_score":{"type":"number","format":"double","key$":"performance_score"},"compensation":{"type":"number","format":"double","key$":"compensation"},"tenure_years":{"type":"integer","key$":"tenure_years"}},"x-ref":"#/components/schemas/CEOPerformance","index$":0}}}}}},"parameters":[{"name":"sort_by","in":"query","description":"Field to sort results by","required":false,"schema":{"type":"string","enum":["performance_score","compensation","efficiency"]},"index$":0},{"name":"order","in":"query","description":"Sort order","required":false,"schema":{"type":"string","enum":["asc","desc"],"default":"desc"},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let ceo_performance_ref01_data = Object.values(setup.data.existing.ceo_performance)[0] as any

    // LIST
    const ceo_performance_ref01_ent = client.CeoPerformance()
    const ceo_performance_ref01_match: any = {}

    const ceo_performance_ref01_list = (await ceo_performance_ref01_ent.list(ceo_performance_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/ceo_performance/CeoPerformanceTestData.json')

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
    ['ceo_performance01','ceo_performance02','ceo_performance03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CEORATER_TEST_CEO_PERFORMANCE_ENTID': idmap,
    'CEORATER_TEST_LIVE': 'FALSE',
    'CEORATER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CEORATER_TEST_CEO_PERFORMANCE_ENTID']

  const live = 'TRUE' === env.CEORATER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CEORATER_TEST_CEO_PERFORMANCE_ENTID']
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
  
