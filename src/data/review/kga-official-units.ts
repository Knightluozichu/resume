import type { ReviewQuestion } from "../review-questions";

export const kgaOfficialQuestions: ReviewQuestion[] = [
  {
    id: "kga-official-learning-map-q1",
    chapter: "kga-official-learning-map",
    level: 1,
    question: "为什么“原书权威学习地图”必须覆盖20个目录节点？",
    answer:
      "这些节点共同组成“沿入门、基础、进阶、应用四篇建立16章4附录的依赖图和Kong 2.0.5版本边界”的请求、配置、运行与证据链；漏项会使完整目录映射、四篇依赖图、版本边界、实验索引、证据门和全书验收清单无法独立复现。",
    tags: ["Kong网关", "Kong 2.0.5", "原书权威学习地图", "四篇结构"],
  },
  {
    id: "kga-official-learning-map-q2",
    chapter: "kga-official-learning-map",
    level: 1,
    question: "“原书权威学习地图”的最小不变量是什么？",
    answer:
      "20个正式单元与280个唯一目录节点全部可达，章节实验、证据和版本差异均能回指权威目录；需要版本、配置、请求轨迹、指标、故障与业务对账共同证明。",
    tags: ["Kong网关", "Kong 2.0.5", "原书权威学习地图", "Kong 2.0.5"],
  },
  {
    id: "kga-official-learning-map-q3",
    chapter: "kga-official-learning-map",
    level: 2,
    question: "怎样为“原书权威学习地图”构造单变量反例？",
    answer:
      "固定Kong 2.0.5、请求集合、Route、Service和上游，只改变一个匹配条件、插件、Target权重、失败节点或数据库状态，再比较决策轨迹与最终业务结果。",
    tags: ["Kong网关", "Kong 2.0.5", "原书权威学习地图", "目录分母"],
  },
  {
    id: "kga-official-learning-map-q4",
    chapter: "kga-official-learning-map",
    level: 2,
    question: "“原书权威学习地图”为什么必须固定Kong 2.0.5？",
    answer:
      "原书与作者源码以Kong 2.0.5为行为基线；后来的路由、插件、部署、数据库与云原生接口只能作为差异材料，不能替代“沿入门、基础、进阶、应用四篇建立16章4附录的依赖图和Kong 2.0.5版本边界”的正式分母。",
    tags: ["Kong网关", "Kong 2.0.5", "原书权威学习地图", "证据链"],
  },
  {
    id: "kga-official-learning-map-q5",
    chapter: "kga-official-learning-map",
    level: 3,
    question: "如何验证“原书权威学习地图”的性能与可用性结论？",
    answer:
      "固定请求分布、连接、插件链、上游与可靠语义，重复测吞吐、P50/P95/P99、错误率、worker、数据库和上游分布，并独立对账。",
    tags: ["Kong网关", "Kong 2.0.5", "原书权威学习地图", "版本边界"],
  },
  {
    id: "kga-official-learning-map-q6",
    chapter: "kga-official-learning-map",
    level: 3,
    question: "“原书权威学习地图”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、配置快照、请求轨迹、完整目录映射、四篇依赖图、版本边界、实验索引、证据门和全书验收清单、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kong网关", "Kong 2.0.5", "原书权威学习地图", "四篇结构"],
  },
  {
    id: "kga-01-overview-q1",
    chapter: "kga-01-overview",
    level: 1,
    question: "为什么“第1章 全面了解Kong网关”必须覆盖20个目录节点？",
    answer:
      "这些节点共同组成“从网关由来、职责、Kong发展与基础组件进入安装和首个Web代理项目”的请求、配置、运行与证据链；漏项会使网关职责表、组件拓扑、三平台安装记录、Web应用路由与静态资源代理验收无法独立复现。",
    tags: ["Kong网关", "Kong 2.0.5", "第1章 全面了解Kong网关", "网关层"],
  },
  {
    id: "kga-01-overview-q2",
    chapter: "kga-01-overview",
    level: 1,
    question: "“第1章 全面了解Kong网关”的最小不变量是什么？",
    answer:
      "同一后端在Kong 2.0.5上完成动态服务路由与静态页面代理，Admin API和代理端口边界清楚且可复现；需要版本、配置、请求轨迹、指标、故障与业务对账共同证明。",
    tags: ["Kong网关", "Kong 2.0.5", "第1章 全面了解Kong网关", "Kong服务器"],
  },
  {
    id: "kga-01-overview-q3",
    chapter: "kga-01-overview",
    level: 2,
    question: "怎样为“第1章 全面了解Kong网关”构造单变量反例？",
    answer:
      "固定Kong 2.0.5、请求集合、Route、Service和上游，只改变一个匹配条件、插件、Target权重、失败节点或数据库状态，再比较决策轨迹与最终业务结果。",
    tags: ["Kong网关", "Kong 2.0.5", "第1章 全面了解Kong网关", "Admin API"],
  },
  {
    id: "kga-01-overview-q4",
    chapter: "kga-01-overview",
    level: 2,
    question: "“第1章 全面了解Kong网关”为什么必须固定Kong 2.0.5？",
    answer:
      "原书与作者源码以Kong 2.0.5为行为基线；后来的路由、插件、部署、数据库与云原生接口只能作为差异材料，不能替代“从网关由来、职责、Kong发展与基础组件进入安装和首个Web代理项目”的正式分母。",
    tags: ["Kong网关", "Kong 2.0.5", "第1章 全面了解Kong网关", "数据库"],
  },
  {
    id: "kga-01-overview-q5",
    chapter: "kga-01-overview",
    level: 3,
    question: "如何验证“第1章 全面了解Kong网关”的性能与可用性结论？",
    answer:
      "固定请求分布、连接、插件链、上游与可靠语义，重复测吞吐、P50/P95/P99、错误率、worker、数据库和上游分布，并独立对账。",
    tags: ["Kong网关", "Kong 2.0.5", "第1章 全面了解Kong网关", "路由"],
  },
  {
    id: "kga-01-overview-q6",
    chapter: "kga-01-overview",
    level: 3,
    question: "“第1章 全面了解Kong网关”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、配置快照、请求轨迹、网关职责表、组件拓扑、三平台安装记录、Web应用路由与静态资源代理验收、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kong网关", "Kong 2.0.5", "第1章 全面了解Kong网关", "网关层"],
  },
  {
    id: "kga-02-nginx-q1",
    chapter: "kga-02-nginx",
    level: 1,
    question: "为什么“第2章 Nginx知识”必须覆盖18个目录节点？",
    answer:
      "这些节点共同组成“建立Kong底座所需的Nginx安装、目录、命令、配置、模块、进程模型、优化与切换实践”的请求、配置、运行与证据链；漏项会使三平台安装、目录与命令清单、worker机制图、优化基线、Kong和Nginx双向切换演练无法独立复现。",
    tags: ["Kong网关", "Kong 2.0.5", "第2章 Nginx知识", "master进程"],
  },
  {
    id: "kga-02-nginx-q2",
    chapter: "kga-02-nginx",
    level: 1,
    question: "“第2章 Nginx知识”的最小不变量是什么？",
    answer:
      "Nginx与Kong使用同一后端和负载时，黑白名单、限流、代理和回切结果可按配置快照与请求轨迹对照；需要版本、配置、请求轨迹、指标、故障与业务对账共同证明。",
    tags: ["Kong网关", "Kong 2.0.5", "第2章 Nginx知识", "worker进程"],
  },
  {
    id: "kga-02-nginx-q3",
    chapter: "kga-02-nginx",
    level: 2,
    question: "怎样为“第2章 Nginx知识”构造单变量反例？",
    answer:
      "固定Kong 2.0.5、请求集合、Route、Service和上游，只改变一个匹配条件、插件、Target权重、失败节点或数据库状态，再比较决策轨迹与最终业务结果。",
    tags: ["Kong网关", "Kong 2.0.5", "第2章 Nginx知识", "nginx.conf"],
  },
  {
    id: "kga-02-nginx-q4",
    chapter: "kga-02-nginx",
    level: 2,
    question: "“第2章 Nginx知识”为什么必须固定Kong 2.0.5？",
    answer:
      "原书与作者源码以Kong 2.0.5为行为基线；后来的路由、插件、部署、数据库与云原生接口只能作为差异材料，不能替代“建立Kong底座所需的Nginx安装、目录、命令、配置、模块、进程模型、优化与切换实践”的正式分母。",
    tags: ["Kong网关", "Kong 2.0.5", "第2章 Nginx知识", "反向代理"],
  },
  {
    id: "kga-02-nginx-q5",
    chapter: "kga-02-nginx",
    level: 3,
    question: "如何验证“第2章 Nginx知识”的性能与可用性结论？",
    answer:
      "固定请求分布、连接、插件链、上游与可靠语义，重复测吞吐、P50/P95/P99、错误率、worker、数据库和上游分布，并独立对账。",
    tags: ["Kong网关", "Kong 2.0.5", "第2章 Nginx知识", "限流"],
  },
  {
    id: "kga-02-nginx-q6",
    chapter: "kga-02-nginx",
    level: 3,
    question: "“第2章 Nginx知识”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、配置快照、请求轨迹、三平台安装、目录与命令清单、worker机制图、优化基线、Kong和Nginx双向切换演练、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kong网关", "Kong 2.0.5", "第2章 Nginx知识", "master进程"],
  },
  {
    id: "kga-03-lua-q1",
    chapter: "kga-03-lua",
    level: 1,
    question: "为什么“第3章 Lua知识”必须覆盖12个目录节点？",
    answer:
      "这些节点共同组成“掌握嵌入Kong插件所需的Lua运行环境、语法、类型、操作符、控制语句和标准库”的请求、配置、运行与证据链；漏项会使LuaJIT环境记录、类型实验、table和闭包轨迹、控制流测试、库函数边界清单无法独立复现。",
    tags: ["Kong网关", "Kong 2.0.5", "第3章 Lua知识", "LuaJIT"],
  },
  {
    id: "kga-03-lua-q2",
    chapter: "kga-03-lua",
    level: 1,
    question: "“第3章 Lua知识”的最小不变量是什么？",
    answer:
      "示例在书中Lua和LuaJIT语境下输出确定，nil、table、闭包与多返回值边界有断言而非凭直觉解释；需要版本、配置、请求轨迹、指标、故障与业务对账共同证明。",
    tags: ["Kong网关", "Kong 2.0.5", "第3章 Lua知识", "table"],
  },
  {
    id: "kga-03-lua-q3",
    chapter: "kga-03-lua",
    level: 2,
    question: "怎样为“第3章 Lua知识”构造单变量反例？",
    answer:
      "固定Kong 2.0.5、请求集合、Route、Service和上游，只改变一个匹配条件、插件、Target权重、失败节点或数据库状态，再比较决策轨迹与最终业务结果。",
    tags: ["Kong网关", "Kong 2.0.5", "第3章 Lua知识", "nil"],
  },
  {
    id: "kga-03-lua-q4",
    chapter: "kga-03-lua",
    level: 2,
    question: "“第3章 Lua知识”为什么必须固定Kong 2.0.5？",
    answer:
      "原书与作者源码以Kong 2.0.5为行为基线；后来的路由、插件、部署、数据库与云原生接口只能作为差异材料，不能替代“掌握嵌入Kong插件所需的Lua运行环境、语法、类型、操作符、控制语句和标准库”的正式分母。",
    tags: ["Kong网关", "Kong 2.0.5", "第3章 Lua知识", "闭包"],
  },
  {
    id: "kga-03-lua-q5",
    chapter: "kga-03-lua",
    level: 3,
    question: "如何验证“第3章 Lua知识”的性能与可用性结论？",
    answer:
      "固定请求分布、连接、插件链、上游与可靠语义，重复测吞吐、P50/P95/P99、错误率、worker、数据库和上游分布，并独立对账。",
    tags: ["Kong网关", "Kong 2.0.5", "第3章 Lua知识", "多返回值"],
  },
  {
    id: "kga-03-lua-q6",
    chapter: "kga-03-lua",
    level: 3,
    question: "“第3章 Lua知识”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、配置快照、请求轨迹、LuaJIT环境记录、类型实验、table和闭包轨迹、控制流测试、库函数边界清单、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kong网关", "Kong 2.0.5", "第3章 Lua知识", "LuaJIT"],
  },
  {
    id: "kga-04-openresty-q1",
    chapter: "kga-04-openresty",
    level: 1,
    question: "为什么“第4章 OpenResty知识”必须覆盖16个目录节点？",
    answer:
      "这些节点共同组成“连接Nginx与Lua，理解OpenResty安装、目录、resty CLI、包管理、执行阶段、非阻塞约束和性能优化”的请求、配置、运行与证据链；漏项会使三平台环境、resty和包管理命令、阶段时间线、阻塞对照实验、缓存与火焰图证据无法独立复现。",
    tags: ["Kong网关", "Kong 2.0.5", "第4章 OpenResty知识", "OpenResty"],
  },
  {
    id: "kga-04-openresty-q2",
    chapter: "kga-04-openresty",
    level: 1,
    question: "“第4章 OpenResty知识”的最小不变量是什么？",
    answer:
      "同一请求在各ngx_lua阶段的顺序、协程让出点、共享缓存和阻塞反例可由时间线与火焰图复核；需要版本、配置、请求轨迹、指标、故障与业务对账共同证明。",
    tags: ["Kong网关", "Kong 2.0.5", "第4章 OpenResty知识", "resty CLI"],
  },
  {
    id: "kga-04-openresty-q3",
    chapter: "kga-04-openresty",
    level: 2,
    question: "怎样为“第4章 OpenResty知识”构造单变量反例？",
    answer:
      "固定Kong 2.0.5、请求集合、Route、Service和上游，只改变一个匹配条件、插件、Target权重、失败节点或数据库状态，再比较决策轨迹与最终业务结果。",
    tags: ["Kong网关", "Kong 2.0.5", "第4章 OpenResty知识", "ngx_lua阶段"],
  },
  {
    id: "kga-04-openresty-q4",
    chapter: "kga-04-openresty",
    level: 2,
    question: "“第4章 OpenResty知识”为什么必须固定Kong 2.0.5？",
    answer:
      "原书与作者源码以Kong 2.0.5为行为基线；后来的路由、插件、部署、数据库与云原生接口只能作为差异材料，不能替代“连接Nginx与Lua，理解OpenResty安装、目录、resty CLI、包管理、执行阶段、非阻塞约束和性能优化”的正式分母。",
    tags: ["Kong网关", "Kong 2.0.5", "第4章 OpenResty知识", "协程"],
  },
  {
    id: "kga-04-openresty-q5",
    chapter: "kga-04-openresty",
    level: 3,
    question: "如何验证“第4章 OpenResty知识”的性能与可用性结论？",
    answer:
      "固定请求分布、连接、插件链、上游与可靠语义，重复测吞吐、P50/P95/P99、错误率、worker、数据库和上游分布，并独立对账。",
    tags: ["Kong网关", "Kong 2.0.5", "第4章 OpenResty知识", "火焰图"],
  },
  {
    id: "kga-04-openresty-q6",
    chapter: "kga-04-openresty",
    level: 3,
    question: "“第4章 OpenResty知识”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、配置快照、请求轨迹、三平台环境、resty和包管理命令、阶段时间线、阻塞对照实验、缓存与火焰图证据、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kong网关", "Kong 2.0.5", "第4章 OpenResty知识", "OpenResty"],
  },
  {
    id: "kga-05-config-deployment-q1",
    chapter: "kga-05-config-deployment",
    level: 1,
    question: "为什么“第5章 Kong网关配置与部署”必须覆盖16个目录节点？",
    answer:
      "这些节点共同组成“沿配置加载、环境变量、Nginx指令注入、自定义模板和三种部署模式建立Kong 2.0.5运行基线”的请求、配置、运行与证据链；漏项会使配置来源矩阵、指令注入结果、自定义模板差异、三部署模式拓扑和启停回退记录无法独立复现。",
    tags: ["Kong网关", "Kong 2.0.5", "第5章 Kong网关配置与部署", "kong.conf"],
  },
  {
    id: "kga-05-config-deployment-q2",
    chapter: "kga-05-config-deployment",
    level: 1,
    question: "“第5章 Kong网关配置与部署”的最小不变量是什么？",
    answer:
      "文件、环境变量和默认值优先级可追踪，DB-less、数据库与混合模式的控制面和数据面边界分别验证；需要版本、配置、请求轨迹、指标、故障与业务对账共同证明。",
    tags: ["Kong网关", "Kong 2.0.5", "第5章 Kong网关配置与部署", "环境变量"],
  },
  {
    id: "kga-05-config-deployment-q3",
    chapter: "kga-05-config-deployment",
    level: 2,
    question: "怎样为“第5章 Kong网关配置与部署”构造单变量反例？",
    answer:
      "固定Kong 2.0.5、请求集合、Route、Service和上游，只改变一个匹配条件、插件、Target权重、失败节点或数据库状态，再比较决策轨迹与最终业务结果。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第5章 Kong网关配置与部署",
      "Nginx指令注入",
    ],
  },
  {
    id: "kga-05-config-deployment-q4",
    chapter: "kga-05-config-deployment",
    level: 2,
    question: "“第5章 Kong网关配置与部署”为什么必须固定Kong 2.0.5？",
    answer:
      "原书与作者源码以Kong 2.0.5为行为基线；后来的路由、插件、部署、数据库与云原生接口只能作为差异材料，不能替代“沿配置加载、环境变量、Nginx指令注入、自定义模板和三种部署模式建立Kong 2.0.5运行基线”的正式分母。",
    tags: ["Kong网关", "Kong 2.0.5", "第5章 Kong网关配置与部署", "DB-less"],
  },
  {
    id: "kga-05-config-deployment-q5",
    chapter: "kga-05-config-deployment",
    level: 3,
    question: "如何验证“第5章 Kong网关配置与部署”的性能与可用性结论？",
    answer:
      "固定请求分布、连接、插件链、上游与可靠语义，重复测吞吐、P50/P95/P99、错误率、worker、数据库和上游分布，并独立对账。",
    tags: ["Kong网关", "Kong 2.0.5", "第5章 Kong网关配置与部署", "混合模式"],
  },
  {
    id: "kga-05-config-deployment-q6",
    chapter: "kga-05-config-deployment",
    level: 3,
    question: "“第5章 Kong网关配置与部署”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、配置快照、请求轨迹、配置来源矩阵、指令注入结果、自定义模板差异、三部署模式拓扑和启停回退记录、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kong网关", "Kong 2.0.5", "第5章 Kong网关配置与部署", "kong.conf"],
  },
  {
    id: "kga-06-cli-q1",
    chapter: "kga-06-cli",
    level: 1,
    question: "为什么“第6章 Kong网关命令行”必须覆盖15个目录节点？",
    answer:
      "这些节点共同组成“逐条掌握Kong 2.0.5命令行通用标志以及检查、配置、健康、混合、迁移、准备和进程生命周期命令”的请求、配置、运行与证据链；漏项会使命令语义矩阵、退出码记录、迁移状态机、启停重载实验、失败恢复和回退手册无法独立复现。",
    tags: ["Kong网关", "Kong 2.0.5", "第6章 Kong网关命令行", "kong check"],
  },
  {
    id: "kga-06-cli-q2",
    chapter: "kga-06-cli",
    level: 1,
    question: "“第6章 Kong网关命令行”的最小不变量是什么？",
    answer:
      "每条命令的输入配置、前置状态、退出码、状态变化与可逆性明确，进程停止和配置失效不混为一谈；需要版本、配置、请求轨迹、指标、故障与业务对账共同证明。",
    tags: ["Kong网关", "Kong 2.0.5", "第6章 Kong网关命令行", "kong config"],
  },
  {
    id: "kga-06-cli-q3",
    chapter: "kga-06-cli",
    level: 2,
    question: "怎样为“第6章 Kong网关命令行”构造单变量反例？",
    answer:
      "固定Kong 2.0.5、请求集合、Route、Service和上游，只改变一个匹配条件、插件、Target权重、失败节点或数据库状态，再比较决策轨迹与最终业务结果。",
    tags: ["Kong网关", "Kong 2.0.5", "第6章 Kong网关命令行", "kong migrations"],
  },
  {
    id: "kga-06-cli-q4",
    chapter: "kga-06-cli",
    level: 2,
    question: "“第6章 Kong网关命令行”为什么必须固定Kong 2.0.5？",
    answer:
      "原书与作者源码以Kong 2.0.5为行为基线；后来的路由、插件、部署、数据库与云原生接口只能作为差异材料，不能替代“逐条掌握Kong 2.0.5命令行通用标志以及检查、配置、健康、混合、迁移、准备和进程生命周期命令”的正式分母。",
    tags: ["Kong网关", "Kong 2.0.5", "第6章 Kong网关命令行", "kong reload"],
  },
  {
    id: "kga-06-cli-q5",
    chapter: "kga-06-cli",
    level: 3,
    question: "如何验证“第6章 Kong网关命令行”的性能与可用性结论？",
    answer:
      "固定请求分布、连接、插件链、上游与可靠语义，重复测吞吐、P50/P95/P99、错误率、worker、数据库和上游分布，并独立对账。",
    tags: ["Kong网关", "Kong 2.0.5", "第6章 Kong网关命令行", "退出码"],
  },
  {
    id: "kga-06-cli-q6",
    chapter: "kga-06-cli",
    level: 3,
    question: "“第6章 Kong网关命令行”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、配置快照、请求轨迹、命令语义矩阵、退出码记录、迁移状态机、启停重载实验、失败恢复和回退手册、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kong网关", "Kong 2.0.5", "第6章 Kong网关命令行", "kong check"],
  },
  {
    id: "kga-07-proxy-auth-q1",
    chapter: "kga-07-proxy-auth",
    level: 1,
    question: "为什么“第7章 Kong网关代理及鉴权”必须覆盖28个目录节点？",
    answer:
      "这些节点共同组成“从Service、Route与Consumer术语进入多维路由、优先级、代理行为、TLS、WebSocket、gRPC与多重鉴权”的请求、配置、运行与证据链；漏项会使实体拓扑、路由竞争表、协议代理轨迹、超时重试实验、鉴权状态机和负向测试无法独立复现。",
    tags: ["Kong网关", "Kong 2.0.5", "第7章 Kong网关代理及鉴权", "Service"],
  },
  {
    id: "kga-07-proxy-auth-q2",
    chapter: "kga-07-proxy-auth",
    level: 1,
    question: "“第7章 Kong网关代理及鉴权”的最小不变量是什么？",
    answer:
      "给定同一请求集合时唯一命中预期Route，超时重试和插件阶段可解释，匿名与多认证链不会绕过授权边界；需要版本、配置、请求轨迹、指标、故障与业务对账共同证明。",
    tags: ["Kong网关", "Kong 2.0.5", "第7章 Kong网关代理及鉴权", "Route"],
  },
  {
    id: "kga-07-proxy-auth-q3",
    chapter: "kga-07-proxy-auth",
    level: 2,
    question: "怎样为“第7章 Kong网关代理及鉴权”构造单变量反例？",
    answer:
      "固定Kong 2.0.5、请求集合、Route、Service和上游，只改变一个匹配条件、插件、Target权重、失败节点或数据库状态，再比较决策轨迹与最终业务结果。",
    tags: ["Kong网关", "Kong 2.0.5", "第7章 Kong网关代理及鉴权", "Consumer"],
  },
  {
    id: "kga-07-proxy-auth-q4",
    chapter: "kga-07-proxy-auth",
    level: 2,
    question: "“第7章 Kong网关代理及鉴权”为什么必须固定Kong 2.0.5？",
    answer:
      "原书与作者源码以Kong 2.0.5为行为基线；后来的路由、插件、部署、数据库与云原生接口只能作为差异材料，不能替代“从Service、Route与Consumer术语进入多维路由、优先级、代理行为、TLS、WebSocket、gRPC与多重鉴权”的正式分母。",
    tags: ["Kong网关", "Kong 2.0.5", "第7章 Kong网关代理及鉴权", "路由优先级"],
  },
  {
    id: "kga-07-proxy-auth-q5",
    chapter: "kga-07-proxy-auth",
    level: 3,
    question: "如何验证“第7章 Kong网关代理及鉴权”的性能与可用性结论？",
    answer:
      "固定请求分布、连接、插件链、上游与可靠语义，重复测吞吐、P50/P95/P99、错误率、worker、数据库和上游分布，并独立对账。",
    tags: ["Kong网关", "Kong 2.0.5", "第7章 Kong网关代理及鉴权", "多重认证"],
  },
  {
    id: "kga-07-proxy-auth-q6",
    chapter: "kga-07-proxy-auth",
    level: 3,
    question: "“第7章 Kong网关代理及鉴权”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、配置快照、请求轨迹、实体拓扑、路由竞争表、协议代理轨迹、超时重试实验、鉴权状态机和负向测试、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kong网关", "Kong 2.0.5", "第7章 Kong网关代理及鉴权", "Service"],
  },
  {
    id: "kga-08-load-balancing-health-q1",
    chapter: "kga-08-load-balancing-health",
    level: 1,
    question:
      "为什么“第8章 Kong网关负载均衡策略与健康检查”必须覆盖21个目录节点？",
    answer:
      "这些节点共同组成“比较DNS和环状负载均衡，推导蓝绿与金丝雀权重，并组合主动、被动健康检查”的请求、配置、运行与证据链；漏项会使DNS记录实验、ring状态图、权重发布记录、主动被动健康轨迹、故障摘除与恢复验收无法独立复现。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第8章 Kong网关负载均衡策略与健康检查",
      "Upstream",
    ],
  },
  {
    id: "kga-08-load-balancing-health-q2",
    chapter: "kga-08-load-balancing-health",
    level: 1,
    question: "“第8章 Kong网关负载均衡策略与健康检查”的最小不变量是什么？",
    answer:
      "固定Target集合和请求序列时分配比例可解释，失败Target按阈值摘除并在恢复条件满足后重新加入；需要版本、配置、请求轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第8章 Kong网关负载均衡策略与健康检查",
      "Target",
    ],
  },
  {
    id: "kga-08-load-balancing-health-q3",
    chapter: "kga-08-load-balancing-health",
    level: 2,
    question: "怎样为“第8章 Kong网关负载均衡策略与健康检查”构造单变量反例？",
    answer:
      "固定Kong 2.0.5、请求集合、Route、Service和上游，只改变一个匹配条件、插件、Target权重、失败节点或数据库状态，再比较决策轨迹与最终业务结果。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第8章 Kong网关负载均衡策略与健康检查",
      "DNS负载均衡",
    ],
  },
  {
    id: "kga-08-load-balancing-health-q4",
    chapter: "kga-08-load-balancing-health",
    level: 2,
    question:
      "“第8章 Kong网关负载均衡策略与健康检查”为什么必须固定Kong 2.0.5？",
    answer:
      "原书与作者源码以Kong 2.0.5为行为基线；后来的路由、插件、部署、数据库与云原生接口只能作为差异材料，不能替代“比较DNS和环状负载均衡，推导蓝绿与金丝雀权重，并组合主动、被动健康检查”的正式分母。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第8章 Kong网关负载均衡策略与健康检查",
      "环状负载均衡器",
    ],
  },
  {
    id: "kga-08-load-balancing-health-q5",
    chapter: "kga-08-load-balancing-health",
    level: 3,
    question:
      "如何验证“第8章 Kong网关负载均衡策略与健康检查”的性能与可用性结论？",
    answer:
      "固定请求分布、连接、插件链、上游与可靠语义，重复测吞吐、P50/P95/P99、错误率、worker、数据库和上游分布，并独立对账。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第8章 Kong网关负载均衡策略与健康检查",
      "健康检查",
    ],
  },
  {
    id: "kga-08-load-balancing-health-q6",
    chapter: "kga-08-load-balancing-health",
    level: 3,
    question:
      "“第8章 Kong网关负载均衡策略与健康检查”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、配置快照、请求轨迹、DNS记录实验、ring状态图、权重发布记录、主动被动健康轨迹、故障摘除与恢复验收、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第8章 Kong网关负载均衡策略与健康检查",
      "Upstream",
    ],
  },
  {
    id: "kga-09-plugins-q1",
    chapter: "kga-09-plugins",
    level: 1,
    question: "为什么“第9章 Kong网关插件”必须覆盖17个目录节点？",
    answer:
      "这些节点共同组成“覆盖插件概念与执行原理、七类官方插件、自定义生命周期、PDK、Go开发与完整实例”的请求、配置、运行与证据链；漏项会使插件分类矩阵、阶段顺序图、PDK调用轨迹、Lua和Go插件骨架、安装测试与回退包无法独立复现。",
    tags: ["Kong网关", "Kong 2.0.5", "第9章 Kong网关插件", "插件生命周期"],
  },
  {
    id: "kga-09-plugins-q2",
    chapter: "kga-09-plugins",
    level: 1,
    question: "“第9章 Kong网关插件”的最小不变量是什么？",
    answer:
      "插件作用域、优先级、执行阶段、配置模式和失败边界可追踪，自定义插件在Kong 2.0.5上可装载和回退；需要版本、配置、请求轨迹、指标、故障与业务对账共同证明。",
    tags: ["Kong网关", "Kong 2.0.5", "第9章 Kong网关插件", "PDK"],
  },
  {
    id: "kga-09-plugins-q3",
    chapter: "kga-09-plugins",
    level: 2,
    question: "怎样为“第9章 Kong网关插件”构造单变量反例？",
    answer:
      "固定Kong 2.0.5、请求集合、Route、Service和上游，只改变一个匹配条件、插件、Target权重、失败节点或数据库状态，再比较决策轨迹与最终业务结果。",
    tags: ["Kong网关", "Kong 2.0.5", "第9章 Kong网关插件", "handler.lua"],
  },
  {
    id: "kga-09-plugins-q4",
    chapter: "kga-09-plugins",
    level: 2,
    question: "“第9章 Kong网关插件”为什么必须固定Kong 2.0.5？",
    answer:
      "原书与作者源码以Kong 2.0.5为行为基线；后来的路由、插件、部署、数据库与云原生接口只能作为差异材料，不能替代“覆盖插件概念与执行原理、七类官方插件、自定义生命周期、PDK、Go开发与完整实例”的正式分母。",
    tags: ["Kong网关", "Kong 2.0.5", "第9章 Kong网关插件", "schema.lua"],
  },
  {
    id: "kga-09-plugins-q5",
    chapter: "kga-09-plugins",
    level: 3,
    question: "如何验证“第9章 Kong网关插件”的性能与可用性结论？",
    answer:
      "固定请求分布、连接、插件链、上游与可靠语义，重复测吞吐、P50/P95/P99、错误率、worker、数据库和上游分布，并独立对账。",
    tags: ["Kong网关", "Kong 2.0.5", "第9章 Kong网关插件", "插件优先级"],
  },
  {
    id: "kga-09-plugins-q6",
    chapter: "kga-09-plugins",
    level: 3,
    question: "“第9章 Kong网关插件”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、配置快照、请求轨迹、插件分类矩阵、阶段顺序图、PDK调用轨迹、Lua和Go插件骨架、安装测试与回退包、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kong网关", "Kong 2.0.5", "第9章 Kong网关插件", "插件生命周期"],
  },
  {
    id: "kga-10-logging-q1",
    chapter: "kga-10-logging",
    level: 1,
    question: "为什么“第10章 Kong网关日志”必须覆盖12个目录节点？",
    answer:
      "这些节点共同组成“区分访问与错误日志、日志级别，接入ELK并按请求关联标识定制Kong和ELK字段”的请求、配置、运行与证据链；漏项会使日志分类与级别表、ELK管道拓扑、字段契约、关联查询、丢失率和脱敏验收无法独立复现。",
    tags: ["Kong网关", "Kong 2.0.5", "第10章 Kong网关日志", "访问日志"],
  },
  {
    id: "kga-10-logging-q2",
    chapter: "kga-10-logging",
    level: 1,
    question: "“第10章 Kong网关日志”的最小不变量是什么？",
    answer:
      "一次请求可从Kong访问日志、错误日志到Elasticsearch文档端到端关联，丢失、重复和敏感字段有检测；需要版本、配置、请求轨迹、指标、故障与业务对账共同证明。",
    tags: ["Kong网关", "Kong 2.0.5", "第10章 Kong网关日志", "错误日志"],
  },
  {
    id: "kga-10-logging-q3",
    chapter: "kga-10-logging",
    level: 2,
    question: "怎样为“第10章 Kong网关日志”构造单变量反例？",
    answer:
      "固定Kong 2.0.5、请求集合、Route、Service和上游，只改变一个匹配条件、插件、Target权重、失败节点或数据库状态，再比较决策轨迹与最终业务结果。",
    tags: ["Kong网关", "Kong 2.0.5", "第10章 Kong网关日志", "ELK"],
  },
  {
    id: "kga-10-logging-q4",
    chapter: "kga-10-logging",
    level: 2,
    question: "“第10章 Kong网关日志”为什么必须固定Kong 2.0.5？",
    answer:
      "原书与作者源码以Kong 2.0.5为行为基线；后来的路由、插件、部署、数据库与云原生接口只能作为差异材料，不能替代“区分访问与错误日志、日志级别，接入ELK并按请求关联标识定制Kong和ELK字段”的正式分母。",
    tags: ["Kong网关", "Kong 2.0.5", "第10章 Kong网关日志", "关联标识"],
  },
  {
    id: "kga-10-logging-q5",
    chapter: "kga-10-logging",
    level: 3,
    question: "如何验证“第10章 Kong网关日志”的性能与可用性结论？",
    answer:
      "固定请求分布、连接、插件链、上游与可靠语义，重复测吞吐、P50/P95/P99、错误率、worker、数据库和上游分布，并独立对账。",
    tags: ["Kong网关", "Kong 2.0.5", "第10章 Kong网关日志", "日志脱敏"],
  },
  {
    id: "kga-10-logging-q6",
    chapter: "kga-10-logging",
    level: 3,
    question: "“第10章 Kong网关日志”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、配置快照、请求轨迹、日志分类与级别表、ELK管道拓扑、字段契约、关联查询、丢失率和脱敏验收、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kong网关", "Kong 2.0.5", "第10章 Kong网关日志", "访问日志"],
  },
  {
    id: "kga-11-operations-q1",
    chapter: "kga-11-operations",
    level: 1,
    question: "为什么“第11章 Kong网关运维”必须覆盖17个目录节点？",
    answer:
      "这些节点共同组成“从服务器和数据库资源选型进入伸缩与性能参数，搭建监控、指标、告警并执行备份维护和突发事件处理”的请求、配置、运行与证据链；漏项会使资源预算、基准压测、监控平台、指标字典、告警演练、备份恢复与事件响应手册无法独立复现。",
    tags: ["Kong网关", "Kong 2.0.5", "第11章 Kong网关运维", "容量规划"],
  },
  {
    id: "kga-11-operations-q2",
    chapter: "kga-11-operations",
    level: 1,
    question: "“第11章 Kong网关运维”的最小不变量是什么？",
    answer:
      "容量模型、四黄金信号、Kong与数据库指标、告警阈值、备份恢复点和事件时间线相互可验证；需要版本、配置、请求轨迹、指标、故障与业务对账共同证明。",
    tags: ["Kong网关", "Kong 2.0.5", "第11章 Kong网关运维", "弹性伸缩"],
  },
  {
    id: "kga-11-operations-q3",
    chapter: "kga-11-operations",
    level: 2,
    question: "怎样为“第11章 Kong网关运维”构造单变量反例？",
    answer:
      "固定Kong 2.0.5、请求集合、Route、Service和上游，只改变一个匹配条件、插件、Target权重、失败节点或数据库状态，再比较决策轨迹与最终业务结果。",
    tags: ["Kong网关", "Kong 2.0.5", "第11章 Kong网关运维", "监控指标"],
  },
  {
    id: "kga-11-operations-q4",
    chapter: "kga-11-operations",
    level: 2,
    question: "“第11章 Kong网关运维”为什么必须固定Kong 2.0.5？",
    answer:
      "原书与作者源码以Kong 2.0.5为行为基线；后来的路由、插件、部署、数据库与云原生接口只能作为差异材料，不能替代“从服务器和数据库资源选型进入伸缩与性能参数，搭建监控、指标、告警并执行备份维护和突发事件处理”的正式分母。",
    tags: ["Kong网关", "Kong 2.0.5", "第11章 Kong网关运维", "告警"],
  },
  {
    id: "kga-11-operations-q5",
    chapter: "kga-11-operations",
    level: 3,
    question: "如何验证“第11章 Kong网关运维”的性能与可用性结论？",
    answer:
      "固定请求分布、连接、插件链、上游与可靠语义，重复测吞吐、P50/P95/P99、错误率、worker、数据库和上游分布，并独立对账。",
    tags: ["Kong网关", "Kong 2.0.5", "第11章 Kong网关运维", "恢复点"],
  },
  {
    id: "kga-11-operations-q6",
    chapter: "kga-11-operations",
    level: 3,
    question: "“第11章 Kong网关运维”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、配置快照、请求轨迹、资源预算、基准压测、监控平台、指标字典、告警演练、备份恢复与事件响应手册、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kong网关", "Kong 2.0.5", "第11章 Kong网关运维", "容量规划"],
  },
  {
    id: "kga-12-security-ha-q1",
    chapter: "kga-12-security-ha",
    level: 1,
    question: "为什么“第12章 Kong网关安全与集群高可用”必须覆盖12个目录节点？",
    answer:
      "这些节点共同组成“组合网络限制、Admin API回路与Nginx配置，理解Kong集群缓存，并用HAProxy构建和故障验证高可用”的请求、配置、运行与证据链；漏项会使威胁边界、管理回路测试、缓存传播轨迹、HAProxy拓扑、节点故障注入和恢复对账无法独立复现。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第12章 Kong网关安全与集群高可用",
      "Admin API回路",
    ],
  },
  {
    id: "kga-12-security-ha-q2",
    chapter: "kga-12-security-ha",
    level: 1,
    question: "“第12章 Kong网关安全与集群高可用”的最小不变量是什么？",
    answer:
      "管理面不可从业务入口越权访问，节点配置和缓存最终可解释，任一网关节点故障时代理流量在目标上界内恢复；需要版本、配置、请求轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第12章 Kong网关安全与集群高可用",
      "集群缓存",
    ],
  },
  {
    id: "kga-12-security-ha-q3",
    chapter: "kga-12-security-ha",
    level: 2,
    question: "怎样为“第12章 Kong网关安全与集群高可用”构造单变量反例？",
    answer:
      "固定Kong 2.0.5、请求集合、Route、Service和上游，只改变一个匹配条件、插件、Target权重、失败节点或数据库状态，再比较决策轨迹与最终业务结果。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第12章 Kong网关安全与集群高可用",
      "HAProxy",
    ],
  },
  {
    id: "kga-12-security-ha-q4",
    chapter: "kga-12-security-ha",
    level: 2,
    question: "“第12章 Kong网关安全与集群高可用”为什么必须固定Kong 2.0.5？",
    answer:
      "原书与作者源码以Kong 2.0.5为行为基线；后来的路由、插件、部署、数据库与云原生接口只能作为差异材料，不能替代“组合网络限制、Admin API回路与Nginx配置，理解Kong集群缓存，并用HAProxy构建和故障验证高可用”的正式分母。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第12章 Kong网关安全与集群高可用",
      "健康探测",
    ],
  },
  {
    id: "kga-12-security-ha-q5",
    chapter: "kga-12-security-ha",
    level: 3,
    question: "如何验证“第12章 Kong网关安全与集群高可用”的性能与可用性结论？",
    answer:
      "固定请求分布、连接、插件链、上游与可靠语义，重复测吞吐、P50/P95/P99、错误率、worker、数据库和上游分布，并独立对账。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第12章 Kong网关安全与集群高可用",
      "故障转移",
    ],
  },
  {
    id: "kga-12-security-ha-q6",
    chapter: "kga-12-security-ha",
    level: 3,
    question: "“第12章 Kong网关安全与集群高可用”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、配置快照、请求轨迹、威胁边界、管理回路测试、缓存传播轨迹、HAProxy拓扑、节点故障注入和恢复对账、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第12章 Kong网关安全与集群高可用",
      "Admin API回路",
    ],
  },
  {
    id: "kga-13-microservices-devops-q1",
    chapter: "kga-13-microservices-devops",
    level: 1,
    question: "为什么“第13章 Kong网关结合微服务架构”必须覆盖17个目录节点？",
    answer:
      "这些节点共同组成“从微服务收益与十二要素评估迁移，再以CI/CD和Kong构建可发布、可回退的DevOps平台”的请求、配置、运行与证据链；漏项会使迁移决策、服务边界图、CI/CD流水线、Kong配置发布、平台使用与源码扩展验收无法独立复现。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第13章 Kong网关结合微服务架构",
      "微服务十二要素",
    ],
  },
  {
    id: "kga-13-microservices-devops-q2",
    chapter: "kga-13-microservices-devops",
    level: 1,
    question: "“第13章 Kong网关结合微服务架构”的最小不变量是什么？",
    answer:
      "单体拆分边界、服务契约、网关配置和应用制品作为同一发布单元被追踪，失败发布能在规定时间内回退；需要版本、配置、请求轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第13章 Kong网关结合微服务架构",
      "服务边界",
    ],
  },
  {
    id: "kga-13-microservices-devops-q3",
    chapter: "kga-13-microservices-devops",
    level: 2,
    question: "怎样为“第13章 Kong网关结合微服务架构”构造单变量反例？",
    answer:
      "固定Kong 2.0.5、请求集合、Route、Service和上游，只改变一个匹配条件、插件、Target权重、失败节点或数据库状态，再比较决策轨迹与最终业务结果。",
    tags: ["Kong网关", "Kong 2.0.5", "第13章 Kong网关结合微服务架构", "CI/CD"],
  },
  {
    id: "kga-13-microservices-devops-q4",
    chapter: "kga-13-microservices-devops",
    level: 2,
    question: "“第13章 Kong网关结合微服务架构”为什么必须固定Kong 2.0.5？",
    answer:
      "原书与作者源码以Kong 2.0.5为行为基线；后来的路由、插件、部署、数据库与云原生接口只能作为差异材料，不能替代“从微服务收益与十二要素评估迁移，再以CI/CD和Kong构建可发布、可回退的DevOps平台”的正式分母。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第13章 Kong网关结合微服务架构",
      "配置发布",
    ],
  },
  {
    id: "kga-13-microservices-devops-q5",
    chapter: "kga-13-microservices-devops",
    level: 3,
    question: "如何验证“第13章 Kong网关结合微服务架构”的性能与可用性结论？",
    answer:
      "固定请求分布、连接、插件链、上游与可靠语义，重复测吞吐、P50/P95/P99、错误率、worker、数据库和上游分布，并独立对账。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第13章 Kong网关结合微服务架构",
      "DevOps平台",
    ],
  },
  {
    id: "kga-13-microservices-devops-q6",
    chapter: "kga-13-microservices-devops",
    level: 3,
    question: "“第13章 Kong网关结合微服务架构”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、配置快照、请求轨迹、迁移决策、服务边界图、CI/CD流水线、Kong配置发布、平台使用与源码扩展验收、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第13章 Kong网关结合微服务架构",
      "微服务十二要素",
    ],
  },
  {
    id: "kga-14-kubernetes-q1",
    chapter: "kga-14-kubernetes",
    level: 1,
    question:
      "为什么“第14章 Kong网关结合Kubernetes架构方案”必须覆盖13个目录节点？",
    answer:
      "这些节点共同组成“建立Kubernetes对象模型和HelloWorld基线，再安装Kong、配置入口资源并验证插件策略”的请求、配置、运行与证据链；漏项会使对象关系图、集群基线、Kong安装清单、入口到Service轨迹、插件策略和重建演练无法独立复现。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第14章 Kong网关结合Kubernetes架构方案",
      "Kubernetes",
    ],
  },
  {
    id: "kga-14-kubernetes-q2",
    chapter: "kga-14-kubernetes",
    level: 1,
    question: "“第14章 Kong网关结合Kubernetes架构方案”的最小不变量是什么？",
    answer:
      "Kubernetes声明、控制器观察状态、Kong实体和真实代理请求四层一致，滚动升级和控制器重启后仍收敛；需要版本、配置、请求轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第14章 Kong网关结合Kubernetes架构方案",
      "控制器",
    ],
  },
  {
    id: "kga-14-kubernetes-q3",
    chapter: "kga-14-kubernetes",
    level: 2,
    question: "怎样为“第14章 Kong网关结合Kubernetes架构方案”构造单变量反例？",
    answer:
      "固定Kong 2.0.5、请求集合、Route、Service和上游，只改变一个匹配条件、插件、Target权重、失败节点或数据库状态，再比较决策轨迹与最终业务结果。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第14章 Kong网关结合Kubernetes架构方案",
      "Ingress",
    ],
  },
  {
    id: "kga-14-kubernetes-q4",
    chapter: "kga-14-kubernetes",
    level: 2,
    question:
      "“第14章 Kong网关结合Kubernetes架构方案”为什么必须固定Kong 2.0.5？",
    answer:
      "原书与作者源码以Kong 2.0.5为行为基线；后来的路由、插件、部署、数据库与云原生接口只能作为差异材料，不能替代“建立Kubernetes对象模型和HelloWorld基线，再安装Kong、配置入口资源并验证插件策略”的正式分母。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第14章 Kong网关结合Kubernetes架构方案",
      "Service",
    ],
  },
  {
    id: "kga-14-kubernetes-q5",
    chapter: "kga-14-kubernetes",
    level: 3,
    question:
      "如何验证“第14章 Kong网关结合Kubernetes架构方案”的性能与可用性结论？",
    answer:
      "固定请求分布、连接、插件链、上游与可靠语义，重复测吞吐、P50/P95/P99、错误率、worker、数据库和上游分布，并独立对账。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第14章 Kong网关结合Kubernetes架构方案",
      "声明式配置",
    ],
  },
  {
    id: "kga-14-kubernetes-q6",
    chapter: "kga-14-kubernetes",
    level: 3,
    question:
      "“第14章 Kong网关结合Kubernetes架构方案”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、配置快照、请求轨迹、对象关系图、集群基线、Kong安装清单、入口到Service轨迹、插件策略和重建演练、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第14章 Kong网关结合Kubernetes架构方案",
      "Kubernetes",
    ],
  },
  {
    id: "kga-15-kuma-q1",
    chapter: "kga-15-kuma",
    level: 1,
    question: "为什么“第15章 Service Mesh实践之Kuma”必须覆盖18个目录节点？",
    answer:
      "这些节点共同组成“从Service Mesh和Kuma组件进入策略匹配，覆盖安全、流量、观测策略并完成mTLS与TrafficPermission实战”的请求、配置、运行与证据链；漏项会使Kuma组件图、策略匹配表、安全流量观测实验、mTLS证据、权限负向测试与回退无法独立复现。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第15章 Service Mesh实践之Kuma",
      "Service Mesh",
    ],
  },
  {
    id: "kga-15-kuma-q2",
    chapter: "kga-15-kuma",
    level: 1,
    question: "“第15章 Service Mesh实践之Kuma”的最小不变量是什么？",
    answer:
      "控制面下发与数据面代理状态一致，mTLS身份和TrafficPermission默认拒绝边界可由允许与拒绝请求共同证明；需要版本、配置、请求轨迹、指标、故障与业务对账共同证明。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第15章 Service Mesh实践之Kuma",
      "Kuma控制面",
    ],
  },
  {
    id: "kga-15-kuma-q3",
    chapter: "kga-15-kuma",
    level: 2,
    question: "怎样为“第15章 Service Mesh实践之Kuma”构造单变量反例？",
    answer:
      "固定Kong 2.0.5、请求集合、Route、Service和上游，只改变一个匹配条件、插件、Target权重、失败节点或数据库状态，再比较决策轨迹与最终业务结果。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第15章 Service Mesh实践之Kuma",
      "数据面代理",
    ],
  },
  {
    id: "kga-15-kuma-q4",
    chapter: "kga-15-kuma",
    level: 2,
    question: "“第15章 Service Mesh实践之Kuma”为什么必须固定Kong 2.0.5？",
    answer:
      "原书与作者源码以Kong 2.0.5为行为基线；后来的路由、插件、部署、数据库与云原生接口只能作为差异材料，不能替代“从Service Mesh和Kuma组件进入策略匹配，覆盖安全、流量、观测策略并完成mTLS与TrafficPermission实战”的正式分母。",
    tags: ["Kong网关", "Kong 2.0.5", "第15章 Service Mesh实践之Kuma", "mTLS"],
  },
  {
    id: "kga-15-kuma-q5",
    chapter: "kga-15-kuma",
    level: 3,
    question: "如何验证“第15章 Service Mesh实践之Kuma”的性能与可用性结论？",
    answer:
      "固定请求分布、连接、插件链、上游与可靠语义，重复测吞吐、P50/P95/P99、错误率、worker、数据库和上游分布，并独立对账。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第15章 Service Mesh实践之Kuma",
      "TrafficPermission",
    ],
  },
  {
    id: "kga-15-kuma-q6",
    chapter: "kga-15-kuma",
    level: 3,
    question: "“第15章 Service Mesh实践之Kuma”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、配置快照、请求轨迹、Kuma组件图、策略匹配表、安全流量观测实验、mTLS证据、权限负向测试与回退、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kong网关",
      "Kong 2.0.5",
      "第15章 Service Mesh实践之Kuma",
      "Service Mesh",
    ],
  },
  {
    id: "kga-16-serverless-q1",
    chapter: "kga-16-serverless",
    level: 1,
    question: "为什么“第16章 Serverless架构”必须覆盖8个目录节点？",
    answer:
      "这些节点共同组成“沿系统架构和部署方式演化理解Serverless内核，搭建环境并交付一个经Kong代理的Web应用服务”的请求、配置、运行与证据链；漏项会使演化比较、开发环境、函数部署、Web代理链、冷启动压测、失败重试和成本记录无法独立复现。",
    tags: ["Kong网关", "Kong 2.0.5", "第16章 Serverless架构", "Serverless"],
  },
  {
    id: "kga-16-serverless-q2",
    chapter: "kga-16-serverless",
    level: 1,
    question: "“第16章 Serverless架构”的最小不变量是什么？",
    answer:
      "函数冷启动、并发、超时、重试和成本边界可测，Kong到函数入口的认证、路由与错误映射可追踪；需要版本、配置、请求轨迹、指标、故障与业务对账共同证明。",
    tags: ["Kong网关", "Kong 2.0.5", "第16章 Serverless架构", "函数运行时"],
  },
  {
    id: "kga-16-serverless-q3",
    chapter: "kga-16-serverless",
    level: 2,
    question: "怎样为“第16章 Serverless架构”构造单变量反例？",
    answer:
      "固定Kong 2.0.5、请求集合、Route、Service和上游，只改变一个匹配条件、插件、Target权重、失败节点或数据库状态，再比较决策轨迹与最终业务结果。",
    tags: ["Kong网关", "Kong 2.0.5", "第16章 Serverless架构", "冷启动"],
  },
  {
    id: "kga-16-serverless-q4",
    chapter: "kga-16-serverless",
    level: 2,
    question: "“第16章 Serverless架构”为什么必须固定Kong 2.0.5？",
    answer:
      "原书与作者源码以Kong 2.0.5为行为基线；后来的路由、插件、部署、数据库与云原生接口只能作为差异材料，不能替代“沿系统架构和部署方式演化理解Serverless内核，搭建环境并交付一个经Kong代理的Web应用服务”的正式分母。",
    tags: ["Kong网关", "Kong 2.0.5", "第16章 Serverless架构", "事件触发"],
  },
  {
    id: "kga-16-serverless-q5",
    chapter: "kga-16-serverless",
    level: 3,
    question: "如何验证“第16章 Serverless架构”的性能与可用性结论？",
    answer:
      "固定请求分布、连接、插件链、上游与可靠语义，重复测吞吐、P50/P95/P99、错误率、worker、数据库和上游分布，并独立对账。",
    tags: ["Kong网关", "Kong 2.0.5", "第16章 Serverless架构", "幂等"],
  },
  {
    id: "kga-16-serverless-q6",
    chapter: "kga-16-serverless",
    level: 3,
    question: "“第16章 Serverless架构”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、配置快照、请求轨迹、演化比较、开发环境、函数部署、Web代理链、冷启动压测、失败重试和成本记录、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kong网关", "Kong 2.0.5", "第16章 Serverless架构", "Serverless"],
  },
  {
    id: "kga-appendix-a-docker-q1",
    chapter: "kga-appendix-a-docker",
    level: 1,
    question: "为什么“附录A Docker安装指南”必须覆盖1个目录节点？",
    answer:
      "这些节点共同组成“按书中环境准备Docker，使Kong 2.0.5、数据库和示例服务可由固定镜像与网络复现”的请求、配置、运行与证据链；漏项会使Docker环境清单、镜像摘要、网络卷拓扑、启动日志、健康检查和销毁重建记录无法独立复现。",
    tags: ["Kong网关", "Kong 2.0.5", "附录A Docker安装指南", "镜像"],
  },
  {
    id: "kga-appendix-a-docker-q2",
    chapter: "kga-appendix-a-docker",
    level: 1,
    question: "“附录A Docker安装指南”的最小不变量是什么？",
    answer:
      "镜像标识、容器网络、卷、端口和环境变量全部固定，新主机按记录能重建并通过健康与代理测试；需要版本、配置、请求轨迹、指标、故障与业务对账共同证明。",
    tags: ["Kong网关", "Kong 2.0.5", "附录A Docker安装指南", "容器网络"],
  },
  {
    id: "kga-appendix-a-docker-q3",
    chapter: "kga-appendix-a-docker",
    level: 2,
    question: "怎样为“附录A Docker安装指南”构造单变量反例？",
    answer:
      "固定Kong 2.0.5、请求集合、Route、Service和上游，只改变一个匹配条件、插件、Target权重、失败节点或数据库状态，再比较决策轨迹与最终业务结果。",
    tags: ["Kong网关", "Kong 2.0.5", "附录A Docker安装指南", "数据卷"],
  },
  {
    id: "kga-appendix-a-docker-q4",
    chapter: "kga-appendix-a-docker",
    level: 2,
    question: "“附录A Docker安装指南”为什么必须固定Kong 2.0.5？",
    answer:
      "原书与作者源码以Kong 2.0.5为行为基线；后来的路由、插件、部署、数据库与云原生接口只能作为差异材料，不能替代“按书中环境准备Docker，使Kong 2.0.5、数据库和示例服务可由固定镜像与网络复现”的正式分母。",
    tags: ["Kong网关", "Kong 2.0.5", "附录A Docker安装指南", "端口映射"],
  },
  {
    id: "kga-appendix-a-docker-q5",
    chapter: "kga-appendix-a-docker",
    level: 3,
    question: "如何验证“附录A Docker安装指南”的性能与可用性结论？",
    answer:
      "固定请求分布、连接、插件链、上游与可靠语义，重复测吞吐、P50/P95/P99、错误率、worker、数据库和上游分布，并独立对账。",
    tags: ["Kong网关", "Kong 2.0.5", "附录A Docker安装指南", "环境变量"],
  },
  {
    id: "kga-appendix-a-docker-q6",
    chapter: "kga-appendix-a-docker",
    level: 3,
    question: "“附录A Docker安装指南”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、配置快照、请求轨迹、Docker环境清单、镜像摘要、网络卷拓扑、启动日志、健康检查和销毁重建记录、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kong网关", "Kong 2.0.5", "附录A Docker安装指南", "镜像"],
  },
  {
    id: "kga-appendix-b-konga-q1",
    chapter: "kga-appendix-b-konga",
    level: 1,
    question: "为什么“附录B KONGA安装指南”必须覆盖1个目录节点？",
    answer:
      "这些节点共同组成“安装书中配套KONGA管理界面并明确它与Kong Admin API之间的信任和权限边界”的请求、配置、运行与证据链；漏项会使KONGA版本环境、连接拓扑、最小权限、操作日志、失败诊断和卸载回退记录无法独立复现。",
    tags: ["Kong网关", "Kong 2.0.5", "附录B KONGA安装指南", "KONGA"],
  },
  {
    id: "kga-appendix-b-konga-q2",
    chapter: "kga-appendix-b-konga",
    level: 1,
    question: "“附录B KONGA安装指南”的最小不变量是什么？",
    answer:
      "KONGA只能经受控网络访问目标Admin API，连接配置、凭证、操作审计和停用流程可验证；需要版本、配置、请求轨迹、指标、故障与业务对账共同证明。",
    tags: ["Kong网关", "Kong 2.0.5", "附录B KONGA安装指南", "Admin API"],
  },
  {
    id: "kga-appendix-b-konga-q3",
    chapter: "kga-appendix-b-konga",
    level: 2,
    question: "怎样为“附录B KONGA安装指南”构造单变量反例？",
    answer:
      "固定Kong 2.0.5、请求集合、Route、Service和上游，只改变一个匹配条件、插件、Target权重、失败节点或数据库状态，再比较决策轨迹与最终业务结果。",
    tags: ["Kong网关", "Kong 2.0.5", "附录B KONGA安装指南", "管理平面"],
  },
  {
    id: "kga-appendix-b-konga-q4",
    chapter: "kga-appendix-b-konga",
    level: 2,
    question: "“附录B KONGA安装指南”为什么必须固定Kong 2.0.5？",
    answer:
      "原书与作者源码以Kong 2.0.5为行为基线；后来的路由、插件、部署、数据库与云原生接口只能作为差异材料，不能替代“安装书中配套KONGA管理界面并明确它与Kong Admin API之间的信任和权限边界”的正式分母。",
    tags: ["Kong网关", "Kong 2.0.5", "附录B KONGA安装指南", "连接配置"],
  },
  {
    id: "kga-appendix-b-konga-q5",
    chapter: "kga-appendix-b-konga",
    level: 3,
    question: "如何验证“附录B KONGA安装指南”的性能与可用性结论？",
    answer:
      "固定请求分布、连接、插件链、上游与可靠语义，重复测吞吐、P50/P95/P99、错误率、worker、数据库和上游分布，并独立对账。",
    tags: ["Kong网关", "Kong 2.0.5", "附录B KONGA安装指南", "最小权限"],
  },
  {
    id: "kga-appendix-b-konga-q6",
    chapter: "kga-appendix-b-konga",
    level: 3,
    question: "“附录B KONGA安装指南”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、配置快照、请求轨迹、KONGA版本环境、连接拓扑、最小权限、操作日志、失败诊断和卸载回退记录、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kong网关", "Kong 2.0.5", "附录B KONGA安装指南", "KONGA"],
  },
  {
    id: "kga-appendix-c-database-q1",
    chapter: "kga-appendix-c-database",
    level: 1,
    question: "为什么“附录C 数据库明细”必须覆盖1个目录节点？",
    answer:
      "这些节点共同组成“建立Kong 2.0.5数据库实体、关系、迁移状态和备份恢复的可查询明细”的请求、配置、运行与证据链；漏项会使模式快照、实体关系、迁移记录、只读诊断查询、备份恢复和一致性校验无法独立复现。",
    tags: ["Kong网关", "Kong 2.0.5", "附录C 数据库明细", "数据库模式"],
  },
  {
    id: "kga-appendix-c-database-q2",
    chapter: "kga-appendix-c-database",
    level: 1,
    question: "“附录C 数据库明细”的最小不变量是什么？",
    answer:
      "数据库结构由对应迁移版本产生，直接查询只用于诊断，写入必须经受支持接口且恢复后实体关系完整；需要版本、配置、请求轨迹、指标、故障与业务对账共同证明。",
    tags: ["Kong网关", "Kong 2.0.5", "附录C 数据库明细", "实体关系"],
  },
  {
    id: "kga-appendix-c-database-q3",
    chapter: "kga-appendix-c-database",
    level: 2,
    question: "怎样为“附录C 数据库明细”构造单变量反例？",
    answer:
      "固定Kong 2.0.5、请求集合、Route、Service和上游，只改变一个匹配条件、插件、Target权重、失败节点或数据库状态，再比较决策轨迹与最终业务结果。",
    tags: ["Kong网关", "Kong 2.0.5", "附录C 数据库明细", "迁移"],
  },
  {
    id: "kga-appendix-c-database-q4",
    chapter: "kga-appendix-c-database",
    level: 2,
    question: "“附录C 数据库明细”为什么必须固定Kong 2.0.5？",
    answer:
      "原书与作者源码以Kong 2.0.5为行为基线；后来的路由、插件、部署、数据库与云原生接口只能作为差异材料，不能替代“建立Kong 2.0.5数据库实体、关系、迁移状态和备份恢复的可查询明细”的正式分母。",
    tags: ["Kong网关", "Kong 2.0.5", "附录C 数据库明细", "DAO"],
  },
  {
    id: "kga-appendix-c-database-q5",
    chapter: "kga-appendix-c-database",
    level: 3,
    question: "如何验证“附录C 数据库明细”的性能与可用性结论？",
    answer:
      "固定请求分布、连接、插件链、上游与可靠语义，重复测吞吐、P50/P95/P99、错误率、worker、数据库和上游分布，并独立对账。",
    tags: ["Kong网关", "Kong 2.0.5", "附录C 数据库明细", "一致性校验"],
  },
  {
    id: "kga-appendix-c-database-q6",
    chapter: "kga-appendix-c-database",
    level: 3,
    question: "“附录C 数据库明细”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、配置快照、请求轨迹、模式快照、实体关系、迁移记录、只读诊断查询、备份恢复和一致性校验、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kong网关", "Kong 2.0.5", "附录C 数据库明细", "数据库模式"],
  },
  {
    id: "kga-appendix-d-admin-api-q1",
    chapter: "kga-appendix-d-admin-api",
    level: 1,
    question: "为什么“附录D Admin API”必须覆盖1个目录节点？",
    answer:
      "这些节点共同组成“按实体与操作整理Kong 2.0.5 Admin API，并用鉴权、幂等、分页、错误和审计约束自动化调用”的请求、配置、运行与证据链；漏项会使端点清单、请求响应样例、错误矩阵、自动化脚本、审计日志和配置回退无法独立复现。",
    tags: ["Kong网关", "Kong 2.0.5", "附录D Admin API", "Admin API"],
  },
  {
    id: "kga-appendix-d-admin-api-q2",
    chapter: "kga-appendix-d-admin-api",
    level: 1,
    question: "“附录D Admin API”的最小不变量是什么？",
    answer:
      "每次配置写入有请求、响应、操作者、前后状态和回退证据，Admin API不直接暴露不可信网络；需要版本、配置、请求轨迹、指标、故障与业务对账共同证明。",
    tags: ["Kong网关", "Kong 2.0.5", "附录D Admin API", "实体端点"],
  },
  {
    id: "kga-appendix-d-admin-api-q3",
    chapter: "kga-appendix-d-admin-api",
    level: 2,
    question: "怎样为“附录D Admin API”构造单变量反例？",
    answer:
      "固定Kong 2.0.5、请求集合、Route、Service和上游，只改变一个匹配条件、插件、Target权重、失败节点或数据库状态，再比较决策轨迹与最终业务结果。",
    tags: ["Kong网关", "Kong 2.0.5", "附录D Admin API", "幂等"],
  },
  {
    id: "kga-appendix-d-admin-api-q4",
    chapter: "kga-appendix-d-admin-api",
    level: 2,
    question: "“附录D Admin API”为什么必须固定Kong 2.0.5？",
    answer:
      "原书与作者源码以Kong 2.0.5为行为基线；后来的路由、插件、部署、数据库与云原生接口只能作为差异材料，不能替代“按实体与操作整理Kong 2.0.5 Admin API，并用鉴权、幂等、分页、错误和审计约束自动化调用”的正式分母。",
    tags: ["Kong网关", "Kong 2.0.5", "附录D Admin API", "分页"],
  },
  {
    id: "kga-appendix-d-admin-api-q5",
    chapter: "kga-appendix-d-admin-api",
    level: 3,
    question: "如何验证“附录D Admin API”的性能与可用性结论？",
    answer:
      "固定请求分布、连接、插件链、上游与可靠语义，重复测吞吐、P50/P95/P99、错误率、worker、数据库和上游分布，并独立对账。",
    tags: ["Kong网关", "Kong 2.0.5", "附录D Admin API", "审计"],
  },
  {
    id: "kga-appendix-d-admin-api-q6",
    chapter: "kga-appendix-d-admin-api",
    level: 3,
    question: "“附录D Admin API”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、配置快照、请求轨迹、端点清单、请求响应样例、错误矩阵、自动化脚本、审计日志和配置回退、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kong网关", "Kong 2.0.5", "附录D Admin API", "Admin API"],
  },
  {
    id: "kga-official-final-review-q1",
    chapter: "kga-official-final-review",
    level: 1,
    question: "为什么“全书总复习”必须覆盖20个目录节点？",
    answer:
      "这些节点共同组成“把16章4附录重组为请求代理、插件扩展、部署运维和云原生应用四条可验证主线”的请求、配置、运行与证据链；漏项会使280节点覆盖表、综合拓扑、容量和故障实验、配置与消息对账、恢复回退及独立交接无法独立复现。",
    tags: ["Kong网关", "Kong 2.0.5", "全书总复习", "代理主线"],
  },
  {
    id: "kga-official-final-review-q2",
    chapter: "kga-official-final-review",
    level: 1,
    question: "“全书总复习”的最小不变量是什么？",
    answer:
      "从客户端到Route、Service、Upstream、Target再到插件、日志、集群和应用平台的全链路可预测、故障可恢复；需要版本、配置、请求轨迹、指标、故障与业务对账共同证明。",
    tags: ["Kong网关", "Kong 2.0.5", "全书总复习", "插件主线"],
  },
  {
    id: "kga-official-final-review-q3",
    chapter: "kga-official-final-review",
    level: 2,
    question: "怎样为“全书总复习”构造单变量反例？",
    answer:
      "固定Kong 2.0.5、请求集合、Route、Service和上游，只改变一个匹配条件、插件、Target权重、失败节点或数据库状态，再比较决策轨迹与最终业务结果。",
    tags: ["Kong网关", "Kong 2.0.5", "全书总复习", "运维主线"],
  },
  {
    id: "kga-official-final-review-q4",
    chapter: "kga-official-final-review",
    level: 2,
    question: "“全书总复习”为什么必须固定Kong 2.0.5？",
    answer:
      "原书与作者源码以Kong 2.0.5为行为基线；后来的路由、插件、部署、数据库与云原生接口只能作为差异材料，不能替代“把16章4附录重组为请求代理、插件扩展、部署运维和云原生应用四条可验证主线”的正式分母。",
    tags: ["Kong网关", "Kong 2.0.5", "全书总复习", "应用主线"],
  },
  {
    id: "kga-official-final-review-q5",
    chapter: "kga-official-final-review",
    level: 3,
    question: "如何验证“全书总复习”的性能与可用性结论？",
    answer:
      "固定请求分布、连接、插件链、上游与可靠语义，重复测吞吐、P50/P95/P99、错误率、worker、数据库和上游分布，并独立对账。",
    tags: ["Kong网关", "Kong 2.0.5", "全书总复习", "独立交接"],
  },
  {
    id: "kga-official-final-review-q6",
    chapter: "kga-official-final-review",
    level: 3,
    question: "“全书总复习”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、配置快照、请求轨迹、280节点覆盖表、综合拓扑、容量和故障实验、配置与消息对账、恢复回退及独立交接、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kong网关", "Kong 2.0.5", "全书总复习", "代理主线"],
  },
];
