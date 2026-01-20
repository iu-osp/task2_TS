from django.db import models

class Task(models.Model):
    description = models.TextField()
    status = models.TextField(null=True,blank=True)
    priority = models.IntegerField(null=True,blank=True)

    class Meta:
        managed = False
        db_table = 'tasks'