# coding=utf-8

from channels.routing import include

__author__ = 'dragora'

channel_routing = [
    include('exif.routing.websocket_routing', path=r'^/exif/'),
]
