 //ajax向服务器发送数据的公用方法,其接受四个参数. 
 //thisUrl:当前请求的服务器路径,
 //sendXml:如果sendXml不为空,则向服务器发送sendXml,否则向服务器发送null;
 //httpMethod:向服务器提交数据的方式POST或GET(要求大写)
 //methodName:从服务器返回时指定要来处理返回信息的方法名.
 //isSynchronous:指定访问服务器的方式,false是异步访问的,true是同步访问
 
 var http_request = false;	
  //	var url = "";
	//初始化、指定处理函数、发送请求的函数
	function send_request(methodName,httpMethod,thisUrl,isSynchronous,sendXml) {
		//开始初始化XMLHttpRequest对象    
		if(window.XMLHttpRequest) { //Mozilla 浏览器
			http_request = new XMLHttpRequest();
			if (http_request.overrideMimeType) {//设置MiME类别
				http_request.overrideMimeType('text/xml');
			}
		    }else if (window.ActiveXObject) { // IE浏览器
			 try {
				http_request = new ActiveXObject("Msxml2.XMLHTTP");			
			  } catch (e) {				
				try {
					http_request = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}
		if (!http_request) { // 异常，创建对象实例失败
			window.alert("不能创建XMLHttpRequest对象实例.");
			return false;
		}
		// 确定发送请求的方式和URL以及是否同步执行下段代码
		http_request.onreadystatechange = methodName;
		//alert(methodName);
		http_request.open(httpMethod,thisUrl,isSynchronous);
		http_request.send(sendXml);
	}
	
	
	 var request = false;	
  //	var url = "";
	//初始化、指定处理函数、发送请求的函数
	function sentRequest(methodName,httpMethod,thisUrl,isSynchronous,sendXml) {
		//开始初始化XMLHttpRequest对象    
		if(window.XMLHttpRequest) { //Mozilla 浏览器
			request = new XMLHttpRequest();
			if (request.overrideMimeType) {//设置MiME类别
				request.overrideMimeType('text/xml');
			}
		    }else if (window.ActiveXObject) { // IE浏览器
			 try {
				request = new ActiveXObject("Msxml2.XMLHTTP");			
			  } catch (e) {				
				try {
					request = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}
		if (!request) { // 异常，创建对象实例失败
			window.alert("不能创建XMLHttpRequest对象实例.");
			return false;
		}
		// 确定发送请求的方式和URL以及是否同步执行下段代码
		request.onreadystatechange = methodName;
		//alert(methodName);
		request.open(httpMethod,thisUrl,isSynchronous);
		request.send(sendXml);
	}
	
	 var httpRequest = false;	
  //	var url = "";
	//初始化、指定处理函数、发送请求的函数
	function sendRequest(methodName,httpMethod,thisUrl,isSynchronous,sendXml) {
		//开始初始化XMLHttpRequest对象    
		if(window.XMLHttpRequest) { //Mozilla 浏览器
			httpRequest = new XMLHttpRequest();
			if (httpRequest.overrideMimeType) {//设置MiME类别
				httpRequest.overrideMimeType('text/xml');
			}
		    }else if (window.ActiveXObject) { // IE浏览器
			 try {
				httpRequest = new ActiveXObject("Msxml2.XMLHTTP");			
			  } catch (e) {				
				try {
					httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}
		if (!httpRequest) { // 异常，创建对象实例失败
			window.alert("不能创建XMLHttpRequest对象实例.");
			return false;
		}
		// 确定发送请求的方式和URL以及是否同步执行下段代码
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
	     //alert("您所请求的页面有异常。" + targetObject);
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
	     alert("您所请求的页面有异常。" + targetObject);
	    }
	  }
	}
}
