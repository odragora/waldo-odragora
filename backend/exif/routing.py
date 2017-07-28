# coding=utf-8

from channels.routing import route
from . import consumers

__author__ = 'dragora'

websocket_routing = [
    consumers.ExifClientConsumer.as_route(),
]
