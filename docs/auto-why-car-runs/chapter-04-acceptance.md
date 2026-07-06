# 章节验收报告

## 章节名称

第 4 章：变速器

## 完成内容

- 完成第 4 章目录驱动教学页。
- 标记当前材料状态为 `content_missing`。
- 建立齿比、挡位、转速、变速器类型和换挡直觉的可视化组件。
- 建立本地 issue 闭环文档。

## 教学目标是否达成

已达成基础分支阶段目标：

- 能解释发动机转速、车速、扭矩和齿比之间的关系。
- 能区分低挡大扭矩、高挡高车速。
- 能理解 MT、AT、CVT、DCT 的核心差异。

## 汽车体系能力点

- 动力源到车轮之间的转速/扭矩匹配
- 齿比直觉
- 挡位选择
- 变速器类型对比
- 换挡与驾驶感受

## 图解清单

- 输入轮 / 输出轮齿比图
- 挡位齿比轨道图
- 低挡 / 高挡扭矩速度对比卡片
- MT / AT / CVT / DCT 动力路径图

## 动画清单

- 自动播放换挡演示
- CVT 变径式路径示意

## 交互清单

- 切换 1-6 挡
- 拖动发动机转速滑块
- 切换 MT / AT / CVT / DCT
- 升挡 / 降挡 / 播放换挡
- 挡位选择小测反馈

## 练习与复习

- 本章学习地图回顾
- 核心概念卡片
- 易错点对比
- 拆车观察题
- 下一章预告

## issue 处理结果

- `AWR-CH04-001`：verified
- `AWR-CH04-002`：verified

## 构建 / 测试结果

- `node scripts/check-mdx.mjs`：通过，356 files，0 errors。
- `./node_modules/.bin/eslint src/components/mdx/auto/why-car-runs-lab.tsx src/components/mdx/mdx-components.tsx src/lib/content.ts`：通过。
- `npx tsc --noEmit --pretty false`：通过。
- `./node_modules/.bin/next build`：通过，SSG 生成 362 个页面。
- `curl -I http://127.0.0.1:3001/learn/auto-why-car-runs/04-transmission/transmission-principles`：200。

## 移动端适配结果

Chrome/Puppeteer 验证：

- 桌面截图：`/tmp/auto-transmission-desktop.png`
- 移动端截图：`/tmp/auto-transmission-mobile.png`
- SVG 移动端渲染尺寸：324 x 192。
- 挡位切换、CVT 类型切换、发动机转速滑块和挡位小测反馈均可用。

## 未解决问题

- 原书材料仍缺失，后续拿到材料后需要逐章校准。

## 是否允许进入下一章

允许进入下一章。
