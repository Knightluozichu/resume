import { PracticalShaderLab, type PracticalSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "镜面反射",
    "action": "固定网格、纹理、相机、灯光和版本",
    "evidence": "保存资源哈希与参数",
    "warning": "用未归一化光线和观察向量计算半程向量，高光位置随距离异常漂移。"
  },
  {
    "label": "顶点",
    "stage": "Phong模型",
    "action": "检查属性、矩阵、空间与插值输出",
    "evidence": "显示位置、法线或UV",
    "warning": "向量必须标注空间和归一化状态。"
  },
  {
    "label": "片元",
    "stage": "Blinn-Phong",
    "action": "执行纹理、光照或透明计算",
    "evidence": "逐项关闭并保存A/B图",
    "warning": "片元颜色仍受深度与混合影响。"
  },
  {
    "label": "状态",
    "stage": "环境光",
    "action": "核对深度、剔除、混合和目标",
    "evidence": "保存GPU事件与缓冲",
    "warning": "GLSL不能独自声明所有固定管线状态。"
  },
  {
    "label": "验收",
    "stage": "光照纹理",
    "action": "比较正确性、性能、精度与移植",
    "evidence": "重放基线和失败反例",
    "warning": "用未归一化光线和观察向量计算半程向量，高光位置随距离异常漂移。"
  }
] as const satisfies ReadonlyArray<PracticalSnapshot>;
export function PsdFirstLightingModelPipelineLab(){return <PracticalShaderLab title="第9章 第一个光照模型：数据流" mode="lighting" snapshots={SNAPSHOTS} initial={0}/>;}
export function PsdFirstLightingModelCompareLab(){return <PracticalShaderLab title="第9章 第一个光照模型：A/B实验" mode="lighting" snapshots={SNAPSHOTS} initial={2}/>;}
export function PsdFirstLightingModelEvidenceLab(){return <PracticalShaderLab title="第9章 第一个光照模型：验收证书" mode="lighting" snapshots={SNAPSHOTS} initial={4}/>;}
