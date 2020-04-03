from django.conf.urls import url
from tracker import views
from . import views

urlpatterns = [
    url(r'^$', views.HomePageView.as_view()),
    url(r'^state/$', views.AboutPageView.as_view()),
]