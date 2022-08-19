from django.db import models

from stores.models import Store   
from users.models import CustomUser


class Product(models.Model):

    store = models.ForeignKey(Store, on_delete=models.CASCADE)

    title = models.CharField(max_length=75)
    price = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    discount = models.PositiveIntegerField(null=True, blank=True, default=0)

    quantity = models.PositiveSmallIntegerField(default=0)

    image = models.ImageField(upload_to='products/', null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    content = models.TextField(null=True, blank=True)

    rating = models.PositiveIntegerField(default=0)

    featured = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    

class Transaction(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    products = models.ManyToManyField(Product)

    address = models.TextField()

    purchased = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.email + ' - ' + str(self.purchased)
    