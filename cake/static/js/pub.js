var IS_NULL = 0X80; //	10000000
var IS_FULL = 0X40; //	01000000
var IS_HALF = 0X20; //	00100000
var IS_ASCII = 0X10; //	00010000
var IS_NUM = 0X08; //	00001000
var IS_DATE = 0X04; //	00000100
var IS_PHONE = 0X02; //	00000010
var IS_EMAIL = 0X01; //	00000001
var IS_NOT_NULL = 0X00; //	00000000

/****************************************һ����������*************************************************/
//1.����ѡ�񴰿�
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

/****************************************�������Ƽ���¼��*************************************************/

//1.���Ƽ������룬ֻ�������ּ�¼������
 function intOnly() {
   if (! ( (window.event.keyCode >= 48) && (window.event.keyCode <= 57) || (window.event.keyCode == 45))  ){
   window.event.keyCode = 0;
 }
}

//2.���Ƽ������룬ֻ�������ּ�¼��С��������
    function numberOnly() {
    if (! ( ( (window.event.keyCode >= 48) && (window.event.keyCode <= 57)) ||
           (window.event.keyCode == 13) || (window.event.keyCode == 46)))

{
  window.event.keyCode = 0;
}
}
    /****************************************�������ֵĸ�ʽ����������*************************************************/
//ȡ�����������Զ���С�����ȷ��λ��,�����������롣
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
    /****************************************�ġ��ַ����ĸ�ʽ����������*************************************************/
//1.���ַ����滻
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
//2.��˫�����滻���������ַ����滻������
    function replaceCommas(str) {
    if (str == "") {
  return str;
}
str = replaceStr(str, "'", "'");
    //str = replaceStr(str, '"', '"');
    return str;
}

//3.ȥ���ַ����еĸ����ַ�
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
    /****************************************�塢���ڵĸ�ʽ����������*************************************************/
//1.��������ϳɸ�ʽ�����ַ���
    function formatDate(sYear, sMonth, sDay) {
    if (sMonth.length == 1) {
  sMonth = "0" + sMonth;
}
if (sDay.length == 1) {
  sDay = "0" + sDay;
}
return sYear + sMonth + sDay;
}
//2.������ת��Ϊ��ʽ�����ַ���
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
//3.�ж��Ƿ�Ϊ����
    function checkLeapYear(year) {
    if ( ( (year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
  return true;
}
return false;
}
//4.��ø�ʽ����ϵͳʱ��
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
//5.�Ƚ��������ڵĴ�С
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
//6.�ж��Ƿ�С�ڵ�ǰʱ��
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
//7.�ж��Ƿ���ڵ�ǰʱ��
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
//8.�ж��Ƿ���ڵ�ǰʱ��
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
//�Ƚ�����ʱ���С
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
    /****************************************�塢��ֵ�ĸ�ʽ������*************************************************/
//1.�ϴ��ļ�ʱȡ�ñ����ϴ�·���е��ļ���
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
//2.ȥ��FORM������TEXT��TEXTAREA����ֵ���ߵĿո�
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
    /****************************************�����ύǰ�ı�ֵ���*************************************************/
//1.��ɾ������ʱ����Ƿ�ѡ��ѡ��
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
//2.������ֵ�Ƿ�Ϊ��,�Ƿ���������С��������
var MSG_CHECK_SUCCESS = "Check Success";
function checkItem(sCheck, nMinLen, nMaxLen, chkFlg) {
    var strLen = 0;
    if ( (sCheck == null) || (sCheck == "")) {
  if ( ( (chkFlg & 0X80) == 0X80) || ( (chkFlg & 0X00) == 0X00)) {

    return "�Ǳ����������Ŀ";
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
          return "�ĳ��ȱ���" + nMinLen + "�ֽ�";
        }
        else {
          return "�ĳ��ȱ���" + nMinLen + "�ֽ�";
        }
      }
    }
    else if (strLen < nMinLen) {
      if ( (chkFlg & 0x08) == 0x08) {
        return "��������";
      }
      else {
        return "���ڶ�С����С����Ϊ" + nMinLen + "�ֽ�";
      }
    }
  }
  if (nMaxLen > 0) {
    if (strLen > nMaxLen) {
      return "��������󳤶�" + nMaxLen + "�ֽ�";
    }
  }
}
if ( (chkFlg & 0x10) == 0x10) {
  if (!checkASCII(sCheck)) {
    return "����ȷ";
  }
}

if ( (chkFlg & 0x08) == 0x08) {
  if (!checkNumber(sCheck)) {
    return "��������Ŀ";
  }
}

if ( (chkFlg & 0x04) == 0x04) {
  if (!checkDate(sCheck)) {
    return "��������Ŀ";
  }
}

if ( (chkFlg & 0x02) == 0x02) {
  if (!checkPhone(sCheck)) {
    return "����ȷ";
  }
}

