#!bin/sh

echo "install docker ing..."
# install docker
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
# enable docker
systemctl enable docker
echo "install docker successfully!"
