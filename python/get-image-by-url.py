import requests
from PIL import Image
from io import BytesIO

image_url = 'https://upload-bbs.mihoyo.com/upload/2021/04/25/81998920/68b0a1696e9b76c729038326b7fa0edb_1011430618143880863.jpg?x-oss-process=image/resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,jpg'

response = requests.get(image_url)

image = Image.open(BytesIO(response.content))

image.save("./get-image-by-url.jpg")
