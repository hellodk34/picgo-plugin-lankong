## picgo-plugin-lankong

[![下载](https://img.shields.io/npm/dm/picgo-plugin-lankong.svg?color=brightgreen)](https://npmcharts.com/compare/picgo-plugin-lankong?minimal=true)
[![版本](https://img.shields.io/npm/v/picgo-plugin-lankong.svg?color=brightgreen)](https://www.npmjs.com/package/picgo-plugin-lankong)
[![许可](https://img.shields.io/badge/license-mit-brightgreen.svg)](https://github.com/hellodk34/picgo-plugin-lankong/blob/master/License)

这是一个为 [兰空图床 v1](https://github.com/lsky-org/lsky-pro) 适配开发的 PicGo 图片上传插件。基于 `PicGo V2.3.0` 开发。

> Lsky Pro 是一个用于在线上传、管理图片的图床程序，中文名：兰空图床，你可以将它作为自己的云上相册，亦可以当作你的写作贴图库。  
> 兰空图床始于 2017 年 10 月，最早的版本由 ThinkPHP 5 开发，后又经历了数个版本的迭代，在 2021 年末启动了新的重写计划并于 2022 年 3 月份发布全新的 2.0 版本。

说明：目前大部分站点还是采用的 V1 版本程序，V2 更新了更多功能，也更新了 API，适配 V2 的工作放在后面了。

---

# 安装和使用

## 1. 在线安装(**推荐**)

打开 PicGo 详细窗口，选择插件设置，搜索 **lankong** (author 是 `hellodk`) 安装。

![20220323110227](https://img.github.luxe/2022/9383b937aef0b.png)

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

由于有些站点使用 Let's Encrypt 颁发的免费证书，有效期只有 90 天，在测试上传中可能遇到 `certificate has expired` 错误，请打开开关 `Ignore certificate error` 即可成功上传。

# 开源许可证

Released under the [MIT License](https://github.com/hellodk34/picgo-plugin-lankong/blob/main/License).
