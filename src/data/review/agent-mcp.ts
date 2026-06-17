/** 复习题库 · MCP 模型上下文协议（agent-mcp）。《AI 智能体应用开发》第 10 章原创。 */

import type { ReviewQuestion } from "./types";

export const agentMcpQuestions: ReviewQuestion[] = [
  // —— Level 1 · 基础概念（认记）——
  {
    id: "agent-mcp-1",
    chapter: "agent-mcp",
    level: 1,
    question: "MCP 的全称是什么？是谁开放的？一句话说它解决什么。",
    answer:
      "MCP = Model Context Protocol（模型上下文协议），是 Anthropic 开放的一套客户端—服务器协议（底层基于 JSON-RPC）。它统一了「AI 应用 ↔ 外部工具 / 数据源」的接法，相当于「AI 接工具」的通用标准插头。",
    tags: ["MCP", "基础"],
  },
  {
    id: "agent-mcp-2",
    chapter: "agent-mcp",
    level: 1,
    question: "MCP 架构里的 Host 是什么？",
    answer:
      "Host（宿主）是你实际安装、使用的那个 AI 应用本身，比如 Claude 桌面端或某个 IDE。它是 MCP Client 的容器——client 都内嵌在 Host 里，Host 自己不直接连工具。",
    tags: ["Host", "架构", "基础"],
  },
  {
    id: "agent-mcp-3",
    chapter: "agent-mcp",
    level: 1,
    question: "MCP Client 和 MCP Server 各是什么？两者的对应关系如何？",
    answer:
      "MCP Client 是内嵌在 Host 里的连接器，MCP Server 是在外部把某个工具 / 数据源能力按标准暴露出来的程序。对应关系是「一个 client 连一个 server」；Host 想用几样能力就内嵌几个 client。",
    tags: ["Client", "Server", "架构", "基础"],
  },
  {
    id: "agent-mcp-4",
    chapter: "agent-mcp",
    level: 1,
    question: "一个 MCP Server 能向应用暴露哪三类能力？",
    answer:
      "Tools（可被模型调用的动作，如发邮件、改文件）、Resources（可被应用读取的数据 / 上下文，如某文件内容、一张表）、Prompts（预设好的提示模板，供用户直接挑用）。",
    tags: ["三类能力", "Tools-Resources-Prompts", "基础"],
  },
  {
    id: "agent-mcp-5",
    chapter: "agent-mcp",
    level: 1,
    question: "什么是「M×N 集成难题」？",
    answer:
      "指 N 个 AI 应用要各自接入 M 个外部工具时，若没有统一标准，每一对「应用 × 工具」都得单写一遍对接胶水，总量是 N×M，且谁也复用不了谁。",
    tags: ["M×N 问题", "基础"],
  },
  {
    id: "agent-mcp-6",
    chapter: "agent-mcp",
    level: 1,
    question: "MCP 是某一家（如 Anthropic / Claude）专用的私有接口吗？",
    answer:
      "不是。MCP 是开放协议，任何应用方、任何工具方、任何模型方都能实现它，就像 USB-C 不归某一家独占。它是公共标准，不是只能连某一家的东西。",
    tags: ["开放协议", "基础"],
  },

  // —— Level 2 · 理解（为什么 / 区分）——
  {
    id: "agent-mcp-7",
    chapter: "agent-mcp",
    level: 2,
    question: "为什么说 MCP 把工具集成从 N×M 降成了 M+N？",
    answer:
      "没有标准时，每一对「应用 × 工具」都要单写一遍对接，是乘法（N×M）。有了 MCP 后，每个应用只写一个 client、每个工具只写一个 server，大家通过同一套标准互通、互相复用，于是总量变成「N 个 client + M 个 server」即 N+M（M+N）——从乘法降成加法。",
    tags: ["M×N 问题", "价值", "理解"],
  },
  {
    id: "agent-mcp-8",
    chapter: "agent-mcp",
    level: 2,
    question:
      "MCP 和 function calling 是替代关系还是分层关系？各自负责什么？",
    answer:
      "是分层关系，不是替代。function calling 是模型侧「怎么挑工具、怎么发起调用」的底层机制；MCP 是上层「工具怎么被标准化接进来」的协议。一句话：MCP 负责「接工具」，function calling 负责「调工具」，两者叠在一起用。",
    tags: ["与 function calling 的关系", "分层", "理解"],
  },
  {
    id: "agent-mcp-9",
    chapter: "agent-mcp",
    level: 2,
    question:
      "接了 MCP 之后，模型最终是靠什么机制真正调用那个 tool 的？",
    answer:
      "仍然是 function calling。MCP Server 暴露的 tool 定义被注入模型上下文后，模型还是像第 8 章那样靠 description 挑一个、发起调用。MCP 只是把工具标准化地发现 / 转发 / 回传，模型调工具的底层机制没变。",
    tags: ["function calling", "底层机制", "理解"],
  },
  {
    id: "agent-mcp-10",
    chapter: "agent-mcp",
    level: 2,
    question:
      "用 USB-C 的类比解释一下 MCP 解决的问题，以及「即插即用」体现在哪。",
    answer:
      "以前每个设备一种插头，换设备就得换线，乱成一团；USB-C 定了一个标准口，一根线通用。MCP 就是「AI 接工具」的 USB-C：定一套标准，任何 AI 应用都能用同一种方式接任何按标准做的工具。「即插即用」体现在——写一次 server，任何实现了 MCP 的应用都能直接连上来用，不用为每个应用再单独焊一遍线。",
    tags: ["类比", "即插即用", "理解"],
  },
  {
    id: "agent-mcp-11",
    chapter: "agent-mcp",
    level: 2,
    question:
      "为什么说「写一次 MCP Server，任何 MCP 应用都能用」？这背后靠的是什么？",
    answer:
      "靠的是「连法是标准的」。server 按 MCP 标准暴露能力，client 按 MCP 标准来连，于是同一个 server 不挑客户端——Claude 桌面端能连、别的 IDE 也能连。标准统一了接口，复用才成为可能，这正是 M+N 里「可复用」的根。",
    tags: ["复用", "标准", "理解"],
  },
  {
    id: "agent-mcp-12",
    chapter: "agent-mcp",
    level: 2,
    question:
      "Tools、Resources、Prompts 三类能力分别由谁主导使用？",
    answer:
      "Tools 由模型主导——模型决定什么时候调哪个动作；Resources 由应用主导——应用按需把数据读进上下文给模型当资料；Prompts 由用户主导——用户挑一个现成的提示模板来用。三者主导方不同，分工清晰。",
    tags: ["三类能力", "分工", "理解"],
  },
  {
    id: "agent-mcp-13",
    chapter: "agent-mcp",
    level: 2,
    question: "Host 想新接入一样外部能力，按 MCP 该怎么做？要改 Host 核心吗？",
    answer:
      "不用改 Host 核心。只要为这样新能力多挂一对 client–server：外部有（或新写）一个对应的 MCP Server，Host 内再内嵌一个 MCP Client 连上去即可。因为接法是标准的，加能力就是「多插一根标准线」。",
    tags: ["架构", "扩展", "理解"],
  },

  // —— Level 3 · 应用（计算 / 场景判断）——
  {
    id: "agent-mcp-14",
    chapter: "agent-mcp",
    level: 3,
    question:
      "（计算题）5 个 AI 应用要各自接入 4 个外部工具。没有标准时要写多少套对接？改用 MCP 后要写多少个组件？",
    answer:
      "没有标准：5 × 4 = 20 套对接（每一对都单写一遍，N×M）。改用 MCP：5 个 client + 4 个 server = 9 个组件（M+N）。从 20 降到 9，省了一多半，且组件之间可复用。",
    tags: ["M×N 问题", "计算", "应用"],
  },
  {
    id: "agent-mcp-15",
    chapter: "agent-mcp",
    level: 3,
    question:
      "（计算题）10 个应用、8 个工具，分别算出无标准（N×M）和有 MCP（M+N）要写多少，并说差距随规模怎么变。",
    answer:
      "无标准：10 × 8 = 80 套；有 MCP：10 + 8 = 18 个组件。差距是 80 比 18。规模越大差距越悬殊——乘法随两边规模成倍涨，加法只是线性涨，所以应用和工具越多，标准协议省得越狠。",
    tags: ["M×N 问题", "计算", "规模", "应用"],
  },
  {
    id: "agent-mcp-16",
    chapter: "agent-mcp",
    level: 3,
    question:
      "公司有个「员工信息查询」服务，想让 Claude 桌面端、客服后台、IDE 插件三个 AI 应用都用上。按 MCP 怎么接最省事？",
    answer:
      "把「员工信息查询」服务包成一个 MCP Server 写一次，按标准声明它的 tool（如 get_employee_profile）。三个 AI 应用各作为 Host、各内嵌一个 MCP Client 连上这个 server 即可——3 个 client + 1 个 server = 4 个组件，一次开发、三处复用，而不是各写一遍（3×1）。",
    tags: ["架构", "复用", "应用"],
  },
  {
    id: "agent-mcp-17",
    chapter: "agent-mcp",
    level: 3,
    question:
      "你想让 agent 能「读取某个项目目录下的文件内容」当参考资料（不是去执行动作）。这该用 MCP Server 的哪一类能力？为什么？",
    answer:
      "用 Resources。因为「读取文件内容当参考资料」是把数据 / 上下文读进来给模型当资料，不是让模型动手执行一个动作（那才是 Tools）。Resources 正是「可被应用读取的数据 / 上下文」这一类。",
    tags: ["三类能力", "选型", "应用"],
  },
  {
    id: "agent-mcp-18",
    chapter: "agent-mcp",
    level: 3,
    question:
      "团队接了一堆 MCP 工具后，agent 还是经常挑错工具、传错参数。问题最可能出在哪？怎么治？",
    answer:
      "问题多半不在 MCP，而在工具本身的设计。MCP 只解决「怎么把工具标准化接进来」，不管接进来的 tool 好不好用。该回到第 9 章五个维度去治：把每个 tool 的命名、description、粒度、错误信息、返回值做好（description 写清用途和参数格式、职责单一、返回结构化精简、失败给可恢复错误）。",
    tags: ["工具设计", "排错", "应用"],
  },
  {
    id: "agent-mcp-19",
    chapter: "agent-mcp",
    level: 3,
    question:
      "一次 MCP 工具调用大致分哪几步？哪一步本质上还是 function calling？",
    answer:
      "大致四步：① client 向 server 发现它暴露了哪些 tool（带 schema）；② 这些 tool 注入模型上下文，模型挑一个；③ client 把调用按 MCP 协议转发给 server 执行；④ server 把结果按标准回给 client、再喂回模型。其中第 ② 步「模型靠 description 挑一个并发起调用」本质上还是 function calling，其余三步是 MCP 在做标准化的发现 / 转发 / 回传。",
    tags: ["调用流程", "function calling", "应用"],
  },

  // —— Level 4 · 综合（辨析 / 设计）——
  {
    id: "agent-mcp-20",
    chapter: "agent-mcp",
    level: 4,
    question:
      "有人说「学会了 MCP，function calling 就过时了，可以不用学」。结合分层关系反驳他。",
    answer:
      "不对。MCP 和 function calling 不是同一层、更不是替代关系。function calling 是模型侧「怎么挑工具、怎么发起调用」的底层机制；MCP 是上层「工具怎么被标准化接进来」的协议。MCP Server 暴露的 tool，最终还是经 function calling 被模型调用——拿掉 function calling，模型根本无从发起调用。二者是叠用的：MCP 接工具、function calling 调工具，缺一不可。",
    tags: ["与 function calling 的关系", "辨析", "综合"],
  },
  {
    id: "agent-mcp-21",
    chapter: "agent-mcp",
    level: 4,
    question:
      "「MCP 是 Anthropic 的东西，所以只能给 Claude 用，对别的模型 / 应用没意义」——这句话错在哪？",
    answer:
      "错在把「开放协议」误当成「私有接口」。MCP 虽由 Anthropic 提出并开放，但它是公共标准：任何应用方都能做成 MCP Host、任何工具方都能包成 MCP Server、任何模型方都能实现它，就像 USB-C 不归某一家独占。正因为开放，它才能真正解决 M×N 问题——如果只有一家能用，就谈不上「人人复用同一套 server」了。",
    tags: ["开放协议", "辨析", "综合"],
  },
  {
    id: "agent-mcp-22",
    chapter: "agent-mcp",
    level: 4,
    question:
      "请把第 8、9、10 三章串起来：模型选工具、设计好工具、用 MCP 接工具，三者各在哪一层、怎么配合？",
    answer:
      "三层各司其职、自下而上配合：第 8 章 function calling 是「模型侧机制」——模型靠 description 从工具菜单里挑一个、发起调用；第 9 章工具设计是「工具质量」——把每个 tool 的命名 / 描述 / 粒度 / 错误信息 / 返回值做好，模型才挑得准、用得顺；第 10 章 MCP 是「接入标准」——用统一协议把工具即插即用地接进来、可复用（M+N）。配合关系：MCP 负责把（设计良好的）工具标准化地接进来，模型再通过 function calling 去挑去调。接得标准（MCP）、设计得好（第 9 章）、调得准（function calling），一个 agent 才真正会用工具。",
    tags: ["综合串联", "分层", "综合"],
  },
];
