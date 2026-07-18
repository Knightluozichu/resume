import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "入口",
    "stage": "Splat Control",
    "action": "固定提交与包版本",
    "evidence": "commit与文件路径",
    "warning": "只改主Terrain Pass的风动或Alpha裁剪，DepthNormals与阴影仍使用另一套轮廓。"
  },
  {
    "label": "数据",
    "stage": "Terrain Add Pass",
    "action": "追踪结构和函数参数",
    "evidence": "生产者到消费者图",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "Pass",
    "stage": "BasemapGen",
    "action": "核对LightMode与include链",
    "evidence": "Frame Debugger Pass",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "状态",
    "stage": "Terrain Detail",
    "action": "核对关键字、RenderState和Renderer配置",
    "evidence": "材质与变体日志",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "证据",
    "stage": "Waving Grass",
    "action": "在帧捕获中重放正常与失败例",
    "evidence": "GPU事件和缓冲截图",
    "warning": "只改主Terrain Pass的风动或Alpha裁剪，DepthNormals与阴影仍使用另一套轮廓。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Uus13TerrainFamilyPipelineLab(){return <UnityShaderLab title="源码单元13 Terrain Lit、Detail与Grass：源码链" mode="texture" snapshots={SNAPSHOTS} initial={0}/>;}
export function Uus13TerrainFamilyCompareLab(){return <UnityShaderLab title="源码单元13 Terrain Lit、Detail与Grass：变体对照" mode="texture" snapshots={SNAPSHOTS} initial={2}/>;}
export function Uus13TerrainFamilyEvidenceLab(){return <UnityShaderLab title="源码单元13 Terrain Lit、Detail与Grass：运行证据" mode="texture" snapshots={SNAPSHOTS} initial={4}/>;}
