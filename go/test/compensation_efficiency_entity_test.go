package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/ceorater-sdk/go"
	"github.com/voxgig-sdk/ceorater-sdk/go/core"

	vs "github.com/voxgig-sdk/ceorater-sdk/go/utility/struct"
)

func TestCompensationEfficiencyEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CompensationEfficiency(nil)
		if ent == nil {
			t.Fatal("expected non-nil CompensationEfficiencyEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := compensation_efficiencyBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "compensation_efficiency." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set CEORATER_TEST_COMPENSATION_EFFICIENCY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		compensationEfficiencyRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.compensation_efficiency", setup.data)))
		var compensationEfficiencyRef01Data map[string]any
		if len(compensationEfficiencyRef01DataRaw) > 0 {
			compensationEfficiencyRef01Data = core.ToMapAny(compensationEfficiencyRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = compensationEfficiencyRef01Data

		// LIST
		compensationEfficiencyRef01Ent := client.CompensationEfficiency(nil)
		compensationEfficiencyRef01Match := map[string]any{}

		compensationEfficiencyRef01ListResult, err := compensationEfficiencyRef01Ent.List(compensationEfficiencyRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, compensationEfficiencyRef01ListOk := compensationEfficiencyRef01ListResult.([]any)
		if !compensationEfficiencyRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", compensationEfficiencyRef01ListResult)
		}

	})
}

func compensation_efficiencyBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "compensation_efficiency", "CompensationEfficiencyTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read compensation_efficiency test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse compensation_efficiency test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"compensation_efficiency01", "compensation_efficiency02", "compensation_efficiency03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("CEORATER_TEST_COMPENSATION_EFFICIENCY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CEORATER_TEST_COMPENSATION_EFFICIENCY_ENTID": idmap,
		"CEORATER_TEST_LIVE":      "FALSE",
		"CEORATER_TEST_EXPLAIN":   "FALSE",
		"CEORATER_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["CEORATER_TEST_COMPENSATION_EFFICIENCY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["CEORATER_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["CEORATER_APIKEY"],
			},
			extra,
		})
		client = sdk.NewCeoraterSDK(core.ToMapAny(mergedOpts))
	}

	live := env["CEORATER_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["CEORATER_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
