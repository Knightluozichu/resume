import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "入口",
    "stage": "RenderPipeline标签",
    "action": "固定提交与包版本",
    "evidence": "commit与文件路径",
    "warning": "自定义Pass只有名称没有受支持的LightMode，Shader能编译却从不被URP调度。"
  },
  {
    "label": "数据",
    "stage": "LightMode",
    "action": "追踪结构和函数参数",
    "evidence": "生产者到消费者图",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "Pass",
    "stage": "UniversalMaterialType",
    "action": "核对LightMode与include链",
    "evidence": "Frame Debugger Pass",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "状态",
    "stage": "Render State",
    "action": "核对关键字、RenderState和Renderer配置",
    "evidence": "材质与变体日志",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "证据",
    "stage": "Pass证书",
    "action": "在帧捕获中重放正常与失败例",
    "evidence": "GPU事件和缓冲截图",
    "warning": "自定义Pass只有名称没有受支持的LightMode，Shader能编译却从不被URP调度。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Uus02ShaderlabPassContractPipelineLab(){return <UnityShaderLab title="源码单元2 ShaderLab与LightMode契约：源码链" mode="pipeline" snapshots={SNAPSHOTS} initial={0}/>;}
export function Uus02ShaderlabPassContractCompareLab(){return <UnityShaderLab title="源码单元2 ShaderLab与LightMode契约：变体对照" mode="pipeline" snapshots={SNAPSHOTS} initial={2}/>;}
export function Uus02ShaderlabPassContractEvidenceLab(){return <UnityShaderLab title="源码单元2 ShaderLab与LightMode契约：运行证据" mode="pipeline" snapshots={SNAPSHOTS} initial={4}/>;}
