# coding=utf-8
from channels.generic.websockets import JsonWebsocketConsumer
from django.db.models import Model
import logging
import requests
from io import BytesIO
import exifread

from .models import Image

__author__ = 'dragora'

logger = logging.getLogger(__name__)


class ExifClientConsumer(JsonWebsocketConsumer):
    """
    A consumer for communicating with a client using WebSocket
    """

    channel_session = True

    def send_result(self, data):
        self.send({'status': 'ok', 'data': data})

    def send_error(self, error):
        self.send({'status': 'error', 'error': error})

    def receive(self, content, **kwargs):
        logger.debug('WS: received content: {}'.format(content))

        image, created = Image.objects.get_or_create(hash=content['hash'])
        if not created:
            exif = image.exif
            if content['key']:
                try:
                    result = exif[content['key']]
                    self.send_result({content['key']: result})
                except KeyError:
                    self.send_error('Key not exists')
            else:
                self.send_result(image.exif)
        else:
            image.is_fetching = True
            image.save()

            self.process_image(content['hash'], content['key'])

    def process_image(self, image_hash, key):
        response = requests.get('http://s3.amazonaws.com/waldo-recruiting/{}.jpg'.format(image_hash))
        if response.status_code == 200:
            tags = exifread.process_file(BytesIO(response.content), details=False)

            logger.debug('WS: got EXIF data:')
            logger.debug('{0} value: {1}'.format(key, val) for key, val in tags.items())

            result = dict([(key, val.printable,) for key, val in tags.items()])
            logger.debug('Result: {}'.format(result))
            if key:
                self.send_result({key: result[key]})
            else:
                self.send_result(result)

            image, created = Image.objects.get_or_create(hash=image_hash)
            image.exif = result
            image.is_fetching = False
            image.save()
        else:
            self.send_error(response.status_code)
            try:
                image = Image.objects.get(hash=image_hash)
                image.delete()
            except Model.DoesNotExist:
                pass
