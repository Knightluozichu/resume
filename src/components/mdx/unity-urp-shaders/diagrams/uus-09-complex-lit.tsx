import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "入口",
    "stage": "ComplexLit",
    "action": "固定提交与包版本",
    "evidence": "commit与文件路径",
    "warning": "材质显示清漆参数但Shader变体未启用ClearCoat关键字，属性变化完全无效。"
  },
  {
    "label": "数据",
    "stage": "ClearCoatMask",
    "action": "追踪结构和函数参数",
    "evidence": "生产者到消费者图",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "Pass",
    "stage": "ClearCoatSmoothness",
    "action": "核对LightMode与include链",
    "evidence": "Frame Debugger Pass",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "状态",
    "stage": "双层Fresnel",
    "action": "核对关键字、RenderState和Renderer配置",
    "evidence": "材质与变体日志",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "证据",
    "stage": "额外评估",
    "action": "在帧捕获中重放正常与失败例",
    "evidence": "GPU事件和缓冲截图",
    "warning": "材质显示清漆参数但Shader变体未启用ClearCoat关键字，属性变化完全无效。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Uus09ComplexLitPipelineLab(){return <UnityShaderLab title="源码单元9 ComplexLit与ClearCoat：源码链" mode="lighting" snapshots={SNAPSHOTS} initial={0}/>;}
export function Uus09ComplexLitCompareLab(){return <UnityShaderLab title="源码单元9 ComplexLit与ClearCoat：变体对照" mode="lighting" snapshots={SNAPSHOTS} initial={2}/>;}
export function Uus09ComplexLitEvidenceLab(){return <UnityShaderLab title="源码单元9 ComplexLit与ClearCoat：运行证据" mode="lighting" snapshots={SNAPSHOTS} initial={4}/>;}
