from django.shortcuts import render
import json
from django.http import JsonResponse
from .tabla import Tabla
from django.views.decorators.csrf import csrf_exempt
import time
# Create your views here.

def myapp_page(request):
    return render(request, './index.html')

@csrf_exempt
def get_ai_move(request):
    body_unicode = request.body.decode('utf-8')
    json_res = json.loads(body_unicode)
    content = json_res['data']
    game_table = Tabla(content)
    # start_time = time.time()
    # move = game_table.get_easy_move()
    # move = game_table.get_intermediate_move()
    diff = json_res['diff']
    if diff=='easy':
        move = game_table.get_easy_move()
    elif diff=='intermediate':
        move = game_table.get_intermediate_move()
    elif diff=='hard':    
        move = game_table.get_hard_move()
    # print('--- %s seconds ---' % (time.time()-start_time))
    if move!=-1:
        return JsonResponse(move,safe=False)
    else: 
        return JsonResponse({'message':'Nema poteza.'},safe=False)