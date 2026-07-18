import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "入口",
    "stage": "Lit Properties",
    "action": "固定提交与包版本",
    "evidence": "commit与文件路径",
    "warning": "在CBUFFER外新增逐材质变量，画面正常但SRP Batcher失效且批量提交成本上升。"
  },
  {
    "label": "数据",
    "stage": "UnityPerMaterial",
    "action": "追踪结构和函数参数",
    "evidence": "生产者到消费者图",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "Pass",
    "stage": "SampleMetallicSpecGloss",
    "action": "核对LightMode与include链",
    "evidence": "Frame Debugger Pass",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "状态",
    "stage": "InitializeStandardLitSurfaceData",
    "action": "核对关键字、RenderState和Renderer配置",
    "evidence": "材质与变体日志",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "证据",
    "stage": "SurfaceData",
    "action": "在帧捕获中重放正常与失败例",
    "evidence": "GPU事件和缓冲截图",
    "warning": "在CBUFFER外新增逐材质变量，画面正常但SRP Batcher失效且批量提交成本上升。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Uus03LitInputMaterialPipelineLab(){return <UnityShaderLab title="源码单元3 Lit.shader与LitInput材质入口：源码链" mode="texture" snapshots={SNAPSHOTS} initial={0}/>;}
export function Uus03LitInputMaterialCompareLab(){return <UnityShaderLab title="源码单元3 Lit.shader与LitInput材质入口：变体对照" mode="texture" snapshots={SNAPSHOTS} initial={2}/>;}
export function Uus03LitInputMaterialEvidenceLab(){return <UnityShaderLab title="源码单元3 Lit.shader与LitInput材质入口：运行证据" mode="texture" snapshots={SNAPSHOTS} initial={4}/>;}
