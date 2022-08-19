from django.urls import path

from . import views

urlpatterns = [
    path('', views.products_list, name='products_list'),
    path('details/<int:product_id>/', views.product_details, name='product_details'),

    path('featured/', views.featured_products),
    path('sales/', views.sales_products),

    path('checkout/', views.checkout),

    path('add/', views.add_product),
]
