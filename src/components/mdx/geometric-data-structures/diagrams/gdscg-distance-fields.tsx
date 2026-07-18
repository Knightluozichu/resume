import { GeometricDataOfficialLab, type GeometricSnapshot } from "./official-lab";

const SNAPSHOTS = [
  {
    "label": "输入",
    "object": "距离场",
    "transform": "固定对象、维数、查询与边界语义",
    "certificate": "保存原始输入与版本",
    "warning": "开放曲面没有天然内外符号；尖角和中轴附近距离不可微；离散传播依赖邻域模板，可能产生各向异性。若把近似值当严格下界用于球追踪，会越过表面。"
  },
  {
    "label": "构建",
    "object": "有符号距离",
    "transform": "建立节点、邻接或证书不变量",
    "certificate": "逐节点检查覆盖和唯一归属",
    "warning": "开放网格仍用奇偶射线决定全域符号，裂缝附近产生大片错误内区。"
  },
  {
    "label": "查询",
    "object": "传播方法",
    "transform": "按可证明条件剪枝并收集候选",
    "certificate": "记录访问轨迹和候选集合",
    "warning": "先检测封闭与定向；开放表面使用无符号距离或显式窄带语义。"
  },
  {
    "label": "更新",
    "object": "投影方法",
    "transform": "局部修复、重拟合或触发重建",
    "certificate": "比较更新前后不变量",
    "warning": "开放曲面没有天然内外符号；尖角和中轴附近距离不可微；离散传播依赖邻域模板，可能产生各向异性。若把近似值当严格下界用于球追踪，会越过表面。"
  },
  {
    "label": "验收",
    "object": "等值面",
    "transform": "与穷举或精确基线逐项比较",
    "certificate": "输出结果差异、成本和反例",
    "warning": "开放网格仍用奇偶射线决定全域符号，裂缝附近产生大片错误内区。"
  }
] as const satisfies ReadonlyArray<GeometricSnapshot>;

export function GdscgDistanceFieldsObjectLab() {
  return <GeometricDataOfficialLab title="第5章 距离场：对象与不变量" caption="先固定对象、空间和边界语义，再观察结构如何组织候选。" mode="distance" snapshots={SNAPSHOTS} initial={0} />;
}

export function GdscgDistanceFieldsQueryLab() {
  return <GeometricDataOfficialLab title="第5章 距离场：查询与更新" caption="拖动规模与查询范围，比较访问节点、候选和证书变化。" mode="distance" snapshots={SNAPSHOTS} initial={2} />;
}

export function GdscgDistanceFieldsEvidenceLab() {
  return <GeometricDataOfficialLab title="第5章 距离场：验收证书" caption="从结果回放到剪枝、谓词、边界与复杂度计数。" mode="distance" snapshots={SNAPSHOTS} initial={4} />;
}
