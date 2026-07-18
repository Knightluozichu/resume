import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "Phong高光",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "资源哈希与参数",
    "warning": "把未归一化插值法线直接用于高指数高光，镜头移动时高光形状跳变。"
  },
  {
    "label": "结构",
    "stage": "Blinn-Phong",
    "action": "核对属性、空间、Pass和脚本绑定",
    "evidence": "中间值调试图",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "高光遮罩",
    "action": "逐项打开公式与效果并保存A/B图",
    "evidence": "源图与候选图",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "状态",
    "stage": "金属高光",
    "action": "核对深度、混合、目标和执行顺序",
    "evidence": "Frame Debugger与GPU事件",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "验收",
    "stage": "各向异性",
    "action": "重放正常例、边界例和失败例",
    "evidence": "CPU/GPU时间与画质差分",
    "warning": "把未归一化插值法线直接用于高指数高光，镜头移动时高光形状跳变。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usf03SpecularReflectionPipelineLab(){return <UnityShaderLab title="第3章 利用镜面反射让游戏闪耀起来：执行链" mode="lighting" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usf03SpecularReflectionCompareLab(){return <UnityShaderLab title="第3章 利用镜面反射让游戏闪耀起来：对照实验" mode="lighting" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usf03SpecularReflectionEvidenceLab(){return <UnityShaderLab title="第3章 利用镜面反射让游戏闪耀起来：验收证书" mode="lighting" snapshots={SNAPSHOTS} initial={4}/>;}
