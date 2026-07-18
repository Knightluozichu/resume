import { PracticalShaderLab, type PracticalSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "网格加载",
    "action": "固定网格、纹理、相机、灯光和版本",
    "evidence": "保存资源哈希与参数",
    "warning": "模型能显示就算完成，未检查索引绕序、背面剔除、深度和属性通道。"
  },
  {
    "label": "顶点",
    "stage": "索引缓冲",
    "action": "检查属性、矩阵、空间与插值输出",
    "evidence": "显示位置、法线或UV",
    "warning": "向量必须标注空间和归一化状态。"
  },
  {
    "label": "片元",
    "stage": "透视摄像机",
    "action": "执行纹理、光照或透明计算",
    "evidence": "逐项关闭并保存A/B图",
    "warning": "片元颜色仍受深度与混合影响。"
  },
  {
    "label": "状态",
    "stage": "MVP链",
    "action": "核对深度、剔除、混合和目标",
    "evidence": "保存GPU事件与缓冲",
    "warning": "GLSL不能独自声明所有固定管线状态。"
  },
  {
    "label": "验收",
    "stage": "深度缓冲",
    "action": "比较正确性、性能、精度与移植",
    "evidence": "重放基线和失败反例",
    "warning": "模型能显示就算完成，未检查索引绕序、背面剔除、深度和属性通道。"
  }
] as const satisfies ReadonlyArray<PracticalSnapshot>;
export function PsdFirst3dProjectPipelineLab(){return <PracticalShaderLab title="第7章 第一个3D项目：数据流" mode="pipeline" snapshots={SNAPSHOTS} initial={0}/>;}
export function PsdFirst3dProjectCompareLab(){return <PracticalShaderLab title="第7章 第一个3D项目：A/B实验" mode="pipeline" snapshots={SNAPSHOTS} initial={2}/>;}
export function PsdFirst3dProjectEvidenceLab(){return <PracticalShaderLab title="第7章 第一个3D项目：验收证书" mode="pipeline" snapshots={SNAPSHOTS} initial={4}/>;}
