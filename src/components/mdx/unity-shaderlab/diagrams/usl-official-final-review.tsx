import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "结构证书",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "保存资源哈希与参数",
    "warning": "最终画面相似就认为复刻完成，没有证明实际Pass、空间、缓冲、阴影和性能路径一致。"
  },
  {
    "label": "结构",
    "stage": "空间证书",
    "action": "检查SubShader、Pass、标签和空间",
    "evidence": "显示阶段输入与中间值",
    "warning": "先确认实际执行路径，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "照明证书",
    "action": "逐项打开本章公式或效果",
    "evidence": "保存正常图与差分图",
    "warning": "所有方向、深度和颜色都要标注空间与范围。"
  },
  {
    "label": "状态",
    "stage": "效果证书",
    "action": "核对深度、模板、混合和目标",
    "evidence": "保存Frame Debugger与GPU事件",
    "warning": "Shader代码不能独自决定全部渲染状态。"
  },
  {
    "label": "验收",
    "stage": "优化证书",
    "action": "重放正确例、边界例和失败例",
    "evidence": "记录CPU/GPU时间与画质",
    "warning": "最终画面相似就认为复刻完成，没有证明实际Pass、空间、缓冲、阴影和性能路径一致。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function UslOfficialFinalReviewPipelineLab(){return <UnityShaderLab title="《Unity 3D ShaderLab开发实战详解》总复习：执行链" mode="roadmap" snapshots={SNAPSHOTS} initial={0}/>;}
export function UslOfficialFinalReviewCompareLab(){return <UnityShaderLab title="《Unity 3D ShaderLab开发实战详解》总复习：对照实验" mode="roadmap" snapshots={SNAPSHOTS} initial={2}/>;}
export function UslOfficialFinalReviewEvidenceLab(){return <UnityShaderLab title="《Unity 3D ShaderLab开发实战详解》总复习：验收证书" mode="roadmap" snapshots={SNAPSHOTS} initial={4}/>;}
