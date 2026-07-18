import { PracticalShaderLab, type PracticalSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "切线生成",
    "action": "固定网格、纹理、相机、灯光和版本",
    "evidence": "保存资源哈希与参数",
    "warning": "UV面积为零仍直接除行列式，产生NaN并污染整个共享顶点的切线。"
  },
  {
    "label": "顶点",
    "stage": "UV退化",
    "action": "检查属性、矩阵、空间与插值输出",
    "evidence": "显示位置、法线或UV",
    "warning": "向量必须标注空间和归一化状态。"
  },
  {
    "label": "片元",
    "stage": "Gram-Schmidt",
    "action": "执行纹理、光照或透明计算",
    "evidence": "逐项关闭并保存A/B图",
    "warning": "片元颜色仍受深度与混合影响。"
  },
  {
    "label": "状态",
    "stage": "cubemap封装",
    "action": "核对深度、剔除、混合和目标",
    "evidence": "保存GPU事件与缓冲",
    "warning": "GLSL不能独自声明所有固定管线状态。"
  },
  {
    "label": "验收",
    "stage": "支持代码证书",
    "action": "比较正确性、性能、精度与移植",
    "evidence": "重放基线和失败反例",
    "warning": "UV面积为零仍直接除行列式，产生NaN并污染整个共享顶点的切线。"
  }
] as const satisfies ReadonlyArray<PracticalSnapshot>;
export function PsdAppendixCodeSnippetsPipelineLab(){return <PracticalShaderLab title="附录A 重要代码片段：数据流" mode="engine" snapshots={SNAPSHOTS} initial={0}/>;}
export function PsdAppendixCodeSnippetsCompareLab(){return <PracticalShaderLab title="附录A 重要代码片段：A/B实验" mode="engine" snapshots={SNAPSHOTS} initial={2}/>;}
export function PsdAppendixCodeSnippetsEvidenceLab(){return <PracticalShaderLab title="附录A 重要代码片段：验收证书" mode="engine" snapshots={SNAPSHOTS} initial={4}/>;}
