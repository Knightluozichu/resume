import { ShaderXSeriesLab, type ShaderXSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "身份",
    "stage": "原篇身份与问题",
    "action": "固定8册中的卷号、篇名和21篇唯一归属",
    "evidence": "authorized PDF / official TOC + article id",
    "warning": "只比较三角形数量，没有检查共享边、法线、阴影和运动向量是否一致。"
  },
  {
    "label": "模型",
    "stage": "几何表示",
    "action": "提取输入、输出、公式、数据依赖和精度",
    "evidence": "invariant + producer-consumer graph",
    "warning": "现代实现必须明确保持、近似或放弃了哪条关系。"
  },
  {
    "label": "迁移",
    "stage": "共享边约束",
    "action": "建立历史载体、CPU参考和现代GPU双路径",
    "evidence": "reference + translated implementation",
    "warning": "API名称相似不代表数据顺序、精度和同步等价。"
  },
  {
    "label": "捕获",
    "stage": "带宽预算",
    "action": "保存中间缓冲、图像、数值和GPU事件",
    "evidence": "buffers + diff + GPU capture",
    "warning": "单张最终截图无法定位错误来自哪一个阶段。"
  },
  {
    "label": "验收",
    "stage": "几何证书",
    "action": "重放正常、边界、失败和性能条件",
    "evidence": "failure replay + target-device metrics",
    "warning": "把实例或压缩当作零成本，遗漏解码ALU、缓存命中和最坏视角。"
  }
] as const satisfies ReadonlyArray<ShaderXSnapshot>;

export function SxxGeometryDataMapLab(){return <ShaderXSeriesLab title="几何数据、拓扑与细分：21篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function SxxGeometryDataExperimentLab(){return <ShaderXSeriesLab title="几何数据、拓扑与细分：21篇复现" mode="experiment" snapshots={SNAPSHOTS} initial={2}/>;}
export function SxxGeometryDataEvidenceLab(){return <ShaderXSeriesLab title="几何数据、拓扑与细分：21篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
