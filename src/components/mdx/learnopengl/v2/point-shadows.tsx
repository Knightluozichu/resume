"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-32",
  title: "点阴影、深度立方图与距离域比较",
  task: "从点光源向六个方向写入线性距离 cubemap，并用同一 far_plane 恢复比较",
  owner: "depth cubemap、六个 light-space transforms 与相机 pass",
  state: "六面矩阵、片段到光源距离、far_plane、cubemap depth 和 PCF 偏移",
  event: "一次几何阶段或六次 pass 写距离，再按方向采样并还原真实深度",
  invariant: "写入归一化距离和读取乘数使用同一个 far_plane，六面接缝方向一致",
  fault:
    "depth pass 使用 far_plane=25，lighting pass 却按 100 还原，几乎全场误判阴影",
  proof: "六面矩阵、写入距离、far_plane uniforms、采样方向、比较值与阴影截图",
  concepts: ["point shadows", "depth cubemap", "omnidirectional"],
  stages: [
    {
      action: "冻结输入：point shadows",
      resource:
        "depth cubemap、六个 light-space transforms 与相机 pass记录六面矩阵、片段到光源距离、far_plane、cubemap depth 和 PCF 偏移",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "六面矩阵、写入距离、far_plane uniforms、采样方向、比较值与阴影截图中的初始快照",
    },
    {
      action: "提交命令：point shadows",
      resource: "一次几何阶段或六次 pass 写距离，再按方向采样并还原真实深度",
      result: "只改变与“point shadows”相关的状态",
      observation:
        "六面矩阵、写入距离、far_plane uniforms、采样方向、比较值与阴影截图中的命令参数",
    },
    {
      action: "执行管线：depth cubemap",
      resource:
        "驱动/GPU 消费六面矩阵、片段到光源距离、far_plane、cubemap depth 和 PCF 偏移",
      result: "产生“depth cubemap”对应的中间结果",
      observation:
        "六面矩阵、写入距离、far_plane uniforms、采样方向、比较值与阴影截图中的首个可观测结果",
    },
    {
      action: "核对边界：depth cubemap",
      resource:
        "写入归一化距离和读取乘数使用同一个 far_plane，六面接缝方向一致",
      result: "错误状态在继续传播前被定位",
      observation:
        "六面矩阵、写入距离、far_plane uniforms、采样方向、比较值与阴影截图中的差异定位",
    },
    {
      action: "保存交付：omnidirectional",
      resource:
        "六面矩阵、写入距离、far_plane uniforms、采样方向、比较值与阴影截图",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“写入归一化距离和读取乘数使用同一个 far_plane，六面接缝方向一致”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“一次几何阶段或六次 pass 写距离，再按方向采样并还原真实深度”",
      expected:
        "depth cubemap、六个 light-space transforms 与相机 pass得到可复查结果，并持续满足“写入归一化距离和读取乘数使用同一个 far_plane，六面接缝方向一致”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“depth pass 使用 far_plane=25，lighting pass 却按 100 还原，几乎全场误判阴影”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以六面矩阵、写入距离、far_plane uniforms、采样方向、比较值与阴影截图证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function PointShadowsContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function PointShadowsTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function PointShadowsFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
