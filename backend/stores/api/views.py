from django.http import HttpResponseBadRequest
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import CategorySerializer, StoreSerializer

from stores.models import Category, Store
from users.models import CustomUser

class GetCategories(APIView):

    def get(self, request):
        categories = Category.objects.all()

        serializer = CategorySerializer(categories, many=True)

        return Response(serializer.data)


class GetStores(APIView):

    def get(self, request, cat_id):
        stores = Store.objects.filter(category__id=cat_id)

        serializer = StoreSerializer(stores, many=True)

        return Response(serializer.data)


class GetFilteredStores(APIView):

    def get(self, request, cat_id, city):
        if ( city ) == 'all':
            stores = Store.objects.filter(category__id=cat_id)
        else:
            stores = Store.objects.filter(category__id=cat_id).filter(city__icontains=city)

        serializer = StoreSerializer(stores, many=True)

        return Response(serializer.data)


class AddCategory(APIView):

    def post(self, request):

        serializer = CategorySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

        return Response('Added!')


class AddStore(APIView):

    def post(self, request):

        user = CustomUser.objects.get(email=request.data.get('email'))
        category = Category.objects.get(title__iexact=request.data.get('category'))[0]

        name = request.data.get('name')
        image = request.data.get('image')
        address = request.data.get('address')
        city = request.data.get('city')
        rating = request.data.get('rating')
        open_at = request.data.get('open_at')
        close_at = request.data.get('close_at')

        Store.objects.create(user=user, category=category, name=name, image=image, address=address, city=city, rating=rating, open_at=open_at, close_at=close_at)

        return Response('Added!')