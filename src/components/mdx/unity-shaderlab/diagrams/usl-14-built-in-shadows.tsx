import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "ShadowCaster",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "保存资源哈希与参数",
    "warning": "复制阴影宏但遗漏对应pragma或插值字段，某个平台编译成功却始终返回无阴影。"
  },
  {
    "label": "结构",
    "stage": "AutoLight",
    "action": "检查SubShader、Pass、标签和空间",
    "evidence": "显示阶段输入与中间值",
    "warning": "先确认实际执行路径，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "阴影宏",
    "action": "逐项打开本章公式或效果",
    "evidence": "保存正常图与差分图",
    "warning": "所有方向、深度和颜色都要标注空间与范围。"
  },
  {
    "label": "状态",
    "stage": "投射接收",
    "action": "核对深度、模板、混合和目标",
    "evidence": "保存Frame Debugger与GPU事件",
    "warning": "Shader代码不能独自决定全部渲染状态。"
  },
  {
    "label": "验收",
    "stage": "变体",
    "action": "重放正确例、边界例和失败例",
    "evidence": "记录CPU/GPU时间与画质",
    "warning": "复制阴影宏但遗漏对应pragma或插值字段，某个平台编译成功却始终返回无阴影。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usl14BuiltInShadowsPipelineLab(){return <UnityShaderLab title="第14章 内置的阴影：执行链" mode="pipeline" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usl14BuiltInShadowsCompareLab(){return <UnityShaderLab title="第14章 内置的阴影：对照实验" mode="pipeline" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usl14BuiltInShadowsEvidenceLab(){return <UnityShaderLab title="第14章 内置的阴影：验收证书" mode="pipeline" snapshots={SNAPSHOTS} initial={4}/>;}
