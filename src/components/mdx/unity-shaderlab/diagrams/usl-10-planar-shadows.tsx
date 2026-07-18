import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "平面投影",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "保存资源哈希与参数",
    "warning": "对任意地形仍使用单一接收平面，阴影悬空或穿透后继续增加深度偏移。"
  },
  {
    "label": "结构",
    "stage": "接收平面",
    "action": "检查SubShader、Pass、标签和空间",
    "evidence": "显示阶段输入与中间值",
    "warning": "先确认实际执行路径，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "投影矩阵",
    "action": "逐项打开本章公式或效果",
    "evidence": "保存正常图与差分图",
    "warning": "所有方向、深度和颜色都要标注空间与范围。"
  },
  {
    "label": "状态",
    "stage": "共面冲突",
    "action": "核对深度、模板、混合和目标",
    "evidence": "保存Frame Debugger与GPU事件",
    "warning": "Shader代码不能独自决定全部渲染状态。"
  },
  {
    "label": "验收",
    "stage": "适用边界",
    "action": "重放正确例、边界例和失败例",
    "evidence": "记录CPU/GPU时间与画质",
    "warning": "对任意地形仍使用单一接收平面，阴影悬空或穿透后继续增加深度偏移。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usl10PlanarShadowsPipelineLab(){return <UnityShaderLab title="第10章 平面阴影：执行链" mode="math" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usl10PlanarShadowsCompareLab(){return <UnityShaderLab title="第10章 平面阴影：对照实验" mode="math" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usl10PlanarShadowsEvidenceLab(){return <UnityShaderLab title="第10章 平面阴影：验收证书" mode="math" snapshots={SNAPSHOTS} initial={4}/>;}
