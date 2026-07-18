import type { ReviewQuestion } from "./types";

export const vjpOfficialQuestions: ReviewQuestion[] = [
  {
    id: "vjp-official-learning-map-1",
    chapter: "vjp-official-learning-map",
    level: 1,
    question: "《Vue.js从入门到项目实战》权威学习地图的核心主张是什么？",
    answer:
      "全书不是8个泛化专题，而是概念篇6章、实战篇5章和5个附录组成的完整项目路线。",
    tags: ["《Vue.js从入门到项目实战》权威学习地图", "核心机制"],
  },
  {
    id: "vjp-official-learning-map-2",
    chapter: "vjp-official-learning-map",
    level: 2,
    question: "《Vue.js从入门到项目实战》权威学习地图覆盖哪些正式目录主题？",
    answer:
      "第1章 引言、第2章 基本介绍、第3章 Vue语法、第4章 Vue选项、第5章 Vue内置组件、第6章 Vue项目化、第7章 打造线上商城（一）、第8章 打造线上商城（二）、第9章 企业官网的建设、第10章 我的掌上新闻、第11章 SVG画图板、附录A Git入门、附录B NPM入门、附录C Webpack入门、附录D 闭包和对象引用、附录E 常见的ECMAScript 6语法",
    tags: ["《Vue.js从入门到项目实战》权威学习地图", "目录覆盖"],
  },
  {
    id: "vjp-official-learning-map-3",
    chapter: "vjp-official-learning-map",
    level: 2,
    question: "《Vue.js从入门到项目实战》权威学习地图的六阶段证据链是什么？",
    answer:
      "核对官方目录 → 夯实概念语法 → 完成项目化 → 打造商城 → 交付多类项目 → 附录补齐工具",
    tags: ["《Vue.js从入门到项目实战》权威学习地图", "机制链"],
  },
  {
    id: "vjp-official-learning-map-4",
    chapter: "vjp-official-learning-map",
    level: 3,
    question: "《Vue.js从入门到项目实战》权威学习地图应主动注入哪两类失败？",
    answer:
      "沿用原来的10页Vue 3专题，把Composition API、Pinia和Nuxt误写成2019年原书正式结构。；只保留框架语法，省略商城、官网、新闻、SVG和五个附录，导致项目实战体系断裂。",
    tags: ["《Vue.js从入门到项目实战》权威学习地图", "故障注入"],
  },
  {
    id: "vjp-official-learning-map-5",
    chapter: "vjp-official-learning-map",
    level: 3,
    question: "《Vue.js从入门到项目实战》权威学习地图签发时保持什么不变量？",
    answer:
      "11章和5个附录各有独立页面，133个公开目录条目可追踪，Vue 2原书语境与现代迁移注记不会混淆。",
    tags: ["《Vue.js从入门到项目实战》权威学习地图", "工程验收"],
  },
  {
    id: "vjp-official-learning-map-6",
    chapter: "vjp-official-learning-map",
    level: 3,
    question: "《Vue.js从入门到项目实战》权威学习地图怎样完成可复现实验？",
    answer:
      "固定Vue运行时、工具链、输入和初始URL，依次运行正常、边界、失败和恢复样本，保存事件顺序、状态所有者、首偏离点与清理动作。",
    tags: ["《Vue.js从入门到项目实战》权威学习地图", "可复现实验"],
  },
  {
    id: "vjp-01-introduction-1",
    chapter: "vjp-01-introduction",
    level: 1,
    question: "第 1 章 引言的核心主张是什么？",
    answer:
      "框架选择不是语法偏好，而是数据流、视图更新、组件边界和团队成本之间的系统权衡。",
    tags: ["第 1 章 引言", "核心机制"],
  },
  {
    id: "vjp-01-introduction-2",
    chapter: "vjp-01-introduction",
    level: 2,
    question: "第 1 章 引言覆盖哪些正式目录主题？",
    answer:
      "1.1 前端技术的发展、1.1.1 从静态走向动态、1.1.2 从后端走向前端、1.1.3 从前端走向全端、1.2 MVVM族员——Vue.js、1.2.1 从MVC到MVVM、1.2.2 Vue.js简介、1.3 Vue与React、1.3.1 虚拟DOM、1.3.2 功能性组件、1.3.3 轻量级——将与核心库无关的业务封装成独立库、1.3.4 视图模板、1.3.5 其他、1.4 Vue与Angular、1.4.1 模板语法、1.4.2 脏检测、1.4.3 双向数据绑定、1.4.4 学习曲线",
    tags: ["第 1 章 引言", "目录覆盖"],
  },
  {
    id: "vjp-01-introduction-3",
    chapter: "vjp-01-introduction",
    level: 2,
    question: "第 1 章 引言的六阶段证据链是什么？",
    answer: "静态页面 → 动态交互 → 前后端分离 → MVVM → 组件化 → 框架取舍",
    tags: ["第 1 章 引言", "机制链"],
  },
  {
    id: "vjp-01-introduction-4",
    chapter: "vjp-01-introduction",
    level: 3,
    question: "第 1 章 引言应主动注入哪两类失败？",
    answer:
      "只比较跑分或包体大小，不验证业务数据流、调试能力和长期维护成本。；把双向绑定理解成任意对象互相修改，最终失去唯一状态所有者。",
    tags: ["第 1 章 引言", "故障注入"],
  },
  {
    id: "vjp-01-introduction-5",
    chapter: "vjp-01-introduction",
    level: 3,
    question: "第 1 章 引言签发时保持什么不变量？",
    answer:
      "框架选择的输入假设、状态所有者、更新路径和生态责任都可解释，比较结论能够被同一业务样本复现。",
    tags: ["第 1 章 引言", "工程验收"],
  },
  {
    id: "vjp-01-introduction-6",
    chapter: "vjp-01-introduction",
    level: 3,
    question: "第 1 章 引言怎样完成可复现实验？",
    answer:
      "固定Vue运行时、工具链、输入和初始URL，依次运行正常、边界、失败和恢复样本，保存事件顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 1 章 引言", "可复现实验"],
  },
  {
    id: "vjp-02-basic-introduction-1",
    chapter: "vjp-02-basic-introduction",
    level: 1,
    question: "第 2 章 基本介绍的核心主张是什么？",
    answer:
      "Vue实例把数据、生命周期和视图更新收束到一个可观察边界，响应式成立的前提是依赖在读取时被收集、在写入时被通知。",
    tags: ["第 2 章 基本介绍", "核心机制"],
  },
  {
    id: "vjp-02-basic-introduction-2",
    chapter: "vjp-02-basic-introduction",
    level: 2,
    question: "第 2 章 基本介绍覆盖哪些正式目录主题？",
    answer:
      "2.1 安装和引入、2.1.1 如何引入Vue.js、2.1.2 安装Vue Devtools、2.2 Vue实例介绍、2.2.1 简单实例、2.2.2 生命周期、2.3 数据响应式原理、2.3.1 初识数据链、2.3.2 函数式编程、2.3.3 Vue中的数据链、2.3.4 数据绑定视图",
    tags: ["第 2 章 基本介绍", "目录覆盖"],
  },
  {
    id: "vjp-02-basic-introduction-3",
    chapter: "vjp-02-basic-introduction",
    level: 2,
    question: "第 2 章 基本介绍的六阶段证据链是什么？",
    answer:
      "引入运行时 → 创建实例 → 初始化数据 → 收集依赖 → 派发更新 → 销毁清理",
    tags: ["第 2 章 基本介绍", "机制链"],
  },
  {
    id: "vjp-02-basic-introduction-4",
    chapter: "vjp-02-basic-introduction",
    level: 3,
    question: "第 2 章 基本介绍应主动注入哪两类失败？",
    answer:
      "在Vue 2中直接给已观察对象添加新属性，然后把视图不更新误判为渲染故障。；在created里读取真实DOM，或在销毁阶段遗漏窗口监听器和定时器。",
    tags: ["第 2 章 基本介绍", "故障注入"],
  },
  {
    id: "vjp-02-basic-introduction-5",
    chapter: "vjp-02-basic-introduction",
    level: 3,
    question: "第 2 章 基本介绍签发时保持什么不变量？",
    answer:
      "同一输入下依赖收集和更新路径可观察，新增属性使用兼容写法，实例销毁后没有残留监听器、定时器或第三方资源。",
    tags: ["第 2 章 基本介绍", "工程验收"],
  },
  {
    id: "vjp-02-basic-introduction-6",
    chapter: "vjp-02-basic-introduction",
    level: 3,
    question: "第 2 章 基本介绍怎样完成可复现实验？",
    answer:
      "固定Vue运行时、工具链、输入和初始URL，依次运行正常、边界、失败和恢复样本，保存事件顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 2 章 基本介绍", "可复现实验"],
  },
  {
    id: "vjp-03-vue-syntax-1",
    chapter: "vjp-03-vue-syntax",
    level: 1,
    question: "第 3 章 Vue语法的核心主张是什么？",
    answer:
      "模板语法是状态到视图的声明式契约：插值负责内容，v-bind负责属性，v-on负责命令，v-model组合值与更新事件，条件和列表指令决定结构。",
    tags: ["第 3 章 Vue语法", "核心机制"],
  },
  {
    id: "vjp-03-vue-syntax-2",
    chapter: "vjp-03-vue-syntax",
    level: 2,
    question: "第 3 章 Vue语法覆盖哪些正式目录主题？",
    answer:
      "3.1 插值绑定、3.1.1 文本插值、3.1.2 HTML插值、3.2 属性绑定、3.2.1 指令v-bind、3.2.2 类名和样式绑定、3.3 事件绑定、3.3.1 指令v-on、3.3.2 常见修饰符、3.3.3 按键修饰符、3.3.4 组合修饰符、3.4 双向绑定、3.4.1 指令v-model、3.4.2 v-model与修饰符、3.4.3 v-model与自定义组件、3.5 条件渲染和列表渲染、3.5.1 指令v-if和v-show、3.5.2 指令v-for、3.5.3 列表渲染中的key",
    tags: ["第 3 章 Vue语法", "目录覆盖"],
  },
  {
    id: "vjp-03-vue-syntax-3",
    chapter: "vjp-03-vue-syntax",
    level: 2,
    question: "第 3 章 Vue语法的六阶段证据链是什么？",
    answer:
      "读取状态 → 计算表达式 → 绑定属性 → 接收事件 → 更新模型 → 最小化补丁",
    tags: ["第 3 章 Vue语法", "机制链"],
  },
  {
    id: "vjp-03-vue-syntax-4",
    chapter: "vjp-03-vue-syntax",
    level: 3,
    question: "第 3 章 Vue语法应主动注入哪两类失败？",
    answer:
      "把不可信字符串直接交给v-html，既跳过文本转义又让内容边界失去审计。；在可重排列表中使用数组索引作key，导致DOM和组件内部状态绑定到错误实体。",
    tags: ["第 3 章 Vue语法", "故障注入"],
  },
  {
    id: "vjp-03-vue-syntax-5",
    chapter: "vjp-03-vue-syntax",
    level: 3,
    question: "第 3 章 Vue语法签发时保持什么不变量？",
    answer:
      "模板只读取可解释状态，原始HTML经过可信净化，事件更新路径明确，列表身份在插入、删除和排序后保持稳定。",
    tags: ["第 3 章 Vue语法", "工程验收"],
  },
  {
    id: "vjp-03-vue-syntax-6",
    chapter: "vjp-03-vue-syntax",
    level: 3,
    question: "第 3 章 Vue语法怎样完成可复现实验？",
    answer:
      "固定Vue运行时、工具链、输入和初始URL，依次运行正常、边界、失败和恢复样本，保存事件顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 3 章 Vue语法", "可复现实验"],
  },
  {
    id: "vjp-04-vue-options-1",
    chapter: "vjp-04-vue-options",
    level: 1,
    question: "第 4 章 Vue选项的核心主张是什么？",
    answer:
      "Vue选项不是并列配置项，而是数据所有权、派生计算、副作用、渲染入口和复用边界的责任划分。",
    tags: ["第 4 章 Vue选项", "核心机制"],
  },
  {
    id: "vjp-04-vue-options-2",
    chapter: "vjp-04-vue-options",
    level: 2,
    question: "第 4 章 Vue选项覆盖哪些正式目录主题？",
    answer:
      "4.1 数据和方法、4.1.1 数据选项、4.1.2 属性选项、4.1.3 方法选项、4.1.4 计算属性、4.1.5 侦听属性、4.2 DOM渲染、4.2.1 指定被挂载元素、4.2.2 视图的字符串模板、4.2.3 渲染函数render、4.2.4 选项的优先级、4.3 封装复用、4.3.1 过滤器、4.3.2 自定义指令、4.3.3 组件的注册、4.3.4 混入的使用",
    tags: ["第 4 章 Vue选项", "目录覆盖"],
  },
  {
    id: "vjp-04-vue-options-3",
    chapter: "vjp-04-vue-options",
    level: 2,
    question: "第 4 章 Vue选项的六阶段证据链是什么？",
    answer:
      "接收props → 创建data → 派生computed → 响应watch → 执行render → 封装复用",
    tags: ["第 4 章 Vue选项", "机制链"],
  },
  {
    id: "vjp-04-vue-options-4",
    chapter: "vjp-04-vue-options",
    level: 3,
    question: "第 4 章 Vue选项应主动注入哪两类失败？",
    answer:
      "用watch维护本可由computed推导的重复状态，更新顺序变化后两份值不一致。；大量混入注入同名字段和生命周期钩子，组件无法说明某个方法来自哪里。",
    tags: ["第 4 章 Vue选项", "故障注入"],
  },
  {
    id: "vjp-04-vue-options-5",
    chapter: "vjp-04-vue-options",
    level: 3,
    question: "第 4 章 Vue选项签发时保持什么不变量？",
    answer:
      "props、data和派生值只有一个事实来源，computed保持纯粹，watch副作用可取消，render与扩展的优先级和来源可追踪。",
    tags: ["第 4 章 Vue选项", "工程验收"],
  },
  {
    id: "vjp-04-vue-options-6",
    chapter: "vjp-04-vue-options",
    level: 3,
    question: "第 4 章 Vue选项怎样完成可复现实验？",
    answer:
      "固定Vue运行时、工具链、输入和初始URL，依次运行正常、边界、失败和恢复样本，保存事件顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 4 章 Vue选项", "可复现实验"],
  },
  {
    id: "vjp-05-built-in-components-1",
    chapter: "vjp-05-built-in-components",
    level: 1,
    question: "第 5 章 Vue内置组件的核心主张是什么？",
    answer:
      "动态组件、插槽、keep-alive和transition分别控制组件选择、内容所有权、实例寿命与视觉状态过渡。",
    tags: ["第 5 章 Vue内置组件", "核心机制"],
  },
  {
    id: "vjp-05-built-in-components-2",
    chapter: "vjp-05-built-in-components",
    level: 2,
    question: "第 5 章 Vue内置组件覆盖哪些正式目录主题？",
    answer:
      "5.1 组件服务、5.1.1 动态组件、5.1.2 使用插槽分发内容、5.1.3 组件的缓存、5.2 过渡效果、5.2.1 单节点的过渡、5.2.2 多节点的过渡",
    tags: ["第 5 章 Vue内置组件", "目录覆盖"],
  },
  {
    id: "vjp-05-built-in-components-3",
    chapter: "vjp-05-built-in-components",
    level: 2,
    question: "第 5 章 Vue内置组件的六阶段证据链是什么？",
    answer: "选择组件 → 分发插槽 → 确定身份 → 命中缓存 → 切换节点 → 完成过渡",
    tags: ["第 5 章 Vue内置组件", "机制链"],
  },
  {
    id: "vjp-05-built-in-components-4",
    chapter: "vjp-05-built-in-components",
    level: 3,
    question: "第 5 章 Vue内置组件应主动注入哪两类失败？",
    answer:
      "把keep-alive当成无上限页面缓存，既不设include也不处理deactivated中的后台任务。；多节点过渡没有稳定key，框架复用旧节点后进入和离开类名落在错误对象上。",
    tags: ["第 5 章 Vue内置组件", "故障注入"],
  },
  {
    id: "vjp-05-built-in-components-5",
    chapter: "vjp-05-built-in-components",
    level: 3,
    question: "第 5 章 Vue内置组件签发时保持什么不变量？",
    answer:
      "内容和布局所有权清楚，组件身份可解释，缓存有边界，激活/停用资源对称，多节点过渡不会留下重复节点或后台任务。",
    tags: ["第 5 章 Vue内置组件", "工程验收"],
  },
  {
    id: "vjp-05-built-in-components-6",
    chapter: "vjp-05-built-in-components",
    level: 3,
    question: "第 5 章 Vue内置组件怎样完成可复现实验？",
    answer:
      "固定Vue运行时、工具链、输入和初始URL，依次运行正常、边界、失败和恢复样本，保存事件顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 5 章 Vue内置组件", "可复现实验"],
  },
  {
    id: "vjp-06-projectization-1",
    chapter: "vjp-06-projectization",
    level: 1,
    question: "第 6 章 Vue项目化的核心主张是什么？",
    answer:
      "项目化把单页示例扩展成可构建、可导航、可共享状态的应用；目录、路由和Vuex都必须服从清晰边界。",
    tags: ["第 6 章 Vue项目化", "核心机制"],
  },
  {
    id: "vjp-06-projectization-2",
    chapter: "vjp-06-projectization",
    level: 2,
    question: "第 6 章 Vue项目化覆盖哪些正式目录主题？",
    answer:
      "6.1 快速构建项目、6.1.1 Vue CLI简介、6.1.2 使用Vue CLI构建项目、6.1.3 项目目录介绍、6.2 前端路由、6.2.1 前端路由的简单实现、6.2.2 Vue中的前端路由、6.3 状态管理、6.3.1 对象引用、6.3.2 状态管理器Vuex、6.3.3 在项目中使用Vuex",
    tags: ["第 6 章 Vue项目化", "目录覆盖"],
  },
  {
    id: "vjp-06-projectization-3",
    chapter: "vjp-06-projectization",
    level: 2,
    question: "第 6 章 Vue项目化的六阶段证据链是什么？",
    answer: "生成项目 → 划分目录 → 解析URL → 匹配路由 → 提交状态 → 构建签发",
    tags: ["第 6 章 Vue项目化", "机制链"],
  },
  {
    id: "vjp-06-projectization-4",
    chapter: "vjp-06-projectization",
    level: 3,
    question: "第 6 章 Vue项目化应主动注入哪两类失败？",
    answer:
      "把所有组件局部状态都放进Vuex，增加全局耦合却没有获得跨边界共享价值。；路由只在点击导航时可用，刷新深层URL或浏览器后退时丢失状态和匹配结果。",
    tags: ["第 6 章 Vue项目化", "故障注入"],
  },
  {
    id: "vjp-06-projectization-5",
    chapter: "vjp-06-projectization",
    level: 3,
    question: "第 6 章 Vue项目化签发时保持什么不变量？",
    answer:
      "项目目录能说明责任，任意有效URL可刷新恢复，共享状态只经可追踪入口修改，异步失败不会留下半提交状态。",
    tags: ["第 6 章 Vue项目化", "工程验收"],
  },
  {
    id: "vjp-06-projectization-6",
    chapter: "vjp-06-projectization",
    level: 3,
    question: "第 6 章 Vue项目化怎样完成可复现实验？",
    answer:
      "固定Vue运行时、工具链、输入和初始URL，依次运行正常、边界、失败和恢复样本，保存事件顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 6 章 Vue项目化", "可复现实验"],
  },
  {
    id: "vjp-07-online-mall-one-1",
    chapter: "vjp-07-online-mall-one",
    level: 1,
    question: "第 7 章 打造线上商城（一）的核心主张是什么？",
    answer:
      "商城开发先把需求和状态流画清楚，再写首页、详情、购物车和订单；四个页面共享商品身份但拥有不同的状态责任。",
    tags: ["第 7 章 打造线上商城（一）", "核心机制"],
  },
  {
    id: "vjp-07-online-mall-one-2",
    chapter: "vjp-07-online-mall-one",
    level: 2,
    question: "第 7 章 打造线上商城（一）覆盖哪些正式目录主题？",
    answer:
      "7.1 项目规划、7.1.1 需求分析、7.1.2 流程分析、7.2 项目展示、7.2.1 首页、7.2.2 商品详情、7.2.3 购物车、7.2.4 订单",
    tags: ["第 7 章 打造线上商城（一）", "目录覆盖"],
  },
  {
    id: "vjp-07-online-mall-one-3",
    chapter: "vjp-07-online-mall-one",
    level: 2,
    question: "第 7 章 打造线上商城（一）的六阶段证据链是什么？",
    answer:
      "分析需求 → 建立商品模型 → 浏览首页 → 查看详情 → 编辑购物车 → 提交订单",
    tags: ["第 7 章 打造线上商城（一）", "机制链"],
  },
  {
    id: "vjp-07-online-mall-one-4",
    chapter: "vjp-07-online-mall-one",
    level: 3,
    question: "第 7 章 打造线上商城（一）应主动注入哪两类失败？",
    answer:
      "把列表页复制来的价格直接当作最终成交价，忽略结算时的服务端校验。；提交按钮可以连续点击，超时重试又没有幂等键，最终产生重复订单。",
    tags: ["第 7 章 打造线上商城（一）", "故障注入"],
  },
  {
    id: "vjp-07-online-mall-one-5",
    chapter: "vjp-07-online-mall-one",
    level: 3,
    question: "第 7 章 打造线上商城（一）签发时保持什么不变量？",
    answer:
      "商品身份贯穿四页，购物车数量合法，订单采用提交时快照和服务端校验，重复提交至多产生一个业务结果。",
    tags: ["第 7 章 打造线上商城（一）", "工程验收"],
  },
  {
    id: "vjp-07-online-mall-one-6",
    chapter: "vjp-07-online-mall-one",
    level: 3,
    question: "第 7 章 打造线上商城（一）怎样完成可复现实验？",
    answer:
      "固定Vue运行时、工具链、输入和初始URL，依次运行正常、边界、失败和恢复样本，保存事件顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 7 章 打造线上商城（一）", "可复现实验"],
  },
  {
    id: "vjp-08-online-mall-two-1",
    chapter: "vjp-08-online-mall-two",
    level: 1,
    question: "第 8 章 打造线上商城（二）的核心主张是什么？",
    answer:
      "商城工程化把目录、webpack、图标、动态资源、数据存储和自定义组件放进同一构建与运行契约。",
    tags: ["第 8 章 打造线上商城（二）", "核心机制"],
  },
  {
    id: "vjp-08-online-mall-two-2",
    chapter: "vjp-08-online-mall-two",
    level: 2,
    question: "第 8 章 打造线上商城（二）覆盖哪些正式目录主题？",
    answer:
      "8.1 项目构建、8.1.1 目录结构、8.1.2 webpack是什么？、8.1.3 Font Awesome图标库、8.2 动态资源和数据、8.2.1 关于配置、8.2.2 动态资源、8.2.3 动态数据的存储、8.3 自定义组件、8.3.1 幻灯片、8.3.2 复选框",
    tags: ["第 8 章 打造线上商城（二）", "目录覆盖"],
  },
  {
    id: "vjp-08-online-mall-two-3",
    chapter: "vjp-08-online-mall-two",
    level: 2,
    question: "第 8 章 打造线上商城（二）的六阶段证据链是什么？",
    answer: "组织目录 → 解析依赖 → 处理资源 → 加载配置 → 保存数据 → 封装组件",
    tags: ["第 8 章 打造线上商城（二）", "机制链"],
  },
  {
    id: "vjp-08-online-mall-two-4",
    chapter: "vjp-08-online-mall-two",
    level: 3,
    question: "第 8 章 打造线上商城（二）应主动注入哪两类失败？",
    answer:
      "把生产API地址和资源域名写死在组件中，环境切换只能重新修改业务代码。；轮播组件每次激活都创建定时器，却没有在停用或销毁时清理。",
    tags: ["第 8 章 打造线上商城（二）", "故障注入"],
  },
  {
    id: "vjp-08-online-mall-two-5",
    chapter: "vjp-08-online-mall-two",
    level: 3,
    question: "第 8 章 打造线上商城（二）签发时保持什么不变量？",
    answer:
      "构建产物可追溯到依赖和环境，资源失败有降级，业务数据所有权明确，自定义组件在空值、键盘和重复挂载下无泄漏。",
    tags: ["第 8 章 打造线上商城（二）", "工程验收"],
  },
  {
    id: "vjp-08-online-mall-two-6",
    chapter: "vjp-08-online-mall-two",
    level: 3,
    question: "第 8 章 打造线上商城（二）怎样完成可复现实验？",
    answer:
      "固定Vue运行时、工具链、输入和初始URL，依次运行正常、边界、失败和恢复样本，保存事件顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 8 章 打造线上商城（二）", "可复现实验"],
  },
  {
    id: "vjp-09-corporate-website-1",
    chapter: "vjp-09-corporate-website",
    level: 1,
    question: "第 9 章 企业官网的建设的核心主张是什么？",
    answer:
      "企业官网要把响应式布局、页面切换、轮播、内容分区和多语配置组织为内容驱动的稳定展示系统。",
    tags: ["第 9 章 企业官网的建设", "核心机制"],
  },
  {
    id: "vjp-09-corporate-website-2",
    chapter: "vjp-09-corporate-website",
    level: 2,
    question: "第 9 章 企业官网的建设覆盖哪些正式目录主题？",
    answer:
      "9.1 响应式设计、9.1.1 响应式设计、9.1.2 媒体查询、9.1.3 JS布局、9.2 页面开发、9.2.1 页面切换、9.2.2 Swiper组件、9.2.3 划分内容区、9.3 多语种网站的建设、9.3.1 将一切纳入配置、9.3.2 将配置绑定到视图",
    tags: ["第 9 章 企业官网的建设", "目录覆盖"],
  },
  {
    id: "vjp-09-corporate-website-3",
    chapter: "vjp-09-corporate-website",
    level: 2,
    question: "第 9 章 企业官网的建设的六阶段证据链是什么？",
    answer: "读取视口 → 选择布局 → 划分内容 → 切换页面 → 驱动轮播 → 绑定语言包",
    tags: ["第 9 章 企业官网的建设", "机制链"],
  },
  {
    id: "vjp-09-corporate-website-4",
    chapter: "vjp-09-corporate-website",
    level: 3,
    question: "第 9 章 企业官网的建设应主动注入哪两类失败？",
    answer:
      "所有断点都用resize事件和像素测量驱动，造成布局抖动并重复实现CSS能力。；语言切换只替换正文，导航、图片替代文本、日期和SEO元数据仍固定为中文。",
    tags: ["第 9 章 企业官网的建设", "故障注入"],
  },
  {
    id: "vjp-09-corporate-website-5",
    chapter: "vjp-09-corporate-website",
    level: 3,
    question: "第 9 章 企业官网的建设签发时保持什么不变量？",
    answer:
      "核心布局由CSS稳定适配，脚本测量有边界，页面和轮播身份明确，语言键完整并能在长文本与缺失翻译下安全降级。",
    tags: ["第 9 章 企业官网的建设", "工程验收"],
  },
  {
    id: "vjp-09-corporate-website-6",
    chapter: "vjp-09-corporate-website",
    level: 3,
    question: "第 9 章 企业官网的建设怎样完成可复现实验？",
    answer:
      "固定Vue运行时、工具链、输入和初始URL，依次运行正常、边界、失败和恢复样本，保存事件顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 9 章 企业官网的建设", "可复现实验"],
  },
  {
    id: "vjp-10-mobile-news-1",
    chapter: "vjp-10-mobile-news",
    level: 1,
    question: "第 10 章 我的掌上新闻的核心主张是什么？",
    answer:
      "新闻应用应围绕首屏、首页、详情、搜索和结果页建立单向数据流，并显式处理请求竞争、缓存和空状态。",
    tags: ["第 10 章 我的掌上新闻", "核心机制"],
  },
  {
    id: "vjp-10-mobile-news-2",
    chapter: "vjp-10-mobile-news",
    level: 2,
    question: "第 10 章 我的掌上新闻覆盖哪些正式目录主题？",
    answer:
      "10.1 应用介绍、10.1.1 应用首屏、10.1.2 应用首页、10.1.3 新闻详情、10.1.4 搜索页面、10.1.5 搜索结果、10.2 项目构建、10.2.1 项目结构、10.2.2 数据流图",
    tags: ["第 10 章 我的掌上新闻", "目录覆盖"],
  },
  {
    id: "vjp-10-mobile-news-3",
    chapter: "vjp-10-mobile-news",
    level: 2,
    question: "第 10 章 我的掌上新闻的六阶段证据链是什么？",
    answer: "启动首屏 → 加载频道 → 展示列表 → 读取详情 → 提交搜索 → 合并结果",
    tags: ["第 10 章 我的掌上新闻", "机制链"],
  },
  {
    id: "vjp-10-mobile-news-4",
    chapter: "vjp-10-mobile-news",
    level: 3,
    question: "第 10 章 我的掌上新闻应主动注入哪两类失败？",
    answer:
      "首屏使用固定三秒定时器，初始化早已完成仍阻塞，失败时又直接进入空首页。；快速输入多个关键词时，较慢的旧请求最后返回并覆盖当前搜索结果。",
    tags: ["第 10 章 我的掌上新闻", "故障注入"],
  },
  {
    id: "vjp-10-mobile-news-5",
    chapter: "vjp-10-mobile-news",
    level: 3,
    question: "第 10 章 我的掌上新闻签发时保持什么不变量？",
    answer:
      "启动条件可证明，列表和详情使用同一新闻身份，分页不重复，搜索响应按查询版本提交，失败和空状态不会显示陈旧数据。",
    tags: ["第 10 章 我的掌上新闻", "工程验收"],
  },
  {
    id: "vjp-10-mobile-news-6",
    chapter: "vjp-10-mobile-news",
    level: 3,
    question: "第 10 章 我的掌上新闻怎样完成可复现实验？",
    answer:
      "固定Vue运行时、工具链、输入和初始URL，依次运行正常、边界、失败和恢复样本，保存事件顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 10 章 我的掌上新闻", "可复现实验"],
  },
  {
    id: "vjp-11-svg-drawing-board-1",
    chapter: "vjp-11-svg-drawing-board",
    level: 1,
    question: "第 11 章 SVG画图板的核心主张是什么？",
    answer:
      "SVG画图板把几何图元、属性、渐变和用户操作表示成可序列化状态，视图只负责把状态投影为图形。",
    tags: ["第 11 章 SVG画图板", "核心机制"],
  },
  {
    id: "vjp-11-svg-drawing-board-2",
    chapter: "vjp-11-svg-drawing-board",
    level: 2,
    question: "第 11 章 SVG画图板覆盖哪些正式目录主题？",
    answer:
      "11.1 SVG简介、11.1.1 有关SVG的三个问题、11.1.2 基本图形的使用、11.1.3 SVG中的渐变、11.2 项目介绍、11.2.1 页面介绍、11.2.2 代码简析",
    tags: ["第 11 章 SVG画图板", "目录覆盖"],
  },
  {
    id: "vjp-11-svg-drawing-board-3",
    chapter: "vjp-11-svg-drawing-board",
    level: 2,
    question: "第 11 章 SVG画图板的六阶段证据链是什么？",
    answer: "转换坐标 → 创建图元 → 绑定属性 → 选择编辑 → 应用渐变 → 序列化导出",
    tags: ["第 11 章 SVG画图板", "机制链"],
  },
  {
    id: "vjp-11-svg-drawing-board-4",
    chapter: "vjp-11-svg-drawing-board",
    level: 3,
    question: "第 11 章 SVG画图板应主动注入哪两类失败？",
    answer:
      "直接把clientX和clientY当SVG坐标，页面滚动或viewBox缩放后图元跳离指针。；拖动时只改真实DOM，不更新场景模型，导出和撤销得到的是旧几何。",
    tags: ["第 11 章 SVG画图板", "故障注入"],
  },
  {
    id: "vjp-11-svg-drawing-board-5",
    chapter: "vjp-11-svg-drawing-board",
    level: 3,
    question: "第 11 章 SVG画图板签发时保持什么不变量？",
    answer:
      "坐标转换在缩放滚动后准确，图元ID稳定，场景状态是唯一事实来源，渐变引用有效，撤销和导出能够重放同一画面。",
    tags: ["第 11 章 SVG画图板", "工程验收"],
  },
  {
    id: "vjp-11-svg-drawing-board-6",
    chapter: "vjp-11-svg-drawing-board",
    level: 3,
    question: "第 11 章 SVG画图板怎样完成可复现实验？",
    answer:
      "固定Vue运行时、工具链、输入和初始URL，依次运行正常、边界、失败和恢复样本，保存事件顺序、状态所有者、首偏离点与清理动作。",
    tags: ["第 11 章 SVG画图板", "可复现实验"],
  },
  {
    id: "vjp-appendix-a-git-1",
    chapter: "vjp-appendix-a-git",
    level: 1,
    question: "附录 A Git入门的核心主张是什么？",
    answer:
      "Git通过对象、引用和三棵树记录项目历史；安全协作依赖先检查差异，再选择性暂存、提交和合并。",
    tags: ["附录 A Git入门", "核心机制"],
  },
  {
    id: "vjp-appendix-a-git-2",
    chapter: "vjp-appendix-a-git",
    level: 2,
    question: "附录 A Git入门覆盖哪些正式目录主题？",
    answer: "附录A Git入门",
    tags: ["附录 A Git入门", "目录覆盖"],
  },
  {
    id: "vjp-appendix-a-git-3",
    chapter: "vjp-appendix-a-git",
    level: 2,
    question: "附录 A Git入门的六阶段证据链是什么？",
    answer:
      "检查工作区 → 选择性暂存 → 创建提交 → 移动分支 → 合并历史 → 验证远端",
    tags: ["附录 A Git入门", "机制链"],
  },
  {
    id: "vjp-appendix-a-git-4",
    chapter: "vjp-appendix-a-git",
    level: 3,
    question: "附录 A Git入门应主动注入哪两类失败？",
    answer:
      "直接git add全部文件并提交，没有检查暂存差异，混入缓存、密钥或无关改动。；遇到冲突只选择ours或theirs，不理解两侧意图也不运行合并后的验证。",
    tags: ["附录 A Git入门", "故障注入"],
  },
  {
    id: "vjp-appendix-a-git-5",
    chapter: "vjp-appendix-a-git",
    level: 3,
    question: "附录 A Git入门签发时保持什么不变量？",
    answer:
      "每次提交范围单一且差异已审查，分支关系可解释，冲突结果通过验证，远端历史没有意外改写或敏感文件。",
    tags: ["附录 A Git入门", "工程验收"],
  },
  {
    id: "vjp-appendix-a-git-6",
    chapter: "vjp-appendix-a-git",
    level: 3,
    question: "附录 A Git入门怎样完成可复现实验？",
    answer:
      "固定Vue运行时、工具链、输入和初始URL，依次运行正常、边界、失败和恢复样本，保存事件顺序、状态所有者、首偏离点与清理动作。",
    tags: ["附录 A Git入门", "可复现实验"],
  },
  {
    id: "vjp-appendix-b-npm-1",
    chapter: "vjp-appendix-b-npm",
    level: 1,
    question: "附录 B NPM入门的核心主张是什么？",
    answer:
      "npm项目的可复现性来自清单、锁文件、受控注册源和确定脚本，而不是某台机器上偶然存在的node_modules。",
    tags: ["附录 B NPM入门", "核心机制"],
  },
  {
    id: "vjp-appendix-b-npm-2",
    chapter: "vjp-appendix-b-npm",
    level: 2,
    question: "附录 B NPM入门覆盖哪些正式目录主题？",
    answer: "附录B NPM入门",
    tags: ["附录 B NPM入门", "目录覆盖"],
  },
  {
    id: "vjp-appendix-b-npm-3",
    chapter: "vjp-appendix-b-npm",
    level: 2,
    question: "附录 B NPM入门的六阶段证据链是什么？",
    answer: "读取清单 → 解析版本 → 锁定依赖树 → 安装包 → 运行脚本 → 审计产物",
    tags: ["附录 B NPM入门", "机制链"],
  },
  {
    id: "vjp-appendix-b-npm-4",
    chapter: "vjp-appendix-b-npm",
    level: 3,
    question: "附录 B NPM入门应主动注入哪两类失败？",
    answer:
      "删除锁文件后使用宽松版本安装，再把本机成功当作可复现构建。；依赖全局安装的CLI，导致开发者和CI使用不同版本与默认配置。",
    tags: ["附录 B NPM入门", "故障注入"],
  },
  {
    id: "vjp-appendix-b-npm-5",
    chapter: "vjp-appendix-b-npm",
    level: 3,
    question: "附录 B NPM入门签发时保持什么不变量？",
    answer:
      "干净环境按锁文件得到同一依赖图，运行时与开发依赖分类清楚，所有质量命令经项目脚本执行，来源和完整性可审计。",
    tags: ["附录 B NPM入门", "工程验收"],
  },
  {
    id: "vjp-appendix-b-npm-6",
    chapter: "vjp-appendix-b-npm",
    level: 3,
    question: "附录 B NPM入门怎样完成可复现实验？",
    answer:
      "固定Vue运行时、工具链、输入和初始URL，依次运行正常、边界、失败和恢复样本，保存事件顺序、状态所有者、首偏离点与清理动作。",
    tags: ["附录 B NPM入门", "可复现实验"],
  },
  {
    id: "vjp-appendix-c-webpack-1",
    chapter: "vjp-appendix-c-webpack",
    level: 1,
    question: "附录 C Webpack入门的核心主张是什么？",
    answer:
      "webpack从入口建立模块图，经loader转换模块、plugin协调构建生命周期，最终产出带缓存与加载关系的资源图。",
    tags: ["附录 C Webpack入门", "核心机制"],
  },
  {
    id: "vjp-appendix-c-webpack-2",
    chapter: "vjp-appendix-c-webpack",
    level: 2,
    question: "附录 C Webpack入门覆盖哪些正式目录主题？",
    answer: "附录C Webpack入门",
    tags: ["附录 C Webpack入门", "目录覆盖"],
  },
  {
    id: "vjp-appendix-c-webpack-3",
    chapter: "vjp-appendix-c-webpack",
    level: 2,
    question: "附录 C Webpack入门的六阶段证据链是什么？",
    answer:
      "读取入口 → 解析模块 → 应用loader → 运行plugin → 拆分chunk → 写出产物",
    tags: ["附录 C Webpack入门", "机制链"],
  },
  {
    id: "vjp-appendix-c-webpack-4",
    chapter: "vjp-appendix-c-webpack",
    level: 3,
    question: "附录 C Webpack入门应主动注入哪两类失败？",
    answer:
      "只看构建成功，不检查模块图和产物体积，重复依赖悄然进入多个chunk。；发布时立即删除旧哈希资源，仍缓存旧HTML的用户打开页面后异步chunk全部404。",
    tags: ["附录 C Webpack入门", "故障注入"],
  },
  {
    id: "vjp-appendix-c-webpack-5",
    chapter: "vjp-appendix-c-webpack",
    level: 3,
    question: "附录 C Webpack入门签发时保持什么不变量？",
    answer:
      "入口到产物链可追踪，loader与plugin责任清楚，开发和生产配置可解释，分包改善真实指标且部署保留旧资源兼容窗口。",
    tags: ["附录 C Webpack入门", "工程验收"],
  },
  {
    id: "vjp-appendix-c-webpack-6",
    chapter: "vjp-appendix-c-webpack",
    level: 3,
    question: "附录 C Webpack入门怎样完成可复现实验？",
    answer:
      "固定Vue运行时、工具链、输入和初始URL，依次运行正常、边界、失败和恢复样本，保存事件顺序、状态所有者、首偏离点与清理动作。",
    tags: ["附录 C Webpack入门", "可复现实验"],
  },
  {
    id: "vjp-appendix-d-closures-object-references-1",
    chapter: "vjp-appendix-d-closures-object-references",
    level: 1,
    question: "附录 D 闭包和对象引用的核心主张是什么？",
    answer:
      "闭包保存词法环境的可达引用，对象变量保存对象身份的引用；两者共同决定状态共享、延迟执行和内存寿命。",
    tags: ["附录 D 闭包和对象引用", "核心机制"],
  },
  {
    id: "vjp-appendix-d-closures-object-references-2",
    chapter: "vjp-appendix-d-closures-object-references",
    level: 2,
    question: "附录 D 闭包和对象引用覆盖哪些正式目录主题？",
    answer: "附录D 闭包和对象引用",
    tags: ["附录 D 闭包和对象引用", "目录覆盖"],
  },
  {
    id: "vjp-appendix-d-closures-object-references-3",
    chapter: "vjp-appendix-d-closures-object-references",
    level: 2,
    question: "附录 D 闭包和对象引用的六阶段证据链是什么？",
    answer:
      "创建词法环境 → 捕获绑定 → 共享对象 → 延迟调用 → 更新引用 → 解除可达",
    tags: ["附录 D 闭包和对象引用", "机制链"],
  },
  {
    id: "vjp-appendix-d-closures-object-references-4",
    chapter: "vjp-appendix-d-closures-object-references",
    level: 3,
    question: "附录 D 闭包和对象引用应主动注入哪两类失败？",
    answer:
      "认为函数调用结束后所有局部变量都会释放，忽略返回回调仍持有词法环境。；用展开运算符复制顶层对象后修改嵌套对象，误以为原对象不会受影响。",
    tags: ["附录 D 闭包和对象引用", "故障注入"],
  },
  {
    id: "vjp-appendix-d-closures-object-references-5",
    chapter: "vjp-appendix-d-closures-object-references",
    level: 3,
    question: "附录 D 闭包和对象引用签发时保持什么不变量？",
    answer:
      "每个延迟回调捕获的绑定可解释，共享对象修改有明确所有者，隔离复制深度符合需求，销毁后可达图不保留无用资源。",
    tags: ["附录 D 闭包和对象引用", "工程验收"],
  },
  {
    id: "vjp-appendix-d-closures-object-references-6",
    chapter: "vjp-appendix-d-closures-object-references",
    level: 3,
    question: "附录 D 闭包和对象引用怎样完成可复现实验？",
    answer:
      "固定Vue运行时、工具链、输入和初始URL，依次运行正常、边界、失败和恢复样本，保存事件顺序、状态所有者、首偏离点与清理动作。",
    tags: ["附录 D 闭包和对象引用", "可复现实验"],
  },
  {
    id: "vjp-appendix-e-ecmascript-6-1",
    chapter: "vjp-appendix-e-ecmascript-6",
    level: 1,
    question: "附录 E 常见的ECMAScript 6语法的核心主张是什么？",
    answer:
      "ES6语法的价值在于更精确地表达作用域、参数、对象结构、异步结果和模块边界，而不是把旧写法机械缩短。",
    tags: ["附录 E 常见的ECMAScript 6语法", "核心机制"],
  },
  {
    id: "vjp-appendix-e-ecmascript-6-2",
    chapter: "vjp-appendix-e-ecmascript-6",
    level: 2,
    question: "附录 E 常见的ECMAScript 6语法覆盖哪些正式目录主题？",
    answer: "附录E 常见的ECMAScript 6语法",
    tags: ["附录 E 常见的ECMAScript 6语法", "目录覆盖"],
  },
  {
    id: "vjp-appendix-e-ecmascript-6-3",
    chapter: "vjp-appendix-e-ecmascript-6",
    level: 2,
    question: "附录 E 常见的ECMAScript 6语法的六阶段证据链是什么？",
    answer: "声明绑定 → 解构数据 → 创建函数 → 组织类 → 组合Promise → 连接模块",
    tags: ["附录 E 常见的ECMAScript 6语法", "机制链"],
  },
  {
    id: "vjp-appendix-e-ecmascript-6-4",
    chapter: "vjp-appendix-e-ecmascript-6",
    level: 3,
    question: "附录 E 常见的ECMAScript 6语法应主动注入哪两类失败？",
    answer:
      "认为const会让对象深度不可变，随后多个模块继续修改同一配置对象。；Promise链的then中启动异步操作却不return，外层提前完成且错误无法传播。",
    tags: ["附录 E 常见的ECMAScript 6语法", "故障注入"],
  },
  {
    id: "vjp-appendix-e-ecmascript-6-5",
    chapter: "vjp-appendix-e-ecmascript-6",
    level: 3,
    question: "附录 E 常见的ECMAScript 6语法签发时保持什么不变量？",
    answer:
      "绑定作用域和可变性明确，箭头函数this符合调用模型，结构化输入经过校验，Promise拒绝可传播，模块依赖无隐式全局状态。",
    tags: ["附录 E 常见的ECMAScript 6语法", "工程验收"],
  },
  {
    id: "vjp-appendix-e-ecmascript-6-6",
    chapter: "vjp-appendix-e-ecmascript-6",
    level: 3,
    question: "附录 E 常见的ECMAScript 6语法怎样完成可复现实验？",
    answer:
      "固定Vue运行时、工具链、输入和初始URL，依次运行正常、边界、失败和恢复样本，保存事件顺序、状态所有者、首偏离点与清理动作。",
    tags: ["附录 E 常见的ECMAScript 6语法", "可复现实验"],
  },
  {
    id: "vjp-official-final-review-1",
    chapter: "vjp-official-final-review",
    level: 1,
    question: "《Vue.js从入门到项目实战》全书总复习的核心主张是什么？",
    answer:
      "全书验收要把语法、组件、路由、Vuex、构建和三个项目放入同一运行证据链，而不是以截图或单次成功代替掌握。",
    tags: ["《Vue.js从入门到项目实战》全书总复习", "核心机制"],
  },
  {
    id: "vjp-official-final-review-2",
    chapter: "vjp-official-final-review",
    level: 2,
    question: "《Vue.js从入门到项目实战》全书总复习覆盖哪些正式目录主题？",
    answer:
      "第1章 引言、第2章 基本介绍、第3章 Vue语法、第4章 Vue选项、第5章 Vue内置组件、第6章 Vue项目化、第7章 打造线上商城（一）、第8章 打造线上商城（二）、第9章 企业官网的建设、第10章 我的掌上新闻、第11章 SVG画图板、附录A Git入门、附录B NPM入门、附录C Webpack入门、附录D 闭包和对象引用、附录E 常见的ECMAScript 6语法",
    tags: ["《Vue.js从入门到项目实战》全书总复习", "目录覆盖"],
  },
  {
    id: "vjp-official-final-review-3",
    chapter: "vjp-official-final-review",
    level: 2,
    question: "《Vue.js从入门到项目实战》全书总复习的六阶段证据链是什么？",
    answer:
      "复核目录 → 实现核心组件 → 贯通路由状态 → 重放项目流程 → 注入失败 → 签发作品集",
    tags: ["《Vue.js从入门到项目实战》全书总复习", "机制链"],
  },
  {
    id: "vjp-official-final-review-4",
    chapter: "vjp-official-final-review",
    level: 3,
    question: "《Vue.js从入门到项目实战》全书总复习应主动注入哪两类失败？",
    answer:
      "只展示四个项目的最终截图，没有保存状态流、失败轨迹和构建版本。；能解释Vue 3写法，却无法说明原书Vue 2中新增属性、v-model、Vuex和生命周期的行为。",
    tags: ["《Vue.js从入门到项目实战》全书总复习", "故障注入"],
  },
  {
    id: "vjp-official-final-review-5",
    chapter: "vjp-official-final-review",
    level: 3,
    question: "《Vue.js从入门到项目实战》全书总复习签发时保持什么不变量？",
    answer:
      "16个正式单元和133个公开条目全部可定位，四类项目可重放，故障修复后无陈旧请求、重复提交、定时器或资源泄漏。",
    tags: ["《Vue.js从入门到项目实战》全书总复习", "工程验收"],
  },
  {
    id: "vjp-official-final-review-6",
    chapter: "vjp-official-final-review",
    level: 3,
    question: "《Vue.js从入门到项目实战》全书总复习怎样完成可复现实验？",
    answer:
      "固定Vue运行时、工具链、输入和初始URL，依次运行正常、边界、失败和恢复样本，保存事件顺序、状态所有者、首偏离点与清理动作。",
    tags: ["《Vue.js从入门到项目实战》全书总复习", "可复现实验"],
  },
];
