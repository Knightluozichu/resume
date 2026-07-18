import { GeometricDataOfficialLab, type GeometricSnapshot } from "./official-lab";

const SNAPSHOTS = [
  {
    "label": "输入",
    "object": "Voronoi单元",
    "transform": "固定对象、维数、查询与边界语义",
    "certificate": "保存原始输入与版本",
    "warning": "重复点、三点共线、四点共圆和无限单元破坏唯一性；浮点圆内测试的符号错误会产生非流形拓扑。必须为退化输入选择一致的符号扰动或精确谓词。"
  },
  {
    "label": "构建",
    "object": "Delaunay三角剖分",
    "transform": "建立节点、邻接或证书不变量",
    "certificate": "逐节点检查覆盖和唯一归属",
    "warning": "直接用浮点行列式处理近共圆四点，不同插入顺序产生互相矛盾的边翻转。"
  },
  {
    "label": "查询",
    "object": "空圆性质",
    "transform": "按可证明条件剪枝并收集候选",
    "certificate": "记录访问轨迹和候选集合",
    "warning": "使用自适应精确方向和圆内谓词，并为真退化情况规定确定性扰动。"
  },
  {
    "label": "更新",
    "object": "约束Voronoi图",
    "transform": "局部修复、重拟合或触发重建",
    "certificate": "比较更新前后不变量",
    "warning": "重复点、三点共线、四点共圆和无限单元破坏唯一性；浮点圆内测试的符号错误会产生非流形拓扑。必须为退化输入选择一致的符号扰动或精确谓词。"
  },
  {
    "label": "验收",
    "object": "自然邻域插值",
    "transform": "与穷举或精确基线逐项比较",
    "certificate": "输出结果差异、成本和反例",
    "warning": "直接用浮点行列式处理近共圆四点，不同插入顺序产生互相矛盾的边翻转。"
  }
] as const satisfies ReadonlyArray<GeometricSnapshot>;

export function GdscgVoronoiDiagramsObjectLab() {
  return <GeometricDataOfficialLab title="第6章 Voronoi图：对象与不变量" caption="先固定对象、空间和边界语义，再观察结构如何组织候选。" mode="voronoi" snapshots={SNAPSHOTS} initial={0} />;
}

export function GdscgVoronoiDiagramsQueryLab() {
  return <GeometricDataOfficialLab title="第6章 Voronoi图：查询与更新" caption="拖动规模与查询范围，比较访问节点、候选和证书变化。" mode="voronoi" snapshots={SNAPSHOTS} initial={2} />;
}

export function GdscgVoronoiDiagramsEvidenceLab() {
  return <GeometricDataOfficialLab title="第6章 Voronoi图：验收证书" caption="从结果回放到剪枝、谓词、边界与复杂度计数。" mode="voronoi" snapshots={SNAPSHOTS} initial={4} />;
}
