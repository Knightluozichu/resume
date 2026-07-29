import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-chapter-05-textuality",
  title: "第5章 文本化：好协议产生好实践",
  question: "为事件交换格式在 DSV、键值记录、JSON 与紧凑二进制间选择",
  nodes: ["表示目标", "格式候选", "协议交换", "异常解析", "演化策略"],
  concepts: [
    "5. Textuality",
    "The Importance of Being Textual",
    "Case Study: Unix Password File Format",
    "Case Study: .newsrc Format",
    "Case Study: The PNG Graphics File Format",
    "Data File Metaformats",
    "DSV Style",
    "RFC 822 Format",
    "Cookie-Jar Format",
    "Record-Jar Format",
    "XML",
    "Windows INI Format",
    "Unix Textual File Format Conventions",
    "The Pros and Cons of File Compression",
    "Application Protocol Design",
    "Case Study: SMTP, the Simple Mail Transfer Protocol",
    "Case Study: POP3, the Post Office Protocol",
    "Case Study: IMAP, the Internet Message Access Protocol",
    "Application Protocol Metaformats",
    "The Classical Internet Application Metaprotocol",
    "HTTP as a Universal Application Protocol",
    "BEEP: Blocks Extensible Exchange Protocol",
    "XML-RPC, SOAP, and Jabber",
  ],
  actions: [
    {
      label: "收窄可检查性",
      detail: "只改变可检查性，保留编码边界与模式演化的原始基线。",
    },
    {
      label: "显式化模式演化",
      detail: "把模式演化的输入、输出和失败状态写入可检查记录。",
    },
    {
      label: "绕过压缩代价",
      detail: "跳过压缩代价直接追求互操作性，用来观察局部捷径的系统代价。",
    },
  ],
  boundaryNote:
    "当体积、吞吐或安全约束超过文本收益时，可选二进制，但必须保留检查器。",
  faultNote:
    "拒绝原因：用脆弱的分隔规则处理未转义字段，导致合法数据改变记录边界。",
} as const;

export function TaoupChapter05TextualityTopologyLab() {
  return <UnixDecisionLab {...shared} view="topology" />;
}

export function TaoupChapter05TextualityRepresentationLab() {
  return <UnixDecisionLab {...shared} view="representation" />;
}

export function TaoupChapter05TextualityEvidenceLab() {
  return <UnixDecisionLab {...shared} view="evidence" />;
}