if ( (chkFlg & 0x01) == 0x01) {
  if (!checkEmail(sCheck)) {
    return "����ȷ";
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
//3.�������ʼ����ĸ�ʽ�Ƿ���ȷ
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
//4.���绰������ĸ�ʽ�Ƿ���ȷ
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
//5.����Ƿ�ΪӢ����ĸ
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
//6.����Ƿ�Ϊ������Ԫ��
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
//7.����Ƿ�Ϊ������Ԫ��
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
//8.����Ƿ�Ϊ����
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

 /****************************************�ߡ��Ӵ��ڵĵ�����ر�*************************************************/
var childWindow = null;
var fatherWindow = null;
var form = null;

// ���Ӵ��ڣ��ڴ�֮ǰ���常���ڵ�����
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
// ����Ѿ����Ӵ��ڴ򿪣���ر�֮
    function closeChildNew() {
    if (childWindow && childWindow.open && !childWindow.closed) {
  childWindow.close();
}
}

// �ر��Ӵ��ڵ�ͬʱ�������ύ�������ύ֮��ĵ�ҳ��ת�������ڣ��ر��Ӵ���
// ���ﱾӦ����ʹ��ͬһ������,����ʱ���е㼱,��
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
//�ı�ѡ���е�css;author��lithlin   for rdms only!
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
//������ѡ������ƶ�����
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
//����ĳ����ѡ���е�����
    function removeItem(from) {
    for (i = from.options.length - 1; i >= 0; i--) {
  if (from.options(i).selected == true) {
    from.remove(i);
  }
}
}
//===============ȫѡ��ť�������ж�ѡ��==========================================
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

//���Ƽ�������ʱֻ���������ֺ�С����
function floatOnly()
{
  if ( !(((window.event.keyCode >= 48) && (window.event.keyCode <= 57))|| (window.event.keyCode == 13)|| (window.event.keyCode == 46)  || (window.event.keyCode == 45)))
  {
     window.event.keyCode = 0 ;
  }
} 


//��ֵת����Float��
function turnToFloat(name){     
   trimValue(name);
   var value=document.all[name].value; 
   value = getFloat(value,2);
   document.all[name].value=value;
} 

//������������ֵ��������
function trimValue(name){
   var value = document.all[name].value;
   if(value==""||parseFloat(value)==0){
      document.all[name].value=0;
      return;
   }
   //ȥ����ͷ��0
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

//�ٷֱȼ��㣬�������С������λ
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
//��Ʒ����


//���֤��֤����,����һ���ַ�����yes���ʾ���֤������ȷ��
function checkIdcard(idcard){ 
var Errors=new Array( 
"yes", 
"���֤����λ������!", 
"���֤����������ڳ�����Χ���зǷ��ַ�!", 
"���֤����У�����!", 
"���֤�����Ƿ�!" 
); 
var area={11:"����",12:"���",13:"�ӱ�",14:"ɽ��",15:"���ɹ�",21:"����",22:"����",23:"������",31:"�Ϻ�",32:"����",33:"�㽭",34:"����",35:"����",36:"����",37:"ɽ��",41:"����",42:"����",43:"����",44:"�㶫",45:"����",46:"����",50:"����",51:"�Ĵ�",52:"����",53:"����",54:"����",61:"����",62:"����",63:"�ຣ",64:"����",65:"�½�",71:"̨��",81:"���",82:"����",91:"����"}  
var idcard,Y,JYM; 
var S,M; 
var idcard_array = new Array(); 
idcard_array = idcard.split(""); 
//�������� 
if(area[parseInt(idcard.substr(0,2))]==null) return Errors[4]; 
//��ݺ���λ������ʽ���� 
switch(idcard.length){ 
	case 15: 
		if ( (parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){ 
			ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//���Գ������ڵĺϷ��� 
		} else { 
			ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//���Գ������ڵĺϷ��� 
		} 
		if(ereg.test(idcard)) return Errors[0]; 
		else return Errors[2]; 
		break; 
	case 18: 
		//18λ��ݺ����� 
		//�������ڵĺϷ��Լ��  
		//��������:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9])) 
		//ƽ������:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8])) 
		if ( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 )){ 
			ereg=/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//����������ڵĺϷ���������ʽ 
		} else { 
			ereg=/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//ƽ��������ڵĺϷ���������ʽ 
		} 
		if(ereg.test(idcard)){//���Գ������ڵĺϷ��� 
			//����У��λ 
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
			M = JYM.substr(Y,1);//�ж�У��λ 
			if(M == idcard_array[17]) return Errors[0]; //���ID��У��λ 
			else return Errors[3]; 
		}else{ return Errors[2]; }
		break; 
	default: 
		return Errors[1]; 
		break; 
	} 
}