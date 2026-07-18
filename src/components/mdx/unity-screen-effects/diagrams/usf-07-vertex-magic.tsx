import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "顶点颜色",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "资源哈希与参数",
    "warning": "在顶点极少的平面上实现高频波浪，继续提高频率却没有增加可表达的几何采样。"
  },
  {
    "label": "结构",
    "stage": "顶点函数",
    "action": "核对属性、空间、Pass和脚本绑定",
    "evidence": "中间值调试图",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "顶点动画",
    "action": "逐项打开公式与效果并保存A/B图",
    "evidence": "源图与候选图",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "状态",
    "stage": "插值",
    "action": "核对深度、混合、目标和执行顺序",
    "evidence": "Frame Debugger与GPU事件",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "验收",
    "stage": "地形混合",
    "action": "重放正常例、边界例和失败例",
    "evidence": "CPU/GPU时间与画质差分",
    "warning": "在顶点极少的平面上实现高频波浪，继续提高频率却没有增加可表达的几何采样。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usf07VertexMagicPipelineLab(){return <UnityShaderLab title="第7章 顶点魔法：执行链" mode="math" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usf07VertexMagicCompareLab(){return <UnityShaderLab title="第7章 顶点魔法：对照实验" mode="math" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usf07VertexMagicEvidenceLab(){return <UnityShaderLab title="第7章 顶点魔法：验收证书" mode="math" snapshots={SNAPSHOTS} initial={4}/>;}
