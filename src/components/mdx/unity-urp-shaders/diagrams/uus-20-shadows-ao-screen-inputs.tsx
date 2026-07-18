import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "入口",
    "stage": "MainLightShadow",
    "action": "固定提交与包版本",
    "evidence": "commit与文件路径",
    "warning": "直接声明Texture2D相机深度，在XR纹理数组或反转Z平台读取错误。"
  },
  {
    "label": "数据",
    "stage": "AdditionalLightShadow",
    "action": "追踪结构和函数参数",
    "evidence": "生产者到消费者图",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "Pass",
    "stage": "ScreenSpaceOcclusionData",
    "action": "核对LightMode与include链",
    "evidence": "Frame Debugger Pass",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "状态",
    "stage": "SampleSceneDepth",
    "action": "核对关键字、RenderState和Renderer配置",
    "evidence": "材质与变体日志",
    "warning": "源码静态路径必须与运行时实际变体互证。"
  },
  {
    "label": "证据",
    "stage": "Normal Reconstruction",
    "action": "在帧捕获中重放正常与失败例",
    "evidence": "GPU事件和缓冲截图",
    "warning": "直接声明Texture2D相机深度，在XR纹理数组或反转Z平台读取错误。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Uus20ShadowsAoScreenInputsPipelineLab(){return <UnityShaderLab title="源码单元20 Shadows、AO与屏幕纹理：源码链" mode="texture" snapshots={SNAPSHOTS} initial={0}/>;}
export function Uus20ShadowsAoScreenInputsCompareLab(){return <UnityShaderLab title="源码单元20 Shadows、AO与屏幕纹理：变体对照" mode="texture" snapshots={SNAPSHOTS} initial={2}/>;}
export function Uus20ShadowsAoScreenInputsEvidenceLab(){return <UnityShaderLab title="源码单元20 Shadows、AO与屏幕纹理：运行证据" mode="texture" snapshots={SNAPSHOTS} initial={4}/>;}
