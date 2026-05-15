package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCeoPerformanceEntityFunc func(client *CeoraterSDK, entopts map[string]any) CeoraterEntity

var NewCompanyEntityFunc func(client *CeoraterSDK, entopts map[string]any) CeoraterEntity

var NewCompensationEfficiencyEntityFunc func(client *CeoraterSDK, entopts map[string]any) CeoraterEntity

var NewGeneralEntityFunc func(client *CeoraterSDK, entopts map[string]any) CeoraterEntity

var NewGetRootEntityFunc func(client *CeoraterSDK, entopts map[string]any) CeoraterEntity

var NewSearchEntityFunc func(client *CeoraterSDK, entopts map[string]any) CeoraterEntity

