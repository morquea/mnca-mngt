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
                "pattern": "^[0-9a-f]{24}$"
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
                "minItems": 1,
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
            "entity_type": {
                "type": "string",
                "default": "thing"
            },
            "internal_attributes": {
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
            }
        },
        "required": ["service", "subservice", "apikey", "resource", "entity_type", "attributes"],
        "additionalProperties": false
    }
}

module.exports = schemas