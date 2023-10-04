# PCB Layout 笔记
## 实用资料
<https://zhuanlan.zhihu.com/p/655219972>  
<http://uinio.com/Electronics/PCB_Principle/>

## 元件布置
### 去耦电容与滤波电容
去耦电容的大小通常为 0603 封装的 0.1uf 电容以过滤电流经过导线后携带的高频噪声.  
布置在芯片的电源输入或者 PCB 的输出端口.

与去耦电容相配合的滤波电容则应采用 0805 封装, 并且容值为去耦电容的 100 倍, 通常采用 10uf 或 22uf, 用于电源输出的滤波 (如 LDO, DCDC 等)  
布置在芯片的输出端口或者 PCB 的输入端口.

参考资料 
* <https://www.bilibili.com/video/BV1Rh4y1e7hJ>
* <https://blog.csdn.net/Z523588/article/details/131780524>

### 电感铜皮
由于电感上存在交变的磁场, 如果电感下有大面积铜皮则将产生涡流, 并导致能量损耗, 因此电感元件下最好不铺铜

### 续流二极管
对于大功率的电机上通常需要有续流二极管, 防止电源断开时的反电动势对电路造成损害

