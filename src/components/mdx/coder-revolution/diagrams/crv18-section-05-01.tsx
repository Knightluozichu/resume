import { CoderMechanismLab } from "./coder-mechanism-lab";

const profile = {
  unitId: "crv18-section-05-01",
  title: "5.1 JavaScript ：一个草根的逆袭",
  family: "language",
  nodes: [
    "解析脚本",
    "创建执行上下文",
    "访问宿主API",
    "排入任务",
    "产生页面结果",
  ],
  concepts: [
    "5.1 JavaScript ：一个草根的逆袭",
    "出世",
    "成长",
    "第一桶金",
    "发明JSON",
    "人生巅峰",
  ],
  mechanism:
    "JavaScript 由 ECMAScript 规定语言语义，宿主提供 Web 或服务器 API；对象原型、函数和事件任务共同构成常见执行模型，JSON 是独立数据格式",
  success: "5.1 JavaScript ：一个草根的逆袭 的输入、机制、输出与复位轨迹一致",
  failure:
    "5.1 JavaScript ：一个草根的逆袭 在“用 eval 解析 JSON 或把 JSON 当成含函数与原型的完整 JavaScript 对象语法”处拒绝",
} as const;

export function Crv18Section0501Lab() {
  return <CoderMechanismLab {...profile} />;
}
