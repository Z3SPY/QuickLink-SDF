# Generated by Django 4.2.5 on 2023-10-21 04:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='imagepost',
            name='image_picture',
            field=models.TextField(blank=True, null=True),
        ),
    ]