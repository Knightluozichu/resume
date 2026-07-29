import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-official-final-review",
  title: "《UNIX编程艺术》全书总复习",
  question: "把一个隐式配置的单体脚本改造成可组合、可移植、可维护的工具",
  nodes: ["问题基线", "接口设计", "实现验证", "协作交付", "回退复盘"],
  concepts: [
    "序",
    "第一部分 背景",
    "第1章 哲学",
    "第2章 历史——双流记",
    "第3章 对比：Unix哲学同其他哲学的比较",
    "第二部分 设计",
    "第4章 模块性：保持清晰，保持简洁",
    "第5章 文本化：好协议产生好实践",
    "第6章 透明性：来点儿光",
    "第7章 多道程序设计：分离进程为独立的功能",
    "第8章 微型语言：寻找歌唱的乐符",
    "第9章 生成：提升规格说明的层次",
    "第10章 配置：迈出正确的第一步",
    "第11章 接口：Unix环境下的用户接口设计模式",
    "第12章 优化",
    "第13章 复杂度：尽可能简单，但别简单过了头",
    "第三部分 实现",
    "第14章 语言：C还是非C",
    "第15章 工具：开发的战术",
    "第16章 重用：论不要重新发明轮子",
    "第四部分 社区",
    "第17章 可移植性：软件可移植性与遵循标准",
    "第18章 文档：向网络世界阐释代码",
    "第19章 开放源码：在Unix新社区中编程",
    "第20章 未来：危机与机遇",
    "附录A 缩写词表",
    "附录B 参考文献",
    "附录C 贡献者",
    "附录D 无根的根：无名师的Unix心传",
    "Colophon",
    "索引",
  ],
  actions: [
    {
      label: "收窄原则选择",
      detail: "只改变原则选择，保留表示协议与工具链的原始基线。",
    },
    {
      label: "显式化工具链",
      detail: "把工具链的输入、输出和失败状态写入可检查记录。",
    },
    {
      label: "绕过文档许可",
      detail: "跳过文档许可直接追求发布证据，用来观察局部捷径的系统代价。",
    },
  ],
  boundaryNote: "一个阶段无法在干净环境复现时，全书复习不能判定通过。",
  faultNote: "拒绝原因：各章练习分别成功，却使用不同输入、版本和验收口径。",
} as const;

export function TaoupOfficialFinalReviewTopologyLab() {
  return <UnixDecisionLab {...shared} view="topology" />;
}

export function TaoupOfficialFinalReviewRepresentationLab() {
  return <UnixDecisionLab {...shared} view="representation" />;
}

export function TaoupOfficialFinalReviewEvidenceLab() {
  return <UnixDecisionLab {...shared} view="evidence" />;
}
