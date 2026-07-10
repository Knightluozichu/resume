import type { ReviewQuestion } from "./types";

export const poaWebPresentationQuestions: ReviewQuestion[] = [
  {
    id: "poa-web-presentation-01",
    chapter: "poa-web-presentation",
    level: 1,
    question: `MVC 模式中模型、视图、控制器各自的职责是什么？`,
    answer: `MVC 三职责：① 模型（Model）——承载领域逻辑和数据状态，不感知 UI 的存在；② 视图（View）——渲染模型数据为用户可见的输出（HTML/JSON），只读取模型数据不修改；③ 控制器（Controller）——接收用户输入（HTTP 请求），协调模型操作和视图选择。工作流程：控制器接收请求 → 调用模型执行业务操作 → 选择适当的视图渲染结果 → 返回响应。MVC 的核心是分离关注点：模型关注业务，视图关注展示，控制器关注流程协调。`,
    tags: ["MVC", "职责分离", "表现模式"],
  },
  {
    id: "poa-web-presentation-02",
    chapter: "poa-web-presentation",
    level: 2,
    question: `页面控制器和前端控制器有什么区别？各自适合什么场景？`,
    answer: `页面控制器（Page Controller）：每个页面/URL 对应一个控制器实例，只处理该页面的请求逻辑，简单直接但重复代码多。前端控制器（Front Controller）：单一入口处理所有请求，通过路由分发到不同的处理器，统一了认证、日志、异常处理等横切逻辑。页面控制器适合页面数量少、逻辑简单的系统；前端控制器适合需要统一请求处理流程的中大型 Web 应用。现代框架（如 Spring MVC、Next.js API Routes）通常使用前端控制器模式，由框架提供统一入口和路由分发。`,
    tags: ["页面控制器", "前端控制器", "路由模式"],
  },
  {
    id: "poa-web-presentation-03",
    chapter: "poa-web-presentation",
    level: 2,
    question: `模板视图和转换视图的区别是什么？两步视图解决什么问题？`,
    answer: `模板视图（Template View）：在 HTML 模板中嵌入动态标记（如 JSP 的 EL 表达式、ERB 的 Ruby 代码），视图引擎渲染时替换标记为实际数据，开发者直接在 HTML 中写逻辑。转换视图（Transform View）：编写转换程序，将领域数据结构逐个转换为 HTML 节点，类似于 XSLT 转换，数据和展示完全分离。两步视图（Two Step View）：第一步将领域数据转换为逻辑屏幕结构（不含具体 HTML），第二步将逻辑屏幕转换为最终 HTML，解决多主题/多设备渲染问题——只需替换第二步的转换器即可切换展示风格。`,
    tags: ["模板视图", "转换视图", "两步视图"],
  },
  {
    id: "poa-web-presentation-04",
    chapter: "poa-web-presentation",
    level: 3,
    question: `设计一个 Web 应用的请求处理流程，说明用到了哪些表现模式。`,
    answer: `请求处理流程及模式应用：① 前端控制器——所有请求经过单一入口（如 DispatcherServlet），统一处理认证、日志、CORS 等横切关注点；② 截断过滤器（Intercepting Filter）——在前端控制器前后链式执行过滤器（认证过滤器 → 日志过滤器 → 压缩过滤器），可灵活增删；③ 应用控制器——根据 URL 路由到对应的页面控制器/命令处理器，集中管理路由映射；④ 页面控制器——具体处理器执行业务逻辑，调用服务层/领域模型；⑤ 模板视图——控制器选择视图模板（如 Thymeleaf/JSP），渲染模型数据为 HTML；⑥ 视图助手——视图中复杂的格式化/国际化的逻辑通过辅助类/标签库处理，保持模板简洁。最终生成 HTML 响应返回客户端。这条流程体现了表现模式的分层协作：入口统一 → 过滤链 → 路由分发 → 业务执行 → 视图渲染。`,
    tags: ["请求处理", "表现模式", "架构设计"],
  },
];
