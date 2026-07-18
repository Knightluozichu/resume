import { PracticalShaderLab, type PracticalSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "UV坐标",
    "action": "固定网格、纹理、相机、灯光和版本",
    "evidence": "保存资源哈希与参数",
    "warning": "纹理坐标正确但采样器绑定到错误纹理单元，画面异常时仍只修改GLSL。"
  },
  {
    "label": "顶点",
    "stage": "sampler2D",
    "action": "检查属性、矩阵、空间与插值输出",
    "evidence": "显示位置、法线或UV",
    "warning": "向量必须标注空间和归一化状态。"
  },
  {
    "label": "片元",
    "stage": "UV滚动",
    "action": "执行纹理、光照或透明计算",
    "evidence": "逐项关闭并保存A/B图",
    "warning": "片元颜色仍受深度与混合影响。"
  },
  {
    "label": "状态",
    "stage": "颜色数学",
    "action": "核对深度、剔除、混合和目标",
    "evidence": "保存GPU事件与缓冲",
    "warning": "GLSL不能独自声明所有固定管线状态。"
  },
  {
    "label": "验收",
    "stage": "mix",
    "action": "比较正确性、性能、精度与移植",
    "evidence": "重放基线和失败反例",
    "warning": "纹理坐标正确但采样器绑定到错误纹理单元，画面异常时仍只修改GLSL。"
  }
] as const satisfies ReadonlyArray<PracticalSnapshot>;
export function PsdUsingTexturesPipelineLab(){return <PracticalShaderLab title="第3章 使用纹理：数据流" mode="texture" snapshots={SNAPSHOTS} initial={0}/>;}
export function PsdUsingTexturesCompareLab(){return <PracticalShaderLab title="第3章 使用纹理：A/B实验" mode="texture" snapshots={SNAPSHOTS} initial={2}/>;}
export function PsdUsingTexturesEvidenceLab(){return <PracticalShaderLab title="第3章 使用纹理：验收证书" mode="texture" snapshots={SNAPSHOTS} initial={4}/>;}
