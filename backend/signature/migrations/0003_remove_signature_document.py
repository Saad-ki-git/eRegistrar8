# Generated by Django 4.2.3 on 2023-11-06 15:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('signature', '0002_signature_document'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='signature',
            name='document',
        ),
    ]
