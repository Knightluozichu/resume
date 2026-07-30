"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-14",
  title: "多光源函数化、数组上传与贡献累加",
  task: "让一盏平行光、多个点光和聚光分别求值后只在最终颜色处累加",
  owner: "lighting program 的光源 uniform 数组与 Calc* 函数",
  state: "光源数量、数组元素、每灯贡献、累加器和最终颜色",
  event: "上传所有 light 元素，逐灯调用对应函数并累加返回值",
  invariant: "每盏灯只贡献一次且函数不偷偷复用上一盏灯的局部状态",
  fault: "循环内把 result 赋值为当前点光贡献而非 +=，只剩最后一盏灯",
  proof: "uniform 数组查询、逐灯分量、循环索引、累加结果与关闭单灯差分图",
  concepts: ["multiple lights", "uniform array", "lighting function"],
  stages: [
    {
      action: "冻结输入：multiple lights",
      resource:
        "lighting program 的光源 uniform 数组与 Calc* 函数记录光源数量、数组元素、每灯贡献、累加器和最终颜色",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "uniform 数组查询、逐灯分量、循环索引、累加结果与关闭单灯差分图中的初始快照",
    },
    {
      action: "提交命令：multiple lights",
      resource: "上传所有 light 元素，逐灯调用对应函数并累加返回值",
      result: "只改变与“multiple lights”相关的状态",
      observation:
        "uniform 数组查询、逐灯分量、循环索引、累加结果与关闭单灯差分图中的命令参数",
    },
    {
      action: "执行管线：uniform array",
      resource: "驱动/GPU 消费光源数量、数组元素、每灯贡献、累加器和最终颜色",
      result: "产生“uniform array”对应的中间结果",
      observation:
        "uniform 数组查询、逐灯分量、循环索引、累加结果与关闭单灯差分图中的首个可观测结果",
    },
    {
      action: "核对边界：uniform array",
      resource: "每盏灯只贡献一次且函数不偷偷复用上一盏灯的局部状态",
      result: "错误状态在继续传播前被定位",
      observation:
        "uniform 数组查询、逐灯分量、循环索引、累加结果与关闭单灯差分图中的差异定位",
    },
    {
      action: "保存交付：lighting function",
      resource:
        "uniform 数组查询、逐灯分量、循环索引、累加结果与关闭单灯差分图",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“每盏灯只贡献一次且函数不偷偷复用上一盏灯的局部状态”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“上传所有 light 元素，逐灯调用对应函数并累加返回值”",
      expected:
        "lighting program 的光源 uniform 数组与 Calc* 函数得到可复查结果，并持续满足“每盏灯只贡献一次且函数不偷偷复用上一盏灯的局部状态”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“循环内把 result 赋值为当前点光贡献而非 +=，只剩最后一盏灯”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以uniform 数组查询、逐灯分量、循环索引、累加结果与关闭单灯差分图证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function MultipleLightsContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function MultipleLightsTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function MultipleLightsFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
