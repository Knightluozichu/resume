import { OfficialLinuxKernelDesignLab } from "./official-linux-kernel-design-lab";

const data = {
  title: "第20章 补丁、开发和社区",
  label: "可移植性 · 社区交付",
  color: "#15803d",
  soft: "#dcfce7",
  chain: [
    "定位维护者",
    "重现并描述问题",
    "形成最小改动",
    "运行风格与测试",
    "生成发送补丁",
    "回应评审并迭代",
  ],
  concepts: [
    "第20章 补丁、开发和社区",
    "20.1 社区",
    "20.2 Linux编码风格",
    "20.2.1 缩进",
    "20.2.2 switch 语句",
    "20.2.3 空格",
    "20.2.4 花括号",
    "20.2.5 每行代码的长度",
    "20.2.6 命名规范",
    "20.2.7 函数",
    "20.2.8 注释",
    "20.2.9 typedef",
    "20.2.10 多用现成的东西",
    "20.2.11 在源码中减少使用ifdef",
    "20.2.12 结构初始化",
    "20.2.13 代码的事后修正",
    "20.3 管理系统",
    "20.4 提交错误报告",
    "20.5 补丁",
    "20.5.1 创建补丁",
    "20.5.2 用Git创建补丁",
    "20.5.3 提交补丁",
    "20.6 小结",
  ],
} as const;

export function Lkd20PatchesCommunityMapLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="map" />;
}

export function Lkd20PatchesCommunityExperimentLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="experiment" />;
}

export function Lkd20PatchesCommunityEvidenceLab() {
  return <OfficialLinuxKernelDesignLab {...data} view="evidence" />;
}
