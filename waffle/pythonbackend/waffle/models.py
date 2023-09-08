from django.db import models

# Create your models here.
class Recommed(models.Model):
    plane_company = models.TextField()

    def __str__(self):
        return self.plane_company