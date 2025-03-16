
from django.http import JsonResponse

def test_api(request):
    return JsonResponse({"message": "Django is connected to React!"})



from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Inputcream, Outputmilk, Processreport, Devices
from .serializers import InputCreamSerializer, OutputMilkSerializer, ProcessReportSerializer, DevicesSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.tokens import OutstandingToken,  BlacklistedToken
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import Devicenamebuffer, Suppliernames
from .serializers import DeviceNameBufferSerializer, SupplierNamesSerializer
from django.db import connection

from .models import InputcreamRecordsinfo, DevicesRecordsinfo, OutputmilkRecordsinfo, ProcessreportRecordsinfo
from .serializers import InputCreamRecordsInfoSerializer, OutputMilkRecordsInfoSerializer, ProcessReportRecordsInfoSerializer, DevicesRecordsInfoSerializer


from django.db.models import F
from django.db.models.functions import Cast
from django.db.models import DateField


from persiantools.jdatetime import JalaliDate
from django.utils.timezone import now



########################################### Lab Supervisor ###########################################

@api_view(['GET'])
def search_reports(request):
    table_type = request.GET.get('tableType')  # Get table type from dropdown
    date = request.GET.get('date')  # Get date from input field (optional)

    if not table_type:
        return Response({"error": "Table type is required"}, status=400)
    
    if not date:
        return Response({"error": "Date is required"}, status=400)

    # Find Batch IDs from the recordsinfo table
    batch_ids = []
    
    if table_type == "InputCream":
        batch_ids = InputcreamRecordsinfo.objects.filter(date=date).values_list('batchid', flat=True)
        queryset = Inputcream.objects.filter(batchid__in=batch_ids)

    elif table_type == "Outputmilk":
        batch_ids = OutputmilkRecordsinfo.objects.filter(date=date).values_list('batchid', flat=True)
        queryset = Outputmilk.objects.filter(batchid__in=batch_ids)

    elif table_type == "ProcessReport":
        batch_ids = ProcessreportRecordsinfo.objects.filter(date=date).values_list('batchid', flat=True)
        queryset = Processreport.objects.filter(batchid__in=batch_ids)

    elif table_type == "Devices":
        batch_ids = DevicesRecordsinfo.objects.filter(date=date).values_list('batchid', flat=True)
        queryset = Devices.objects.filter(batchid__in=batch_ids)

    else:
        return Response({"error": "Invalid table type"}, status=400)

    # Serialize and return data
    if table_type == "InputCream":
        serializer = InputCreamSerializer(queryset, many=True)
    elif table_type == "Outputmilk":
        serializer = OutputMilkSerializer(queryset, many=True)
    elif table_type == "ProcessReport":
        serializer = ProcessReportSerializer(queryset, many=True)
    elif table_type == "Devices":
        serializer = DevicesSerializer(queryset, many=True)

    return Response(serializer.data)




# @api_view(['GET'])
# def search_records(request):
#     table_type = request.GET.get('tableType')  # Table type selection
#     # start_date = request.GET.get('fromDate')  # Start date for range
#     # end_date = request.GET.get('toDate')  # End date for range

#     if not table_type:
#         return Response({"error": "Table type is required"}, status=400)

#     # Step 1: First return data from the recordsinfo table
#     if table_type == "InputCream":
#         records_info = InputcreamRecordsinfo.objects.all()
#         # if start_date and end_date:
#         #     records_info = records_info.filter(date__range=[start_date, end_date])
#         serializer = InputCreamRecordsInfoSerializer(records_info, many=True)

#     elif table_type == "Outputmilk":
#         records_info = OutputmilkRecordsinfo.objects.all()
#         # if start_date and end_date:
#         #     records_info = records_info.filter(date__range=[start_date, end_date])
#         serializer = OutputMilkRecordsInfoSerializer(records_info, many=True)

#     elif table_type == "ProcessReport":
#         records_info = ProcessreportRecordsinfo.objects.all()
#         # if start_date and end_date:
#         #     records_info = records_info.filter(date__range=[start_date, end_date])
#         serializer = ProcessReportRecordsInfoSerializer(records_info, many=True)

#     elif table_type == "Devices":
#         records_info = DevicesRecordsinfo.objects.all()
#         # if start_date and end_date:
#         #     records_info = records_info.filter(date__range=[start_date, end_date])
#         serializer = DevicesRecordsInfoSerializer(records_info, many=True)

#     else:
#         return Response({"error": "Invalid table type"}, status=400)

#     print(serializer.data)
#     return Response(serializer.data)  # Return summary data only



