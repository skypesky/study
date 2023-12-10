import requests
import json

requests.packages.urllib3.disable_warnings()
n = 3


def get_url(keyword='', tag='', enableR18=1, num=20):
    url = 'https://api.lolicon.app/setu/v2?keyword={}&tag={}&num={}&r18={}'.format(
        keyword, tag, num, enableR18)

    return url


def get_images(url):

    # 存储所有图片的数据结构
    images = []

    # 访问接口，提取有效的图片数据
    text = json.loads(requests.get(url).text)
    dataArray = text['data']
    for data in dataArray:
        images.append({
            "name": "{}.{}".format(data['title'], data['ext']),
            "url": data['urls']['original'],
        })

    print(json.dumps(images, ensure_ascii=False, indent=2))
    return images


def download_image_to_local(url, name):
    response = requests.get(url,)
    with open(name, 'wb') as f:
        f.write(response.content)
        print('download image {} successfully!'.format(name))


def main():
    url = get_url('JK', '')
    print('url is {0}'.format(url))

    images = get_images(url)

    for image in images:
        download_image_to_local(image['url'], image['name'])


main()
