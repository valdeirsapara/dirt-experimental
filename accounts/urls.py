from django.urls import path
from . import views
urlpatterns = [
    path('login/', views.login_view, name='login'),
    # path('logout/', views.logout_view, name='logout'),
    # path('register/', views.register_view, name='register'),
    # path('profile/', views.profile_view, name='profile'),
    # path('password-change/', views.password_change_view, name='password_change'),
    # path('password-reset/', views.password_reset_view, name='password_reset'),
]