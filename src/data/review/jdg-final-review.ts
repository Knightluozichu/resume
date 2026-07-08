import type { ReviewQuestion } from "./types";

export const jdgFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "jdg-final-review-1",
    chapter: "jdg-final-review",
    level: 2,
    question: "什么是「运行时旅程」？它如何串联全书四层知识？",
    answer:
      "运行时旅程是 JavaScript 代码从源码字符到网页响应的完整链路：词法解析（字符→token→语句，ASI 决定边界）→ 类型求值（七种原始类型按值、对象按引用、类型转换由抽象操作驱动）→ 函数封装（四种定义形式、this 调用点绑定、闭包延续作用域、class 语法糖、ESM 静态 import）→ 数据加工（数组纯函数/副作用、Map/Set 集合、Proxy/Reflect 元编程）→ 网页响应（事件流三阶段、委托减负、Fetch Promise 请求、Storage 存储、Worker 多线程）。四层知识（语言核心/函数抽象/标准库元编程/Web 平台）在这条链路上各司其职。它是串联全书的主线，因为真实代码的每次交互都走完这条链路：用户点击→事件监听→闭包捕获→async 请求→数据处理→DOM 更新。",
    tags: ["运行时旅程", "架构", "四层知识"],
  },
  {
    id: "jdg-final-review-2",
    chapter: "jdg-final-review",
    level: 3,
    question: "用四层知识解释 `class { async load() { this.#cache = new Map(); await fetch(...) } }` 涉及哪些层。",
    answer:
      "同时动用四层：①语言核心——class 声明不提升（TDZ 先声明后用）、内部默认严格模式；字符串模板 `${this.endpoint}/${id}` 涉及类型转换；res.json() 返回对象是引用类型。②函数抽象——class 是原型链语法糖方法 load 在原型上供实例共享；#cache 是私有字段（真私有不在原型）；async load 返回 Promise，this 由调用点绑定（mgr.load() 时 this 指向 mgr，回调中传递需防 this 丢失）。③标准库与元编程——new Map() 创建有序键值集合，has/get/set 操作 Map（优于对象当字典，任意键有序无原型干扰）。④Web 平台——fetch 发请求 4xx/5xx 不 reject 需手动检查 res.ok；document.addEventListener 事件委托 e.target.closest 精确匹配；textContent 更新 DOM。四层在一组代码里全部参与，分开学无法解释整体行为。",
    tags: ["四层交叉", "class", "Map", "fetch"],
  },
  {
    id: "jdg-final-review-3",
    chapter: "jdg-final-review",
    level: 3,
    question: "全书四层交叉的关键洞察是什么？工程判断力的标志是什么？",
    answer:
      "四层交叉洞察：词法是地基（ASI 决定语句边界，省分号有时出错）→ 类型是数据真相（原始按值/对象按引用/转换有规则）→ 函数是抽象工具（this 调用点绑定/闭包延续作用域/模块静态分析）→ 标准库是工具箱（Map 优于对象当字典/纯函数不改原数组/Proxy 改写默认行为）→ Web 是舞台（委托减负/Fetch 手动查状态/Worker 卸载计算）。工程判断力的标志：看到一段代码能预判运行时行为和性能影响而非「跑一下才知道」——知道闭包何时泄漏、this 何时丢失、展开何时浅拷贝、Fetch 4xx 何时不进 catch、Worker 何时该用、Map 何时优于对象。通过五问套路（词法/类型/函数/标准库/Web）分析任意代码达成。",
    tags: ["工程判断力", "四层交叉", "洞察"],
  },
  {
    id: "jdg-final-review-4",
    chapter: "jdg-final-review",
    level: 4,
    question: "为什么说四层知识不能分开背？如何用「五问套路」分析任意 JavaScript 代码？",
    answer:
      "真实代码从不分开用四层。一个 class 里的 async 方法访问 this.#cache（Map），同时涉及词法（class 不提升/TDZ）、类型（对象引用）、函数（async 返回 Promise、this 调用点绑定、# 私有字段）、标准库（Map 集合）、Web 平台（fetch 请求、DOM 更新）。当独立知识点背，遇到组合场景解释不了。五问套路分析任意代码：①词法层——字符如何解析（ASI/标识符/关键字/TDZ）？②类型层——类型如何求值（原始按值还是对象按引用？有无隐式转换）？③函数层——函数如何封装（this 在调用点如何绑定？闭包延续哪些作用域？模块如何组织）？④标准库层——数据如何加工（用纯函数还是副作用方法？Map 还是对象？有无 Proxy 拦截）？⑤Web 层——网页如何响应（事件如何传播？Fetch 如何处理错误？是否需 Worker）？把五问变成分析任意代码的固定套路，才算从「会写 API」到「懂选型」的跨越。",
    tags: ["五问套路", "工程判断力", "学习方法"],
  },
];
