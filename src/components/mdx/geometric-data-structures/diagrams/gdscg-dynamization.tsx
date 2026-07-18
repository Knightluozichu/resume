import { GeometricDataOfficialLab, type GeometricSnapshot } from "./official-lab";

const SNAPSHOTS = [
  {
    "label": "输入",
    "object": "动态化",
    "transform": "固定对象、维数、查询与边界语义",
    "certificate": "保存原始输入与版本",
    "warning": "重复键、删除不存在元素、全删空块和更新期间查询会暴露版本语义。若查询只看新块而遗漏尚未迁移的旧块会产生假阴性；若两边都返回又不去重会重复报告。"
  },
  {
    "label": "构建",
    "object": "二进制分解",
    "transform": "建立节点、邻接或证书不变量",
    "certificate": "逐节点检查覆盖和唯一归属",
    "warning": "只做懒删除从不重建，逻辑集合很小但查询仍扫描历史上所有元素。"
  },
  {
    "label": "查询",
    "object": "摊还分析",
    "transform": "按可证明条件剪枝并收集候选",
    "certificate": "记录访问轨迹和候选集合",
    "warning": "按半大小规则清理墓碑，并把重建成本记入触发它的更新序列。"
  },
  {
    "label": "更新",
    "object": "半大小规则",
    "transform": "局部修复、重拟合或触发重建",
    "certificate": "比较更新前后不变量",
    "warning": "重复键、删除不存在元素、全删空块和更新期间查询会暴露版本语义。若查询只看新块而遗漏尚未迁移的旧块会产生假阴性；若两边都返回又不去重会重复报告。"
  },
  {
    "label": "验收",
    "object": "全局重建",
    "transform": "与穷举或精确基线逐项比较",
    "certificate": "输出结果差异、成本和反例",
    "warning": "只做懒删除从不重建，逻辑集合很小但查询仍扫描历史上所有元素。"
  }
] as const satisfies ReadonlyArray<GeometricSnapshot>;

export function GdscgDynamizationObjectLab() {
  return <GeometricDataOfficialLab title="第10章 几何数据结构动态化：对象与不变量" caption="先固定对象、空间和边界语义，再观察结构如何组织候选。" mode="dynamic" snapshots={SNAPSHOTS} initial={0} />;
}

export function GdscgDynamizationQueryLab() {
  return <GeometricDataOfficialLab title="第10章 几何数据结构动态化：查询与更新" caption="拖动规模与查询范围，比较访问节点、候选和证书变化。" mode="dynamic" snapshots={SNAPSHOTS} initial={2} />;
}

export function GdscgDynamizationEvidenceLab() {
  return <GeometricDataOfficialLab title="第10章 几何数据结构动态化：验收证书" caption="从结果回放到剪枝、谓词、边界与复杂度计数。" mode="dynamic" snapshots={SNAPSHOTS} initial={4} />;
}
