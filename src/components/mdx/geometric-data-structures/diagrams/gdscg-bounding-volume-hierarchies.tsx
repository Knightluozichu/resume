import { GeometricDataOfficialLab, type GeometricSnapshot } from "./official-lab";

const SNAPSHOTS = [
  {
    "label": "输入",
    "object": "包围体层次",
    "transform": "固定对象、维数、查询与边界语义",
    "certificate": "保存原始输入与版本",
    "warning": "无限平面不能直接放入有限AABB；零面积三角形和NaN会污染所有父盒；两个盒只接触边界是否算碰撞必须与窄相一致。形变后只更新叶不更新祖先会产生假阴性。"
  },
  {
    "label": "构建",
    "object": "AABB",
    "transform": "建立节点、邻接或证书不变量",
    "certificate": "逐节点检查覆盖和唯一归属",
    "warning": "只追求最小根包围盒，却把高度重叠的子集合分到两个孩子，遍历几乎同时访问两侧。"
  },
  {
    "label": "查询",
    "object": "k-DOP",
    "transform": "按可证明条件剪枝并收集候选",
    "certificate": "记录访问轨迹和候选集合",
    "warning": "用预期遍历成本评估候选分裂，并把子包围体重叠率作为重建信号。"
  },
  {
    "label": "更新",
    "object": "同步遍历",
    "transform": "局部修复、重拟合或触发重建",
    "certificate": "比较更新前后不变量",
    "warning": "无限平面不能直接放入有限AABB；零面积三角形和NaN会污染所有父盒；两个盒只接触边界是否算碰撞必须与窄相一致。形变后只更新叶不更新祖先会产生假阴性。"
  },
  {
    "label": "验收",
    "object": "重拟合",
    "transform": "与穷举或精确基线逐项比较",
    "certificate": "输出结果差异、成本和反例",
    "warning": "只追求最小根包围盒，却把高度重叠的子集合分到两个孩子，遍历几乎同时访问两侧。"
  }
] as const satisfies ReadonlyArray<GeometricSnapshot>;

export function GdscgBoundingVolumeHierarchiesObjectLab() {
  return <GeometricDataOfficialLab title="第4章 包围体层次：对象与不变量" caption="先固定对象、空间和边界语义，再观察结构如何组织候选。" mode="bvh" snapshots={SNAPSHOTS} initial={0} />;
}

export function GdscgBoundingVolumeHierarchiesQueryLab() {
  return <GeometricDataOfficialLab title="第4章 包围体层次：查询与更新" caption="拖动规模与查询范围，比较访问节点、候选和证书变化。" mode="bvh" snapshots={SNAPSHOTS} initial={2} />;
}

export function GdscgBoundingVolumeHierarchiesEvidenceLab() {
  return <GeometricDataOfficialLab title="第4章 包围体层次：验收证书" caption="从结果回放到剪枝、谓词、边界与复杂度计数。" mode="bvh" snapshots={SNAPSHOTS} initial={4} />;
}
