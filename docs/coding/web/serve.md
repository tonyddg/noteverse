## Linux操作
### 环境
ubuntu
apache2
### 网页文件位置：
/var/www/html
### php配置文件位置
/etc/php/7.2/apache/php.ini
### ubuntu apache 配置文件位置
/etc/apache2/apache2.conf
### ubuntu apache 错误日志位置
/var/log/apache2/error.log
### 安装php扩展
sudo apt-get install php-(扩展名)
并在php.ini中取消相应注释
### 重启apache
sudo systemctl restart apache2
## vim
### :q(!)
退出,后面加感叹后为强制退出(用于读取readonly文件时)
### :w
保存，与q配合
### i
插入
### /(搜索词)
搜索，回车后执行
### n
重复上次搜索
## mysql
### 开启mysql外部访问
1. 给予账户外部访问权限
2. 修改/etc/mysql/my.cnf文件中bind-address，将bind-address者注释掉
3. 开放云服务器3306端口访问限制

### error adding symbols: DSO missing from command line
在L 与 l 之间添加 -Wl,--copy-dt-needed-entries

## 配置fcgi
1. 安装fcgi库
    1. 打开fcgi官方网站并下载 https://fastcgi-archives.github.io/
    2. 解压源码
    (安装库的一般步骤)
    3. chmod +rwx ./configure (给配置程序执行权限)
    4. sudo make
    5. sudo make install (安装库到C/C++公共库中, 必须要sudo)
    6. sudo ldconfig (刷新公共库信息, 必须要sudo)
2. 配置apache
    1. 安装fcgi模块 sudo apt-get install libapache2-mod-fcgid
    2. 在 /etc/apache2/apache2.conf 中给予文件夹fcgi-bin执行的权限
    ```
    <Directory "/var/www/html/fcgi-bin">
    AllowOverride None
    # 执行CGI
    Options Indexes ExecCGI  
    Order allow,deny
    Allow from all
    </Directory>
    ```
    3. 修改fcgi关联应在 /etc/apache2/mods-enabled/fcgid.conf 中操作
    4. 重启apache
3. 测试
    1. 测试编译examples中的echo.c与echo-cpp.cpp
    2. 将编译结果移至/var/www/html/fcgi-bin, 访问/fcgi-bin/echo.fcgi
4. 编译说明
    1. 通用 生成的可执行文件必须以.fcgi结尾
    2. C 需要编译选项 -lfcgi
    3. C++ 需要编译选项 -Wl,--copy-dt-needed-entries -lfcgi++ 
    4. CMAKE 的情况w
``` cmake
add_executable(main.fcgi main.cpp)
set(CMAKE_CXX_FLAGS -Wl,--copy-dt-needed-entries)

TARGET_LINK_LIBRARIES(main.fcgi fcgi++)
```
5. 其他说明
    1. 设置 FcgidMaxRequestLen 2,097,152(2M) 调整post的大小

## 配置 mysql connector

### 安装前置
``` bash
#安装mysql的c api
sudo apt-get install libmysqlclient-dev
# 安装openssl
sudo apt-get install openssl
# 安装boost
sudo apt-get install libboost-dev
```
### 安装
    1. 下载所有libmysqlcppconn8的包 https://dev.mysql.com/downloads/connector/cpp/
    2. 下载 mysql-community-client-plugins https://ubuntu.pkgs.org/18.04/mysql-8.0-amd64/mysql-community-client-plugins_8.0.29-1ubuntu18.04_amd64.deb.html
    3. 按顺序安装包 首先mysql-community-client, 最后dev
### 使用说明
#### 使用头文件 
```` C++
#include <mysql-cppconn-8/mysql/jdbc.h>
````
#### CMAKE/g++ 编译选项
```` CMAKE
TARGET_LINK_LIBRARIES(cpp_test mysqlcppconn)
````
gcc -lmysqlcppconn(不是mysqlcppconn8)

## 多窗口 screen
## 软连接 ln