import type { ReviewQuestion } from "@/data/review/types";

export const optProcessImprovementQuestions: ReviewQuestion[] = [
  {
    id: "opt-pi-1",
    chapter: "opt-process-improvement",
    level: 1,
    question: "PDCA循环的四个阶段分别是什么？为什么说它是「螺旋上升」而非「原地打转」？",
    answer:
      "PDCA四阶段：P（Plan）计划——制定目标和方案；D（Do）执行——实施方案并收集数据；C（Check）检查——评估效果对比目标；A（Act）改进——标准化成功经验。说它是螺旋上升因为：每一轮A阶段都将成功经验标准化为新的基线，下一轮PDCA在更高水平上开始，而不是回到原点。持续多轮PDCA就形成持续上升的改进螺旋。",
    tags: ["PDCA", "持续改进", "螺旋上升", "标准化"],
  },
  {
    id: "opt-pi-2",
    chapter: "opt-process-improvement",
    level: 2,
    question: "六西格玛DMAIC五步法的每一步目标是什么？6西格玛水平的缺陷率是多少？",
    answer:
      "DMAIC五步目标：D（Define）定义——确定问题和客户需求；M（Measure）测量——收集数据建立基线；A（Analyze）分析——识别根因和关键因素；I（Improve）改进——实施方案优化流程；C（Control）控制——建立监控维持成果。6西格玛水平意味着每百万次机会中缺陷不超过3.4个，即合格率99.99966%。",
    tags: ["六西格玛", "DMAIC", "缺陷率", "3.4ppm"],
  },
  {
    id: "opt-pi-3",
    chapter: "opt-process-improvement",
    level: 2,
    question: "精益生产的七大浪费分别是什么？",
    answer:
      "七大浪费是：①过量生产——生产多于需求；②等待——人等物或物等人；③搬运——不必要的物料移动；④过度加工——超出客户要求的加工；⑤库存——过多的原材料、在制品或成品；⑥动作——人的不必要动作；⑦不良品——返工和报废。核心原则是：任何不为客户创造价值的活动都是浪费，应系统性消除。",
    tags: ["精益生产", "七大浪费", "消除浪费", "客户价值"],
  },
  {
    id: "opt-pi-4",
    chapter: "opt-process-improvement",
    level: 3,
    question: "价值流图如何区分增值时间和非增值时间？看板管理如何实现拉动式生产？",
    answer:
      "价值流图将整个流程从原材料到客户可视化，标注每个环节的处理时间和等待时间。增值时间是直接为客户创造价值的活动时间，非增值时间是等待和搬运等不创造价值的时间。通常增值时间只占总时间的很小比例（如25%），改善重点是压缩非增值时间。看板管理通过可视化的信号卡片（看板）实现拉动式生产：后工序只在需要时向前工序发出生产指令，前工序只生产被领取的数量，从而控制在制品库存，避免过量生产浪费。",
    tags: ["价值流图", "增值时间", "看板", "拉动式生产"],
  },
];
