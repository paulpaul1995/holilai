function obji(obj){
	return document.getElementById ? document.getElementById(obj) :null;
}

function objn(obj){
			return document.getElementsByName(obj)[0];
}

function ajax (){
	 this.method = 'GET';
	 this.sync = true;
	 this.url = '';
	 this.data = '';
	 this.req = false;
	 this.sendType = 'STRING';
	 this.cache = false;
	 this.obj = null;
	 this.callback = processdefault;

		 if (window.XMLHttpRequest){
     	 this.req = new XMLHttpRequest();
     }
     else{
       var MSXML = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
       for(var n = 0; n < MSXML.length; n ++){
       	try
      		{
          	this.req = new ActiveXObject(MSXML[n]);
      		}
        catch(e){
          this.req=false;
        }
     }
	 }
}

ajax.prototype.setMethod = function (obj){
	this.method = obj ?obj : 'GET';
}

ajax.prototype.setSync = function (obj){
	this.sync = obj ?obj : true; 
}

ajax.prototype.setUrl = function (obj){
	this.url = obj ?obj : ''; 
}

ajax.prototype.setData = function (obj){
	this.data = obj ?obj : ''; 
}

ajax.prototype.setSendType = function (obj){
	this.sendType = obj ?obj : 'STRING'; 
}

ajax.prototype.setCallBack = function (obj){
	this.callback = obj ?obj : processdefault; 
}

ajax.prototype.setCache = function (obj){
	this.cache = obj ?obj : false; 
}

ajax.prototype.send = function (){
	
	if(!this.req){
		alert("发送失败！");
		return;
	}

	this.req.onreadystatechange = this.callback;
		
	this.req.open(this.method, this.url, this.sync);	

	if(this.method == 'POST'){
		if(this.sendType == 'STRING'){
			
			this.req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			
		}else{
			
			this.req.setRequestHeader("Content-Type", "text/xml");
			this.req.setRequestHeader("charset", "GBK");
		}
	}
	
	if(this.cache){
		if (window.ActiveXObject) {
			this.req.setRequestHeader("If-Modified-Since", "0");
	 	}
	}
	this.req.send(this.data);
}

ajax.prototype.sendForm = function (fromName){
	
	if(document.forms[fromName]){
			var thisForm = document.forms[fromName];

			var thisMethod = thisForm.method ?thisForm.method : 1;

			this.method = (thisMethod == 1) ?'POST' : this.method;

			var thisUrl = thisForm.action ?thisForm.action : this.url;

			if(thisForm.actionType)thisUrl = thisUrl +'?actionType='+thisForm.actionType.value;

			this.url = thisUrl;

			this.data = getFormAsString(fromName);
			
			this.sendType = 'XML';

			this.send();

	}else{
		alert(fromName + "表单不存在");
	}
}

function getFormAsString(fromName){
		
	var formElements=document.forms[fromName].elements;
	
	var returnString = "<save>";
	
	for(var i=formElements.length-1;i>=0; --i ){
		
		if(formElements[i].type == "checkbox" || formElements[i].type == "radio"){
			
			if(formElements[i].checked){
				
				returnString+="<"

				+ formElements[i].name +">"

				+escape(formElements[i].value)+"</"

				+ formElements[i].name +">";
			}
			
		}else{
	
		returnString+="<"

		+ formElements[i].name +">"

		+escape(formElements[i].value)+"</"

		+ formElements[i].name +">";
		
		}
		
	}

	returnString += "</save>";
	
	return  returnString;
}

function processdefault(){
}