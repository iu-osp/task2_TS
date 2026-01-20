from .serializers import TaskSerilizer, TaskPostSerializer
from .models import Task
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404

from rest_framework import generics

@api_view(['GET'])
def get_all_tasks(request):
    serializer = TaskSerilizer(Task.objects.all(),many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def post_task(request):
    if not request.data["priority"]:
        request.data["priority"] = 0
    request.data["status"] = "In Progress"
    serializer = TaskPostSerializer(data = request.data)
    if serializer.is_valid():
        save = serializer.save()
        return Response(TaskSerilizer(save).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','DELETE'])
def get_delete_task_by_id(request,id):
    task = get_object_or_404(Task,id=id)
    if request.method == 'GET':
        serializer = TaskSerilizer(task)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    if request.method == 'PATCH':
        serializer = TaskSerilizer(Task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    task.delete()
    return Response({"message": "Task deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
