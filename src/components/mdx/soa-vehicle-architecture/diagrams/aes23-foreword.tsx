import { OfficialAes23BookLab } from "./official-aes23-book-lab";

const props = {
  unitId: "aes23-foreword",
  title: "序：汽车电子与软件架构课程坐标",
  nodes: ["产业变化", "电子硬件", "车载网络", "软件架构", "开发验证"],
  focuses: ["学科边界", "系统视角", "软硬协同", "工程约束", "学习产物"],
} as const;

export function Aes23ForewordTopologyLab() {
  return <OfficialAes23BookLab {...props} mode="topology" />;
}

export function Aes23ForewordProtocolLab() {
  return <OfficialAes23BookLab {...props} mode="protocol" />;
}

export function Aes23ForewordEvidenceLab() {
  return <OfficialAes23BookLab {...props} mode="evidence" />;
}
