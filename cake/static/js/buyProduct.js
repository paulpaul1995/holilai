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
	// ��������Ϣ�ĺ���
	if (http_request.readyState == 4) {
		// �ж϶���״̬
		if (http_request.status == 200) {
			// ��Ϣ�Ѿ��ɹ����أ���ʼ������Ϣ
			var returnText = http_request.responseText;
			// �û�û�е�¼
			if (returnText == "noLoginUser") {
				alert("�㻹û�е�½,ֻ�е�½�û����ܹ�����Ʒ");
				return;
			}
			// ��ӹ��ﳵ��Ʒʧ��
			if (returnText == "noProduct") {
				alert("�㹺�����Ʒ��ʱû��,�����̳���ϵ");
				return;
			}
			if (returnText == "addProductSuccess") {
				alert("��Ʒ�Ѿ���ӵ���Ĺ��ﳵ��,����Բ鿴��Ĺ��ﳵ�����!");
				// ��ӹ��ﳵ��Ʒ�ɹ�
				// initCart();
			}
		} else { // ҳ�治����
			alert("���������ҳ�����쳣��");
		}
	}
}
