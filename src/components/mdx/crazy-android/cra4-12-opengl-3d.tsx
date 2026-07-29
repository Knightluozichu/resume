"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从项目合同与生命周期开始",
    mechanism:
      "在《第12章 OpenGL与3D开发》中，第4版以近百个实例和两个综合项目组织知识，不是零散API列表。每个节点都要回答用户从哪里进入、哪个组件拥有工作、回调在哪个线程发生、哪些事实必须恢复、需要什么权限、外部系统如何失败，以及资源何时释放。",
    failure:
      "若学习「从项目合同与生命周期开始」只复制正常路径示例而不声明组件 owner、线程、状态、权限与外部失败，应用会在旋转、进程重建、拒权或弱网时丢失行为。",
    evidence:
      "在 Android 9.x/Java 基线上复现「从项目合同与生命周期开始」，保存构建与设备指纹、操作、线程/生命周期轨迹、状态快照，并注入一个权限、重建或外部服务失败。",
  },
  {
    label: "最小可执行切片",
    mechanism:
      "ScreenState reduce(ScreenState current, UiEvent event) return nextState(current, event);",
    failure:
      "若学习「最小可执行切片」只复制正常路径示例而不声明组件 owner、线程、状态、权限与外部失败，应用会在旋转、进程重建、拒权或弱网时丢失行为。",
    evidence:
      "在 Android 9.x/Java 基线上复现「最小可执行切片」，保存构建与设备指纹、操作、线程/生命周期轨迹、状态快照，并注入一个权限、重建或外部服务失败。",
  },
  {
    label: "线程、权限、状态与资源",
    mechanism:
      "在《第12章 OpenGL与3D开发》中，主线程负责输入、生命周期分发和UI；文件、SQLite、网络、图片解码、OpenGL准备与长计算不得阻塞帧。后台结果返回前确认所有者仍有效，Service并不自动拥有后台线程，Receiver也不能无限运行。每个实现列出入口、线程、事实源、权限、取消点、关闭责任和用户可见失败。",
    failure:
      "若学习「线程、权限、状态与资源」只复制正常路径示例而不声明组件 owner、线程、状态、权限与外部失败，应用会在旋转、进程重建、拒权或弱网时丢失行为。",
    evidence:
      "在 Android 9.x/Java 基线上复现「线程、权限、状态与资源」，保存构建与设备指纹、操作、线程/生命周期轨迹、状态快照，并注入一个权限、重建或外部服务失败。",
  },
];

export function Cra412Opengl3dDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第12章 OpenGL与3D开发：机制与证据"
      prompt="切换《第12章 OpenGL与3D开发》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第12章 OpenGL与3D开发》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Cra412Opengl3dMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第12章 OpenGL与3D开发：机制路径"
      stages={STAGES}
    />
  );
}

export function Cra412Opengl3dFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第12章 OpenGL与3D开发：失效与核验"
      stages={STAGES}
    />
  );
}
