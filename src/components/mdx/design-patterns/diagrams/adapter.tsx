import { PatternTradeoffLab } from "./pattern-tradeoff-lab";

const shared = {
  unitId: "designpatterns-12",
  title: "适配器模式",
  problem: "气象服务返回华氏温度和英里风速，应用合同要求摄氏度与米每秒",
  participants: ["WeatherTarget", "MetricAdapter", "LegacyWeatherApi"],
  flow: ["接收目标调用", "转换参数", "调用旧接口", "换算单位", "返回目标值"],
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
      label: "收窄WeatherTarget",
      detail:
        "只保留 把已有对象的接口转换为客户端需要的目标接口，并显式处理语义差异 所需的最小入口。",
      couplingDelta: -14,
      changeDelta: -12,
      traceDelta: 12,
    },
    {
      label: "公开MetricAdapter",
      detail: "让替换点、所有者与失败结果进入评审记录。",
      couplingDelta: -8,
      changeDelta: -6,
      traceDelta: 18,
    },
    {
      label: "绕过LegacyWeatherApi",
      detail: "模拟捷径，观察模式合同被破坏后的传播。",
      couplingDelta: 20,
      changeDelta: 18,
      traceDelta: -22,
    },
  ],
  metricLabels: ["依赖耦合", "变更成本", "因果可追踪"],
  fitNote:
    "适配器模式 的参与者与当前变化轴一致；继续用代码和反例验证 旧服务 68°F 的响应必须稳定转换为 20°C，且误差界限可见。",
  misuseNote:
    "适配器模式 被拒绝：只改方法名却忽略温标、时区或错误语义，会得到表面兼容的错误结果。",
} as const;

export function AdapterStructureLab() {
  return (
    <PatternTradeoffLab {...shared} mode="structure" baseline={[48, 52, 68]} />
  );
}

export function AdapterChangeLab() {
  return (
    <PatternTradeoffLab {...shared} mode="change" baseline={[52, 58, 66]} />
  );
}

export function AdapterEvidenceLab() {
  return (
    <PatternTradeoffLab {...shared} mode="evidence" baseline={[44, 50, 72]} />
  );
}
