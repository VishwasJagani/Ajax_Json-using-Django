from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from demo.models import *

# Create your views here.

def home(request):

    data = student.objects.all()
    context = {
        "data": data,
    }
    return render(request, 'index.html',context)

# @csrf_exempt
def add_student(request):
    try:
        if request.method == "POST":
            name = request.POST.get('name')
            email = request.POST.get('email')
            number = request.POST.get('number')

            user = student.objects.create(
                name = name,
                email = email,
                number = number,
            )
            user.save()
            return JsonResponse({"status":200,"message":"Inserted"})
  
    except Exception as error:
        return JsonResponse({"status":400,"message":error})

@csrf_exempt   
def delete_record(request,id):
    try:
        if request.method == "POST":
            id = request.POST.get('id')

            user = student.objects.get(id=id)
            user.delete()
            return JsonResponse({"status":200,"message":"Deleted"})
    
    except Exception as error:
        return JsonResponse({"status":400,"message":"Page Not Found"})