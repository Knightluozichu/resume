import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "固定管线",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "保存资源哈希与参数",
    "warning": "在不支持固定管线的现代平台继续依赖旧命令，编辑器显示正常而目标设备回退或变粉。"
  },
  {
    "label": "结构",
    "stage": "Material块",
    "action": "检查SubShader、Pass、标签和空间",
    "evidence": "显示阶段输入与中间值",
    "warning": "先确认实际执行路径，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "SetTexture",
    "action": "逐项打开本章公式或效果",
    "evidence": "保存正常图与差分图",
    "warning": "所有方向、深度和颜色都要标注空间与范围。"
  },
  {
    "label": "状态",
    "stage": "ColorMaterial",
    "action": "核对深度、模板、混合和目标",
    "evidence": "保存Frame Debugger与GPU事件",
    "warning": "Shader代码不能独自决定全部渲染状态。"
  },
  {
    "label": "验收",
    "stage": "Combine",
    "action": "重放正确例、边界例和失败例",
    "evidence": "记录CPU/GPU时间与画质",
    "warning": "在不支持固定管线的现代平台继续依赖旧命令，编辑器显示正常而目标设备回退或变粉。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usl16FixedFunctionPipelinePipelineLab(){return <UnityShaderLab title="第16章 固定管线：执行链" mode="texture" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usl16FixedFunctionPipelineCompareLab(){return <UnityShaderLab title="第16章 固定管线：对照实验" mode="texture" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usl16FixedFunctionPipelineEvidenceLab(){return <UnityShaderLab title="第16章 固定管线：验收证书" mode="texture" snapshots={SNAPSHOTS} initial={4}/>;}
