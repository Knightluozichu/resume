import { GeometricDataOfficialLab, type GeometricSnapshot } from "./official-lab";

const SNAPSHOTS = [
  {
    "label": "输入",
    "object": "结构选型矩阵",
    "transform": "固定对象、维数、查询与边界语义",
    "certificate": "保存原始输入与版本",
    "warning": "高维、密集重叠、近退化、事件风暴、频繁删改和空输出分别击穿不同假设。总复习不接受单一平均耗时，而要求说明渐近界、常数、内存、尾延迟和误差语义。"
  },
  {
    "label": "构建",
    "object": "剪枝证书",
    "transform": "建立节点、邻接或证书不变量",
    "certificate": "逐节点检查覆盖和唯一归属",
    "warning": "看到BVH在一个碰撞场景更快，就把它用于所有范围、最近邻和动态查询而不重新分析契约。"
  },
  {
    "label": "查询",
    "object": "拓扑证书",
    "transform": "按可证明条件剪枝并收集候选",
    "certificate": "记录访问轨迹和候选集合",
    "warning": "从查询形状、数据分布和更新模型重新推导候选，并用统一基线做交叉验收。"
  },
  {
    "label": "更新",
    "object": "更新证书",
    "transform": "局部修复、重拟合或触发重建",
    "certificate": "比较更新前后不变量",
    "warning": "高维、密集重叠、近退化、事件风暴、频繁删改和空输出分别击穿不同假设。总复习不接受单一平均耗时，而要求说明渐近界、常数、内存、尾延迟和误差语义。"
  },
  {
    "label": "验收",
    "object": "交叉验收",
    "transform": "与穷举或精确基线逐项比较",
    "certificate": "输出结果差异、成本和反例",
    "warning": "看到BVH在一个碰撞场景更快，就把它用于所有范围、最近邻和动态查询而不重新分析契约。"
  }
] as const satisfies ReadonlyArray<GeometricSnapshot>;

export function GdscgOfficialFinalReviewObjectLab() {
  return <GeometricDataOfficialLab title="《Geometric Data Structures for Computer Graphics》总复习：对象与不变量" caption="先固定对象、空间和边界语义，再观察结构如何组织候选。" mode="roadmap" snapshots={SNAPSHOTS} initial={0} />;
}

export function GdscgOfficialFinalReviewQueryLab() {
  return <GeometricDataOfficialLab title="《Geometric Data Structures for Computer Graphics》总复习：查询与更新" caption="拖动规模与查询范围，比较访问节点、候选和证书变化。" mode="roadmap" snapshots={SNAPSHOTS} initial={2} />;
}

export function GdscgOfficialFinalReviewEvidenceLab() {
  return <GeometricDataOfficialLab title="《Geometric Data Structures for Computer Graphics》总复习：验收证书" caption="从结果回放到剪枝、谓词、边界与复杂度计数。" mode="roadmap" snapshots={SNAPSHOTS} initial={4} />;
}
