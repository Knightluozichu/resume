import type { ReviewQuestion } from "./types";

export const fengOfficialQuestions: ReviewQuestion[] = [
  {
    id: "feng-official-learning-map-1",
    chapter: "feng-official-learning-map",
    level: 1,
    question: "《前端工程化：体系设计与实践》权威学习地图的核心主张是什么？",
    answer:
      "原书把工程化拆成历史与方案架构、项目发起、制品构建、本地反馈、静态部署、团队工作流和未来蓝图七个层次，重点是体系设计而非工具清单。",
    tags: ["《前端工程化：体系设计与实践》权威学习地图", "核心机制"],
  },
  {
    id: "feng-official-learning-map-2",
    chapter: "feng-official-learning-map",
    level: 2,
    question:
      "《前端工程化：体系设计与实践》权威学习地图覆盖哪些权威目录条目？",
    answer:
      "第1章 前端工程简史、第2章 脚手架、第3章 构建、第4章 本地开发服务器、第5章 部署、第6章 工作流、第7章 前端工程化的未来",
    tags: ["《前端工程化：体系设计与实践》权威学习地图", "目录覆盖"],
  },
  {
    id: "feng-official-learning-map-3",
    chapter: "feng-official-learning-map",
    level: 2,
    question:
      "《前端工程化：体系设计与实践》权威学习地图的六阶段交付链是什么？",
    answer:
      "核验2018版身份 → 建立方案架构 → 发起标准项目 → 构建定位资源 → 本地开发与部署 → 工作流持续演进",
    tags: ["《前端工程化：体系设计与实践》权威学习地图", "交付链"],
  },
  {
    id: "feng-official-learning-map-4",
    chapter: "feng-official-learning-map",
    level: 3,
    question:
      "《前端工程化：体系设计与实践》权威学习地图为什么不能只看构建成功？",
    answer:
      "构建成功不显示模板漂移、制品同一性、缓存错配、环境互斥与回滚状态，必须重放失败和恢复样本。",
    tags: ["《前端工程化：体系设计与实践》权威学习地图", "故障注入"],
  },
  {
    id: "feng-official-learning-map-5",
    chapter: "feng-official-learning-map",
    level: 3,
    question:
      "《前端工程化：体系设计与实践》权威学习地图签发时保持什么不变量？",
    answer:
      "7 章 99 个公开目录条目都有归属；原书 webpack/Yeoman 语境与现代替代分层说明，工具变化不覆盖原书身份。",
    tags: ["《前端工程化：体系设计与实践》权威学习地图", "工程验收"],
  },
  {
    id: "feng-official-learning-map-6",
    chapter: "feng-official-learning-map",
    level: 3,
    question: "《前端工程化：体系设计与实践》权威学习地图怎样完成可复现实验？",
    answer:
      "固定源码、锁文件、配置和目标环境，每次只改变一个模板、模块、缓存、网络或权限条件，保存首个偏离点并使用同一制品恢复。",
    tags: ["《前端工程化：体系设计与实践》权威学习地图", "恢复实验"],
  },
  {
    id: "feng-01-history-1",
    chapter: "feng-01-history",
    level: 1,
    question: "第 1 章 前端工程简史的核心主张是什么？",
    answer:
      "前端工程化是软件工程在前端交付中的具体实践：它随着浏览器能力、Node.js 工具链、前后端职责和业务规模变化，从文件处理演进为覆盖开发、构建与部署的体系。",
    tags: ["第 1 章 前端工程简史", "核心机制"],
  },
  {
    id: "feng-01-history-2",
    chapter: "feng-01-history",
    level: 2,
    question: "第 1 章 前端工程简史覆盖哪些权威目录条目？",
    answer:
      "第1章 前端工程简史、1.1 前端工程师的基本素养、1.1.1 前端工程师的发展历史、1.1.2 前端工程师的技能栈、1.2 Node.js带给前端的改革、1.2.1 前端的两次新生、1.2.2 Node.js带来的改革、1.3 前后端分离、1.3.1 原始的前后端开发模式、1.3.2 前后端分离的基本模式、1.3.3 前后端分离与前端工程化、1.4 前端工程化、1.4.1 前端工程化的衡量准则、1.4.2 前端工程化的进化历程、1.4.3 前端工程化的3个阶段、1.5 工程化方案架构、1.5.1 webpack、1.5.2 工程化方案的整体架构、1.5.3 功能规划、1.5.4 设计原则、1.6 总结",
    tags: ["第 1 章 前端工程简史", "目录覆盖"],
  },
  {
    id: "feng-01-history-3",
    chapter: "feng-01-history",
    level: 2,
    question: "第 1 章 前端工程简史的六阶段交付链是什么？",
    answer:
      "识别业务阶段 → 划分前后端职责 → 确定工程衡量准则 → 选择演进阶段 → 设计整体架构 → 规划功能与原则",
    tags: ["第 1 章 前端工程简史", "交付链"],
  },
  {
    id: "feng-01-history-4",
    chapter: "feng-01-history",
    level: 3,
    question: "第 1 章 前端工程简史为什么不能只看构建成功？",
    answer:
      "构建成功不显示模板漂移、制品同一性、缓存错配、环境互斥与回滚状态，必须重放失败和恢复样本。",
    tags: ["第 1 章 前端工程简史", "故障注入"],
  },
  {
    id: "feng-01-history-5",
    chapter: "feng-01-history",
    level: 3,
    question: "第 1 章 前端工程简史签发时保持什么不变量？",
    answer:
      "工程方案由业务规模、协作方式、交付频率和质量目标驱动，工具选择能追溯到约束，不把采用 webpack 等同于完成工程化。",
    tags: ["第 1 章 前端工程简史", "工程验收"],
  },
  {
    id: "feng-01-history-6",
    chapter: "feng-01-history",
    level: 3,
    question: "第 1 章 前端工程简史怎样完成可复现实验？",
    answer:
      "固定源码、锁文件、配置和目标环境，每次只改变一个模板、模块、缓存、网络或权限条件，保存首个偏离点并使用同一制品恢复。",
    tags: ["第 1 章 前端工程简史", "恢复实验"],
  },
  {
    id: "feng-02-scaffolding-1",
    chapter: "feng-02-scaffolding",
    level: 1,
    question: "第 2 章 脚手架的核心主张是什么？",
    answer:
      "脚手架把组织约定转换为可重复项目初始化：收集参数、选择模板、渲染文件、安装依赖并给出验证结果；它发起项目但不应永久接管应用运行时。",
    tags: ["第 2 章 脚手架", "核心机制"],
  },
  {
    id: "feng-02-scaffolding-2",
    chapter: "feng-02-scaffolding",
    level: 2,
    question: "第 2 章 脚手架覆盖哪些权威目录条目？",
    answer:
      "第2章 脚手架、2.1 脚手架的功能和本质、2.2 脚手架在前端工程中的角色和特征、2.2.1 用完即弃的发起者角色、2.2.2 局限于本地的执行环境、2.2.3 多样性的实现模式、2.3 开源脚手架案例剖析、2.4 集成Yeoman封装脚手架方案、2.4.1 封装脚手架方案、2.4.2 集成到工程化体系中、2.5 总结",
    tags: ["第 2 章 脚手架", "目录覆盖"],
  },
  {
    id: "feng-02-scaffolding-3",
    chapter: "feng-02-scaffolding",
    level: 2,
    question: "第 2 章 脚手架的六阶段交付链是什么？",
    answer:
      "读取项目意图 → 校验环境参数 → 选择模板版本 → 渲染文件事务 → 安装并验证依赖 → 移交项目所有权",
    tags: ["第 2 章 脚手架", "交付链"],
  },
  {
    id: "feng-02-scaffolding-4",
    chapter: "feng-02-scaffolding",
    level: 3,
    question: "第 2 章 脚手架为什么不能只看构建成功？",
    answer:
      "构建成功不显示模板漂移、制品同一性、缓存错配、环境互斥与回滚状态，必须重放失败和恢复样本。",
    tags: ["第 2 章 脚手架", "故障注入"],
  },
  {
    id: "feng-02-scaffolding-5",
    chapter: "feng-02-scaffolding",
    level: 3,
    question: "第 2 章 脚手架签发时保持什么不变量？",
    answer:
      "同一输入与模板版本生成确定文件树，冲突不会静默覆盖用户文件，失败可回滚，生成后项目不依赖脚手架进程继续运行。",
    tags: ["第 2 章 脚手架", "工程验收"],
  },
  {
    id: "feng-02-scaffolding-6",
    chapter: "feng-02-scaffolding",
    level: 3,
    question: "第 2 章 脚手架怎样完成可复现实验？",
    answer:
      "固定源码、锁文件、配置和目标环境，每次只改变一个模板、模块、缓存、网络或权限条件，保存首个偏离点并使用同一制品恢复。",
    tags: ["第 2 章 脚手架", "恢复实验"],
  },
  {
    id: "feng-03-build-1",
    chapter: "feng-03-build",
    level: 1,
    question: "第 3 章 构建的核心主张是什么？",
    answer:
      "构建把源模块、样式和静态资源转换成可部署制品，同时维持模块图、兼容目标、内容哈希和资源地址的一致性；配置 API 是工程团队的稳定契约。",
    tags: ["第 3 章 构建", "核心机制"],
  },
  {
    id: "feng-03-build-2",
    chapter: "feng-03-build",
    level: 2,
    question: "第 3 章 构建覆盖哪些权威目录条目？",
    answer:
      "第3章 构建、3.1 构建功能解决的问题、3.2 配置API设计原则和编程范式约束、3.2.1 配置API设计、3.2.2 编程范式约束、3.3 ECMAScript与Babel、3.3.1 ECMAScript发展史、3.3.2 ES6的跨时代意义、3.3.3 Babel——真正意义的JavaScript编译、3.3.4 结合webpack与Babel实现JavaScript构建、3.4 CSS预编译与PostCSS、3.4.1 CSS的缺陷、3.4.2 CSS预编译器、3.4.3 PostCSS、3.4.4 webpack结合预编译与PostCSS实现CSS构建、3.4.5 案例：自动生成CSS Sprites功能实现、3.5 模块化开发、3.5.1 模块化与组件化、3.5.2 模块化与工程化、3.5.3 模块化开发的价值、3.5.4 前端模块化发展史、3.5.5 webpack模块化构建、3.6 增量更新与缓存、3.6.1 HTTP缓存策略、3.6.2 覆盖更新与增量更新、3.6.3 按需加载与多模块架构场景下的增量更新、3.6.4 webpack实现增量更新构建方案、3.7 资源定位、3.7.1 资源定位的历史变迁、3.7.2 常规的资源定位思维、3.7.3 webpack的逆向注入模式、3.8 总结",
    tags: ["第 3 章 构建", "目录覆盖"],
  },
  {
    id: "feng-03-build-3",
    chapter: "feng-03-build",
    level: 2,
    question: "第 3 章 构建的六阶段交付链是什么？",
    answer:
      "读取配置契约 → 解析模块依赖 → 转换脚本样式 → 切分并命名制品 → 注入资源定位 → 验证缓存与增量",
    tags: ["第 3 章 构建", "交付链"],
  },
  {
    id: "feng-03-build-4",
    chapter: "feng-03-build",
    level: 3,
    question: "第 3 章 构建为什么不能只看构建成功？",
    answer:
      "构建成功不显示模板漂移、制品同一性、缓存错配、环境互斥与回滚状态，必须重放失败和恢复样本。",
    tags: ["第 3 章 构建", "故障注入"],
  },
  {
    id: "feng-03-build-5",
    chapter: "feng-03-build",
    level: 3,
    question: "第 3 章 构建签发时保持什么不变量？",
    answer:
      "同一源码、锁文件和环境得到可追溯制品，资源 URL 指向同版本内容，增量发布不会让 HTML、脚本和样式跨版本错配。",
    tags: ["第 3 章 构建", "工程验收"],
  },
  {
    id: "feng-03-build-6",
    chapter: "feng-03-build",
    level: 3,
    question: "第 3 章 构建怎样完成可复现实验？",
    answer:
      "固定源码、锁文件、配置和目标环境，每次只改变一个模板、模块、缓存、网络或权限条件，保存首个偏离点并使用同一制品恢复。",
    tags: ["第 3 章 构建", "恢复实验"],
  },
  {
    id: "feng-04-local-dev-server-1",
    chapter: "feng-04-local-dev-server",
    level: 1,
    question: "第 4 章 本地开发服务器的核心主张是什么？",
    answer:
      "本地开发服务器连接文件变化、内存构建、浏览器刷新和接口模拟；它要提高反馈速度，同时保持与生产构建、真实 API 契约和 SSR 行为的差异可见。",
    tags: ["第 4 章 本地开发服务器", "核心机制"],
  },
  {
    id: "feng-04-local-dev-server-2",
    chapter: "feng-04-local-dev-server",
    level: 2,
    question: "第 4 章 本地开发服务器覆盖哪些权威目录条目？",
    answer:
      "第4章 本地开发服务器、4.1 本地开发服务器解决的问题、4.2 动态构建、4.2.1 webpack-dev-middleware、4.2.2 Livereload和HMR、4.3 Mock服务、4.3.1 Mock的必要前提和发展进程、4.3.2 异步数据接口、4.3.3 SSR、4.4 总结",
    tags: ["第 4 章 本地开发服务器", "目录覆盖"],
  },
  {
    id: "feng-04-local-dev-server-3",
    chapter: "feng-04-local-dev-server",
    level: 2,
    question: "第 4 章 本地开发服务器的六阶段交付链是什么？",
    answer:
      "启动本地入口 → 监听文件变化 → 执行增量构建 → 推送更新边界 → 提供契约化Mock → 核对生产差异",
    tags: ["第 4 章 本地开发服务器", "交付链"],
  },
  {
    id: "feng-04-local-dev-server-4",
    chapter: "feng-04-local-dev-server",
    level: 3,
    question: "第 4 章 本地开发服务器为什么不能只看构建成功？",
    answer:
      "构建成功不显示模板漂移、制品同一性、缓存错配、环境互斥与回滚状态，必须重放失败和恢复样本。",
    tags: ["第 4 章 本地开发服务器", "故障注入"],
  },
  {
    id: "feng-04-local-dev-server-5",
    chapter: "feng-04-local-dev-server",
    level: 3,
    question: "第 4 章 本地开发服务器签发时保持什么不变量？",
    answer:
      "文件变化只触发必要重建，HMR 不累积状态或监听器，Mock 符合版本化接口契约，本地便利功能不会进入生产制品。",
    tags: ["第 4 章 本地开发服务器", "工程验收"],
  },
  {
    id: "feng-04-local-dev-server-6",
    chapter: "feng-04-local-dev-server",
    level: 3,
    question: "第 4 章 本地开发服务器怎样完成可复现实验？",
    answer:
      "固定源码、锁文件、配置和目标环境，每次只改变一个模板、模块、缓存、网络或权限条件，保存首个偏离点并使用同一制品恢复。",
    tags: ["第 4 章 本地开发服务器", "恢复实验"],
  },
  {
    id: "feng-05-deployment-1",
    chapter: "feng-05-deployment",
    level: 1,
    question: "第 5 章 部署的核心主张是什么？",
    answer:
      "前端部署发布的是带内容地址的静态资源与引用它们的入口文档；流程要把代码审查、权限、队列、缓存策略和回滚顺序组织成原子可观察的变更。",
    tags: ["第 5 章 部署", "核心机制"],
  },
  {
    id: "feng-05-deployment-2",
    chapter: "feng-05-deployment",
    level: 2,
    question: "第 5 章 部署覆盖哪些权威目录条目？",
    answer:
      "第5章 部署、5.1 部署流程的设计原则、5.1.1 速度——化繁为简、5.1.2 协作——代码审查和部署队列、5.1.3 安全——严格审查和权限控制、5.2 流程之外：前端静态资源的部署策略、5.2.1 协商缓存与强制缓存、5.2.2 Apache设置缓存策略、5.3 总结",
    tags: ["第 5 章 部署", "目录覆盖"],
  },
  {
    id: "feng-05-deployment-3",
    chapter: "feng-05-deployment",
    level: 2,
    question: "第 5 章 部署的六阶段交付链是什么？",
    answer:
      "冻结发布制品 → 执行代码审查 → 进入部署队列 → 上传不可变资源 → 切换入口版本 → 验证并回滚演练",
    tags: ["第 5 章 部署", "交付链"],
  },
  {
    id: "feng-05-deployment-4",
    chapter: "feng-05-deployment",
    level: 3,
    question: "第 5 章 部署为什么不能只看构建成功？",
    answer:
      "构建成功不显示模板漂移、制品同一性、缓存错配、环境互斥与回滚状态，必须重放失败和恢复样本。",
    tags: ["第 5 章 部署", "故障注入"],
  },
  {
    id: "feng-05-deployment-5",
    chapter: "feng-05-deployment",
    level: 3,
    question: "第 5 章 部署签发时保持什么不变量？",
    answer:
      "制品只构建一次并可追溯，静态资源先于入口发布，旧资源在回滚窗口内保留，权限与审批不能被临时脚本绕过。",
    tags: ["第 5 章 部署", "工程验收"],
  },
  {
    id: "feng-05-deployment-6",
    chapter: "feng-05-deployment",
    level: 3,
    question: "第 5 章 部署怎样完成可复现实验？",
    answer:
      "固定源码、锁文件、配置和目标环境，每次只改变一个模板、模块、缓存、网络或权限条件，保存首个偏离点并使用同一制品恢复。",
    tags: ["第 5 章 部署", "恢复实验"],
  },
  {
    id: "feng-06-workflow-1",
    chapter: "feng-06-workflow",
    level: 1,
    question: "第 6 章 工作流的核心主张是什么？",
    answer:
      "工作流把个人操作转化为团队状态机：源码只对应一次构建，测试在隔离沙箱运行，版本变更触发 WebHook，持续集成签发可部署制品，持续交付控制推广。",
    tags: ["第 6 章 工作流", "核心机制"],
  },
  {
    id: "feng-06-workflow-2",
    chapter: "feng-06-workflow",
    level: 2,
    question: "第 6 章 工作流覆盖哪些权威目录条目？",
    answer:
      "第6章 工作流、6.1 本地工作流、6.1.1 二次构建的隐患、6.1.2 代码分离与测试沙箱、6.2 云平台工作流、6.2.1 GitFlow与版本管理、6.2.2 WebHook与自动构建、6.3 持续集成与持续交付、6.4 总结",
    tags: ["第 6 章 工作流", "目录覆盖"],
  },
  {
    id: "feng-06-workflow-3",
    chapter: "feng-06-workflow",
    level: 2,
    question: "第 6 章 工作流的六阶段交付链是什么？",
    answer:
      "提交版本化源码 → 运行本地快速检查 → 进入测试沙箱 → 触发云端构建 → 签发唯一制品 → 逐环境持续交付",
    tags: ["第 6 章 工作流", "交付链"],
  },
  {
    id: "feng-06-workflow-4",
    chapter: "feng-06-workflow",
    level: 3,
    question: "第 6 章 工作流为什么不能只看构建成功？",
    answer:
      "构建成功不显示模板漂移、制品同一性、缓存错配、环境互斥与回滚状态，必须重放失败和恢复样本。",
    tags: ["第 6 章 工作流", "故障注入"],
  },
  {
    id: "feng-06-workflow-5",
    chapter: "feng-06-workflow",
    level: 3,
    question: "第 6 章 工作流签发时保持什么不变量？",
    answer:
      "每个提交只对应可追溯制品，环境间推广不重新构建，自动化失败阻断发布且可重试，分支流程不长期隐藏集成风险。",
    tags: ["第 6 章 工作流", "工程验收"],
  },
  {
    id: "feng-06-workflow-6",
    chapter: "feng-06-workflow",
    level: 3,
    question: "第 6 章 工作流怎样完成可复现实验？",
    answer:
      "固定源码、锁文件、配置和目标环境，每次只改变一个模板、模块、缓存、网络或权限条件，保存首个偏离点并使用同一制品恢复。",
    tags: ["第 6 章 工作流", "恢复实验"],
  },
  {
    id: "feng-07-future-1",
    chapter: "feng-07-future",
    level: 1,
    question: "第 7 章 前端工程化的未来的核心主张是什么？",
    answer:
      "前端工程化的边界随运行平台和协作模式变化，但目标仍是降低反馈成本、约束变更风险并提高交付可观察性；蓝图描述能力与接口，而非绑定单一工具。",
    tags: ["第 7 章 前端工程化的未来", "核心机制"],
  },
  {
    id: "feng-07-future-2",
    chapter: "feng-07-future",
    level: 2,
    question: "第 7 章 前端工程化的未来覆盖哪些权威目录条目？",
    answer:
      "第7章 前端工程化的未来、7.1 前端工程师未来的定位、7.1.1 不只是浏览器、7.1.2 也不只是Web、7.2 前端工程化是一张蓝图、7.3 总结",
    tags: ["第 7 章 前端工程化的未来", "目录覆盖"],
  },
  {
    id: "feng-07-future-3",
    chapter: "feng-07-future",
    level: 2,
    question: "第 7 章 前端工程化的未来的六阶段交付链是什么？",
    answer:
      "识别运行平台 → 扩展工程师职责 → 抽象稳定能力 → 隔离易变工具 → 度量反馈交付 → 持续修订蓝图",
    tags: ["第 7 章 前端工程化的未来", "交付链"],
  },
  {
    id: "feng-07-future-4",
    chapter: "feng-07-future",
    level: 3,
    question: "第 7 章 前端工程化的未来为什么不能只看构建成功？",
    answer:
      "构建成功不显示模板漂移、制品同一性、缓存错配、环境互斥与回滚状态，必须重放失败和恢复样本。",
    tags: ["第 7 章 前端工程化的未来", "故障注入"],
  },
  {
    id: "feng-07-future-5",
    chapter: "feng-07-future",
    level: 3,
    question: "第 7 章 前端工程化的未来签发时保持什么不变量？",
    answer:
      "未来方案由可度量问题驱动，稳定能力与易变工具分层，升级有迁移与回滚路径，不为追逐新工具破坏既有交付契约。",
    tags: ["第 7 章 前端工程化的未来", "工程验收"],
  },
  {
    id: "feng-07-future-6",
    chapter: "feng-07-future",
    level: 3,
    question: "第 7 章 前端工程化的未来怎样完成可复现实验？",
    answer:
      "固定源码、锁文件、配置和目标环境，每次只改变一个模板、模块、缓存、网络或权限条件，保存首个偏离点并使用同一制品恢复。",
    tags: ["第 7 章 前端工程化的未来", "恢复实验"],
  },
  {
    id: "feng-official-final-review-1",
    chapter: "feng-official-final-review",
    level: 1,
    question: "《前端工程化：体系设计与实践》全书总复习的核心主张是什么？",
    answer:
      "总复习把源码变更沿模板、模块图、构建制品、本地反馈、部署队列、缓存切换和持续交付推进，并要求每一步都有版本、所有者、失败出口与回滚证据。",
    tags: ["《前端工程化：体系设计与实践》全书总复习", "核心机制"],
  },
  {
    id: "feng-official-final-review-2",
    chapter: "feng-official-final-review",
    level: 2,
    question: "《前端工程化：体系设计与实践》全书总复习覆盖哪些权威目录条目？",
    answer:
      "第1章 前端工程简史、第2章 脚手架、第3章 构建、第4章 本地开发服务器、第5章 部署、第6章 工作流、第7章 前端工程化的未来",
    tags: ["《前端工程化：体系设计与实践》全书总复习", "目录覆盖"],
  },
  {
    id: "feng-official-final-review-3",
    chapter: "feng-official-final-review",
    level: 2,
    question: "《前端工程化：体系设计与实践》全书总复习的六阶段交付链是什么？",
    answer:
      "登记源码变更 → 验证配置模板 → 生成唯一制品 → 本地契约测试 → 按序部署缓存 → 持续交付并复盘",
    tags: ["《前端工程化：体系设计与实践》全书总复习", "交付链"],
  },
  {
    id: "feng-official-final-review-4",
    chapter: "feng-official-final-review",
    level: 3,
    question:
      "《前端工程化：体系设计与实践》全书总复习为什么不能只看构建成功？",
    answer:
      "构建成功不显示模板漂移、制品同一性、缓存错配、环境互斥与回滚状态，必须重放失败和恢复样本。",
    tags: ["《前端工程化：体系设计与实践》全书总复习", "故障注入"],
  },
  {
    id: "feng-official-final-review-5",
    chapter: "feng-official-final-review",
    level: 3,
    question: "《前端工程化：体系设计与实践》全书总复习签发时保持什么不变量？",
    answer:
      "一次变更只构建一个可追溯制品，本地与云端契约一致，资源和入口按安全顺序切换，失败可定位并回滚。",
    tags: ["《前端工程化：体系设计与实践》全书总复习", "工程验收"],
  },
  {
    id: "feng-official-final-review-6",
    chapter: "feng-official-final-review",
    level: 3,
    question: "《前端工程化：体系设计与实践》全书总复习怎样完成可复现实验？",
    answer:
      "固定源码、锁文件、配置和目标环境，每次只改变一个模板、模块、缓存、网络或权限条件，保存首个偏离点并使用同一制品恢复。",
    tags: ["《前端工程化：体系设计与实践》全书总复习", "恢复实验"],
  },
];
