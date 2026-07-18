import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "模型空间",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "保存资源哈希与参数",
    "warning": "把不同空间的向量直接点乘，画面在单位对象上看似正确，旋转、缩放或移动相机后立即失真。"
  },
  {
    "label": "结构",
    "stage": "世界空间",
    "action": "检查SubShader、Pass、标签和空间",
    "evidence": "显示阶段输入与中间值",
    "warning": "先确认实际执行路径，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "视空间",
    "action": "逐项打开本章公式或效果",
    "evidence": "保存正常图与差分图",
    "warning": "所有方向、深度和颜色都要标注空间与范围。"
  },
  {
    "label": "状态",
    "stage": "裁剪空间",
    "action": "核对深度、模板、混合和目标",
    "evidence": "保存Frame Debugger与GPU事件",
    "warning": "Shader代码不能独自决定全部渲染状态。"
  },
  {
    "label": "验收",
    "stage": "投影矩阵",
    "action": "重放正确例、边界例和失败例",
    "evidence": "记录CPU/GPU时间与画质",
    "warning": "把不同空间的向量直接点乘，画面在单位对象上看似正确，旋转、缩放或移动相机后立即失真。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usl03CoordinateSpacesPipelineLab(){return <UnityShaderLab title="第3章 Shader（着色器）中用到的各种空间概念：执行链" mode="math" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usl03CoordinateSpacesCompareLab(){return <UnityShaderLab title="第3章 Shader（着色器）中用到的各种空间概念：对照实验" mode="math" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usl03CoordinateSpacesEvidenceLab(){return <UnityShaderLab title="第3章 Shader（着色器）中用到的各种空间概念：验收证书" mode="math" snapshots={SNAPSHOTS} initial={4}/>;}
