# Generated by Django 4.2.3 on 2023-11-04 05:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_remove_user_first_login_user_signature'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='signature',
            field=models.ImageField(upload_to='signatures/'),
        ),
    ]
