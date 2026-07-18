import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "轮廓线",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "保存资源哈希与参数",
    "warning": "直接沿对象法线固定距离膨胀，远近线宽变化且尖角处轮廓破裂。"
  },
  {
    "label": "结构",
    "stage": "光照离散化",
    "action": "检查SubShader、Pass、标签和空间",
    "evidence": "显示阶段输入与中间值",
    "warning": "先确认实际执行路径，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "Ramp贴图",
    "action": "逐项打开本章公式或效果",
    "evidence": "保存正常图与差分图",
    "warning": "所有方向、深度和颜色都要标注空间与范围。"
  },
  {
    "label": "状态",
    "stage": "视空间挤出",
    "action": "核对深度、模板、混合和目标",
    "evidence": "保存Frame Debugger与GPU事件",
    "warning": "Shader代码不能独自决定全部渲染状态。"
  },
  {
    "label": "验收",
    "stage": "Z偏移",
    "action": "重放正确例、边界例和失败例",
    "evidence": "记录CPU/GPU时间与画质",
    "warning": "直接沿对象法线固定距离膨胀，远近线宽变化且尖角处轮廓破裂。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usl19ToonMaterialPipelineLab(){return <UnityShaderLab title="第19章 卡通材质：执行链" mode="lighting" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usl19ToonMaterialCompareLab(){return <UnityShaderLab title="第19章 卡通材质：对照实验" mode="lighting" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usl19ToonMaterialEvidenceLab(){return <UnityShaderLab title="第19章 卡通材质：验收证书" mode="lighting" snapshots={SNAPSHOTS} initial={4}/>;}
