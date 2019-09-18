/*
 *	soChange 1.4 - simple gallery with jQuery
 *	made by bujichong 2009-12-14
 *	作者：不羁虫  2009-12-14
 * Download by http://www.codefans.net
 * http://hi.baidu.com/bujichong/
 */

(function ($) {
$.fn.soChange = function (o) {
    return  new $sG(this, o);
			//alert('do');
    };

	var settings = {
		thumbObj:null,//导航对象
		botPrev:null,//按钮上一个
		botNext:null,//按钮下一个
		thumbNowClass:'now',//导航对象当前的class,默认为now
		thumbOverEvent:true,//鼠标经过thumbObj时是否切换对象，默认为true，为false时，只有鼠标点击thumbObj才切换对象
		slideTime:1000,//平滑过渡时间，默认为1000ms
		autoChange:true,//是否自动切换，默认为true
		clickFalse:true,//导航对象如果有链接，点击是否链接无效，即是否返回return false，默认是return false链接无效，当thumbOverEvent为false时，此项必须为true，否则鼠标点击事件冲突
		overStop:true,//鼠标经过切换对象时，切换对象是否停止切换，并于鼠标离开后重启自动切换，前提是已开启自动切换
		changeTime:5000,//自动切换时间
		delayTime:300//鼠标经过时对象切换迟滞时间，推荐值为300ms
	};

 $.soChangeLong = function(e, o) {
    this.options = $.extend({}, settings, o || {});
	var _self = $(e);
	var set = this.options;
	var thumbObj;
	var size = _self.size();
	var nowIndex = 0; //定义全局指针
	var index;//定义全局指针
	var startRun;//预定义自动运行参数
	var delayRun;//预定义延迟运行参数

//初始化
	_self.hide();
	_self.eq(0).show();

//主切换函数
function fadeAB () {
	if (nowIndex != index) {
		if (set.thumbObj!=null) {
		$(set.thumbObj).removeClass(set.thumbNowClass).eq(index).addClass(set.thumbNowClass);}
		if (set.slideTime <= 0) {
			_self.eq(nowIndex).hide();
			_self.eq(index).show();	
		}else{
			_self.eq(nowIndex).fadeOut(set.slideTime);
			_self.eq(index).fadeIn(set.slideTime);

		}
		nowIndex = index;
		if (set.autoChange==true) {
		clearInterval(startRun);//重置自动切换函数
		startRun = setInterval(runNext,set.changeTime);}
		}
}




//切换到下一个
function runNext() {
	index =  (nowIndex+1)%size;
	fadeAB();
}

//点击任一图片
	if (set.thumbObj!=null) {
	thumbObj = $(set.thumbObj);
//初始化
	thumbObj.removeClass(set.thumbNowClass).eq(0).addClass(set.thumbNowClass);

		thumbObj.click(function () {
			index = thumbObj.index($(this));
			fadeAB();
			if (set.clickFalse == true) {
				return false;
			}
		});
		if (set.thumbOverEvent == true) {
		thumbObj.mouseenter(function () {
			index = thumbObj.index($(this));
			delayRun = setTimeout(fadeAB,set.delayTime);
		});
		thumbObj.mouseleave(function () {
			clearTimeout(delayRun);
		});
		}
	}

//点击上一个
	if (set.botNext!=null) {
		$(set.botNext).click(function () {
			if(_self.queue().length<1){
			runNext();}
			return false;
		});
	}

//点击下一个
	if (set.botPrev!=null) {
		$(set.botPrev).click(function () {
			if(_self.queue().length<1){
			index = (nowIndex+size-1)%size;
			fadeAB();}
			return false;
	});
	}

//自动运行
	if (set.autoChange==true) {
	startRun = setInterval(runNext,set.changeTime);
	if (set.overStop == true) {
		_self.mouseenter(function () {
			clearInterval(startRun);//重置自动切换函数
			
		});
		_self.mouseleave(function () {
			startRun = setInterval(runNext,set.changeTime);
		});
		}
	}

}

var $sG = $.soChangeLong;
})(jQuery);