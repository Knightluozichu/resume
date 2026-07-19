import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-16",
  title: "享元模式",
  problem: "地图要绘制百万棵树，树种纹理可共享，而坐标和生长状态各不相同",
  participants: ["TreeFlyweight", "TreeFactory", "MapContext"],
  flow: ["拆分状态", "查找共享对象", "复用纹理", "传入坐标", "完成绘制"],
  concepts: [
    "模式名称与分类",
    "意图",
    "别名",
    "动机",
    "适用性",
    "结构",
    "参与者",
    "协作",
    "后果",
    "实现",
    "示例代码",
    "已知应用",
    "相关模式",
  ],
  refactorings: [
    {
      label: "收窄TreeFlyweight",
      detail:
        "只保留 共享大量细粒度对象的内在状态，把随上下文变化的外在状态交给调用者 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开TreeFactory",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过MapContext",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "享元模式 的参与者与当前变化轴一致；继续用代码和反例验证 改变一棵树的坐标不得修改同树种其他实例的渲染位置。",
  misuseNote:
    "享元模式 被拒绝：把可变坐标放进共享对象，会让修改一棵树同时移动整片森林。",
} as const;

export function FlyweightStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function FlyweightChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function FlyweightEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
