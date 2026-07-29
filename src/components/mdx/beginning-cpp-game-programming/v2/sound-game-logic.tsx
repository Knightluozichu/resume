"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "bcgp3-16",
  title: "第 16 章：SoundEngine、游戏逻辑与对象通信",
  focus:
    "用 SoundEngine、游戏逻辑、事件或命令完成对象间通信，让 Player 与 Factory 不形成双向硬引用",
  invariant:
    "一个领域事件只被有效订阅者消费一次，发布者不需要知道接收者具体类型，声音是事件结果而非规则来源",
  fault:
    "Player 直接持有 SoundEngine 和 Factory 指针并在碰撞中同步调用，形成循环依赖和重复副作用",
  evidence:
    "事件 ID、发布顺序、订阅者列表、命令执行日志、对象引用图和音效触发次数",
  concepts: [
    "soundengine 类（soundengine class）",
    "游戏逻辑（game logic）",
    "对象间通信（inter-object communication）",
    "玩家（player）",
    "工厂（factory）",
  ],
  zones: [
    {
      label: "领域状态",
      detail: "Player、碰撞、得分与游戏阶段",
    },
    {
      label: "通信边界",
      detail: "事件、命令、接口与订阅关系",
    },
    {
      label: "副作用",
      detail: "Factory 创建、SoundEngine 播放和界面反馈",
    },
  ],
  trace: ["更新 Player", "产生事件", "路由消息", "执行副作用", "记录结果"],
  scenarios: [
    {
      label: "玩家落地",
      input: "Player 从空中进入平台接触并产生一次 Landed 事件",
      expected: "游戏逻辑与声音各消费一次，Player 不持有具体接收者",
    },
    {
      label: "重复消息重放",
      input: "用同一事件 ID 再投递一次",
      expected: "幂等边界阻止重复得分或重复生成，日志保留拒绝原因",
    },
  ],
} satisfies CppGameBuildModel;

export function SoundGameLogicPipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function SoundGameLogicFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function SoundGameLogicFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
