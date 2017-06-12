define(['jquery','template','ckeditor', 'util','datepicker', 'language','uploadify','region', 'validate', 'form'],function($,template,CKEDITOR,util){
    // 左侧当行菜单选中
    util.setMenu('/index/index');
    // 查询个人信息
    $.ajax({
        type : 'get',
        url : '/api/teacher/profile',
        dataType : 'json',
        success : function(data){
            var html = template('settingsTpl',data.result);
            $('#settingsInfo').html(html);

            // 处理头像上传
            $('#upfile').uploadify({
                buttonText : '',
                itemTemplate : '<span></span>',
                width : '120',
                height : '120',
                fileObjName : 'tc_avatar',
                swf : '/public/assets/uploadify/uploadify.swf',
                uploader : '/api/uploader/avatar',
                onUploadSuccess : function(file,data){
                    data = JSON.parse(data);
                    $('.preview img:eq(0)').attr('src',data.result.path);
                }
            });
            
            // 处理三级联动
            $('#hometown').region({
                url : '/public/assets/jquery-region/region.json'
            });


            // 富文本处理
            CKEDITOR.replace('editor',{
                toolbarGroups : [{
                        name: 'clipboard',
                        groups: ['clipboard', 'undo']
                    }, {
                        name: 'editing',
                        groups: ['find', 'selection', 'spellchecker', 'editing']
                    }
                ]
            });

            // 表单验证
            $('#settingsForm').validate({
                sendForm : false,
                valid : function() {
                    // 更新富文本
                    for(var instance in CKEDITOR.instances) {
                        CKEDITOR.instances[instance].updateElement();
                    }

                    // 处理省市县内容
                    var p = $('#p option:selected').text();
                    var c = $('#c option:selected').text();
                    var d = $('#d option:selected').text();
                    var hometown = p +'|'+ c +'|'+d;
                    $(this).ajaxSubmit({
                        type : 'post',
                        url : '/api/teacher/modify',
                        data : {tc_hometown : hometown},
                        dataType : 'json',
                        success : function(data) {
                            console.log(data);
                            // 重新加载页面
                            location.reload();
                        }
                    });
                }
            });
        }
    });


});