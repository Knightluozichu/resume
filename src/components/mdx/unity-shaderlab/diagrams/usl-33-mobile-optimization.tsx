import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "Tile Based GPU",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "保存资源哈希与参数",
    "warning": "在桌面GPU上把float改成half后没有差异，就认定移动端精度和性能也无影响。"
  },
  {
    "label": "结构",
    "stage": "精度限定",
    "action": "检查SubShader、Pass、标签和空间",
    "evidence": "显示阶段输入与中间值",
    "warning": "先确认实际执行路径，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "纹理带宽",
    "action": "逐项打开本章公式或效果",
    "evidence": "保存正常图与差分图",
    "warning": "所有方向、深度和颜色都要标注空间与范围。"
  },
  {
    "label": "状态",
    "stage": "几何复杂度",
    "action": "核对深度、模板、混合和目标",
    "evidence": "保存Frame Debugger与GPU事件",
    "warning": "Shader代码不能独自决定全部渲染状态。"
  },
  {
    "label": "验收",
    "stage": "过度绘制",
    "action": "重放正确例、边界例和失败例",
    "evidence": "记录CPU/GPU时间与画质",
    "warning": "在桌面GPU上把float改成half后没有差异，就认定移动端精度和性能也无影响。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usl33MobileOptimizationPipelineLab(){return <UnityShaderLab title="第33章 移动平台上的优化：执行链" mode="performance" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usl33MobileOptimizationCompareLab(){return <UnityShaderLab title="第33章 移动平台上的优化：对照实验" mode="performance" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usl33MobileOptimizationEvidenceLab(){return <UnityShaderLab title="第33章 移动平台上的优化：验收证书" mode="performance" snapshots={SNAPSHOTS} initial={4}/>;}
