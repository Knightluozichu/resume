import { PracticalShaderLab, type PracticalSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "帧时间",
    "action": "固定网格、纹理、相机、灯光和版本",
    "evidence": "保存资源哈希与参数",
    "warning": "VSync锁在60fps时优化前后读数相同，便断言优化无效。"
  },
  {
    "label": "顶点",
    "stage": "CPU瓶颈",
    "action": "检查属性、矩阵、空间与插值输出",
    "evidence": "显示位置、法线或UV",
    "warning": "向量必须标注空间和归一化状态。"
  },
  {
    "label": "片元",
    "stage": "GPU瓶颈",
    "action": "执行纹理、光照或透明计算",
    "evidence": "逐项关闭并保存A/B图",
    "warning": "片元颜色仍受深度与混合影响。"
  },
  {
    "label": "状态",
    "stage": "VSync",
    "action": "核对深度、剔除、混合和目标",
    "evidence": "保存GPU事件与缓冲",
    "warning": "GLSL不能独自声明所有固定管线状态。"
  },
  {
    "label": "验收",
    "stage": "GPU捕获",
    "action": "比较正确性、性能、精度与移植",
    "evidence": "重放基线和失败反例",
    "warning": "VSync锁在60fps时优化前后读数相同，便断言优化无效。"
  }
] as const satisfies ReadonlyArray<PracticalSnapshot>;
export function PsdProfilingShadersPipelineLab(){return <PracticalShaderLab title="第13章 剖析着色器性能：数据流" mode="performance" snapshots={SNAPSHOTS} initial={0}/>;}
export function PsdProfilingShadersCompareLab(){return <PracticalShaderLab title="第13章 剖析着色器性能：A/B实验" mode="performance" snapshots={SNAPSHOTS} initial={2}/>;}
export function PsdProfilingShadersEvidenceLab(){return <PracticalShaderLab title="第13章 剖析着色器性能：验收证书" mode="performance" snapshots={SNAPSHOTS} initial={4}/>;}
