# coding=utf-8

from django.contrib.postgres.fields import JSONField

__author__ = 'dragora'


class JSONFieldBasic(JSONField):

    def db_type(self, connection):
        return 'json'
