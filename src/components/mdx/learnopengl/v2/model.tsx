"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-17",
  title: "Model 场景遍历、纹理缓存与层级变换",
  task: "递归展开 aiNode，转换每个 aiMesh，并按规范化路径复用已加载纹理",
  owner: "Model 对象、节点遍历器与 texture cache",
  state: "目录、节点层级、mesh 列表、材质纹理、缓存键和层级变换",
  event: "processNode 递归索引 mesh，processMesh 转换数据并查询材质纹理",
  invariant: "每个 scene mesh 按节点引用处理，重复纹理只创建一次 GPU 对象",
  fault: "忽略节点局部变换就把所有 mesh 压平，层级模型的零件重叠到原点",
  proof: "节点路径/变换、mesh 索引、纹理规范化路径、cache hit 与场景包围盒",
  concepts: ["model", "directory", "texture cache", "recursive"],
  stages: [
    {
      action: "冻结输入：model",
      resource:
        "Model 对象、节点遍历器与 texture cache记录目录、节点层级、mesh 列表、材质纹理、缓存键和层级变换",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "节点路径/变换、mesh 索引、纹理规范化路径、cache hit 与场景包围盒中的初始快照",
    },
    {
      action: "提交命令：directory",
      resource: "processNode 递归索引 mesh，processMesh 转换数据并查询材质纹理",
      result: "只改变与“directory”相关的状态",
      observation:
        "节点路径/变换、mesh 索引、纹理规范化路径、cache hit 与场景包围盒中的命令参数",
    },
    {
      action: "执行管线：directory",
      resource:
        "驱动/GPU 消费目录、节点层级、mesh 列表、材质纹理、缓存键和层级变换",
      result: "产生“directory”对应的中间结果",
      observation:
        "节点路径/变换、mesh 索引、纹理规范化路径、cache hit 与场景包围盒中的首个可观测结果",
    },
    {
      action: "核对边界：texture cache",
      resource: "每个 scene mesh 按节点引用处理，重复纹理只创建一次 GPU 对象",
      result: "错误状态在继续传播前被定位",
      observation:
        "节点路径/变换、mesh 索引、纹理规范化路径、cache hit 与场景包围盒中的差异定位",
    },
    {
      action: "保存交付：recursive",
      resource:
        "节点路径/变换、mesh 索引、纹理规范化路径、cache hit 与场景包围盒",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“每个 scene mesh 按节点引用处理，重复纹理只创建一次 GPU 对象”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“processNode 递归索引 mesh，processMesh 转换数据并查询材质纹理”",
      expected:
        "Model 对象、节点遍历器与 texture cache得到可复查结果，并持续满足“每个 scene mesh 按节点引用处理，重复纹理只创建一次 GPU 对象”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“忽略节点局部变换就把所有 mesh 压平，层级模型的零件重叠到原点”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以节点路径/变换、mesh 索引、纹理规范化路径、cache hit 与场景包围盒证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function ModelContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function ModelTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function ModelFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
