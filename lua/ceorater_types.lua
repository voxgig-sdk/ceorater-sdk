-- Typed models for the Ceorater SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class CeoPerformance
---@field ceo_name? string
---@field company_name? string
---@field compensation? number
---@field performance_score? number
---@field tenure_years? number

---@class CeoPerformanceListMatch
---@field order? string
---@field sort_by? string

---@class Company
---@field ceo_compensation? number
---@field ceo_name? string
---@field company_name? string
---@field efficiency_rating? number
---@field employees? number
---@field headquarters? string
---@field id? string
---@field industry? string
---@field performance_metrics? table
---@field performance_score? number
---@field revenue? number
---@field revenue_growth? number
---@field stock_performance? number

---@class CompanyLoadMatch
---@field id string

---@class CompanyListMatch
---@field limit? number
---@field offset? number

---@class CompensationEfficiency
---@field ceo_name? string
---@field company_name? string
---@field efficiency_ratio? number
---@field performance_score? number
---@field total_compensation? number

---@class CompensationEfficiencyListMatch
---@field ceo_name? string
---@field company_name? string
---@field efficiency_ratio? number
---@field performance_score? number
---@field total_compensation? number

---@class General
---@field status? string
---@field timestamp? string

---@class GeneralLoadMatch
---@field status? string
---@field timestamp? string

---@class GetRoot
---@field documentation? string
---@field message? string

---@class GetRootLoadMatch
---@field documentation? string
---@field message? string

---@class Search
---@field ceo_compensation? number
---@field ceo_name? string
---@field company_name? string
---@field employees? number
---@field headquarters? string
---@field id? string
---@field industry? string
---@field performance_metrics? table
---@field revenue? number

---@class SearchListMatch
---@field field? string
---@field q string

local M = {}

return M
