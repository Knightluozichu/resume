import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "入口",
    "stage": "Attributes",
    "action": "固定提交与包版本",
    "evidence": "commit与文件路径",
    "warning": "复制片元入口却遗漏normalizedScreenSpaceUV或shadowCoord，SSAO、阴影或Forward+只在部分配置下失效。"
  },
  {
    "label": "数据",
    "stage": "Varyings",
    "action": "追踪结构和函数参数",
    "evidence": "生产者到消费者图",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "Pass",
    "stage": "InputData",
    "action": "核对LightMode与include链",
    "evidence": "Frame Debugger Pass",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "状态",
    "stage": "UniversalFragmentPBR",
    "action": "核对关键字、RenderState和Renderer配置",
    "evidence": "材质与变体日志",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "证据",
    "stage": "Fog与Alpha",
    "action": "在帧捕获中重放正常与失败例",
    "evidence": "GPU事件和缓冲截图",
    "warning": "复制片元入口却遗漏normalizedScreenSpaceUV或shadowCoord，SSAO、阴影或Forward+只在部分配置下失效。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Uus05LitForwardPassPipelineLab(){return <UnityShaderLab title="源码单元5 LitForwardPass前向主链：源码链" mode="lighting" snapshots={SNAPSHOTS} initial={0}/>;}
export function Uus05LitForwardPassCompareLab(){return <UnityShaderLab title="源码单元5 LitForwardPass前向主链：变体对照" mode="lighting" snapshots={SNAPSHOTS} initial={2}/>;}
export function Uus05LitForwardPassEvidenceLab(){return <UnityShaderLab title="源码单元5 LitForwardPass前向主链：运行证据" mode="lighting" snapshots={SNAPSHOTS} initial={4}/>;}
