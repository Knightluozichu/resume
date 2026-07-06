# 章节验收报告

## 章节名称

第 7 章：转向系统

## 完成内容

- 完成第 7 章目录驱动教学页。
- 标记当前材料状态为 `content_missing`。
- 建立方向盘、转向柱、齿轮齿条、拉杆、转向节、助力系统和四轮转向的可视化组件。
- 建立本地 issue 闭环文档。

## 教学目标是否达成

已达成基础分支阶段目标：

- 能说出方向盘到车轮偏转的完整链路。
- 能理解机械转向、液压助力、电动助力的区别。
- 能解释四轮转向为什么低速更灵活、高速更稳定。
- 能观察方向盘角度、车速、前后轮转角和转弯半径之间的关系。

## 汽车体系能力点

- 转向输入到车轮偏转的机械链路
- 齿轮齿条运动转换
- 转向拉杆和转向节
- 机械 / 液压 / 电动助力对比
- 低速反向四轮转向
- 高速同向四轮转向

## 图解清单

- 方向盘到车轮转角链路图
- 齿轮齿条位移图
- 前后轮转角示意图
- 助力负担条
- 转弯半径示意图

## 动画清单

- 方向盘角度自动变化动画
- 齿条左右位移联动示意
- 前后轮转角联动示意

## 交互清单

- 拖动方向盘角度滑块
- 拖动车速滑块
- 切换机械转向 / 液压助力 / 电动助力 EPS
- 切换仅前轮转向 / 低速反向 / 高速同向
- 播放转向动画
- 四轮转向小测反馈

## 练习与复习

- 本章学习地图回顾
- 核心概念卡片
- 助力形式对比
- 四轮转向对比
- 易错点对比
- 拆车观察题
- 下一章预告

## issue 处理结果

- `AWR-CH07-001`：verified
- `AWR-CH07-002`：verified

## 构建 / 测试结果

- `node scripts/check-mdx.mjs`：通过，359 files，0 errors。
- `./node_modules/.bin/eslint src/components/mdx/auto/why-car-runs-lab.tsx src/components/mdx/mdx-components.tsx src/lib/content.ts`：通过。
- `npx tsc --noEmit --pretty false`：通过。
- `./node_modules/.bin/next build`：通过，SSG 生成 365 个页面。
- `curl -I http://127.0.0.1:3004/learn/auto-why-car-runs/07-steering/steering-system`：200。

## 移动端适配结果

Chrome/Puppeteer 验证：

- 桌面截图：`/tmp/auto-steering-desktop.png`
- 移动端截图：`/tmp/auto-steering-mobile.png`
- SVG 移动端渲染尺寸：324 x 214。
- 方向盘角度滑块、车速滑块、机械/液压/EPS 助力切换、低速反向、高速同向和四轮转向小测反馈均可用。

## 未解决问题

- 原书材料仍缺失，后续拿到材料后需要逐章校准。

## 是否允许进入下一章

允许进入下一章。
