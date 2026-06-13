import type { MDXRemoteProps } from "next-mdx-remote/rsc";

import { Attribution } from "./attribution";
import { Callout } from "./callout";
import { CodeTabs, Tab } from "./code-tabs";
import { CompareSlider } from "./compare-slider";
import { DemoStage, Slider, Toggle } from "./controls";
import { RgbMixerDemo } from "./demos/rgb-mixer-demo";
import { Answer, Exercises } from "./exercises";
import { Figure } from "./figure";
import { Glossary, GlossaryItem } from "./glossary";
import { MathViz } from "./math-viz";
import { Objectives } from "./objectives";
import { ShaderDemo } from "./shader-demo";
import { Step, Stepper } from "./stepper";
import { Term } from "./term";

/**
 * MDX 结构教学组件 map（HEL-20）。
 *
 * 经 page.tsx 的 compileMDX(... components ...) 注入，使 content/learn/*.mdx 可直接用
 * <Objectives> / <CodeTabs><Tab> / <Exercises><Answer> / <Attribution> / <Callout> /
 * <ShaderDemo> 等标签。
 *
 * Server / Client 划分：
 *  - Server（纯展示）：Objectives / Callout / Attribution
 *  - Client（真交互）：CodeTabs+Tab（Tab 切换）、Exercises 区的 Answer（折叠披露）
 * client 组件被注入后仍是叶子交互壳，不会把整页变成 client（RSC 边界保持）。
 *
 * 轻量交互/动画/图示组件（HEL-23，非 WebGL，立即可用）：
 *  - Server（纯展示）：Figure（图片比喻 + 百分比标注）
 *  - Client（真交互）：CompareSlider（左右拖动对比）、Stepper+Step（分步动画：
 *    可暂停/单步/拖进度）、Slider/Toggle（内联控件）、DemoStage（Demo 容器卡片）
 *
 * WebGL 片段着色器实时渲染（HEL-25，M4 基座）：
 *  - Client（dynamic 边界）：ShaderDemo —— WebGL2 能力检测 + next/dynamic(ssr:false)
 *    懒加载含 WebGL 代码的 ShaderCanvas（独立 chunk，不进首屏/公共 layout，硬规则 2/6）。
 *    标准 uniforms：uTime / uResolution / uMouse。HEL-26 加 uniform 控件、HEL-27 加在线改 GLSL。
 *
 * 术语高亮 + 名词解释（HEL-24）：
 *  - Client（真交互）：Term（行内术语高亮 + hover/focus tooltip + Esc + 锚点跳词条）
 *  - Server（纯展示）：Glossary / GlossaryItem（章末「人话词典」，词条 id 与 Term 锚点对齐）
 *
 * 数学型(B)章节主 Demo（HEL-28，非 WebGL）：
 *  - Client（dynamic 边界）：MathViz —— 2D 向量/矩阵/坐标变换 SVG 交互可视化（拖动输入
 *    向量、调 2×2 矩阵 Slider、实时看 M·v 与变换后网格/基向量、预设/重置/键盘可调）。
 *    虽非 WebGL 但属重交互组件，按硬规则 2 经 next/dynamic(ssr:false) 懒加载独立 chunk。
 */
export const mdxComponents: NonNullable<MDXRemoteProps["components"]> = {
  Objectives,
  CodeTabs,
  Tab,
  Exercises,
  Answer,
  Attribution,
  Callout,
  ShaderDemo,
  MathViz,
  CompareSlider,
  Figure,
  Stepper,
  Step,
  Slider,
  Toggle,
  DemoStage,
  RgbMixerDemo,
  Term,
  Glossary,
  GlossaryItem,
};
