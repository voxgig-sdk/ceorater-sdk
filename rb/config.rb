# Ceorater SDK configuration

module CeoraterConfig
  def self.make_config
    {
      "main" => {
        "name" => "Ceorater",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://ceorater-api.onrender.com",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "ceo_performance" => {},
          "company" => {},
          "compensation_efficiency" => {},
          "general" => {},
          "get_root" => {},
          "search" => {},
        },
      },
      "entity" => {
        "ceo_performance" => {
          "fields" => [
            {
              "name" => "ceo_name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "company_name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "compensation",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "performance_score",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "tenure_year",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 4,
            },
          ],
          "name" => "ceo_performance",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "desc",
                        "kind" => "query",
                        "name" => "order",
                        "orig" => "order",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "sort_by",
                        "orig" => "sort_by",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/metrics/ceo-performance",
                  "parts" => [
                    "metrics",
                    "ceo-performance",
                  ],
                  "select" => {
                    "exist" => [
                      "order",
                      "sort_by",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "company" => {
          "fields" => [
            {
              "name" => "ceo_compensation",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "ceo_name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "company_name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "employee",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "headquarter",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "id",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 5,
            },
            {
              "name" => "industry",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 6,
            },
            {
              "name" => "performance_metric",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 7,
            },
            {
              "name" => "revenue",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 8,
            },
          ],
          "name" => "company",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 100,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/companies",
                  "parts" => [
                    "companies",
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                      "offset",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "company_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/companies/{companyId}",
                  "parts" => [
                    "companies",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "companyId" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "compensation_efficiency" => {
          "fields" => [
            {
              "name" => "ceo_name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "company_name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "efficiency_ratio",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "performance_score",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "total_compensation",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 4,
            },
          ],
          "name" => "compensation_efficiency",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/metrics/compensation-efficiency",
                  "parts" => [
                    "metrics",
                    "compensation-efficiency",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "general" => {
          "fields" => [
            {
              "name" => "status",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "timestamp",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
          ],
          "name" => "general",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/health",
                  "parts" => [
                    "health",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "get_root" => {
          "fields" => [
            {
              "name" => "documentation",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "message",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
          ],
          "name" => "get_root",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/",
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "parts" => [],
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "search" => {
          "fields" => [
            {
              "name" => "ceo_compensation",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "ceo_name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "company_name",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "employee",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "headquarter",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "id",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 5,
            },
            {
              "name" => "industry",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 6,
            },
            {
              "name" => "performance_metric",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 7,
            },
            {
              "name" => "revenue",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 8,
            },
          ],
          "name" => "search",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "field",
                        "orig" => "field",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "q",
                        "orig" => "q",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/search",
                  "parts" => [
                    "search",
                  ],
                  "select" => {
                    "exist" => [
                      "field",
                      "q",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    CeoraterFeatures.make_feature(name)
  end
end
