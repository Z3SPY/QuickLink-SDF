# Generated by Django 4.2.5 on 2023-12-01 23:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_profilepage_profile_picture'),
    ]

    operations = [
        migrations.AddField(
            model_name='profilepage',
            name='contacts',
            field=models.TextField(blank=True, null=True),
        ),
    ]
