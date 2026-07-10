import type { ReviewQuestion } from "./types";

export const uslSubshaderPassQuestions: ReviewQuestion[] = [
  {
    id: "usl-subshader-pass-1",
    chapter: "usl-subshader-pass",
    level: 1,
    question: `SubShader 和 Pass 的关系是什么？`,
    answer: `一个 SubShader 可包含一个或多个 Pass。每个 Pass 是一次完整的绘制调用。单 Pass Shader 一次绘制完成，多 Pass Shader 分多次绘制（如描边效果：第一个 Pass 渲染本体，第二个 Pass 渲染放大的描边）。`,
    tags: ["SubShader", "Pass"],
  },
  {
    id: "usl-subshader-pass-2",
    chapter: "usl-subshader-pass",
    level: 2,
    question: `Pass 中的 Cull、ZWrite、ZTest、Blend 分别控制什么？`,
    answer: `Cull 控制面剔除（Back/Front/Off）、ZWrite 控制是否写深度缓冲、ZTest 控制深度测试函数（Less/LEqual/Always 等）、Blend 控制混合模式（SrcAlpha OneMinusSrcAlpha 为标准透明混合）。`,
    tags: ["渲染状态", "Blend"],
  },
  {
    id: "usl-subshader-pass-3",
    chapter: "usl-subshader-pass",
    level: 3,
    question: `UsePass 的作用和使用注意事项是什么？`,
    answer: `UsePass 用于引用其他 Shader 中的 Pass，避免重复代码。格式为 UsePass \"ShaderName/PASSNAME\"。注意：被引用的 Pass 必须有 Name 标签，且 Name 全大写。引用后该 Pass 的属性绑定依赖被引用 Shader 的 Properties。`,
    tags: ["UsePass", "代码复用"],
  },
  {
    id: "usl-subshader-pass-4",
    chapter: "usl-subshader-pass",
    level: 4,
    question: `如何用多 Pass 实现物体描边效果？`,
    answer: `1)Pass 1：正常渲染物体 2)Pass 2：将顶点沿法线方向外扩，Cull Front 剔除正面只显示背面，用纯色填充 3)外扩后的背面形成描边轮廓 4)设置 ZWrite Off 避免深度冲突 5)可用 Pass 2 的颜色和宽度参数控制描边样式。`,
    tags: ["多Pass", "描边", "实践"],
  },
];
