# CeoPerformance entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from ceorater_sdk import CeoraterSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestCeoPerformanceEntity:

    def test_should_create_instance(self):
        testsdk = CeoraterSDK.test(None, None)
        ent = testsdk.CeoPerformance(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _ceo_performance_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "ceo_performance." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set CEORATER_TEST_CEO_PERFORMANCE_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        ceo_performance_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.ceo_performance")))
        ceo_performance_ref01_data = None
        if len(ceo_performance_ref01_data_raw) > 0:
            ceo_performance_ref01_data = helpers.to_map(ceo_performance_ref01_data_raw[0][1])

        # LIST
        ceo_performance_ref01_ent = client.CeoPerformance(None)
        ceo_performance_ref01_match = {}

        ceo_performance_ref01_list_result, err = ceo_performance_ref01_ent.list(ceo_performance_ref01_match, None)
        assert err is None
        assert isinstance(ceo_performance_ref01_list_result, list)



def _ceo_performance_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/ceo_performance/CeoPerformanceTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = CeoraterSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["ceo_performance01", "ceo_performance02", "ceo_performance03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "CEORATER_TEST_CEO_PERFORMANCE_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "CEORATER_TEST_CEO_PERFORMANCE_ENTID": idmap,
        "CEORATER_TEST_LIVE": "FALSE",
        "CEORATER_TEST_EXPLAIN": "FALSE",
        "CEORATER_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("CEORATER_TEST_CEO_PERFORMANCE_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("CEORATER_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("CEORATER_APIKEY"),
            },
            extra or {},
        ])
        client = CeoraterSDK(helpers.to_map(merged_opts))

    _live = env.get("CEORATER_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("CEORATER_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
