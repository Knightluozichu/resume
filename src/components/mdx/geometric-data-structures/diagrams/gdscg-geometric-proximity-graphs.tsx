import { GeometricDataOfficialLab, type GeometricSnapshot } from "./official-lab";

const SNAPSHOTS = [
  {
    "label": "输入",
    "object": "相对邻域图",
    "transform": "固定对象、维数、查询与边界语义",
    "certificate": "保存原始输入与版本",
    "warning": "非均匀采样会让固定半径图断裂或跨层粘连；重复点令最近邻半径为零；边界点缺少双侧邻域。局部尺度必须保存来源和置信度，不能无条件当作表面拓扑。"
  },
  {
    "label": "构建",
    "object": "Gabriel图",
    "transform": "建立节点、邻接或证书不变量",
    "certificate": "逐节点检查覆盖和唯一归属",
    "warning": "直接在全点集做固定半径连接，稠密区域边数爆炸而稀疏区域仍断开。"
  },
  {
    "label": "查询",
    "object": "beta骨架",
    "transform": "按可证明条件剪枝并收集候选",
    "certificate": "记录访问轨迹和候选集合",
    "warning": "采用局部最近邻尺度和Delaunay候选，并用统计离群阈值裁剪过长边。"
  },
  {
    "label": "更新",
    "object": "影响球图",
    "transform": "局部修复、重拟合或触发重建",
    "certificate": "比较更新前后不变量",
    "warning": "非均匀采样会让固定半径图断裂或跨层粘连；重复点令最近邻半径为零；边界点缺少双侧邻域。局部尺度必须保存来源和置信度，不能无条件当作表面拓扑。"
  },
  {
    "label": "验收",
    "object": "包含链",
    "transform": "与穷举或精确基线逐项比较",
    "certificate": "输出结果差异、成本和反例",
    "warning": "直接在全点集做固定半径连接，稠密区域边数爆炸而稀疏区域仍断开。"
  }
] as const satisfies ReadonlyArray<GeometricSnapshot>;

export function GdscgGeometricProximityGraphsObjectLab() {
  return <GeometricDataOfficialLab title="第7章 几何邻近图：对象与不变量" caption="先固定对象、空间和边界语义，再观察结构如何组织候选。" mode="proximity" snapshots={SNAPSHOTS} initial={0} />;
}

export function GdscgGeometricProximityGraphsQueryLab() {
  return <GeometricDataOfficialLab title="第7章 几何邻近图：查询与更新" caption="拖动规模与查询范围，比较访问节点、候选和证书变化。" mode="proximity" snapshots={SNAPSHOTS} initial={2} />;
}

export function GdscgGeometricProximityGraphsEvidenceLab() {
  return <GeometricDataOfficialLab title="第7章 几何邻近图：验收证书" caption="从结果回放到剪枝、谓词、边界与复杂度计数。" mode="proximity" snapshots={SNAPSHOTS} initial={4} />;
}
