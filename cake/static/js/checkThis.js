var msg = new Array();
msg['i1'] = "用户名必须输入3-20位英文字母或者数字.";
msg['i2'] = "密码长度必须为6-20个字符，请重新输入！";
msg['i3'] = "重复密码不一致。";
msg['i4'] = "为了保护密码请输入问题。";
msg['i5'] = "请输入问题的答案。</font>";
msg['i6'] = "格式不正确，请填写正确的E-MAIL。";
msg['i7'] = "验证码必须填写。";
msg['i8'] = "用户名已经存在，请重新输入";
msg['i9'] = "通过，请继续！";
msg['i10']= "用户名不存在，可以用！";

function checkThis(obj){
	if(objn(obj)){
		if(obj == 'bean.id'){
			if(!test_name(trim(objn(obj).value))){
				obji('info1').className = "color_red";
				obji('info1').innerHTML =msg['i1'];
				return;
			}else{
				checkUser();
				return;
			}
		}else 
		if(obj == 'bean.password'){
			if(objn(obj).value.length < 6 || objn(obj).value.length >20) {
				obji('info2').className = "color_red";
				obji('info2').innerHTML =msg['i2'];
				return;
			}else{
				obji('info2').className = "color_green";
				obji('info2').innerHTML = msg['i9'];
				return;
			}
		}else 
		if(obj == 'repassword'){
			if(objn(obj).value =="" || objn(obj).value != objn('bean.password').value) {
				obji('info3').className = "color_red";
				obji('info3').innerHTML =msg['i3'];
				return;
			}else{
				obji('info3').className = "color_green";
				obji('info3').innerHTML = msg['i9'];
				return;
			}
		}else 
		if(obj == 'bean.question'){
			if(objn(obj).value == "") {
				obji('info4').className = "color_red";
				obji('info4').innerHTML =msg['i4'];
				return;
			}else{
				obji('info4').className = "color_green";
				obji('info4').innerHTML = msg['i9'];
				return;
			}
		}else 
		if(obj == 'bean.answer'){
			if(objn(obj).value == "") {
				obji('info5').className = "color_red";
				obji('info5').innerHTML =msg['i5'];
				return;
			}else{
				obji('info5').className = "color_green";
				obji('info5').innerHTML = msg['i9'];
				return;
			}
		}else
		if(obj == 'bean.email'){
			if(objn(obj).value == "" ||
				objn(obj).value.charAt(0)=="." || 
				objn(obj).value.charAt(0)=="@" || 
				objn(obj).value.indexOf('@', 0) == -1 || 
				objn(obj).value.indexOf('.', 0) == -1 || 
				objn(obj).value.lastIndexOf("@")== objn(obj).value.length-1 || 
				objn(obj).value.lastIndexOf(".")== objn(obj).value.length-1){
					obji('info6').className = "color_red";
					obji('info6').innerHTML =msg['i6'];
					return;
			}else{
				obji('info6').className = "color_green";
				obji('info6').innerHTML = msg['i9'];
				return;
			}
		}
	}else{
		alert("找不到对象！");
	}
}

function changeThis(obj){
	if(obji(obj)){
		obji(obj).className = "color_blue";
	}else{
		alert("找不到对象！");
	}
}