from django.urls import path

from . import views

urlpatterns = [
    path('register/', views.RegisterUser.as_view()),
    path('login/', views.LoginUser.as_view()),
    path('logout/', views.LogoutUser.as_view()),
    path('user/', views.UserView.as_view()),
]