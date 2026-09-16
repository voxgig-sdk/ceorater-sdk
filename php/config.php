<?php
declare(strict_types=1);

// Ceorater SDK configuration

class CeoraterConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Ceorater",
                "slug" => "ceorater",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://ceorater-api.onrender.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "ceo_performance" => [],
                    "company" => [],
                    "compensation_efficiency" => [],
                    "general" => [],
                    "get_root" => [],
                    "search" => [],
                ],
            ],
            "entity" => [
        'ceo_performance' => [
          'fields' => [
            [
              'name' => 'ceo_name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'company_name',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'double',
              'name' => 'compensation',
              'type' => '`$NUMBER`',
            ],
            [
              'format' => 'double',
              'name' => 'performance_score',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'tenure_years',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'ceo_performance',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'desc',
                        'kind' => 'query',
                        'name' => 'order',
                        'orig' => 'order',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'sort_by',
                        'orig' => 'sort_by',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/metrics/ceo-performance',
                  'segments' => [
                    [
                      'lit' => 'metrics',
                    ],
                    [
                      'lit' => 'ceo-performance',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'order',
                      'sort_by',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'metrics',
                    'ceo-performance',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'company' => [
          'fields' => [
            [
              'format' => 'double',
              'name' => 'ceo_compensation',
              'short' => 'Total CEO compensation',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'ceo_name',
              'short' => 'Name of the CEO',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'company_name',
              'short' => 'Name of the company',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'double',
              'name' => 'efficiency_rating',
              'short' => 'Compensation efficiency rating',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'employees',
              'short' => 'Number of employees',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'headquarters',
              'short' => 'Company headquarters location',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the company',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'industry',
              'short' => 'Industry sector',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'performance_metrics',
              'type' => '`$OBJECT`',
            ],
            [
              'format' => 'double',
              'name' => 'performance_score',
              'short' => 'Overall performance score',
              'type' => '`$NUMBER`',
            ],
            [
              'format' => 'double',
              'name' => 'revenue',
              'short' => 'Annual revenue',
              'type' => '`$NUMBER`',
            ],
            [
              'format' => 'double',
              'name' => 'revenue_growth',
              'short' => 'Revenue growth percentage',
              'type' => '`$NUMBER`',
            ],
            [
              'format' => 'double',
              'name' => 'stock_performance',
              'short' => 'Stock performance percentage',
              'type' => '`$NUMBER`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'company',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 100,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'offset',
                        'orig' => 'offset',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/companies',
                  'segments' => [
                    [
                      'lit' => 'companies',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'offset',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.companies`',
                  ],
                  'parts' => [
                    'companies',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'company_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/companies/{companyId}',
                  'rename' => [
                    'param' => [
                      'companyId' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'companies',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.performance_metrics`',
                  ],
                  'parts' => [
                    'companies',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'compensation_efficiency' => [
          'fields' => [
            [
              'name' => 'ceo_name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'company_name',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'double',
              'name' => 'efficiency_ratio',
              'short' => 'Performance per compensation dollar',
              'type' => '`$NUMBER`',
            ],
            [
              'format' => 'double',
              'name' => 'performance_score',
              'type' => '`$NUMBER`',
            ],
            [
              'format' => 'double',
              'name' => 'total_compensation',
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'compensation_efficiency',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/metrics/compensation-efficiency',
                  'segments' => [
                    [
                      'lit' => 'metrics',
                    ],
                    [
                      'lit' => 'compensation-efficiency',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'metrics',
                    'compensation-efficiency',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'general' => [
          'fields' => [
            [
              'name' => 'status',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date-time',
              'name' => 'timestamp',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'general',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/health',
                  'segments' => [
                    [
                      'lit' => 'health',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'health',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'get_root' => [
          'fields' => [
            [
              'format' => 'uri',
              'name' => 'documentation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'message',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'get_root',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/',
                  'segments' => [],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'search' => [
          'fields' => [
            [
              'format' => 'double',
              'name' => 'ceo_compensation',
              'short' => 'Total CEO compensation',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'ceo_name',
              'short' => 'Name of the CEO',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'company_name',
              'short' => 'Name of the company',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'employees',
              'short' => 'Number of employees',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'headquarters',
              'short' => 'Company headquarters location',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the company',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'industry',
              'short' => 'Industry sector',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'performance_metrics',
              'type' => '`$OBJECT`',
            ],
            [
              'format' => 'double',
              'name' => 'revenue',
              'short' => 'Annual revenue',
              'type' => '`$NUMBER`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'search',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'field',
                        'orig' => 'field',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'q',
                        'orig' => 'q',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/search',
                  'segments' => [
                    [
                      'lit' => 'search',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'field',
                      'q',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                  'parts' => [
                    'search',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return CeoraterFeatures::make_feature($name);
    }
}
