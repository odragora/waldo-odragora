# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-27 10:04
from __future__ import unicode_literals

import exif.classes
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hash', models.CharField(max_length=200, unique=True)),
                ('exif', exif.classes.JSONFieldBasic()),
                ('is_fetching', models.BooleanField(default=False)),
            ],
        ),
    ]
