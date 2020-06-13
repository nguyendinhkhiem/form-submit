(function() {
    var settings = {};
    var store = window.__STORE__ || {};
    this.Store = function(options) {
        settings = extend({}, settings, options);
    }
    // Public function
    Store.prototype.change = function(key, func) { // Cache key an func
        store[key] = store[key] || {
            value: "",
            func: []
        };
        store[key].func.push(func);
    }
    Store.prototype.update = function(key, value) { // 
        store[key] = store[key] || {
            value: "",
            func: []
        };
        store[key].value = value;
        var dataFunc = store[key].func;
        for (var i = 0; i < dataFunc.length; i++) {
            var func = dataFunc[i];
            func(value);
        }

        window.__STORE__ = store
    }
    Store.prototype.get = function(key, value) { // 
        store[key] = store[key] || {
            value: "",
            func: []
        };
        return store[key].value;
    }

    Store.prototype.view = function() {
        return store;
    }
    // Private function
    var extend = function(out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i])
                continue;

            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key))
                    out[key] = arguments[i][key];
            }
        }

        return out;
    };
}());

var store = new Store();
window.store = store;

$(document).ready(function(){
    var showPopupConfigSubmitForm = function(object){
        var configForm = $(object).find('form').attr('data-config');

        var classListApp = '';
        var classFormConfig = '';
        var classMapping = '';
        if(configForm){
            try {
                var configForm = JSON.parse(configForm);
                var statusConfig = configForm.config;
                if(statusConfig == true){
                    classMapping = 'active';
                    classListApp = 'active';
                    classFormConfig = 'active';
                }else{
                    classListApp = 'active';
                    classFormConfig = '';
                    classMapping = '';
                }
            } catch (error) {
                console.log('error :>> ', error);
            }
        }else{
            classListApp = 'active';
            classFormConfig = '';
            classMapping = '';
        }
        
        var arrayOptions = [
            {
                name: 'firebase',
                title: 'Firebase',
                image: 'http://192.168.19.75:8121/statics/images/firebase_28dp.png',
                dataConfig: [
                    {
                        label: 'API Key',
                        name: 'apiKeyFirebase'
                    },
                    {
                        label: 'Project Id',
                        name: 'projectIdFirebase'
                    },
                    {
                        label: 'Measurement Id',
                        name: 'measurementIdFirebase'
                    },
                    {
                        label: 'Messaging Sender Id',
                        name: 'messagingSenderIdFirebase'
                    },
                    {
                        label: 'Table Name',
                        name: 'nameTableIdFirebase'
                    },
                    {
                        label: 'Auth Domain',
                        name: 'authDomainFirebase'
                    },
                    {
                        label: 'Database URL',
                        name: 'databaseURLFirebase'
                    },
                    {
                        label: 'Storage Bucket',
                        name: 'storageBucketFirebase'
                    }
                ],
                dataInputMapp: [
                    {
                        label: "Name",
                        name: 'name'
                    },
                    {
                        label: "Email",
                        name: 'email'
                    },
                    {
                        label: "Phone",
                        name: 'phone'
                    },
                    {
                        label: "Address",
                        name: 'address'
                    },
                    {
                        label: "Cty",
                        name: 'cty'
                    },
                    {
                        label: "Company",
                        name: 'company'
                    }
                ]
            },
            {
                name: 'bizfly',
                title: 'Bizfly',
                image: 'http://192.168.19.75:8121/statics/images/logov8.png',
                dataConfig: [
                    {
                        label: 'Bizfly Project Token',
                        name: 'bizflyProjectToken'
                    },
                    {
                        label: 'API Key',
                        name: 'bizflyApiKey'
                    },
                    {
                        label: 'Api Secret Key',
                        name: 'bizflyApiSecretKey'
                    }
                ],
                dataInputMapp: [
                    {
                        label: "Name",
                        name: 'name'
                    },
                    {
                        label: "Email",
                        name: 'emails'
                    },
                    {
                        label: "Phone",
                        name: 'phones'
                    },
                ]
            }
        ];

        var htmlOption = '';
        var htmlForm = '';
        for (let i = 0; i < arrayOptions.length; i++) {
            const option = arrayOptions[i];
            htmlOption += '<li class="item-option-submit" data-type="'+ option.name +'">' +
                                '<div class="image">' +
                                    '<img src="'+ option.image + '" alt="">' +
                                '</div>' +
                                '<div class="title">' +
                                    '<span>'+ option.title +'</span>' +
                                '</div>' +
                            '</li>';

            if(option.dataConfig && option.dataConfig.length > 0){
                var htmlFieldConfig = '';
                for (let i = 0; i < option.dataConfig.length; i++) {
                    const field = option.dataConfig[i];
                    console.log('field :>> ', field);
                    htmlFieldConfig += '<div class="input-group">' +
                                            '<div class="label-field">' +
                                                '<label>'+ field.label +'</label>' +
                                            '</div>' +
                                            '<div class="input-field">' +
                                                '<input type="text" name="'+ field.name +'" value="">' +
                                            '</div>' +
                                        '</div>';
                }

                var htmlItemConfig = '<div class="item-form" data-type="'+ option.name +'">' +
                                        // '<div class="title-form-app">Form Config App ' + option.title + '</div>' +
                                        '<form id="formConfig'+ option.name +'LandingPage">' +
                                            htmlFieldConfig +
                                            // '<div class="submitFormConfig">Config</div>' +
                                        '</form>' +
                                    '</div>';
                htmlForm += htmlItemConfig;
            }
        }
        var _htmlListOption = '<div class="item-content list-options '+ classListApp +'">' +
                                    // '<div class="title-list">Danh sách App</div>' +
                                    '<ul class="list">' +
                                        htmlOption + 
                                    '</ul>' +
                                '</div>';
        var _htmlFormConfig = '<div class="item-content form-config '+ classFormConfig +'">' +
                                    // '<div class="header come_back"><div class="back"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-arrow-left fa-w-14"><path fill="currentColor" d="M229.9 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L94.569 282H436c6.627 0 12-5.373 12-12v-28c0-6.627-5.373-12-12-12H94.569l155.13-155.13c4.686-4.686 4.686-12.284 0-16.971L229.9 38.101c-4.686-4.686-12.284-4.686-16.971 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971L212.929 473.9c4.686 4.686 12.284 4.686 16.971-.001z" class=""></path></svg></div></div>' +
                                    htmlForm +
                                '</div>';
        var _htmlMappingFields = '<div class="item-content mapping-form '+ classMapping +'">' +
                                    // '<div class="header come_back"><div class="back"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-arrow-left fa-w-14"><path fill="currentColor" d="M229.9 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L94.569 282H436c6.627 0 12-5.373 12-12v-28c0-6.627-5.373-12-12-12H94.569l155.13-155.13c4.686-4.686 4.686-12.284 0-16.971L229.9 38.101c-4.686-4.686-12.284-4.686-16.971 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971L212.929 473.9c4.686 4.686 12.284 4.686 16.971-.001z" class=""></path></svg></div></div>' +
                                    '<div class="list-field-mapp"></div>' +
                                    '<div class="popup-list-items-mapp">' +
                                        // '<div class="header come_back_mapp"><div class="back"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-arrow-left fa-w-14"><path fill="currentColor" d="M229.9 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L94.569 282H436c6.627 0 12-5.373 12-12v-28c0-6.627-5.373-12-12-12H94.569l155.13-155.13c4.686-4.686 4.686-12.284 0-16.971L229.9 38.101c-4.686-4.686-12.284-4.686-16.971 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971L212.929 473.9c4.686 4.686 12.284 4.686 16.971-.001z" class=""></path></svg></div></div>' +
                                        '<div class="content-popup lpe-custom-scroll-bar">' +
                                            '<div class="title">Danh sách trường</div>' +
                                            '<div class="input-group">' +
                                                '<input type="text" class="form-control" placeholder="Tìm kiếm">' +
                                                '<div class="input-group-append">' +
                                                    '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-search fa-w-16"><path fill="currentColor" d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z" class=""></path></svg>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="list-item"></div>' +
                                        '</div>' + 
                                    '</div>' +
                                '</div>';

        var defineHtml = '<div class="lpe-title">Settings Submit Form</div>' +
            '<div class="lpe-content lpe-custom-scroll-bar">' +
                _htmlListOption +
                _htmlFormConfig +
                _htmlMappingFields +
            '</div>' +
            '<div class="lpe-button-wrapper">' +
                '<div class="action-footer">' +
                    '<ul class="list">' +
                        '<li class="item close-popup">Đóng</li>' +
                        '<li class="item previous">Trang trước</li>' +
                        '<li class="item next">Trang sau</li>' +
                        '<li class="item config">Config</li>' +
                    '</ul>' +
                '</div>' +
                // '<span class="lpe-close-btn" title="Đóng">Đóng</span>' +
            '</div>';
        if ($('body').find('.lpe-popup-config-block-template.lpe-right.lpe-row-submit-form').length == 0) {
            $('body').append('<div class="lpe-popup-config-block-template lpe-right lpe-row-submit-form">' + defineHtml + '</div>');
        } else {
            $('body').find('.lpe-popup-config-block-template.lpe-right.lpe-row-submit-form').html(defineHtml);
        }
        var $popup = $('body').find('.lpe-popup-config-block-template.lpe-right.lpe-row-submit-form');
        // $popup.find('.lpe-close-btn').off('click').on('click', function () {
        //     $popup.css({'transform': 'translateX(120%)'});
        //     setTimeout(function () {
        //         $popup.remove();
        //     }, 200)
        // });

        //Biến Config =======================================>
        let configFormSubmit = {
            type: "",
            config: "",
            dataConfig: "",
            dataInputMapp: [],
            domMappCurrent: '',
            step1: true,
            step2: false,
            step3: false,
            titleStep1: 'Danh sách CRM App',
            titleStep2: 'Form Config App #{name}',
            titleStep3: 'Form Mapping',
        }

        var configSteps = function(step1, step2, step3){
            var $listActionForter = $($popup).find('.lpe-button-wrapper .action-footer .list');
            if($listActionForter && $listActionForter.length > 0){
                var $buttonClose = $($listActionForter).find('.close-popup');
                var $buttonPrevious = $($listActionForter).find('.previous');
                var $buttonNext = $($listActionForter).find('.next');
                var $buttonConfig = $($listActionForter).find('.config');
                var $buttonGeneral = $($listActionForter).find('.item');
                if(step1 == true){
                    console.log('step1 :>> ');
                    $($buttonGeneral).removeClass('active');
                    $($buttonClose).addClass('active');
                    if(configFormSubmit.titleStep1){
                        window.store.update('changeTitlePopupConfigSubmit.TitlePopup', configFormSubmit.titleStep1);
                    }
                    if(configFormSubmit.type !== ""){
                        $($buttonNext).addClass('active');
                        $($popup).find('.item-content.list-options .item-option-submit').removeClass('active')
                        var $activeItemOptionSubmit = $($popup).find('.item-content.list-options .item-option-submit[data-type="'+ configFormSubmit.type +'"]');
                        if($activeItemOptionSubmit && $activeItemOptionSubmit.length > 0){
                            $($activeItemOptionSubmit).addClass('active')
                        }
                    }

                    $($buttonClose).off('click.closePopup').on('click.closePopup', function(){
                        $popup.css({'transform': 'translateX(120%)'});
                        setTimeout(function () {
                            $popup.remove();
                        }, 200)
                    });

                    $($buttonNext).off('click.nextStep1ToStep2').on('click.nextStep1ToStep2', function(){
                        if(configFormSubmit.type !== ""){
                            window.store.update('landingPageChangeAppConfigForm.ConfigForm', configFormSubmit.type);
                        }
                    });
                    return false;
                }
    
                if(step2 == true){
                    console.log('step2 :>> ');
                    $($buttonGeneral).removeClass('active');
                    $($buttonPrevious).addClass('active');
                    $($buttonNext).addClass('active');
                    if(configFormSubmit.titleStep2){
                        var typeCapitalized = configFormSubmit.type.charAt(0).toUpperCase() + configFormSubmit.type.slice(1)
                        var titleReplace = configFormSubmit.titleStep2.replace(/#{name}/g, typeCapitalized);
                        window.store.update('changeTitlePopupConfigSubmit.TitlePopup', titleReplace);
                    }
                    $($buttonPrevious).off('click.previousStep2ToStep1').on('click.previousStep2ToStep1', function(){
                        $popup.find('.item-content').removeClass('active');
                        
                        var $listApp = $popup.find('.item-content.list-options');
                        $($listApp).addClass('active');
                        configFormSubmit.step1 = true;
                        configFormSubmit.step2 = false;
                        configFormSubmit.step3 = false;
                        configSteps(configFormSubmit.step1, configFormSubmit.step2, configFormSubmit.step3);
                    });

                    $($buttonNext).off('click.nextStep2ToStep3').on('click.nextStep2ToStep3', function(){
                        window.store.update('landingPageChangeGetFieldsForm.GetFieldsForm', configFormSubmit.type)
                    });

                    return false;
                }
    
                if(step3 == true){
                    console.log('step3 :>> ');
                    $($buttonGeneral).removeClass('active');
                    $($buttonPrevious).addClass('active');
                    $($buttonConfig).addClass('active');
                    if(configFormSubmit.titleStep3){
                        window.store.update('changeTitlePopupConfigSubmit.TitlePopup', configFormSubmit.titleStep3);
                    }
                    $($buttonPrevious).off('click.previousStep3ToStep2').on('click.previousStep3ToStep2', function(){
                        window.store.update('landingPageChangeAppConfigForm.ConfigForm', configFormSubmit.type);
                    });

                    $($buttonConfig).off('click.configPopupSubmitForm').on('click.configPopupSubmitForm', function(){
                        $popup.css({'transform': 'translateX(120%)'});
                        setTimeout(function () {
                            $popup.remove();
                        }, 200)
                    });
                    return false;
                }
            }
        }

        configSteps(configFormSubmit.step1, configFormSubmit.step2, configFormSubmit.step3);
        setTimeout(function () {
            $popup.css({'transform': 'translateX(0)'});
            window.store.change('changeTitlePopupConfigSubmit.TitlePopup', function(title){
                if(title){
                    var $titlePopup = $($popup).find('.lpe-title');
                    console.log('$titlePopup :>> ', $titlePopup);
                    if($titlePopup && $titlePopup.length > 0){
                        $($titlePopup).html(title)
                    }
                }
            });
            window.store.change('landingPageChangeAppConfigForm.ConfigForm', function(val) {
                if(val){
                    $popup.find('.item-content').removeClass('active');
                    
                    var $configForm = $popup.find('.item-content.form-config');
                    $($configForm).addClass('active');

                    $($configForm).find('.item-form').removeClass('active');
                    var $formActive = $($configForm).find('.item-form[data-type="'+ val +'"]');
                    if($formActive && $formActive.length > 0){
                        $($formActive).addClass('active');
                        configFormSubmit.type = val;
                        configFormSubmit.step1 = false;
                        configFormSubmit.step2 = true;
                        configFormSubmit.step3 = false;
                        configSteps(configFormSubmit.step1, configFormSubmit.step2, configFormSubmit.step3);

                        var getConfigByName = arrayOptions.filter(function(item){
                            if(item.name == val){
                                return item
                            }
                        });
                        if(getConfigByName && getConfigByName.length > 0){
                            configFormSubmit.dataInputMapp = getConfigByName[0].dataInputMapp;
                        }
                    }
                }
            });
            window.store.change('landingPageChangeGetFieldsForm.GetFieldsForm', function(data) {
                if(data){
                    $popup.find('.item-content').removeClass('active');
                    
                    var $mappingForm = $popup.find('.item-content.mapping-form');
                    $($mappingForm).addClass('active');
                    if(configFormSubmit.dataInputMapp && configFormSubmit.dataInputMapp.length > 0){
                        configFormSubmit.step1 = false;
                        configFormSubmit.step2 = false;
                        configFormSubmit.step3 = true;
                        configSteps(configFormSubmit.step1, configFormSubmit.step2, configFormSubmit.step3);

                        let $popupMapping = $($mappingForm).find('.popup-list-items-mapp .content-popup .list-item');
                        console.log('$popupMapping :>> ', $popupMapping);
                        if($popupMapping && $popupMapping.length > 0){
                            $($popupMapping).html('');
                            var _htmtItemsMapp = '';
                            for (let i = 0; i < configFormSubmit.dataInputMapp.length; i++) {
                                const item = configFormSubmit.dataInputMapp[i];
                                _htmtItemsMapp += '<div class="item-mapp" data-name="'+ item.name +'">' +
                                                        '<div class="label">'+ item.label +'</div>' +
                                                        '<div class="name">'+ item.name +'</div>' +
                                                    '</div>';
                            }
                            $($popupMapping).append(_htmtItemsMapp);
                        }
                    }
                    var $formObject = $(object).find('form');
                    if($formObject && $formObject.length > 0){
                        var $fields = $($formObject).find('.lpe-form-item');
                        if($fields && $fields.length > 0){
                            // for (let i = 0; i < $fields.length; i++) {
                            //     const field = $fields[i];
                            //     console.log('field :>> ', field);
                            // }

                            var $listFields = $($mappingForm).find('.list-field-mapp');
                            if($listFields && $listFields.length > 0){
                                $($listFields).html('');
                                var htmlFieldsMapp = '<div class="item-mapping">' + 
                                                            '<div class="label">' +
                                                                'Email' +
                                                            '</div>' +
                                                            '<div class="input-search">' +
                                                                '<input type="text" value="acb">' +
                                                                '<ul class="list-item-search"></ul>' +
                                                            '</div>' +
                                                            // '<div class="icon-show-list-input">' +
                                                            //     '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-map fa-w-18"><path fill="currentColor" d="M0 117.66v346.32c0 11.32 11.43 19.06 21.94 14.86L160 416V32L20.12 87.95A32.006 32.006 0 0 0 0 117.66zM192 416l192 64V96L192 32v384zM554.06 33.16L416 96v384l139.88-55.95A31.996 31.996 0 0 0 576 394.34V48.02c0-11.32-11.43-19.06-21.94-14.86z" class=""></path></svg>' +
                                                            // '</div>' +
                                                        '</div>' +
                                                        '<div class="item-mapping">' + 
                                                            '<div class="label">' +
                                                                'Phone' +
                                                            '</div>' +
                                                            '<div class="input-search">' +
                                                                '<input type="text" value="acbd">' +
                                                                '<ul class="list-item-search"></ul>' +
                                                            '</div>' +
                                                            // '<div class="icon-show-list-input">' +
                                                            //     '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-map fa-w-18"><path fill="currentColor" d="M0 117.66v346.32c0 11.32 11.43 19.06 21.94 14.86L160 416V32L20.12 87.95A32.006 32.006 0 0 0 0 117.66zM192 416l192 64V96L192 32v384zM554.06 33.16L416 96v384l139.88-55.95A31.996 31.996 0 0 0 576 394.34V48.02c0-11.32-11.43-19.06-21.94-14.86z" class=""></path></svg>' +
                                                            // '</div>' +
                                                        '</div>' +
                                                        '<div class="item-mapping">' + 
                                                            '<div class="label">' +
                                                                'Number' +
                                                            '</div>' +
                                                            '<div class="input-search">' +
                                                                '<input type="text" value="acb">' +
                                                                '<ul class="list-item-search"></ul>' +
                                                            '</div>' +
                                                            // '<div class="icon-show-list-input">' +
                                                            //     '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-map fa-w-18"><path fill="currentColor" d="M0 117.66v346.32c0 11.32 11.43 19.06 21.94 14.86L160 416V32L20.12 87.95A32.006 32.006 0 0 0 0 117.66zM192 416l192 64V96L192 32v384zM554.06 33.16L416 96v384l139.88-55.95A31.996 31.996 0 0 0 576 394.34V48.02c0-11.32-11.43-19.06-21.94-14.86z" class=""></path></svg>' +
                                                            // '</div>' +
                                                        '</div>';
                                $($listFields).append(htmlFieldsMapp);
                            }

                            var eventSetMapping = function(){
                                var $itemMapping =  $popup.find('.item-content.mapping-form .input-search .list-item-search .item-search');
                                if($itemMapping && $itemMapping.length > 0){
                                    $($itemMapping).off('click.setMapping').on('click.setMapping', function(){
                                        var name = $(this).attr('data-name');
                                        if(name){
                                            var getInput = $(this).closest('.input-search');
                                            if(getInput && getInput.length > 0){
                                                $(getInput).find('input').val(name);

                                                $(this).closest('.list-item-search').removeClass('active')
                                            }
                                        }
                                    })
                                }
                            }

                            var inputSearchMapp = $popup.find('.item-content.mapping-form .input-search input');
                            $(inputSearchMapp).focus(function(){
                                var listSearchRemove = $popup.find('.item-content.mapping-form .input-search .list-item-search');
                                if(listSearchRemove && listSearchRemove.length > 0){
                                    $(listSearchRemove).html('');
                                    $(listSearchRemove).removeClass('active')
                                }
                                var valueCurrent = $(this).val();
                                var $listSearch = $(this).closest('.input-search').find('.list-item-search');
                                var getValueMapping = configFormSubmit.dataInputMapp
                                // var getValueMapping = configFormSubmit.dataInputMapp.filter(function(item){
                                //     var test = valueCurrent.toLowerCase();
                                //     var name = item.name.toLowerCase();
                                //     return name.indexOf(test) !== -1;
                                // })
                                var htmlItemSearch = '';
                                if(getValueMapping && getValueMapping.length > 0){
                                    for (let i = 0; i < getValueMapping.length; i++) {
                                        const item = getValueMapping[i];
                                        htmlItemSearch += '<li class="item-search" data-name="'+ item.name +'">'+ item.label +'</li>';
                                    }
                                }else{
                                    htmlItemSearch = '<li class="item-search not">Không thấy kết quả</li>';
                                };

                                if($listSearch && $listSearch.length > 0){
                                    $($listSearch).html('');
                                    $($listSearch).append(htmlItemSearch);

                                    $($listSearch).addClass('active');
                                    eventSetMapping();
                                }
                            });

                            var $popupMappingCloseListItem = $popup.find('.item-content.mapping-form');
                            if($popupMappingCloseListItem && $popupMappingCloseListItem.length > 0){
                                $($popupMappingCloseListItem).off('click.closeListItemSearch').on('click.closeListItemSearch', function(event){
                                    var targetDom = $(event.target);
                                    var itemMapping = $(targetDom).closest('.item-mapping .input-search');
                                    if(itemMapping && itemMapping.length <= 0){
                                        $($popupMappingCloseListItem).find('.list-item-search').removeClass('active')
                                    }
                                });
                            }

                            // $(inputSearchMapp).blur(function() {
                            //     var $listSearch = $(this).closest('.input-search').find('.list-item-search');
                            //     if($listSearch && $listSearch.length > 0){
                            //         $listSearch.find('.item-search').remove();
                            //         $listSearch.removeClass('active');
                            //     }
                            // });

                            $(inputSearchMapp).keyup(function(){
                                var valueChange = $(this).val();
                                var $listSearch = $(this).closest('.input-search').find('.list-item-search')
                                var getValueMapping = configFormSubmit.dataInputMapp.filter(function(item){
                                    var test = valueChange.toLowerCase();
                                    var name = item.name.toLowerCase();
                                    return name.indexOf(test) !== -1;
                                })
                                var htmlItemSearch = '';
                                if(getValueMapping && getValueMapping.length > 0){
                                    for (let i = 0; i < getValueMapping.length; i++) {
                                        const item = getValueMapping[i];
                                        htmlItemSearch += '<li class="item-search" data-name="'+ item.name +'">'+ item.label +'</li>';
                                    }
                                }else{
                                    htmlItemSearch = '<li class="item-search not">Không thấy kết quả</li>';
                                };

                                if($listSearch && $listSearch.length > 0){
                                    $($listSearch).html('');
                                    $($listSearch).append(htmlItemSearch);

                                    $($listSearch).addClass('active');
                                    eventSetMapping();
                                }
                            });
                            var eventPopupMapping = function(){
                                var $itemMappPopup = $popup.find('.item-content.mapping-form .list-item .item-mapp');
                                $($itemMappPopup).off('click.setFieldPopupMapp').on('click.setFieldPopupMapp', function(){
                                    var name = $(this).attr('data-name');
                                    $(configFormSubmit.domMappCurrent).find('input').val(name);
                                    var popupMapping = $popup.find('.item-content.mapping-form .popup-list-items-mapp');
                                    if(popupMapping && popupMapping.length > 0){
                                        $(popupMapping).removeClass('active')
                                    }
                                })
                            }
                            var showPopupMapping = $popup.find('.item-content.mapping-form .item-mapping .icon-show-list-input');
                            if(showPopupMapping && showPopupMapping.length > 0){
                                $(showPopupMapping).off('click.showPopupMapping').on('click.showPopupMapping', function(){
                                    var $domItem = $(this).closest('.item-mapping');
                                    configFormSubmit.domMappCurrent = $domItem
                                    var popupMapping = $popup.find('.item-content.mapping-form .popup-list-items-mapp');
                                    if(popupMapping && popupMapping.length > 0){
                                        $(popupMapping).addClass('active');
                                        eventPopupMapping();
                                    }
                                })
                            }

                            var showPopupMapping = $popup.find('.item-content.mapping-form .popup-list-items-mapp .header.come_back_mapp');
                            if(showPopupMapping && showPopupMapping.length > 0){
                                $(showPopupMapping).off('click.closePopupMapping').on('click.closePopupMapping', function(){
                                    var popupMapping = $popup.find('.item-content.mapping-form .popup-list-items-mapp');
                                    if(popupMapping && popupMapping.length > 0){
                                        $(popupMapping).removeClass('active')
                                    }
                                })
                            }
                        }
                    }
                }
            });
        }, 200);

        //xử lý bên list app
        var $itemApp = $($popup).find('.item-option-submit');
        if($itemApp && $itemApp.length > 0){
            $($itemApp).off('click.itemOptionSubmit').on('click.itemOptionSubmit', function () {
                var typeApp = $(this).attr('data-type');
                window.store.update('landingPageChangeAppConfigForm.ConfigForm', typeApp);
            });
        }

        // var $backToListApp = $($popup).find('.item-content.form-config .come_back');
        // if($backToListApp && $backToListApp.length > 0){
        //     $($backToListApp).off('click.backToListAppSubmitForm').on('click.backToListAppSubmitForm', function () {
        //         $popup.find('.item-content').removeClass('active');
                        
        //         var $listApp = $popup.find('.item-content.list-options');
        //         $($listApp).addClass('active');
        //     });
        // }

        // var $backToFormConfig = $($popup).find('.item-content.mapping-form .come_back');
        // if($backToFormConfig && $backToFormConfig.length > 0){
        //     $($backToFormConfig).off('click.backToConfigForm').on('click.backToConfigForm', function () {
        //         window.store.update('landingPageChangeAppConfigForm.ConfigForm', configFormSubmit.type);
        //     });
        // }

        // var $buttonSubmit = $($popup).find('.submitFormConfig');
        // if($buttonSubmit && $buttonSubmit.length > 0){
        //     $($buttonSubmit).off('click.submitTestConfig').on('click.submitTestConfig', function () {
        //         window.store.update('landingPageChangeGetFieldsForm.GetFieldsForm', configFormSubmit.type)
        //     });
        // }
    };

    var showPopupSettingApps = function(params){
        var defaultOptions = {};

        var options = params.options || {}
        options = Object.assign({}, defaultOptions, options);

        var _htmlListOptionApps = '';
        var _htmlListOptionEmail = '';

        if(options.apps.dataApp && options.apps.dataApp.length > 0){
            for (let i = 0; i < options.apps.dataApp.length; i++) {
                const app = options.apps.dataApp[i];
                _htmlListOptionApps += '<div class="item-app" data-name="'+ app.name +'">' +
                                            '<div class="image">' +
                                                '<img src="'+ app.image +'">' +
                                            '</div>' +
                                            '<div class="title">'+ app.title +'</div>' +
                                        '</div>';
            }
        }
        if(options.email.dataApp && options.email.dataApp.length > 0){
            for (let i = 0; i < options.email.dataApp.length; i++) {
                const app = options.email.dataApp[i];
                _htmlListOptionEmail += '<div class="item-app" data-name="'+ app.name +'">' +
                                            '<div class="image">' +
                                                '<img src="'+ app.image +'">' +
                                            '</div>' +
                                            '<div class="title">'+ app.title +'</div>' +
                                        '</div>';
            }
        }

        var defineHtml = '<div class="lpe-popup-config-submit-form">' + 
                            '<div class="lpe-popup-config-overlay"></div>' +
                            '<div class="lpe-fixed-scroll">' +
                                '<div class="content-popup-submit-form">' +
                                    '<div class="header-popup">' +
                                        '<div class="lpe-popup-btn-close"></div>' +
                                        '<div class="list-options-app">' +
                                            '<div class="item email" data-name="email">' +
                                                '<div class="icon">' +
                                                    '<svg xmlns="http://www.w3.org/2000/svg" id="nc-email" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.92"><path d="M3.6058448,9.66149939 L3.6058448,14.594495 C3.6058448,15.2992086 4.40786873,15.6012288 4.90913369,15.0978619 L7.2149525,12.3796806 L11.9268431,15.9032489 C12.3278551,16.2052691 12.929373,16.0039223 13.029626,15.5005554 L16.0372158,0.902915364 C16.1374688,0.298875086 15.6362038,-0.103818432 15.0346858,0.0975283271 L0.498002054,5.93658434 C-0.00326290396,6.1379311 -0.103515896,6.84264476 0.297496071,7.24533828 L1.90154394,8.45341883 L6.51318156,6.23860448 C6.91419352,6.03725772 7.2149525,6.54062462 6.91419352,6.74197138 L3.6058448,9.66149939 Z" fill="currentColor" fill-rule="nonzero"></path></g></svg>' +
                                                '</div>' +
                                                '<div class="title">' +
                                                    'Email' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="item apps" data-name="apps">' +
                                                '<div class="icon">' +
                                                    '<svg id="nc-extensions-2" viewBox="0 0 16 16"><g><g class="nc-icon-wrapper" fill="currentColor"><g id="apps" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M10.8 0a1.4 1.4 0 0 0-1.4 1.4v3.69H6.6V1.4a1.4 1.4 0 1 0-2.8 0v3.69H2a1 1 0 0 0-1 1v3.092C1 12.947 4.134 16 8 16s7-3.053 7-6.818V6.09a1 1 0 0 0-1-1h-1.8V1.4A1.4 1.4 0 0 0 10.8 0z" id="Shape" fill="currentColor" fill-rule="nonzero"></path></g></g></g></svg>' +
                                                '</div>' +
                                                '<div class="title">' +
                                                    'Apps' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="content-popup">' +
                                        '<div class="header-steps">' +
                                            '<div class="item step1">' +
                                                '<div class="title">' +
                                                    '<span class="number">1</span>' +
                                                    '<span class="title_text">Danh sách</span>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="item step2">' +
                                                '<div class="title">' +
                                                    '<span class="number">1</span>' +
                                                    '<span class="title_text">Thông tin cấu hình</span>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="item step3">' +
                                                '<div class="title">' +
                                                    '<span class="number">3</span>' +
                                                    '<span class="title_text">Cấu hình</span>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="item-content" data-name="email">' +
                                            '<div class="item-step step1" data-step="step1">' +
                                                '<div class="list">'+
                                                    _htmlListOptionEmail +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="item-step step2" data-step="step2">' +
                                                'email 2' +
                                            '</div>' +
                                            '<div class="item-step step3" data-step="step3">' +
                                                'email 3' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="item-content" data-name="apps">' +
                                            '<div class="item-step step1" data-step="step1">' +
                                                '<div class="list">'+
                                                    _htmlListOptionApps +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="item-step step2" data-step="step2">' +
                                                'apps 2' +
                                            '</div>' +
                                            '<div class="item-step step3" data-step="step3">' +
                                                'apps 3' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="footer-popup">' +
                                        '<ul class="list-active">' +
                                            '<li class="item back">' +
                                                '<div class="icon"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" class="svg-inline--fa fa-chevron-left fa-w-8"><path fill="currentColor" d="M231.293 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L70.393 256 251.092 74.87c4.686-4.686 4.686-12.284 0-16.971L231.293 38.1c-4.686-4.686-12.284-4.686-16.971 0L4.908 247.515c-4.686 4.686-4.686 12.284 0 16.971L214.322 473.9c4.687 4.686 12.285 4.686 16.971-.001z" class=""></path></svg></div>' +
                                                '<div class="text">Quay Lại</div>' +
                                            '</li>' +
                                            '<li class="item next">' +
                                                '<div class="text">Tiếp theo</div>' +
                                                '<div class="icon"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" class="svg-inline--fa fa-chevron-right fa-w-8"><path fill="currentColor" d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z" class=""></path></svg></div>' +
                                            '</li>' +
                                            '<li class="item config">' +
                                                '<div class="text">Hoàn thành</div>' +
                                                // '<div class="icon"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-check-circle fa-w-16"><path fill="currentColor" d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z" class=""></path></svg></div>' +
                                            '</li>' +
                                        '</ul>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
        if ($('body').find('.lpe-popup-config-submit-form').length == 0) {
            $('body').append(defineHtml);
        }
        var $popup = $('body').find('.lpe-popup-config-submit-form');

        var switchStepContentByTab = function(tabActiveFn){
            var $buttonNext = $($popup).find('.footer-popup .list-active .next');
            var $buttonBack = $($popup).find('.footer-popup .list-active .back');
            var $buttonFinish = $($popup).find('.footer-popup .list-active .config');
            var $buttonGeneral = $($popup).find('.footer-popup .list-active .item');

            var $headerStep1 = $($popup).find('.header-steps .step1');
            var $headerStep2 = $($popup).find('.header-steps .step2');
            var $headerStep3 = $($popup).find('.header-steps .step3');
            var $headerGeneral = $($popup).find('.header-steps .item');

            var $contentStep1 = '';
            var $contentStep2 = '';
            var $contentStep3 = '';
            var $contentGeneral = '';
            var $contentTabs = $($popup).find('.content-popup .item-content[data-name="'+ tabActiveFn +'"]');
            if($contentTabs && $contentTabs.length > 0){
                $contentStep1 = $($contentTabs).find('.step1');
                $contentStep2 = $($contentTabs).find('.step2');
                $contentStep3 = $($contentTabs).find('.step3');
                $contentGeneral = $($contentTabs).find('.item-step');
            }
            var dataStep = options[tabActiveFn];
            if(dataStep){
                var step1 = dataStep.step1;
                var step2 = dataStep.step2;
                var step3 = dataStep.step3;

                if(step1.position == true){
                    $($buttonGeneral).removeClass('active');
                    $($buttonNext).addClass('active');

                    //check active header-steps
                    $($headerGeneral).removeClass('active');
                    $($headerStep1).addClass('active');

                    //check active content step;
                    if($contentGeneral && $contentStep1){
                        $($contentGeneral).removeClass('active');
                        $($contentStep1).addClass('active');
                    }

                    //check Step done;
                    if(step1.status == true){
                        console.log('$($headerStep1) :>> ', $($headerStep1));
                        $($headerStep1).addClass('done');
                    }else{
                        $($headerStep1).removeClass('done');
                    }

                    $($buttonNext).off('click.nextStep').on('click.nextStep', function(){
                        if(options[tabActiveFn].step1.data){
                            //set lại step1
                            options[tabActiveFn].step1.position = false;
                            options[tabActiveFn].step1.status = true;
                            $($headerStep1).addClass('done');

                            //set lại step2
                            options[tabActiveFn].step2.position = true;

                            //set lại step3
                            options[tabActiveFn].step3.position = false;

                            switchStepContentByTab(tabActiveFn);
                        }else{
                            alert('Bạn chưa chọn App');
                        }
                    });

                    return false;
                }

                if(step2.position == true){
                    $($buttonGeneral).removeClass('active');
                    $($buttonBack).addClass('active');
                    $($buttonNext).addClass('active');

                    //check active header-steps
                    $($headerGeneral).removeClass('active');
                    $($headerStep2).addClass('active');

                    //check active content step;
                    if($contentGeneral && $contentStep2){
                        $($contentGeneral).removeClass('active')
                        $($contentStep2).addClass('active')
                    }

                    $($buttonBack).off('click.backStep').on('click.backStep', function(){
                        //set lại step1
                        options[tabActiveFn].step1.position = true;

                        //set lại step2
                        options[tabActiveFn].step2.position = false;

                        //set lại step3
                        options[tabActiveFn].step3.position = false;

                        switchStepContentByTab(tabActiveFn);
                    });

                    $($buttonNext).off('click.nextStep').on('click.nextStep', function(){
                        if(options[tabActiveFn].step2.data){
                            //set lại step1
                            options[tabActiveFn].step1.position = false;
                            
                            //set lại step2
                            options[tabActiveFn].step2.position = false;
                            options[tabActiveFn].step2.status = true;
                            $($headerStep2).addClass('done');
                            
                            //set lại step3
                            options[tabActiveFn].step3.position = true;

                            switchStepContentByTab(tabActiveFn);
                        }else{
                            alert('Bạn chưa chọn điền đủ thông tin!');
                        }
                    });

                    return false;
                }

                if(step3.position == true){
                    $($buttonGeneral).removeClass('active');
                    $($buttonBack).addClass('active');
                    $($buttonFinish).addClass('active');

                    //check active header-steps
                    $($headerGeneral).removeClass('active');
                    $($headerStep3).addClass('active');

                    //check active content step;
                    if($contentGeneral && $contentStep3){
                        $($contentGeneral).removeClass('active')
                        $($contentStep3).addClass('active')
                    }

                    $($buttonBack).off('click.backStep').on('click.backStep', function(){
                        //set lại step1
                        options[tabActiveFn].step1.position = false;

                        //set lại step2
                        options[tabActiveFn].step2.position = true;

                        //set lại step3
                        options[tabActiveFn].step3.position = false;

                        switchStepContentByTab(tabActiveFn);
                    });

                    $($buttonFinish).off('click.configOke').on('click.configOke', function(){
                        alert('Bạn đã cấu hình thành công');
                        $($popup).remove();
                    })
                    return false;
                }
            }
        }

        //chọn app
        var $itemApp = $($popup).find('.item-content .list .item-app');
        if($itemApp && $itemApp.length > 0){
            $($itemApp).off('click.choseApp').on('click.choseApp', function(){
                var nameTab = $(this).closest('.item-content').attr('data-name');
                if(nameTab){
                    $itemApp.removeClass('active')
                    $(this).addClass('active');
                    console.log('options[nameTab] :>> ', options[nameTab]);

                }
            });
        }

        //event change active tab
        window.store.change('changeTabContentPopup', function(name){
            if(name){
                var $itemContentTabs = $($popup).find('.content-popup .item-content');
                var $itemContentTabsActive = $($popup).find('.content-popup .item-content[data-name="'+ name +'"]');

                if($itemContentTabs && $itemContentTabs.length > 0 && $itemContentTabsActive && $itemContentTabsActive.length > 0){
                    $($itemContentTabs).removeClass('active');
                    $($itemContentTabsActive).addClass('active');
                    options.tabActive = name;
                    switchStepContentByTab(options.tabActive);
                }
            }
        });

        //check tabs active.
        var nameTabActive = options.tabActive;
        if(nameTabActive){
            var itemsHeaderActive = $($popup).find('.header-popup .list-options-app .item[data-name="'+ nameTabActive +'"]');
            if(itemsHeaderActive && itemsHeaderActive.length > 0){
                $($popup).find('.header-popup .list-options-app .item').removeClass('active');
                $(itemsHeaderActive).addClass('active');
                window.store.update('changeTabContentPopup', nameTabActive)
            }
        }else{
            var itemFirst = $($popup).find('.header-popup .list-options-app .item');
            if(itemFirst && itemFirst.length > 0){
                $(itemFirst).removeClass('active');
                $(itemFirst[0]).addClass('active');

                var nameTabActiveDefault = $(itemFirst[0]).attr('data-name');
                if(nameTabActiveDefault){
                    window.store.update('changeTabContentPopup', nameTabActiveDefault)
                }
            }
        }

        //swich tabs
        var itemHeader = $($popup).find('.header-popup .list-options-app .item');
        if(itemHeader && itemHeader.length > 0){
            $(itemHeader).off('click.switchTabsOptions').on('click.switchTabsOptions', function(){
                var name = $(this).attr('data-name');
                if(name){
                    $(itemHeader).removeClass('active');
                    $(this).addClass('active');

                    var $headerItemStep = $($popup).find('.header-steps .item');
                    if($headerItemStep && $headerItemStep.length > 0){
                        $headerItemStep.removeClass('active');
                        $headerItemStep.removeClass('done');
                    }
                    window.store.update('changeTabContentPopup', name)
                }
            })
        }

        var $btnClose = $($popup).find('.lpe-popup-btn-close');
        if($btnClose && $btnClose.length > 0){
            $($btnClose).off('click.closePopupConfigSumitForm').on('click.closePopupConfigSumitForm', function(){
                $($popup).remove();
            })
        }
    }

    $('.lpe-landing-page-object[data-type="form"]').off('click.showIconSettingSubmit').on('click.showIconSettingSubmit', function(){
        var listIcon = $(this).find('.list-icon-submit');
        if(listIcon && listIcon.length > 0){
            $(listIcon).addClass('active');
        }
    });

    var $iconShowPopupConfigSubmit = $('.lpe-landing-page-object[data-type="form"] .list-icon-submit .item.app');
    if($iconShowPopupConfigSubmit && $iconShowPopupConfigSubmit.length > 0){
        $($iconShowPopupConfigSubmit).off('click.khiem').on('click.khiem', function(){
            var object = $('.lpe-landing-page-object[data-type="form"]');
            // showPopupConfigSubmitForm(object);
            var params = {
                options: {
                    object: object,
                    step1: true,
                    step2: false,
                    step3: false,
                    type: "",
                    config: "",
                    dataConfig: "",
                    dataInputMapp: [],
                    titleStep1: '',
                    titleStep2: '',
                    titleStep3: '',
                    tabActive: 'apps',
                    email: {
                        step1: {
                            position: true,
                            status: false,
                            data: '11'
                        },
                        step2: {
                            position: false,
                            status: false,
                            data: '11'
                        },
                        step3: {
                            position: false,
                            status: false,
                            data: ''
                        },
                        dataApp: [
                            {
                                name: 'mailChimp',
                                title: 'MailChimp',
                                image: 'http://192.168.19.75:8121/statics/images/222.jpg',
                                dataConfig: [
                                    {
                                        label: 'API Key',
                                        name: 'bizflyApiKey'
                                    },
                                    {
                                        label: 'Api Secret Key',
                                        name: 'bizflyApiSecretKey'
                                    }
                                ],
                                dataInputMapp: [
                                    {
                                        label: "Name",
                                        name: 'name'
                                    },
                                    {
                                        label: "Email",
                                        name: 'email'
                                    },
                                    {
                                        label: "Phone",
                                        name: 'phone'
                                    },
                                    {
                                        label: "Address",
                                        name: 'address'
                                    },
                                    {
                                        label: "Cty",
                                        name: 'cty'
                                    },
                                    {
                                        label: "Company",
                                        name: 'company'
                                    }
                                ]
                            },
                            {
                                name: 'convertKit',
                                title: 'ConvertKit',
                                image: 'http://192.168.19.75:8121/statics/images/3333.jpg',
                                dataConfig: [
                                    {
                                        label: 'API Key',
                                        name: 'bizflyApiKey'
                                    },
                                    {
                                        label: 'Api Secret Key',
                                        name: 'bizflyApiSecretKey'
                                    }
                                ],
                                dataInputMapp: [
                                    {
                                        label: "Name",
                                        name: 'name'
                                    },
                                    {
                                        label: "Email",
                                        name: 'email'
                                    },
                                    {
                                        label: "Phone",
                                        name: 'phone'
                                    },
                                    {
                                        label: "Address",
                                        name: 'address'
                                    },
                                    {
                                        label: "Cty",
                                        name: 'cty'
                                    },
                                    {
                                        label: "Company",
                                        name: 'company'
                                    }
                                ]
                            }
                        ]
                    },
                    apps: {
                        step1: {
                            position: true,
                            status: false,
                            data: 'sdsd'
                        },
                        step2: {
                            position: false,
                            status: false,
                            data: '112'
                        },
                        step3: {
                            position: false,
                            status: false,
                            data: '1212'
                        },
                        dataApp: [
                            {
                                name: 'firebase',
                                title: 'Firebase',
                                image: 'http://192.168.19.75:8121/statics/images/firebase_28dp.png',
                                dataConfig: [
                                    {
                                        label: 'API Key',
                                        name: 'apiKeyFirebase'
                                    },
                                    {
                                        label: 'Project Id',
                                        name: 'projectIdFirebase'
                                    },
                                    {
                                        label: 'Measurement Id',
                                        name: 'measurementIdFirebase'
                                    },
                                    {
                                        label: 'Messaging Sender Id',
                                        name: 'messagingSenderIdFirebase'
                                    },
                                    {
                                        label: 'Table Name',
                                        name: 'nameTableIdFirebase'
                                    },
                                    {
                                        label: 'Auth Domain',
                                        name: 'authDomainFirebase'
                                    },
                                    {
                                        label: 'Database URL',
                                        name: 'databaseURLFirebase'
                                    },
                                    {
                                        label: 'Storage Bucket',
                                        name: 'storageBucketFirebase'
                                    }
                                ],
                                dataInputMapp: [
                                    {
                                        label: "Name",
                                        name: 'name'
                                    },
                                    {
                                        label: "Email",
                                        name: 'email'
                                    },
                                    {
                                        label: "Phone",
                                        name: 'phone'
                                    },
                                    {
                                        label: "Address",
                                        name: 'address'
                                    },
                                    {
                                        label: "Cty",
                                        name: 'cty'
                                    },
                                    {
                                        label: "Company",
                                        name: 'company'
                                    }
                                ]
                            },
                            {
                                name: 'bizfly',
                                title: 'Bizfly',
                                image: 'http://192.168.19.75:8121/statics/images/logov8.png',
                                dataConfig: [
                                    {
                                        label: 'Project Token',
                                        name: 'bizflyProjectToken'
                                    },
                                    {
                                        label: 'API Key',
                                        name: 'bizflyApiKey'
                                    },
                                    {
                                        label: 'Api Secret Key',
                                        name: 'bizflyApiSecretKey'
                                    }
                                ],
                                dataInputMapp: [
                                    {
                                        label: "Name",
                                        name: 'name'
                                    },
                                    {
                                        label: "Email",
                                        name: 'emails'
                                    },
                                    {
                                        label: "Phone",
                                        name: 'phones'
                                    },
                                ]
                            },
                            {
                                name: 'hubSpot',
                                title: 'hubspot',
                                image: 'http://192.168.19.75:8121/statics/images/111.jpg',
                                dataConfig: [
                                    {
                                        label: 'Project Token',
                                        name: 'hubSpotProjectToken'
                                    },
                                    {
                                        label: 'API Key',
                                        name: 'hubSpotApiKey'
                                    },
                                    {
                                        label: 'Api Secret Key',
                                        name: 'hubSpotApiSecretKey'
                                    }
                                ],
                                dataInputMapp: [
                                    {
                                        label: "Name",
                                        name: 'name'
                                    },
                                    {
                                        label: "Email",
                                        name: 'emails'
                                    },
                                    {
                                        label: "Phone",
                                        name: 'phones'
                                    },
                                ]
                            }
                        ]
                    }
                }
            };
            showPopupSettingApps(params);
        });
    }

    // $('#configFormTest a').off('click.tets').on('click.tets', function(){
    //     var object = $('.lpe-landing-page-object[data-type="form"]')
    //     showPopupConfigSubmitForm(object);
    // });

    $(window).click(function(event){
        var $popup = $(event.target).closest('.lpe-popup-config-submit-form .lpe-popup-config-overlay');
        var button = $(event.target).closest('.list-icon-submit .item.app');
        if($popup && $popup.length > 0 && button.length == 0){
            $('body').find('.lpe-popup-config-submit-form').remove();
        }

        var $form = $(event.target).closest('.lpe-landing-page-object[data-type="form"]');
        if($form && $form.length <= 0){
            var listIcon = $('.lpe-landing-page-object[data-type="form"]').find('.list-icon-submit');
            if(listIcon && listIcon.length > 0){
                $(listIcon).removeClass('active');
            }
        }
    })
});