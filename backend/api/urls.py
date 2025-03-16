from django.urls import path

from .views import search_reports, save_data, search_records, search_records_details
from .views import login_view, CustomTokenRefreshView, logout_view
from .views import get_device_names, save_device_names
from .views import get_supplier_names, save_supplier_names


urlpatterns = [
    path('reports/', search_reports, name='search_reports'),
    path('records/', search_records, name='search_records'),
    path('records/details/', search_records_details, name='search_records_details'),
    path("save_data/", save_data, name="save_data"),
    path('login/', login_view, name='login'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    # path('logout/', logout_view, name='logout'),
    path('devices/', get_device_names, name='get_devices'),
    path('devices/save/', save_device_names, name='save_devices'),
    path('suppliers/', get_supplier_names, name='get_suppliers'),
    path('suppliers/save/', save_supplier_names, name='save_suppliers'),

]

