---
sidebar_position: 2
---

# 快速入门

本指南将帮助您快速开始使用我们的产品。

## 安装

首先，您需要安装我们的产品：

```bash
npm install your-product
```

## 配置

创建配置文件 `config.json`：

```json
{
  "apiKey": "your-api-key",
  "environment": "production"
}
```

## 使用示例

这是一个基本的使用示例：

```typescript
import { YourProduct } from 'your-product';

const product = new YourProduct({
  apiKey: 'your-api-key'
});

await product.doSomething();
```

## 下一步

- 查看[高级配置选项](/docs/advanced/customization)
- 了解[最佳实践](/docs/advanced/best-practices)
- 探索[API参考](/docs/advanced/api-usage) 