import { OfficialLinuxPracticeLab } from "./official-linux-practice-lab";

const data = {
  title: "第5章 Linux 编程环境",
  label: "开发 · Vim/GCC/GDB/Make",
  color: "#0f766e",
  soft: "#f0fdfa",
  chain: [
    "编辑源文件",
    "预处理与编译",
    "汇编与链接",
    "运行失败样本",
    "用GDB定位",
    "用Make固化依赖",
  ],
  concepts: [
    "第5章 Linux 编程环境",
    "5.1 文本编辑器 Vim",
    "5.1.1 文本编辑器简介",
    "5.1.2 Vim 的安装与配置",
    "5.1.3 Vim 的工作模式",
    "5.1.4 Vim 按键说明",
    "5.2 GCC 编译器",
    "5.2.1 GCC 编译器简介",
    "5.2.2 GCC 编译流程",
    "5.2.3 GCC 编译选项",
    "5.2.4 GCC 编译器版本切换",
    "5.3 GDB 调试器",
    "5.3.1 GDB 调试器简介",
    "5.3.2 GDB 调试器的使用",
    "5.3.3 GDB 基本命令",
    "5.4 Make 工程管理器",
    "5.4.1 Make 工程管理器简介",
    "5.4.2 Makefile 的使用",
    "5.4.3 Makefile 的规则",
    "5.5 本章小结",
  ],
} as const;

export function Lop05ProgrammingEnvironmentMapLab() {
  return <OfficialLinuxPracticeLab {...data} view="map" />;
}
export function Lop05ProgrammingEnvironmentExperimentLab() {
  return <OfficialLinuxPracticeLab {...data} view="experiment" />;
}
export function Lop05ProgrammingEnvironmentEvidenceLab() {
  return <OfficialLinuxPracticeLab {...data} view="evidence" />;
}
