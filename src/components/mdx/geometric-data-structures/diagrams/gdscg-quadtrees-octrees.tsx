import { GeometricDataOfficialLab, type GeometricSnapshot } from "./official-lab";

const SNAPSHOTS = [
  {
    "label": "输入",
    "object": "四叉树",
    "transform": "固定对象、维数、查询与边界语义",
    "certificate": "保存原始输入与版本",
    "warning": "所有点重合会把树推到最大深度；点正落在中线时若左右都接收会重复计数；相邻叶深度差过大会让等值面断裂。设置最大深度、最小单元和统一半开区间，并对跨层邻接做平衡或缝合。"
  },
  {
    "label": "构建",
    "object": "八叉树",
    "transform": "建立节点、邻接或证书不变量",
    "certificate": "逐节点检查覆盖和唯一归属",
    "warning": "把位于分割线上的点同时插入两个孩子，节点数随深度指数增长并产生重复命中。"
  },
  {
    "label": "查询",
    "object": "Morton编码",
    "transform": "按可证明条件剪枝并收集候选",
    "certificate": "记录访问轨迹和候选集合",
    "warning": "使用半开区间和唯一子索引，另为根域最大边界保留显式闭合规则。"
  },
  {
    "label": "更新",
    "object": "自适应细分",
    "transform": "局部修复、重拟合或触发重建",
    "certificate": "比较更新前后不变量",
    "warning": "所有点重合会把树推到最大深度；点正落在中线时若左右都接收会重复计数；相邻叶深度差过大会让等值面断裂。设置最大深度、最小单元和统一半开区间，并对跨层邻接做平衡或缝合。"
  },
  {
    "label": "验收",
    "object": "邻接平衡",
    "transform": "与穷举或精确基线逐项比较",
    "certificate": "输出结果差异、成本和反例",
    "warning": "把位于分割线上的点同时插入两个孩子，节点数随深度指数增长并产生重复命中。"
  }
] as const satisfies ReadonlyArray<GeometricSnapshot>;

export function GdscgQuadtreesOctreesObjectLab() {
  return <GeometricDataOfficialLab title="第1章 四叉树与八叉树：对象与不变量" caption="先固定对象、空间和边界语义，再观察结构如何组织候选。" mode="quadtree" snapshots={SNAPSHOTS} initial={0} />;
}

export function GdscgQuadtreesOctreesQueryLab() {
  return <GeometricDataOfficialLab title="第1章 四叉树与八叉树：查询与更新" caption="拖动规模与查询范围，比较访问节点、候选和证书变化。" mode="quadtree" snapshots={SNAPSHOTS} initial={2} />;
}

export function GdscgQuadtreesOctreesEvidenceLab() {
  return <GeometricDataOfficialLab title="第1章 四叉树与八叉树：验收证书" caption="从结果回放到剪枝、谓词、边界与复杂度计数。" mode="quadtree" snapshots={SNAPSHOTS} initial={4} />;
}
