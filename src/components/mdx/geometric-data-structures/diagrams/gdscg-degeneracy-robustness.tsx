import { GeometricDataOfficialLab, type GeometricSnapshot } from "./official-lab";

const SNAPSHOTS = [
  {
    "label": "输入",
    "object": "鲁棒谓词",
    "transform": "固定对象、维数、查询与边界语义",
    "certificate": "保存原始输入与版本",
    "warning": "统一epsilon不具尺度不变性，可能同时产生a在b左侧和b在a左侧；NaN比较会静默落入错误分支；直接随机扰动不能复现。鲁棒性不仅是避免崩溃，还要维持组合不变量。"
  },
  {
    "label": "构建",
    "object": "精确几何计算",
    "transform": "建立节点、邻接或证书不变量",
    "certificate": "逐节点检查覆盖和唯一归属",
    "warning": "把所有绝对值小于固定epsilon的方向值判为零，不同尺度下得到矛盾的点在线段两侧关系。"
  },
  {
    "label": "查询",
    "object": "退化",
    "transform": "按可证明条件剪枝并收集候选",
    "certificate": "记录访问轨迹和候选集合",
    "warning": "使用带推导误差界的过滤谓词，并为精确零值提供确定性退化处理。"
  },
  {
    "label": "更新",
    "object": "符号扰动",
    "transform": "局部修复、重拟合或触发重建",
    "certificate": "比较更新前后不变量",
    "warning": "统一epsilon不具尺度不变性，可能同时产生a在b左侧和b在a左侧；NaN比较会静默落入错误分支；直接随机扰动不能复现。鲁棒性不仅是避免崩溃，还要维持组合不变量。"
  },
  {
    "label": "验收",
    "object": "误差过滤器",
    "transform": "与穷举或精确基线逐项比较",
    "certificate": "输出结果差异、成本和反例",
    "warning": "把所有绝对值小于固定epsilon的方向值判为零，不同尺度下得到矛盾的点在线段两侧关系。"
  }
] as const satisfies ReadonlyArray<GeometricSnapshot>;

export function GdscgDegeneracyRobustnessObjectLab() {
  return <GeometricDataOfficialLab title="第9章 退化与鲁棒性：对象与不变量" caption="先固定对象、空间和边界语义，再观察结构如何组织候选。" mode="robust" snapshots={SNAPSHOTS} initial={0} />;
}

export function GdscgDegeneracyRobustnessQueryLab() {
  return <GeometricDataOfficialLab title="第9章 退化与鲁棒性：查询与更新" caption="拖动规模与查询范围，比较访问节点、候选和证书变化。" mode="robust" snapshots={SNAPSHOTS} initial={2} />;
}

export function GdscgDegeneracyRobustnessEvidenceLab() {
  return <GeometricDataOfficialLab title="第9章 退化与鲁棒性：验收证书" caption="从结果回放到剪枝、谓词、边界与复杂度计数。" mode="robust" snapshots={SNAPSHOTS} initial={4} />;
}
