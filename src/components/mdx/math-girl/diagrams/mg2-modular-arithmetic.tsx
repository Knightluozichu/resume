"use client";

import { MathGirlOfficialLab } from "./official-lab";

const remainderCases = [
  {
    label: "带余除法",
    fields: [
      ["整数关系", "a=bq+r"],
      ["余数范围", "0<=r<|b|"],
      ["角色", "q是商，r是余数"],
    ],
  },
  {
    label: "十二时钟",
    fields: [
      ["15点", "15 mod 12=3"],
      ["23点", "23 mod 12=11"],
      ["12点", "余数是0，钟面用12标示"],
    ],
  },
  {
    label: "同余",
    fields: [
      ["写法", "a≡b (mod m)"],
      ["余数语言", "a与b除以m余数相同"],
      ["整除语言", "m整除a-b"],
    ],
  },
  {
    label: "剩余类",
    fields: [
      ["模5的0类", "..., -5, 0, 5, 10, ..."],
      ["模5的2类", "..., -3, 2, 7, 12, ..."],
      ["作用", "把无限整数折叠成5类"],
    ],
    alert: "钟面上的12不是余数12。它只是用熟悉的钟面标签代表模12的余数类0。",
  },
] as const;

const cancellationCases = [
  {
    label: "加减乘",
    fields: [
      ["已知", "a≡b, c≡d (mod m)"],
      ["可做", "a+c≡b+d"],
      ["还可做", "ac≡bd"],
    ],
  },
  {
    label: "幂运算",
    fields: [
      ["已知", "a≡b (mod m)"],
      ["结论", "a^n≡b^n (mod m)"],
      ["依据", "重复使用乘法相容性"],
    ],
  },
  {
    label: "错误约分",
    fields: [
      ["事实", "2*1≡2*4 (mod 6)"],
      ["错误结论", "1≡4 (mod 6)"],
      ["失败原因", "gcd(2,6)=2，不可逆"],
    ],
  },
  {
    label: "合法消去",
    fields: [
      ["条件", "ac≡bc (mod m)"],
      ["若gcd(c,m)=1", "可推出a≡b (mod m)"],
      ["一般结论", "a≡b (mod m/gcd(c,m))"],
    ],
    alert: "同余式中的除法实质是乘以逆元。只有被消去的数在当前模数下可逆，才能保持原模数不变。",
  },
] as const;

const structureCases = [
  {
    label: "乘法表",
    fields: [
      ["研究对象", "模m的乘法行"],
      ["可逆信号", "该行是全部剩余类的排列"],
      ["等价条件", "gcd(a,m)=1"],
    ],
  },
  {
    label: "既约剩余类群",
    fields: [
      ["集合", "U(m)={a类 | gcd(a,m)=1}"],
      ["运算", "模m乘法"],
      ["逆元", "每个既约剩余类都有"],
    ],
  },
  {
    label: "剩余类环",
    fields: [
      ["集合", "Z/mZ"],
      ["两种运算", "模m加法与乘法"],
      ["结构", "加法阿贝尔群加分配律"],
    ],
  },
  {
    label: "有限域",
    fields: [
      ["模数", "素数p"],
      ["原因", "1到p-1都与p互质"],
      ["结论", "F_p=Z/pZ中非零元全可逆"],
    ],
    alert: "模合数时会出现非零零因子，例如2*3≡0 (mod 6)；因此Z/6Z是环，却不是域。",
  },
] as const;

export function Mg2RemainderCongruenceLab() {
  return <MathGirlOfficialLab cases={remainderCases} caption="从带余除法到时钟，再把同余理解成对整数的有限分类。" tone="cyan" />;
}

export function Mg2CongruenceCancellationLab() {
  return <MathGirlOfficialLab cases={cancellationCases} caption="加、减、乘与幂都尊重同余；除法必须先找到逆元。" tone="amber" />;
}

export function Mg2ResidueStructureLab() {
  return <MathGirlOfficialLab cases={structureCases} caption="乘法表揭示可逆元；同一批剩余类由群升级为环，并在素数模下成为域。" tone="emerald" />;
}
