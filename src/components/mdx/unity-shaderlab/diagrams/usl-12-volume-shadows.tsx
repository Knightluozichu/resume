import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "阴影体",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "保存资源哈希与参数",
    "warning": "阴影体没有封闭或轮廓邻接错误，模板计数失衡造成整屏黑块。"
  },
  {
    "label": "结构",
    "stage": "轮廓边",
    "action": "检查SubShader、Pass、标签和空间",
    "evidence": "显示阶段输入与中间值",
    "warning": "先确认实际执行路径，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "模板计数",
    "action": "逐项打开本章公式或效果",
    "evidence": "保存正常图与差分图",
    "warning": "所有方向、深度和颜色都要标注空间与范围。"
  },
  {
    "label": "状态",
    "stage": "Z-pass",
    "action": "核对深度、模板、混合和目标",
    "evidence": "保存Frame Debugger与GPU事件",
    "warning": "Shader代码不能独自决定全部渲染状态。"
  },
  {
    "label": "验收",
    "stage": "Z-fail",
    "action": "重放正确例、边界例和失败例",
    "evidence": "记录CPU/GPU时间与画质",
    "warning": "阴影体没有封闭或轮廓邻接错误，模板计数失衡造成整屏黑块。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usl12VolumeShadowsPipelineLab(){return <UnityShaderLab title="第12章 体积阴影：执行链" mode="pipeline" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usl12VolumeShadowsCompareLab(){return <UnityShaderLab title="第12章 体积阴影：对照实验" mode="pipeline" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usl12VolumeShadowsEvidenceLab(){return <UnityShaderLab title="第12章 体积阴影：验收证书" mode="pipeline" snapshots={SNAPSHOTS} initial={4}/>;}
