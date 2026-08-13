// Typed models for the Ceorater SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/ceorater-sdk/go/core"
)

// CeoPerformance is the typed data model for the ceo_performance entity.
type CeoPerformance struct {
	CeoName *string `json:"ceo_name,omitempty"`
	CompanyName *string `json:"company_name,omitempty"`
	Compensation *float64 `json:"compensation,omitempty"`
	PerformanceScore *float64 `json:"performance_score,omitempty"`
	TenureYears *int `json:"tenure_years,omitempty"`
}

// CeoPerformanceListMatch is the typed request payload for CeoPerformance.ListTyped.
type CeoPerformanceListMatch struct {
	CeoName *string `json:"ceo_name,omitempty"`
	CompanyName *string `json:"company_name,omitempty"`
	Compensation *float64 `json:"compensation,omitempty"`
	PerformanceScore *float64 `json:"performance_score,omitempty"`
	TenureYears *int `json:"tenure_years,omitempty"`
}

// Company is the typed data model for the company entity.
type Company struct {
	CeoCompensation *float64 `json:"ceo_compensation,omitempty"`
	CeoName *string `json:"ceo_name,omitempty"`
	CompanyName *string `json:"company_name,omitempty"`
	EfficiencyRating *float64 `json:"efficiency_rating,omitempty"`
	Employees *int `json:"employees,omitempty"`
	Headquarters *string `json:"headquarters,omitempty"`
	Id *string `json:"id,omitempty"`
	Industry *string `json:"industry,omitempty"`
	PerformanceMetrics *map[string]any `json:"performance_metrics,omitempty"`
	PerformanceScore *float64 `json:"performance_score,omitempty"`
	Revenue *float64 `json:"revenue,omitempty"`
	RevenueGrowth *float64 `json:"revenue_growth,omitempty"`
	StockPerformance *float64 `json:"stock_performance,omitempty"`
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
	EfficiencyRating *float64 `json:"efficiency_rating,omitempty"`
	Employees *int `json:"employees,omitempty"`
	Headquarters *string `json:"headquarters,omitempty"`
	Id *string `json:"id,omitempty"`
	Industry *string `json:"industry,omitempty"`
	PerformanceMetrics *map[string]any `json:"performance_metrics,omitempty"`
	PerformanceScore *float64 `json:"performance_score,omitempty"`
	Revenue *float64 `json:"revenue,omitempty"`
	RevenueGrowth *float64 `json:"revenue_growth,omitempty"`
	StockPerformance *float64 `json:"stock_performance,omitempty"`
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
	Employees *int `json:"employees,omitempty"`
	Headquarters *string `json:"headquarters,omitempty"`
	Id *string `json:"id,omitempty"`
	Industry *string `json:"industry,omitempty"`
	PerformanceMetrics *map[string]any `json:"performance_metrics,omitempty"`
	Revenue *float64 `json:"revenue,omitempty"`
}

// SearchListMatch is the typed request payload for Search.ListTyped.
type SearchListMatch struct {
	CeoCompensation *float64 `json:"ceo_compensation,omitempty"`
	CeoName *string `json:"ceo_name,omitempty"`
	CompanyName *string `json:"company_name,omitempty"`
	Employees *int `json:"employees,omitempty"`
	Headquarters *string `json:"headquarters,omitempty"`
	Id *string `json:"id,omitempty"`
	Industry *string `json:"industry,omitempty"`
	PerformanceMetrics *map[string]any `json:"performance_metrics,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
