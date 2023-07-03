# Docker
## Docker 核心工作流程
1. 定制 Dockerfile, 确定环境, 系统, 依赖
2. 使用 docker build, 根据 Dockerfile 生成镜像(Image)
3. 使用 docker run 运行镜像, 让 docker 引擎为分配容器
4. 使用 docker push 推送镜像到 docker hub
5. 使用 docker pull 拉取 docker hub 上的镜像

## 定制镜像
### Docker File
文件名为 Dockerfile, 以文本形式编辑
### FROM
FROM [基础镜像]
引用 docker hub 上的基础镜像

### WORKDIR
WORKDIR [目录]
指定容器中的目录(相当于在容器中使用 cd)

### COPY
COPY [本机文件] [容器地址]
将本地文件复制到容器里
COPY . [容器地址]
复制所有本地文件, 使用 .dockerignore 排除

### RUN
RUN [指令]
在容器里运行指令

### dockerignore
在本地根目录创建 .dockerignore 可以指定排除的本地文件
通常必须要忽略 .dockerignore, Dockerfile, .git, .gitignore

### EXPOSE
EXPOSE [端口号]
暴露容器的端口号

### CMD
CMD ["[命令部分1]","[命令部分2]", ...]
启动容器时运行脚本
此处命令部分为按空格划分命令
如 npm run dev 变为 ["npm","run","dev"]

## docker 命令

### docker build
docker build (-t) [目录]
寻找目录下的 Dockerfile, 创建镜像
* -t [镜像名]
指定镜像名

### docker images
docker images
查看所有镜像

### docker tag
docker tag [镜像ID] [镜像名]
给镜像命名
镜像名格式 [用户名]/[镜像名]:vx.x

### docker login
登录 docker hub

### docker rmi
docker rmi (-f) [镜像ID/镜像名称]
删除镜像
* -f
强制删除正在运行的镜像
* 镜像ID 可以只输入前 3 个字符

### docker run
docker run (-d/p/v/name) [镜像名]
在容器中运行镜像
* -d
后台运行镜像
* -p
[主机端口]:[容器端口] 映射容器端口 
* --name [容器名]
指定容器名称
* -v [本地路径]:[容器路径]\(:ro\) (-v)
将本地路径与容器路径同步, 本地文件修改后将同步到容器里
    * :ro
    使本地变为只读, 容器的变化不会同步到本地
    * -v [本地路径]
    再次使用 -v 表示同步目录下不进行同步的文件
    * 一般使用绝对路径

### docker ps
docker ps (-a)
查看正在运行的容器
* -a
查看所有容器, 包括暂停运行的容器

### docker stop
docker stop [容器ID]
暂停容器

### docker rm
docker rmi (-f/v) [容器ID/容器名称]
删除容器
* -f
强制删除正在运行的容器
* -v
删除容器中的绑定, 如果容器使用了 -v, 则删除时也要有 -v 选项

### docker exec
docker exec (-i/t) [容器名] [脚本解释器]
进入容器
* docker exec -it [容器名] /bin/sh
使用 bash 的方式进入容器, 使用 exit 即可退出

## docker-compose
通过在镜像根目录下的 docker-compose.yml 快速构建容器
```yaml
version: "3.8"
services:
    [容器名]:
        build: .
        ports:
            - "3000:3000"
        volume:
            - ./:/path:ro
            - ./xxx
```

1. build
即 docker build 命令
2. ports
即 docker run -p 命令
3. volume
即 docker run -v 命令

### docker-compose up (-d/build)
运行 docker-compose 自动构建镜像, 创建容器
* -d
后台运行容器
* --build
重新启动容器, 如果修改后再次启动, 需要有此选项

### docker-compose down (-v)
清除 docker-compose 删除创建的镜像与容器
* -v
清除绑定, 如果使用了 volume, 则要由此选项

