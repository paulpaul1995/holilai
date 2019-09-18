 var rq = false;	
 function sendFormData(methodName,httpMethod,thisUrl,isSynchronous,sendXml,isXML) {
		if(window.XMLHttpRequest) {
			rq = new XMLHttpRequest();
			if (rq.overrideMimeType){
				rq.overrideMimeType('text/xml');
			}
		 }else if (window.ActiveXObject) {
			 try {
				 rq = new ActiveXObject("Msxml2.XMLHTTP");			
			  }catch(e){				
				try {
					rq = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}
		if (!rq){
			window.alert("不能创建XMLHttpRequest对象实例.");
			return false;
		}
		rq.onreadystatechange = methodName;
		rq.open(httpMethod,thisUrl,isSynchronous);
		if(httpMethod=="POST" && isXML){
			rq.setRequestHeader("Content-Type","text/xml");
			rq.setRequestHeader("charset","GBK");			
		 }else if(httpMethod=="POST" && !isXML){
			rq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");			
		}
		if (window.ActiveXObject){
		 rq.setRequestHeader("If-Modified-Since","0");
 		}
		rq.send(sendXml);
	}