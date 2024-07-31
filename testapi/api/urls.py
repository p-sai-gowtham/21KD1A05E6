from django.urls import path
from .views import top_products_view, product_detail_view

urlpatterns = [
    path(
        "categories/<str:categoryname>/products", top_products_view, name="top-products"
    ),
    path(
        "categories/<str:categoryname>/products/<str:productid>",
        product_detail_view,
        name="product-detail",
    ),
]
