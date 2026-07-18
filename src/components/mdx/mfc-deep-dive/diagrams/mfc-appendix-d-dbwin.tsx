import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "附录D 以MFC重建DBWIN",
  label: "附录D · DBWIN重建",
  color: "#be123c",
  soft: "#fff1f2",
  chain: [
    "创建命名对象",
    "等待数据事件",
    "读取共享缓冲",
    "通知缓冲可用",
    "投递UI消息",
    "停止并清理句柄",
  ],
  concepts: ["附录D 以MFC重建DBWIN"],
} as const;

export function MfcAppendixDDbwinMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function MfcAppendixDDbwinExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function MfcAppendixDDbwinEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
