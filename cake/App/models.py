# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.contrib.auth.models import AbstractUser
from django.db import models


class Category(models.Model):
    cid = models.AutoField(primary_key=True)
    cname = models.CharField(max_length=60)
    parentid = models.IntegerField()
    compere = models.CharField(max_length=30, blank=True, null=True)
    description = models.CharField(max_length=1000, blank=True, null=True)
    orderby = models.IntegerField(blank=True, null=True)
    namestyle = models.CharField(max_length=10, blank=True, null=True)
    logo = models.CharField(max_length=200, blank=True, null=True)
    themenum = models.IntegerField(blank=True, null=True)
    replynum = models.IntegerField(blank=True, null=True)
    lastpost = models.CharField(max_length=600, blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'category'


class Friendlink(models.Model):
    site = models.CharField(max_length=100)
    url = models.CharField(max_length=200, blank=True, null=True)
    logo = models.CharField(max_length=300, blank=True, null=True)
    orderby = models.IntegerField(blank=True, null=True)
    description = models.CharField(max_length=300, blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'friendlink'


class Lockip(models.Model):
    ip = models.CharField(max_length=20)
    starttime = models.DateTimeField(blank=True, null=True)
    endtime = models.DateTimeField(blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'lockip'


class Order(models.Model):
    oid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100,blank=True, null=True)
    ordernumber = models.IntegerField()
    money = models.IntegerField()
    create_time = models.DateTimeField(blank=True, null=True)
    paytime = models.DateTimeField(blank=True, null=True)
    paytype = models.SmallIntegerField(blank=True, null=True)
    unit_price = models.IntegerField(blank=True, null=True)
    total_price = models.IntegerField(blank=True, null=True)
    num = models.IntegerField(blank=True, null=True)
    isdel = models.SmallIntegerField(blank=True, null=True)
    iscart = models.SmallIntegerField(blank=True, null=True)
    status = models.SmallIntegerField(blank=True, null=True)
    mark = models.TextField(blank=True, null=True)
    uid = models.ForeignKey('User', models.CASCADE, db_column='uid', blank=True, null=True)


    class Meta:
        # managed = False
        db_table = 'order'



class Cart(models.Model): #购物车
    ccid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100,blank=True,null=True)
    create_time = models.DateTimeField(blank=True, null=True)
    paytime = models.DateTimeField(blank=True, null=True)
    unit_price = models.IntegerField(blank=True, null=True)
    total_price = models.IntegerField(blank=True, null=True)
    num = models.IntegerField(blank=True, null=True)
    isdel = models.SmallIntegerField(blank=True, null=True)
    iscollect = models.SmallIntegerField(blank=True, null=True)
    arrt = models.CharField(max_length=200,blank=True,null=True)
    uid = models.ForeignKey('User', models.CASCADE, db_column='uid', blank=True, null=True)
    class Meta:
        # managed = False
        db_table = 'cart'




class Products(models.Model):
    pid = models.AutoField(primary_key=True)
    title = models.CharField(max_length=600)
    content = models.TextField(blank=True, null=True)
    size = models.CharField(max_length=100,blank=True,null=True)
    pscore = models.IntegerField(default=100,null=True,blank=True)
    status = models.IntegerField(blank=True, null=True)
    hits = models.IntegerField(blank=True, null=True)
    istop = models.IntegerField(blank=True, null=True)
    iscart = models.IntegerField(blank=True, null=True)#加入购物车
    ishot = models.IntegerField(blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    isdel = models.SmallIntegerField(blank=True, null=True)
    publishtime = models.DateTimeField(blank=True, null=True)
    cid = models.ForeignKey(Category, models.CASCADE, db_column='cid', blank=True, null=True)
    ccid = models.ForeignKey(Cart, models.CASCADE, db_column='ccid', blank=True, null=True)#购物车
    # uid = models.ForeignKey('User', models.CASCADE, db_column='uid', blank=True, null=True)
    oid = models.ForeignKey(Order, models.CASCADE, db_column='oid', blank=True, null=True)
    coid = models.ForeignKey('Collections', models.CASCADE, db_column='coid', blank=True, null=True)#收藏夹


    class Meta:
        # managed = False
        db_table = 'products'


class addressdetail(models.Model):
    rid = models.AutoField(primary_key=True)
    receivename = models.CharField(max_length=100,blank=True, null=True)
    content = models.CharField(max_length=1000, blank=True, null=True)
    receivetime = models.DateTimeField(blank=True, null=True)
    isdel = models.SmallIntegerField(blank=True, null=True)
    iscontribute = models.SmallIntegerField(blank=True, null=True)#是否配送
    oid = models.ForeignKey(Order, models.CASCADE, db_column='oid', blank=True, null=True)#一对一
    uid = models.ForeignKey('User', models.CASCADE, db_column='uid', blank=True, null=True)

    class Meta:
        
        db_table = 'addressdetail'


class Siteinfo(models.Model):
    sitename = models.CharField(max_length=100, blank=True, null=True)
    website = models.CharField(max_length=100, blank=True, null=True)
    url = models.CharField(max_length=200, blank=True, null=True)
    reference = models.CharField(max_length=200, blank=True, null=True)
    isclose = models.IntegerField(blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'siteinfo'


class User(AbstractUser):
    # password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    # username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()
    uid = models.AutoField(primary_key=True)
    portrait = models.CharField(max_length=100, blank=True, null=True)
    gender = models.IntegerField(blank=True, null=True)
    usertype = models.IntegerField(blank=True, null=True)
    email = models.CharField(max_length=200, blank=True, null=True)
    autologin = models.IntegerField(blank=True, null=True)
    regtime = models.DateTimeField(blank=True, null=True)
    score = models.IntegerField(blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'user'


class Userdetail(models.Model):
    birthday = models.DateField(blank=True, null=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    qq = models.CharField(max_length=15, blank=True, null=True)
    signature = models.CharField(max_length=200, blank=True, null=True)
    quesstion = models.CharField(max_length=100, blank=True, null=True)
    answer = models.CharField(max_length=200, blank=True, null=True)
    grade = models.CharField(max_length=100, blank=True, null=True)
    uid = models.ForeignKey(User, models.CASCADE, db_column='uid',blank=True, null=True)


    class Meta:
        # managed = False
        db_table = 'userdetail'


class Collections(models.Model):
    coid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100,blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    isdel = models.SmallIntegerField(blank=True, null=True)
    iscart = models.SmallIntegerField(blank=True, null=True)
    create_time = models.DateTimeField(blank=True, null=True)


    class Meta:
        # managed = False
        db_table = 'collections'
