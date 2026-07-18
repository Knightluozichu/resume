import { PracticalShaderLab, type PracticalSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "平移矩阵",
    "action": "固定网格、纹理、相机、灯光和版本",
    "evidence": "保存资源哈希与参数",
    "warning": "矩阵乘法顺序与GLSL列向量约定混淆，物体围绕世界原点而非自身中心旋转。"
  },
  {
    "label": "顶点",
    "stage": "缩放矩阵",
    "action": "检查属性、矩阵、空间与插值输出",
    "evidence": "显示位置、法线或UV",
    "warning": "向量必须标注空间和归一化状态。"
  },
  {
    "label": "片元",
    "stage": "旋转矩阵",
    "action": "执行纹理、光照或透明计算",
    "evidence": "逐项关闭并保存A/B图",
    "warning": "片元颜色仍受深度与混合影响。"
  },
  {
    "label": "状态",
    "stage": "齐次坐标",
    "action": "核对深度、剔除、混合和目标",
    "evidence": "保存GPU事件与缓冲",
    "warning": "GLSL不能独自声明所有固定管线状态。"
  },
  {
    "label": "验收",
    "stage": "单位矩阵",
    "action": "比较正确性、性能、精度与移植",
    "evidence": "重放基线和失败反例",
    "warning": "矩阵乘法顺序与GLSL列向量约定混淆，物体围绕世界原点而非自身中心旋转。"
  }
] as const satisfies ReadonlyArray<PracticalSnapshot>;
export function PsdMakingThingsMovePipelineLab(){return <PracticalShaderLab title="第5章 使物体动起来：数据流" mode="math" snapshots={SNAPSHOTS} initial={0}/>;}
export function PsdMakingThingsMoveCompareLab(){return <PracticalShaderLab title="第5章 使物体动起来：A/B实验" mode="math" snapshots={SNAPSHOTS} initial={2}/>;}
export function PsdMakingThingsMoveEvidenceLab(){return <PracticalShaderLab title="第5章 使物体动起来：验收证书" mode="math" snapshots={SNAPSHOTS} initial={4}/>;}
