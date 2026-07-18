import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "入口",
    "stage": "包入口",
    "action": "固定提交与包版本",
    "evidence": "commit与文件路径",
    "warning": "拿master最新代码解释某个已发布Unity版本，文件和关键字会漂移，读者无法复现。"
  },
  {
    "label": "数据",
    "stage": "Lit主链",
    "action": "追踪结构和函数参数",
    "evidence": "生产者到消费者图",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "Pass",
    "stage": "内置材质族",
    "action": "核对LightMode与include链",
    "evidence": "Frame Debugger Pass",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "状态",
    "stage": "专用Shader族",
    "action": "核对关键字、RenderState和Renderer配置",
    "evidence": "材质与变体日志",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "证据",
    "stage": "共享库",
    "action": "在帧捕获中重放正常与失败例",
    "evidence": "GPU事件和缓冲截图",
    "warning": "拿master最新代码解释某个已发布Unity版本，文件和关键字会漂移，读者无法复现。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function UusOfficialLearningMapPipelineLab(){return <UnityShaderLab title="《Unity 6 URP内置Shader源码解析》全图：源码链" mode="roadmap" snapshots={SNAPSHOTS} initial={0}/>;}
export function UusOfficialLearningMapCompareLab(){return <UnityShaderLab title="《Unity 6 URP内置Shader源码解析》全图：变体对照" mode="roadmap" snapshots={SNAPSHOTS} initial={2}/>;}
export function UusOfficialLearningMapEvidenceLab(){return <UnityShaderLab title="《Unity 6 URP内置Shader源码解析》全图：运行证据" mode="roadmap" snapshots={SNAPSHOTS} initial={4}/>;}
