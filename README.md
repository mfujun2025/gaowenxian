# 高温线选型中心（gaowenxian）

高温线销售网站，对标 tsc-cable.com 的信息架构，纯静态，托管于 GitHub Pages。

- 地址：上海宝山工业园区
- 邮箱：mfujun@agent.qq.com

## 结构

```
index.html      首页（banner / 系列卡 / 热门型号 / 行业 / 卖点 / 询盘条）
products.html   产品中心（7 个系列锚点 + 型号卡）
about.html      关于我们
contact.html    联系我们（询盘表单 → mailto 预填）
404.html        自定义 404
assets/         css / js
```

## 表单接入 Formspree（可选升级）

当前表单通过 JS 构造 `mailto:` 链接。若要改为后台直收邮件：

1. 到 formspree.io 用 mfujun@agent.qq.com 注册，新建表单得到形如 `https://formspree.io/f/xxxxxx` 的地址
2. `contact.html` 的 form 加上 `action="https://formspree.io/f/xxxxxx" method="POST"`
3. `assets/js/main.js` 中去掉 `e.preventDefault()` 相关的 mailto 分支

## 部署

GitHub 仓库 Settings → Pages → Source 选 main 分支根目录，push 即上线。
