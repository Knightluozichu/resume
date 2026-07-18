import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "入口",
    "stage": "BakedLit",
    "action": "固定提交与包版本",
    "evidence": "commit与文件路径",
    "warning": "对象未标记或UV错误却继续调材质，BakedLit只能读取空白或错误图集区域。"
  },
  {
    "label": "数据",
    "stage": "StaticLightmapUV",
    "action": "追踪结构和函数参数",
    "evidence": "生产者到消费者图",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "Pass",
    "stage": "SAMPLE_GI",
    "action": "核对LightMode与include链",
    "evidence": "Frame Debugger Pass",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "状态",
    "stage": "ShadowMask",
    "action": "核对关键字、RenderState和Renderer配置",
    "evidence": "材质与变体日志",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "证据",
    "stage": "Baked Meta",
    "action": "在帧捕获中重放正常与失败例",
    "evidence": "GPU事件和缓冲截图",
    "warning": "对象未标记或UV错误却继续调材质，BakedLit只能读取空白或错误图集区域。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Uus10BakedLitPipelineLab(){return <UnityShaderLab title="源码单元10 BakedLit静态照明材质：源码链" mode="lighting" snapshots={SNAPSHOTS} initial={0}/>;}
export function Uus10BakedLitCompareLab(){return <UnityShaderLab title="源码单元10 BakedLit静态照明材质：变体对照" mode="lighting" snapshots={SNAPSHOTS} initial={2}/>;}
export function Uus10BakedLitEvidenceLab(){return <UnityShaderLab title="源码单元10 BakedLit静态照明材质：运行证据" mode="lighting" snapshots={SNAPSHOTS} initial={4}/>;}
