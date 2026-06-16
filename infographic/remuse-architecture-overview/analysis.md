---
title: "remuse Shader教学网站 — 全栈技术架构总览"
topic: "technical"
data_type: "hierarchy"
complexity: "complex"
point_count: 6
source_language: "zh"
user_language: "zh"
---

## Main Topic

remuse 是一个以 WebGL2 为核心的 Shader/OpenGL 教学网站（blog.luozichu.ink），基于 Next.js App Router + TypeScript + MDX + Three.js / WebGL2，纯 SSG 全静态架构，部署于腾讯云 Lighthouse。本图展示从用户浏览器到底层素材源的完整六层技术架构。

## Learning Objectives

After viewing this infographic, the viewer should understand:

1. remuse 的六层全栈架构（浏览器 → nginx → Next.js → MDX管线 → 组件体系 → Git CMS）
2. 每一层的核心技术选型与职责
3. SSG 纯静态架构的设计理由与构建流程

## Target Audience

- **Knowledge Level**: Intermediate（需要了解 Next.js App Router 和 WebGL 基础）
- **Context**: 技术人员需要快速理解项目架构全貌
- **Expectations**: 看清每一层用什么技术、做什么事、层与层之间如何对接

## Content Type Analysis

- **Data Structure**: 严格的层级关系，从顶到底的依赖方向
- **Key Relationships**: 下层为上层提供数据/服务，上层消费下层产物
- **Visual Opportunities**: 层叠结构天然适合金字塔或堆叠式可视化

## Key Data Points (Verbatim)

- "Next.js 16.2.9 App Router + TypeScript"
- "纯 SSG，output: standalone"
- "nginx 反代 443 → 127.0.0.1:3100 (pm2 fork)"
- "MDX 编译管线：gray-matter → compileMDX → shiki/KaTeX"
- "R3F (React Three Fiber) + 原生 WebGL2 双体系并行"
- "DESIGN.md 定义 10 个色彩 token，Tailwind @theme inline 落地"
- "content/ 目录即 Git CMS，零数据库"
- "部署：deploy.sh 一键 rsync → pm2 reload"

## Layout × Style Signals

- Content type: hierarchy → suggests hierarchical-layers
- Tone: technical/engineering → suggests technical-schematic
- Audience: developers → suggests technical-schematic (blueprint variant)
- Complexity: complex → suggests layered structure

## Design Instructions (from user input)

- 架构图要画全、画仔细
- 每层标注技术栈
- 展示数据流方向

## Recommended Combinations

1. **hierarchical-layers + technical-schematic** (Recommended): 金字塔六层架构，蓝图工程风格，完美匹配技术架构的层级关系
2. **structural-breakdown + corporate-memphis**: 爆炸图展示组件结构，扁平矢量风格
3. **linear-progression + subway-map**: 数据流管线，地铁线路图风格
