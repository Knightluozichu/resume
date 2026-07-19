import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-12",
  title: "第12章 电子货币",
  concepts: [
    "第12章 电子货币",
    "12.1 密码无政府状态：加密永胜",
    "12.2 传真机效应和收益递增定律",
    "12.3 超级传播",
    "12.4 带电荷的东西就可用于电子货币充值",
    "12.5 点对点金融与超级小钱",
    "12.6 对隐密经济的恐惧",
  ],
  nodes: [
    "编码价值状态",
    "建立可信转移",
    "扩大兼容网络",
    "降低交易粒度",
    "处理治理外部性",
  ],
  focuses: ["密码权力", "收益递增", "数字分发", "嵌入支付", "隐私治理"],
  model: {
    studio: "电子货币协议沙盘",
    axisA: {
      label: "兼容网络规模",
      levels: ["封闭孤岛", "有限互通", "广泛可接受"],
    },
    axisB: {
      label: "结算与隐私门禁",
      levels: ["无门禁", "事后审计", "最小披露并可追责"],
    },
    outcomes: {
      success: "小额流通能力",
      risk: "治理攻击面",
      evidence: "证据可追溯度",
    },
    fault: "技术可转移被误写成经济可持续",
    task: "为一笔纳米支付分别核对密码、激励和治理三层",
    practiceMode: "design",
    riskEffects: [1, -1],
  },
} as const;

export function Ooc16Chapter12MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter12ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter12EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
