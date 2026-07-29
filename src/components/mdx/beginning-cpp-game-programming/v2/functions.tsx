"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "bcgp3-09",
  title: "第 9 章：引用、精灵图集与 VertexArray",
  focus:
    "用 C++ 引用传递世界数据，以 sprite sheet 和 sf::VertexArray 批量构造可滚动背景",
  invariant:
    "非拥有引用的生命周期短于被引用对象，VertexArray 的 primitive type、顶点数、纹理坐标和世界坐标保持匹配",
  fault: "返回对局部 VertexArray 或临时纹理的引用，调用结束后继续绘制悬空对象",
  evidence:
    "引用绑定对象地址、所有者作用域、顶点数量、position/texCoords 和 draw 调用",
  concepts: [
    "c++ 引用（c++ references）",
    "精灵图集（sprite sheets）",
    "顶点数组（vertex arrays）",
    "随机滚动背景（randomly generated scrolling background）",
  ],
  zones: [
    {
      label: "数据所有权",
      detail: "调用方对象、引用参数和资源寿命",
    },
    {
      label: "几何构造",
      detail: "sprite sheet tile 到 VertexArray 顶点",
    },
    {
      label: "滚动输出",
      detail: "纹理坐标、世界位置与批量绘制",
    },
  ],
  trace: ["绑定引用", "选择 tile", "写入顶点", "提交数组", "验证寿命"],
  scenarios: [
    {
      label: "构造 Arena 背景",
      input: "调用方预分配 VertexArray，并以引用交给背景构造函数",
      expected: "函数返回后数组仍由调用方拥有且顶点可绘制",
    },
    {
      label: "临时资源误用",
      input: "把局部纹理地址写入离开作用域后仍使用的对象",
      expected: "生命周期检查拒绝该设计，不用偶尔正常画面证明安全",
    },
  ],
} satisfies CppGameBuildModel;

export function FunctionsPipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function FunctionsFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function FunctionsFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
