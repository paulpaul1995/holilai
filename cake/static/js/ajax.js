 //ajax��������������ݵĹ��÷���,������ĸ�����. 
 //thisUrl:��ǰ����ķ�����·��,
 //sendXml:���sendXml��Ϊ��,�������������sendXml,���������������null;
 //httpMethod:��������ύ���ݵķ�ʽPOST��GET(Ҫ���д)
 //methodName:�ӷ���������ʱָ��Ҫ����������Ϣ�ķ�����.
 //isSynchronous:ָ�����ʷ������ķ�ʽ,false���첽���ʵ�,true��ͬ������
 
 var http_request = false;	
  //	var url = "";
	//��ʼ����ָ������������������ĺ���
	function send_request(methodName,httpMethod,thisUrl,isSynchronous,sendXml) {
		//��ʼ��ʼ��XMLHttpRequest����    
		if(window.XMLHttpRequest) { //Mozilla �����
			http_request = new XMLHttpRequest();
			if (http_request.overrideMimeType) {//����MiME���
				http_request.overrideMimeType('text/xml');
			}
		    }else if (window.ActiveXObject) { // IE�����
			 try {
				http_request = new ActiveXObject("Msxml2.XMLHTTP");			
			  } catch (e) {				
				try {
					http_request = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}
		if (!http_request) { // �쳣����������ʵ��ʧ��
			window.alert("���ܴ���XMLHttpRequest����ʵ��.");
			return false;
		}
		// ȷ����������ķ�ʽ��URL�Լ��Ƿ�ͬ��ִ���¶δ���
		http_request.onreadystatechange = methodName;
		//alert(methodName);
		http_request.open(httpMethod,thisUrl,isSynchronous);
		http_request.send(sendXml);
	}
	
	
	 var request = false;	
  //	var url = "";
	//��ʼ����ָ������������������ĺ���
	function sentRequest(methodName,httpMethod,thisUrl,isSynchronous,sendXml) {
		//��ʼ��ʼ��XMLHttpRequest����    
		if(window.XMLHttpRequest) { //Mozilla �����
			request = new XMLHttpRequest();
			if (request.overrideMimeType) {//����MiME���
				request.overrideMimeType('text/xml');
			}
		    }else if (window.ActiveXObject) { // IE�����
			 try {
				request = new ActiveXObject("Msxml2.XMLHTTP");			
			  } catch (e) {				
				try {
					request = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}
		if (!request) { // �쳣����������ʵ��ʧ��
			window.alert("���ܴ���XMLHttpRequest����ʵ��.");
			return false;
		}
		// ȷ����������ķ�ʽ��URL�Լ��Ƿ�ͬ��ִ���¶δ���
		request.onreadystatechange = methodName;
		//alert(methodName);
		request.open(httpMethod,thisUrl,isSynchronous);
		request.send(sendXml);
	}
	
	 var httpRequest = false;	
  //	var url = "";
	//��ʼ����ָ������������������ĺ���
	function sendRequest(methodName,httpMethod,thisUrl,isSynchronous,sendXml) {
		//��ʼ��ʼ��XMLHttpRequest����    
		if(window.XMLHttpRequest) { //Mozilla �����
			httpRequest = new XMLHttpRequest();
			if (httpRequest.overrideMimeType) {//����MiME���
				httpRequest.overrideMimeType('text/xml');
			}
		    }else if (window.ActiveXObject) { // IE�����
			 try {
				httpRequest = new ActiveXObject("Msxml2.XMLHTTP");			
			  } catch (e) {				
				try {
					httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}
		if (!httpRequest) { // �쳣����������ʵ��ʧ��
			window.alert("���ܴ���XMLHttpRequest����ʵ��.");
			return false;
		}
		// ȷ����������ķ�ʽ��URL�Լ��Ƿ�ͬ��ִ���¶δ���
		httpRequest.onreadystatechange = methodName;
		//alert(methodName);
		httpRequest.open(httpMethod,thisUrl,isSynchronous);
		httpRequest.send(sendXml);
	}
	
	
	
function show(pageUrl, targetObject, isadd) {
	var	showAjax = new ajax();
	showAjax.url = pageUrl;
	showAjax.callback = showResult;
	showAjax.cache = true;
	showAjax.send();
	function showResult(){
	  if (showAjax.req.readyState == 4) {
	    if (showAjax.req.status == 200) {
	      var returnText = showAjax.req.responseText;
					if(isadd) {
	      		obji(targetObject).innerHTML=obji(targetObject).innerHTML + returnText;
	      	} else {
	      		obji(targetObject).innerHTML= returnText;
	      	}
	      	
	      	showAjax = null;
	    }else{
	     //alert("���������ҳ�����쳣��" + targetObject);
	    }
	  }
	}

}

function showdetails(pageUrl, targetObject, isadd,loading,loadhtml,content) {
	var	showAjax = new ajax();
	showAjax.url =pageUrl; 
	showAjax.callback = showResult;
	showAjax.cache = true;
	showAjax.send();
	//alert(content);
	var loadobj = document.getElementById(loading);
	document.getElementById(content).style.display="none";
	loadobj.style.display="block";
	loadobj.innerHTML=loadhtml
	function showResult(){
	  if (showAjax.req.readyState == 4) {
	    if (showAjax.req.status == 200) {
	    	var returnText = showAjax.req.responseText;
	    	
				if(isadd) {
	        obji(targetObject).innerHTML=obji(targetObject).innerHTML + returnText;
	      } else {
	        obji(targetObject).innerHTML= returnText;
	      }
	      showAjax = null;
	      document.getElementById(loading).innerHTML="";
	      document.getElementById(loading).style.display="none";
	    }else{
	     alert("���������ҳ�����쳣��" + targetObject);
	    }
	  }
	}
}
