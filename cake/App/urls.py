from django.conf.urls import url

from App import views

urlpatterns = [

    url(r'^$',views.index,name='index'),
    url(r'^user/$',views.user,name='user'),
    url(r'^order/$', views.order, name='order'),
    url(r'^favorite/$', views.favorite, name='favorite'),
    url(r'^friend/$', views.friend, name='friend'),
    url(r'^address/$', views.address, name='address'),
    url(r'^integral/$', views.integral, name='integral'),
    url(r'^bonus/$', views.bonus, name='bonus'),
    url(r'^message/$', views.message, name='message'),
    url(r'^changem/$', views.changem, name='changem'),
    url(r'^editpwd/$', views.editpwd, name='editpwd'),
    url(r'^profile/$', views.profile, name='profile'),

    url(r'^all/$', views.all, name='all'),
    url(r'^cake/$', views.cake, name='cake'),
    url(r'^classics/$', views.classics, name='classics'),
    url(r'^children/$', views.children, name='children'),
    url(r'^zunai/$', views.zunai, name='zunai'),
    url(r'^snacks/$', views.snacks, name='snacks'),
    url(r'^we/$', views.we, name='we'),
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.user_login, name='login'),
    url(r'^logout/$', views.user_logout, name='logout'),
    url(r'^yzm/$', views.get_yzm, name='yzm'),
    url(r'^category/(\d+)/$', views.category, name='category'),




]