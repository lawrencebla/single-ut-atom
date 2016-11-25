#基于mocha-webpack运行当前文件UT

**webpack配置写在项目根目录的webpac-single-ut.config.js文件中。**

## 使用

* 位于目标文件时运行命令`single-ut:start`
* 位于目标文件时快捷键`ctrl+alt+u`
* 右键目标文件，选择`Single UT Start`

## 需要改进

* 将.tmp替换为基于内存的读取
* 利用缓存，提高运行效率
* 对于enzyme的moment支持