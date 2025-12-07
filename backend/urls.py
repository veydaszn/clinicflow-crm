from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from core.views import PatientViewSet, DoctorViewSet, AppointmentViewSet

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = routers.DefaultRouter()
router.register(r'patients', PatientViewSet)
router.register(r'doctors', DoctorViewSet)
router.register(r'appointments', AppointmentViewSet)

urlpatterns = [
     # JWT Authentication
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
