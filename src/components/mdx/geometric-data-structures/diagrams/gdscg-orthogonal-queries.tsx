import { GeometricDataOfficialLab, type GeometricSnapshot } from "./official-lab";

const SNAPSHOTS = [
  {
    "label": "输入",
    "object": "刺穿查询",
    "transform": "固定对象、维数、查询与边界语义",
    "certificate": "保存原始输入与版本",
    "warning": "零长度区间、端点相接、重复坐标和查询窗零面积会暴露闭区间约定冲突。高维范围树内存快速增长，kd树在高维也会接近全扫描；报告复杂度时应同时给维数和输出规模。"
  },
  {
    "label": "构建",
    "object": "窗口查询",
    "transform": "建立节点、邻接或证书不变量",
    "certificate": "逐节点检查覆盖和唯一归属",
    "warning": "只报告访问节点为对数级，却忽略查询返回了接近全部对象，声称总时间仍为对数。"
  },
  {
    "label": "查询",
    "object": "线段树",
    "transform": "按可证明条件剪枝并收集候选",
    "certificate": "记录访问轨迹和候选集合",
    "warning": "把复杂度写成搜索开销加输出规模，并单独统计候选与最终命中。"
  },
  {
    "label": "更新",
    "object": "kd树",
    "transform": "局部修复、重拟合或触发重建",
    "certificate": "比较更新前后不变量",
    "warning": "零长度区间、端点相接、重复坐标和查询窗零面积会暴露闭区间约定冲突。高维范围树内存快速增长，kd树在高维也会接近全扫描；报告复杂度时应同时给维数和输出规模。"
  },
  {
    "label": "验收",
    "object": "范围树",
    "transform": "与穷举或精确基线逐项比较",
    "certificate": "输出结果差异、成本和反例",
    "warning": "只报告访问节点为对数级，却忽略查询返回了接近全部对象，声称总时间仍为对数。"
  }
] as const satisfies ReadonlyArray<GeometricSnapshot>;

export function GdscgOrthogonalQueriesObjectLab() {
  return <GeometricDataOfficialLab title="第2章 正交窗口与刺穿查询：对象与不变量" caption="先固定对象、空间和边界语义，再观察结构如何组织候选。" mode="range" snapshots={SNAPSHOTS} initial={0} />;
}

export function GdscgOrthogonalQueriesQueryLab() {
  return <GeometricDataOfficialLab title="第2章 正交窗口与刺穿查询：查询与更新" caption="拖动规模与查询范围，比较访问节点、候选和证书变化。" mode="range" snapshots={SNAPSHOTS} initial={2} />;
}

export function GdscgOrthogonalQueriesEvidenceLab() {
  return <GeometricDataOfficialLab title="第2章 正交窗口与刺穿查询：验收证书" caption="从结果回放到剪枝、谓词、边界与复杂度计数。" mode="range" snapshots={SNAPSHOTS} initial={4} />;
}
