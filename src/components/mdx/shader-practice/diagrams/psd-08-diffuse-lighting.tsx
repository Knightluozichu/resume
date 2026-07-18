import { PracticalShaderLab, type PracticalSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "平滑着色",
    "action": "固定网格、纹理、相机、灯光和版本",
    "evidence": "保存资源哈希与参数",
    "warning": "法线经过插值后不重新归一化，模型边缘和缩放后亮度错误。"
  },
  {
    "label": "顶点",
    "stage": "平面着色",
    "action": "检查属性、矩阵、空间与插值输出",
    "evidence": "显示位置、法线或UV",
    "warning": "向量必须标注空间和归一化状态。"
  },
  {
    "label": "片元",
    "stage": "法线矩阵",
    "action": "执行纹理、光照或透明计算",
    "evidence": "逐项关闭并保存A/B图",
    "warning": "片元颜色仍受深度与混合影响。"
  },
  {
    "label": "状态",
    "stage": "Lambert项",
    "action": "核对深度、剔除、混合和目标",
    "evidence": "保存GPU事件与缓冲",
    "warning": "GLSL不能独自声明所有固定管线状态。"
  },
  {
    "label": "验收",
    "stage": "轮廓光",
    "action": "比较正确性、性能、精度与移植",
    "evidence": "重放基线和失败反例",
    "warning": "法线经过插值后不重新归一化，模型边缘和缩放后亮度错误。"
  }
] as const satisfies ReadonlyArray<PracticalSnapshot>;
export function PsdDiffuseLightingPipelineLab(){return <PracticalShaderLab title="第8章 漫反射光照：数据流" mode="lighting" snapshots={SNAPSHOTS} initial={0}/>;}
export function PsdDiffuseLightingCompareLab(){return <PracticalShaderLab title="第8章 漫反射光照：A/B实验" mode="lighting" snapshots={SNAPSHOTS} initial={2}/>;}
export function PsdDiffuseLightingEvidenceLab(){return <PracticalShaderLab title="第8章 漫反射光照：验收证书" mode="lighting" snapshots={SNAPSHOTS} initial={4}/>;}
