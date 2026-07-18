import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "入口",
    "stage": "Shader变体",
    "action": "固定提交与包版本",
    "evidence": "commit与文件路径",
    "warning": "用MaterialPropertyBlock或不一致CBUFFER布局测试SRP Batcher，却把普通实例化与SRP Batcher混为同一种合批。"
  },
  {
    "label": "数据",
    "stage": "SRP Batcher",
    "action": "追踪结构和函数参数",
    "evidence": "生产者到消费者图",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "Pass",
    "stage": "DOTS Instancing",
    "action": "核对LightMode与include链",
    "evidence": "Frame Debugger Pass",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "状态",
    "stage": "XR宏",
    "action": "核对关键字、RenderState和Renderer配置",
    "evidence": "材质与变体日志",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "证据",
    "stage": "Debug Display",
    "action": "在帧捕获中重放正常与失败例",
    "evidence": "GPU事件和缓冲截图",
    "warning": "用MaterialPropertyBlock或不一致CBUFFER布局测试SRP Batcher，却把普通实例化与SRP Batcher混为同一种合批。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Uus21VariantsBatchingXrDebugPipelineLab(){return <UnityShaderLab title="源码单元21 变体、SRP Batcher、DOTS、XR与调试：源码链" mode="performance" snapshots={SNAPSHOTS} initial={0}/>;}
export function Uus21VariantsBatchingXrDebugCompareLab(){return <UnityShaderLab title="源码单元21 变体、SRP Batcher、DOTS、XR与调试：变体对照" mode="performance" snapshots={SNAPSHOTS} initial={2}/>;}
export function Uus21VariantsBatchingXrDebugEvidenceLab(){return <UnityShaderLab title="源码单元21 变体、SRP Batcher、DOTS、XR与调试：运行证据" mode="performance" snapshots={SNAPSHOTS} initial={4}/>;}
