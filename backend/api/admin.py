# from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin
# from .models import CustomUser

# # Custom actions for enabling, disabling, and deleting users
# def activate_users(modeladmin, request, queryset):
#     queryset.update(is_active=True)
# activate_users.short_description = "Activate selected users"

# def deactivate_users(modeladmin, request, queryset):
#     queryset.update(is_active=False)
# deactivate_users.short_description = "Deactivate selected users"

# def delete_users(modeladmin, request, queryset):
#     queryset.delete()
# delete_users.short_description = "Delete selected users"

# # Register CustomUser with Django Admin
# @admin.register(CustomUser)
# class CustomUserAdmin(admin.ModelAdmin):
#     list_display = ('id', 'username', 'first_name', 'last_name', 'role', 'is_staff', 'is_active')
#     list_filter = ('role', 'is_staff', 'is_active')
#     search_fields = ('username', 'first_name', 'last_name')
#     ordering = ('id',)

#     fieldsets = (
#         (None, {'fields': ('username', 'password')}),
#         ('Personal Info', {'fields': ('first_name', 'last_name', 'role')}),
#         ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
#         ('Important Dates', {'fields': ('last_login',)}),
#     )

#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('username', 'first_name', 'last_name', 'role', 'password1', 'password2'),
#         }),
#     )

#     actions = [delete_users]  # Only allow "Remove"
    
#     # Override permission methods
#     def has_add_permission(self, request):
#         return True  # Allow creation

#     def has_change_permission(self, request, obj=None):
#         return True  # Allow modification

#     def has_delete_permission(self, request, obj=None):
#         return True  # Allow removal

#     def has_view_permission(self, request, obj=None):
#         return True  # Optional, allow viewing

