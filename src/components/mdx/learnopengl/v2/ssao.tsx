"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-38",
  title: "SSAO、半球采样与环境光遮蔽边界",
  task: "在 view space 用半球 kernel、旋转噪声与 depth 比较估计遮蔽，再单独模糊",
  owner: "G-buffer、SSAO kernel/noise texture、occlusion FBO 与 blur pass",
  state:
    "view-space position/normal、kernel samples、TBN、投影坐标、range check 和 occlusion",
  event: "旋转样本到法线半球，投影采样邻域深度，累积后模糊并用于环境项",
  invariant: "样本、法线和深度比较处于同一 view space；越界投影不伪造遮蔽",
  fault:
    "把 G-buffer world-space position 与 view-space sample 比较，摄像机移动时遮蔽漂移",
  proof:
    "kernel/noise 输入、sample position、projected UV、depth delta、occlusion 与 blur 输出",
  concepts: ["ssao", "sample kernel", "noise texture", "occlusion"],
  stages: [
    {
      action: "冻结输入：ssao",
      resource:
        "G-buffer、SSAO kernel/noise texture、occlusion FBO 与 blur pass记录view-space position/normal、kernel samples、TBN、投影坐标、range check 和 occlusion",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "kernel/noise 输入、sample position、projected UV、depth delta、occlusion 与 blur 输出中的初始快照",
    },
    {
      action: "提交命令：sample kernel",
      resource: "旋转样本到法线半球，投影采样邻域深度，累积后模糊并用于环境项",
      result: "只改变与“sample kernel”相关的状态",
      observation:
        "kernel/noise 输入、sample position、projected UV、depth delta、occlusion 与 blur 输出中的命令参数",
    },
    {
      action: "执行管线：sample kernel",
      resource:
        "驱动/GPU 消费view-space position/normal、kernel samples、TBN、投影坐标、range check 和 occlusion",
      result: "产生“sample kernel”对应的中间结果",
      observation:
        "kernel/noise 输入、sample position、projected UV、depth delta、occlusion 与 blur 输出中的首个可观测结果",
    },
    {
      action: "核对边界：noise texture",
      resource: "样本、法线和深度比较处于同一 view space；越界投影不伪造遮蔽",
      result: "错误状态在继续传播前被定位",
      observation:
        "kernel/noise 输入、sample position、projected UV、depth delta、occlusion 与 blur 输出中的差异定位",
    },
    {
      action: "保存交付：occlusion",
      resource:
        "kernel/noise 输入、sample position、projected UV、depth delta、occlusion 与 blur 输出",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“样本、法线和深度比较处于同一 view space；越界投影不伪造遮蔽”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“旋转样本到法线半球，投影采样邻域深度，累积后模糊并用于环境项”",
      expected:
        "G-buffer、SSAO kernel/noise texture、occlusion FBO 与 blur pass得到可复查结果，并持续满足“样本、法线和深度比较处于同一 view space；越界投影不伪造遮蔽”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“把 G-buffer world-space position 与 view-space sample 比较，摄像机移动时遮蔽漂移”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以kernel/noise 输入、sample position、projected UV、depth delta、occlusion 与 blur 输出证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function SsaoContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function SsaoTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function SsaoFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
