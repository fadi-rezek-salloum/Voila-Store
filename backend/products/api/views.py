import jwt

from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import ProductSerializer

from stores.models import Store
from products.models import Product, Transaction
from users.models import CustomUser

@api_view(['GET'])
def products_list(request, store_id):
    products = Product.objects.filter(store__id=store_id, quantity__gt=0).order_by('-created_at')

    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def featured_products(request):
    products = Product.objects.filter(featured=True, quantity__gt=0)

    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def sales_products(request):
    products = Product.objects.filter(discount__gt=0, quantity__gt=0)

    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def product_details(request, store_id = None, product_id = None):
    product = get_object_or_404(Product, id=product_id)

    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)

@api_view(['POST'])
def checkout(request):
    if request.method == 'POST':
        user = CustomUser.objects.get(id=jwt.decode(request.COOKIES.get('jwt'), "secret", algorithms=["HS256"]).get('id'))

        products = request.data.get('products')
        address = request.data.get('address')

        instance = Transaction.objects.create(
            user=user,
            address=address
        )

        for product in products:
            instance.products.add(product['productId'])
            p = Product.objects.get(id=product['productId'])
            p.quantity = p.quantity - product['amount']
            p.save()

        instance.save()

        return Response('Done!')


@api_view(['POST'])
def add_product(request):
    
    store = Store.objects.get(name__iexact=request.data.get('store'))
    title = request.data.get('title')
    price = request.data.get('price')
    discount = request.data.get('discount') or None
    quantity = request.data.get('quantity')
    rating = request.data.get('rating')
    content = request.data.get('content') or None
    featured = request.data.get('featured')
    image = request.data.get('image')

    if featured == 'true':
        featured = True
    else:
        featured = False

    Product.objects.create(store=store, title=title, price=price, discount=discount, quantity=quantity, rating=rating, content=content, image=image)

    return Response('Done!')
