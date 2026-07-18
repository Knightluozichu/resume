import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "入口",
    "stage": "Core.hlsl",
    "action": "固定提交与包版本",
    "evidence": "commit与文件路径",
    "warning": "把positionNDC直接当零到一UV，忽略齐次除法和平台翻转。"
  },
  {
    "label": "数据",
    "stage": "UnityInput",
    "action": "追踪结构和函数参数",
    "evidence": "生产者到消费者图",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "Pass",
    "stage": "VertexPositionInputs",
    "action": "核对LightMode与include链",
    "evidence": "Frame Debugger Pass",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "状态",
    "stage": "VertexNormalInputs",
    "action": "核对关键字、RenderState和Renderer配置",
    "evidence": "材质与变体日志",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "证据",
    "stage": "相机相对位置",
    "action": "在帧捕获中重放正常与失败例",
    "evidence": "GPU事件和缓冲截图",
    "warning": "把positionNDC直接当零到一UV，忽略齐次除法和平台翻转。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Uus18CoreInputTransformsPipelineLab(){return <UnityShaderLab title="源码单元18 Core、Input与坐标变换：源码链" mode="math" snapshots={SNAPSHOTS} initial={0}/>;}
export function Uus18CoreInputTransformsCompareLab(){return <UnityShaderLab title="源码单元18 Core、Input与坐标变换：变体对照" mode="math" snapshots={SNAPSHOTS} initial={2}/>;}
export function Uus18CoreInputTransformsEvidenceLab(){return <UnityShaderLab title="源码单元18 Core、Input与坐标变换：运行证据" mode="math" snapshots={SNAPSHOTS} initial={4}/>;}
