import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "入口",
    "stage": "粒子顶点流",
    "action": "固定提交与包版本",
    "evidence": "commit与文件路径",
    "warning": "粒子系统没有发送Shader期望的顶点流，功能关键字开启后读取到错误通道。"
  },
  {
    "label": "数据",
    "stage": "软粒子",
    "action": "追踪结构和函数参数",
    "evidence": "生产者到消费者图",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "Pass",
    "stage": "相机淡出",
    "action": "核对LightMode与include链",
    "evidence": "Frame Debugger Pass",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "状态",
    "stage": "Flipbook Blending",
    "action": "核对关键字、RenderState和Renderer配置",
    "evidence": "材质与变体日志",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "证据",
    "stage": "粒子实例化",
    "action": "在帧捕获中重放正常与失败例",
    "evidence": "GPU事件和缓冲截图",
    "warning": "粒子系统没有发送Shader期望的顶点流，功能关键字开启后读取到错误通道。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Uus12ParticleFamilyPipelineLab(){return <UnityShaderLab title="源码单元12 Particles Lit、SimpleLit与Unlit：源码链" mode="transparent" snapshots={SNAPSHOTS} initial={0}/>;}
export function Uus12ParticleFamilyCompareLab(){return <UnityShaderLab title="源码单元12 Particles Lit、SimpleLit与Unlit：变体对照" mode="transparent" snapshots={SNAPSHOTS} initial={2}/>;}
export function Uus12ParticleFamilyEvidenceLab(){return <UnityShaderLab title="源码单元12 Particles Lit、SimpleLit与Unlit：运行证据" mode="transparent" snapshots={SNAPSHOTS} initial={4}/>;}
