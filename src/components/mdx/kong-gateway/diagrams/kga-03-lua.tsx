import { OfficialKongGatewayLab } from "./official-kong-gateway-lab";

const meta = {
  unitTitle: "第3章 Lua知识",
  focus:
    "掌握嵌入Kong插件所需的Lua运行环境、语法、类型、操作符、控制语句和标准库",
  invariant:
    "示例在书中Lua和LuaJIT语境下输出确定，nil、table、闭包与多返回值边界有断言而非凭直觉解释",
  artifact:
    "LuaJIT环境记录、类型实验、table和闭包轨迹、控制流测试、库函数边界清单",
  nodes: [
    "Lua入门与规范",
    "基础知识",
    "安装指南",
    "解释器",
    "语法规范",
    "数据类型",
    "操作符",
    "表达式语句",
    "赋值语句",
    "控制语句",
    "Lua库",
    "本章小结",
  ],
} as const;

export function Kga03LuaRouteLab() {
  return <OfficialKongGatewayLab mode="route" {...meta} />;
}
export function Kga03LuaRuntimeLab() {
  return <OfficialKongGatewayLab mode="runtime" {...meta} />;
}
export function Kga03LuaEvidenceLab() {
  return <OfficialKongGatewayLab mode="evidence" {...meta} />;
}
