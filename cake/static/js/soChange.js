/*
 *	soChange 1.4 - simple gallery with jQuery
 *	made by bujichong 2009-12-14
 *	���ߣ����  2009-12-14
 * Download by http://www.codefans.net
 * http://hi.baidu.com/bujichong/
 */

(function ($) {
$.fn.soChange = function (o) {
    return  new $sG(this, o);
			//alert('do');
    };

	var settings = {
		thumbObj:null,//��������
		botPrev:null,//��ť��һ��
		botNext:null,//��ť��һ��
		thumbNowClass:'now',//��������ǰ��class,Ĭ��Ϊnow
		thumbOverEvent:true,//��꾭��thumbObjʱ�Ƿ��л�����Ĭ��Ϊtrue��Ϊfalseʱ��ֻ�������thumbObj���л�����
		slideTime:1000,//ƽ������ʱ�䣬Ĭ��Ϊ1000ms
		autoChange:true,//�Ƿ��Զ��л���Ĭ��Ϊtrue
		clickFalse:true,//����������������ӣ�����Ƿ�������Ч�����Ƿ񷵻�return false��Ĭ����return false������Ч����thumbOverEventΪfalseʱ���������Ϊtrue������������¼���ͻ
		overStop:true,//��꾭���л�����ʱ���л������Ƿ�ֹͣ�л�����������뿪�������Զ��л���ǰ�����ѿ����Զ��л�
		changeTime:5000,//�Զ��л�ʱ��
		delayTime:300//��꾭��ʱ�����л�����ʱ�䣬�Ƽ�ֵΪ300ms
	};

 $.soChangeLong = function(e, o) {
    this.options = $.extend({}, settings, o || {});
	var _self = $(e);
	var set = this.options;
	var thumbObj;
	var size = _self.size();
	var nowIndex = 0; //����ȫ��ָ��
	var index;//����ȫ��ָ��
	var startRun;//Ԥ�����Զ����в���
	var delayRun;//Ԥ�����ӳ����в���

//��ʼ��
	_self.hide();
	_self.eq(0).show();

//���л�����
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
		clearInterval(startRun);//�����Զ��л�����
		startRun = setInterval(runNext,set.changeTime);}
		}
}




//�л�����һ��
function runNext() {
	index =  (nowIndex+1)%size;
	fadeAB();
}

//�����һͼƬ
	if (set.thumbObj!=null) {
	thumbObj = $(set.thumbObj);
//��ʼ��
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

//�����һ��
	if (set.botNext!=null) {
		$(set.botNext).click(function () {
			if(_self.queue().length<1){
			runNext();}
			return false;
		});
	}

//�����һ��
	if (set.botPrev!=null) {
		$(set.botPrev).click(function () {
			if(_self.queue().length<1){
			index = (nowIndex+size-1)%size;
			fadeAB();}
			return false;
	});
	}

//�Զ�����
	if (set.autoChange==true) {
	startRun = setInterval(runNext,set.changeTime);
	if (set.overStop == true) {
		_self.mouseenter(function () {
			clearInterval(startRun);//�����Զ��л�����
			
		});
		_self.mouseleave(function () {
			startRun = setInterval(runNext,set.changeTime);
		});
		}
	}

}

var $sG = $.soChangeLong;
})(jQuery);