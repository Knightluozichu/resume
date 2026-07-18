import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "ShaderLab",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "保存资源哈希与参数",
    "warning": "只修改Cg代码却忽略Queue、RenderType、LightMode或Fallback，导致执行的是另一条Pass或另一份SubShader。"
  },
  {
    "label": "结构",
    "stage": "SubShader",
    "action": "检查SubShader、Pass、标签和空间",
    "evidence": "显示阶段输入与中间值",
    "warning": "先确认实际执行路径，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "Pass",
    "action": "逐项打开本章公式或效果",
    "evidence": "保存正常图与差分图",
    "warning": "所有方向、深度和颜色都要标注空间与范围。"
  },
  {
    "label": "状态",
    "stage": "Fallback",
    "action": "核对深度、模板、混合和目标",
    "evidence": "保存Frame Debugger与GPU事件",
    "warning": "Shader代码不能独自决定全部渲染状态。"
  },
  {
    "label": "验收",
    "stage": "Properties",
    "action": "重放正确例、边界例和失败例",
    "evidence": "记录CPU/GPU时间与画质",
    "warning": "只修改Cg代码却忽略Queue、RenderType、LightMode或Fallback，导致执行的是另一条Pass或另一份SubShader。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usl02UnityShaderFormsPipelineLab(){return <UnityShaderLab title="第2章 Unity中Shader（着色器）的形态：执行链" mode="pipeline" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usl02UnityShaderFormsCompareLab(){return <UnityShaderLab title="第2章 Unity中Shader（着色器）的形态：对照实验" mode="pipeline" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usl02UnityShaderFormsEvidenceLab(){return <UnityShaderLab title="第2章 Unity中Shader（着色器）的形态：验收证书" mode="pipeline" snapshots={SNAPSHOTS} initial={4}/>;}
