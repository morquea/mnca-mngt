let schemas = {
    "devices": {
        "type": "object",
        "properties": {
            "device_id": {
                "type": "string",
                "pattern": "^[\x20-\x7F]+$"
            },
            "service_path": {
                "type": "string",
                "pattern": "^\/[\x20-\x7F]+$"
            },
            "service": {
                "type": "string",
                "pattern": "^[\x20-\x7F]+$"
            },
            "entity_type": {
                "type": "string",
                "pattern": "^thing$"
            },
            "entity_name": {
                "type": "string",
                "pattern": "^[\x20-\x7F]+$"
            },
            "attributes": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "object_id": {
                            "type": "string"
                        },
                        "name": {
                            "type": "string"
                        },
                        "type": {
                            "enum": ["string", "float", "integer", "geo:point", "geo:line", "geo:box", "geo:json"]
                        }
                    },
                    "required": ["object_id", "name", "type"]
                }
            },
            "lazy": {
                "type": "array"
            },
            "commands": {
                "type": "array"
            },
            "static_attributes": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "type": {
                            "enum": ["string", "float", "integer", "geo:point", "geo:line", "geo:box", "geo:json"]
                        },
                        "value": {
                            "type": "string"
                        }
                    },
                    "required": ["value", "name", "type"],
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
                "pattern": "^\/[\x20-\x7F]+$"
            },
            "service": {
                "type": "string",
                "pattern": "^[\x20-\x7F]+$"
            },
            "apikey": {
                "type": "string",
                "pattern": "^[\x20-\x7F]+$"
            },
            "resource": {
                "type": "string",
                "pattern": "^\/[\x20-\x7F]+$"
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
                "items": {
                    "type": "object",
                    "properties": {
                        "object_id": {
                            "type": "string"
                        },
                        "name": {
                            "type": "string"
                        },
                        "type": {
                            "enum": ["string", "float", "integer", "geo:point", "geo:line", "geo:box", "geo:json"]
                        }
                    },
                    "required": ["object_id", "name", "type"]
                }
            },
            "lazy": {
                "type": "array"
            },
            "commands": {
                "type": "array"
            },
            "entity_type": {
                "type": "string",
                "pattern": "^thing$"
            },
            "internal_attributes": {
                "type": "array"
            },
            "static_attributes": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "type": {
                            "enum": ["string", "float", "integer", "geo:point", "geo:line", "geo:box", "geo:json"]
                        },
                        "value": {
                            "type": "string"
                        }
                    },
                    "required": ["value", "name", "type"],
                }
            }

        },
        "required": ["service", "subservice", "apikey", "resource", "entity_type", "attributes"],
        "additionalProperties": false
    }
}

module.exports = schemas