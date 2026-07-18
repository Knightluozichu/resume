import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "入口",
    "stage": "Unlit",
    "action": "固定提交与包版本",
    "evidence": "commit与文件路径",
    "warning": "认为Unlit无需DepthNormals和MotionVectors，后处理和TAA出现轮廓缺口。"
  },
  {
    "label": "数据",
    "stage": "Unlit Forward",
    "action": "追踪结构和函数参数",
    "evidence": "生产者到消费者图",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "Pass",
    "stage": "Unlit GBuffer",
    "action": "核对LightMode与include链",
    "evidence": "Frame Debugger Pass",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "状态",
    "stage": "Unlit DepthNormals",
    "action": "核对关键字、RenderState和Renderer配置",
    "evidence": "材质与变体日志",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "证据",
    "stage": "Alpha与Fog",
    "action": "在帧捕获中重放正常与失败例",
    "evidence": "GPU事件和缓冲截图",
    "warning": "认为Unlit无需DepthNormals和MotionVectors，后处理和TAA出现轮廓缺口。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Uus11UnlitPipelineLab(){return <UnityShaderLab title="源码单元11 Unlit与多Pass兼容：源码链" mode="texture" snapshots={SNAPSHOTS} initial={0}/>;}
export function Uus11UnlitCompareLab(){return <UnityShaderLab title="源码单元11 Unlit与多Pass兼容：变体对照" mode="texture" snapshots={SNAPSHOTS} initial={2}/>;}
export function Uus11UnlitEvidenceLab(){return <UnityShaderLab title="源码单元11 Unlit与多Pass兼容：运行证据" mode="texture" snapshots={SNAPSHOTS} initial={4}/>;}
