# STM32 CMake 项目配置

> 参考文档  
> <https://zhuanlan.zhihu.com/p/642899924>  
> <https://zhuanlan.zhihu.com/p/661281743>

## 必要工具链
1. gcc-arm-none-eabi
1. OpenOCD
1. VScode 插件 Cmake Tools
1. Vscode 插件 Cortex-Debug

## 初始操作
通过 CubeMX 生成一个新的 STM32 项目

## CMakeLists 配置
### 基本路径配置
将这些基本配置置于文件 `config.cmake` 中

```cmake
# 设置 arm-none-eabi 工具链地址
set(TOOLCHAIN_PATH D:/code_env/gcc-arm-none-eabi-10.3-2021.10/bin)

# OpenOCD 路径
set(OpenOCDPath "D:\\code\\star\\res\\openocd 0.12.0-rc2\\bin\\openocd.exe")
# 烧录器配置路径
set(OpenOCPInterface "D:\\code\\star\\res\\openocd 0.12.0-rc2\\share\\openocd\\scripts\\interface\\cmsis-dap.cfg")
# 目标芯片路径
set(OpenOCPTarget "D:\\code\\star\\res\\openocd 0.12.0-rc2\\share\\openocd\\scripts\\target\\stm32f1x.cfg")

# cube 自动生成的 .ld 链接脚本 
set(LINK_SCRIPT ${CMAKE_SOURCE_DIR}/STM32F103C8Tx_FLASH.ld) 

# -mcpu= 根据芯片特点设置 (可参考自动生成的 Makefile 中的 CPU 与 MCU 配置)
# -mfloat-abi=hard -mfpu=fpv4-sp-d16 用于开启浮点计算单元 FPU 的芯片 (通常为 stm32f4xx, 可参考自动生成的 Makefile 中的 FPU 配置)
set(MPU_FLAG "-mcpu=cortex-m3 -mthumb")

# 预定义宏 (可参考自动生成的 Makefile 中的 C_DEFS 配置)
add_definitions(
    -DUSE_HAL_DRIVER
    -DSTM32F103xB
    )
```

### 工具链基本配置
```cmake
# 引入基本配置
include(config.cmake)

# 指定编译平台/架构与语言标准, 推荐指定 Ninja 为构建工具,可以加快编译速度(相比make)
set(CMAKE_SYSTEM_NAME Generic)
set(CMAKE_SYSTEM_PROCESSOR arm)
set(CMAKE_TRY_COMPILE_TARGET_TYPE STATIC_LIBRARY)

# 指定工具链
set(CMAKE_C_COMPILER_FORCED TRUE) # skip compiler test
set(CMAKE_CXX_COMPILER_FORCED TRUE)

set(CMAKE_C_COMPILER ${TOOLCHAIN_PATH}/arm-none-eabi-gcc.exe)
set(CMAKE_CXX_COMPILER ${TOOLCHAIN_PATH}/arm-none-eabi-g++.exe)
set(CMAKE_ASM_COMPILER ${TOOLCHAIN_PATH}/arm-none-eabi-gcc.exe)
set(CMAKE_LINKER ${TOOLCHAIN_PATH}/arm-none-eabi-ld.exe) # 根据知乎介绍补充

set(CMAKE_OBJCOPY ${TOOLCHAIN_PATH}/arm-none-eabi-objcopy.exe)
set(CMAKE_OBJDUMP ${TOOLCHAIN_PATH}/arm-none-eabi-objdump.exe)
set(SIZE ${TOOLCHAIN_PATH}/arm-none-eabi-size.exe) 
set(CMAKE_AR ${TOOLCHAIN_PATH}/arm-none-eabi-ar.exe)

# 设置特定的编译和链接标志

set(CMAKE_C_FLAGS ${MPU_FLAG})
set(CMAKE_CXX_FLAGS ${MPU_FLAG})
set(CMAKE_EXE_LINKER_FLAGS -T${LINK_SCRIPT})
```

### 项目配置
```cmake
# 项目配置
cmake_minimum_required(VERSION 3.22)

# 填入项目名称
project(... C CXX ASM) 

# 标准设置
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_C_STANDARD 11)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON) 

# 编译选项, 参考可 arm-none-eabi-gcc 的参数文档
add_compile_options(-pipe -Wall -Werror -fmessage-length=0 # basic options
                    -ffunction-sections -fdata-sections -fno-common # optimize options 
                    )

add_link_options(-pipe # 加速编译执行
                -lc -lstdc++ -lm -lnosys # lib options
                -flto -specs=nosys.specs # optimize options
                -specs=nano.specs -Wl,-Map=${PROJECT_BINARY_DIR}/${PROJECT_NAME}.map -Wl,--cref -Wl,--gc-sections # 来自自动生成的 MakeFile
                -Wl,--print-memory-usage # 打印内存使用
                ) # if your executable is too large , try option '-s' to strip symbols
```

