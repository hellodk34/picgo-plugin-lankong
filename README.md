## picgo-plugin-lankong

这是一个为 [兰空图床](https://github.com/lsky-org/lsky-pro) 适配开发的 PicGo 图片上传插件。基于 `PicGo V2.3.0` 开发。

---

# 安装和使用

## 1. 在线安装

打开 PicGo 详细窗口，选择插件设置，搜索 **lankong** (author 是 `hellodk`) 安装。

## 2. 离线安装

克隆该项目，解压缩到路径 `/path/to/picgo-plugin-lankong`

进入以下目录

```
Windows: %APPDATA%\picgo\
Linux: $XDG_CONFIG_HOME/picgo/ or ~/.config/picgo/
macOS: ~/Library/Application\ Support/picgo/
```

在对应系统的 PicGo 程序配置文件路径下执行 `npm install /path/to/picgo-plugin-lankong`，然后重启应用即可。

## 3. 使用方法

![20220322100519](https://img.github.luxe/2022/179b6b02de109.png)

- 填写图床的 `server url`，注意不能以 `/` 结束，比如 `https://example.com` 就是没问题的
- 填写 `token`
- `Ignore certificate error` 开关请见下面说明

由于有些站点使用 Let's Encrypt 颁发的免费证书，有效期只有 90 天，在测试上传中经常遇到 `certificate has expired` 错误，请打开开关 `Ignore certificate error` 即可成功上传。

# 开源许可证

Released under the [MIT License](https://github.com/hellodk34/picgo-plugin-lankong/blob/main/LICENSE).
