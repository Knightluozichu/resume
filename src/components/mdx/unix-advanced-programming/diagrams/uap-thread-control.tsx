import { OfficialUnixAdvancedProgrammingLab } from "./official-unix-advanced-programming-lab";

const data = {
  title: "第12章 线程控制",
  label: "信号与线程",
  color: "#047857",
  soft: "#d1fae5",
  chain: [
    "配置属性",
    "分配线程数据",
    "设置取消协议",
    "路由信号",
    "穿越fork",
    "运行清理器",
  ],
  concepts: [
    "第12章 线程控制",
    "12.1 引言",
    "12.2 线程限制",
    "12.3 线程属性",
    "12.4 同步属性",
    "12.4.1 互斥量属性",
    "12.4.2 读写锁属性",
    "12.4.3 条件变量属性",
    "12.4.4 屏障属性",
    "12.5 重入",
    "12.6 线程特定数据",
    "12.7 取消选项",
    "12.8 线程和信号",
    "12.9 线程和fork",
    "12.10 线程和I/O",
    "12.11 小结",
  ],
} as const;

export function UapThreadControlMapLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="map" />;
}

export function UapThreadControlExperimentLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="experiment" />;
}

export function UapThreadControlEvidenceLab() {
  return <OfficialUnixAdvancedProgrammingLab {...data} view="evidence" />;
}
