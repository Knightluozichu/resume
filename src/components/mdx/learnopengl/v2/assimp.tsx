"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-15",
  title: "Assimp 导入、场景图与资源所有权",
  task: "从 Assimp Importer 读取 aiScene、验证错误标志并沿节点树发现 mesh/material",
  owner: "Assimp::Importer 与其拥有的 aiScene",
  state: "导入 flags、root node、mesh/material 数组、错误状态和资源寿命",
  event: "ReadFile 后验证 scene，再从 root 递归访问索引并应用后处理",
  invariant:
    "aiScene 只在 Importer 存活期间有效；失败或 incomplete 时不解引用 root",
  fault: "函数返回 aiScene 指针却销毁局部 Importer，后续遍历悬空内存",
  proof:
    "输入路径、post-process flags、GetErrorString、scene 计数、节点索引与寿命日志",
  concepts: ["assimp", "scene", "node", "post-processing"],
  stages: [
    {
      action: "冻结输入：assimp",
      resource:
        "Assimp::Importer 与其拥有的 aiScene记录导入 flags、root node、mesh/material 数组、错误状态和资源寿命",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "输入路径、post-process flags、GetErrorString、scene 计数、节点索引与寿命日志中的初始快照",
    },
    {
      action: "提交命令：scene",
      resource: "ReadFile 后验证 scene，再从 root 递归访问索引并应用后处理",
      result: "只改变与“scene”相关的状态",
      observation:
        "输入路径、post-process flags、GetErrorString、scene 计数、节点索引与寿命日志中的命令参数",
    },
    {
      action: "执行管线：scene",
      resource:
        "驱动/GPU 消费导入 flags、root node、mesh/material 数组、错误状态和资源寿命",
      result: "产生“scene”对应的中间结果",
      observation:
        "输入路径、post-process flags、GetErrorString、scene 计数、节点索引与寿命日志中的首个可观测结果",
    },
    {
      action: "核对边界：node",
      resource:
        "aiScene 只在 Importer 存活期间有效；失败或 incomplete 时不解引用 root",
      result: "错误状态在继续传播前被定位",
      observation:
        "输入路径、post-process flags、GetErrorString、scene 计数、节点索引与寿命日志中的差异定位",
    },
    {
      action: "保存交付：post-processing",
      resource:
        "输入路径、post-process flags、GetErrorString、scene 计数、节点索引与寿命日志",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“aiScene 只在 Importer 存活期间有效；失败或 incomplete 时不解引用 root”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“ReadFile 后验证 scene，再从 root 递归访问索引并应用后处理”",
      expected:
        "Assimp::Importer 与其拥有的 aiScene得到可复查结果，并持续满足“aiScene 只在 Importer 存活期间有效；失败或 incomplete 时不解引用 root”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“函数返回 aiScene 指针却销毁局部 Importer，后续遍历悬空内存”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以输入路径、post-process flags、GetErrorString、scene 计数、节点索引与寿命日志证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function AssimpContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function AssimpTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function AssimpFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
