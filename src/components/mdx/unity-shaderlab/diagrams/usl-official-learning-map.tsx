import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "第一篇基础",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "保存资源哈希与参数",
    "warning": "只按现代Unity API重写而删除固定管线、VertexLit和Surface Shader，会丢失原书用于解释渲染路径演进的核心链路。"
  },
  {
    "label": "结构",
    "stage": "第二篇照明",
    "action": "检查SubShader、Pass、标签和空间",
    "evidence": "显示阶段输入与中间值",
    "warning": "先确认实际执行路径，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "第三篇阴影",
    "action": "逐项打开本章公式或效果",
    "evidence": "保存正常图与差分图",
    "warning": "所有方向、深度和颜色都要标注空间与范围。"
  },
  {
    "label": "状态",
    "stage": "第四篇Shader",
    "action": "核对深度、模板、混合和目标",
    "evidence": "保存Frame Debugger与GPU事件",
    "warning": "Shader代码不能独自决定全部渲染状态。"
  },
  {
    "label": "验收",
    "stage": "第五篇优化",
    "action": "重放正确例、边界例和失败例",
    "evidence": "记录CPU/GPU时间与画质",
    "warning": "只按现代Unity API重写而删除固定管线、VertexLit和Surface Shader，会丢失原书用于解释渲染路径演进的核心链路。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function UslOfficialLearningMapPipelineLab(){return <UnityShaderLab title="《Unity 3D ShaderLab开发实战详解》全书导览：执行链" mode="roadmap" snapshots={SNAPSHOTS} initial={0}/>;}
export function UslOfficialLearningMapCompareLab(){return <UnityShaderLab title="《Unity 3D ShaderLab开发实战详解》全书导览：对照实验" mode="roadmap" snapshots={SNAPSHOTS} initial={2}/>;}
export function UslOfficialLearningMapEvidenceLab(){return <UnityShaderLab title="《Unity 3D ShaderLab开发实战详解》全书导览：验收证书" mode="roadmap" snapshots={SNAPSHOTS} initial={4}/>;}
