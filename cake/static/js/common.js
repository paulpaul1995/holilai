;
$(function(){
	//ajax 按钮操作
	$('.opAjax').live('click', function(){
		var msg     = $(this).data('msg') ? $(this).data('msg') : '确定执行此操作吗';
		var url     = $(this).data('uri') ? $(this).data('uri') : $(this).attr('href');
		var confirm = $(this).data('confirm') ? $(this).data('confirm') : 0;

		var config = {};
		if (typeof $(this).data('icon') != 'undefined'){
			config.icon = $(this).data('icon');
		}
		if (typeof $(this).data('title') != 'undefined'){
			config.title = $(this).data('title');
		}
		if (typeof $(this).data('shade') != 'undefined'){
			config.shade = $(this).data('shade');
		}
		if (typeof $(this).data('btn') != 'undefined'){
			config.btn = eval($(this).data('btn'));
		}

		config.title = msg;

		layer.confirm('', config, function(index){
			$.get(url, function(data){
				try{
					var data = JSON.parse(data);
				}catch (e){}

				if (data.message){
					layer.msg(data.message, {time:2000});
				}
				if (data.url){
					window.parent.location.href = data.url;
				}else{
					if (data.state == 'info'){
						window.parent.location.reload();
					}
				}
			});
			layer.close(index);
		});
		return false;
	});
	$(".get_code").live("click",function (){
		var str = $(this).attr('mobile') ? $('input[name="'+$(this).attr('mobile')+'"]').val() : $("input[name=new_phone]").val();
		 if(!/^(13[0-9]|12[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/i.test(str)){
			layer.msg('手机号格式错误', {time:2000});
			return false;
		}
		var token   = $('input[name="token"]').val();
		var captcha = $('input[name="captcha"]').val();
		if (!captcha){
			layer.msg('请输入图文验证码', {time:2000});
			return false;
		}
		$.get("/user.php",{act:'sendcode',phone:str,token:token,captcha:captcha},function (data){
			layer.msg(data.info, {time:2000});
			if (data.data != 'undefined'){
				content = data.data;
				if (typeof content.token != 'undefined'){
					$('input[name="token"]').val(content.token);
				}
			}
		},'json');

	});
	$(".sunmit_code").live("click",function (){
		$(".sunmit_code").val('提交中...');
		var old		=	$("input[name=old_phone]").val();
		var new_p	=	$("input[name=new_phone]").val();
		var vip		=	$("input[name=vip]").val();
		if (old.length == 0){
			layer.msg('请输入原始手机号码');
			return false;
		}else if (!/^(13[0-9]|12[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/i.test(old)){
			layer.msg('原始手机号码格式错误');
			return false;
		}
		if (new_p.length == 0){
			layer.msg('请输入新手机号');
			return false;
		}else if(!/^(13[0-9]|12[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/i.test(new_p)){
			layer.msg('新手机号格式错误', {time:2000});
			$(".sunmit_code").val('提交');
			return false;
		}
		var captcha = $('input[name="captcha"]').val();
		if (captcha.length != 4){
			layer.msg('图文验证码错误', {time:2000});
			return false;
		}
		if(vip.length != 6){
			layer.msg('短信验证码错误', {time:2000});
			$(".sunmit_code").val('提交');
			return false;
		}
		$.post("/user.php",$("#theform").serialize(),function (data){
			layer.msg(data.info);
			$(".sunmit_code").val('提交');
				if(data.status == 1){
					location.reload();
				}
		},"json")
	})
	//ajaxfrom提交
	if ($.browser.msie) {
		//ie8及以下，表单中只有一个可见的input:text时，会整个页面会跳转提交
		$('form.ajaxFrom').on('submit', function (e) {
			//表单中只有一个可见的input:text时，enter提交无效
			e.preventDefault();
		});
	}
	$(".resert").on('click',function (e){
		document.fgmessageBoardForm.reset(); 
	});
	$('.submitbtn').on('click', function (e) {
		e.preventDefault();
		var btn  = $(this),
			form = btn.parents('form.ajaxForm');
			type = btn.attr('dataType') ? btn.attr('dataType') : 'json';
		form.ajaxSubmit({
			url: btn.data('action') ? btn.data('action') : form.attr('action'), //按钮上是否自定义提交地址(多按钮情况)
			dataType: type,
			beforeSubmit: function (arr, $form, options) {
				if (btn.data('flag')){
					if (btn.val()){
						var text = btn.val();
						btn.val(text + '中...').prop('disabled', true).addClass('disabled');
					}else{
						var text = btn.text();
						btn.text(text + '中...').prop('disabled', true).addClass('disabled');
					}
				}
			},
			success: btn.attr('callback') ? eval(btn.attr('callback')) : function (data, statusText, xhr, $form) {
				if (btn.data('flag')){
					if (btn.val()){
						var text = btn.val();
						btn.val(text.replace('中...', '')).prop('disabled', false).removeClass('disabled');
					}else{
						var text = btn.text();
						btn.text(text.replace('中...', '')).prop('disabled', false).removeClass('disabled');
					}
				}
				if (data.state === 'info') {
					if (data.message){
						if (btn.data('ismsg')){
							parent.layer.msg(data.message, {time:2000}, function(){
								if (data.url){
									window.parent.location.href = data.url;
								}else{
									window.parent.location.reload();
								}
							});
						}else{
							parent.layer.msg(data.message, {time:2000}, function(index){
								if (data.url){
									window.parent.location.href = data.url;
								}else{
									window.parent.location.reload();
								}
							});
						}
					}else{
						if (data.url){
							window.parent.location.href = data.url;
						}else{
							window.parent.location.reload();
						}
					}
				} else {
					if (btn.data('ismsg')){
						parent.layer.msg(data.message, {time:2000});
					}else{
						parent.layer.msg(data.message);
					}

					if (data.data != 'undefined'){
						content = data.data;
						if (typeof content.token != 'undefined'){
							$('input[name="token"]').val(content.token);
						}
					}
					
				}
			}
		});
	});

	//全选反选
	$('.checkAll').live('click', function(){
		var name = $(this).data('name') ? $(this).data('name') : 'selected';
		$('input[name="'+name+'"]').each(function(){
			if (this.checked == true){
				this.checked = false;
			}else{
				this.checked = true;
			}
		});
	});
});

function CheckAll(form) {
	for (var i=0;i<form.elements.length;i++) {
		var e = form.elements[i];
		if (e.Name != "chkAll" && e.disabled!=true) 
		e.checked = form.chkAll.checked; 
	}
}

function checkStrong(sPW){
	if (sPW == ""){
		return 0;
	}else if (sPW.length < 6){
		return 1;
	}
	return sPW.match(/[a-z](?![^a-z]*[a-z])|[A-Z](?![^A-Z]*[A-Z])|\d(?![^\d]*\d)|[^a-zA-Z\d](?![a-zA-Z\d]*[^a-zA-Z\d])/g).length;
}

function pwStrength(pwd){
	if (pwd==null || pwd==''){
		document.getElementById('paaswdPR').className = '';
	}else{
		S_level = checkStrong(pwd);
		switch(S_level){
			case 0:
				document.getElementById('paaswdPR').className = '';
			case 1:
				document.getElementById('paaswdPR').className = 'qd1';
			break;
			case 2:
				document.getElementById('paaswdPR').className = 'qd2';
			break;
			case 3:
				document.getElementById('paaswdPR').className = 'qd3';
			break;
			default:
				document.getElementById('paaswdPR').className = '';
		}
	}
	return;
}

function getMobileCode(mobile, isrepeat, obj, iscaptcha){//isrepeat判断手机号是否存在，0不判断
	if (mobile.length == 0){
		layer.msg('请输入您的手机号');
		return ;
	}else if (!Utils.isMobile(mobile)){
		layer.msg('手机号格式错误');
		return ;
	}else if ($(obj).attr('disabled')){
		return;
	}
	if (iscaptcha){
		var captcha = $('.reg_captcha').val();
		if (captcha.length == 0){
			layer.msg('请输入验证码');
			return ;
		}
	}
	var token = $('input[name="token"]').val();
	//var index=layer.msg('发送中...', {icon: 16});
	$.get('/misc.php', {act:'sendsmscodes', mobile:mobile, isrepeat:isrepeat, iscaptcha:iscaptcha, captcha:captcha, token:token}, function(data){
		//layer.close(index);
		layer.msg(data.message);
		if (data.state == 'info'){
			time(obj);
		}else{
			$('#captcha').trigger('click');
			if (data.data != 'undefined'){
				content = data.data;
				if (typeof content.token != 'undefined'){
					$('input[name="token"]').val(content.token);
				}
			}
		}
	},'json');
}

var wait=60;
function time(obj) {
	if (wait == 0) {
		wait = 60;
		$(obj).removeAttr("disabled");
		$(obj).text('获取短信验证码');
	} else {
		$(obj).attr("disabled", "disabled");
		$(obj).text("已发送!剩余"+wait+"s");
		wait--;
		setTimeout(function(){
			time(obj)
		}, 1000);
	}
}


/*
	收藏夹添加到购物车
*/

function addToCart_user(id){
	if(isNaN(id)){
		layer.msg('参数错误');
	}
	var goods        = new Object();
	goods.goods_id = id;
	goods.number   = 1;
	goods.spec     = -1;
	$.get("/flow.php",{step:"add_to_cart",goods:JSON.stringify(goods)},function (data){
		if(data.error !=0){
			layer.msg('产品不可单独加入!');
			return;
		}
		layer.msg('已添加到购物车!');
	 },"json");
}

