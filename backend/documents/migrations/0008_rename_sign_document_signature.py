# Generated by Django 4.2.3 on 2023-11-06 16:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0007_document_sign'),
    ]

    operations = [
        migrations.RenameField(
            model_name='document',
            old_name='sign',
            new_name='signature',
        ),
    ]