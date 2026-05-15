<?php
declare(strict_types=1);

// CeoPerformance entity test

require_once __DIR__ . '/../ceorater_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class CeoPerformanceEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = CeoraterSDK::test(null, null);
        $ent = $testsdk->CeoPerformance(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = ceo_performance_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "ceo_performance." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set CEORATER_TEST_CEO_PERFORMANCE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $ceo_performance_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.ceo_performance")));
        $ceo_performance_ref01_data = null;
        if (count($ceo_performance_ref01_data_raw) > 0) {
            $ceo_performance_ref01_data = Helpers::to_map($ceo_performance_ref01_data_raw[0][1]);
        }

        // LIST
        $ceo_performance_ref01_ent = $client->CeoPerformance(null);
        $ceo_performance_ref01_match = [];

        [$ceo_performance_ref01_list_result, $err] = $ceo_performance_ref01_ent->list($ceo_performance_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($ceo_performance_ref01_list_result);

    }
}

function ceo_performance_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/ceo_performance/CeoPerformanceTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = CeoraterSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["ceo_performance01", "ceo_performance02", "ceo_performance03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("CEORATER_TEST_CEO_PERFORMANCE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "CEORATER_TEST_CEO_PERFORMANCE_ENTID" => $idmap,
        "CEORATER_TEST_LIVE" => "FALSE",
        "CEORATER_TEST_EXPLAIN" => "FALSE",
        "CEORATER_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["CEORATER_TEST_CEO_PERFORMANCE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["CEORATER_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["CEORATER_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new CeoraterSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["CEORATER_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["CEORATER_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
