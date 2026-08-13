<?php
declare(strict_types=1);

// Typed models for the Ceorater SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** CeoPerformance entity data model. */
class CeoPerformance
{
    public ?string $ceo_name = null;
    public ?string $company_name = null;
    public ?float $compensation = null;
    public ?float $performance_score = null;
    public ?int $tenure_years = null;
}

/** Request payload for CeoPerformance#list. */
class CeoPerformanceListMatch
{
    public ?string $ceo_name = null;
    public ?string $company_name = null;
    public ?float $compensation = null;
    public ?float $performance_score = null;
    public ?int $tenure_years = null;
}

/** Company entity data model. */
class Company
{
    public ?float $ceo_compensation = null;
    public ?string $ceo_name = null;
    public ?string $company_name = null;
    public ?float $efficiency_rating = null;
    public ?int $employees = null;
    public ?string $headquarters = null;
    public ?string $id = null;
    public ?string $industry = null;
    public ?array $performance_metrics = null;
    public ?float $performance_score = null;
    public ?float $revenue = null;
    public ?float $revenue_growth = null;
    public ?float $stock_performance = null;
}

/** Request payload for Company#load. */
class CompanyLoadMatch
{
    public string $id;
}

/** Request payload for Company#list. */
class CompanyListMatch
{
    public ?float $ceo_compensation = null;
    public ?string $ceo_name = null;
    public ?string $company_name = null;
    public ?float $efficiency_rating = null;
    public ?int $employees = null;
    public ?string $headquarters = null;
    public ?string $id = null;
    public ?string $industry = null;
    public ?array $performance_metrics = null;
    public ?float $performance_score = null;
    public ?float $revenue = null;
    public ?float $revenue_growth = null;
    public ?float $stock_performance = null;
}

/** CompensationEfficiency entity data model. */
class CompensationEfficiency
{
    public ?string $ceo_name = null;
    public ?string $company_name = null;
    public ?float $efficiency_ratio = null;
    public ?float $performance_score = null;
    public ?float $total_compensation = null;
}

/** Request payload for CompensationEfficiency#list. */
class CompensationEfficiencyListMatch
{
    public ?string $ceo_name = null;
    public ?string $company_name = null;
    public ?float $efficiency_ratio = null;
    public ?float $performance_score = null;
    public ?float $total_compensation = null;
}

/** General entity data model. */
class General
{
    public ?string $status = null;
    public ?string $timestamp = null;
}

/** Request payload for General#load. */
class GeneralLoadMatch
{
    public ?string $status = null;
    public ?string $timestamp = null;
}

/** GetRoot entity data model. */
class GetRoot
{
    public ?string $documentation = null;
    public ?string $message = null;
}

/** Request payload for GetRoot#load. */
class GetRootLoadMatch
{
    public ?string $documentation = null;
    public ?string $message = null;
}

/** Search entity data model. */
class Search
{
    public ?float $ceo_compensation = null;
    public ?string $ceo_name = null;
    public ?string $company_name = null;
    public ?int $employees = null;
    public ?string $headquarters = null;
    public ?string $id = null;
    public ?string $industry = null;
    public ?array $performance_metrics = null;
    public ?float $revenue = null;
}

/** Request payload for Search#list. */
class SearchListMatch
{
    public ?float $ceo_compensation = null;
    public ?string $ceo_name = null;
    public ?string $company_name = null;
    public ?int $employees = null;
    public ?string $headquarters = null;
    public ?string $id = null;
    public ?string $industry = null;
    public ?array $performance_metrics = null;
    public ?float $revenue = null;
}

