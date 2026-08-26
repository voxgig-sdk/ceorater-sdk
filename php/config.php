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
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
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
              'name' => 'compensation',
              'type' => '`$NUMBER`',
            ],
            [
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
                  'parts' => [
                    'metrics',
                    'ceo-performance',
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
              'name' => 'performance_score',
              'short' => 'Overall performance score',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'revenue',
              'short' => 'Annual revenue',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'revenue_growth',
              'short' => 'Revenue growth percentage',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'stock_performance',
              'short' => 'Stock performance percentage',
              'type' => '`$NUMBER`',
            ],
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
                  'parts' => [
                    'companies',
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
                  'parts' => [
                    'companies',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'companyId' => 'id',
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
              'name' => 'efficiency_ratio',
              'short' => 'Performance per compensation dollar',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'performance_score',
              'type' => '`$NUMBER`',
            ],
            [
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
                  'parts' => [
                    'metrics',
                    'compensation-efficiency',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
                  'parts' => [
                    'health',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
                  'parts' => [],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
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
              'name' => 'revenue',
              'short' => 'Annual revenue',
              'type' => '`$NUMBER`',
            ],
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
                  'parts' => [
                    'search',
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
