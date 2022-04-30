#!bin/sh

echo "install harbor ing..."

# install docker
yum install -y docker
# install docker-compose
curl -L "https://get.daocloud.io/docker/compose/releases/download/1.29.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# add permission
chmod +x /usr/local/bin/docker-compose
# install goharbor/prepare
docker pull goharbor/prepare:v2.2.1

# download harbor install package
wget https://github.com/goharbor/harbor/releases/download/v2.2.1/harbor-online-installer-v2.2.1.tgz

tar -zxf harbor-online-installer-v2.2.1.tgz

cd harbor

# pause: vim harbor.yml
# 修改 hostname
# 注释 https

# pause ./install.sh

# 配置 docker-compose.yml
# 可以修改 harbor 的端口,需要重新执行 ./install.sh
# see: https://www.tracymc.cn/archives/1371
# see: https://www.cnblogs.com/hanxiaohui/p/9257855.html

# 启动 harbor
docker-compose start
# 停止 harbor
docker-compose stop


echo "install harbor successfully!"