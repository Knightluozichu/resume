import type { ReviewQuestion } from "./types";

export const gep1EngineArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "gep1-engine-architecture-1",
    chapter: "gep1-engine-architecture",
    level: 1,
    question: `引擎四层架构从底到顶分别是什么？`,
    answer: `平台层（OS/硬件差异）→ 核心层（内存/数学/容器/事件）→ 功能层（渲染/物理/动画/音频）→ 游戏层（玩法逻辑/角色控制/关卡规则）。上层依赖下层，绝不反向。`,
    tags: ["四层架构", "分层"],
  },
  {
    id: "gep1-engine-architecture-2",
    chapter: "gep1-engine-architecture",
    level: 2,
    question: `为什么游戏层不能直接调用平台层的窗口 API？`,
    answer: `为了隔离变化。如果游戏层直接调平台 API，换平台时游戏逻辑也要改，失去分层复用意义。平台层把差异封装成统一接口（如 \`IWindow\`），上层只依赖抽象接口，引擎和游戏代码可跨平台编译。分层的本质就是隔离变化——不变的能力沉下层，多变的逻辑放上上层。`,
    tags: ["平台层", "隔离变化"],
  },
  {
    id: "gep1-engine-architecture-3",
    chapter: "gep1-engine-architecture",
    level: 3,
    question: `渲染子系统和物理子系统同属功能层，它们之间应该如何通信？`,
    answer: `同层模块不应直接互相调用（会产生紧耦合）。两条路：① 通过核心层的事件系统——物理在碰撞时发事件，渲染订阅该事件更新视觉效果；② 通过共享数据结构——物理把变换结果写进场景节点，渲染从场景节点读。两条路都是「通过下层或共享数据间接协作」，而非直接依赖。这样物理子系统的修改不会波及渲染子系统。`,
    tags: ["功能层", "解耦", "事件系统"],
  },
  {
    id: "gep1-engine-architecture-4",
    chapter: "gep1-engine-architecture",
    level: 4,
    question: `引擎子系统启动为什么要讲究顺序？请设计一个合理的启动顺序并说明理由。`,
    answer: `顺序：平台层（窗口/文件IO）→ 核心层（内存分配器→数学库→事件系统）→ 功能层（资源管理→渲染→物理）→ 游戏层。理由是「被依赖的先就绪」：内存分配器是最底层依赖，必须最先；事件系统被功能层用来通信，要在功能层之前；资源管理要在渲染之前（渲染初始化可能加载默认材质）；渲染要窗口先创建（需要上下文）。用服务定位器或依赖注入管理这些全局服务的生命周期，而非硬编码单例，便于测试和替换。`,
    tags: ["综合", "启动顺序", "生命周期"],
  },
];
