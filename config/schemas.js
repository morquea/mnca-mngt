let schemas = {
    "devices": {
        "type": "object",
        "properties": {
            "device_id": {
                "type": "string",
                "pattern": "^[ -~]+$"
            },
            "service_path": {
                "type": "string",
                "pattern": "^\/[ -~]+$"
            },
            "service": {
                "type": "string",
                "pattern": "^[ -~]+$"
            },
            "entity_type": {
                "type": "string",
                "pattern": "^[ -~]+$"
            },
            "entity_name": {
                "type": "string",
                "pattern": "^[ -~]+$"
            },
            "attributes": {
                "type": "array",
                "uniqueItems": true,
                "items": {
                    "title": "attribute",
                    "type": "object",
                    "minProperties": 3,
                    "maxProperties": 3,
                    "properties": {
                        "object_id": {
                            "type": "string",
                            "isNotEmpty": true,
                            //    "default": "foo"
                        },
                        "name": {
                            "type": "string",
                            "isNotEmpty": true,
                            //    "default": "bar"
                        },
                        "type": {
                            "type": "string",
                            "isNotEmpty": true,
                            //    "default": "baz"
                        }
                    },
                    "required": ["object_id", "name", "type"],
                    "additionalProperties": false

                }
            },
            "lazy": {
                "type": "array",
                "maxItems": 0,
                "uniqueItems": true,
                "items": {
                    "type": "object",
                    "minProperties": 3,
                    "maxProperties": 3,
                    "properties": {
                        "name": {
                            "type": "string",
                            "isNotEmpty": true,

                        },
                        "type": {
                            'type': "string",
                            "isNotEmpty": true,

                        },
                        "value": {
                            "type": "string",
                            "isNotEmpty": true,

                        }
                    },
                    "required": ["name", "type", "value"],
                    "additionalProperties": false
                }
            },
            "commands": {
                "type": "array",
                "uniqueItems": true,
                "items": {
                    "type": "object",
                    "minProperties": 2,
                    "maxProperties": 2,
                    "properties": {
                        "name": {
                            "type": "string",
                            "isNotEmpty": true,

                        },
                        "type": {
                            'type': "string",
                            "isNotEmpty": true,
                            "enum": ["command"]
                        }
                    },
                    "required": ["name", "type"],
                    "additionalProperties": false
                }
            },
            "static_attributes": {
                "type": "array",
                "uniqueItems": true,
                "items": {
                    "type": "object",
                    "minProperties": 3,
                    "maxProperties": 3,
                    "properties": {
                        "name": {
                            "type": "string",
                            "isNotEmpty": true,

                        },
                        "type": {
                            'type': "string",
                            "isNotEmpty": true,

                        },
                        "value": {
                            "type": "string",
                            "isNotEmpty": true,

                        }
                    },
                    "required": ["name", "type", "value"],
                    "additionalProperties": false
                }
            },
            "endpoint": {
                "type": "string",
                "pattern": "^([ -~]+|)$"
            },
            "protocol": {
                "type": "string",
                "pattern": "^[ -~]+$"    
            },
            "transport": {
                "type": "string",
                "pattern": "^[ -~]+$"    
            }
        },
        "required": ["device_id", "service", "service_path", "entity_type", "entity_name"],
        "additionalProperties": false
    },
    "services": {
        "type": "object",
        "properties": {
            "_id": {
                "type": "string",
                "pattern": "^([0-9a-f]{24}|)$"
            },
            "subservice": {
                "type": "string",
                "pattern": "^\/[ -~]+$"
            },
            "service": {
                "type": "string",
                "pattern": "^[ -~]+$"
            },
            "apikey": {
                "type": "string",
                "pattern": "^[ -~]+$"
            },
            "resource": {
                "type": "string",
                "pattern": "^\/[ -~]+$"
            },
            "__v": {
                "type": "number",
                "pattern": "^[0]{1}$"
            },
            "cbroker": {
                "type": "string",
                "format": "uri"
            },
            "attributes": {
                "type": "array",
               // "minItems": 1,
                "uniqueItems": true,
                "items": {
                    "title": "attribute",
                    "type": "object",
                    "minProperties": 3,
                    "maxProperties": 3,
                    "properties": {
                        "object_id": {
                            "type": "string",
                            "isNotEmpty": true
                        },
                        "name": {
                            "type": "string",
                            "isNotEmpty": true
                        },
                        "type": {
                            "type": "string",
                            "isNotEmpty": true
                        }
                    },
                    "required": ["object_id", "name", "type"],
                    "additionalProperties": false

                }
            },
            "lazy": {
                "type": "array",
                "uniqueItems": true,
                "items": {
                    "type": "object",
                    "minProperties": 2,
                    "maxProperties": 3,
                    "properties": {
                        "name": {
                            "type": "string",
                            "isNotEmpty": true,

                        },
                        "type": {
                            'type': "string",
                            "isNotEmpty": true,

                        },
                        "value": {
                            "type": "string",
                            "isNotEmpty": true,

                        }
                    },
                    "required": ["name", "type"],
                    "additionalProperties": false
                }
            },
            "commands": {
                "type": "array",
                "uniqueItems": true,
                "items": {
                    "type": "object",
                    "minProperties": 2,
                    "maxProperties": 3,
                    "properties": {
                        "name": {
                            "type": "string",
                            "isNotEmpty": true,

                        },
                        "type": {
                            'type': "string",
                            "isNotEmpty": true,

                        },
                        "value": {
                            "type": "string",
                            "isNotEmpty": true,

                        }
                    },
                    "required": ["name", "type"],
                    "additionalProperties": false
                }
            },
            "entity_type": {
                "type": "string",
                "isNotEmpty": true
            },
            "internal_attributes": {
                "type": "array",
                "uniqueItems": true,
                "items": {
                    "type": "object",
                    "patternProperties": {
                        "^[ -~]+$": {"type": "string"}
                    }
                }
            },
            "static_attributes": {
                "type": "array",
                "uniqueItems": true,
                "items": {
                    "type": "object",
                    "minProperties": 2,
                    "maxProperties": 3,
                    "properties": {
                        "name": {
                            "type": "string",
                            "isNotEmpty": true,

                        },
                        "type": {
                            'type': "string",
                            "isNotEmpty": true,

                        },
                        "value": {
                            "type": "string",
                            "isNotEmpty": true,

                        }
                    },
                    "required": ["name", "type"],
                    "additionalProperties": false
                }
            }
        },
        "required": ["service", "subservice", "apikey", "resource", "entity_type"],
        "additionalProperties": false
    },
    "subscriptions": {
        "type": "object",
        "properties": {
            "id": {
                "type": "string",
                "pattern": "^([0-9a-f]{24}|)$"
            },
            "description": {
                "type": "string",
                "pattern": "^[ -~]+$"
            },
            "subject": {
                "type": "object",
                "properties": {
                    "entities": {
                        "type": "array",
                        "minItems": 1,
                        "items": {
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "string",
                                    "pattern": "^[0-9a-f]{24}$"
                                },
                                "idPattern": {
                                    "type": "string",
                                    "pattern": "^[ -~]+$"
                                },
                                "type": {
                                    "type": "string",
                                    "pattern": "^[ -~]+$"
                                },
                                "typePattern": {
                                    "type": "string",
                                    "pattern": "^[ -~]+$"
                                }
                            },
                            "oneOf": [
                                {
                                    "required": ["id"],
                                    "not": {
                                        "required": ["idPattern"]
                                    }
                                },
                                {
                                    "required": ["idPattern"],
                                    "not": {
                                        "required": ["id"]
                                    }
                                }
                            ],
                            "dependencies": {
                                "type": {
                                    "not": {
                                        "required": ["typePattern"]
                                    }
                                },
                                "typePattern": {
                                    "not": {
                                        "required": ["type"]
                                    }
                                }
                            },
                            "additionalProperties": false
                        }
                    },
                    "condition": {
                        "type": "object",
                        "properties": {
                            "attrs": {
                                "type": "array",
                                "items": {
                                    "type": "string",
                                    "pattern": "^[ -~]+$"
                                }
                            },
                            "expression": {
                                "type": "object",
                                "properties": {
                                    "q": {
                                        "type": "string",
                                        "pattern": "^[ -~]+$"
                                    },
                                    "mq": {
                                        "type": "string",
                                        "pattern": "^[ -~]+$"
                                    },
                                    "georel": {
                                        "type": "string",
                                        "pattern": "^[ -~]+$"
                                    },
                                    "geometry": {
                                        "type": "string",
                                        "pattern": "^[ -~]+$"
                                    },
                                    "coords": {
                                        "type": "string",
                                        "pattern": "^[ -~]+$"
                                    }
                                },
                                "additionalProperties": false
                            }
                        },
                        "additionalProperties": false
                    }
                },
                "required": ["entities"],
                "additionalProperties": false
            },
            "notification": {
                "type": "object",
                "properties": {
                    "attrs": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "pattern": "^[ -~]+$"
                        }
                    },
                    "exceptAttrs": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "pattern": "^[ -~]+$"
                        }
                    },
                    "http": {
                        "type": "object",
                        "properties": {
                            "url": {
                                "type": "string",
                                "format": "uri"
                            }
                        },
                        "required": ["url"],
                        "additionalProperties": false
                    },
                    "httpCustom": {
                        "type": "object",
                        "properties": {
                            "url": {
                                "type": "string",
                                "format": "uri"
                            },
                            "headers": {
                                "type": "object",
                                "patternProperties": {
                                    "^[ -~]+$": {"type": "string"}
                                }
                            },
                            "qs": {
                                "type": "object",
                                "patternProperties": {
                                    "^[ -~]+$": {"type": "string"}
                                }
                            },
                            "method": {
                                "type": "string",
                                "enum": ["POST", "GET", "PUT"]
                            },
                            "payload": {
                                "type": "string"
                            }
                        },
                        "required": ["url"],
                        "additionalProperties": false
                    },
                    "attrsFormat": {
                        "type": "string",
                        "enum": ["normalized", "keyvalues", "values", "legacy"]
                    },
                    "metadata": {
                        "type": "array"                       
                    },
                    "timesSent": {
                        "type": "integer"
                    },
                    "lastNotification": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "lastFailure": {
                        "type": "string",
                        "format": "date-time"
                    },
                    "lastSuccess": {
                        "type": "string",
                        "format": "date-time"
                    }
                },
                "oneOf": [
                    {
                        "required": ["http"],
                        "not": {
                            "required": ["httpCustom"]
                        }
                    },
                    {
                        "required": ["httpCustom"],
                        "not": {
                            "required": ["http"]
                        }
                    }
                ],
                "dependencies": {
                    "attrs": {
                        "not": {
                            "required": ["exceptAttrs"]
                        }
                    },
                    "exceptAttrs": {
                        "not": {
                            "required": ["attrs"]
                        }
                    }
                },
                "additionalProperties": false
            },
            "expires": {
                "type": "string",
                "format": "date-time"
            },
            "status": {
                "type": "string",
                "oneOf": [
                    {"enum": ["active", "inactive"]},
                    {"const": "failed"},
                    {"const": "expired"}
                ] 
            },
            "throttling": {
                "type": "integer"
            }
        },
        "required": ["id", "subject", "notification", "status"],
        "additionalProperties": false
           
    }
}

module.exports = schemas