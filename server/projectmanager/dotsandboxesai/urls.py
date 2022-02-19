from rest_framework import routers
from .api import PotezViewSet
from .views import myapp_page,get_ai_move
from django.urls import path
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
router = routers.DefaultRouter()
router.register('api/potez', PotezViewSet,'potez')

urlpatterns = [path('',myapp_page)]
urlpatterns+=staticfiles_urlpatterns()
urlpatterns+=[path('getmove',get_ai_move)]
urlpatterns += router.urls