# OCCT 快速入门
参考教程 <https://mp.weixin.qq.com/s/grYeK0j23XckbnvCbny62g>

## 创建 OCCT 项目
关于 OCCT 的构建参见 
* [基础](https://zhuanlan.zhihu.com/p/536502638)
* [VTK](https://zhuanlan.zhihu.com/p/540717573) 

创建 OCCT 项目前, 需要安装 OCCT 并确定以下路径是否有效
* OCCT 包含目录 `D:\\path_to_occt\\inc`
* OCCT 静态库目录 `D:\\path_to_occt\\win64\\vc14\\libd`
* OCCT 动态库目录 `D:\\path_to_occt\\win64\\vc14\\bind`

### 测试代码
通过以下代码测试 OCCT 正确配置
```cpp
// Use Toolkit TKernel.
#include <TCollection_AsciiString.hxx>
#include<iostream>
using namespace std;

int main(int argc, char* argv[])
{
  TCollection_AsciiString asHelloWorld("Hello World!");
  TCollection_AsciiString asHelloOCC("Hello Open CASCADE!");
  cout << asHelloWorld << endl;
  cout << asHelloOCC << endl;
  return 0;
}
```

### 基于 CMake
使用 Visual Studio 创建空的 CMake 项目
* Visual Studio 中, 将整个解决方案作为一个 CMake 主项目
* 解决方案下的 VS 项目作为 CMake 子项目, 默认目标与解决方案同名
* 关于子项目设置与文件结构等可参见[笔记](../cmake.md#多层级结构)

对于主项目的 `CMakeLists.txt` (位于解决方案根目录)
* 一般不需要额外设置, 仅当需要添加子项目时, 添加 [add_subdirectory](../cmake.md#添加子项目) 命令

对于子项目的 `CMakeLists.txt` 
* 完成设置项目名, 搜索源文件, 设置包含目录等一般 CMake 项目的配置
* 分别使用 [target_include_directories 与 target_link_directories](../cmake.md#目标配置) 命令设置[包含目录与静态库目录](#创建-occt-项目), 注意使用正确的[依赖传递参数](../cmake.md#依赖传递参数)
* 对于子项目链接静态库设置
    * 关于如何确定所需的静态库参见[教程](https://mp.weixin.qq.com/s/Esws9UFDpZz6YVYqsQV-uw)
    * 一般情况下使用 [target_link_libraries](../cmake.md#目标配置) 命令设置链接的静态库
    * 在 VS 下, 也可使用预编译指令 `#pragma comment(lib, "TKernel.lib")` 达到相同的效果, 但可能不利于跨平台

关于动态链接库的处理 (参考[教程](https://blog.csdn.net/u013238941/article/details/125752851))
* 参考[笔记](../cmake.md#打开-cmake-项目), 进入项目视图
* 选择 VS 项目, 在其右键菜单选择 `添加调试配置`
* 在配置的 json 界面内, 为键 `configurations` 下的字典添加如下键值对, 即在调试时将动态链接库文件夹添加到环境变量 `PATH` 中
```json
"env": {
    "PATH": "D:\\path_to_occt\\win64\\vc14\\bind;%PATH%"
}
```

### 基于 VS
