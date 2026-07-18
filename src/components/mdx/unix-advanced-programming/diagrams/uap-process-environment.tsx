import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "第7章 进程环境",
  label: "进程模型",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "捕获启动状态",
    "检查内存布局",
    "修改环境",
    "设置退出处理",
    "触发非局部跳转",
    "恢复限制",
  ],
  concepts: [
    "第7章 进程环境",
    "7.1 引言",
    "7.2 main函数",
    "7.3 进程终止",
    "7.4 命令行参数",
    "7.5 环境表",
    "7.6 c程序的存储空间布局",
    "7.7 共享库",
    "7.8 存储空间分配",
    "7.9 环境变量",
    "7.10 函数setjmp和longjmp",
    "7.11 函数getrlimit和setrlimit",
    "7.12 小结",
  ],
} as const;

export function UapProcessEnvironmentMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapProcessEnvironmentExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapProcessEnvironmentEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
