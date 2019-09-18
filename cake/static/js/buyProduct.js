function addProduct(productId) {
	// var thisUrl = CONT +
	// "/fg/order/cart.do?actionType=ajaxaddproduct&productId="+productId;
	// send_request(addPorductRequest,"POST",thisUrl,false,null);
	document.cart.productId.value = productId;
	var cart = CART + "?actionType=addproduct&productId=" + productId;
	window.location.href = cart;
	// document.cart.submit();
} 
function addPorductRequest() {
	// 处理返回信息的函数
	if (http_request.readyState == 4) {
		// 判断对象状态
		if (http_request.status == 200) {
			// 信息已经成功返回，开始处理信息
			var returnText = http_request.responseText;
			// 用户没有登录
			if (returnText == "noLoginUser") {
				alert("你还没有登陆,只有登陆用户才能购买商品");
				return;
			}
			// 添加购物车商品失败
			if (returnText == "noProduct") {
				alert("你购买的商品暂时没货,请与商城联系");
				return;
			}
			if (returnText == "addProductSuccess") {
				alert("商品已经添加到你的购物车了,你可以查看你的购物车或结帐!");
				// 添加购物车商品成功
				// initCart();
			}
		} else { // 页面不正常
			alert("您所请求的页面有异常。");
		}
	}
}
