# Typed models for the Ceorater SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class CeoPerformance(TypedDict, total=False):
    ceo_name: str
    company_name: str
    compensation: float
    performance_score: float
    tenure_year: int


class CeoPerformanceListMatch(TypedDict, total=False):
    ceo_name: str
    company_name: str
    compensation: float
    performance_score: float
    tenure_year: int


class Company(TypedDict, total=False):
    ceo_compensation: float
    ceo_name: str
    company_name: str
    employee: int
    headquarter: str
    id: str
    industry: str
    performance_metric: dict
    revenue: float


class CompanyLoadMatch(TypedDict):
    id: str


class CompanyListMatch(TypedDict, total=False):
    ceo_compensation: float
    ceo_name: str
    company_name: str
    employee: int
    headquarter: str
    id: str
    industry: str
    performance_metric: dict
    revenue: float


class CompensationEfficiency(TypedDict, total=False):
    ceo_name: str
    company_name: str
    efficiency_ratio: float
    performance_score: float
    total_compensation: float


class CompensationEfficiencyListMatch(TypedDict, total=False):
    ceo_name: str
    company_name: str
    efficiency_ratio: float
    performance_score: float
    total_compensation: float


class General(TypedDict, total=False):
    status: str
    timestamp: str


class GeneralLoadMatch(TypedDict, total=False):
    status: str
    timestamp: str


class GetRoot(TypedDict, total=False):
    documentation: str
    message: str


class GetRootLoadMatch(TypedDict, total=False):
    documentation: str
    message: str


class Search(TypedDict, total=False):
    ceo_compensation: float
    ceo_name: str
    company_name: str
    employee: int
    headquarter: str
    id: str
    industry: str
    performance_metric: dict
    revenue: float


class SearchListMatch(TypedDict, total=False):
    ceo_compensation: float
    ceo_name: str
    company_name: str
    employee: int
    headquarter: str
    id: str
    industry: str
    performance_metric: dict
    revenue: float
