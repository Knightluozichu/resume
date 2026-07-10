import type { ReviewQuestion } from "./types";

export const fengPerformanceMonitorQuestions: ReviewQuestion[] = [
  {
    id: "feng-performance-monitor-1",
    chapter: "feng-performance-monitor",
    level: 2,
    question: `Web Vitals 的三大核心指标（LCP/INP/CLS）分别衡量什么？目标值是多少？`,
    answer:
      `LCP（Largest Contentful Paint，最大内容绘制）衡量「加载体验」——首屏中最大元素（图片/文本块/视频）渲染完成的时间，目标 < 2.5s，超过 4s 为差。它反映用户看到主要内容要等多久。INP（Interaction to Next Paint，交互到下一帧）衡量「交互响应」——用户所有交互（点击/按键）到下一帧渲染的最坏延迟，目标 < 200ms，超过 500ms 为差。它于 2024 年替代 FID，覆盖页面全生命周期而非仅首次输入。CLS（Cumulative Layout Shift，累积布局偏移）衡量「视觉稳定」——页面意外位移的累积分数，目标 < 0.1，超过 0.25 为差。它反映页面是否「跳动」让用户误点。三者分别覆盖加载、交互、稳定三个维度，是 Google 评定页面体验的核心指标。`,
    tags: ["Web Vitals", "LCP", "INP", "CLS"],
  },
  {
    id: "feng-performance-monitor-2",
    chapter: "feng-performance-monitor",
    level: 3,
    question: `Lighthouse（实验室检测）和 RUM（真实用户监控）有什么区别？为什么要两者结合？`,
    answer:
      `Lighthouse 是实验室环境合成检测：在固定网络条件和模拟设备上跑页面，产出性能评分和优化建议。优点是可控、可重复、可进 CI 守阈值；缺点是无法反映真实用户的设备和网络多样性，且模拟环境可能与真实体验偏差大。RUM（Real User Monitoring）采集真实用户的性能数据：通过 web-vitals 库 + PerformanceObserver 在用户浏览器采集真实 LCP/INP/CLS，用 navigator.sendBeacon 上报到后端聚合。优点是反映真实体验分布（P75/P95）；缺点是被动采集、无法给优化建议、受用户环境噪音影响。两者结合：Lighthouse 在 CI 中守住「不低于 X 分」的基线（防退化），RUM 在线上看「真实用户的 P75 是否达标」（知实况）。缺 Lighthouse 不知如何优化，缺 RUM 不知真实体验——两者互补。`,
    tags: ["Lighthouse", "RUM", "性能监控"],
  },
  {
    id: "feng-performance-monitor-3",
    chapter: "feng-performance-monitor",
    level: 3,
    question: `如何优化 LCP？常见瓶颈和对应手段有哪些？`,
    answer:
      `LCP 的瓶颈通常在「最大元素何时能渲染」，常见瓶颈和手段：①大图未优化——用现代格式（WebP/AVIF）、压缩、懒加载非首屏图、为 LCP 图加 fetchpriority=high 或 preload；②JS 阻塞渲染——减少首屏 JS 体积（代码分割、tree-shaking）、defer/async 非关键脚本、避免 hydration 过重；③SSR/SSG 首屏直出——服务端渲染让 HTML 直接含内容，不必等 JS 下载执行后才渲染（但需注意 hydration 不阻塞）；④字体加载阻塞——font-display: swap、preload 关键字体、用系统字体兜底；⑤CDN 加速——静态资源上 CDN 减少网络延迟、用 CDN 边缘缓存；⑥TTFB 慢——优化服务端响应或用边缘渲染。诊断：用 Lighthouse 找出 LCP 元素是什么、用 Performance 面板看它被阻塞在哪一步（下载/解析/渲染），针对性优化。`,
    tags: ["LCP", "性能优化", "首屏"],
  },
  {
    id: "feng-performance-monitor-4",
    chapter: "feng-performance-monitor",
    level: 4,
    question: `性能监控中为什么要看 P75 而非平均值？如何建立性能告警机制？`,
    answer:
      `看 P75（75 分位数）而非平均值的原因：①平均值掩盖长尾——如果 80% 用户 LCP 是 1s 但 20% 是 8s，平均值 2.2s 看着还行，但那 20% 用户体验极差。平均值会被快用户拉低，掩盖慢用户的痛苦。②Web Vitals 官方标准就是按 P75 评定——Google 用「75% 的页面加载达到 Good」作为搜索排名考量。③分位数反映分布——P75 表示「75% 的用户体验优于这个值」，关注的是「大多数人的下限体验」而非「所有人的平均假象」。建立性能告警机制：①采集——web-vitals 库在真实用户端采集 LCP/INP/CLS，按版本/地域/设备分桶上报；②聚合——后端按分位数聚合（P75/P95），存时序数据库；③告警——设阈值（如 LCP P75 > 2.5s 持续 10 分钟触发），异常飞书/钉钉通知；④关联——告警带版本标签，定位是哪个发布引入的退化；⑤看板——Grafana 展示指标趋势，发版前后对比。告警要区分「绝对阈值」（不达标）和「相对退化」（比上一版差 X%），两者都需关注。`,
    tags: ["性能监控", "P75", "告警", "统计"],
  },
];
