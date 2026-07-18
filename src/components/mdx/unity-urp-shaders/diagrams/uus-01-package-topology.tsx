import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "入口",
    "stage": "ShaderPathID",
    "action": "固定提交与包版本",
    "evidence": "commit与文件路径",
    "warning": "只记菜单名而不记录包版本和真实路径，升级Unity后仍用旧函数签名解释新源码。"
  },
  {
    "label": "数据",
    "stage": "Shaders目录",
    "action": "追踪结构和函数参数",
    "evidence": "生产者到消费者图",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "Pass",
    "stage": "ShaderLibrary目录",
    "action": "核对LightMode与include链",
    "evidence": "Frame Debugger Pass",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "状态",
    "stage": "包提交",
    "action": "核对关键字、RenderState和Renderer配置",
    "evidence": "材质与变体日志",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "证据",
    "stage": "依赖图",
    "action": "在帧捕获中重放正常与失败例",
    "evidence": "GPU事件和缓冲截图",
    "warning": "只记菜单名而不记录包版本和真实路径，升级Unity后仍用旧函数签名解释新源码。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Uus01PackageTopologyPipelineLab(){return <UnityShaderLab title="源码单元1 包入口与Shader索引：源码链" mode="pipeline" snapshots={SNAPSHOTS} initial={0}/>;}
export function Uus01PackageTopologyCompareLab(){return <UnityShaderLab title="源码单元1 包入口与Shader索引：变体对照" mode="pipeline" snapshots={SNAPSHOTS} initial={2}/>;}
export function Uus01PackageTopologyEvidenceLab(){return <UnityShaderLab title="源码单元1 包入口与Shader索引：运行证据" mode="pipeline" snapshots={SNAPSHOTS} initial={4}/>;}
