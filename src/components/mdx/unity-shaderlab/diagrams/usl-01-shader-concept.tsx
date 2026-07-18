import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "Shader",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "保存资源哈希与参数",
    "warning": "只背语法却没有先解释Shader在完整渲染链中的职责，换API或Unity版本后无法定位黑屏。"
  },
  {
    "label": "结构",
    "stage": "实例化",
    "action": "检查SubShader、Pass、标签和空间",
    "evidence": "显示阶段输入与中间值",
    "warning": "先确认实际执行路径，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "GPU编程",
    "action": "逐项打开本章公式或效果",
    "evidence": "保存正常图与差分图",
    "warning": "所有方向、深度和颜色都要标注空间与范围。"
  },
  {
    "label": "状态",
    "stage": "着色语言",
    "action": "核对深度、模板、混合和目标",
    "evidence": "保存Frame Debugger与GPU事件",
    "warning": "Shader代码不能独自决定全部渲染状态。"
  },
  {
    "label": "验收",
    "stage": "渲染证据",
    "action": "重放正确例、边界例和失败例",
    "evidence": "记录CPU/GPU时间与画质",
    "warning": "只背语法却没有先解释Shader在完整渲染链中的职责，换API或Unity版本后无法定位黑屏。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usl01ShaderConceptPipelineLab(){return <UnityShaderLab title="第1章 Shader（着色器）的概念和在3D游戏中的作用：执行链" mode="pipeline" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usl01ShaderConceptCompareLab(){return <UnityShaderLab title="第1章 Shader（着色器）的概念和在3D游戏中的作用：对照实验" mode="pipeline" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usl01ShaderConceptEvidenceLab(){return <UnityShaderLab title="第1章 Shader（着色器）的概念和在3D游戏中的作用：验收证书" mode="pipeline" snapshots={SNAPSHOTS} initial={4}/>;}
