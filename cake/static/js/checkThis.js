var msg = new Array();
msg['i1'] = "�û�����������3-20λӢ����ĸ��������.";
msg['i2'] = "���볤�ȱ���Ϊ6-20���ַ������������룡";
msg['i3'] = "�ظ����벻һ�¡�";
msg['i4'] = "Ϊ�˱����������������⡣";
msg['i5'] = "����������Ĵ𰸡�</font>";
msg['i6'] = "��ʽ����ȷ������д��ȷ��E-MAIL��";
msg['i7'] = "��֤�������д��";
msg['i8'] = "�û����Ѿ����ڣ�����������";
msg['i9'] = "ͨ�����������";
msg['i10']= "�û��������ڣ������ã�";

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
		alert("�Ҳ�������");
	}
}

function changeThis(obj){
	if(obji(obj)){
		obji(obj).className = "color_blue";
	}else{
		alert("�Ҳ�������");
	}
}