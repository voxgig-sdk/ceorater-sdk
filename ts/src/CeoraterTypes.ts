// Typed models for the Ceorater SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface CeoPerformance {
  ceo_name?: string
  company_name?: string
  compensation?: number
  performance_score?: number
  tenure_year?: number
}

export interface CeoPerformanceListMatch {
  ceo_name?: string
  company_name?: string
  compensation?: number
  performance_score?: number
  tenure_year?: number
}

export interface Company {
  ceo_compensation?: number
  ceo_name?: string
  company_name?: string
  employee?: number
  headquarter?: string
  id?: string
  industry?: string
  performance_metric?: Record<string, any>
  revenue?: number
}

export interface CompanyLoadMatch {
  id: string
}

export interface CompanyListMatch {
  ceo_compensation?: number
  ceo_name?: string
  company_name?: string
  employee?: number
  headquarter?: string
  id?: string
  industry?: string
  performance_metric?: Record<string, any>
  revenue?: number
}

export interface CompensationEfficiency {
  ceo_name?: string
  company_name?: string
  efficiency_ratio?: number
  performance_score?: number
  total_compensation?: number
}

export interface CompensationEfficiencyListMatch {
  ceo_name?: string
  company_name?: string
  efficiency_ratio?: number
  performance_score?: number
  total_compensation?: number
}

export interface General {
  status?: string
  timestamp?: string
}

export interface GeneralLoadMatch {
  status?: string
  timestamp?: string
}

export interface GetRoot {
  documentation?: string
  message?: string
}

export interface GetRootLoadMatch {
  documentation?: string
  message?: string
}

export interface Search {
  ceo_compensation?: number
  ceo_name?: string
  company_name?: string
  employee?: number
  headquarter?: string
  id?: string
  industry?: string
  performance_metric?: Record<string, any>
  revenue?: number
}

export interface SearchListMatch {
  ceo_compensation?: number
  ceo_name?: string
  company_name?: string
  employee?: number
  headquarter?: string
  id?: string
  industry?: string
  performance_metric?: Record<string, any>
  revenue?: number
}

