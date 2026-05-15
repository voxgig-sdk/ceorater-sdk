package = "voxgig-sdk-ceorater"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/ceorater-sdk.git"
}
description = {
  summary = "Ceorater SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["ceorater_sdk"] = "ceorater_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
