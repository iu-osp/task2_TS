from django.urls import path
from .views import get_all_tasks, post_task, get_delete_task_by_id

urlpatterns = [
    path('', get_all_tasks, name='get_all_tasks'),
    path('task', post_task, name='post_task'),
    path('task/<int:id>', get_delete_task_by_id, name='get_delete_task_by_id')
]