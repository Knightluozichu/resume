import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-chapter-03-contrasts",
  title: "第3章 对比：Unix哲学同其他哲学的比较",
  question: "为批处理、桌面交互与大型事务三类负载选择系统风格",
  nodes: ["统一理念", "并发协作", "内部边界", "界面受众", "系统比较"],
  concepts: [
    "3. Contrasts",
    "The Elements of Operating-System Style",
    "What Is the Operating System's Unifying Idea?",
    "Multitasking Capability",
    "Cooperating Processes",
    "Internal Boundaries",
    "File Attributes and Record Structures",
    "Binary File Formats",
    "Preferred User Interface Style",
    "Intended Audience",
    "Entry Barriers to Development",
    "Operating-System Comparisons",
    "VMS",
    "MacOS",
    "OS/2",
    "Windows NT",
    "BeOS",
    "MVS",
    "VM/CMS",
    "Linux",
    "What Goes Around, Comes Around",
  ],
  actions: [
    {
      label: "收窄比较口径",
      detail: "只改变比较口径，保留任务模型与数据模型的原始基线。",
    },
    {
      label: "显式化数据模型",
      detail: "把数据模型的输入、输出和失败状态写入可检查记录。",
    },
    {
      label: "绕过开发门槛",
      detail: "跳过开发门槛直接追求取舍结论，用来观察局部捷径的系统代价。",
    },
  ],
  boundaryNote: "当工作负载或时代条件不同，应停止排名并改为条件化结论。",
  faultNote: "拒绝原因：用一个系统的最佳案例对比另一个系统的最差默认配置。",
} as const;

export function TaoupChapter03ContrastsTopologyLab() {
  return <UnixDecisionLab {...shared} view="topology" />;
}

export function TaoupChapter03ContrastsRepresentationLab() {
  return <UnixDecisionLab {...shared} view="representation" />;
}

export function TaoupChapter03ContrastsEvidenceLab() {
  return <UnixDecisionLab {...shared} view="evidence" />;
}
