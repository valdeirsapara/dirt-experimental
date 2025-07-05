from inertia import share
from django.conf import settings
from django.contrib.auth.models import User

def inertia_share(get_response):
    """
    Middleware para compartilhar dados globalmente com todas as páginas Inertia
    """
    def middleware(request):
        # Dados que serão compartilhados com todas as páginas
        share(request,
            # Informações da aplicação
            app_name=getattr(settings, 'APP_NAME', 'DIRT App'),
            app_version=getattr(settings, 'APP_VERSION', '1.0.0'),
            
            # Dados do usuário (avaliados lazily)
            auth=lambda: {
                'user': {
                    'id': request.user.id,
                    'username': request.user.username,
                    'email': request.user.email,
                    'first_name': request.user.first_name,
                    'last_name': request.user.last_name,
                    'is_staff': request.user.is_staff,
                    'is_superuser': request.user.is_superuser,
                } if request.user.is_authenticated else None,
                'is_authenticated': request.user.is_authenticated,
            },
            
            # Estatísticas (avaliadas lazily)
            stats=lambda: {
                'total_users': User.objects.count(),
                'active_users': User.objects.filter(is_active=True).count(),
            },
            
            # Flash messages (se existirem)
            flash=lambda: {
                'success': request.session.pop('success', None),
                'error': request.session.pop('error', None),
                'warning': request.session.pop('warning', None),
                'info': request.session.pop('info', None),
            },
            
            # Configurações do frontend
            config=lambda: {
                'debug': settings.DEBUG,
                'csrf_token': request.META.get('CSRF_COOKIE'),
            }
        )

        return get_response(request)
    return middleware