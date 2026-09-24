
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CeoraterSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = CeoraterSDK.test()
    equal(testsdk instanceof CeoraterSDK, true,
      'CeoraterSDK.test() must return a client synchronously')
  })

})
