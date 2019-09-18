var IS_NULL = 0X80; //	10000000
var IS_FULL = 0X40; //	01000000
var IS_HALF = 0X20; //	00100000
var IS_ASCII = 0X10; //	00010000
var IS_NUM = 0X08; //	00001000
var IS_DATE = 0X04; //	00000100
var IS_PHONE = 0X02; //	00000010
var IS_EMAIL = 0X01; //	00000001
var IS_NOT_NULL = 0X00; //	00000000

/****************************************一、弹出窗口*************************************************/
//1.日期选择窗口
function fPopUpCalendarDlg(ctrlobj) {
   var showx = event.screenX - event.offsetX; // + deltaX;
   var showy = event.screenY - event.offsetY + 18; // + deltaY;
   var newWINwidth = 210 + 4 + 18;
   var retval = window.showModalDialog("../../fg/html/CalendarDlg.htm", "","dialogWidth:197px; dialogHeight:210px; dialogLeft:" + showx +"px; dialogTop:" + showy +"px; status:no; directories:yes;scrollbars:no;Resizable=no; ");
   if (retval != null) {
      ctrlobj.value = retval;
    }
}


//Function trim a string
	function trim(Str , Flag)
	{
	
		Str	= ""+Str;
		if( Flag == "l" || Flag == "L" )/*trim left side only*/
		{
			RegularExp	= /^\s+/gi;
			return Str.replace( RegularExp,"" );
		}
		else if( Flag == "r" || Flag == "R" )/*trim right side only*/
		{
			RegularExp	= /\s+$/gi;
			return Str.replace( RegularExp,"" );
		}
		else/*defautly, trim both left and right side*/
		{
			RegularExp	= /^\s+|\s+$/gi;
			return Str.replace( RegularExp,"" );
		}
	}

/****************************************二、控制键盘录入*************************************************/

//1.控制键盘输入，只允许数字键录入整数
 function intOnly() {
   if (! ( (window.event.keyCode >= 48) && (window.event.keyCode <= 57) || (window.event.keyCode == 45))  ){
   window.event.keyCode = 0;
 }
}

//2.控制键盘输入，只允许数字键录入小数和整数
    function numberOnly() {
    if (! ( ( (window.event.keyCode >= 48) && (window.event.keyCode <= 57)) ||
           (window.event.keyCode == 13) || (window.event.keyCode == 46)))

{
  window.event.keyCode = 0;
}
}
    /****************************************三、数字的格式化操作函数*************************************************/
//取浮点数，可以定义小数点后精确的位数,并且四舍五入。
function getFloat(number, reserve) {
   var index = number.indexOf(".");
    if (index == -1) {
      return number;
   }
   else {
      var index = index + reserve + 1;
      if (index >= number.length) {
         return number;
      }
      else {
        var temp = number.charAt(index);
       number = number.substring(0, index);
       if (parseInt(temp) < 5) {
          return number;
       }else {
         for (var i = index - 1; i >= 0; i--) {
         if (number.charAt(i) == ".") {
           continue;
         }
         var value = parseInt(number.charAt(i));
         value++;
         if (value != 10) {
           number = replace(number, i, value);
            return number;
         }
         else {
          number = replace(number, i, "0");
          if (i == 0) {
            number = "1" + number;
          }
        }
      }
      return parseFloat(number);
    }
  }
}
}
    function replace(number, i, value) {
    var newnumber = number.substring(0, i) + value;
    newnumber = newnumber + number.substring(i + 1, number.length);
    return newnumber;
}
    /****************************************四、字符串的格式化操作函数*************************************************/
//1.子字符串替换
    function replaceStr(str, sFnd, sRep) {
    var sTmp = "";
    var endIndex = 0;
    var beginIndex = 0;
    var len = sFnd.length; while (endIndex >= 0) {
    var  endIndex = str.indexOf(sFnd, beginIndex);
  if (endIndex >= 0) {
    sTmp += str.substring(beginIndex, endIndex) + sRep;
    beginIndex = endIndex + len;
  }
  else if (beginIndex >= 0) {
    sTmp += str.substring(beginIndex);
    break;
  }
}
return sTmp;
}
//2.单双引号替换（基于子字符串替换函数）
    function replaceCommas(str) {
    if (str == "") {
  return str;
}
str = replaceStr(str, "'", "'");
    //str = replaceStr(str, '"', '"');
    return str;
}

