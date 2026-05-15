package voxgigceoratersdk

import (
	"github.com/voxgig-sdk/ceorater-sdk/core"
	"github.com/voxgig-sdk/ceorater-sdk/entity"
	"github.com/voxgig-sdk/ceorater-sdk/feature"
	_ "github.com/voxgig-sdk/ceorater-sdk/utility"
)

// Type aliases preserve external API.
type CeoraterSDK = core.CeoraterSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type CeoraterEntity = core.CeoraterEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type CeoraterError = core.CeoraterError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCeoPerformanceEntityFunc = func(client *core.CeoraterSDK, entopts map[string]any) core.CeoraterEntity {
		return entity.NewCeoPerformanceEntity(client, entopts)
	}
	core.NewCompanyEntityFunc = func(client *core.CeoraterSDK, entopts map[string]any) core.CeoraterEntity {
		return entity.NewCompanyEntity(client, entopts)
	}
	core.NewCompensationEfficiencyEntityFunc = func(client *core.CeoraterSDK, entopts map[string]any) core.CeoraterEntity {
		return entity.NewCompensationEfficiencyEntity(client, entopts)
	}
	core.NewGeneralEntityFunc = func(client *core.CeoraterSDK, entopts map[string]any) core.CeoraterEntity {
		return entity.NewGeneralEntity(client, entopts)
	}
	core.NewGetRootEntityFunc = func(client *core.CeoraterSDK, entopts map[string]any) core.CeoraterEntity {
		return entity.NewGetRootEntity(client, entopts)
	}
	core.NewSearchEntityFunc = func(client *core.CeoraterSDK, entopts map[string]any) core.CeoraterEntity {
		return entity.NewSearchEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewCeoraterSDK = core.NewCeoraterSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
