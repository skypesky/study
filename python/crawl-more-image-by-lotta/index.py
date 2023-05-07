import requests

def download_images(urls):
    for index, url in enumerate(urls):
        print(index, url)
        download_image_to_local(url, str(index) + '.png');

def download_image_to_local(url, name):
    response = requests.get(url)
    with open(name, 'wb') as f:
        f.write(response.content)

urls = [
    "https://i.pixiv.re/img-original/img/2023/04/28/20/11/08/107601969_p0.png",
    'https://i.pixiv.re/img-original/img/2023/05/03/17/59/46/107771245_p0.png',
    'https://i.pixiv.re//img-original/img/2023/05/03/00/28/45/107751762_p0.png'
]

download_images(urls)