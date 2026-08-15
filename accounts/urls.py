from django.urls import path
from . import views

urlpatterns = [

    # Home
    path('', views.home, name='home'),

    # Login Selection
    path('login/', views.login_selection, name='login_selection'),

    # Login
    path('customer-login/', views.customer_login, name='customer_login'),
    path('designer-login/', views.designer_login, name='designer_login'),
    path('admin-login/', views.admin_login, name='admin_login'),

    # Registration
    path(
        'customer-register/',
        views.customer_register,
        name='customer_register'
    ),

    path(
        'designer-register/',
        views.designer_register,
        name='designer_register'
    ),

    path(
        'admin-register/',
        views.admin_register,
        name='admin_register'
    ),

    # Customer Dashboard
    path(
        'customer-dashboard/',
        views.customer_dashboard,
        name='customer_dashboard'
    ),

    # Customer Projects
path(
    'customer-projects/',
    views.customer_projects,
    name='customer_projects'
),

    # Designer Dashboard
    path(
        'designer-dashboard/',
        views.designer_dashboard,
        name='designer-dashboard'
    ),

    # Admin Dashboard
    path(
        'admin-dashboard/',
        views.admin_dashboard,
        name='admin-dashboard'
    ),

    # Designs
    path(
        'designs/<str:category>/',
        views.designs,
        name='designs'
    ),

    path(
    "customer-logout/",
    views.customer_logout,
    name="customer_logout"
),

path(
    "designer-logout/",
    views.designer_logout,
    name="designer_logout"
),

path(
    "admin-logout/",
    views.admin_logout,
    name="admin_logout"
),
]