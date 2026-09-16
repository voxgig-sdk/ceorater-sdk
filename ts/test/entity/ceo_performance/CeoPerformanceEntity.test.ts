

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"ceo_name","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"company_name","req":false,"type":"`$STRING`","index$":1},{"active":true,"format":"double","name":"compensation","req":false,"type":"`$NUMBER`","index$":2},{"active":true,"format":"double","name":"performance_score","req":false,"type":"`$NUMBER`","index$":3},{"active":true,"name":"tenure_years","req":false,"type":"`$INTEGER`","index$":4}],"name":"ceo_performance","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"desc","kind":"query","name":"order","orig":"order","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"sort_by","orig":"sort_by","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /metrics/ceo-performance","json":"{\"operationId\":\"getCEOPerformanceMetrics\",\"parameters\":[{\"description\":\"Field to sort results by\",\"in\":\"query\",\"name\":\"sort_by\",\"required\":false,\"schema\":{\"enum\":[\"performance_score\",\"compensation\",\"efficiency\"],\"type\":\"string\"}},{\"description\":\"Sort order\",\"in\":\"query\",\"name\":\"order\",\"required\":false,\"schema\":{\"default\":\"desc\",\"enum\":[\"asc\",\"desc\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"ceo_name\":{\"type\":\"string\"},\"company_name\":{\"type\":\"string\"},\"compensation\":{\"format\":\"double\",\"type\":\"number\"},\"performance_score\":{\"format\":\"double\",\"type\":\"number\"},\"tenure_years\":{\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with CEO performance metrics\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/metrics/ceo-performance","segments":[{"lit":"metrics"},{"lit":"ceo-performance"}],"select":{"exist":["order","sort_by"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"ceo_performance","name__orig":"ceo_performance","Name":"CeoPerformance","name_":"ceo_performance","name-":"ceo-performance","NAME":"CEO_PERFORMANCE","index$":0}, {"active":true,"entity":"ceo_performance","key$":"BasicCeoPerformanceFlow","kind":"basic","name":"BasicCeoPerformanceFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"ceo_performance_ref01"}}],"index$":0}]}, 'CeoPerformance')
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
  
