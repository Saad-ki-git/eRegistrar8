# Generated by Django 4.2.3 on 2023-11-24 09:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shared', '0006_rename_recipient_email_shareddocument_recipient_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='shareddocument',
            name='previous_shared_document',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='shared.shareddocument'),
        ),
    ]
