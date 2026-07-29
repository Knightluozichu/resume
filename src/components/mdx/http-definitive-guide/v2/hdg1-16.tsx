import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第16章 国际化",
  focus: "厘清字符、字符集、编码、字形、语言标记、国际化URI、日期和域名",
  concepts: [
    "第16章 国际化",
    "16.1 http 对国际性内容的支持",
    "16.2 字符集与http",
    "16.2.1 字符集是把字符转换为二进制码的编码",
    "16.2.2 字符集和编码如何工作",
    "16.2.3 字符集不对，字符就不对",
    "16.2.4 标准化的mime charset 值",
    "16.2.5 content-type 首部和charset 首部以及meta 标志",
    "16.2.6 accept-charset 首部",
    "16.3 多语言字符编码入门",
    "16.3.1 字符集术语",
    "16.3.2 字符集的命名很糟糕",
    "16.3.3 字符",
    "16.3.4 字形、连笔以及表示形式",
    "16.3.5 编码后的字符集",
    "16.3.6 字符编码方案",
    "16.4 语言标记与http",
    "16.4.1 content-language 首部",
    "16.4.2 accept-language 首部",
    "16.4.3 语言标记的类型",
    "16.4.4 子标记",
    "16.4.5 大小写",
    "16.4.6 iana 语言标记注册",
    "16.4.7 第一个子标记——名字空间",
    "16.4.8 第二个子标记——名字空间",
    "16.4.9 其余子标记——名字空间",
    "16.4.10 配置和语言有关的首选项",
    "16.4.11 语言标记参考表",
    "16.5 国际化的uri",
    "16.5.1 全球性的可转抄能力与有意义的字符的较量",
    "16.5.2 uri 字符集合",
    "16.5.3 转义和反转义",
    "16.5.4 转义国际化字符",
    "16.5.5 uri 中的模态切换",
    "16.6 其他需要考虑的地方",
    "16.6.1 首部和不合规范的数据",
    "16.6.2 日期",
    "16.6.3 域名",
    "16.7 更多信息",
    "16.7.1 附录",
    "16.7.2 互联网的国际化",
    "16.7.3 国际标准",
  ],
  fault: "Content-Type、字符集、Content-Encoding或长度与真实主体不一致",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg116MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg116FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg116EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
