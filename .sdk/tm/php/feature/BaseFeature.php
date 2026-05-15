<?php
declare(strict_types=1);

// Ceorater SDK base feature

class CeoraterBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(CeoraterContext $ctx, array $options): void {}
    public function PostConstruct(CeoraterContext $ctx): void {}
    public function PostConstructEntity(CeoraterContext $ctx): void {}
    public function SetData(CeoraterContext $ctx): void {}
    public function GetData(CeoraterContext $ctx): void {}
    public function GetMatch(CeoraterContext $ctx): void {}
    public function SetMatch(CeoraterContext $ctx): void {}
    public function PrePoint(CeoraterContext $ctx): void {}
    public function PreSpec(CeoraterContext $ctx): void {}
    public function PreRequest(CeoraterContext $ctx): void {}
    public function PreResponse(CeoraterContext $ctx): void {}
    public function PreResult(CeoraterContext $ctx): void {}
    public function PreDone(CeoraterContext $ctx): void {}
    public function PreUnexpected(CeoraterContext $ctx): void {}
}
