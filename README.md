# now-upload

这是一个简单的文件上传托管服务。

![app.png](./docs/assets/app.png)

## Quick Start

1. 启动容器，开放 3000 端口，挂载 `/app/server/html/resources` 目录
2. 浏览器访问 `http://SERVER_HOST:3000`
3. 点击上传按钮后可立即上传文件，并获得下载链接
4. 点击`SHOW DEMO CODE`查看前端对接代码 demo
5. 更多信息请前往 [[GITHUB] yuri2peter/now-upload](https://github.com/yuri2peter/now-upload)

## Docker Compose Example

```yml
# docker-compose.yml
version: "3.8"
services:
  now-upload:
    image: "yuri2/now-upload:v2"
    environment:
      - MAX_FILE_SIZE=100
    restart: unless-stopped
    volumes:
      - ./volumes/resources:/app/server/html/resources
    ports:
      - 3000:3000
```

- `MAX_FILE_SIZE` 用于配置上传文件的大小上限，单位 MB，默认 100MB。
- `/app/server/html/resources` 为容器内的文件存储位置，建议挂载

## 局限性

为了整个应用简洁性，当前版本没有对上传、下载行为作任何限制，如果被恶意使用，可能会导致：

- 上传文件过多占用磁盘空间
- 下载次数过多占用服务器带宽
- 上传非法文件

可能的解决方案：

- 修改服务端源码，加入行为限制
- 仅将该项目应用于不必考虑用户恶意行为的项目中

## 版本记录

- v2. 文件名改为原始名+随机文件名；上传文件的大小上限改为可配置
- v1. 实现预期功能
