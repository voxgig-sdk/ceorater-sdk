# Typed models for the Ceorater SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class CeoPerformance:
    ceo_name: Optional[str] = None
    company_name: Optional[str] = None
    compensation: Optional[float] = None
    performance_score: Optional[float] = None
    tenure_year: Optional[int] = None


@dataclass
class CeoPerformanceListMatch:
    ceo_name: Optional[str] = None
    company_name: Optional[str] = None
    compensation: Optional[float] = None
    performance_score: Optional[float] = None
    tenure_year: Optional[int] = None


@dataclass
class Company:
    ceo_compensation: Optional[float] = None
    ceo_name: Optional[str] = None
    company_name: Optional[str] = None
    employee: Optional[int] = None
    headquarter: Optional[str] = None
    id: Optional[str] = None
    industry: Optional[str] = None
    performance_metric: Optional[dict] = None
    revenue: Optional[float] = None


@dataclass
class CompanyLoadMatch:
    id: str


@dataclass
class CompanyListMatch:
    ceo_compensation: Optional[float] = None
    ceo_name: Optional[str] = None
    company_name: Optional[str] = None
    employee: Optional[int] = None
    headquarter: Optional[str] = None
    id: Optional[str] = None
    industry: Optional[str] = None
    performance_metric: Optional[dict] = None
    revenue: Optional[float] = None


@dataclass
class CompensationEfficiency:
    ceo_name: Optional[str] = None
    company_name: Optional[str] = None
    efficiency_ratio: Optional[float] = None
    performance_score: Optional[float] = None
    total_compensation: Optional[float] = None


@dataclass
class CompensationEfficiencyListMatch:
    ceo_name: Optional[str] = None
    company_name: Optional[str] = None
    efficiency_ratio: Optional[float] = None
    performance_score: Optional[float] = None
    total_compensation: Optional[float] = None


@dataclass
class General:
    status: Optional[str] = None
    timestamp: Optional[str] = None


@dataclass
class GeneralLoadMatch:
    status: Optional[str] = None
    timestamp: Optional[str] = None


@dataclass
class GetRoot:
    documentation: Optional[str] = None
    message: Optional[str] = None


@dataclass
class GetRootLoadMatch:
    documentation: Optional[str] = None
    message: Optional[str] = None


@dataclass
class Search:
    ceo_compensation: Optional[float] = None
    ceo_name: Optional[str] = None
    company_name: Optional[str] = None
    employee: Optional[int] = None
    headquarter: Optional[str] = None
    id: Optional[str] = None
    industry: Optional[str] = None
    performance_metric: Optional[dict] = None
    revenue: Optional[float] = None


@dataclass
class SearchListMatch:
    ceo_compensation: Optional[float] = None
    ceo_name: Optional[str] = None
    company_name: Optional[str] = None
    employee: Optional[int] = None
    headquarter: Optional[str] = None
    id: Optional[str] = None
    industry: Optional[str] = None
    performance_metric: Optional[dict] = None
    revenue: Optional[float] = None

