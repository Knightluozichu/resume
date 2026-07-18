import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "球体近似",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "保存资源哈希与参数",
    "warning": "用一个过大的球覆盖细长物体，性能虽稳定但阴影面积严重高估。"
  },
  {
    "label": "结构",
    "stage": "光线球交",
    "action": "检查SubShader、Pass、标签和空间",
    "evidence": "显示阶段输入与中间值",
    "warning": "先确认实际执行路径，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "软边函数",
    "action": "逐项打开本章公式或效果",
    "evidence": "保存正常图与差分图",
    "warning": "所有方向、深度和颜色都要标注空间与范围。"
  },
  {
    "label": "状态",
    "stage": "包围误差",
    "action": "核对深度、模板、混合和目标",
    "evidence": "保存Frame Debugger与GPU事件",
    "warning": "Shader代码不能独自决定全部渲染状态。"
  },
  {
    "label": "验收",
    "stage": "代理阴影",
    "action": "重放正确例、边界例和失败例",
    "evidence": "记录CPU/GPU时间与画质",
    "warning": "用一个过大的球覆盖细长物体，性能虽稳定但阴影面积严重高估。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usl11SphericalShadowsPipelineLab(){return <UnityShaderLab title="第11章 球体阴影：执行链" mode="math" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usl11SphericalShadowsCompareLab(){return <UnityShaderLab title="第11章 球体阴影：对照实验" mode="math" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usl11SphericalShadowsEvidenceLab(){return <UnityShaderLab title="第11章 球体阴影：验收证书" mode="math" snapshots={SNAPSHOTS} initial={4}/>;}
