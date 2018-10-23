let attributs = {

    'iot/services': {
        'readonly': {
            'update': ['_id', 'service', 'subservice', 'apikey', 'resource'],
            'clone': ['service', 'subservice', 'apikey', 'resource'],
            'create': ['service', 'subservice', 'apikey', 'resource'],
            'delete': ['_id', 'service', 'subservice', 'apikey', 'resource']
        },
        'readwrite': {
            'update': ['entity_type', 'cbroker', 'token', 'attributes', 'lazy', 'commands', 'internal_attributes', 'static_attributes'],
            'clone': ['entity_type', 'cbroker', 'token', 'attributes', 'lazy', 'commands', 'internal_attributes', 'static_attributes'],
            'create': ['entity_type', 'cbroker', 'token', 'attributes', 'lazy', 'commands', 'internal_attributes', 'static_attributes'],
            'delete': ['entity_type', 'cbroker', 'token', 'attributes', 'lazy', 'commands', 'internal_attributes', 'static_attributes']
        },
        'list': [{ name: 'service', label: 'Service' }, { name: 'subservice', label: 'Service Path' }, { name: 'resource', label: 'Resource' }, { name: 'apikey', label: 'API Key' }],
        'key': '_id'
    },
    'iot/devices': {
        'readonly': {
            'update': ['device_id', 'service', 'service_path', 'entity_name', 'entity_type', 'protocol', 'transport']
        },
        'readwrite': {
            'update': ['attributes', 'commands', 'static_attributes', 'endpoint']
        },
        'list': [{ name: 'service', label: 'Service' }, { name: 'service_path', label: 'Service Path' }, { name: 'device_id', label: 'Device ID' }, { name: 'entity_name', label: 'Entity name' }],
        'key': 'device_id'
    },
    'orion/subscriptions': {
        'readonly': {
            'update': ['id', 'notification.lastFailure', 'notification.lastNotification', 'notification.lastSuccess', 'notification.timeSent'],
            'clone': ['id', 'notification.lastFailure', 'notification.lastNotification', 'notification.lastSuccess', 'notification.timeSent'],
            'create': ['id', 'notification.lastFailure', 'notification.lastNotification', 'notification.lastSuccess', 'notification.timeSent'],
            'delete': ['id', 'notification.lastFailure', 'notification.lastNotification', 'notification.lastSuccess', 'notification.timeSent']
        },
        'readwrite': {
            'update': ['description', 'subject', 'notification', 'status', 'expires', 'throttling'],
            'clone': ['description', 'subject', 'notification', 'status', 'expires', 'throttling'],
            'create': ['description', 'subject', 'notification', 'status', 'expires', 'throttling'],
            'delete': ['description', 'subject', 'notification', 'status', 'expires', 'throttling']
        },
        'list': [{ name: 'description', label: 'Description' }, { name: 'expires', label: 'Expiration date' }, { name: 'id', label: 'Subscription ID' }],
        'key': 'id'
    }
}

module.exports = attributs