# Generated by Django 4.2.5 on 2023-11-24 13:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_remove_comment_profile_comment_profilename'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profilepage',
            name='profile_picture',
            field=models.ImageField(blank=True, null=True, upload_to='profile/'),
        ),
    ]
