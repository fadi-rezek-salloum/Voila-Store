from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from stores.models import Category, Store

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class StoreSerializer(ModelSerializer):
    is_opened = serializers.CharField(read_only=True)

    class Meta:
        model = Store
        fields = '__all__'