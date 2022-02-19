# Generated by Django 3.1.6 on 2021-02-07 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Potez',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('kol', models.IntegerField()),
                ('red', models.IntegerField()),
                ('player', models.CharField(max_length=100)),
                ('id_partije', models.UUIDField(unique=True)),
            ],
        ),
    ]
