# 章节验收报告

## 章节名称

第 1 章：整车

## 完成内容

- 建立汽车体系第一本书的全书学习地图。
- 完成第 1 章目录驱动教学页。
- 标记当前材料状态为 `content_missing`。
- 建立整车系统分层、动力流和布局切换的可视化组件。
- 建立本地 issue 闭环文档。

## 教学目标是否达成

已达成基础分支阶段目标：

- 能说清汽车不是一个发动机加四个轮子，而是多个系统协同。
- 能解释“动力源 -> 变速/传动 -> 车轮 -> 地面”的能量路径。
- 能区分前驱、后驱、四驱的动力流差异。

## 汽车体系能力点

- 整车系统观
- 动力链路
- 布局差异
- 后续章节学习地图

## 图解清单

- 全书学习地图
- 整车系统分层图
- 前驱 / 后驱 / 四驱动力流对比图
- 整车模块高亮图

## 动画清单

- 汽车从静止到跑起来的分步动力流演示

## 交互清单

- 点击整车模块查看功能
- 切换前驱 / 后驱 / 四驱
- 动力流上一步 / 下一步 / 播放 / 暂停
- 章节小测反馈

## 练习与复习

- 本章学习地图回顾
- 核心概念卡片
- 常见误区
- 小测验
- 拆车观察题
- 下一章预告

## issue 处理结果

- `AWR-CH01-001`：verified
- `AWR-CH01-002`：verified

## 构建 / 测试结果

- `node scripts/check-mdx.mjs`：通过，353 files，0 errors。
- `./node_modules/.bin/eslint src/components/mdx/auto/why-car-runs-lab.tsx src/components/mdx/mdx-components.tsx src/lib/content.ts`：通过。
- `npx tsc --noEmit --pretty false`：通过。
- `./node_modules/.bin/next build`：通过，SSG 生成 359 个页面。
- `curl -I http://127.0.0.1:3001/learn/auto-why-car-runs/00-learning-map/learning-map`：200。
- `curl -I http://127.0.0.1:3001/learn/auto-why-car-runs/01-whole-car/whole-car-system`：200。

## 移动端适配结果

组件采用响应式网格和 SVG `viewBox`。Chrome/Puppeteer 验证：

- 桌面截图：`/tmp/auto-whole-car-desktop.png`
- 移动端截图：`/tmp/auto-whole-car-mobile.png`
- SVG 移动端渲染尺寸：324 x 172。
- 模块点击和四驱布局切换均可用。

## 未解决问题

- 原书材料仍缺失，后续拿到材料后需要逐章校准。

## 是否允许进入下一章

允许进入下一章。
