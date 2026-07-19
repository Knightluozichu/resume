import { ProjectEvidenceLab } from "./project-evidence-lab";

const shared = {
  unitId: "tmm40-19-twenty-years-later",
  title: "第19章 20年后的《人月神话》",
  question: "维护者要把 Brooks 的保留、修正和认错映射到当前工程决策",
  roles: ["概念完整性负责人", "增量开发执行者", "独立项目评审者"],
  phases: ["列出旧说", "查找回顾", "分类变化", "映射当下", "保留异议"],
  concepts: [
    "第19章 20年后的《人月神话》",
    "为什么要出版20周年纪念版本",
    "核心观点——概念完整性和结构师",
    "开发第二个系统所引起的后果——盲目的功能和频率猜测",
    "图形界面的成功",
    "没有构建舍弃原型——瀑布模型是错误的",
    "增量开发模型更佳——渐进地精化",
    "关于信息隐藏，Parnas是正确的，我是错误的",
    "人月到底有多少神话色彩？Boehm的模型和数据",
    "人就是一切（或者说，几乎是一切）",
    "放弃权力的力量",
    "最令人惊讶的新事物是什么？数百万的计算机",
    "全新的软件产业——塑料薄膜包装的成品软件",
    "买来开发——使用塑料包装的成品软件包作为构件",
    "软件工程的状态和未来",
    "结束语：令人向往、激动人心和充满乐趣的50年",
  ],
  actions: [
    {
      label: "公开概念完整性",
      detail:
        "让评审者先看到概念完整性的定义和负责人，保持增量开发与信息隐藏不变。",
      delayDelta: -10,
      clarityDelta: 14,
      riskDelta: -12,
    },
    {
      label: "校验信息隐藏",
      detail: "在信息隐藏进入下一阶段前核对版本、输入和完成条件。",
      delayDelta: 2,
      clarityDelta: 18,
      riskDelta: -16,
    },
    {
      label: "绕过人月数据",
      detail: "跳过人月数据直接追求成品软件，观察局部提速怎样传成项目风险。",
      delayDelta: 16,
      clarityDelta: -18,
      riskDelta: 24,
    },
  ],
  metricLabels: ["概念完整性延期暴露", "信息隐藏清晰度", "成品软件风险"],
  boundaryNote: "回顾章节本身也有年代边界，现代证据必须另行登记。",
  failureNote:
    "拒绝原因：只挑仍流行的观点，遗漏明确修正、时代变化和新产业结构。",
} as const;

export function Tmm4019TwentyYearsLaterDependencyLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="dependency" baseline={[40, 66, 42]} />
  );
}

export function Tmm4019TwentyYearsLaterScheduleLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="schedule" baseline={[46, 62, 46]} />
  );
}

export function Tmm4019TwentyYearsLaterEvidenceLab() {
  return (
    <ProjectEvidenceLab {...shared} mode="evidence" baseline={[34, 74, 36]} />
  );
}