@api_view(['GET'])
def search_records(request):
    table_type = request.GET.get('tableType')  # Table type selection
    start_date_persian = request.GET.get('fromDate')  # Persian Start Date
    end_date_persian = request.GET.get('toDate')  # Persian End Date

    if not table_type:
        return Response({"error": "Table type is required"}, status=400)

    # **Find the correct table**
    model_map = {
        "Devices": (DevicesRecordsinfo, DevicesRecordsInfoSerializer),
        "InputCream": (InputcreamRecordsinfo, InputCreamRecordsInfoSerializer),
        "Outputmilk": (OutputmilkRecordsinfo, OutputMilkRecordsInfoSerializer),
        "ProcessReport": (ProcessreportRecordsinfo, ProcessReportRecordsInfoSerializer),
    }

    if table_type not in model_map:
        return Response({"error": "Invalid table type"}, status=400)

    ModelClass, SerializerClass = model_map[table_type]

    try:
        # **Step 1: Find the earliest available gdate in the table**
        earliest_record = ModelClass.objects.all().order_by('gdate').first()
        earliest_gdate = earliest_record.gdate if earliest_record else now().date()  # If no records, use today

        # **Step 2: Convert and handle missing dates**
        if not start_date_persian and not end_date_persian:
            # If both are missing → From earliest date to today
            start_date_gregorian = earliest_gdate
            end_date_gregorian = now().date()

        elif not start_date_persian:
            # If `fromDate` is missing → Use the earliest available date
            start_date_gregorian = earliest_gdate
            end_year, end_month, end_day = map(int, end_date_persian.split('/'))
            end_date_gregorian = JalaliDate(end_year, end_month, end_day).to_gregorian()

        elif not end_date_persian:
            # If `toDate` is missing → Use today's date
            start_year, start_month, start_day = map(int, start_date_persian.split('/'))
            start_date_gregorian = JalaliDate(start_year, start_month, start_day).to_gregorian()
            end_date_gregorian = now().date()

        else:
            # Both dates provided → Convert both normally
            start_year, start_month, start_day = map(int, start_date_persian.split('/'))
            end_year, end_month, end_day = map(int, end_date_persian.split('/'))
            start_date_gregorian = JalaliDate(start_year, start_month, start_day).to_gregorian()
            end_date_gregorian = JalaliDate(end_year, end_month, end_day).to_gregorian()

    except ValueError:
        return Response({"error": "Invalid date format. Use YYYY/MM/DD"}, status=400)

    except ModelClass.DoesNotExist:
        return Response({"error": "No records available in the database"}, status=400)

    # **Step 3: Filter the Data**
    records_info = ModelClass.objects.filter(gdate__range=[start_date_gregorian, end_date_gregorian])

    # **Serialize and return data**
    serializer = SerializerClass(records_info, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def search_records_details(request):
    table_type = request.GET.get('tableType')  # Get table type from request
    batch_id = request.GET.get('batchid')  # Get batch ID from request

    if not table_type:
        return Response({"error": "Table type is required"}, status=400)

    if not batch_id:
        return Response({"error": "Batch ID is required"}, status=400)

    try:
        batch_id = int(batch_id)  # Ensure batch ID is an integer
    except ValueError:
        return Response({"error": "Batch ID must be an integer"}, status=400)

    # Query the corresponding table based on table type
    if table_type == "InputCream":
        queryset = Inputcream.objects.filter(batchid=batch_id)
        serializer = InputCreamSerializer(queryset, many=True)

    elif table_type == "Outputmilk":
        queryset = Outputmilk.objects.filter(batchid=batch_id)
        serializer = OutputMilkSerializer(queryset, many=True)

    elif table_type == "ProcessReport":
        queryset = Processreport.objects.filter(batchid=batch_id)
        serializer = ProcessReportSerializer(queryset, many=True)

    elif table_type == "Devices":
        queryset = Devices.objects.filter(batchid=batch_id)
        serializer = DevicesSerializer(queryset, many=True)

    else:
        return Response({"error": "Invalid table type"}, status=400)

    return Response(serializer.data)


@api_view(['POST'])
def save_data(request):
    table_type = request.data.get("tableType")
    date = request.data.get("date")
    data = request.data.get("data")
    full_name = request.data.get("full_name")
    

    if not table_type or not date or not data:
        return Response({"error": "Missing required fields"}, status=400)
    

    try:
        # **Convert Persian date to Gregorian**
        year, month, day = map(int, date.split('/'))
        gdate = JalaliDate(year, month, day).to_gregorian()
    except ValueError:
        return Response({"error": "Invalid Persian date format. Use YYYY/MM/DD"}, status=400)



    # Extract metadata from request
    count_per_batch = len(data)  # Number of new records

    # Step 1: Insert a new row in ProcessReportRecordsInfo
    if table_type == "ProcessReport":
        records_info = ProcessreportRecordsinfo.objects.create(
            fullname=full_name,
            date=date,
            gdate=gdate,
            countperbatch=count_per_batch
        )
        batch_id = records_info.batchid  # Retrieve the newly generated BatchID

    elif table_type == "OutputMilk":
        records_info = OutputmilkRecordsinfo.objects.create(
            fullname=full_name,
            date=date,
            gdate=gdate,
            countperbatch=count_per_batch
        )
        batch_id = records_info.batchid

    elif table_type == "InputCream":
        records_info = InputcreamRecordsinfo.objects.create(
            fullname=full_name,
            date=date,
            gdate=gdate,
            countperbatch=count_per_batch
        )
        batch_id = records_info.batchid

    elif table_type == "Devices":
        records_info = DevicesRecordsinfo.objects.create(
            fullname=full_name,
            date=date,
            gdate=gdate,
            countperbatch=count_per_batch
        )
        batch_id = records_info.batchid

    else:
        return Response({"error": "Invalid table type"}, status=400)

    # Step 2: Insert all records with the assigned BatchID
    for row in data:
        #row["date"] = date  # Ensure the date is saved
        row["batchid"] = batch_id  # Assign the new BatchID

        # Select the correct serializer based on table type
        if table_type == "ProcessReport":
            serializer = ProcessReportSerializer(data=row)
        elif table_type == "OutputMilk":
            serializer = OutputMilkSerializer(data=row)
        elif table_type == "InputCream":
            serializer = InputCreamSerializer(data=row)
        elif table_type == "Devices":
            serializer = DevicesSerializer(data=row)
        else:
            return Response({"error": "Invalid table type"}, status=400)

        # Save data if valid
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=400)

    return Response({"message": f"{count_per_batch} records saved successfully under Batch ID {batch_id}"}, status=201)



