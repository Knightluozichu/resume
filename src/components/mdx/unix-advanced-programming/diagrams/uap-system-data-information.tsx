import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "第6章 系统数据文件和信息",
  label: "文件与I/O",
  color: "#047857",
  soft: "#d1fae5",
  chain: [
    "查询身份",
    "扩展组集",
    "读取系统标识",
    "获取时钟",
    "转换时区",
    "核对边界",
  ],
  concepts: [
    "第6章 系统数据文件和信息",
    "6.1 引言",
    "6.2 口令文件",
    "6.3 阴影口令",
    "6.4 组文件",
    "6.5 附属组ID",
    "6.6 实现区别",
    "6.7 其他数据文件",
    "6.8 登录账户记录",
    "6.9 系统标识",
    "6.10 时间和日期例程",
    "6.11 小结",
  ],
} as const;

export function UapSystemDataInformationMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapSystemDataInformationExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapSystemDataInformationEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
