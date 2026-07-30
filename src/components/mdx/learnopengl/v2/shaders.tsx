"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-04",
  title: "GLSL 数据接口、Uniform 与 Shader Class",
  task: "建立 GLSL 阶段接口、uniform 更新和 Shader 类资源寿命的完整合同",
  owner: "已链接 shader program 与 CPU 侧 Shader 封装",
  state:
    "源码、编译对象、阶段接口、链接结果、uniform location 和当前 uniform 值",
  event:
    "编译 vertex/fragment shader，链接 program，再对当前 program 上传 uniform",
  invariant:
    "相邻阶段的 in/out 名称以 location/type 匹配，uniform 写入目标 program",
  fault: "顶点输出 vec3，片段输入声明为 vec2，链接失败却忽略日志继续绘制",
  proof:
    "逐阶段编译日志、program 链接日志、active uniform/interface 查询与输出像素",
  concepts: ["glsl", "vertex shader", "fragment shader", "uniform"],
  stages: [
    {
      action: "冻结输入：glsl",
      resource:
        "已链接 shader program 与 CPU 侧 Shader 封装记录源码、编译对象、阶段接口、链接结果、uniform location 和当前 uniform 值",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "逐阶段编译日志、program 链接日志、active uniform/interface 查询与输出像素中的初始快照",
    },
    {
      action: "提交命令：vertex shader",
      resource:
        "编译 vertex/fragment shader，链接 program，再对当前 program 上传 uniform",
      result: "只改变与“vertex shader”相关的状态",
      observation:
        "逐阶段编译日志、program 链接日志、active uniform/interface 查询与输出像素中的命令参数",
    },
    {
      action: "执行管线：vertex shader",
      resource:
        "驱动/GPU 消费源码、编译对象、阶段接口、链接结果、uniform location 和当前 uniform 值",
      result: "产生“vertex shader”对应的中间结果",
      observation:
        "逐阶段编译日志、program 链接日志、active uniform/interface 查询与输出像素中的首个可观测结果",
    },
    {
      action: "核对边界：fragment shader",
      resource:
        "相邻阶段的 in/out 名称以 location/type 匹配，uniform 写入目标 program",
      result: "错误状态在继续传播前被定位",
      observation:
        "逐阶段编译日志、program 链接日志、active uniform/interface 查询与输出像素中的差异定位",
    },
    {
      action: "保存交付：uniform",
      resource:
        "逐阶段编译日志、program 链接日志、active uniform/interface 查询与输出像素",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“相邻阶段的 in/out 名称以 location/type 匹配，uniform 写入目标 program”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“编译 vertex/fragment shader，链接 program，再对当前 program 上传 uniform”",
      expected:
        "已链接 shader program 与 CPU 侧 Shader 封装得到可复查结果，并持续满足“相邻阶段的 in/out 名称以 location/type 匹配，uniform 写入目标 program”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“顶点输出 vec3，片段输入声明为 vec2，链接失败却忽略日志继续绘制”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以逐阶段编译日志、program 链接日志、active uniform/interface 查询与输出像素证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function ShadersContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function ShadersTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function ShadersFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
