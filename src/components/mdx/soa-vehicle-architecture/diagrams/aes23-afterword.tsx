import { OfficialAes23BookLab } from "./official-aes23-book-lab";

const props = {
  unitId: "aes23-afterword",
  title: "后记与致谢：课程闭环与协作边界",
  nodes: ["作者经验", "课程组织", "产业协作", "读者实践", "持续修订"],
  focuses: ["后记", "致谢", "案例边界", "知识来源", "复核责任"],
} as const;

export function Aes23AfterwordTopologyLab() {
  return <OfficialAes23BookLab {...props} mode="topology" />;
}

export function Aes23AfterwordProtocolLab() {
  return <OfficialAes23BookLab {...props} mode="protocol" />;
}

export function Aes23AfterwordEvidenceLab() {
  return <OfficialAes23BookLab {...props} mode="evidence" />;
}
