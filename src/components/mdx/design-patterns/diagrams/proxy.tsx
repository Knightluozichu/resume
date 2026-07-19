import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-17",
  title: "代理模式",
  problem: "图片查看器要在进入视口时才加载远端大图，并对失败提供可重试状态",
  participants: ["ImageSubject", "LazyImageProxy", "RemoteImage"],
  flow: ["请求显示", "检查缓存", "延迟加载", "委托真实对象", "返回或失败"],
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
      label: "收窄ImageSubject",
      detail:
        "只保留 提供与真实对象相同的替身，以控制访问、延迟创建或跨边界调用 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开LazyImageProxy",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过RemoteImage",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "代理模式 的参与者与当前变化轴一致；继续用代码和反例验证 代理显示成功时必须对应已校验的真实图片版本，而非半加载占位数据。",
  misuseNote:
    "代理模式 被拒绝：代理吞掉网络失败并返回旧数据，会让相同接口产生不可见的一致性差异。",
} as const;

export function ProxyStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function ProxyChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function ProxyEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
