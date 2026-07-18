import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "第19章 静态单赋值形式",
  label: "第19章 静态单赋值形式",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "计算支配树",
    "计算支配边界",
    "放置phi",
    "沿树重命名",
    "执行稀疏优化",
    "拆分边并去SSA",
  ],
  concepts: [
    "第19章 静态单赋值形式",
    "19.1 转化为SSA形式",
    "19.1.1 插入phi函数的标准",
    "19.1.2 必经结点边界",
    "19.1.3 插入phi函数",
    "19.1.4 变量重命名",
    "19.1.5 边分割",
    "19.2 必经结点树的高效计算",
    "19.2.1 深度优先生成树",
    "19.2.2 半必经结点",
    "19.2.3 Lengauer-Tarjan算法",
    "19.3 使用SSA的优化算法",
    "19.3.1 死代码删除",
    "19.3.2 简单的常数传播",
    "19.3.3 条件常数传播",
    "19.3.4 保持必经结点性质",
    "19.4 数组、指针和存储器",
    "19.5 控制依赖图",
    "19.6 从SSA形式转变回来",
    "19.7 函数式中间形式",
  ],
} as const;

export function Tbc19StaticSingleAssignmentMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function Tbc19StaticSingleAssignmentExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function Tbc19StaticSingleAssignmentEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
