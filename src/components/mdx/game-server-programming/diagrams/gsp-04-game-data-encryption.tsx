import { ServerBookEvidenceLab } from "./official-server-evidence-lab";

const nodes = [
  "列出资产攻击者与后果",
  "选择标准认证协议",
  "建立会话密钥",
  "绑定序号方向和上下文",
  "验证后解析并轮换",
  "注入篡改重放后签发",
] as const;

export function Gsp04GameDataCryptographyMapLab() {
  return <ServerBookEvidenceLab title="第4章 网络游戏数据加密技术" label="第4章" nodes={nodes} mode="map" />;
}

export function Gsp04GameDataCryptographyExperimentLab() {
  return <ServerBookEvidenceLab title="正常、边界与失败样本" label="第4章" nodes={nodes} mode="experiment" />;
}

export function Gsp04GameDataCryptographyEvidenceLab() {
  return <ServerBookEvidenceLab title="交付证据与阶段门" label="第4章" nodes={nodes} mode="evidence" />;
}
