import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "逐顶点计算",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "保存资源哈希与参数",
    "warning": "看到Draw Call下降就宣称优化成功，没有检查合批后顶点量、内存、透明顺序和GPU瓶颈。"
  },
  {
    "label": "结构",
    "stage": "逐像素计算",
    "action": "检查SubShader、Pass、标签和空间",
    "evidence": "显示阶段输入与中间值",
    "warning": "先确认实际执行路径，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "Draw Call",
    "action": "逐项打开本章公式或效果",
    "evidence": "保存正常图与差分图",
    "warning": "所有方向、深度和颜色都要标注空间与范围。"
  },
  {
    "label": "状态",
    "stage": "Batching",
    "action": "核对深度、模板、混合和目标",
    "evidence": "保存Frame Debugger与GPU事件",
    "warning": "Shader代码不能独自决定全部渲染状态。"
  },
  {
    "label": "验收",
    "stage": "渲染队列",
    "action": "重放正确例、边界例和失败例",
    "evidence": "记录CPU/GPU时间与画质",
    "warning": "看到Draw Call下降就宣称优化成功，没有检查合批后顶点量、内存、透明顺序和GPU瓶颈。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usl31RenderingConceptsPipelineLab(){return <UnityShaderLab title="第31章 你必须知道的渲染概念：执行链" mode="performance" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usl31RenderingConceptsCompareLab(){return <UnityShaderLab title="第31章 你必须知道的渲染概念：对照实验" mode="performance" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usl31RenderingConceptsEvidenceLab(){return <UnityShaderLab title="第31章 你必须知道的渲染概念：验收证书" mode="performance" snapshots={SNAPSHOTS} initial={4}/>;}
