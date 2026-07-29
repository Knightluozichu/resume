import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-chapter-10-configuration",
  title: "第10章 配置：迈出正确的第一步",
  question: "为代理地址、认证凭据、输出格式和一次性调试开关选择入口",
  nodes: ["配置分类", "作用域选择", "优先级合并", "来源显示", "错误拒绝"],
  concepts: [
    "10. Configuration",
    "What Should Be Configurable?",
    "Where Configurations Live",
    "Run-Control Files",
    "Case Study: The .netrc File",
    "Portability to Other Operating Systems",
    "Environment Variables",
    "System Environment Variables",
    "User Environment Variables",
    "When to Use Environment Variables",
    "Portability to Other Operating Systems",
    "Command-Line Options",
    "The -a to -z of Command-Line Options",
    "Portability to Other Operating Systems",
    "How to Choose among the Methods",
    "Case Study: fetchmail",
    "Case Study: The XFree86 Server",
    "On Breaking These Rules",
  ],
  actions: [
    {
      label: "收窄默认值",
      detail: "只改变默认值，保留配置文件与环境变量的原始基线。",
    },
    {
      label: "显式化环境变量",
      detail: "把环境变量的输入、输出和失败状态写入可检查记录。",
    },
    {
      label: "绕过命令行",
      detail: "跳过命令行直接追求冲突规则，用来观察局部捷径的系统代价。",
    },
  ],
  boundaryNote:
    "秘密不进入命令行历史，长期策略不依赖进程环境，错误值不得静默回退。",
  faultNote: "拒绝原因：同一键在多个入口含义不同，运行日志又不显示最终来源。",
} as const;

export function TaoupChapter10ConfigurationTopologyLab() {
  return <UnixDecisionLab {...shared} view="topology" />;
}

export function TaoupChapter10ConfigurationRepresentationLab() {
  return <UnixDecisionLab {...shared} view="representation" />;
}

export function TaoupChapter10ConfigurationEvidenceLab() {
  return <UnixDecisionLab {...shared} view="evidence" />;
}
