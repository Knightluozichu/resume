import {
  OfficialHttpTransactionLab,
  type HttpExperimentModel,
} from "./official-http-transaction-lab";

const model = {
  title: "第7章 缓存",
  focus:
    "建立缓存命中、拓扑、处理步骤、新鲜度、再验证、缓存控制、年龄算法和广告计量",
  concepts: [
    "第7章 缓存",
    "7.1 冗余的数据传输",
    "7.2 带宽瓶颈",
    "7.3 瞬间拥塞",
    "7.4 距离时延",
    "7.5 命中和未命中的",
    "7.5.1 再验证",
    "7.5.2 命中率",
    "7.5.3 字节命中率",
    "7.5.4 区分命中和未命中的情况",
    "7.6 缓存的拓扑结构",
    "7.6.1 私有缓存",
    "7.6.2 公有代理缓存",
    "7.6.3 代理缓存的层次结构",
    "7.6.4 网状缓存、内容路由以及对等缓存",
    "7.7 缓存的处理步骤",
    "7.7.1 第一步——接收",
    "7.7.2 第二步——解析",
    "7.7.3 第三步——查找",
    "7.7.4 第四步——新鲜度检测",
    "7.7.5 第五步——创建响应",
    "7.7.6 第六步——发送",
    "7.7.7 第七步——日志",
    "7.7.8 缓存处理流程图",
    "7.8 保持副本的新鲜",
    "7.8.1 文档过期",
    "7.8.2 过期日期和使用期",
    "7.8.3 服务器再验证",
    "7.8.4 用条件方法进行再验证",
    "7.8.5 if-modified-since:date 再验证",
    "7.8.6 if-none-match：实体标签再验证",
    "7.8.7 强弱验证器",
    "7.8.8 什么时候应该使用实体标签和最近修改日期",
    "7.9 控制缓存的能力",
    "7.9.1 no-store 与no-cache 响应首部",
    "7.9.2 max-age 响应首部",
    "7.9.3 expires 响应首部",
    "7.9.4 must-revalidate 响应首部",
    "7.9.5 试探性过期",
    "7.9.6 客户端的新鲜度限制",
    "7.9.7 注意事项",
    "7.10 设置缓存控制",
    "7.10.1 控制apache 的http 首部",
    "7.10.2 通过http-equiv 控制html 缓存",
    "7.11 详细算法",
    "7.11.1 使用期和新鲜生存期",
    "7.11.2 使用期的计算",
    "7.11.3 完整的使用期计算算法",
    "7.11.4 新鲜生存期计算",
    "7.11.5 完整的服务器——新鲜度算法",
    "7.12 缓存和广告",
    "7.12.1 发布广告者的两难处境",
    "7.12.2 发布者的响应",
    "7.12.3 日志迁移",
    "7.12.4 命中计数和使用限制",
    "7.13 更多信息",
  ],
  fault: "缓存键或验证器不一致，却把旧表示当成新鲜命中",
  evidence:
    "cache key、Age、freshness lifetime、ETag/Last-Modified、304与stored response",
} satisfies HttpExperimentModel;

export function Hdg107MessageLab() {
  return <OfficialHttpTransactionLab model={model} mode="message" />;
}

export function Hdg107FlowLab() {
  return <OfficialHttpTransactionLab model={model} mode="flow" />;
}

export function Hdg107EvidenceLab() {
  return <OfficialHttpTransactionLab model={model} mode="evidence" />;
}
