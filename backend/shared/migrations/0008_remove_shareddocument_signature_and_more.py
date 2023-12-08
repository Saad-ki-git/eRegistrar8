# Generated by Django 4.2.3 on 2023-11-27 04:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('signature', '0003_remove_signature_document'),
        ('shared', '0007_shareddocument_previous_shared_document'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shareddocument',
            name='signature',
        ),
        migrations.AddField(
            model_name='shareddocument',
            name='signatures',
            field=models.ManyToManyField(blank=True, related_name='shared_documents', to='signature.signature'),
        ),
    ]
