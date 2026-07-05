// Typed models for the Ceorater SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// CeoPerformance is the typed data model for the ceo_performance entity.
type CeoPerformance struct {
	CeoName *string `json:"ceo_name,omitempty"`
	CompanyName *string `json:"company_name,omitempty"`
	Compensation *float64 `json:"compensation,omitempty"`
	PerformanceScore *float64 `json:"performance_score,omitempty"`
	TenureYear *int `json:"tenure_year,omitempty"`
}

// CeoPerformanceListMatch is the typed request payload for CeoPerformance.ListTyped.
type CeoPerformanceListMatch struct {
	CeoName *string `json:"ceo_name,omitempty"`
	CompanyName *string `json:"company_name,omitempty"`
	Compensation *float64 `json:"compensation,omitempty"`
	PerformanceScore *float64 `json:"performance_score,omitempty"`
	TenureYear *int `json:"tenure_year,omitempty"`
}

// Company is the typed data model for the company entity.
type Company struct {
	CeoCompensation *float64 `json:"ceo_compensation,omitempty"`
	CeoName *string `json:"ceo_name,omitempty"`
	CompanyName *string `json:"company_name,omitempty"`
	Employee *int `json:"employee,omitempty"`
	Headquarter *string `json:"headquarter,omitempty"`
	Id *string `json:"id,omitempty"`
	Industry *string `json:"industry,omitempty"`
	PerformanceMetric *map[string]any `json:"performance_metric,omitempty"`
	Revenue *float64 `json:"revenue,omitempty"`
}

// CompanyLoadMatch is the typed request payload for Company.LoadTyped.
type CompanyLoadMatch struct {
	Id string `json:"id"`
}

// CompanyListMatch is the typed request payload for Company.ListTyped.
type CompanyListMatch struct {
	CeoCompensation *float64 `json:"ceo_compensation,omitempty"`
	CeoName *string `json:"ceo_name,omitempty"`
	CompanyName *string `json:"company_name,omitempty"`
	Employee *int `json:"employee,omitempty"`
	Headquarter *string `json:"headquarter,omitempty"`
	Id *string `json:"id,omitempty"`
	Industry *string `json:"industry,omitempty"`
	PerformanceMetric *map[string]any `json:"performance_metric,omitempty"`
	Revenue *float64 `json:"revenue,omitempty"`
}

// CompensationEfficiency is the typed data model for the compensation_efficiency entity.
type CompensationEfficiency struct {
	CeoName *string `json:"ceo_name,omitempty"`
	CompanyName *string `json:"company_name,omitempty"`
	EfficiencyRatio *float64 `json:"efficiency_ratio,omitempty"`
	PerformanceScore *float64 `json:"performance_score,omitempty"`
	TotalCompensation *float64 `json:"total_compensation,omitempty"`
}

// CompensationEfficiencyListMatch is the typed request payload for CompensationEfficiency.ListTyped.
type CompensationEfficiencyListMatch struct {
	CeoName *string `json:"ceo_name,omitempty"`
	CompanyName *string `json:"company_name,omitempty"`
	EfficiencyRatio *float64 `json:"efficiency_ratio,omitempty"`
	PerformanceScore *float64 `json:"performance_score,omitempty"`
	TotalCompensation *float64 `json:"total_compensation,omitempty"`
}

// General is the typed data model for the general entity.
type General struct {
	Status *string `json:"status,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
}

// GeneralLoadMatch is the typed request payload for General.LoadTyped.
type GeneralLoadMatch struct {
	Status *string `json:"status,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
}

// GetRoot is the typed data model for the get_root entity.
type GetRoot struct {
	Documentation *string `json:"documentation,omitempty"`
	Message *string `json:"message,omitempty"`
}

// GetRootLoadMatch is the typed request payload for GetRoot.LoadTyped.
type GetRootLoadMatch struct {
	Documentation *string `json:"documentation,omitempty"`
	Message *string `json:"message,omitempty"`
}

// Search is the typed data model for the search entity.
type Search struct {
	CeoCompensation *float64 `json:"ceo_compensation,omitempty"`
	CeoName *string `json:"ceo_name,omitempty"`
	CompanyName *string `json:"company_name,omitempty"`
	Employee *int `json:"employee,omitempty"`
	Headquarter *string `json:"headquarter,omitempty"`
	Id *string `json:"id,omitempty"`
	Industry *string `json:"industry,omitempty"`
	PerformanceMetric *map[string]any `json:"performance_metric,omitempty"`
	Revenue *float64 `json:"revenue,omitempty"`
}

// SearchListMatch is the typed request payload for Search.ListTyped.
type SearchListMatch struct {
	CeoCompensation *float64 `json:"ceo_compensation,omitempty"`
	CeoName *string `json:"ceo_name,omitempty"`
	CompanyName *string `json:"company_name,omitempty"`
	Employee *int `json:"employee,omitempty"`
	Headquarter *string `json:"headquarter,omitempty"`
	Id *string `json:"id,omitempty"`
	Industry *string `json:"industry,omitempty"`
	PerformanceMetric *map[string]any `json:"performance_metric,omitempty"`
	Revenue *float64 `json:"revenue,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
