import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-official-learning-map",
  title: "《UNIX编程艺术》权威学习地图",
  question: "为一次完整阅读安排先决关系、复习点与失败回退",
  nodes: ["背景", "设计", "实现", "社区", "全书复核"],
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
      label: "收窄31个单元",
      detail: "只改变31个单元，保留383个节点与四部分依赖的原始基线。",
      riskDelta: -16,
      visibilityDelta: 10,
      recoveryDelta: 8,
    },
    {
      label: "显式化四部分依赖",
      detail: "把四部分依赖的输入、输出和失败状态写入可检查记录。",
      riskDelta: -8,
      visibilityDelta: 18,
      recoveryDelta: 11,
    },
    {
      label: "绕过实践证据",
      detail: "跳过实践证据直接追求发布门禁，用来观察局部捷径的系统代价。",
      riskDelta: 18,
      visibilityDelta: -14,
      recoveryDelta: -20,
    },
  ],
  metricLabels: ["31个单元风险", "四部分依赖可见度", "发布门禁恢复度"],
  boundaryNote: "只有目录词出现而没有解释、实验和练习时，覆盖率仍记为零。",
  faultNote: "拒绝原因：按页面数量打勾，却无法从目录节点定位到解释和练习。",
} as const;

export function TaoupOfficialLearningMapTopologyLab() {
  return (
    <UnixDecisionLab {...shared} view="topology" baseline={[42, 66, 64]} />
  );
}

export function TaoupOfficialLearningMapRepresentationLab() {
  return (
    <UnixDecisionLab
      {...shared}
      view="representation"
      baseline={[38, 62, 58]}
    />
  );
}

export function TaoupOfficialLearningMapEvidenceLab() {
  return (
    <UnixDecisionLab {...shared} view="evidence" baseline={[34, 72, 68]} />
  );
}
