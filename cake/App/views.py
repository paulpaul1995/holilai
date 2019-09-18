from django.urls import reverse

from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from App.Base import base
from App.forms import RegisterForm
from App.models import *
from django.shortcuts import render, redirect

from tools.verifycode import VerifyCode


def index(request):
    return render(request,'app/index.html')

# 我的账户
def user(request):
    users=User.objects.all()
    orders=Order.objects.all()
    if request.method=='POST':
        pass
    return render(request, 'app/user.html',locals())

# 订单列表
def order(request):
    return render(request, 'app/order.html')

# 我的收藏夹
def favorite(request):
    shous=Collections.objects.all()
    if request.method=='POST':
        pass

    return render(request, 'app/favorite.html')

# 我的亲友团
def friend(request):
    return render(request, 'app/friend.html')

# 我的收货地址簿
def address(request):
    return render(request, 'app/address.html')

# 我的积分
def integral(request):
    return render(request, 'app/integral.html')

# 我的优惠劵
def bonus(request):
    return render(request, 'app/bonus.html')

# 留言板
def message(request):
    return render(request, 'app/message.html')

# 更换手机号
def changem(request):
    return render(request, 'app/changem.html')

# 修改密码
def editpwd(request):
 return render(request, 'app/editpwd.html')

# 编辑用户信息
def profile(request):
    return render(request, 'app/profile.html')


# 版块




def category(request,cid):
    categorys = base()
    cid = int(cid)
    present_category = Category.objects.get(pk=cid)

    return None
def snacks(request):#零食
    return  render(request, 'app/snacks.html')
def we(request):#关于我们
    return  render(request, 'app/we.html')
def all(request):#全部
    return render(request, 'app/1.html')
def cake(request):#蛋糕
    return render(request, 'app/cake.html')
def classics(request):#经典
    return render(request, 'app/classcis.html')
def children(request):#儿童
    return render(request, 'app/children.html')
def zunai(request):#尊爱
    return  render(request, 'app/zunai.html')

#注册
def register(request):
    if request.method == 'POST':
        # 用POST数据实例化表单，表单对象会验证POST数据
        form = RegisterForm(request.POST)

        # 验证码验证
        yzm1 = request.POST.get('yzm')
        yzm2 = request.session.get('code')
        # 判定验证码是否匹配
        res = (yzm1 == yzm2)
        # 如果验证码不匹配
        if not res:
            form.errors['yzm'] = "验证码不匹配"

        if res and form.is_valid():  # 验证通过
            form.cleaned_data.pop('repassword')
            form.cleaned_data.pop('yzm')
            # form.cleaned_data.pop('phonenumber')
            User.objects.create_user(**form.cleaned_data)

            # 基础写法
            # user = User()
            # print(form.cleaned_data)
            # user.username = form.cleaned_data.get('username')
            # user.password = form.cleaned_data.get('password')
            # user.email = form.cleaned_data.get('email')
            # user.save()
            return redirect(reverse('app:index'))
        return render(request, 'app/register.html', {'form': form }, locals())
    else:
        form = RegisterForm()
        return render(request, 'app/register.html', locals())


def get_yzm(request):
    vc = VerifyCode()
    res = vc.output()
    # 将验证码保存到session
    request.session['code'] = vc.code
    return HttpResponse(res, 'image/png')


def user_login(request):
    if request.method == 'POST':
        if request.POST.get('loginsubmit'):
            username = request.POST.get('username')
            password = request.POST.get('password')
            autologin = request.POST.get('cookietime')
            # print(username)
            # print(password)

            #验证成功返回用户对象，否则返回None
            user = authenticate(request,username=username,password=password)
            print(user.is_authenticated)
            if user:
                #登陆，写入session,并把user写入request
                #自动登陆处理
                # if autologin:
                #     user.autologin = 1
                user.save()
                login(request,user)
                # request.session.set_expiry(0)
                print('-----------------------------------------')

                return redirect(reverse('app:index'))
            # else:
            #     return redirect(reverse('app:login_error'))
    return render(request,'app/login.html')

def user_logout(request):
    logout(request)
    return redirect(reverse('app:index'))


