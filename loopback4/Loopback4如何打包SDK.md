<!-- TOC -->

- [Loopback4如何打包SDK](#loopback4%E5%A6%82%E4%BD%95%E6%89%93%E5%8C%85sdk)
    - [准备工作](#%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C)
    - [启动 Loopback4 服务](#%E5%90%AF%E5%8A%A8-loopback4-%E6%9C%8D%E5%8A%A1)
    - [创建 openapi.json 文件](#%E5%88%9B%E5%BB%BA-openapijson-%E6%96%87%E4%BB%B6)
    - [构建 SDK 到文件根目录下的 sdk 文件夹](#%E6%9E%84%E5%BB%BA-sdk-%E5%88%B0%E6%96%87%E4%BB%B6%E6%A0%B9%E7%9B%AE%E5%BD%95%E4%B8%8B%E7%9A%84-sdk-%E6%96%87%E4%BB%B6%E5%A4%B9)

<!-- /TOC -->

# Loopback4如何打包SDK

## 1. 准备工作

```cmd
E:\workspace\js\loopback4\loopback4-example-todo>npm install -g ng-openapi-gen
E:\workspace\js\loopback4\loopback4-example-todo>npm install -g @angular/cli
```

> tips: ng-openapi-gen 可以帮助我们创建 openapi.json 规范文件

## 2. 启动 Loopback4 服务

```cmd
E:\workspace\js\loopback4\loopback4-example-todo>node .
```

## 3. 创建 openapi.json 文件

- 环境不支持 curl

  先访问 http://127.0.0.1:3000/openapi.json ,复制里面的文本,将复制的文本保存到 openapi.json (它处于项目的根目录,所以全路径为: E:\workspace\js\loopback4\loopback4-example-todo\openapi.json) 文件中.

- 环境支持 curl

```cmd
E:\workspace\js\loopback4\loopback4-example-todo>curl http://127.0.0.1:3000/openapi.json -o openapi.json
```

> tips: 上面的命令的作用是: 先访问 http://127.0.0.1:3000/openapi.json 获取里面的 json 文本信息,然后将 json 文本信息保存在 openapi.json 文件中.

## 4. 构建 SDK 到文件根目录下的 sdk 文件夹

```cmd
ng-openapi-gen --input openapi.json --output ./sdk
```