//3.去掉字符串中的给定字符
    function removeChar(str, c) {
    if (str == null || str == "") {
  return str;
}
var i = str.indexOf(c); while (i >= 0) {
  str = str.substring(0, i) + str.substring(i + 1, str.length);
  i = str.indexOf(c);
}
return str;
}
    /****************************************五、日期的格式化操作函数*************************************************/
//1.年月日组合成格式化的字符串
    function formatDate(sYear, sMonth, sDay) {
    if (sMonth.length == 1) {
  sMonth = "0" + sMonth;
}
if (sDay.length == 1) {
  sDay = "0" + sDay;
}
return sYear + sMonth + sDay;
}
//2.日期型转换为格式化的字符串
    function convDate(sDate, sSep) {
    var pos = 0;
    var str = sDate;
    var len = str.length;
    if ( (len < 8) || (len > 10)) {
  return str;
}
else if (str.indexOf(sSep) == 4) {
  pos = str.indexOf(sSep, 5);
  if (pos == 6) {
    if (len == 8) {
      return str.substring(0, 4) + "0" + str.substring(5, 6) + "0" +
          str.substring(7, 8);
    }
    else {
      return str.substring(0, 4) + "0" + str.substring(5, 6) +
          str.substring(7, 9);
    }
  }
  else if (pos == 7) {
    if (len == 9) {
      return str.substring(0, 4) + str.substring(5, 7) + "0" +
          str.substring(8, 9);
    }
    else {
      return str.substring(0, 4) + str.substring(5, 7) + str.substring(8, 10);
    }
  }
  else {
    return str;
  }
}
else {
  return str;
}
}
//3.判断是否为闰年
    function checkLeapYear(year) {
    if ( ( (year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
  return true;
}
return false;
}
//4.获得格式化的系统时间
    function getSysDate() {
    var today = new Date();
    var nYear = today.getYear();
    var nMonth = today.getMonth() + 1;
    var nDay = today.getDate();
    var sToday = "";
    if (nYear < 1000) {
  sToday += "" + (1900 + nYear);
}
else {
  sToday += nYear;
}
if (nMonth < 10) {
  sToday += "0" + nMonth;
}
else {
  sToday += nMonth;
}
if (nDay < 10) {
  sToday += "0" + nDay;
}
else {
  sToday += nDay;
}
return sToday;
}
//5.比较两个日期的大小
function compareDateStr(dateStr1, dateStr2) {
    dateStr1 = convDate(dateStr1, "/");
    dateStr2 = convDate(dateStr2, "/");
    if (dateStr1 > dateStr2) {
  return 1;
}
else if (dateStr1 == dateStr2) {
  return 0;
}
else {
  return -1;
}
return dateStr1
}
//6.判断是否小于当前时间
    function checkBeforeDate(str) {
    str = convDate(str, "/");
    if (str.length == 6) {
  str += "01";
}
if (str >= getSysDate()) {
  return false;
}
return true;
}
//7.判断是否等于当前时间
    function checkIsToday(str) {
    str = convDate(str, "/");
    if (str.length == 6) {
  str += "01";
}
if (str == getSysDate()) {
  return true;
}
else {
  return false;
}
}
//8.判断是否大于当前时间
    function checkAfterDate(str) {
    str = convDate(str, "/");
    if (str.length == 6) {
  str += "01";
}
if (str <= getSysDate()) {
  return false;
}
return true;
}
//比较两个时间大小
    function compareDate(fromDate, toDate) {
    if (checkDate(fromDate) != true) {
  return false;
}
if (checkDate(toDate) != true) {
  return false;
}
fromDate = convDate(fromDate, "/");
    toDate = convDate(toDate, "/");
    if ( (fromDate.length != 8) || !checkNumber(fromDate) ||
        (toDate.length != 8) || !checkNumber(toDate)) {
  return false;
}
if (fromDate <= toDate) {
  return true;
}
else {
  return false;
}
}
    /****************************************五、表单值的格式化操作*************************************************/
//1.上传文件时取得表单的上传路径中的文件名
    function getFileName(fullpath) {
    var platform = navigator.platform;
    var fileseperator = (platform.indexOf("Win") == -1) ? "/" : "\\";
    var idx = fullpath.lastIndexOf(fileseperator);
    if (idx == -1) {
  return fullpath;
}
else if (idx >= fullpath.length - 1) {
  return "";
}
else {
  return fullpath.substring(idx + 1);
}
}
//2.去掉FORM中所有TEXT和TEXTAREA表单的值两边的空格
    function trimItems(oFrm) {
    var i = 0;
    var type = "";
    for (i = 0; i < oFrm.elements.length; i++) {
  type = oFrm.elements[i].type;
  if ( (type == "text") || (type == "textarea")) {
    oFrm.elements[i].value = trim(oFrm.elements[i].value);
  }
}
}
    /****************************************六、提交前的表单值检查*************************************************/
//1.在删除操作时检查是否选择复选框
    function isSelected() {
    for (var i = 0; i < document.all.length; i++) {
  if (document.all[i].tagName.toUpperCase() == "INPUT") {
    var tmp = document.all[i].type.toUpperCase();
    var name = document.all[i].name;
    if ( (tmp == "CHECKBOX") && (document.all[i].checked == true) &&
        (name == "selection" || name == "selected")) {
      return true;
    }
  }
}
return false;
}
//2.检查表单的值是否为空,是否符合最大最小长度限制
var MSG_CHECK_SUCCESS = "Check Success";
function checkItem(sCheck, nMinLen, nMaxLen, chkFlg) {
    var strLen = 0;
    if ( (sCheck == null) || (sCheck == "")) {
  if ( ( (chkFlg & 0X80) == 0X80) || ( (chkFlg & 0X00) == 0X00)) {

    return "是必须输入的项目";
  }
  else {
    return MSG_CHECK_SUCCESS;
  }
}

if ( (nMinLen > 0) || (nMaxLen > 0)) {
  strLen = getLength(sCheck);
  if (nMinLen > 0) {
    if (nMinLen == nMaxLen) {
      if (strLen != nMinLen) {
        if ( (chkFlg & 0x08) == 0x08) {
          return "的长度必须" + nMinLen + "字节";
        }
        else {
          return "的长度必须" + nMinLen + "字节";
        }
      }
    }
    else if (strLen < nMinLen) {
      if ( (chkFlg & 0x08) == 0x08) {
        return "不是数字";
      }
      else {
        return "过于短小，最小长度为" + nMinLen + "字节";
      }
    }
  }
  if (nMaxLen > 0) {
    if (strLen > nMaxLen) {
      return "超过了最大长度" + nMaxLen + "字节";
    }
  }
}
if ( (chkFlg & 0x10) == 0x10) {
  if (!checkASCII(sCheck)) {
    return "不正确";
  }
}

if ( (chkFlg & 0x08) == 0x08) {
  if (!checkNumber(sCheck)) {
    return "是数字项目";
  }
}

if ( (chkFlg & 0x04) == 0x04) {
  if (!checkDate(sCheck)) {
    return "是日期项目";
  }
}

if ( (chkFlg & 0x02) == 0x02) {
  if (!checkPhone(sCheck)) {
    return "不正确";
  }
}

if ( (chkFlg & 0x01) == 0x01) {
  if (!checkEmail(sCheck)) {
    return "不正确";
  }
}

return MSG_CHECK_SUCCESS;
}
    function check(sItemName, sCheck, nMinLen, nMaxLen, chkFlg) {
    sRet = checkItem(sCheck, nMinLen, nMaxLen, chkFlg);
    if (sRet != MSG_CHECK_SUCCESS) {
  sErr += sItemName + sRet + "\n";
  return false;
}
return true;
}
//3.检查电子邮件表单的格式是否正确
    function checkEmail(str) {
    var i;
    var len = str.length;
    var aPos = str.indexOf("@");
    var dPos = str.indexOf(".");
    var aaPos = str.indexOf("@@");
    var adPos = str.indexOf("@.");
    var ddPos = str.indexOf("..");
    var daPos = str.indexOf(".@");
    var chkStr =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_@.";

    if ( (aPos <= 0) || (aPos == len - 1) || (dPos == len - 1) || (adPos > 0) ||
        (daPos > 0) ||
        (str.charAt(len - 1) == "@") || (str.charAt(len - 1) == ".") ||
        (aaPos > 0) || (ddPos > 0)) {
  return false;
}
if (str.indexOf("@", aPos + 1) > 0) {
  return false;
}

for (i = 0; i < len; i++) {
  if (chkStr.indexOf(str.charAt(i)) < 0) {
    return false;
  }
}
return true;
}
//4.检查电话号码表单的格式是否正确
    function checkPhone(str) {
    var i = str.indexOf("--");
    var len = str.length;
    if (i >= 0) {
  return false;
}
i = str.indexOf("-");
    if ( (i == 0) || (i == len - 1)) {
  return false;
}
else if (i > 0) {
  i = str.lastIndexOf("-");
  if (i == len - 1) {
    return false;
  }
  str = removeChar(str, "-");
}
if (!checkNumber(str)) {
  return false;
}
else {
  return true;
}
}
//5.检查是否为英文字母
    function checkEngNum(str) {
    if (str == null || str == "") {
  return true;
}

var c = new RegExp();
    c = / ^ [\d | a - zA - Z] + $ / ;
    if (c.test(str)) {
  return true;
}
else {
  return false;
}
}
//6.检查是否为数字型元素
    function checkNumber(str) {
    var i;
    var len = str.length;
    var chkStr = "1234567890";
    if (len == 1) {
  if (chkStr.indexOf(str.charAt(i)) < 0) {
    return false;
  }
}
else {

  if ( (chkStr.indexOf(str.charAt(0)) < 0)) {
    return false;
  }
  for (i = 1; i < len; i++) {
    if (chkStr.indexOf(str.charAt(i)) < 0) {
      return false;
    }
  }
}
return true;
}
//7.检查是否为浮点型元素
    function checkFloat(str) {
    var i;
    var len = str.length;
    var chkStr = "1234567890.";
    if (len == 1) {
  if (chkStr.indexOf(str.charAt(i)) < 0) {
    return false;
  }
}
else {
  //if ((chkStr.indexOf(str.charAt(0)) < 0) || (str.charAt(0) == "0")) {
  if ( (chkStr.indexOf(str.charAt(0)) < 0)) {
    return false;
  }
  for (i = 1; i < len; i++) {
    if (chkStr.indexOf(str.charAt(i)) < 0) {
      return false;
    }
  }
}
return true;
}
//8.检查是否为日期
    function checkDate(str) {
    str = convDate(str, "/");
    if ( (str.length != 8) || !checkNumber(str)) {
  return false;
}
var year = str.substring(0, 4);
    var month = str.substring(4, 6);
    var day = str.substring(6, 8);
    dayOfMonth = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    if ( (month < 1) || (month > 12)) {
  return false;
}
if ( (day < 1) || (day > dayOfMonth[month - 1])) {
  return false;
}
if (!checkLeapYear(year) && (month == 2) && (day == 29)) {
  return false;
}
return true;
}

 /****************************************七、子窗口的弹出与关闭*************************************************/
var childWindow = null;
var fatherWindow = null;
var form = null;

// 打开子窗口，在打开之前定义父窗口的名字
function openNew(URL, Width, Height) {

 //   window.name = "fatherWindow";
    closeChildNew();
   showx = event.screenX - event.offsetX - Width; // + deltaX;
    showy = event.screenY - event.offsetY - Height - 30; // + deltaY;
  var features =
    'width = ' +Width +
    ',height = ' +Height +
    ',left = ' +showx +
    ',top = ' +showy +
    ',directories = no, localtion = no, menubar = no, status = yes, toolbar = no,scrollbars = yes, resizeable = no';
    childWindow = window.open(URL, "", features);
}
// 如果已经有子窗口打开，则关闭之
    function closeChildNew() {
    if (childWindow && childWindow.open && !childWindow.closed) {
  childWindow.close();
}
}

// 关闭子窗口的同时，进行提交，并将提交之后的得页面转到父窗口，关闭子窗口
// 这里本应该是使用同一个函数,但是时间有点急,就
    function closeChildWindow(fatherForm, childForm, actionType) {
    childForm.actionType.value = actionType;
    childForm.target = "mainFrame";
    childForm.submit();
    window.close();
    return true;
}

    function closeChildWindowNew(childForm, actionType) {
    childForm.actionType.value = actionType;
    childForm.target = "fatherWindow";
    childForm.submit();
    window.close();
    return true;
}
    /* SelectAllOptions ***********************************************************/
// set all options to selected
    /******************************************************************************/
    function SelectAllOptions(theSelect) {

    for (var i = 0; i < theSelect.options.length; i++) {

  theSelect.options[i].selected = true;

}

}
//改变选中行的css;author：lithlin   for rdms only!
    function changeCss(CB, className) {
    if (CB.checked) {
  while (CB.tagName != "TR") {
    CB = CB.parentElement;
  }
  CB.className = "ListTrLight";
}
else {
  while (CB.tagName != "TR") {
    CB = CB.parentElement;
  }
  CB.className = className;
}
}
//在两个选择框中移动数据
    function MoveOptionsTo(fromSelect, toSelect) {
    var myform = document.expertslistform;
    for (i = 0; i < fromSelect.options.length; i++) {
  // alert(fromSelect.options.length);
  if (fromSelect.options(i).selected == true) {
    j = toSelect.options.length - 1;
    //  alert(toSelect.options.length);
    for (; j >= 0; j--) {
      if (fromSelect.item(i).value == toSelect.item(j).value) {
        break;
      }
    }
    if (j < 0) {
      var name = fromSelect.item(i).text;
      var newOpt = new Option(name, fromSelect.item(i).value);
      toSelect.add(newOpt);

    }
  }
}
}
//移走某个多选框中的数据
    function removeItem(from) {
    for (i = from.options.length - 1; i >= 0; i--) {
  if (from.options(i).selected == true) {
    from.remove(i);
  }
}
}
//===============全选按钮操纵所有多选框==========================================
  function checkAll() {

    var state = document.forms[0].selectstate.value;
    var j = 0;
    for (var i = 0; i < document.forms[0].elements.length; i++) {
  var e = document.forms[0].elements[i];
  if (e.name == 'selected'){
     
      e.checked = state;
      if(j%2==0){
     changeCss(e,'9t_center');
	}else{
	changeCss(e,'9t_center_bg');
}
    j++	
 }
}
if (state == "on") {
  document.forms[0].selectstate.value = "";
}
else {
  document.forms[0].selectstate.value = "on";
}
}

function checkAllByName(selectedName, stateCtrl) {
  var state = stateCtrl.value;
  var j = 0;
  for (var i = 0; i < document.forms[0].elements.length; i++) {
  	var e = document.forms[0].elements[i];
	  if (e.name == selectedName){
	      e.checked = state;
		}
		j++	
 	}
	
	if (state == "on") {
	  stateCtrl.value = "";
	}
	else {
	  stateCtrl.value = "on";
	}
}

//控制键盘输入时只能输入数字和小数点
function floatOnly()
{
  if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57))|| (window.event.keyCode == 13)|| (window.event.keyCode == 46)  || (window.event.keyCode == 45)))
  {
     window.event.keyCode = 0 ;
  }
} 


