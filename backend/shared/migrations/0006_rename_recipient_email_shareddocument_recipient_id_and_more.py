# Generated by Django 4.2.7 on 2023-11-19 05:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shared', '0005_rename_recipient_shareddocument_recipient_email_and_more'),
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
