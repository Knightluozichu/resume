import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "入口",
    "stage": "入口证书",
    "action": "固定提交与包版本",
    "evidence": "commit与文件路径",
    "warning": "只画静态include图，没有在Renderer、Frame Debugger和GPU事件中证明哪些Pass真的执行。"
  },
  {
    "label": "数据",
    "stage": "Pass证书",
    "action": "追踪结构和函数参数",
    "evidence": "生产者到消费者图",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "Pass",
    "stage": "数据证书",
    "action": "核对LightMode与include链",
    "evidence": "Frame Debugger Pass",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "状态",
    "stage": "专用族证书",
    "action": "核对关键字、RenderState和Renderer配置",
    "evidence": "材质与变体日志",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "证据",
    "stage": "工程证书",
    "action": "在帧捕获中重放正常与失败例",
    "evidence": "GPU事件和缓冲截图",
    "warning": "只画静态include图，没有在Renderer、Frame Debugger和GPU事件中证明哪些Pass真的执行。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function UusOfficialFinalReviewPipelineLab(){return <UnityShaderLab title="《Unity 6 URP内置Shader源码解析》总复习：源码链" mode="roadmap" snapshots={SNAPSHOTS} initial={0}/>;}
export function UusOfficialFinalReviewCompareLab(){return <UnityShaderLab title="《Unity 6 URP内置Shader源码解析》总复习：变体对照" mode="roadmap" snapshots={SNAPSHOTS} initial={2}/>;}
export function UusOfficialFinalReviewEvidenceLab(){return <UnityShaderLab title="《Unity 6 URP内置Shader源码解析》总复习：运行证据" mode="roadmap" snapshots={SNAPSHOTS} initial={4}/>;}
