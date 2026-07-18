import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "入口",
    "stage": "Sprite Lit",
    "action": "固定提交与包版本",
    "evidence": "commit与文件路径",
    "warning": "把UniversalForward标签用于2D精灵Pass，Shader编译但2D Renderer不会按预期选择。"
  },
  {
    "label": "数据",
    "stage": "Sprite Unlit",
    "action": "追踪结构和函数参数",
    "evidence": "生产者到消费者图",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "Pass",
    "stage": "Shape Light",
    "action": "核对LightMode与include链",
    "evidence": "Frame Debugger Pass",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "状态",
    "stage": "Sprite Mask",
    "action": "核对关键字、RenderState和Renderer配置",
    "evidence": "材质与变体日志",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "证据",
    "stage": "2D Shadow",
    "action": "在帧捕获中重放正常与失败例",
    "evidence": "GPU事件和缓冲截图",
    "warning": "把UniversalForward标签用于2D精灵Pass，Shader编译但2D Renderer不会按预期选择。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Uus15Renderer2dPipelineLab(){return <UnityShaderLab title="源码单元15 2D Lit、Unlit、Mask与Shape Light：源码链" mode="texture" snapshots={SNAPSHOTS} initial={0}/>;}
export function Uus15Renderer2dCompareLab(){return <UnityShaderLab title="源码单元15 2D Lit、Unlit、Mask与Shape Light：变体对照" mode="texture" snapshots={SNAPSHOTS} initial={2}/>;}
export function Uus15Renderer2dEvidenceLab(){return <UnityShaderLab title="源码单元15 2D Lit、Unlit、Mask与Shape Light：运行证据" mode="texture" snapshots={SNAPSHOTS} initial={4}/>;}
