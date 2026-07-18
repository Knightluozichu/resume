import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "入口",
    "stage": "DepthOnly",
    "action": "固定提交与包版本",
    "evidence": "commit与文件路径",
    "warning": "只修改Forward顶点动画，辅助Pass仍用原始顶点，产生漂浮阴影、错误深度和TAA鬼影。"
  },
  {
    "label": "数据",
    "stage": "DepthNormals",
    "action": "追踪结构和函数参数",
    "evidence": "生产者到消费者图",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "Pass",
    "stage": "ShadowCaster",
    "action": "核对LightMode与include链",
    "evidence": "Frame Debugger Pass",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "状态",
    "stage": "Meta Pass",
    "action": "核对关键字、RenderState和Renderer配置",
    "evidence": "材质与变体日志",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "证据",
    "stage": "MotionVectors",
    "action": "在帧捕获中重放正常与失败例",
    "evidence": "GPU事件和缓冲截图",
    "warning": "只修改Forward顶点动画，辅助Pass仍用原始顶点，产生漂浮阴影、错误深度和TAA鬼影。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Uus07SharedUtilityPassesPipelineLab(){return <UnityShaderLab title="源码单元7 深度、法线、阴影、Meta与运动Pass：源码链" mode="pipeline" snapshots={SNAPSHOTS} initial={0}/>;}
export function Uus07SharedUtilityPassesCompareLab(){return <UnityShaderLab title="源码单元7 深度、法线、阴影、Meta与运动Pass：变体对照" mode="pipeline" snapshots={SNAPSHOTS} initial={2}/>;}
export function Uus07SharedUtilityPassesEvidenceLab(){return <UnityShaderLab title="源码单元7 深度、法线、阴影、Meta与运动Pass：运行证据" mode="pipeline" snapshots={SNAPSHOTS} initial={4}/>;}
