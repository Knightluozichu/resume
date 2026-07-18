import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "渲染路径",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "保存资源哈希与参数",
    "warning": "看到文件中的第一个Pass就认定它最先执行，没有检查渲染路径、标签和替换渲染。"
  },
  {
    "label": "结构",
    "stage": "LightMode",
    "action": "检查SubShader、Pass、标签和空间",
    "evidence": "显示阶段输入与中间值",
    "warning": "先确认实际执行路径，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "首个Pass",
    "action": "逐项打开本章公式或效果",
    "evidence": "保存正常图与差分图",
    "warning": "所有方向、深度和颜色都要标注空间与范围。"
  },
  {
    "label": "状态",
    "stage": "Frame Debugger",
    "action": "核对深度、模板、混合和目标",
    "evidence": "保存Frame Debugger与GPU事件",
    "warning": "Shader代码不能独自决定全部渲染状态。"
  },
  {
    "label": "验收",
    "stage": "Pass证书",
    "action": "重放正确例、边界例和失败例",
    "evidence": "记录CPU/GPU时间与画质",
    "warning": "看到文件中的第一个Pass就认定它最先执行，没有检查渲染路径、标签和替换渲染。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usl05FirstExecutedPassPipelineLab(){return <UnityShaderLab title="第5章 第一个被执行的Pass：执行链" mode="pipeline" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usl05FirstExecutedPassCompareLab(){return <UnityShaderLab title="第5章 第一个被执行的Pass：对照实验" mode="pipeline" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usl05FirstExecutedPassEvidenceLab(){return <UnityShaderLab title="第5章 第一个被执行的Pass：验收证书" mode="pipeline" snapshots={SNAPSHOTS} initial={4}/>;}
