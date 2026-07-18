import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "阴影贴图",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "保存资源哈希与参数",
    "warning": "用常量大偏差消除痤疮，导致接触阴影悬浮且薄物体完全漏影。"
  },
  {
    "label": "结构",
    "stage": "光空间坐标",
    "action": "检查SubShader、Pass、标签和空间",
    "evidence": "显示阶段输入与中间值",
    "warning": "先确认实际执行路径，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "深度比较",
    "action": "逐项打开本章公式或效果",
    "evidence": "保存正常图与差分图",
    "warning": "所有方向、深度和颜色都要标注空间与范围。"
  },
  {
    "label": "状态",
    "stage": "深度偏差",
    "action": "核对深度、模板、混合和目标",
    "evidence": "保存Frame Debugger与GPU事件",
    "warning": "Shader代码不能独自决定全部渲染状态。"
  },
  {
    "label": "验收",
    "stage": "采样滤波",
    "action": "重放正确例、边界例和失败例",
    "evidence": "记录CPU/GPU时间与画质",
    "warning": "用常量大偏差消除痤疮，导致接触阴影悬浮且薄物体完全漏影。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usl13ShadowMappingPipelineLab(){return <UnityShaderLab title="第13章 阴影映射：执行链" mode="texture" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usl13ShadowMappingCompareLab(){return <UnityShaderLab title="第13章 阴影映射：对照实验" mode="texture" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usl13ShadowMappingEvidenceLab(){return <UnityShaderLab title="第13章 阴影映射：验收证书" mode="texture" snapshots={SNAPSHOTS} initial={4}/>;}
