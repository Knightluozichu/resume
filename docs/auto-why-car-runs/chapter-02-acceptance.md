# 章节验收报告

## 章节名称

第 2 章：车身

## 完成内容

- 完成第 2 章目录驱动教学页。
- 标记当前材料状态为 `content_missing`。
- 建立车身结构、尺寸、材料和碰撞力路径的可视化组件。
- 建立本地 issue 闭环文档。

## 教学目标是否达成

已达成基础分支阶段目标：

- 能解释车身不是外壳，而是空间、安全、材料和制造工艺的综合结构。
- 能区分承载式车身和非承载式车身。
- 能理解轴距、材料分布和碰撞力路径的学习价值。

## 汽车体系能力点

- 车身系统认知
- 尺寸与空间关系
- 材料权衡
- 碰撞吸能与乘员舱保护

## 图解清单

- 车身尺寸示意图
- 承载式 / 非承载式结构对比图
- 材料热区图
- 碰撞力路径图

## 动画清单

- 碰撞力如何绕开乘员舱的分步演示

## 交互清单

- 切换承载式 / 非承载式车身
- 拖动轴距滑块
- 点击材料热区
- 碰撞力路径上一步 / 下一步 / 播放 / 暂停
- 章节小测反馈

## 练习与复习

- 本章学习地图回顾
- 核心概念卡片
- 易错点对比
- 拆车观察题
- 下一章预告

## issue 处理结果

- `AWR-CH02-001`：verified
- `AWR-CH02-002`：verified

## 构建 / 测试结果

- `node scripts/check-mdx.mjs`：通过，354 files，0 errors。
- `./node_modules/.bin/eslint src/components/mdx/auto/why-car-runs-lab.tsx src/components/mdx/mdx-components.tsx src/lib/content.ts`：通过。
- `npx tsc --noEmit --pretty false`：通过。
- `./node_modules/.bin/next build`：通过，SSG 生成 360 个页面。
- `curl -I http://127.0.0.1:3001/learn/auto-why-car-runs/02-body/body-structure`：200。

## 移动端适配结果

Chrome/Puppeteer 验证：

- 桌面截图：`/tmp/auto-body-desktop.png`
- 移动端截图：`/tmp/auto-body-mobile.png`
- SVG 移动端渲染尺寸：324 x 182。
- 车身形式切换、材料切换、轴距滑块键盘交互均可用。

## 未解决问题

- 原书材料仍缺失，后续拿到材料后需要逐章校准。

## 是否允许进入下一章

允许进入下一章。
