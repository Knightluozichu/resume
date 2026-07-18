"use client";

import { DsvOfficialLab } from "./official-lab";

const qualityCases = [
  { label: "正确性", fields: [["问题", "对定义域内所有输入是否满足规格"], ["证据", "不变量、边界分类、oracle与性质测试"], ["反例", "只在一个示例输出正确"]] },
  { label: "可读性", fields: [["问题", "他人能否复核状态、边界与终止"], ["证据", "命名、分层、契约和推导一致"], ["反例", "用短代码隐藏前置条件"]] },
  { label: "健壮性", fields: [["问题", "非法输入和资源失败是否可控"], ["证据", "明确status、无部分修改、资源归零"], ["反例", "越界、溢出或分配失败未定义"]] },
  { label: "效率", fields: [["问题", "目标规模下时间与空间是否满足预算"], ["证据", "事前阶分析加事后profile"], ["反例", "只用一次wall-clock比较"]], alert: "四项不是互相替代：更快但错误、不可维护或遇到坏输入就破坏状态的程序，不是更好的算法。" },
] as const;

const growthCases = [
  { label: "O(1)", fields: [["增长", "操作次数不随n增长"], ["例子", "已验证下标后的数组读取"], ["放大", "n乘10，主项近似不变"]] },
  { label: "O(log n)", fields: [["增长", "每步把候选规模按常数比例缩小"], ["例子", "有序数组折半查找"], ["放大", "n乘2，只增加约一步"]] },
  { label: "O(n)", fields: [["增长", "每个元素做常数次工作"], ["例子", "扫描无序表查最大值"], ["放大", "n乘10，工作近似乘10"]] },
  { label: "O(n^2)", fields: [["增长", "元素对或两层相关循环"], ["例子", "比较所有无序对"], ["放大", "n乘10，工作近似乘100"]], alert: "大O描述上界的增长阶，不自动说明常数、输入分布、缓存、并行性或真实运行时间。" },
] as const;

const evidenceCases = [
  { label: "Input", fields: [["记录", "n表示什么、输入是否有序、值域与分布"], ["目的", "避免对不同问题比较同一个公式"], ["失败", "把数字大小误当元素数量"]] },
  { label: "Count", fields: [["记录", "选择基本操作并写精确/上界次数"], ["目的", "把代码结构转为T(n)"], ["失败", "只看循环层数不看迭代依赖"]] },
  { label: "Bound", fields: [["记录", "去常数低阶项，证明O/Theta/Omega"], ["目的", "得到随规模增长的可迁移结论"], ["失败", "只有直觉，没有n0和常数"]] },
  { label: "Measure", fields: [["记录", "实现、机器、编译器、数据集、次数与统计量"], ["目的", "验证常数、缓存和系统效应"], ["失败", "一次计时当作复杂度证明"]], alert: "事前分析与事后统计互补：前者解释增长，后者验证实现和机器上的常数因素。" },
] as const;

export function DsvAlgorithmQualityLab() {
  return <DsvOfficialLab cases={qualityCases} caption="正确性、可读性、健壮性和效率共同定义算法质量。" tone="cyan" />;
}

export function DsvGrowthOrderLab() {
  return <DsvOfficialLab cases={growthCases} caption="常数、对数、线性和平方阶在规模放大时呈现不同趋势。" tone="violet" />;
}

export function DsvComplexityEvidenceLab() {
  return <DsvOfficialLab cases={evidenceCases} caption="输入模型、操作计数、渐近界与实测证据构成完整复杂度结论。" tone="emerald" />;
}
