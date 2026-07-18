import { PracticalShaderLab, type PracticalSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "视图矩阵",
    "action": "固定网格、纹理、相机、灯光和版本",
    "evidence": "保存资源哈希与参数",
    "warning": "把NDC、裁剪空间和屏幕像素空间混为一谈，调试深度与UV时得到错误范围。"
  },
  {
    "label": "顶点",
    "stage": "模型矩阵",
    "action": "检查属性、矩阵、空间与插值输出",
    "evidence": "显示位置、法线或UV",
    "warning": "向量必须标注空间和归一化状态。"
  },
  {
    "label": "片元",
    "stage": "投影矩阵",
    "action": "执行纹理、光照或透明计算",
    "evidence": "逐项关闭并保存A/B图",
    "warning": "片元颜色仍受深度与混合影响。"
  },
  {
    "label": "状态",
    "stage": "视锥体",
    "action": "核对深度、剔除、混合和目标",
    "evidence": "保存GPU事件与缓冲",
    "warning": "GLSL不能独自声明所有固定管线状态。"
  },
  {
    "label": "验收",
    "stage": "透视除法",
    "action": "比较正确性、性能、精度与移植",
    "evidence": "重放基线和失败反例",
    "warning": "把NDC、裁剪空间和屏幕像素空间混为一谈，调试深度与UV时得到错误范围。"
  }
] as const satisfies ReadonlyArray<PracticalSnapshot>;
export function PsdCamerasCoordinatesPipelineLab(){return <PracticalShaderLab title="第6章 摄像机和坐标：数据流" mode="math" snapshots={SNAPSHOTS} initial={0}/>;}
export function PsdCamerasCoordinatesCompareLab(){return <PracticalShaderLab title="第6章 摄像机和坐标：A/B实验" mode="math" snapshots={SNAPSHOTS} initial={2}/>;}
export function PsdCamerasCoordinatesEvidenceLab(){return <PracticalShaderLab title="第6章 摄像机和坐标：验收证书" mode="math" snapshots={SNAPSHOTS} initial={4}/>;}
