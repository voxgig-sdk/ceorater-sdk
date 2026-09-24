

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


describe('GeneralEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CEORATER_TEST_LIVE=TRUE.
  afterEach(liveDelay('CEORATER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CeoraterSDK.test()
    const ent = testsdk.General()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CEORATER_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'general.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":0},"timestamp":{"a":true,"fo":"date-time","h":"Timestamp","n":"timestamp","r":false,"t":"`$STRING`","key$":"timestamp","index$":1}},"name":"general","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /health","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/health","q":{},"r":{},"s":[{"lit":"health"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"general","name__orig":"general","Name":"General","name_":"general","name-":"general","NAME":"GENERAL","index$":3}, {"active":true,"entity":"general","key$":"BasicGeneralFlow","kind":"basic","name":"BasicGeneralFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"general_ref01","srcdatavar":"general_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-general_ref01"}}],"index$":0}]}, 'General', {"GET /health":{"protocol":"http","operationId":"getHealth","responses":{"200":{"description":"API is healthy","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"example":"healthy","key$":"status","type":"string"},"timestamp":{"format":"date-time","key$":"timestamp","type":"string"}},"index$":0}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let general_ref01_data = Object.values(setup.data.existing.general)[0] as any

    // LOAD
    const general_ref01_ent = client.General()
    const general_ref01_match_dt0: any = {}
    const general_ref01_data_dt0 = (await general_ref01_ent.load(general_ref01_match_dt0)).data()
    assert(null != general_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/general/GeneralTestData.json')

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
    ['general01','general02','general03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CEORATER_TEST_GENERAL_ENTID': idmap,
    'CEORATER_TEST_LIVE': 'FALSE',
    'CEORATER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CEORATER_TEST_GENERAL_ENTID']

  const live = 'TRUE' === env.CEORATER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CEORATER_TEST_GENERAL_ENTID']
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
  
