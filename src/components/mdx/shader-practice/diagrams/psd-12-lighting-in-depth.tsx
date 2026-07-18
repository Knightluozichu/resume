import { PracticalShaderLab, type PracticalSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "定向光",
    "action": "固定网格、纹理、相机、灯光和版本",
    "evidence": "保存资源哈希与参数",
    "warning": "增加光源数量后仍用常量成本描述Shader，忽略循环、uniform带宽和分支发散。"
  },
  {
    "label": "顶点",
    "stage": "点光源",
    "action": "检查属性、矩阵、空间与插值输出",
    "evidence": "显示位置、法线或UV",
    "warning": "向量必须标注空间和归一化状态。"
  },
  {
    "label": "片元",
    "stage": "聚光灯",
    "action": "执行纹理、光照或透明计算",
    "evidence": "逐项关闭并保存A/B图",
    "warning": "片元颜色仍受深度与混合影响。"
  },
  {
    "label": "状态",
    "stage": "光照衰减",
    "action": "核对深度、剔除、混合和目标",
    "evidence": "保存GPU事件与缓冲",
    "warning": "GLSL不能独自声明所有固定管线状态。"
  },
  {
    "label": "验收",
    "stage": "多光源数组",
    "action": "比较正确性、性能、精度与移植",
    "evidence": "重放基线和失败反例",
    "warning": "增加光源数量后仍用常量成本描述Shader，忽略循环、uniform带宽和分支发散。"
  }
] as const satisfies ReadonlyArray<PracticalSnapshot>;
export function PsdLightingInDepthPipelineLab(){return <PracticalShaderLab title="第12章 深入光照：数据流" mode="lighting" snapshots={SNAPSHOTS} initial={0}/>;}
export function PsdLightingInDepthCompareLab(){return <PracticalShaderLab title="第12章 深入光照：A/B实验" mode="lighting" snapshots={SNAPSHOTS} initial={2}/>;}
export function PsdLightingInDepthEvidenceLab(){return <PracticalShaderLab title="第12章 深入光照：验收证书" mode="lighting" snapshots={SNAPSHOTS} initial={4}/>;}
