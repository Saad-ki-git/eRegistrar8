# Generated by Django 4.2.7 on 2023-11-19 05:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shared', '0004_rename_recipient_id_shareddocument_recipient_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='shareddocument',
            old_name='recipient',
            new_name='recipient_email',
        ),
        migrations.RenameField(
            model_name='shareddocument',
            old_name='sender',
            new_name='sender_email',
        ),
    ]