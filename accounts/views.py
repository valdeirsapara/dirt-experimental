from inertia import render
from django.contrib import messages

from django.shortcuts import redirect
from django.contrib.auth import authenticate, login
import json

def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        
        # Validação básica
        if not username or not password:
            return render(request, 'Accounts/Login/Index', {
                'errors': {
                    'username': 'Username é obrigatório' if not username else '',
                    'password': 'Senha é obrigatória' if not password else ''
                }
            })
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # Redirect to a success page or return a success response
            return redirect("index")
        else:
            request.session['error'] = 'Credenciais inválidas'
    
    return render(request, 'Accounts/Login/Index')