### 生成与链接配置
```cmake
# 配置汇编文件
set(ASM_SOURCES startup_stm32f103xb.s)
set_source_files_properties(${ASM_SOURCES} PROPERTIES COMPILE_FLAGS "-x assembler-with-cpp")

# 匹配所有 c 源文件
file(GLOB_RECURSE SOURCES
    "Drivers/*.c"
    "Core/*.c")

# 包含目录
include_directories(Core/inc)
include_directories(Drivers/CMSIS/Include)
include_directories(Drivers/CMSIS/Device/ST/STM32F1xx/Include)
include_directories(Drivers/STM32F1xx_HAL_Driver/Inc/Legacy)
include_directories(Drivers/STM32F1xx_HAL_Driver/Inc)

# 生成 elf 文件
add_executable(${PROJECT_NAME}.elf  ${SOURCES} ${ASM_SOURCES} ${LINK_SCRIPT})
```

### 生成后操作
```cmake
add_custom_command(
    # 在目标建立完成后操作
    TARGET ${PROJECT_NAME}.elf POST_BUILD
    COMMENT "EXCUTABLE SIZE:"
    COMMAND ${SIZE} ${PROJECT_NAME}.elf
    # 编译后自动通过 OpenOCD 下载
    COMMENT "Auto Download by OpenOCD:"
    COMMAND ${OpenOCDPath} -f"${OpenOCPInterface}" -f"${OpenOCPTarget}" -c"program ${PROJECT_NAME}.elf verify reset exit"
)
```

## vscode 插件配置
### Cortex-Debug
1. 在插件配置中确定 gcc-arm-none-eabi 与 OpenOCD 的路径
1. 通过运行和调试选项, 新建 `launch.json` 文件
1. 选择添加配置 `Cortex Debug`
1. 在 `configFiles` 属性中输入 OpenOCD 所需的 interface 与 target 配置文件路径
1. 在 `excutable` 属性中输入 `${command:cmake.launchTargetPath}` 将调试文件与 Cmake Tools 插件的目标关联
1. 完成配置后, 可通过运行和调试选项对程序进行调试

## vcpkg
当需要使用 vcpkg 时配置  
要求安装 vcpkg

### 清单模式配置
清单模式下, 在 `vcpkg-configuration.json` 中添加配置, 设置自定义 triplet 的目录  
`"overlay-triplets": ["./toolchain"]`

然后在 `toolchain` 文件夹中新建自定义 triplet 文件 `arm-stm32.cmake`  
同时在 `CMakeLists.txt` 中使用命令采用该 triplet  
`set(VCPKG_TARGET_TRIPLET arm-stm32)` 

### triplet 配置
在 `arm-stm32.cmake` 中配置

```cmake
set(VCPKG_TARGET_ARCHITECTURE arm)
# 单片机程序的链接性必定为 static
set(VCPKG_CRT_LINKAGE static)
set(VCPKG_LIBRARY_LINKAGE static)

# 工具链文件, 注意要使用绝对路径
set(VCPKG_CHAINLOAD_TOOLCHAIN_FILE "...\\toolchain\\toolchain.cmake")
```

### toolchain 配置
在 `toolchain.cmake` 中配置 arm-none-eabi 工具链 

```cmake
# 设置 arm-none-eabi 工具链地址, 使用绝对路径
set(TOOLCHAIN_PATH .../gcc-arm-none-eabi-10.3-2021.10/bin)

# 指定编译平台/架构与语言标准
set(CMAKE_SYSTEM_NAME Generic)
set(CMAKE_SYSTEM_PROCESSOR arm)
set(CMAKE_TRY_COMPILE_TARGET_TYPE STATIC_LIBRARY)

# 指定工具链
set(CMAKE_C_COMPILER_FORCED TRUE) # skip compiler test
set(CMAKE_CXX_COMPILER_FORCED TRUE)

set(CMAKE_C_COMPILER ${TOOLCHAIN_PATH}/arm-none-eabi-gcc.exe)
set(CMAKE_CXX_COMPILER ${TOOLCHAIN_PATH}/arm-none-eabi-g++.exe)
set(CMAKE_ASM_COMPILER ${TOOLCHAIN_PATH}/arm-none-eabi-gcc.exe)
set(CMAKE_LINKER ${TOOLCHAIN_PATH}/arm-none-eabi-ld.exe)

set(CMAKE_OBJCOPY ${TOOLCHAIN_PATH}/arm-none-eabi-objcopy.exe)
set(CMAKE_OBJDUMP ${TOOLCHAIN_PATH}/arm-none-eabi-objdump.exe)
set(SIZE ${TOOLCHAIN_PATH}/arm-none-eabi-size.exe) 
set(CMAKE_AR ${TOOLCHAIN_PATH}/arm-none-eabi-ar.exe)
```
