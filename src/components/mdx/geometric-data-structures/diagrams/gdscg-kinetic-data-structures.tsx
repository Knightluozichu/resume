import { GeometricDataOfficialLab, type GeometricSnapshot } from "./official-lab";

const SNAPSHOTS = [
  {
    "label": "输入",
    "object": "动力数据结构",
    "transform": "固定对象、维数、查询与边界语义",
    "certificate": "保存原始输入与版本",
    "warning": "同时事件、切触不换序、重根、时间倒退和浮点根排序都会破坏事件顺序。若两个证书在同一时间互相依赖，应批处理同一时间戳并在处理后重新验证全局不变量。"
  },
  {
    "label": "构建",
    "object": "证书",
    "transform": "建立节点、邻接或证书不变量",
    "certificate": "逐节点检查覆盖和唯一归属",
    "warning": "对象轨迹改变后旧事件仍留在队列，稍后被执行并把结构恢复到过时次序。"
  },
  {
    "label": "查询",
    "object": "失效时间",
    "transform": "按可证明条件剪枝并收集候选",
    "certificate": "记录访问轨迹和候选集合",
    "warning": "给证书加版本号和轨迹世代，处理事件前验证其仍对应当前状态。"
  },
  {
    "label": "更新",
    "object": "事件队列",
    "transform": "局部修复、重拟合或触发重建",
    "certificate": "比较更新前后不变量",
    "warning": "同时事件、切触不换序、重根、时间倒退和浮点根排序都会破坏事件顺序。若两个证书在同一时间互相依赖，应批处理同一时间戳并在处理后重新验证全局不变量。"
  },
  {
    "label": "验收",
    "object": "外部事件",
    "transform": "与穷举或精确基线逐项比较",
    "certificate": "输出结果差异、成本和反例",
    "warning": "对象轨迹改变后旧事件仍留在队列，稍后被执行并把结构恢复到过时次序。"
  }
] as const satisfies ReadonlyArray<GeometricSnapshot>;

export function GdscgKineticDataStructuresObjectLab() {
  return <GeometricDataOfficialLab title="第8章 动力数据结构：对象与不变量" caption="先固定对象、空间和边界语义，再观察结构如何组织候选。" mode="kinetic" snapshots={SNAPSHOTS} initial={0} />;
}

export function GdscgKineticDataStructuresQueryLab() {
  return <GeometricDataOfficialLab title="第8章 动力数据结构：查询与更新" caption="拖动规模与查询范围，比较访问节点、候选和证书变化。" mode="kinetic" snapshots={SNAPSHOTS} initial={2} />;
}

export function GdscgKineticDataStructuresEvidenceLab() {
  return <GeometricDataOfficialLab title="第8章 动力数据结构：验收证书" caption="从结果回放到剪枝、谓词、边界与复杂度计数。" mode="kinetic" snapshots={SNAPSHOTS} initial={4} />;
}
