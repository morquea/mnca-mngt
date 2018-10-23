let editor = {
    templates: {
        'iot/devices': [{
                text: 'Attribute',
                title: 'Insert a attribute Node',
                className: 'jsoneditor-type-object',
                field: 'attributeItem',
                value: {
                    'name': 'la',
                    'object_id': 'grande',
                    'type': 'vadrouille',
                }
            },
            {
                text: 'Command',
                title: 'Insert a command Node',
                className: 'jsoneditor-type-object',
                field: 'commandItem',
                value: {
                    'name': 'ping',
                    'type': 'command'
                }
            },
            {
                text: 'StaticAttr',
                title: 'Insert a static_attribute Node',
                className: 'jsoneditor-type-object',
                field: 'staticAttrItem',
                value: {
                    'name': 'james',
                    'type': 'bond',
                    'value': '007'
                }
            },
            {
                text: 'Endpoint',
                title: 'Insert a endpoint Node',
                className: 'jsoneditor-type-string',
                field: 'endpoint',
                value: 'foo'
            }

        ],
        'iot/services': [
            {
                text: 'Attributes',
                title: 'Insert a attributes Node',
                className: 'jsoneditor-type-array',
                field: 'attributes',
                value: []  
            },
            {
                text: 'Lazy',
                title: 'Insert a lazy Node',
                className: 'jsoneditor-type-array',
                field: 'lazy',
                value: []  
            },
            {
                text: 'Commands',
                title: 'Insert a commands Node',
                className: 'jsoneditor-type-array',
                field: 'commands',
                value: []  
            },
            {
                text: 'StaticAttrs',
                title: 'Insert a static_attributes Node',
                className: 'jsoneditor-type-array',
                field: 'static_attributes',
                value: []  
            },
            {
                text: 'InternalAttrs',
                title: 'Insert a internal_attributes Node',
                className: 'jsoneditor-type-array',
                field: 'internal_attributes',
                value: []  
            },
            {
                text: 'Cbroker',
                title: 'Insert a cbroker Node',
                className: 'jsoneditor-type-string',
                field: 'cbroker',
                value: 'http://localhost:1234' 
            },
            {
                text: 'Token',
                title: 'Insert a token Node',
                className: 'jsoneditor-type-string',
                field: 'token',
                value: 'foo123bar'  
            },
            {
                text: 'Attribute',
                title: 'Insert a attribute Node',
                className: 'jsoneditor-type-object',
                field: 'attributeItem',
                value: {
                    'name': 'la',
                    'object_id': 'grande',
                    'type': 'vadrouille',
                }
            },
            {
                text: 'Command',
                title: 'Insert a command Node',
                className: 'jsoneditor-type-object',
                field: 'commandItem',
                value: {
                    'name': 'little',
                    'type': 'big',
                    'value': 'man'
                }
            },
            {
                text: 'LazyItem',
                title: 'Insert a lazy Node',
                className: 'jsoneditor-type-object',
                field: 'lazyItem',
                value: {
                    'name': 'les',
                    'type': 'temps',
                    'value': 'modernes'
                }
            },
            {
                text: 'StaticAttr',
                title: 'Insert a static_attribute Node',
                className: 'jsoneditor-type-object',
                field: 'staticAttrItem',
                value: {
                    'name': 'james',
                    'type': 'bond',
                    'value': '007'
                }
            },
            {
                text: 'InternalAttr',
                title: 'Insert a internal_attribute Node',
                className: 'jsoneditor-type-object',
                field: 'internalAttrItem',
                value: {
                    'name': 'les',
                    'type': 'tontons',
                    'value': 'flingueurs'
                }
            }
        ],
        'orion/subscriptions': [
            {
                text: 'Entity',
                title: 'Insert an entity Node',
                className: 'jsoneditor-type-object',
                field: 'entityItem',
                value: {   
                    'idPattern': '.*'
                }
            },
            {
                text: 'Condition',
                title: 'Insert an Condition Node',
                className: 'jsoneditor-type-object',
                field: 'condition',
                value: {   
                    'attrs': [],
                    'expression': {
                        'q': 'foo'
                    }
                }
            },
            {
                text: 'Expression',
                title: 'Insert an Expression Node',
                className: 'jsoneditor-type-object',
                field: 'expression',
                value: {   
                }
            },
            {
                text: 'Http',
                title: 'Insert an Http Node',
                className: 'jsoneditor-type-object',
                field: 'http',
                value: { 
                    'url': 'http://somehost:987'  
                }
            },
            {
                text: 'HttpCustom',
                title: 'Insert an HttpCustom Node',
                className: 'jsoneditor-type-object',
                field: 'httpCustom',
                value: { 
                    'url': 'http://somehost:987'  
                }
            },
            {
                text: 'Attrs',
                title: 'Insert an Attrs Node',
                className: 'jsoneditor-type-array',
                field: 'attrs',
                value: []
            },
            {
                text: 'Headers',
                title: 'Insert an Headers Node',
                className: 'jsoneditor-type-object',
                field: 'headers',
                value: {}
            },
            {
                text: 'Qs',
                title: 'Insert an Qs Node',
                className: 'jsoneditor-type-object',
                field: 'qs',
                value: {}
            },
            {
                text: 'ExceptAttrs',
                title: 'Insert an ExceptAttrs Node',
                className: 'jsoneditor-type-array',
                field: 'exceptAttrs',
                value: [   
                ]
            },
            {
                text: 'Metadata',
                title: 'Insert an Metadata Node',
                className: 'jsoneditor-type-array',
                field: 'metadata',
                value: [   
                ]
            },
            {
                text: 'Description',
                title: 'Insert an Description Node',
                className: 'jsoneditor-type-string',
                field: 'description',
                value: 'foo'
            },
            {
                text: 'Attr',
                title: 'Insert an attr Node',
                className: 'jsoneditor-type-string',
                field: 'attrItem',
                value: 'foo'
            },
            {
                text: 'Type',
                title: 'Insert a type Node',
                className: 'jsoneditor-type-string',
                field: 'type',
                value: 'foo'
            },
            {
                text: 'TypePattern',
                title: 'Insert a typePattern Node',
                className: 'jsoneditor-type-string',
                field: 'typePattern',
                value: 'foo'
            },
            {
                text: 'entityItem.Id',
                title: 'Insert an entityItem.Id Node',
                className: 'jsoneditor-type-string',
                field: 'id',
                value: 'foo'
            },
            {
                text: 'IdPattern',
                title: 'Insert an IdPattern Node',
                className: 'jsoneditor-type-string',
                field: 'idPattern',
                value: 'foo'
            },
            {
                text: 'Header',
                title: 'Insert an Header Node',
                className: 'jsoneditor-type-string',
                field: '',
                value: ''
            },
            {
                text: 'Q',
                title: 'Insert an Q Node',
                className: 'jsoneditor-type-string',
                field: '',
                value: ''
            },
            {
                text: 'Mq',
                title: 'Insert an Mq Node',
                className: 'jsoneditor-type-string',
                field: 'mq',
                value: 'foo.bar>=123'
            },
            {
                text: 'Georel',
                title: 'Insert an Georel Node',
                className: 'jsoneditor-type-string',
                field: 'georel',
                value: 'foo'
            },
            {
                text: 'Geometry',
                title: 'Insert an Geometry Node',
                className: 'jsoneditor-type-string',
                field: 'geometry',
                value: 'Point'
            },
            {
                text: 'Coords',
                title: 'Insert an Coords Node',
                className: 'jsoneditor-type-string',
                field: 'coords',
                value: '[0,1]'
            },
            {
                text: 'Pattern',
                title: 'Insert an Pattern Node',
                className: 'jsoneditor-type-string',
                field: 'pattern',
                value: 'foo'
            },
            {
                text: 'Url',
                title: 'Insert an Url Node',
                className: 'jsoneditor-type-string',
                field: 'url',
                value: 'foo'
            },
            {
                text: 'Method',
                title: 'Insert an Method Node',
                className: 'jsoneditor-type-enum',
                field: 'method',
                value: 'POST'
            },
            {
                text: 'Payload',
                title: 'Insert an Payload Node',
                className: 'jsoneditor-type-string',
                field: 'payload',
                value: 'foo'
            },
            {
                text: 'AttrsFormat',
                title: 'Insert an AttrsFormat Node',
                className: 'jsoneditor-type-enum',
                field: 'attrsFormat',
                value: 'legacy'
            },
            {
                text: 'Expires',
                title: 'Insert an Expires Node',
                className: 'jsoneditor-type-string',
                field: 'expires',
                value: '2001-01-01T01:01:01.00Z'
            },
            {
                text: 'Status',
                title: 'Insert an Status Node',
                className: 'jsoneditor-type-enum',
                field: 'status',
                value: 'active'
            },
            {
                text: 'Throttling',
                title: 'Insert an Throttling Node',
                className: 'jsoneditor-type-number',
                field: 'throttling',
                value: 123
            }
        ],
    },
    context: {
        'iot/devices': {
            items: {
                'device.device_id': ['Insert', 'Append', '', 'Attributes', 'Static_Attributes', 'Commands', 'Endpoint'],
                'device.service': ['Insert', 'Append', '', 'Attributes', 'Static_Attributes', 'Commands', 'Endpoint'],
                'device.service_path': ['Insert', 'Append', '', 'Attributes', 'Static_Attributes', 'Commands', 'Endpoint'],
                'device.entity_name': ['Insert', 'Append', '', 'Attributes', 'Static_Attributes', 'Commands', 'Endpoint'],
                'device.entity_type': ['Insert', 'Append', '', 'Attributes', 'Static_Attributes', 'Commands', 'Endpoint'],
                'device.transport': ['Insert', 'Append', '', 'Attributes', 'Static_Attributes', 'Commands', 'Endpoint'],
                'device.protocol': ['Insert', 'Append', '', 'Attributes', 'Static_Attributes', 'Commands', 'Endpoint'],
                'device.attributes': ['Insert', 'Append', 'Remove', '', 'Static_Attributes', 'Commands', 'Endpoint'],
                'device.commands': ['Insert', 'Append', 'Remove', '', 'Attributes', 'Static_Attributes', 'Endpoint'],
                'device.static_attributes': ['Insert', 'Append', 'Remove', '', 'Attributes', 'Commands', 'Endpoint'],
                'device.endpoint': ['Insert', 'Append', '', 'Attributes', 'Static_Attributes', 'Commands'],
                'attributes.attributeItem': ['Insert', 'Append', 'Remove', 'Attribute'],
                'commands.commandItem': ['Insert', 'Append', 'Remove', 'Command'],
                'static_attributes.staticAttrItem': ['Insert', 'Append', 'Remove', 'StaticAttr']
            }
        },
        'iot/services': {
            items: {
                'service.apikey': ['Append' , 'Insert', '', 'Cbroker', 'Token', 'Attributes', 'Lazy', 'Commands', 'StaticAttrs', 'InternalAttrs'],
                'service.cbroker': ['Append', 'Insert', 'Remove', '', 'Token', 'Attributes', 'Lazy', 'Commands', 'StaticAttrs', 'InternalAttrs'],
                'service.token': ['Append', 'Insert', 'Remove', '', 'Cbroker', 'Attributes', 'Lazy', 'Commands', 'StaticAttrs', 'InternalAttrs'],
                'service.resource': ['Append' , 'Insert', '', 'Cbroker', 'Token', 'Attributes', 'Lazy', 'Commands', 'StaticAttrs', 'InternalAttrs'],
                'service.entity_type': ['Append' , 'Insert', '', 'Cbroker', 'Token', 'Attributes', 'Lazy', 'Commands', 'StaticAttrs', 'InternalAttrs'],
                'service.attributes': ['Append', 'Insert', 'Remove', '', 'Cbroker', 'Token', 'Lazy', 'Commands', 'StaticAttrs', 'InternalAttrs'],
                'service.lazy': ['Append', 'Insert', 'Remove', '', 'Cbroker', 'Token', 'Attributes', 'Commands', 'StaticAttrs', 'InternalAttrs'],
                'service.commands': ['Append', 'Insert', 'Remove', '', 'Cbroker', 'Token', 'Attributes', 'Lazy', 'StaticAttrs', 'InternalAttrs'],
                'service.static_attributes': ['Append', 'Insert', 'Remove', '', 'Cbroker', 'Token', 'Attributes', 'Lazy', 'Commands', 'InternalAttrs'],
                'service.internal_attributes': ['Append', 'Insert', 'Remove', '', 'Cbroker', 'Token', 'Attributes', 'Lazy', 'Commands', 'StaticAttrs'],
                'attributes.attributeItem': ['Append', 'Insert', 'Remove', '', 'Attribute'],
                'lazy.lazyItem':  ['Append', 'Insert', 'Remove', '', 'LazyItem'],
                'commands.commandItem':  ['Append', 'Insert', 'Remove', '', 'Command'],
                'static_attributes.staticAttrItem':  ['Append', 'Insert', 'Remove', '', 'StaticAttr'],
                'internal_attributes./^$/': ['Append', 'Insert', 'Remove', '', 'InternalAttr'], // new item wihout any item
                'internal_attributes./^[ -~]+$/': ['Append', 'Insert', 'Remove', '', 'InternalAttr'] // new item on existing item
            }
        },
        'orion/subscriptions': {
            items:  {
                'subscription./^$/': ['Append' , 'Insert', '', 'Description', 'Status', 'Expires', 'Throttling'],
                'subscription.id': ['Append' , 'Insert', '', 'Description', 'Status', 'Expires', 'Throttling'],
                'subscription.notification': ['Append', 'Insert', '', 'Description', 'Status', 'Expires', 'Throttling'],
                'subscription.subject': ['Append', 'Insert', '', 'Description', 'Status', 'Expires', 'Throttling'],
                'subscription.description': ['Append', 'Insert', 'Remove', '', 'Status', 'Expires', 'Throttling'],
                'subscription.status': ['Append', 'Insert', 'Remove', '', 'Description', 'Expires', 'Throttling'],
                'subscription.expires': ['Append', 'Insert', 'Remove', '', 'Description', 'Status', 'Throttling'],
                'subscription.throttling': ['Append', 'Insert', 'Remove', '', 'Description', 'Status', 'Expires'],
                'subject.entities': ['Append', 'Insert', '', 'Condition'],
                'subject.condition': ['Remove', ''],
                'notification./^$/': ['Append', 'Insert', '', 'Http', 'HttpCustom'],
                'notification.attrs': ['Append', 'Insert', 'Remove', '', 'ExceptAttrs', 'Http', 'HttpCustom', 'AttrsFormat', 'Metadata'],
                'notification.exceptAttrs': ['Append', 'Insert', 'Remove', '', 'Attrs', 'Http', 'HttpCustom', 'AttrsFormat', 'Metadata'],
                'notification.http': ['Append', 'Insert', 'Remove', '', 'Attrs', 'ExceptAttrs', 'HttpCustom', 'AttrsFormat', 'Metadata'],
                'notification.httpCustom': ['Append', 'Insert', 'Remove', '', 'Attrs', 'ExceptAttrs', 'Http', 'AttrsFormat', 'Metadata'],
                'notification.attrsFormat': ['Append', 'Insert', 'Remove', '', 'Attrs', 'ExceptAttrs', 'Http', 'HttpCustom', 'Metadata'],
                'notification.metadata': ['Append', 'Insert', 'Remove', '', 'Attrs', 'ExceptAttrs', 'Http', 'HttpCustom', 'AttrsFormat'],
                'entityItem.id': ['Append', 'Remove', '',  'IdPattern', 'Type', 'TypePattern'],
                'entityItem.idPattern': ['Append', 'Remove', '', 'entityItem.Id', 'Type', 'TypePattern'],
                'entityItem.type': ['Append', 'Remove', '', 'entityItem.Id', 'IdPattern', 'TypePattern'],
                'entityItem.typePattern': ['Append', 'Remove', '', 'entityItem.Id', 'IdPattern', 'Type'],
                'condition./^$/': ['Append', 'Insert', 'Remove', '', 'Attrs', 'Expression'],
                'condition.attrs': ['Append', 'Insert', 'Remove', '', 'Expression'],
                'condition.expression': ['Append', 'Insert', 'Remove', '', 'Attrs'],
                'httpCustom.url': ['Append', 'Insert', '', 'Headers', 'Qs', 'Method', 'Payload'],
                'httpCustom.headers': ['Append', 'Insert', 'Remove', '', 'Qs', 'Method', 'Payload'],
                'httpCustom.qs': ['Append', 'Insert', 'Remove', '', 'Headers', 'Method', 'Payload'],
                'httpCustom.method': ['Append', 'Insert', 'Remove', '', 'Headers', 'Qs', 'Payload'],
                'httpCustom.payload': ['Append', 'Insert', 'Remove', '', 'Headers', 'Qs', 'Method'],
                'expression./^$/': ['Append', 'Insert', '', 'Q', 'Mq', 'Georel', 'Geometry', 'Coords'],
                'expression.q': ['Append', 'Insert', 'Remove', '', 'Mq', 'Georel', 'Geometry', 'Coords'],
                'expression.mq': ['Append', 'Insert', 'Remove', '', 'Q', 'Georel', 'Geometry', 'Coords'],
                'expression.georel': ['Append', 'Insert', 'Remove', '', 'Q', 'Mq', 'Geometry', 'Coords'],
                'expression.geometry': ['Append', 'Insert', 'Remove', '', 'Q', 'Mq', 'Georel', 'Coords'],
                'expression.coords': ['Append', 'Insert', 'Remove', '', 'Q', 'Mq', 'Georel', 'Geometry'],
                'entities.entityItem': ['Append', 'Insert', 'Remove', '', 'Entity'],
                'attrs.attrItem': ['Append', 'Insert', 'Remove', '', 'Attr'],
                'exceptAttrs.exceptAttrItem': ['Append', 'Insert', 'Remove', '', 'ExceptAttr'],
                'qs./^$/': ['Append', 'Insert', 'Remove', '', 'Q'], // new item wihout any item
                'qs./^[ -~]+$/': ['Append', 'Insert', 'Remove', '', 'Q'], // new item on existing item
                'headers./^$/': ['Append', 'Insert', 'Remove', '', 'Header'], // new item wihout any item
                'headers./^[ -~]+$/': ['Append', 'Insert', 'Remove', '', 'Header'] // new item on existing item
            }
        }
    },
    itemName: {
        'iot/devices': {
            children: {
                attributes: 'attributeItem',
                static_attributes: 'staticAttrItem',
                lazy: 'lazyItem',
                commands: 'commandItem'              
            }
        },
        'iot/services': {
            children: {
                attributes: 'attributeItem',
                static_attributes: 'staticAttrItem',
                internal_attributes: 'internalAttrItem',
                lazy: 'lazyItem',
                commands: 'commandItem',
            }
        },
        'orion/subscriptions': {
            children: {
                entities: 'entityItem',
                attrs: 'attrItem'         
            }
        }
    }
}

module.exports = editor