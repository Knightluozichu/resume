"use client";

import { MathGirlOfficialLab } from "./official-lab";

const recurrenceCases = [
  {
    label: "种子",
    fields: [
      ["约定", "F0=0，F1=1"],
      ["职责", "确定递推序列的起点与索引"],
      ["检查", "改变任一初值会得到另一条合法序列"],
    ],
  },
  {
    label: "递推",
    fields: [
      ["规则", "Fn=F(n-1)+F(n-2)，n>=2"],
      ["生成", "0, 1, 1, 2, 3, 5, 8, 13"],
      ["依赖", "每个新状态只读取前两个状态"],
    ],
  },
  {
    label: "表格",
    fields: [
      ["列", "n / F(n-2) / F(n-1) / Fn"],
      ["动作", "先写索引，再代入，不凭记忆抄数列"],
      ["失败信号", "把F0=0约定错写成从1,1开始编号"],
    ],
  },
  {
    label: "组合解释",
    fields: [
      ["对象", "用长度1或2的砖铺满长度n"],
      ["分类", "最后一块长1或长2，两类互斥且完备"],
      ["结论", "铺法数Tn=T(n-1)+T(n-2)"],
    ],
    alert: "递推式、初值和索引必须作为一个整体陈述；只说“前两项相加”无法唯一确定序列。",
  },
] as const;

const generatingCases = [
  {
    label: "编码",
    fields: [
      ["生成函数", "F(x)=F0+F1x+F2x^2+..."],
      ["系数", "[x^n]F(x)=Fn"],
      ["目的", "把整条数列装进一个形式幂级数"],
    ],
  },
  {
    label: "移位",
    fields: [
      ["xF(x)", "F0x+F1x^2+F2x^3+..."],
      ["x^2F(x)", "F0x^2+F1x^3+F2x^4+..."],
      ["对齐", "同次幂列正好对应递推中的相邻下标"],
    ],
  },
  {
    label: "相减",
    fields: [
      ["式子", "F(x)-xF(x)-x^2F(x)"],
      ["消去", "n>=2的系数因递推全部为0"],
      ["剩余", "常数项0，一次项1，所以结果为x"],
    ],
  },
  {
    label: "求解",
    fields: [
      ["方程", "(1-x-x^2)F(x)=x"],
      ["结果", "F(x)=x/(1-x-x^2)"],
      ["回验", "展开前若干系数并逐项检查递推"],
    ],
    alert: "生成函数相减必须按同次幂对齐。漏掉F0、F1产生的边界项，会让分子错误并污染整条数列。",
  },
] as const;

const closedFormCases = [
  {
    label: "分解",
    fields: [
      ["特征数", "phi=(1+sqrt(5))/2，psi=(1-sqrt(5))/2"],
      ["分母", "1-x-x^2=(1-phi*x)(1-psi*x)"],
      ["桥梁", "1/(1-a*x)的x^n系数为a^n"],
    ],
  },
  {
    label: "取系数",
    fields: [
      ["部分分式", "F(x)=(1/sqrt(5))(1/(1-phi*x)-1/(1-psi*x))"],
      ["封闭式", "Fn=(phi^n-psi^n)/sqrt(5)"],
      ["意义", "无需先算前n-1项即可描述第n项"],
    ],
  },
  {
    label: "精确验收",
    fields: [
      ["初值", "代n=0,1得到0与1"],
      ["递推", "用phi^2=phi+1及psi^2=psi+1验证"],
      ["整数性", "两个无理数幂的差精确抵消为整数"],
    ],
  },
  {
    label: "增长",
    fields: [
      ["事实", "|psi|<1，psi^n迅速衰减"],
      ["近似", "Fn约为phi^n/sqrt(5)"],
      ["边界", "浮点近似不能替代整数递推的精确计算"],
    ],
    alert: "小样本吻合不是证明。封闭表达式至少要同时通过两个初值与递推关系，才由二阶递推的唯一性确定整条序列。",
  },
] as const;

export function Mg1FibonacciRecurrenceLab() {
  return <MathGirlOfficialLab cases={recurrenceCases} caption="种子、递推、索引和组合分类共同确定斐波那契数列。" tone="emerald" />;
}

export function Mg1GeneratingFunctionLab() {
  return <MathGirlOfficialLab cases={generatingCases} caption="乘以x完成下标移位，按同次幂相减让递推项成批消去。" tone="cyan" />;
}

export function Mg1FibonacciClosedFormLab() {
  return <MathGirlOfficialLab cases={closedFormCases} caption="分母分解把有理生成函数还原为两个等比级数，并由系数读出封闭式。" tone="amber" />;
}
