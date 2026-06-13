import type { MDXRemoteProps } from "next-mdx-remote/rsc";

import { Attribution } from "./attribution";
import { Callout } from "./callout";
import { CodeTabs, Tab } from "./code-tabs";
import { CompareSlider } from "./compare-slider";
import { DemoStage, Slider, Toggle } from "./controls";
import { RgbMixerDemo } from "./demos/rgb-mixer-demo";
import { Answer, Exercises } from "./exercises";
import { Figure } from "./figure";
import { Objectives } from "./objectives";
import { ShaderDemo } from "./shader-demo";
import { Step, Stepper } from "./stepper";

/**
 * MDX 结构教学组件 map（HEL-20）。
 *
 * 经 page.tsx 的 compileMDX(... components ...) 注入，使 content/learn/*.mdx 可直接用
 * <Objectives> / <CodeTabs><Tab> / <Exercises><Answer> / <Attribution> / <Callout> /
 * <ShaderDemo> 等标签。
 *
 * Server / Client 划分：
 *  - Server（纯展示）：Objectives / Callout / Attribution / ShaderDemo(M4 占位)
 *  - Client（真交互）：CodeTabs+Tab（Tab 切换）、Exercises 区的 Answer（折叠披露）
 * client 组件被注入后仍是叶子交互壳，不会把整页变成 client（RSC 边界保持）。
 *
 * 轻量交互/动画/图示组件（HEL-23，非 WebGL，立即可用）：
 *  - Server（纯展示）：Figure（图片比喻 + 百分比标注）
 *  - Client（真交互）：CompareSlider（左右拖动对比）、Stepper+Step（分步动画：
 *    可暂停/单步/拖进度）、Slider/Toggle（内联控件）、DemoStage（Demo 容器卡片）
 * WebGL 重型（ShaderCanvas/MathViz/PipelineViz）属 M4——本卡不引入。
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
  CompareSlider,
  Figure,
  Stepper,
  Step,
  Slider,
  Toggle,
  DemoStage,
  RgbMixerDemo,
};
