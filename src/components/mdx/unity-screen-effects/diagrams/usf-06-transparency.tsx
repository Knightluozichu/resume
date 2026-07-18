import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "Alpha混合",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "资源哈希与参数",
    "warning": "开启Alpha输出却仍在Geometry队列写深度，透明对象前后关系随相机变化错误。"
  },
  {
    "label": "结构",
    "stage": "Alpha裁剪",
    "action": "核对属性、空间、Pass和脚本绑定",
    "evidence": "中间值调试图",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "渲染队列",
    "action": "逐项打开公式与效果并保存A/B图",
    "evidence": "源图与候选图",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "状态",
    "stage": "深度排序",
    "action": "核对深度、混合、目标和执行顺序",
    "evidence": "Frame Debugger与GPU事件",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "验收",
    "stage": "GUI透明",
    "action": "重放正常例、边界例和失败例",
    "evidence": "CPU/GPU时间与画质差分",
    "warning": "开启Alpha输出却仍在Geometry队列写深度，透明对象前后关系随相机变化错误。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usf06TransparencyPipelineLab(){return <UnityShaderLab title="第6章 透明度：执行链" mode="transparent" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usf06TransparencyCompareLab(){return <UnityShaderLab title="第6章 透明度：对照实验" mode="transparent" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usf06TransparencyEvidenceLab(){return <UnityShaderLab title="第6章 透明度：验收证书" mode="transparent" snapshots={SNAPSHOTS} initial={4}/>;}