//将值转化成Float型
function turnToFloat(name){     
   trimValue(name);
   var value=document.all[name].value; 
   value = getFloat(value,2);
   document.all[name].value=value;
} 

//对数字型数据值进行整理
function trimValue(name){
   var value = document.all[name].value;
   if(value==""||parseFloat(value)==0){
      document.all[name].value=0;
      return;
   }
   //去掉开头的0
   for(var i=0;i<value.length;i++){   
     if(value.charAt(i)==0)
       continue;
     else{
       value = value.substring(i);
       break;
     }  
   }
   document.all[name].value =value;
}

//百分比计算，结果保留小数点两位
function getRatio(num1,num2){
    if(num2==0)
      return 0;
    var result=num1/num2*100;
    return getFloat(result+"",2);
}


function selectLeftMenu(selfIndex, indexNum) {
	if(eval("document.all.child" + selfIndex + ".style").display =='none') {
		eval("document.all.child" + selfIndex + ".style").display = "";

		for(i=0; i< parseInt(indexNum); i++) {
			if(i == parseInt(selfIndex)) continue;						
			if(eval("document.all.child" + i))				
				eval("document.all.child" + i + ".style").display = 'none';
		}
	} else {
		eval("document.all.child" + selfIndex + ".style").display = "none";
	}
	
}

