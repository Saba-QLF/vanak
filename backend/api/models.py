
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin



class Devicenamebuffer(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=255)

    class Meta:
        managed = False
        db_table = 'devicenamebuffer'


class Devices(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    batchid = models.IntegerField(db_column='BatchID', blank=True, null=True)  # Field name made lowercase.
    testdevice = models.CharField(db_column='TestDevice', max_length=255, blank=True, null=True)  # Field name made lowercase.
    samplename = models.CharField(db_column='SampleName', max_length=255, blank=True, null=True)  # Field name made lowercase.
    sampleweight = models.IntegerField(db_column='SampleWeight', blank=True, null=True)  # Field name made lowercase.
    coliformcount = models.CharField(db_column='ColiformCount', max_length=255, blank=True, null=True)  # Field name made lowercase.
    ecolicount = models.CharField(db_column='EColiCount', max_length=255, blank=True, null=True)  # Field name made lowercase.
    moldyeastcount = models.CharField(db_column='MoldYeastCount', max_length=255, blank=True, null=True)  # Field name made lowercase.
    coldcount = models.CharField(db_column='ColdCount', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'devices'


class DevicesRecordsinfo(models.Model):
    batchid = models.AutoField(db_column='BatchID', primary_key=True)  # Field name made lowercase.
    fullname = models.CharField(db_column='FullName', max_length=255, blank=True, null=True)  # Field name made lowercase.
    date = models.CharField(db_column='Date', max_length=10, blank=True, null=True)  # Field name made lowercase.
    gdate = models.DateField(db_column='GDate', null=True, blank=True)  # Gregorian Date (New Column)
    countperbatch = models.IntegerField(db_column='CountPerBatch', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'devices_recordsinfo'





class Inputcream(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    batchid = models.IntegerField(db_column='BatchID', blank=True, null=True)  # Field name made lowercase.
    supplier = models.CharField(db_column='Supplier', max_length=255)  # Field name made lowercase.
    ph = models.FloatField(db_column='PH', blank=True, null=True)  # Field name made lowercase.
    acid = models.FloatField(db_column='Acid', blank=True, null=True)  # Field name made lowercase.
    fat = models.FloatField(db_column='Fat', blank=True, null=True)  # Field name made lowercase.
    snf = models.FloatField(db_column='SNF', blank=True, null=True)  # Field name made lowercase.
    weight = models.FloatField(db_column='Weight')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'inputcream'


class InputcreamRecordsinfo(models.Model):
    batchid = models.AutoField(db_column='BatchID', primary_key=True)  # Field name made lowercase.
    fullname = models.CharField(db_column='FullName', max_length=255, blank=True, null=True)  # Field name made lowercase.
    date = models.CharField(db_column='Date', max_length=10, blank=True, null=True)  # Field name made lowercase.
    gdate = models.DateField(db_column='GDate', null=True, blank=True)  # Gregorian Date (New Column)
    countperbatch = models.IntegerField(db_column='CountPerBatch', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'inputcream_recordsinfo'


class Outputmilk(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    batchid = models.IntegerField(db_column='BatchID')  # Field name made lowercase.
    supplier = models.CharField(db_column='Supplier', max_length=255)  # Field name made lowercase.
    ph = models.FloatField(db_column='PH', blank=True, null=True)  # Field name made lowercase.
    acid = models.FloatField(db_column='Acid', blank=True, null=True)  # Field name made lowercase.
    fat = models.FloatField(db_column='Fat', blank=True, null=True)  # Field name made lowercase.
    snf = models.FloatField(db_column='SNF', blank=True, null=True)  # Field name made lowercase.
    weight = models.FloatField(db_column='Weight')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'outputmilk'


class OutputmilkRecordsinfo(models.Model):
    batchid = models.AutoField(db_column='BatchID', primary_key=True)  # Field name made lowercase.
    fullname = models.CharField(db_column='FullName', max_length=255, blank=True, null=True)  # Field name made lowercase.
    date = models.CharField(db_column='Date', max_length=10, blank=True, null=True)  # Field name made lowercase.
    gdate = models.DateField(db_column='GDate', null=True, blank=True)  # Gregorian Date (New Column)
    countperbatch = models.IntegerField(db_column='CountPerBatch', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'outputmilk_recordsinfo'


class Processreport(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    batchid = models.IntegerField(db_column='BatchID')  # Field name made lowercase.
    color = models.CharField(db_column='Color', max_length=50, blank=True, null=True)  # Field name made lowercase.
    palletnumber = models.IntegerField(db_column='PalletNumber', blank=True, null=True)  # Field name made lowercase.
    supplier = models.CharField(db_column='Supplier', max_length=255, blank=True, null=True)  # Field name made lowercase.
    fatbutter = models.FloatField(db_column='FatButter', blank=True, null=True)  # Field name made lowercase.
    tanknumber = models.IntegerField(db_column='TankNumber', blank=True, null=True)  # Field name made lowercase.
    acidbutter = models.FloatField(db_column='AcidButter', blank=True, null=True)  # Field name made lowercase.
    snfbuttermilk = models.FloatField(db_column='SNFButtermilk', blank=True, null=True)  # Field name made lowercase.
    fatbuttermilk = models.FloatField(db_column='FatButtermilk', blank=True, null=True)  # Field name made lowercase.
    acidbuttermilk = models.FloatField(db_column='AcidButtermilk', blank=True, null=True)  # Field name made lowercase.
    phbuttermilk = models.FloatField(db_column='PHButtermilk', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'processreport'


class ProcessreportRecordsinfo(models.Model):
    batchid = models.AutoField(db_column='BatchID', primary_key=True)  # Field name made lowercase.
    fullname = models.CharField(db_column='FullName', max_length=255, blank=True, null=True)  # Field name made lowercase.
    date = models.CharField(db_column='Date', max_length=10, blank=True, null=True)  # Field name made lowercase.
    gdate = models.DateField(db_column='GDate', null=True, blank=True)  # Gregorian Date (New Column)
    countperbatch = models.IntegerField(db_column='CountPerBatch', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'processreport_recordsinfo'


class Suppliernames(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=255)
    code = models.CharField(unique=True, max_length=255)

    class Meta:
        managed = False
        db_table = 'suppliernames'


class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError("The Username field is required")
        user = self.model(username=username, **extra_fields)
        user.set_password(password)  # Hash the password before saving
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_staff", True)
        return self.create_user(username, password, **extra_fields)
    

class Users(AbstractBaseUser, PermissionsMixin):
    firstname = models.CharField(db_column='FirstName', max_length=225)  # Field name made lowercase.
    lastname = models.CharField(db_column='LastName', max_length=225)  # Field name made lowercase.
    username = models.CharField(db_column='UserName', primary_key=True, unique=True, max_length=225)  # Field name made lowercase.
    password = models.CharField(db_column='Password', max_length=255)  # Field name made lowercase.
    role = models.CharField(db_column='Role', max_length=18)  # Field name made lowercase.
    
    is_active = models.IntegerField()
    is_staff = models.IntegerField()
    is_superuser = models.IntegerField()
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []


    class Meta:
        db_table = 'users'

    def save(self, *args, **kwargs):
        if not self.password.startswith('pbkdf2_'):
            self.set_password(self.password)  # Hash the password
        super().save(*args, **kwargs)  # 👈 Actually save the user in the database

