import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "入口",
    "stage": "UberPost",
    "action": "固定提交与包版本",
    "evidence": "commit与文件路径",
    "warning": "在XR或动态分辨率下手写普通quad和tex2D，UV缩放、Y翻转或双眼切片错误。"
  },
  {
    "label": "数据",
    "stage": "Bloom金字塔",
    "action": "追踪结构和函数参数",
    "evidence": "生产者到消费者图",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "Pass",
    "stage": "TemporalAA",
    "action": "核对LightMode与include链",
    "evidence": "Frame Debugger Pass",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "状态",
    "stage": "Motion Blur",
    "action": "核对关键字、RenderState和Renderer配置",
    "evidence": "材质与变体日志",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "证据",
    "stage": "Blit契约",
    "action": "在帧捕获中重放正常与失败例",
    "evidence": "GPU事件和缓冲截图",
    "warning": "在XR或动态分辨率下手写普通quad和tex2D，UV缩放、Y翻转或双眼切片错误。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Uus17PostprocessFullscreenPipelineLab(){return <UnityShaderLab title="源码单元17 后处理、Blit与时域效果：源码链" mode="texture" snapshots={SNAPSHOTS} initial={0}/>;}
export function Uus17PostprocessFullscreenCompareLab(){return <UnityShaderLab title="源码单元17 后处理、Blit与时域效果：变体对照" mode="texture" snapshots={SNAPSHOTS} initial={2}/>;}
export function Uus17PostprocessFullscreenEvidenceLab(){return <UnityShaderLab title="源码单元17 后处理、Blit与时域效果：运行证据" mode="texture" snapshots={SNAPSHOTS} initial={4}/>;}
