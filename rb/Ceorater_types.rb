# frozen_string_literal: true

# Typed models for the Ceorater SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# CeoPerformance entity data model.
#
# @!attribute [rw] ceo_name
#   @return [String, nil]
#
# @!attribute [rw] company_name
#   @return [String, nil]
#
# @!attribute [rw] compensation
#   @return [Float, nil]
#
# @!attribute [rw] performance_score
#   @return [Float, nil]
#
# @!attribute [rw] tenure_year
#   @return [Integer, nil]
CeoPerformance = Struct.new(
  :ceo_name,
  :company_name,
  :compensation,
  :performance_score,
  :tenure_year,
  keyword_init: true
)

# Match filter for CeoPerformance#list (any subset of CeoPerformance fields).
#
# @!attribute [rw] ceo_name
#   @return [String, nil]
#
# @!attribute [rw] company_name
#   @return [String, nil]
#
# @!attribute [rw] compensation
#   @return [Float, nil]
#
# @!attribute [rw] performance_score
#   @return [Float, nil]
#
# @!attribute [rw] tenure_year
#   @return [Integer, nil]
CeoPerformanceListMatch = Struct.new(
  :ceo_name,
  :company_name,
  :compensation,
  :performance_score,
  :tenure_year,
  keyword_init: true
)

# Company entity data model.
#
# @!attribute [rw] ceo_compensation
#   @return [Float, nil]
#
# @!attribute [rw] ceo_name
#   @return [String, nil]
#
# @!attribute [rw] company_name
#   @return [String, nil]
#
# @!attribute [rw] employee
#   @return [Integer, nil]
#
# @!attribute [rw] headquarter
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] industry
#   @return [String, nil]
#
# @!attribute [rw] performance_metric
#   @return [Hash, nil]
#
# @!attribute [rw] revenue
#   @return [Float, nil]
Company = Struct.new(
  :ceo_compensation,
  :ceo_name,
  :company_name,
  :employee,
  :headquarter,
  :id,
  :industry,
  :performance_metric,
  :revenue,
  keyword_init: true
)

# Request payload for Company#load.
#
# @!attribute [rw] id
#   @return [String]
CompanyLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Match filter for Company#list (any subset of Company fields).
#
# @!attribute [rw] ceo_compensation
#   @return [Float, nil]
#
# @!attribute [rw] ceo_name
#   @return [String, nil]
#
# @!attribute [rw] company_name
#   @return [String, nil]
#
# @!attribute [rw] employee
#   @return [Integer, nil]
#
# @!attribute [rw] headquarter
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] industry
#   @return [String, nil]
#
# @!attribute [rw] performance_metric
#   @return [Hash, nil]
#
# @!attribute [rw] revenue
#   @return [Float, nil]
CompanyListMatch = Struct.new(
  :ceo_compensation,
  :ceo_name,
  :company_name,
  :employee,
  :headquarter,
  :id,
  :industry,
  :performance_metric,
  :revenue,
  keyword_init: true
)

# CompensationEfficiency entity data model.
#
# @!attribute [rw] ceo_name
#   @return [String, nil]
#
# @!attribute [rw] company_name
#   @return [String, nil]
#
# @!attribute [rw] efficiency_ratio
#   @return [Float, nil]
#
# @!attribute [rw] performance_score
#   @return [Float, nil]
#
# @!attribute [rw] total_compensation
#   @return [Float, nil]
CompensationEfficiency = Struct.new(
  :ceo_name,
  :company_name,
  :efficiency_ratio,
  :performance_score,
  :total_compensation,
  keyword_init: true
)

# Match filter for CompensationEfficiency#list (any subset of CompensationEfficiency fields).
#
# @!attribute [rw] ceo_name
#   @return [String, nil]
#
# @!attribute [rw] company_name
#   @return [String, nil]
#
# @!attribute [rw] efficiency_ratio
#   @return [Float, nil]
#
# @!attribute [rw] performance_score
#   @return [Float, nil]
#
# @!attribute [rw] total_compensation
#   @return [Float, nil]
CompensationEfficiencyListMatch = Struct.new(
  :ceo_name,
  :company_name,
  :efficiency_ratio,
  :performance_score,
  :total_compensation,
  keyword_init: true
)

# General entity data model.
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
General = Struct.new(
  :status,
  :timestamp,
  keyword_init: true
)

# Match filter for General#load (any subset of General fields).
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
GeneralLoadMatch = Struct.new(
  :status,
  :timestamp,
  keyword_init: true
)

# GetRoot entity data model.
#
# @!attribute [rw] documentation
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
GetRoot = Struct.new(
  :documentation,
  :message,
  keyword_init: true
)

# Match filter for GetRoot#load (any subset of GetRoot fields).
#
# @!attribute [rw] documentation
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
GetRootLoadMatch = Struct.new(
  :documentation,
  :message,
  keyword_init: true
)

# Search entity data model.
#
# @!attribute [rw] ceo_compensation
#   @return [Float, nil]
#
# @!attribute [rw] ceo_name
#   @return [String, nil]
#
# @!attribute [rw] company_name
#   @return [String, nil]
#
# @!attribute [rw] employee
#   @return [Integer, nil]
#
# @!attribute [rw] headquarter
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] industry
#   @return [String, nil]
#
# @!attribute [rw] performance_metric
#   @return [Hash, nil]
#
# @!attribute [rw] revenue
#   @return [Float, nil]
Search = Struct.new(
  :ceo_compensation,
  :ceo_name,
  :company_name,
  :employee,
  :headquarter,
  :id,
  :industry,
  :performance_metric,
  :revenue,
  keyword_init: true
)

# Match filter for Search#list (any subset of Search fields).
#
# @!attribute [rw] ceo_compensation
#   @return [Float, nil]
#
# @!attribute [rw] ceo_name
#   @return [String, nil]
#
# @!attribute [rw] company_name
#   @return [String, nil]
#
# @!attribute [rw] employee
#   @return [Integer, nil]
#
# @!attribute [rw] headquarter
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] industry
#   @return [String, nil]
#
# @!attribute [rw] performance_metric
#   @return [Hash, nil]
#
# @!attribute [rw] revenue
#   @return [Float, nil]
SearchListMatch = Struct.new(
  :ceo_compensation,
  :ceo_name,
  :company_name,
  :employee,
  :headquarter,
  :id,
  :industry,
  :performance_metric,
  :revenue,
  keyword_init: true
)

