import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "入口",
    "stage": "SimpleLit",
    "action": "固定提交与包版本",
    "evidence": "commit与文件路径",
    "warning": "直接把所有Lit材质换成SimpleLit，没有验证金属、反射与光滑度语义差异。"
  },
  {
    "label": "数据",
    "stage": "SpecularSource",
    "action": "追踪结构和函数参数",
    "evidence": "生产者到消费者图",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "Pass",
    "stage": "BlinnPhong",
    "action": "核对LightMode与include链",
    "evidence": "Frame Debugger Pass",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "状态",
    "stage": "SimpleLit GBuffer",
    "action": "核对关键字、RenderState和Renderer配置",
    "evidence": "材质与变体日志",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "证据",
    "stage": "成本证书",
    "action": "在帧捕获中重放正常与失败例",
    "evidence": "GPU事件和缓冲截图",
    "warning": "直接把所有Lit材质换成SimpleLit，没有验证金属、反射与光滑度语义差异。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Uus08SimpleLitPipelineLab(){return <UnityShaderLab title="源码单元8 SimpleLit材质族：源码链" mode="lighting" snapshots={SNAPSHOTS} initial={0}/>;}
export function Uus08SimpleLitCompareLab(){return <UnityShaderLab title="源码单元8 SimpleLit材质族：变体对照" mode="lighting" snapshots={SNAPSHOTS} initial={2}/>;}
export function Uus08SimpleLitEvidenceLab(){return <UnityShaderLab title="源码单元8 SimpleLit材质族：运行证据" mode="lighting" snapshots={SNAPSHOTS} initial={4}/>;}
