# Generated by Django 4.2.5 on 2023-10-19 14:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_imagepost_image_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imagepost',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.profilepage'),
        ),
    ]