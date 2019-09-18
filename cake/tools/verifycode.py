import os
from io import BytesIO
from random import randint

from PIL import Image,ImageFont,ImageDraw

from cake.settings import BASE_DIR, STATICFILES_DIRS


class VerifyCode:
    def __init__(self,width=100,height=40,size=4):
        """
        :param width: 验证码图片宽度
        :param height: 验证码图片高度
        :param size: 验证码字符数
        """
        self.width = width
        self.height = height
        self.size = size


    #生成验证码
    def output(self):
        #1 生成画布
        im = Image.new("RGB",(self.width,self.height),self.rand_color(200,255))
        self.pen = ImageDraw.Draw(im)
        #2 生成验证码字符串
        self.code = self.genearte_string()
        #3 画验证码
        self.__draw_string()
        #4 画干扰点
        self.__draw_point()
        #5 画干扰线
        self.__draw_line()
        #6 返回验证码信息
        # im.save('vc.png')
        buf = BytesIO()
        im.save(buf,'png')
        res = buf.getvalue()
        buf.close()
        return res

    def rand_color(self,low,high):
        return randint(low,high),randint(low,high),randint(low,high)
    #生成随机字符串
    def genearte_string(self):
        return str(randint(10**(self.size-1),10**(self.size)))

    def __draw_string(self):
        # path = 'fonts/ot11.ttf'
        path = os.path.join(STATICFILES_DIRS[0],'fonts/ot11.ttf')
        #获取字体
        font = ImageFont.truetype(path,size=25,encoding='utf-8')
        for i in range(0,self.size):
            ch = self.code[i]
            #x坐标
            x = 10 + (self.width-20)//self.size  * i
            #y坐标
            y = randint(1,6)
            self.pen.text((x,y),ch,font=font,fill=self.rand_color(10,120))

    def __draw_point(self):
        for i in range(200):
            x = randint(1,self.width-1)
            y = randint(1,self.height-1)
            self.pen.point((x,y))

    def __draw_line(self):
        for i in range(5):
            x1 = randint(1,self.width-1)
            y1 = randint(1,self.height-1)
            x2 = randint(1, self.width - 1)
            y2 = randint(1, self.height - 1)
            self.pen.line([(x1,y1),(x2,y2)],fill=self.rand_color(50,150))


if __name__ == '__main__':
    vc = VerifyCode()
    vc.output()
    print(vc.code)
