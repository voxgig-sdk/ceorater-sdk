<?php
declare(strict_types=1);

// Ceorater SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

CeoraterUtility::setRegistrar(function (CeoraterUtility $u): void {
    $u->clean = [CeoraterClean::class, 'call'];
    $u->done = [CeoraterDone::class, 'call'];
    $u->make_error = [CeoraterMakeError::class, 'call'];
    $u->feature_add = [CeoraterFeatureAdd::class, 'call'];
    $u->feature_hook = [CeoraterFeatureHook::class, 'call'];
    $u->feature_init = [CeoraterFeatureInit::class, 'call'];
    $u->fetcher = [CeoraterFetcher::class, 'call'];
    $u->make_fetch_def = [CeoraterMakeFetchDef::class, 'call'];
    $u->make_context = [CeoraterMakeContext::class, 'call'];
    $u->make_options = [CeoraterMakeOptions::class, 'call'];
    $u->make_request = [CeoraterMakeRequest::class, 'call'];
    $u->make_response = [CeoraterMakeResponse::class, 'call'];
    $u->make_result = [CeoraterMakeResult::class, 'call'];
    $u->make_point = [CeoraterMakePoint::class, 'call'];
    $u->make_spec = [CeoraterMakeSpec::class, 'call'];
    $u->make_url = [CeoraterMakeUrl::class, 'call'];
    $u->param = [CeoraterParam::class, 'call'];
    $u->prepare_auth = [CeoraterPrepareAuth::class, 'call'];
    $u->prepare_body = [CeoraterPrepareBody::class, 'call'];
    $u->prepare_headers = [CeoraterPrepareHeaders::class, 'call'];
    $u->prepare_method = [CeoraterPrepareMethod::class, 'call'];
    $u->prepare_params = [CeoraterPrepareParams::class, 'call'];
    $u->prepare_path = [CeoraterPreparePath::class, 'call'];
    $u->prepare_query = [CeoraterPrepareQuery::class, 'call'];
    $u->result_basic = [CeoraterResultBasic::class, 'call'];
    $u->result_body = [CeoraterResultBody::class, 'call'];
    $u->result_headers = [CeoraterResultHeaders::class, 'call'];
    $u->transform_request = [CeoraterTransformRequest::class, 'call'];
    $u->transform_response = [CeoraterTransformResponse::class, 'call'];
});
