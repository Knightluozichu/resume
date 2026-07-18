import { PracticalShaderLab, type PracticalSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "GLSL版本",
    "action": "固定网格、纹理、相机、灯光和版本",
    "evidence": "保存资源哈希与参数",
    "warning": "顶点输出名或类型与片元输入不匹配，却只在最终黑屏上猜测错误。"
  },
  {
    "label": "顶点",
    "stage": "顶点属性",
    "action": "检查属性、矩阵、空间与插值输出",
    "evidence": "显示位置、法线或UV",
    "warning": "向量必须标注空间和归一化状态。"
  },
  {
    "label": "片元",
    "stage": "gl_Position",
    "action": "执行纹理、光照或透明计算",
    "evidence": "逐项关闭并保存A/B图",
    "warning": "片元颜色仍受深度与混合影响。"
  },
  {
    "label": "状态",
    "stage": "插值变量",
    "action": "核对深度、剔除、混合和目标",
    "evidence": "保存GPU事件与缓冲",
    "warning": "GLSL不能独自声明所有固定管线状态。"
  },
  {
    "label": "验收",
    "stage": "uniform",
    "action": "比较正确性、性能、精度与移植",
    "evidence": "重放基线和失败反例",
    "warning": "顶点输出名或类型与片元输入不匹配，却只在最终黑屏上猜测错误。"
  }
] as const satisfies ReadonlyArray<PracticalSnapshot>;
export function PsdFirstShadersPipelineLab(){return <PracticalShaderLab title="第2章 第一个着色器：数据流" mode="shader" snapshots={SNAPSHOTS} initial={0}/>;}
export function PsdFirstShadersCompareLab(){return <PracticalShaderLab title="第2章 第一个着色器：A/B实验" mode="shader" snapshots={SNAPSHOTS} initial={2}/>;}
export function PsdFirstShadersEvidenceLab(){return <PracticalShaderLab title="第2章 第一个着色器：验收证书" mode="shader" snapshots={SNAPSHOTS} initial={4}/>;}
