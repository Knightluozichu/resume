import { PracticalShaderLab, type PracticalSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "alpha测试",
    "action": "固定网格、纹理、相机、灯光和版本",
    "evidence": "保存资源哈希与参数",
    "warning": "只改片元alpha却没有启用正确混合状态或排序，误以为着色器独自决定透明。"
  },
  {
    "label": "顶点",
    "stage": "深度测试",
    "action": "检查属性、矩阵、空间与插值输出",
    "evidence": "显示位置、法线或UV",
    "warning": "向量必须标注空间和归一化状态。"
  },
  {
    "label": "片元",
    "stage": "alpha混合",
    "action": "执行纹理、光照或透明计算",
    "evidence": "逐项关闭并保存A/B图",
    "warning": "片元颜色仍受深度与混合影响。"
  },
  {
    "label": "状态",
    "stage": "加法混合",
    "action": "核对深度、剔除、混合和目标",
    "evidence": "保存GPU事件与缓冲",
    "warning": "GLSL不能独自声明所有固定管线状态。"
  },
  {
    "label": "验收",
    "stage": "精灵表",
    "action": "比较正确性、性能、精度与移植",
    "evidence": "重放基线和失败反例",
    "warning": "只改片元alpha却没有启用正确混合状态或排序，误以为着色器独自决定透明。"
  }
] as const satisfies ReadonlyArray<PracticalSnapshot>;
export function PsdTranslucencyDepthPipelineLab(){return <PracticalShaderLab title="第4章 半透明与深度：数据流" mode="transparent" snapshots={SNAPSHOTS} initial={0}/>;}
export function PsdTranslucencyDepthCompareLab(){return <PracticalShaderLab title="第4章 半透明与深度：A/B实验" mode="transparent" snapshots={SNAPSHOTS} initial={2}/>;}
export function PsdTranslucencyDepthEvidenceLab(){return <PracticalShaderLab title="第4章 半透明与深度：验收证书" mode="transparent" snapshots={SNAPSHOTS} initial={4}/>;}