#######################################################################################################


@api_view(['GET'])
def get_device_names(request):
    """Fetch all temporary device names."""
    devices = Devicenamebuffer.objects.all()
    serializer = DeviceNameBufferSerializer(devices, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def save_device_names(request):
    """
    Receives the full list of devices and replaces the database content.
    """
    try:
        # ✅ Clear existing devices (resets database to match frontend)
        Devicenamebuffer.objects.all().delete()

         # ✅ Reset auto-increment counter
        with connection.cursor() as cursor:
            cursor.execute("ALTER TABLE DeviceNameBuffer AUTO_INCREMENT = 1;")
        
        # ✅ Insert new devices from the request
        serializer = DeviceNameBufferSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Devices updated successfully!"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    




@api_view(['GET'])
def get_supplier_names(request):
    """Fetch all temporary device names."""
    suppliers = Suppliernames.objects.all()
    serializer = SupplierNamesSerializer(suppliers, many=True)
    return Response(serializer.data)



@api_view(['POST'])
def save_supplier_names(request):
    """
    Receives the full list of devices and replaces the database content.
    """
    try:
        # ✅ Clear existing devices (resets database to match frontend)
        Suppliernames.objects.all().delete()
        
         # ✅ Reset auto-increment counter
        with connection.cursor() as cursor:
            cursor.execute("ALTER TABLE SupplierNames AUTO_INCREMENT = 1;")


        # ✅ Insert new devices from the request
        serializer = SupplierNamesSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Devices updated successfully!"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




########################################### Login ###########################################
User = get_user_model()  # Ensure the custom user model is correctly referenced


@api_view(['POST'])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    try:
        user = User.objects.get(username=username)

        if check_password(password, user.password):  # Validate hashed password
            refresh = RefreshToken.for_user(user)
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "role": user.role,
                "firstname": user.firstname,
                "lastname": user.lastname,
                "redirect": "/home"
            })
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    except User.DoesNotExist:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)




class CustomTokenRefreshView(TokenRefreshView):
    pass



@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Ensures only authenticated users can log out
def logout_view(request):
    try:
        refresh_token = request.data.get("refresh")  # Get the refresh token from the request
        token = OutstandingToken.objects.get(token=refresh_token)
        BlacklistedToken.objects.create(token=token)  # Blacklist the token
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
    except OutstandingToken.DoesNotExist:
        return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)