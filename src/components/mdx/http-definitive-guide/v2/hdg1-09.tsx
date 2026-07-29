import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第9章 web 机器人",
  focus:
    "构建爬虫根集、链接规范化、环路与重复避免、机器人HTTP、robots.txt和搜索索引",
  concepts: [
    "第9章 web 机器人",
    "9.1 爬虫及爬行方式",
    "9.1.1 从哪儿开始：根集",
    "9.1.2 链接的提取以及相对链接的标准化",
    "9.1.3 避免环路的出现",
    "9.1.4 循环与复制",
    "9.1.5 面包屑留下的痕迹",
    "9.1.6 别名与机器人环路",
    "9.1.7 规范化url",
    "9.1.8 文件系统连接环路",
    "9.1.9 动态虚拟web 空间",
    "9.1.10 避免循环和重复",
    "9.2 机器人的http",
    "9.2.1 识别请求首部",
    "9.2.2 虚拟主机",
    "9.2.3 条件请求",
    "9.2.4 对响应的处理",
    "9.2.5 user-agent 导向",
    "9.3 行为不当的机器人",
    "9.4 拒绝机器人访问",
    "9.4.1 拒绝机器人访问标准",
    "9.4.2 web 站点和robots.txt 文件",
    "9.4.3 robots.txt 文件的格式",
    "9.4.4 其他有关robots.txt 的知识",
    "9.4.5 缓存和robots.txt 的过期",
    "9.4.6 拒绝机器人访问的perl 代码",
    "9.4.7 html 的robot-control 元标签",
    "9.5 机器人的规范",
    "9.6 搜索引擎",
    "9.6.1 大格局",
    "9.6.2 现代搜索引擎结构",
    "9.6.3 全文索引",
    "9.6.4 发布查询请求",
    "9.6.5 对结果进行排序，并提供查询结果",
    "9.6.6 欺诈",
    "9.7 更多信息",
  ],
  fault: "只观察最终页面，没有保存两端原始报文和中间实体状态",
  evidence:
    "URL、request bytes、response bytes、Via/next hop、timestamp、fault与recovery",
} satisfies HttpExperimentModel;

export function Hdg109MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg109FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg109EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
