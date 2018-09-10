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
                    'name': 'little',
                    'type': 'big',
                    'value': 'man'
                }
            },
            {
                text: 'Lazy',
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
            }

        ],
        'iot/services': [{
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
                text: 'Lazy',
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
        ]
    },
    context: {
        'iot/devices': {
            items: {
                attributeItem: ['Insert', 'Append', 'Remove', 'Duplicate', 'Attribute'],
                staticAttrItem: ['Insert', 'Append', 'Remove', 'Duplicate', 'StaticAttr'],
                lazyItem: ['Insert', 'Append', 'Remove', 'Duplicate', 'Lazy'],
                commandItem: ['Insert', 'Append', 'Remove', 'Duplicate', 'Command'],
            },
            children: {
                attributes: ['Append', 'Attribute'],
                static_attributes: ['Append', 'StaticAttr'],
                lazy: ['Append', 'Lazy'],
                commands: ['Append', 'Command'],
            }
        },
        'iot/services': {
            items: {
                attributeItem: ['Insert', 'Append', 'Remove', 'Duplicate', 'Attribute'],
                staticAttrItem: ['Insert', 'Append', 'Remove', 'Duplicate', 'StaticAttr'],
                internalAttrItem: ['Insert', 'Append', 'Remove', 'Duplicate', 'InternalAttr'],
                lazyItem: ['Insert', 'Append', 'Remove', 'Duplicate', 'Lazy'],
                commandItem: ['Insert', 'Append', 'Remove', 'Duplicate', 'Command'],
            },
            children: {
                attributes: ['Append', 'Attribute'],
                static_attributes: ['Append', 'StaticAttr'],
                internal_attributes: ['Append', 'InternalAttr'],
                lazy: ['Append', 'Lazy'],
                commands: ['Append', 'Command'],
            }
        }
    },
    itemName: {
        'iot/devices': {
            children: {
                attributes: 'attributeItem',
                internal_attributes: 'internalAttrItem',
                lazy: 'lazyItem',
                commands: 'commandItem',
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
        }
    }
}

module.exports = editor