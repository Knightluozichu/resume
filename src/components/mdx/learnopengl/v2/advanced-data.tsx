"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-24",
  title: "缓冲更新、顶点布局与同步风险",
  task: "比较 glBufferData/subData、映射和分批属性布局，并显式记录 CPU/GPU 同步边界",
  owner: "buffer object、映射指针与仍在使用该存储的 GPU 命令",
  state: "分配大小、更新区间、map flags、属性批次布局和存储代次",
  event: "分配或 orphan 存储，更新不相交区间，再按匹配 offset 配置属性",
  invariant:
    "任何写区间都在分配范围内；覆盖 in-flight 数据前等待、orphan 或显式同步",
  fault: "无同步映射 GPU 正在读取的同一范围并立即覆盖，帧间出现随机撕裂",
  proof:
    "buffer size、更新 offset/length、map flags、fence、属性 offset 与捕获帧",
  concepts: ["buffer sub data", "buffer mapping", "batch vertex attributes"],
  stages: [
    {
      action: "冻结输入：buffer sub data",
      resource:
        "buffer object、映射指针与仍在使用该存储的 GPU 命令记录分配大小、更新区间、map flags、属性批次布局和存储代次",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "buffer size、更新 offset/length、map flags、fence、属性 offset 与捕获帧中的初始快照",
    },
    {
      action: "提交命令：buffer sub data",
      resource: "分配或 orphan 存储，更新不相交区间，再按匹配 offset 配置属性",
      result: "只改变与“buffer sub data”相关的状态",
      observation:
        "buffer size、更新 offset/length、map flags、fence、属性 offset 与捕获帧中的命令参数",
    },
    {
      action: "执行管线：buffer mapping",
      resource:
        "驱动/GPU 消费分配大小、更新区间、map flags、属性批次布局和存储代次",
      result: "产生“buffer mapping”对应的中间结果",
      observation:
        "buffer size、更新 offset/length、map flags、fence、属性 offset 与捕获帧中的首个可观测结果",
    },
    {
      action: "核对边界：buffer mapping",
      resource:
        "任何写区间都在分配范围内；覆盖 in-flight 数据前等待、orphan 或显式同步",
      result: "错误状态在继续传播前被定位",
      observation:
        "buffer size、更新 offset/length、map flags、fence、属性 offset 与捕获帧中的差异定位",
    },
    {
      action: "保存交付：batch vertex attributes",
      resource:
        "buffer size、更新 offset/length、map flags、fence、属性 offset 与捕获帧",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“任何写区间都在分配范围内；覆盖 in-flight 数据前等待、orphan 或显式同步”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“分配或 orphan 存储，更新不相交区间，再按匹配 offset 配置属性”",
      expected:
        "buffer object、映射指针与仍在使用该存储的 GPU 命令得到可复查结果，并持续满足“任何写区间都在分配范围内；覆盖 in-flight 数据前等待、orphan 或显式同步”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“无同步映射 GPU 正在读取的同一范围并立即覆盖，帧间出现随机撕裂”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以buffer size、更新 offset/length、map flags、fence、属性 offset 与捕获帧证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function AdvancedDataContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function AdvancedDataTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function AdvancedDataFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
