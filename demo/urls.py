from django.urls import path , include
from demo.views import *

urlpatterns = [

    path('', home,name="home"),
    path('add_student/', add_student,name="add_student"),
    path('edit_record/<int:id>', edit_record,name="edit_record"),
    path('delete_record/<int:id>', delete_record,name="delete_record"),

]