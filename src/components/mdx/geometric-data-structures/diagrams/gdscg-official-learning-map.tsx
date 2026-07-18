import { GeometricDataOfficialLab, type GeometricSnapshot } from "./official-lab";

const SNAPSHOTS = [
  {
    "label": "输入",
    "object": "几何查询契约",
    "transform": "固定对象、维数、查询与边界语义",
    "certificate": "保存原始输入与版本",
    "warning": "空场景、所有对象共面、重复点、查询落在分割面、无限射线、极端尺度和高速运动都必须单独定义归属规则。若不同章节使用不同边界约定，跨结构比较会产生无法解释的假差异。"
  },
  {
    "label": "构建",
    "object": "空间层次",
    "transform": "建立节点、邻接或证书不变量",
    "certificate": "逐节点检查覆盖和唯一归属",
    "warning": "只比较平均查询时间，却没有让各结构使用同一输入、边界规则和精确谓词，排名无法复现。"
  },
  {
    "label": "查询",
    "object": "邻近结构",
    "transform": "按可证明条件剪枝并收集候选",
    "certificate": "记录访问轨迹和候选集合",
    "warning": "固定数据集、查询序列和数值策略，同时报告构建、查询、更新、内存与错误率。"
  },
  {
    "label": "更新",
    "object": "动态结构",
    "transform": "局部修复、重拟合或触发重建",
    "certificate": "比较更新前后不变量",
    "warning": "空场景、所有对象共面、重复点、查询落在分割面、无限射线、极端尺度和高速运动都必须单独定义归属规则。若不同章节使用不同边界约定，跨结构比较会产生无法解释的假差异。"
  },
  {
    "label": "验收",
    "object": "验收证书",
    "transform": "与穷举或精确基线逐项比较",
    "certificate": "输出结果差异、成本和反例",
    "warning": "只比较平均查询时间，却没有让各结构使用同一输入、边界规则和精确谓词，排名无法复现。"
  }
] as const satisfies ReadonlyArray<GeometricSnapshot>;

export function GdscgOfficialLearningMapObjectLab() {
  return <GeometricDataOfficialLab title="《Geometric Data Structures for Computer Graphics》全书导览：对象与不变量" caption="先固定对象、空间和边界语义，再观察结构如何组织候选。" mode="roadmap" snapshots={SNAPSHOTS} initial={0} />;
}

export function GdscgOfficialLearningMapQueryLab() {
  return <GeometricDataOfficialLab title="《Geometric Data Structures for Computer Graphics》全书导览：查询与更新" caption="拖动规模与查询范围，比较访问节点、候选和证书变化。" mode="roadmap" snapshots={SNAPSHOTS} initial={2} />;
}

export function GdscgOfficialLearningMapEvidenceLab() {
  return <GeometricDataOfficialLab title="《Geometric Data Structures for Computer Graphics》全书导览：验收证书" caption="从结果回放到剪枝、谓词、边界与复杂度计数。" mode="roadmap" snapshots={SNAPSHOTS} initial={4} />;
}
