"use client";

import { DsvOfficialLab } from "./official-lab";

const simpleCases = [
  { label: "冒泡", fields: [["动作", "相邻逆序对交换，每趟把极值冒到边界"], ["性质", "稳定、原地；有swap flag可适应已排序"], ["成本", "平均/最坏Theta(n^2)"]] },
  { label: "选择", fields: [["动作", "每趟选未排序区最小值与边界交换"], ["性质", "通常不稳定、原地、交换次数少"], ["成本", "比较始终Theta(n^2)"]] },
  { label: "插入", fields: [["动作", "把当前项插入已排序前缀并移动较大项"], ["性质", "稳定、原地、对近乎有序自适应"], ["成本", "最好Theta(n)，最坏Theta(n^2)"]] },
  { label: "选择依据", fields: [["小/近有序", "插入排序常有低常数"], ["写入昂贵", "选择排序交换少"], ["教学/检测", "冒泡清晰展示相邻逆序"]], alert: "同为Theta(n^2)，移动次数、稳定性和输入自适应仍不同；不能只看一列复杂度。" },
] as const;

const improvedCases = [
  { label: "希尔", fields: [["动作", "按递减gap对多个子序列做插入排序"], ["性质", "原地、通常不稳定"], ["关键", "gap sequence决定实际与渐近性能"]] },
  { label: "堆", fields: [["动作", "建最大堆，反复交换堆顶与末尾并sift-down"], ["性质", "原地、不稳定，最坏Theta(n log n)"], ["优势", "无需递归栈，界稳定"]] },
  { label: "归并", fields: [["动作", "合并两个有序run，分治或bottom-up"], ["性质", "稳定，Theta(n log n)，通常需Theta(n)buffer"], ["优势", "顺序I/O，适合外排序"]] },
  { label: "快速", fields: [["动作", "围绕pivot分区，再处理两侧"], ["性质", "通常原地不稳定；平均快、最坏Theta(n^2)"], ["优化", "随机/三数pivot、小段插入、先递归小侧"]], alert: "快速排序最坏界与递归深度必须防守；“平均很快”不能替代 adversarial input 策略。" },
] as const;

const selectionCases = [
  { label: "稳定性", fields: [["需要", "多关键字分阶段排序、保持原顺序"], ["候选", "插入、冒泡、归并（正确tie策略）"], ["非稳定", "选择、希尔、堆、常见快速"]] },
  { label: "内存", fields: [["严格O(1)", "堆、插入、选择、冒泡；快速另有栈"], ["可用O(n)", "归并获得稳定与顺序访问"], ["注意", "递归栈与临时buffer都要计"]] },
  { label: "输入形态", fields: [["近乎有序", "插入/自适应策略"], ["最坏保证", "堆/归并"], ["一般内存数组", "introsort/工程化快速混合"]] },
  { label: "外存", fields: [["限制", "数据大于内存，以块I/O为主"], ["策略", "生成内存sorted runs，再多路归并"], ["证据", "run manifests、checksum、fan-in与原子输出"]], alert: "“最佳排序”由稳定性、key成本、输入形态、内存、I/O和最坏延迟共同决定。" },
] as const;

export function DsvSimpleSortLab() {
  return <DsvOfficialLab cases={simpleCases} caption="冒泡、选择和插入排序在交换、稳定与自适应性上不同。" tone="cyan" />;
}

export function DsvImprovedSortLab() {
  return <DsvOfficialLab cases={improvedCases} caption="希尔、堆、归并与快速排序用不同结构突破简单排序。" tone="violet" />;
}

export function DsvSortSelectionLab() {
  return <DsvOfficialLab cases={selectionCases} caption="稳定性、内存、输入形态和外存I/O共同决定排序选择。" tone="emerald" />;
}
