"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-08",
  title: "自由摄像机、欧拉角与帧率无关输入",
  task: "让键鼠输入只更新 camera 状态，再由正交基和 delta time 生成稳定 view 矩阵",
  owner: "Camera 对象与每帧输入采样器",
  state: "position、front/right/up、yaw/pitch、FOV、delta time 与 view matrix",
  event: "采样键鼠，限制 pitch/FOV，重建正交基并调用 lookAt",
  invariant: "移动量乘 delta time，front/right/up 保持归一且互相正交",
  fault: "首个鼠标事件没有建立基线，巨大的 offset 让 yaw/pitch 瞬间跳变",
  proof: "帧时间、输入事件、欧拉角、基向量点积、view 矩阵与相机轨迹",
  concepts: ["camera", "lookat", "delta time", "euler angles"],
  stages: [
    {
      action: "冻结输入：camera",
      resource:
        "Camera 对象与每帧输入采样器记录position、front/right/up、yaw/pitch、FOV、delta time 与 view matrix",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "帧时间、输入事件、欧拉角、基向量点积、view 矩阵与相机轨迹中的初始快照",
    },
    {
      action: "提交命令：lookat",
      resource: "采样键鼠，限制 pitch/FOV，重建正交基并调用 lookAt",
      result: "只改变与“lookat”相关的状态",
      observation:
        "帧时间、输入事件、欧拉角、基向量点积、view 矩阵与相机轨迹中的命令参数",
    },
    {
      action: "执行管线：lookat",
      resource:
        "驱动/GPU 消费position、front/right/up、yaw/pitch、FOV、delta time 与 view matrix",
      result: "产生“lookat”对应的中间结果",
      observation:
        "帧时间、输入事件、欧拉角、基向量点积、view 矩阵与相机轨迹中的首个可观测结果",
    },
    {
      action: "核对边界：delta time",
      resource: "移动量乘 delta time，front/right/up 保持归一且互相正交",
      result: "错误状态在继续传播前被定位",
      observation:
        "帧时间、输入事件、欧拉角、基向量点积、view 矩阵与相机轨迹中的差异定位",
    },
    {
      action: "保存交付：euler angles",
      resource: "帧时间、输入事件、欧拉角、基向量点积、view 矩阵与相机轨迹",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“移动量乘 delta time，front/right/up 保持归一且互相正交”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“采样键鼠，限制 pitch/FOV，重建正交基并调用 lookAt”",
      expected:
        "Camera 对象与每帧输入采样器得到可复查结果，并持续满足“移动量乘 delta time，front/right/up 保持归一且互相正交”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“首个鼠标事件没有建立基线，巨大的 offset 让 yaw/pitch 瞬间跳变”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以帧时间、输入事件、欧拉角、基向量点积、view 矩阵与相机轨迹证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function CameraContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function CameraTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function CameraFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
