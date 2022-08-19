import datetime

from django.db import models

from users.models import CustomUser

CITY_CHOICES = (
    ('homs', 'homs'),
    ('hama', 'hama'),
    ('aleppo', 'aleppo'),
    ('damascus', 'damascus'),
)

class Category(models.Model):
    
    title = models.CharField(max_length=75)

    image = models.ImageField(upload_to='categories/', null=True, blank=True)

    def __str__(self):
        return self.title

class Store(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    category = models.OneToOneField(Category, on_delete=models.CASCADE)

    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to='stores/', null=True, blank=True)
    address = models.CharField(max_length=50)

    city = models.CharField(max_length=10, choices=CITY_CHOICES)

    open_at = models.TimeField(null=True, blank=True)
    close_at = models.TimeField(null=True, blank=True)

    rating = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

    @property
    def is_opened(self):
        now = datetime.datetime.now().time()

        print(now)

        if self.open_at <= self.close_at: 
            return self.open_at <= now <= self.close_at
        else: 
            return self.open_at <= now or now <= self.close_at 