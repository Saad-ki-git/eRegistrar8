# Generated by Django 4.2.6 on 2023-11-18 06:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shared', '0002_rename_sender_shareddocument_sender_email'),
    ]

    operations = [
        migrations.RenameField(
            model_name='shareddocument',
            old_name='recipient_email',
            new_name='recipient_id',
        ),
        migrations.RenameField(
            model_name='shareddocument',
            old_name='sender_email',
            new_name='sender_id',
        ),
    ]
