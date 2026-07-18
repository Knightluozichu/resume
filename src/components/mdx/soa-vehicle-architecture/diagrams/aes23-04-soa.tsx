import { OfficialAes23BookLab } from "./official-aes23-book-lab";

const props = {
  unitId: "aes23-04-soa",
  title: "第4章：面向服务的架构",
  nodes: ["业务能力", "服务契约", "通信中间件", "平台部署", "市场实践"],
  focuses: ["概念解析", "实现基础", "SOME/IP中间件", "DDS", "设计实现"],
} as const;

export function Aes2304SoaTopologyLab() {
  return <OfficialAes23BookLab {...props} mode="topology" />;
}

export function Aes2304SoaProtocolLab() {
  return <OfficialAes23BookLab {...props} mode="protocol" />;
}

export function Aes2304SoaEvidenceLab() {
  return <OfficialAes23BookLab {...props} mode="evidence" />;
}
