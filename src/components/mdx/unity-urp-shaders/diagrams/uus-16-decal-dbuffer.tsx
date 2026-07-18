import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "入口",
    "stage": "Decal",
    "action": "固定提交与包版本",
    "evidence": "commit与文件路径",
    "warning": "投影材质写法线但相机没有生成所需深度法线，Decal方向和边缘错误。"
  },
  {
    "label": "数据",
    "stage": "DBuffer",
    "action": "追踪结构和函数参数",
    "evidence": "生产者到消费者图",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "Pass",
    "stage": "DecalSurfaceData",
    "action": "核对LightMode与include链",
    "evidence": "Frame Debugger Pass",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "状态",
    "stage": "Decal Layers",
    "action": "核对关键字、RenderState和Renderer配置",
    "evidence": "材质与变体日志",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "证据",
    "stage": "表面改写",
    "action": "在帧捕获中重放正常与失败例",
    "evidence": "GPU事件和缓冲截图",
    "warning": "投影材质写法线但相机没有生成所需深度法线，Decal方向和边缘错误。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Uus16DecalDbufferPipelineLab(){return <UnityShaderLab title="源码单元16 Decal ShaderGraph与DBuffer：源码链" mode="pipeline" snapshots={SNAPSHOTS} initial={0}/>;}
export function Uus16DecalDbufferCompareLab(){return <UnityShaderLab title="源码单元16 Decal ShaderGraph与DBuffer：变体对照" mode="pipeline" snapshots={SNAPSHOTS} initial={2}/>;}
export function Uus16DecalDbufferEvidenceLab(){return <UnityShaderLab title="源码单元16 Decal ShaderGraph与DBuffer：运行证据" mode="pipeline" snapshots={SNAPSHOTS} initial={4}/>;}
