import { PracticalShaderLab, type PracticalSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "跨阶段证书",
    "action": "固定网格、纹理、相机、灯光和版本",
    "evidence": "保存资源哈希与参数",
    "warning": "三个引擎都出现类似画面就宣称等价，却没有核对色彩空间、光照模型、深度和混合状态。"
  },
  {
    "label": "顶点",
    "stage": "空间证书",
    "action": "检查属性、矩阵、空间与插值输出",
    "evidence": "显示位置、法线或UV",
    "warning": "向量必须标注空间和归一化状态。"
  },
  {
    "label": "片元",
    "stage": "画面证书",
    "action": "执行纹理、光照或透明计算",
    "evidence": "逐项关闭并保存A/B图",
    "warning": "片元颜色仍受深度与混合影响。"
  },
  {
    "label": "状态",
    "stage": "性能证书",
    "action": "核对深度、剔除、混合和目标",
    "evidence": "保存GPU事件与缓冲",
    "warning": "GLSL不能独自声明所有固定管线状态。"
  },
  {
    "label": "验收",
    "stage": "跨引擎映射",
    "action": "比较正确性、性能、精度与移植",
    "evidence": "重放基线和失败反例",
    "warning": "三个引擎都出现类似画面就宣称等价，却没有核对色彩空间、光照模型、深度和混合状态。"
  }
] as const satisfies ReadonlyArray<PracticalSnapshot>;
export function PsdOfficialFinalReviewPipelineLab(){return <PracticalShaderLab title="《Shader开发实战》总复习：数据流" mode="roadmap" snapshots={SNAPSHOTS} initial={0}/>;}
export function PsdOfficialFinalReviewCompareLab(){return <PracticalShaderLab title="《Shader开发实战》总复习：A/B实验" mode="roadmap" snapshots={SNAPSHOTS} initial={2}/>;}
export function PsdOfficialFinalReviewEvidenceLab(){return <PracticalShaderLab title="《Shader开发实战》总复习：验收证书" mode="roadmap" snapshots={SNAPSHOTS} initial={4}/>;}
