# 章节验收报告

## 章节名称

第 5 章：传动系统

## 完成内容

- 完成第 5 章目录驱动教学页。
- 标记当前材料状态为 `content_missing`。
- 建立传动形式、动力路径、差速器、四驱分配、打滑脱困的可视化组件。
- 建立本地 issue 闭环文档。

## 教学目标是否达成

已达成基础分支阶段目标：

- 能画出动力从变速器到车轮的主要路径。
- 能解释转弯时左右轮为什么需要不同转速。
- 能理解普通差速器、限滑差速器、差速锁、中央差速器和电控多片离合器的用途。
- 能区分前驱、后驱、全时四驱、分时/适时四驱的基本动力分配方式。

## 汽车体系能力点

- 变速器之后的动力传递路径
- 传动轴与半轴
- 差速器转弯逻辑
- 单侧打滑与动力流失
- 限滑差速器和差速锁
- 中央差速器、分动器、取力器和电控多片离合器
- HALDEX 类适时四驱理解入口

## 图解清单

- 前驱 / 后驱 / 四驱动力路径图
- 车身俯视传动轴和半轴示意图
- 转弯内外轮轨迹图
- 单轮打滑动力分配条
- 前后轴动力分配百分比

## 动画清单

- 转弯半径自动变化动画
- 差速器内外轮速度变化示意
- 打滑状态下动力流失对比

## 交互清单

- 切换前驱 / 后驱 / 全时四驱 / 分时或适时四驱
- 拖动转弯半径滑块
- 切换普通差速器 / 限滑差速器 / 差速锁
- 模拟单侧车轮打滑
- 差速器脱困小测反馈

## 练习与复习

- 本章学习地图回顾
- 核心概念卡片
- 部件速查表
- 易错点对比
- 拆车观察题
- 下一章预告

## issue 处理结果

- `AWR-CH05-001`：verified
- `AWR-CH05-002`：verified

## 构建 / 测试结果

- `node scripts/check-mdx.mjs`：通过，357 files，0 errors。
- `./node_modules/.bin/eslint src/components/mdx/auto/why-car-runs-lab.tsx src/components/mdx/mdx-components.tsx src/lib/content.ts`：通过。
- `npx tsc --noEmit --pretty false`：通过。
- `./node_modules/.bin/next build`：通过，SSG 生成 363 个页面。
- `curl -I http://127.0.0.1:3002/learn/auto-why-car-runs/05-drivetrain/drivetrain-system`：200。

## 移动端适配结果

Chrome/Puppeteer 验证：

- 桌面截图：`/tmp/auto-drivetrain-desktop.png`
- 移动端截图：`/tmp/auto-drivetrain-mobile.png`
- SVG 移动端渲染尺寸：324 x 219。
- 传动形式切换、转弯半径滑块、限滑差速器切换、打滑模拟、差速锁切换和差速器小测反馈均可用。

## 未解决问题

- 原书材料仍缺失，后续拿到材料后需要逐章校准。

## 是否允许进入下一章

允许进入下一章。
