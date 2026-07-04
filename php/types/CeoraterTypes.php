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
    public ?int $tenure_year = null;
}

/** Match filter for CeoPerformance#list (any subset of CeoPerformance fields). */
class CeoPerformanceListMatch
{
    public ?string $ceo_name = null;
    public ?string $company_name = null;
    public ?float $compensation = null;
    public ?float $performance_score = null;
    public ?int $tenure_year = null;
}

/** Company entity data model. */
class Company
{
    public ?float $ceo_compensation = null;
    public ?string $ceo_name = null;
    public ?string $company_name = null;
    public ?int $employee = null;
    public ?string $headquarter = null;
    public ?string $id = null;
    public ?string $industry = null;
    public ?array $performance_metric = null;
    public ?float $revenue = null;
}

/** Request payload for Company#load. */
class CompanyLoadMatch
{
    public string $id;
}

/** Match filter for Company#list (any subset of Company fields). */
class CompanyListMatch
{
    public ?float $ceo_compensation = null;
    public ?string $ceo_name = null;
    public ?string $company_name = null;
    public ?int $employee = null;
    public ?string $headquarter = null;
    public ?string $id = null;
    public ?string $industry = null;
    public ?array $performance_metric = null;
    public ?float $revenue = null;
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

/** Match filter for CompensationEfficiency#list (any subset of CompensationEfficiency fields). */
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

/** Match filter for General#load (any subset of General fields). */
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

/** Match filter for GetRoot#load (any subset of GetRoot fields). */
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
    public ?int $employee = null;
    public ?string $headquarter = null;
    public ?string $id = null;
    public ?string $industry = null;
    public ?array $performance_metric = null;
    public ?float $revenue = null;
}

/** Match filter for Search#list (any subset of Search fields). */
class SearchListMatch
{
    public ?float $ceo_compensation = null;
    public ?string $ceo_name = null;
    public ?string $company_name = null;
    public ?int $employee = null;
    public ?string $headquarter = null;
    public ?string $id = null;
    public ?string $industry = null;
    public ?array $performance_metric = null;
    public ?float $revenue = null;
}

