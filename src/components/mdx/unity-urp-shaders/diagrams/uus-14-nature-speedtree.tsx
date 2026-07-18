import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "入口",
    "stage": "SpeedTree Geometry",
    "action": "固定提交与包版本",
    "evidence": "commit与文件路径",
    "warning": "只在可见Pass计算风动，阴影、深度和运动向量留在静态位置。"
  },
  {
    "label": "数据",
    "stage": "风动画",
    "action": "追踪结构和函数参数",
    "evidence": "生产者到消费者图",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "Pass",
    "stage": "Billboard",
    "action": "核对LightMode与include链",
    "evidence": "Frame Debugger Pass",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "状态",
    "stage": "Cross Fade",
    "action": "核对关键字、RenderState和Renderer配置",
    "evidence": "材质与变体日志",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "证据",
    "stage": "版本族",
    "action": "在帧捕获中重放正常与失败例",
    "evidence": "GPU事件和缓冲截图",
    "warning": "只在可见Pass计算风动，阴影、深度和运动向量留在静态位置。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Uus14NatureSpeedtreePipelineLab(){return <UnityShaderLab title="源码单元14 SpeedTree 7、8、9与Billboard：源码链" mode="pipeline" snapshots={SNAPSHOTS} initial={0}/>;}
export function Uus14NatureSpeedtreeCompareLab(){return <UnityShaderLab title="源码单元14 SpeedTree 7、8、9与Billboard：变体对照" mode="pipeline" snapshots={SNAPSHOTS} initial={2}/>;}
export function Uus14NatureSpeedtreeEvidenceLab(){return <UnityShaderLab title="源码单元14 SpeedTree 7、8、9与Billboard：运行证据" mode="pipeline" snapshots={SNAPSHOTS} initial={4}/>;}
