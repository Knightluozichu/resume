"use client";

import { MathGirlOfficialLab } from "./official-lab";

const setCases = [
  {
    label: "元素与单元素集",
    fields: [
      ["元素", "1"],
      ["单元素集", "{1}"],
      ["区别", "1∈{1}，但{1}∉{1}"],
    ],
  },
  {
    label: "嵌套集合",
    fields: [
      ["大集合", "{{1},{2},{3}}"],
      ["成员", "{1}是它的元素"],
      ["层级", "集合也可成为另一集合的元素"],
    ],
  },
  {
    label: "集合运算",
    fields: [
      ["交集", "A∩B：同时属于"],
      ["并集", "A∪B：至少属于一方"],
      ["空集", "没有任何元素"],
    ],
  },
  {
    label: "关系分层",
    fields: [
      ["成员关系", "x∈A"],
      ["子集关系", "A⊆B"],
      ["集合外延性", "顺序和重复不改变集合"],
    ],
    alert: "元素1与集合{1}不是同一个对象；成员关系∈与子集关系⊆也不能互换。",
  },
] as const;

const russellCases = [
  {
    label: "无限制内涵",
    fields: [
      ["假设", "每个谓词P都生成{x|P(x)}"],
      ["选择谓词", "x不属于x"],
      ["得到", "R={x|x∉x}"],
    ],
  },
  {
    label: "若 R∈R",
    fields: [
      ["按R的定义", "成员必须满足x∉x"],
      ["代入R", "推出R∉R"],
      ["结果", "与假设矛盾"],
    ],
  },
  {
    label: "若 R∉R",
    fields: [
      ["按R的定义", "R满足入选条件"],
      ["因此", "推出R∈R"],
      ["结果", "仍与假设矛盾"],
    ],
  },
  {
    label: "受限分离",
    fields: [
      ["先给集合U", "只筛选U的已有元素"],
      ["写法", "{x∈U|P(x)}"],
      ["现代做法", "使用公理化集合论限制集合形成"],
    ],
    alert: "悖论否定的是“任意性质都无条件生成集合”，不是否定集合或逻辑本身。",
  },
] as const;

const logicCases = [
  {
    label: "交集与合取",
    fields: [
      ["集合", "A∩B"],
      ["逻辑", "P∧Q"],
      ["成员条件", "同时满足P和Q"],
    ],
  },
  {
    label: "并集与析取",
    fields: [
      ["集合", "A∪B"],
      ["逻辑", "P∨Q"],
      ["成员条件", "至少满足P或Q"],
    ],
  },
  {
    label: "补集与否定",
    fields: [
      ["集合", "U\\A"],
      ["逻辑", "¬P"],
      ["边界", "补集必须相对全集U"],
    ],
  },
  {
    label: "De Morgan",
    fields: [
      ["集合", "U\\(A∩B)=(U\\A)∪(U\\B)"],
      ["逻辑", "¬(P∧Q)=¬P∨¬Q"],
      ["对偶", "交换交/并与且/或"],
    ],
    alert: "内涵表示把成员资格翻译为命题真假，因此集合恒等式与逻辑等价式可以逐项互译。",
  },
] as const;

const infinityCases = [
  {
    label: "映射三分类",
    fields: [
      ["单射", "没有两个输入撞到同一输出"],
      ["满射", "目标没有遗漏元素"],
      ["双射", "同时单射且满射"],
    ],
  },
  {
    label: "双射鸟笼",
    fields: [
      ["方法", "元素逐一配对"],
      ["有限集合", "双射等价于元素个数相同"],
      ["无限集合", "仍用双射定义等势"],
    ],
  },
  {
    label: "Galileo 配对",
    fields: [
      ["函数", "n↦n^2"],
      ["源", "所有自然数"],
      ["目标", "所有平方数"],
    ],
  },
  {
    label: "Dedekind 飞跃",
    fields: [
      ["事实", "平方数是自然数的真子集"],
      ["仍然", "两者存在双射"],
      ["定义", "与真子集等势是无限的标志"],
    ],
    alert: "有限集合不可能与真子集双射；无限集合恰会出现这种反直觉现象。伽利略折返，Dedekind与Cantor把它变成新定义。",
  },
] as const;

export function Mg3SetStructureLab() {
  return <MathGirlOfficialLab cases={setCases} caption="先分清元素、集合与集合之间的关系，再让交集、并集和子集运算落在正确层级。" tone="cyan" />;
}

export function Mg3RussellParadoxLab() {
  return <MathGirlOfficialLab cases={russellCases} caption="R是否属于自身的两种回答都会翻转成反面，迫使集合形成规则从无限制内涵转为受限公理。" tone="amber" />;
}

export function Mg3SetLogicBridgeLab() {
  return <MathGirlOfficialLab cases={logicCases} caption="成员条件的真值把交、并、补集逐项翻译成且、或、非，De Morgan律在两边保持同一骨架。" tone="violet" />;
}

export function Mg3GalileoBijectionLab() {
  return <MathGirlOfficialLab cases={infinityCases} caption="用双射绕开逐个计数，自然数与平方数真子集的配对把矛盾感转化成无限的结构特征。" tone="emerald" />;
}