function disableRightClick(e)
{
  var message = "Right click disabled";
  
  if(!document.rightClickDisabled) // initialize
  {
    if(document.layers) 
    {
      document.captureEvents(Event.MOUSEDOWN);
      document.onmousedown = disableRightClick;
    }
    else document.oncontextmenu = disableRightClick;
    return document.rightClickDisabled = true;
  }
  if(document.layers || (document.getElementById && !document.all))
  {
    if (e.which==2||e.which==3)
    {
      return false;
    }
  }
  else
  {
 
    return false;
  }
}


function getFloatCtrlValue(ctrlNameHead, index) {
	if(index != -1 )
		ctrlName = ctrlNameHead + index;
	else 
		ctrlName = ctrlNameHead;
		
	ctrl = document.all[ctrlName]
	if(ctrl == null || trim(ctrl.value) == "") return 0;
	
	return parseFloat(ctrl.value);
	
}

function setFloatCtrlValue(ctrlNameHead, index, floatValue) {
	if(index != -1)
		ctrlName = ctrlNameHead + index;
	else 
		ctrlName = ctrlNameHead;
	ctrl = document.all[ctrlName];
	
	if(ctrl == null) return;
	
	return ctrl.value = floatValue;
	
}
//商品搜索


//身份证验证函数,返回一个字符串。yes则表示身份证号码正确。
function checkIdcard(idcard){ 
var Errors=new Array( 
"yes", 
"身份证号码位数不对!", 
"身份证号码出生日期超出范围或含有非法字符!", 
"身份证号码校验错误!", 
"身份证地区非法!" 
); 
var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}  
var idcard,Y,JYM; 
var S,M; 
var idcard_array = new Array(); 
idcard_array = idcard.split(""); 
//地区检验 
if(area[parseInt(idcard.substr(0,2))]==null) return Errors[4]; 
//身份号码位数及格式检验 
switch(idcard.length){ 
	case 15: 
		if ( (parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){ 
			ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性 
		} else { 
			ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性 
		} 
		if(ereg.test(idcard)) return Errors[0]; 
		else return Errors[2]; 
		break; 
	case 18: 
		//18位身份号码检测 
		//出生日期的合法性检查  
		//闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9])) 
		//平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8])) 
		if ( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 )){ 
			ereg=/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式 
		} else { 
			ereg=/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式 
		} 
		if(ereg.test(idcard)){//测试出生日期的合法性 
			//计算校验位 
			S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 
			+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 
			+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 
			+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 
			+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 
			+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 
			+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 
			+ parseInt(idcard_array[7]) * 1  
			+ parseInt(idcard_array[8]) * 6 
			+ parseInt(idcard_array[9]) * 3 ; 
			Y = S % 11; 
			M = "F"; 
			JYM = "10X98765432"; 
			M = JYM.substr(Y,1);//判断校验位 
			if(M == idcard_array[17]) return Errors[0]; //检测ID的校验位 
			else return Errors[3]; 
		}else{ return Errors[2]; }
		break; 
	default: 
		return Errors[1]; 
		break; 
	} 
}