# Generated by Django 4.2.5 on 2023-10-24 12:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_imagepost_userauth'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='imagepost',
            name='userAuth',
        ),
        migrations.AddField(
            model_name='profilepage',
            name='userAuth',
            field=models.TextField(blank=True, null=True),
        ),
    ]
