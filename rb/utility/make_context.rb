# Ceorater SDK utility: make_context
require_relative '../core/context'
module CeoraterUtilities
  MakeContext = ->(ctxmap, basectx) {
    CeoraterContext.new(ctxmap, basectx)
  }
end
