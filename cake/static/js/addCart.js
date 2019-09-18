function addCartInfo(productId, numbers) {
	document.cart.productId.value = productId;
	var num = numbers;
	if (numbers == null) {
		num = 1;
	} else {
		num = numbers;
	}
	var cart = CART + "?actionType=addproduct&productId=" + productId
			+ "&number=" + num;
	window.location.href = cart;
	document.cart.submit();
}
