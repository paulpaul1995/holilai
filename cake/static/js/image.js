function previewPhoto(divId, pfile) {
  var photoName = pfile.value;
  var i = photoName.lastIndexOf("."); //取得文件名中最后一个"."的索引  
  var strExt = photoName.substring(i); //获取文件扩展名  
  var htm = "<img src='" + photoName + "' onload='DrawImage(this, 200, 200);' />";
  $(divId).html(htm);
}	

 //图片按比例缩放
	function DrawImage(ImgD, iwidth, iheight) {
			var image = new Image();
	    image.src = ImgD.src;
	    if (image.width > 0 && image.height > 0) {
	        if (image.width / image.height >= iwidth / iheight) {
	            if (image.width > iwidth) {
	                ImgD.width = iwidth;
	                ImgD.height = (image.height * iwidth) / image.width;
	            }
	            else {
	                ImgD.width = image.width;
	                ImgD.height = image.height;
	            }
	
	            ImgD.alt = image.width + "×" + image.height;
	        }
	        else {
	            if (image.height > iheight) {
	                ImgD.height = iheight;
	                ImgD.width = (image.width * iheight) / image.height;
	            }
	            else {
	                ImgD.width = image.width;
	                ImgD.height = image.height;
	            }
	            ImgD.alt = image.width + "×" + image.height;
	        }
	    }
	
	} 