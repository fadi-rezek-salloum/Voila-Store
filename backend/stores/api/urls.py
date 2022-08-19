from django.urls import path

from . import views

urlpatterns = [
    path('categories/', views.GetCategories.as_view()),

    path('stores/<int:cat_id>/', views.GetStores.as_view()),
    path('stores/<int:cat_id>/<str:city>/', views.GetFilteredStores.as_view()),

    path('category/add/', views.AddCategory.as_view()),
    path('store/add/', views.AddStore.as_view()),
]
