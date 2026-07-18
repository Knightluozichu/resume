import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "第2章 UNIX标准及实现",
  label: "基础与标准",
  color: "#1d4ed8",
  soft: "#dbeafe",
  chain: [
    "声明目标标准",
    "识别实现",
    "查询限制",
    "检查选项",
    "编译探针",
    "跨平台复核",
  ],
  concepts: [
    "第2章 UNIX标准及实现",
    "2.1 引言",
    "2.2 UNIX标准化",
    "2.2.1 ISO C",
    "2.2.2 IEEE POSIX",
    "2.2.3 Single UNIX Specification",
    "2.2.4 FIPS",
    "2.3 UNIX系统实现",
    "2.3.1 SVR4",
    "2.3.2 4.4bsd",
    "2.3.3 FreeBSD",
    "2.3.4 linux",
    "2.3.5 Mac OS X",
    "2.3.6 Solaris",
    "2.3.7 其他UNIX系统",
    "2.4 标准和实现的关系",
    "2.5 限制",
    "2.5.1 ISO C限制",
    "2.5.2 POSIX限制",
    "2.5.3 XSI限制",
    "2.5.4 函数sysconf、pathconf和fpathconf",
    "2.5.5 不确定的运行时限制",
    "2.6 选项",
    "2.7 功能测试宏",
    "2.8 基本系统数据类型",
    "2.9 标准之间的冲突",
    "2.10 小结",
  ],
} as const;

export function UapStandardsImplementationsMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapStandardsImplementationsExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapStandardsImplementationsEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
