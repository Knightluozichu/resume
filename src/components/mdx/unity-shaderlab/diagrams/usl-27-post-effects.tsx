import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "Blit",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "保存资源哈希与参数",
    "warning": "源和目标指向同一RenderTexture，读写反馈让结果依赖GPU执行细节。"
  },
  {
    "label": "结构",
    "stage": "多重采样",
    "action": "检查SubShader、Pass、标签和空间",
    "evidence": "显示阶段输入与中间值",
    "warning": "先确认实际执行路径，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "深度法线纹理",
    "action": "逐项打开本章公式或效果",
    "evidence": "保存正常图与差分图",
    "warning": "所有方向、深度和颜色都要标注空间与范围。"
  },
  {
    "label": "状态",
    "stage": "Ping-Pong",
    "action": "核对深度、模板、混合和目标",
    "evidence": "保存Frame Debugger与GPU事件",
    "warning": "Shader代码不能独自决定全部渲染状态。"
  },
  {
    "label": "验收",
    "stage": "颜色空间",
    "action": "重放正确例、边界例和失败例",
    "evidence": "记录CPU/GPU时间与画质",
    "warning": "源和目标指向同一RenderTexture，读写反馈让结果依赖GPU执行细节。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usl27PostEffectsPipelineLab(){return <UnityShaderLab title="第27章 后期效果：执行链" mode="texture" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usl27PostEffectsCompareLab(){return <UnityShaderLab title="第27章 后期效果：对照实验" mode="texture" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usl27PostEffectsEvidenceLab(){return <UnityShaderLab title="第27章 后期效果：验收证书" mode="texture" snapshots={SNAPSHOTS} initial={4}/>;}
