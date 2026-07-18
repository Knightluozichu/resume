import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "入口",
    "stage": "BRDFData",
    "action": "固定提交与包版本",
    "evidence": "commit与文件路径",
    "warning": "把Smoothness直接当Roughness传入BRDF，材质粗糙与光滑表现完全反转。"
  },
  {
    "label": "数据",
    "stage": "InitializeBRDFData",
    "action": "追踪结构和函数参数",
    "evidence": "生产者到消费者图",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "Pass",
    "stage": "DirectBRDFSpecular",
    "action": "核对LightMode与include链",
    "evidence": "Frame Debugger Pass",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "状态",
    "stage": "ClearCoat",
    "action": "核对关键字、RenderState和Renderer配置",
    "evidence": "材质与变体日志",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "证据",
    "stage": "能量分配",
    "action": "在帧捕获中重放正常与失败例",
    "evidence": "GPU事件和缓冲截图",
    "warning": "把Smoothness直接当Roughness传入BRDF，材质粗糙与光滑表现完全反转。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Uus04BrdfSurfaceDataPipelineLab(){return <UnityShaderLab title="源码单元4 SurfaceData到BRDFData：源码链" mode="lighting" snapshots={SNAPSHOTS} initial={0}/>;}
export function Uus04BrdfSurfaceDataCompareLab(){return <UnityShaderLab title="源码单元4 SurfaceData到BRDFData：变体对照" mode="lighting" snapshots={SNAPSHOTS} initial={2}/>;}
export function Uus04BrdfSurfaceDataEvidenceLab(){return <UnityShaderLab title="源码单元4 SurfaceData到BRDFData：运行证据" mode="lighting" snapshots={SNAPSHOTS} initial={4}/>;}
