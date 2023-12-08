from django.contrib import admin
from .models import Document

class DocsAdmin(admin.ModelAdmin):
    list_display = ('get_user_email', 'get_user_name','get_user_role', 'created_at', 'signature' )
    # list_filter = ('get_user_email', 'get_user_first_name')
    # search_fields = ('get_user_email', 'get_user_first_name', )

    def get_user_email(self, obj):
        return obj.user.email

    def get_user_name(self, obj):
        return obj.user.name
    
    def get_user_role(self, obj):
        return obj.user.role

    get_user_email.short_description = 'Email'
    get_user_name.short_description = 'Name'
    get_user_role.short_description = 'Role'

admin.site.register(Document, DocsAdmin)