import type { ReviewQuestion } from "./types";

export const fengErrorTrackingQuestions: ReviewQuestion[] = [
  {
    id: "feng-error-tracking-1",
    chapter: "feng-error-tracking",
    level: 2,
    question: `前端错误追踪系统（如 Sentry）的工作流程是什么？`,
    answer:
      `Sentry 工作流程：①捕获——SDK 在用户浏览器通过 window.onerror、window.onunhandledrejection、ErrorBoundary 等捕获运行时异常；②采集——收集错误堆栈、用户轨迹（breadcrumb，如点击/导航/请求记录）、设备/浏览器/应用版本/release 标签；③上报——用 navigator.sendBeacon 或 fetch 将错误数据异步上报到 Sentry 服务端（不阻塞页面、不丢数据）；④还原——Sentry 用上传的 SourceMap 把压缩后的堆栈还原成源码位置（文件名/行号/列号/原始变量名）；⑤聚合——相同堆栈归并为一个 issue，按影响用户数和频率排序；⑥告警——达到阈值（首次出现/激增/错误率超限）触发通知（飞书/钉钉/oncall）；⑦修复——开发者定位源码、修复、发版，Sentry 标记 issue resolved，监控曲线下降验证。整个流程把「线上报错」变成「可定位、可追踪、可验证」的闭环。`,
    tags: ["Sentry", "错误追踪", "流程"],
  },
  {
    id: "feng-error-tracking-2",
    chapter: "feng-error-tracking",
    level: 3,
    question: `SourceMap 在错误追踪中起什么作用？为什么不能暴露给客户端？`,
    answer:
      `SourceMap 是构建时生成的映射文件（.map），记录了压缩代码到源代码的对应关系（位置、变量名）。在错误追踪中，用户浏览器上报的错误堆栈是压缩后的（如 a.js:1:23456），毫无可读性。Sentry 用 SourceMap 把压缩堆栈还原成源码位置（如 src/components/Login.tsx:42:15），让开发者直接看到是哪行源码出错。不暴露给客户端的原因：①安全——SourceMap 包含完整源码结构、变量名、注释，暴露等于公开源代码，攻击者可据此分析业务逻辑和漏洞；②体积——SourceMap 可能比产物还大，暴露给客户端增加不必要下载；③隐私——源码可能含内部命名、API 路径等不希望暴露的信息。正确做法：构建时生成 SourceMap，上传到 Sentry 私有存储，产物中不引用 SourceMap（删除 sourceMappingURL 注释或不发布 .map 到 CDN）。`,
    tags: ["SourceMap", "Sentry", "安全"],
  },
  {
    id: "feng-error-tracking-3",
    chapter: "feng-error-tracking",
    level: 3,
    question: `Sentry 如何做错误聚合去重？为什么聚合很重要？`,
    answer:
      `Sentry 通过「错误指纹（fingerprint）」聚合——默认用错误堆栈的类型和调用栈结构生成指纹，相同指纹的报错归并为同一个 issue，记录累计发生次数和影响用户数。也可自定义 fingerprint 规则（如把动态 URL 参数归一化，避免同一错误因 URL 不同被拆成多个 issue）。聚合重要的原因：①避免淹没——同一个 bug 可能被成千上万用户触发上万次，不聚合的话告警和看板会被同一错误刷屏，淹没真正的新问题；②聚焦优先级——按影响用户数和频率排序，团队优先修影响最大的 issue，而非逐条处理；③追踪修复——一个 issue 从出现到修复的状态变化可追踪，修复后新发版如果不再出现，标记 resolved。去重的关键是 fingerprint 设计得当——太粗（所有错误归一）会漏，太细（每个实例独立）会炸，需要根据错误类型调优。`,
    tags: ["Sentry", "聚合", "去重", "fingerprint"],
  },
  {
    id: "feng-error-tracking-4",
    chapter: "feng-error-tracking",
    level: 4,
    question: `如何设计有效的错误告警策略，避免告警风暴和告警疲劳？`,
    answer:
      `告警风暴（告警太多）和告警疲劳（看到告警就忽略）是错误追踪的常见陷阱。有效策略：①按率告警而非逐条——不每条错误都告警，而是错误率超阈值（如 5 分钟内错误率 > 1%）才告警，过滤偶发噪音；②分级——P0（核心功能不可用/错误率激增）打电话 oncall，P1（重要功能异常）发 IM，P2（轻微/已知）只上看板，按严重度匹配通知强度；③首次出现告警——新类型错误首次出现告警（可能是新 bug），已知的旧错误不重复告警；④激增告警——错误量短时间内翻倍告警（可能是新版本引入退化）；⑤治理噪音——已知且暂不修的 issue 标记 ignored/resolved，不再告警；⑥关联版本——告警带 release 标签，快速定位是哪个版本引入的；⑦告警可行动——每条告警附带 Sentry 链接、影响面、源码位置，让接收者能立即行动而非只是「知道了」。目标：高信噪比——收到的每条告警都值得看、能行动。告警多不等于监控好，告警准才是。`,
    tags: ["告警", "Sentry", "告警治理", "工程实践"],
  },
];
