
import { Context } from './Context'


class CeoraterError extends Error {

  isCeoraterError = true

  sdk = 'Ceorater'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  CeoraterError
}

