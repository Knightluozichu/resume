import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "第9章 进程关系",
  label: "进程模型",
  color: "#7c3aed",
  soft: "#ede9fe",
  chain: [
    "建立会话",
    "设置进程组",
    "绑定终端",
    "切换前后台",
    "制造孤儿组",
    "恢复终端",
  ],
  concepts: [
    "第9章 进程关系",
    "9.1 引言",
    "9.2 终端登录",
    "9.3 网络登录",
    "9.4 进程组",
    "9.5 会话",
    "9.6 控制终端",
    "9.7 函数tcgetpgrp、tcsetpgrp和tcgetsid",
    "9.8 作业控制",
    "9.9 shell执行程序",
    "9.10 孤儿进程组",
    "9.11 FreeBSD实现",
    "9.12 小结",
  ],
} as const;

export function UapProcessRelationshipsMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapProcessRelationshipsExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapProcessRelationshipsEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
