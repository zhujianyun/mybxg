define(['jquery', 'template', 'util'], function($, template, util){
	// 设置导航栏菜单选中
	util.setMenu('/course/add');

	// 获取课程id
	var csId = util.qs('cs_id', location.search);

	// 如果能获取到csId说明是编辑操作，否则是添加课程操作
	if(csId) {
		$.ajax({
			type : "get",
			url : '/api/course/basic',
			data : {cs_id : csId},
			dataType : 'json',
			success : function(data) {
				console.log(data);
				var html = template('courseBasicTpl', data.result);
				$('#courseBasicInfo').html(html);
			}
		});
	}else {
		// var html = template('courseBasicTpl', data.result);
		// $('#courseBasicInfo').html(html);
	}
});