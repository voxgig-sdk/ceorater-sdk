-- Ceorater SDK error

local CeoraterError = {}
CeoraterError.__index = CeoraterError


function CeoraterError.new(code, msg, ctx)
  local self = setmetatable({}, CeoraterError)
  self.is_sdk_error = true
  self.sdk = "Ceorater"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function CeoraterError:error()
  return self.msg
end


function CeoraterError:__tostring()
  return self.msg
end


return CeoraterError
