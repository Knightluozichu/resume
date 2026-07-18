import { PracticalShaderLab, type PracticalSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "立方体贴图",
    "action": "固定网格、纹理、相机、灯光和版本",
    "evidence": "保存资源哈希与参数",
    "warning": "天空盒保留视图矩阵平移，摄像机移动时背景像近处立方体一样滑动。"
  },
  {
    "label": "顶点",
    "stage": "天空盒",
    "action": "检查属性、矩阵、空间与插值输出",
    "evidence": "显示位置、法线或UV",
    "warning": "向量必须标注空间和归一化状态。"
  },
  {
    "label": "片元",
    "stage": "方向采样",
    "action": "执行纹理、光照或透明计算",
    "evidence": "逐项关闭并保存A/B图",
    "warning": "片元颜色仍受深度与混合影响。"
  },
  {
    "label": "状态",
    "stage": "反射向量",
    "action": "核对深度、剔除、混合和目标",
    "evidence": "保存GPU事件与缓冲",
    "warning": "GLSL不能独自声明所有固定管线状态。"
  },
  {
    "label": "验收",
    "stage": "深度技巧",
    "action": "比较正确性、性能、精度与移植",
    "evidence": "重放基线和失败反例",
    "warning": "天空盒保留视图矩阵平移，摄像机移动时背景像近处立方体一样滑动。"
  }
] as const satisfies ReadonlyArray<PracticalSnapshot>;
export function PsdCubemapsSkyboxesPipelineLab(){return <PracticalShaderLab title="第11章 立方体贴图和天空盒：数据流" mode="texture" snapshots={SNAPSHOTS} initial={0}/>;}
export function PsdCubemapsSkyboxesCompareLab(){return <PracticalShaderLab title="第11章 立方体贴图和天空盒：A/B实验" mode="texture" snapshots={SNAPSHOTS} initial={2}/>;}
export function PsdCubemapsSkyboxesEvidenceLab(){return <PracticalShaderLab title="第11章 立方体贴图和天空盒：验收证书" mode="texture" snapshots={SNAPSHOTS} initial={4}/>;}
