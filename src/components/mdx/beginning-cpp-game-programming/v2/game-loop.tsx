"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "bcgp3-01",
  title: "第 1 章：搭建 SFML 并启动 Timber!!!",
  focus:
    "从匹配架构的 C++20/SFML 构建开始，完成事件轮询、更新、clear-draw-display 与资源加载闭环",
  invariant:
    "窗口仍打开时每帧先处理事件，再更新状态，并且只按 clear、draw、display 顺序提交一次画面",
  fault: "忽略纹理加载失败或运行目录变化，让空精灵进入绘制阶段",
  evidence:
    "编译与链接命令、动态库架构、当前工作目录、loadFromFile 返回值和逐帧调用日志",
  concepts: [
    "配置 sfml（setting up sfml）",
    "timber 项目规划（planning timber）",
    "sfml 窗口（opening a window using sfml）",
    "游戏循环（the game loop）",
    "错误处理（handling errors）",
  ],
  zones: [
    {
      label: "构建与资源",
      detail: "编译器、SFML 二进制、运行库和资源路径",
    },
    {
      label: "实时状态",
      detail: "窗口事件、时间步与游戏对象更新",
    },
    {
      label: "可见提交",
      detail: "clear、draw、display 的帧边界",
    },
  ],
  trace: ["配置目标", "创建窗口", "轮询事件", "更新并绘制", "提交帧"],
  scenarios: [
    {
      label: "干净启动 Timber",
      input: "清空构建目录后，以匹配架构编译并从规定工作目录运行",
      expected: "窗口持续响应，背景纹理加载成功，每帧只提交一次",
    },
    {
      label: "资源路径失效",
      input: "保持二进制不变，把背景资源移出相对路径",
      expected: "加载失败被显式报告，程序不把空纹理当作成功画面",
    },
  ],
} satisfies CppGameBuildModel;

export function GameLoopPipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function GameLoopFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function GameLoopFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
