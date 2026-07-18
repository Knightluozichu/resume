import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "cginc",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "保存资源哈希与参数",
    "warning": "把每个布尔功能都做成独立关键字，十几个开关产生无法管理的变体组合。"
  },
  {
    "label": "结构",
    "stage": "UsePass",
    "action": "检查SubShader、Pass、标签和空间",
    "evidence": "显示阶段输入与中间值",
    "warning": "先确认实际执行路径，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "关键字",
    "action": "逐项打开本章公式或效果",
    "evidence": "保存正常图与差分图",
    "warning": "所有方向、深度和颜色都要标注空间与范围。"
  },
  {
    "label": "状态",
    "stage": "multi_compile",
    "action": "核对深度、模板、混合和目标",
    "evidence": "保存Frame Debugger与GPU事件",
    "warning": "Shader代码不能独自决定全部渲染状态。"
  },
  {
    "label": "验收",
    "stage": "变体爆炸",
    "action": "重放正确例、边界例和失败例",
    "evidence": "记录CPU/GPU时间与画质",
    "warning": "把每个布尔功能都做成独立关键字，十几个开关产生无法管理的变体组合。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usl30OrganizationReusePipelineLab(){return <UnityShaderLab title="第30章 Shader的组织和复用：执行链" mode="pipeline" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usl30OrganizationReuseCompareLab(){return <UnityShaderLab title="第30章 Shader的组织和复用：对照实验" mode="pipeline" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usl30OrganizationReuseEvidenceLab(){return <UnityShaderLab title="第30章 Shader的组织和复用：验收证书" mode="pipeline" snapshots={SNAPSHOTS} initial={4}/>;}
