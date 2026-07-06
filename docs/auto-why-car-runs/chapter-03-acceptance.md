# 章节验收报告

## 章节名称

第 3 章：发动机

## 完成内容

- 完成第 3 章目录驱动教学页。
- 标记当前材料状态为 `content_missing`。
- 建立四冲程、活塞连杆曲轴、进排气、冷却和润滑的可视化组件。
- 建立本地 issue 闭环文档。

## 教学目标是否达成

已达成基础分支阶段目标：

- 能解释四冲程发动机如何把燃油化学能转成曲轴旋转。
- 能看懂气缸、活塞、连杆、曲轴、气门、火花塞之间的配合。
- 能理解进排气、冷却和润滑不是附属装饰，而是发动机持续工作的必要系统。

## 汽车体系能力点

- 燃油车动力源认知
- 四冲程循环
- 直线运动到旋转运动
- 进气与增压
- 热管理与润滑保护

## 图解清单

- 四冲程发动机剖面图
- 活塞 / 连杆 / 曲轴运动图
- 进气门 / 排气门状态图
- 自然吸气 / 涡轮增压 / 机械增压路径图
- 冷却液和机油路径图

## 动画清单

- 四冲程循环分步演示

## 交互清单

- 切换进气 / 压缩 / 做功 / 排气
- 拖动发动机转速滑块
- 切换自然吸气 / 涡轮增压 / 机械增压
- 播放 / 暂停四冲程循环
- 冲程判断小测反馈

## 练习与复习

- 本章学习地图回顾
- 核心概念卡片
- 易错点对比
- 拆车观察题
- 下一章预告

## issue 处理结果

- `AWR-CH03-001`：verified
- `AWR-CH03-002`：verified

## 构建 / 测试结果

- `node scripts/check-mdx.mjs`：通过，355 files，0 errors。
- `./node_modules/.bin/eslint src/components/mdx/auto/why-car-runs-lab.tsx src/components/mdx/mdx-components.tsx src/lib/content.ts`：通过。
- `npx tsc --noEmit --pretty false`：通过。
- `./node_modules/.bin/next build`：通过，SSG 生成 361 个页面。
- `curl -I http://127.0.0.1:3001/learn/auto-why-car-runs/03-engine/engine-principles`：200。

## 移动端适配结果

Chrome/Puppeteer 验证：

- 桌面截图：`/tmp/auto-engine-desktop.png`
- 移动端截图：`/tmp/auto-engine-mobile.png`
- SVG 移动端渲染尺寸：324 x 192。
- 冲程切换、涡轮增压切换、转速滑块和小测反馈均可用。

## 未解决问题

- 原书材料仍缺失，后续拿到材料后需要逐章校准。

## 是否允许进入下一章

允许进入下一章。
