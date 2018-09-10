//$(document).ready(function() {
document.addEventListener("DOMContentLoaded", function() {

    if (document.getElementById('jsoneditor')) {

        const container = document.getElementById("jsoneditor")

        const ajv = new window.Ajv({
            allErrors: true,
            verbose: true,
            useDefaults: true,
            //jsonPointers: true  //not working with jsoneditor
        })

        ajv.addKeyword('isNotEmpty', {
            type: 'string',
            validate: function(schema, data, parent_schema, current_data_path, parent_data_object, parent_property_name) {
                //console.log('isnoempty')
                //console.log(JSON.stringify({ schema, data, parent_schema, current_data_path, parent_data_object, parent_property_name }, null, 2))

                return typeof data === 'string' && data.trim() !== ''
            },
            errors: false
        })

        let schema = JSON.parse($('#jsonschema').val(), null, 2)

        let validate = ajv.compile(schema)

        // retrieve rootName of json from  form action attribute: /api/iot/<rootName>/xxxx
        let rootName = $('form').attr('action').split('/')[3]
        rootName = rootName.substr(0, rootName.length - 1) // remove s char at end

        let options = {
            ajv: ajv,
            mode: 'view',
            sortObjectKeys: true,
            name: rootName
        }

        if (document.getElementById('readonly')) {

            let readonly = JSON.parse($('#readonly').val())

            let readwrite = JSON.parse($('#readwrite').val())

            let templates = JSON.parse($('#templates').val(), null, 2)

            let context = JSON.parse($('#context').val(), null, 2)

            let itemName = JSON.parse($('#itemName').val(), null, 2)


            options = {
                ajv: ajv,
                mode: 'tree',
                sortObjectKeys: true,
                name: rootName,
                schema: schema,
                templates: templates,
                context: context,
                itemName: itemName,

                onEditable: function(node) {
                    //console.log('oneditable')
                    //console.log(node)
                    if (node.path === null) {
                        return { field: false, value: false }
                    }
                    //if (['_id', 'service', 'subservice', 'apikey', 'resource', '__v'].includes(node.field)) {
                    if (node.path.length >= 1 && readonly.includes(node.path[0])) {
                        //console.log('found field ' + node.field + ' value ' + node.value + ' path ' + node.path)
                        return { field: false, value: false }
                    }
                    if (node.path.length >= 1 && readwrite.includes(node.path[0])) {
                        //console.log('found field ' + node.field + ' value ' + node.value + ' path ' + node.path)
                        if (node.path.length <= 3) {
                            return { field: true, value: true }
                        } else {
                            return { field: false, value: true }
                        }
                    }

                    return { field: false, value: false }
                },
                onError: function(er) {
                    console.log('handler error ' + er)
                }
            }
        }

        let editor = new window.JSONEditor(container, options)
        //editor.setSchema(schema)

        let json = JSON.parse(document.getElementById("json").value)


        if (document.getElementById('readonly')) {

            let readonly = JSON.parse(document.getElementById('readonly').value)

            // get json
            const getJSON = function() {
                let jsonTmp = editor.get()

                document.getElementById('json').value = JSON.stringify(jsonTmp, null, 2)
            }

            // listeners
            const editBtn = document.getElementById('btnEdit')
            const saveBtn = document.getElementById('btnSave')
            const sendBtn = document.getElementById('btnSend')

            editBtn.addEventListener('click', function(event) {
                editBtn.classList.add('disabled')
                saveBtn.classList.remove('disabled')
                sendBtn.classList.add('disabled')
                editor.setMode('tree')
                return false
            })

            saveBtn.addEventListener('click', function(event) {


                let jsonTmp = editor.get()

                let validate = ajv.compile(schema)

                let valid = validate(jsonTmp)

                if (!valid) {

                    let errorFields = validate.errors.reduce(function(acc, e) {
                        acc[e.dataPath.slice(1)] = [e.message.toUpperCase()[0] + e.message.slice(1)];
                        return acc;
                    }, {})
                    console.log(errorFields)
                    return false
                } else {
                    //console.log('OK AJV!!')
                    $('#json').val(JSON.stringify(jsonTmp, null, 2))
                    editBtn.classList.remove('disabled')
                    saveBtn.classList.add('disabled')
                    sendBtn.classList.remove('disabled')
                    editor.setMode('view')
                    return false
                }
            })

        }

        const undoBtn = document.getElementById('btnUndo')

        undoBtn.addEventListener('click', function(event) {
            document.getElementById('doit').value = 'undo'
            return true
        })


        if ($('#divCreService').length > 0) {

            let servicekeys = JSON.parse($('#inpServiceKeys').val(), null, 2)

            $('#btnDef').on('click', function(ev) {

                let servicekeytab = []

                $('input.cloneservice').each(function() {

                    if ($(this).val()) {
                        servicekeytab.push($(this).val())
                    }

                })

                $('input.createservice').each(function() {

                    if ($(this).val()) {
                        servicekeytab.push($(this).val())
                    }

                })

                json.service = servicekeytab[0]
                json.subservice = servicekeytab[1]
                json.apikey = servicekeytab[2]
                json.resource = servicekeytab[3]

                editor.set(json)

                $('#divCreEditor').show()

            })

            $('#btnUnDef').on('click', function(ev) {

                $('#btnDef').addClass('disabled')
                $('#divCreEditor').hide()

                $('input.createservice').val('')

                let service = ''

                if ($('#inpService').length > 0) {
                    service = $('#inpService').val()

                }

                let subservice = ''

                if ($('#inpSubService').length > 0) {
                    subservice = $('#inpSubService').val()

                }

                json.service = service
                json.subservice = subservice
                json.apikey = ''
                json.resource = ''

            })

            $('#btnUndo2').on('click', function(ev) {

                $('#btnUndo').click()

            })

            $('#btnSave').on('click', function(ev) {

                $('#divCreService').hide()

            })

            $('#btnEdit').on('click', function(ev) {

                $('#divCreService').show()

            })


            $('input.createservice').on('input', function(ev) {

                $('div.ui.negative.message').hide().text('')

                let servicekeytab = []

                $('input.cloneservice').each(function() {

                    if ($(this).val()) {
                        servicekeytab.push($(this).val())
                    }

                })

                $('input.createservice').each(function() {

                    if ($(this).val()) {
                        servicekeytab.push($(this).val())
                    }

                })

                if (servicekeytab.length == 4) {
                    let servicekey = servicekeytab.join('|')

                    if (servicekeys.includes(servicekey)) {

                        //console.log('found servicekey ')
                        $('div.ui.negative.message').show().text('La définition du service existe déjà')
                        $('#btnDef').addClass('disabled')

                    } else {
                        $('#btnDef').removeClass('disabled')
                    }
                } else {
                    $('#btnDef').addClass('disabled')
                }

            })

        }

        editor.set(json)

    }


    $('#id_accueil').each(function() {
        let href = $(location).attr('href')

        //console.log('accueil location ' + href)

        href = href.substr(href.indexOf('://') + 3)

        //console.log('accueil href ' + href)

        let path = href.substr(href.indexOf('/'))

        //console.log('accueil path ' + path)

        if (path == '/') {

            $(this).addClass('active')

        } else {

            $(this).removeClass('active')

        }

    })

    $('#id_services').each(function() {
        let href = $(location).attr('href')

        href = href.substr(href.indexOf('://') + 3)

        let path = href.substr(href.indexOf('/'))

        if (path == '/api/iot/services') {

            $(this).addClass('active')

        } else {

            $(this).removeClass('active')

        }

    })

    $('#id_devices').each(function() {
        let href = $(location).attr('href')

        href = href.substr(href.indexOf('://') + 3)

        let path = href.substr(href.indexOf('/'))

        if (path == '/api/iot/devices') {

            $(this).addClass('active')

        } else {

            $(this).removeClass('active')

        }

    })

    $('.ui.dropdown').dropdown()

    $('.ui.dropdown.fw_service').dropdown('setting', 'onChange', function(ev) {

        //console.log('fw_service changed to ' + ev)
        //console.log('servicekeys ' + $('#fwServiceKeys').val())

        $('div.iotlist').hide()

        let fw_servicekeys = JSON.parse($('#fwServiceKeys').val(), null, 2)

        if (ev != '*' && ev != '') {

            fw_servicekeys = fw_servicekeys.filter(el => el.split('|')[0] == ev)

            //console.log(fw_servicekeys)

            $('.ui.dropdown.fw_servicepath div.item').each(function(idx) {
                let data_value = $(this).attr('data-value')

                //console.log('element ' + ev + '|' + data_value)

                if ( /* !fw_servicekeys.includes(ev + '|' + data_value) && */ data_value != '' && data_value != '/*') {
                    //console.log('remove data-value ' + data_value)
                    $(this).remove()
                }

            })

        } else {

            //console.log(fw_servicekeys)

        }

        fw_servicekeys.forEach(el => {

            let data_value = el.split('|')[1]

            if ($('.ui.dropdown.fw_servicepath div.item[data-value="' + data_value + '"]').length == 0) {

                //console.log('add data-value ' + data_value)

                $('.ui.dropdown.fw_servicepath div.item:last').after('<div class="item" data-value="' + data_value + '">' + data_value + '</div>')

            }
        })

        //console.log('defaut data-value ' + $('.ui.dropdown.fw_servicepath div.item:first').attr('data-value'))

        $('.ui.dropdown.fw_servicepath input').val($('.ui.dropdown.fw_servicepath div.item:first').attr('data-value'))

        //console.log('defaut text ' + $('.ui.dropdown.fw_servicepath div.item:first').text())

        $('.ui.dropdown.fw_servicepath div.text').text($('.ui.dropdown.fw_servicepath div.item:first').text())

    })

    if ($('#btnNoSel').length > 0) {

        $('#btnNoSel').on('click', function(ev) {

            $('#inpService').val('*')
            $('#inpSubService').val('/*')

            return true
        })
    }

    if ($('#btnNoSel2').length > 0) {

        $('#btnNoSel2').on('click', function(ev) {

            $('#inpService').val('')
            $('#inpSubService').val('')

            return true
        })
    }

    if ($('.pagination').length > 0) {

        $(".pagination a").click(function() {

            // si on reclick sur la page active, on ne fait rien
            if (!($(this).hasClass('active'))) {
                //console.log('click on a')
                // on enlève l'ancienne page active et on active la courante
                $(".pagination a.active").removeClass('active')
                $(this).addClass('active')
                let current_page = parseInt($(this).attr('data-value'))
                $('#inpPager').val('{"todo": "pager", "page": "' + current_page + '"}')
                // on reconstruit la pagination
                $('#inpPager').click()

            }
        })

    }

})