import { GeometricDataOfficialLab, type GeometricSnapshot } from "./official-lab";

const SNAPSHOTS = [
  {
    "label": "输入",
    "object": "BSP树",
    "transform": "固定对象、维数、查询与边界语义",
    "certificate": "保存原始输入与版本",
    "warning": "共面多边形的朝向、观察点落在分割面、细长片元和循环数值误差最容易破坏拓扑。若每次切分都重新舍入顶点，裂缝会累积；应复用交点并保存来源边。"
  },
  {
    "label": "构建",
    "object": "分类谓词",
    "transform": "建立节点、邻接或证书不变量",
    "certificate": "逐节点检查覆盖和唯一归属",
    "warning": "每次选第一个多边形作分割面，在有序输入上形成链并制造大量碎片。"
  },
  {
    "label": "查询",
    "object": "分裂片元",
    "transform": "按可证明条件剪枝并收集候选",
    "certificate": "记录访问轨迹和候选集合",
    "warning": "对候选面计算平衡与分裂联合代价，并用查询分布校正静态启发式。"
  },
  {
    "label": "更新",
    "object": "画家顺序",
    "transform": "局部修复、重拟合或触发重建",
    "certificate": "比较更新前后不变量",
    "warning": "共面多边形的朝向、观察点落在分割面、细长片元和循环数值误差最容易破坏拓扑。若每次切分都重新舍入顶点，裂缝会累积；应复用交点并保存来源边。"
  },
  {
    "label": "验收",
    "object": "代价启发式",
    "transform": "与穷举或精确基线逐项比较",
    "certificate": "输出结果差异、成本和反例",
    "warning": "每次选第一个多边形作分割面，在有序输入上形成链并制造大量碎片。"
  }
] as const satisfies ReadonlyArray<GeometricSnapshot>;

export function GdscgBspTreesObjectLab() {
  return <GeometricDataOfficialLab title="第3章 BSP树：对象与不变量" caption="先固定对象、空间和边界语义，再观察结构如何组织候选。" mode="bsp" snapshots={SNAPSHOTS} initial={0} />;
}

export function GdscgBspTreesQueryLab() {
  return <GeometricDataOfficialLab title="第3章 BSP树：查询与更新" caption="拖动规模与查询范围，比较访问节点、候选和证书变化。" mode="bsp" snapshots={SNAPSHOTS} initial={2} />;
}

export function GdscgBspTreesEvidenceLab() {
  return <GeometricDataOfficialLab title="第3章 BSP树：验收证书" caption="从结果回放到剪枝、谓词、边界与复杂度计数。" mode="bsp" snapshots={SNAPSHOTS} initial={4} />;
}
