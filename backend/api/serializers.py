from rest_framework import serializers
from .models import Inputcream, Outputmilk, Processreport, Devices, InputcreamRecordsinfo
from .models import InputcreamRecordsinfo, DevicesRecordsinfo, OutputmilkRecordsinfo, ProcessreportRecordsinfo
from django.contrib.auth import get_user_model
from .models import Devicenamebuffer, Suppliernames

class InputCreamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inputcream
        fields = '__all__'

class InputCreamRecordsInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = InputcreamRecordsinfo
        fields = '__all__'

class OutputMilkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outputmilk
        fields = '__all__'

class OutputMilkRecordsInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutputmilkRecordsinfo
        fields = '__all__'

class ProcessReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Processreport
        fields = '__all__'

class ProcessReportRecordsInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessreportRecordsinfo
        fields = '__all__'

class DevicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Devices
        fields = '__all__'

class DevicesRecordsInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DevicesRecordsinfo
        fields = '__all__'

class DeviceNameBufferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Devicenamebuffer
        fields = '__all__'



class SupplierNamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suppliernames
        fields = '__all__'  # Include all fields (id, name)





########################################################################################################


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'firstname', 'lastname', 'role']  # ✅ Include password

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# class RegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['username', 'firstname', 'lastname', 'role', 'password']
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         user = User.objects.create_user(**validated_data)
#         if password:
#             user.set_password(password)  # Hash password properly
#             user.save()
#         return user

########################################################################################################

