from rest_framework import serializers
from .models import Task

class TaskSerilizer(serializers.ModelSerializer):
    
    class Meta:
        model = Task
        fields = ('id', 'description', 'status', 'priority')

class TaskPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ('description','status','priority')