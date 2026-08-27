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
# @!attribute [rw] tenure_years
#   @return [Integer, nil]
CeoPerformance = Struct.new(
  :ceo_name,
  :company_name,
  :compensation,
  :performance_score,
  :tenure_years,
  keyword_init: true
)

# Request payload for CeoPerformance#list.
#
# @!attribute [rw] order
#   @return [String, nil]
#
# @!attribute [rw] sort_by
#   @return [String, nil]
CeoPerformanceListMatch = Struct.new(
  :order,
  :sort_by,
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
# @!attribute [rw] efficiency_rating
#   @return [Float, nil]
#
# @!attribute [rw] employees
#   @return [Integer, nil]
#
# @!attribute [rw] headquarters
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] industry
#   @return [String, nil]
#
# @!attribute [rw] performance_metrics
#   @return [Hash, nil]
#
# @!attribute [rw] performance_score
#   @return [Float, nil]
#
# @!attribute [rw] revenue
#   @return [Float, nil]
#
# @!attribute [rw] revenue_growth
#   @return [Float, nil]
#
# @!attribute [rw] stock_performance
#   @return [Float, nil]
Company = Struct.new(
  :ceo_compensation,
  :ceo_name,
  :company_name,
  :efficiency_rating,
  :employees,
  :headquarters,
  :id,
  :industry,
  :performance_metrics,
  :performance_score,
  :revenue,
  :revenue_growth,
  :stock_performance,
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

# Request payload for Company#list.
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] offset
#   @return [Integer, nil]
CompanyListMatch = Struct.new(
  :limit,
  :offset,
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

# Request payload for CompensationEfficiency#list.
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

# Request payload for General#load.
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

# Request payload for GetRoot#load.
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
# @!attribute [rw] employees
#   @return [Integer, nil]
#
# @!attribute [rw] headquarters
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] industry
#   @return [String, nil]
#
# @!attribute [rw] performance_metrics
#   @return [Hash, nil]
#
# @!attribute [rw] revenue
#   @return [Float, nil]
Search = Struct.new(
  :ceo_compensation,
  :ceo_name,
  :company_name,
  :employees,
  :headquarters,
  :id,
  :industry,
  :performance_metrics,
  :revenue,
  keyword_init: true
)

# Request payload for Search#list.
#
# @!attribute [rw] field
#   @return [String, nil]
#
# @!attribute [rw] q
#   @return [String]
SearchListMatch = Struct.new(
  :field,
  :q,
  keyword_init: true
)

