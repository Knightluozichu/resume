"use client";

import { MathGirlOfficialLab } from "./official-lab";

const definitionCases = [
  {
    label: "质数",
    fields: [
      ["对象", "大于1的正整数p"],
      ["条件", "正因数只有1和p"],
      ["边界", "1不是质数；负数需另行约定"],
    ],
  },
  {
    label: "绝对值",
    fields: [
      ["对象", "实数x"],
      ["条件", "x>=0时为x，x<0时为-x"],
      ["结构", "到0的距离，结果始终非负"],
    ],
  },
  {
    label: "方程",
    fields: [
      ["对象", "含未知量且指定定义域的等式"],
      ["任务", "找出使等式成立的值"],
      ["证据", "解集与增根/失根检查"],
    ],
  },
  {
    label: "恒等式",
    fields: [
      ["对象", "在声明定义域内的所有允许值"],
      ["任务", "证明左右两侧始终相等"],
      ["证据", "代数推导及每步适用条件"],
    ],
    alert: "符号本身不总能告诉你它是方程还是恒等式；定义域、量词和作者意图共同决定任务。",
  },
] as const;

const formCases = [
  {
    label: "积式",
    fields: [
      ["表达", "(x-a)(x-b)=0"],
      ["可见信息", "零点x=a或x=b直接暴露"],
      ["适合", "求根、符号分析、重数判断"],
    ],
  },
  {
    label: "和式",
    fields: [
      ["表达", "x^2-(a+b)x+ab=0"],
      ["可见信息", "系数、次数与同类项直接暴露"],
      ["适合", "比较系数、代入、一般化"],
    ],
  },
  {
    label: "展开",
    fields: [
      ["动作", "用分配律把积式变为和式"],
      ["保持", "对所有允许x，表达式的值不变"],
      ["检查", "中间项系数为-(a+b)，常数项为ab"],
    ],
  },
  {
    label: "因式分解",
    fields: [
      ["动作", "把和式恢复为因式乘积"],
      ["保持", "使用恒等变形，不改变原方程解集"],
      ["检查", "展开回去并比较每一项系数"],
    ],
    alert: "形式转换要区分恒等变形和只在部分值上成立的操作；除以含未知量的式子可能丢失使除数为0的解。",
  },
] as const;

const readingCases = [
  {
    label: "符号",
    fields: [
      ["问题", "每个符号表示对象、操作还是关系？"],
      ["动作", "标注变量、常量、函数、等号和括号范围"],
      ["失败信号", "只按外形套公式"],
    ],
  },
  {
    label: "定义域",
    fields: [
      ["问题", "变量允许取整数、实数还是复数？"],
      ["动作", "先排除分母0、偶次根负数等非法值"],
      ["失败信号", "答案跨入题目未允许的数域"],
    ],
  },
  {
    label: "量词",
    fields: [
      ["问题", "是求存在的解，还是证明任意值成立？"],
      ["动作", "把“存在”和“对所有”写在等式前"],
      ["失败信号", "用几个代入样本证明恒等"],
    ],
  },
  {
    label: "结构",
    fields: [
      ["问题", "积、和、幂或复合形式暴露了什么？"],
      ["动作", "选择展开、因式分解、配方或代换"],
      ["失败信号", "变形后无法说明保留了什么"],
    ],
    alert: "阅读公式像阅读一封信：先辨认词汇和语法，再结合上下文理解作者希望你证明、求解还是变形。",
  },
] as const;

export function Mg1DefinitionReadingLab() {
  return <MathGirlOfficialLab cases={definitionCases} caption="定义明确对象、条件、边界和证明任务。" tone="cyan" />;
}

export function Mg1ProductSumFormLab() {
  return <MathGirlOfficialLab cases={formCases} caption="积式暴露零点，和式暴露系数，恒等变形连接两者。" tone="violet" />;
}

export function Mg1FormulaReadingLab() {
  return <MathGirlOfficialLab cases={readingCases} caption="符号、定义域、量词和整体结构组成公式阅读协议。" tone="emerald" />;
}
