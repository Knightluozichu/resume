import type { ReviewQuestion } from "./types";

export const ucnOfficialQuestions: ReviewQuestion[] = [
  {
    id: "ucn-official-learning-map-1",
    chapter: "ucn-official-learning-map",
    level: 1,
    question: "《Unity与C++网络游戏开发实战》权威学习地图的核心主张是什么？",
    answer:
      "以2019年机械工业出版社版的4篇21章及后记为唯一正式范围，先完成Unity客户端，再完成C++服务器基础和四类分布式服务。",
    tags: ["《Unity与C++网络游戏开发实战》权威学习地图", "核心机制"],
  },
  {
    id: "ucn-official-learning-map-2",
    chapter: "ucn-official-learning-map",
    level: 2,
    question:
      "《Unity与C++网络游戏开发实战》权威学习地图覆盖哪些公开目录条目？",
    answer:
      "第1章 Unity介绍与相关环境的搭建和调试、第2章 编写Hello World与仿真系统体验、第3章 Unity游戏开发语言、第4章 在Unity中使用图形学知识、第5章 Unity编辑器的使用、第6章 虚拟仿真训练系统的架构和模块、第7章 人物资源编辑与程序开发、第8章 场景资源编辑与程序开发、第9章 资源组件和交互物品开发、第10章 NGUI组件开发和操作交互开发、第11章 C++语言基础、第12章 C++网络编程基础、第13章 多线程和异步套接字、第14章 MySQL数据库的使用、第15章 网络协议Protobuf的使用、第16章 设计架构简单的互动服务器体系、第17章 开发登录服务器LoginServer、第18章 开发网关服务器GateServer、第19章 开发中心服务器CenterServer、第20章 开发战场服务器BattleServer、第21章 一些仿真框架和人工智能的介绍、后记——全书总结与个人发展建议",
    tags: ["《Unity与C++网络游戏开发实战》权威学习地图", "目录覆盖"],
  },
  {
    id: "ucn-official-learning-map-3",
    chapter: "ucn-official-learning-map",
    level: 2,
    question:
      "《Unity与C++网络游戏开发实战》权威学习地图的六阶段证据链是什么？",
    answer:
      "锁定版本与ISBN → 映射4篇21章及后记 → 完成Unity基础 → 完成Unity仿真实战 → 完成C++网络基础 → 贯通四类服务器并签发",
    tags: ["《Unity与C++网络游戏开发实战》权威学习地图", "机制链"],
  },
  {
    id: "ucn-official-learning-map-4",
    chapter: "ucn-official-learning-map",
    level: 3,
    question:
      "《Unity与C++网络游戏开发实战》权威学习地图应主动注入哪两类失败？",
    answer:
      "沿用旧十主题，把epoll、实时同步和房间匹配误当作原书十章，丢失原书Unity基础、仿真实战与四类服务器。；只列21个章名却不记录公开分节，页面表面齐全但大量原书核心主题仍不可追踪。",
    tags: ["《Unity与C++网络游戏开发实战》权威学习地图", "故障注入"],
  },
  {
    id: "ucn-official-learning-map-5",
    chapter: "ucn-official-learning-map",
    level: 3,
    question:
      "《Unity与C++网络游戏开发实战》权威学习地图签发时保持什么不变量？",
    answer:
      "21个正式章节与后记各有独立页面；公开分节全部可追踪；教学展开不冒充原书目录；双端实验有可重放证据。",
    tags: ["《Unity与C++网络游戏开发实战》权威学习地图", "工程验收"],
  },
  {
    id: "ucn-official-learning-map-6",
    chapter: "ucn-official-learning-map",
    level: 3,
    question: "《Unity与C++网络游戏开发实战》权威学习地图怎样完成可复现实验？",
    answer:
      "建立21章追踪表，把每个公开分节映射到页面、互动实验、题库和不变量。先预测旧十页遗漏的四篇内容，再逐项核对。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["《Unity与C++网络游戏开发实战》权威学习地图", "可复现实验"],
  },
  {
    id: "ucn-01-unity-environment-1",
    chapter: "ucn-01-unity-environment",
    level: 1,
    question: "第1章 Unity介绍与相关环境的搭建和调试的核心主张是什么？",
    answer:
      "把引擎、编辑器、目标平台、授权和在线服务拆成可独立复现的环境基线，避免把安装成功误判为工程可交付。",
    tags: ["第1章 Unity介绍与相关环境的搭建和调试", "核心机制"],
  },
  {
    id: "ucn-01-unity-environment-2",
    chapter: "ucn-01-unity-environment",
    level: 2,
    question: "第1章 Unity介绍与相关环境的搭建和调试覆盖哪些公开目录条目？",
    answer:
      "1.1 Unity引擎介绍、1.1.1 Unity3D引擎部分、1.1.2 Unity3D编辑器部分、1.2 Unity引擎发展、1.3 Unity引擎应用场景和使用范围介绍、1.4 Unity软件安装、1.5 Unity Windows环境的安装和搭建、1.6 Unity Android环境的安装和搭建、1.7 Unity授权、1.8 Unity服务",
    tags: ["第1章 Unity介绍与相关环境的搭建和调试", "目录覆盖"],
  },
  {
    id: "ucn-01-unity-environment-3",
    chapter: "ucn-01-unity-environment",
    level: 2,
    question: "第1章 Unity介绍与相关环境的搭建和调试的六阶段证据链是什么？",
    answer:
      "识别引擎与编辑器 → 锁定版本和模块 → 搭建Windows环境 → 搭建Android工具链 → 核对授权与服务 → 双平台构建签发",
    tags: ["第1章 Unity介绍与相关环境的搭建和调试", "机制链"],
  },
  {
    id: "ucn-01-unity-environment-4",
    chapter: "ucn-01-unity-environment",
    level: 3,
    question: "第1章 Unity介绍与相关环境的搭建和调试应主动注入哪两类失败？",
    answer:
      "只记录Unity大版本，不记录补丁版、渲染管线与Android SDK，另一台机器无法复现构建。；编辑器能播放场景就宣布环境完成，却从未在Windows与Android目标上各做一次空工程构建。",
    tags: ["第1章 Unity介绍与相关环境的搭建和调试", "故障注入"],
  },
  {
    id: "ucn-01-unity-environment-5",
    chapter: "ucn-01-unity-environment",
    level: 3,
    question: "第1章 Unity介绍与相关环境的搭建和调试签发时保持什么不变量？",
    answer:
      "同一版本清单在干净机器上可恢复；Windows与Android构建产物来源可追踪；授权变化不改变项目数据。",
    tags: ["第1章 Unity介绍与相关环境的搭建和调试", "工程验收"],
  },
  {
    id: "ucn-01-unity-environment-6",
    chapter: "ucn-01-unity-environment",
    level: 3,
    question: "第1章 Unity介绍与相关环境的搭建和调试怎样完成可复现实验？",
    answer:
      "在两台干净机器按同一版本清单安装，先预测最先分歧的是编辑器模块还是Android工具链，再比较工程摘要、构建日志和产物哈希。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["第1章 Unity介绍与相关环境的搭建和调试", "可复现实验"],
  },
  {
    id: "ucn-02-hello-simulation-1",
    chapter: "ucn-02-hello-simulation",
    level: 1,
    question: "第2章 编写Hello World与仿真系统体验的核心主张是什么？",
    answer:
      "用最小脚本和一次完整训练任务建立编辑、编译、运行、控制与任务完成的闭环，而不是停留在控制台输出。",
    tags: ["第2章 编写Hello World与仿真系统体验", "核心机制"],
  },
  {
    id: "ucn-02-hello-simulation-2",
    chapter: "ucn-02-hello-simulation",
    level: 2,
    question: "第2章 编写Hello World与仿真系统体验覆盖哪些公开目录条目？",
    answer:
      "2.1 创建第一个空的工程、2.2 创建第一个脚本程序、2.3 编写第一个Hello Word程序、2.4 编译输出第一个程序、2.5 运行Hello World、2.6 打开仿真程序Demo、2.7 这是一个很好玩的仿真系统、2.8 进入训练场准备体验训练操作、2.9 控制人物行走、2.10 开动第一辆汽车、2.11 完成第一个仿真任务、2.12 本章小结与分析",
    tags: ["第2章 编写Hello World与仿真系统体验", "目录覆盖"],
  },
  {
    id: "ucn-02-hello-simulation-3",
    chapter: "ucn-02-hello-simulation",
    level: 2,
    question: "第2章 编写Hello World与仿真系统体验的六阶段证据链是什么？",
    answer:
      "创建空工程 → 挂载首个脚本 → 编译并读取日志 → 进入训练场 → 切换人物与车辆 → 完成任务并回放",
    tags: ["第2章 编写Hello World与仿真系统体验", "机制链"],
  },
  {
    id: "ucn-02-hello-simulation-4",
    chapter: "ucn-02-hello-simulation",
    level: 3,
    question: "第2章 编写Hello World与仿真系统体验应主动注入哪两类失败？",
    answer:
      "脚本文件名与类名不一致导致组件无法挂载，却因为旧日志仍在而误以为新脚本已经运行。；任务完成只看UI提示，不保存触发顺序；人物或车辆绕过前置步骤也能直接到达终点。",
    tags: ["第2章 编写Hello World与仿真系统体验", "故障注入"],
  },
  {
    id: "ucn-02-hello-simulation-5",
    chapter: "ucn-02-hello-simulation",
    level: 3,
    question: "第2章 编写Hello World与仿真系统体验签发时保持什么不变量？",
    answer:
      "脚本实例只绑定一次；输入映射明确；任务状态只按合法前置条件单调推进；回放能重现完成顺序。",
    tags: ["第2章 编写Hello World与仿真系统体验", "工程验收"],
  },
  {
    id: "ucn-02-hello-simulation-6",
    chapter: "ucn-02-hello-simulation",
    level: 3,
    question: "第2章 编写Hello World与仿真系统体验怎样完成可复现实验？",
    answer:
      "从空工程开始记录每次编译、脚本生命周期回调和任务状态。先预测跳过车辆步骤会在哪个门被拒绝，再执行正常、越序和重复触发三组流程。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["第2章 编写Hello World与仿真系统体验", "可复现实验"],
  },
  {
    id: "ucn-03-csharp-language-1",
    chapter: "ucn-03-csharp-language",
    level: 1,
    question: "第3章 Unity游戏开发语言的核心主张是什么？",
    answer:
      "把集合、接口、委托、线程、反射、协程、序列化、Native交互和Lua热更新放入同一条运行时边界，明确哪些工作能触碰Unity主线程。",
    tags: ["第3章 Unity游戏开发语言", "核心机制"],
  },
  {
    id: "ucn-03-csharp-language-2",
    chapter: "ucn-03-csharp-language",
    level: 2,
    question: "第3章 Unity游戏开发语言覆盖哪些公开目录条目？",
    answer:
      "3.1 C#语言介绍、3.2 C#常用数据结构介绍、3.2.1 ArrayList链表结构、3.2.2 泛型List、3.2.3 Stack栈、3.2.4 队列Queue、3.2.5 字典Dictionary、3.3 C#的接口与继承、3.3.1 实现继承和接口继承、3.3.2 多重继承、3.3.3 结构的继承、3.4 C#的委托、3.5 C#多线程使用介绍、3.6 C#的反射机制、3.7 Unity中使用泛型、3.8 Unity中使用协程、3.9 Unity的序列化和网络协议库介绍、3.10 Unity中使用CLR进行Native交互、3.11 Unity中使用热更新语言Lua、3.12 本章小结与分析",
    tags: ["第3章 Unity游戏开发语言", "目录覆盖"],
  },
  {
    id: "ucn-03-csharp-language-3",
    chapter: "ucn-03-csharp-language",
    level: 2,
    question: "第3章 Unity游戏开发语言的六阶段证据链是什么？",
    answer:
      "选择类型与集合 → 用接口隔离能力 → 用委托传递事件 → 区分线程与协程 → 穿越序列化和Native边界 → 热更新回归签发",
    tags: ["第3章 Unity游戏开发语言", "机制链"],
  },
  {
    id: "ucn-03-csharp-language-4",
    chapter: "ucn-03-csharp-language",
    level: 3,
    question: "第3章 Unity游戏开发语言应主动注入哪两类失败？",
    answer:
      "网络线程通过委托直接修改Transform，轻载时偶尔成功，压力下产生不可重现的崩溃。；用反射或Lua绕过编译期契约，却没有协议版本和回退路径，热更新后旧存档无法反序列化。",
    tags: ["第3章 Unity游戏开发语言", "故障注入"],
  },
  {
    id: "ucn-03-csharp-language-5",
    chapter: "ucn-03-csharp-language",
    level: 3,
    question: "第3章 Unity游戏开发语言签发时保持什么不变量？",
    answer:
      "Unity对象只由主线程修改；集合元素类型确定；跨边界数据可序列化且有版本；热更新失败可回退。",
    tags: ["第3章 Unity游戏开发语言", "工程验收"],
  },
  {
    id: "ucn-03-csharp-language-6",
    chapter: "ucn-03-csharp-language",
    level: 3,
    question: "第3章 Unity游戏开发语言怎样完成可复现实验？",
    answer:
      "让后台线程产生一万条位置事件，先预测直接回调与主线程队列哪一种先失效，再记录异常、帧耗时、队列水位和事件顺序。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["第3章 Unity游戏开发语言", "可复现实验"],
  },
  {
    id: "ucn-04-graphics-in-unity-1",
    chapter: "ucn-04-graphics-in-unity",
    level: 1,
    question: "第4章 在Unity中使用图形学知识的核心主张是什么？",
    answer:
      "从坐标、向量和矩阵推到光照、材质、渲染管线、变换、射线与特效，用可计算量解释画面，而不是靠反复拖参数。",
    tags: ["第4章 在Unity中使用图形学知识", "核心机制"],
  },
  {
    id: "ucn-04-graphics-in-unity-2",
    chapter: "ucn-04-graphics-in-unity",
    level: 2,
    question: "第4章 在Unity中使用图形学知识覆盖哪些公开目录条目？",
    answer:
      "4.1 3D数学基本知识在游戏中的应用、4.2 三维坐标系、4.3 顶点坐标变换、4.3.1 向量是什么、4.3.2 矩阵是什么、4.3.3 如何操作向量、4.3.4 如何处理点或者向量与矩阵的乘法、4.3.5 点和向量通过矩阵的变换、4.4 光照与材质、4.4.1 什么是Shader的基本光照模型、4.4.2 什么是光照模型、4.4.3 什么是材质、4.5 Unity引擎中的渲染管线流程、4.6 Unity中实现模型的缩放和旋转等程序处理、4.7 Unity中计算射线相关的程序处理、4.8 Unity中制作一个简单的渲染特效、4.9 本章小结与分析",
    tags: ["第4章 在Unity中使用图形学知识", "目录覆盖"],
  },
  {
    id: "ucn-04-graphics-in-unity-3",
    chapter: "ucn-04-graphics-in-unity",
    level: 2,
    question: "第4章 在Unity中使用图形学知识的六阶段证据链是什么？",
    answer:
      "声明坐标空间 → 构造向量与矩阵 → 完成顶点变换 → 计算材质光照 → 沿管线定位结果 → 射线与特效复测",
    tags: ["第4章 在Unity中使用图形学知识", "机制链"],
  },
  {
    id: "ucn-04-graphics-in-unity-4",
    chapter: "ucn-04-graphics-in-unity",
    level: 3,
    question: "第4章 在Unity中使用图形学知识应主动注入哪两类失败？",
    answer:
      "把世界坐标方向直接当局部坐标使用，角色旋转后射线和移动方向同时偏离。；非等比缩放后仍用模型矩阵直接变换法线，导致光照强度与视角出现系统性错误。",
    tags: ["第4章 在Unity中使用图形学知识", "故障注入"],
  },
  {
    id: "ucn-04-graphics-in-unity-5",
    chapter: "ucn-04-graphics-in-unity",
    level: 3,
    question: "第4章 在Unity中使用图形学知识签发时保持什么不变量？",
    answer:
      "每个向量标明所属空间；点与方向采用正确齐次分量；法线变换保持正交；射线命中层和距离受预算约束。",
    tags: ["第4章 在Unity中使用图形学知识", "工程验收"],
  },
  {
    id: "ucn-04-graphics-in-unity-6",
    chapter: "ucn-04-graphics-in-unity",
    level: 3,
    question: "第4章 在Unity中使用图形学知识怎样完成可复现实验？",
    answer:
      "固定一个非等比缩放模型和斜向光源，先预测错误法线矩阵会在何处最明显，再对比顶点、世界法线、N点L和射线命中记录。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["第4章 在Unity中使用图形学知识", "可复现实验"],
  },
  {
    id: "ucn-05-unity-editor-1",
    chapter: "ucn-05-unity-editor",
    level: 1,
    question: "第5章 Unity编辑器的使用的核心主张是什么？",
    answer:
      "把模型、骨骼、相机、光照、粒子、地形、烘焙、遮挡、资源、调试、插件、材质和物理组织成可审计的场景生产流水线。",
    tags: ["第5章 Unity编辑器的使用", "核心机制"],
  },
  {
    id: "ucn-05-unity-editor-2",
    chapter: "ucn-05-unity-editor",
    level: 2,
    question: "第5章 Unity编辑器的使用覆盖哪些公开目录条目？",
    answer:
      "5.1 创建一个空的工程、5.2 编辑器界面布局介绍、5.3 编辑器的常用功能介绍、5.4 编辑器模型编辑——旋转控制第一个模型、5.5 编辑器动作骨骼编辑——让人物动起来、5.6 编辑器光照和相机的编辑——让人物更真实、5.7 编辑器粒子特效编辑——让环境更绚丽、5.8 编辑器场景编辑——创建简单的战场、5.9 编辑器地形和光照贴图烘焙——让战场真实起来、5.10 编辑器遮挡剔除——提高战场的运行效率、5.11 编辑器资源管理——让工程更容易管理、5.12 编辑器控制台和调试——输出调试信息、5.13 编辑器资源商店和常用插件、5.14 编辑器材质编辑——让车辆变化一下样式、5.15 编辑器物理系统介绍——让人和车辆发生碰撞、5.16 本章小结与分析",
    tags: ["第5章 Unity编辑器的使用", "目录覆盖"],
  },
  {
    id: "ucn-05-unity-editor-3",
    chapter: "ucn-05-unity-editor",
    level: 2,
    question: "第5章 Unity编辑器的使用的六阶段证据链是什么？",
    answer:
      "建立资源命名 → 导入模型骨骼 → 配置光照相机 → 搭建场景与地形 → 烘焙并剔除 → 物理与依赖签发",
    tags: ["第5章 Unity编辑器的使用", "机制链"],
  },
  {
    id: "ucn-05-unity-editor-4",
    chapter: "ucn-05-unity-editor",
    level: 3,
    question: "第5章 Unity编辑器的使用应主动注入哪两类失败？",
    answer:
      "直接修改场景中的Prefab实例却不回写或保留覆盖说明，下一次重新导入后调整静默丢失。；只比较平均帧率就开启遮挡剔除，没有验证动态物体、相机高速移动和错误烘焙数据造成的消失。",
    tags: ["第5章 Unity编辑器的使用", "故障注入"],
  },
  {
    id: "ucn-05-unity-editor-5",
    chapter: "ucn-05-unity-editor",
    level: 3,
    question: "第5章 Unity编辑器的使用签发时保持什么不变量？",
    answer:
      "资源有唯一来源和命名；Prefab覆盖可解释；烘焙输入可重建；碰撞层矩阵与性能预算一起验收。",
    tags: ["第5章 Unity编辑器的使用", "工程验收"],
  },
  {
    id: "ucn-05-unity-editor-6",
    chapter: "ucn-05-unity-editor",
    level: 3,
    question: "第5章 Unity编辑器的使用怎样完成可复现实验？",
    answer:
      "复制一份战场场景，先预测DrawCall、可见对象数和物理接触数的主要成本，再分别启用烘焙、遮挡剔除和碰撞层裁剪并保存Profiler证据。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["第5章 Unity编辑器的使用", "可复现实验"],
  },
  {
    id: "ucn-06-simulation-architecture-1",
    chapter: "ucn-06-simulation-architecture",
    level: 1,
    question: "第6章 虚拟仿真训练系统的架构和模块的核心主张是什么？",
    answer:
      "以任务授权为主线连接态势端、分队长、学员端和仿真任务，区分物理部署、业务角色、任务配置与运行状态。",
    tags: ["第6章 虚拟仿真训练系统的架构和模块", "核心机制"],
  },
  {
    id: "ucn-06-simulation-architecture-2",
    chapter: "ucn-06-simulation-architecture",
    level: 2,
    question: "第6章 虚拟仿真训练系统的架构和模块覆盖哪些公开目录条目？",
    answer:
      "6.1 什么是虚拟仿真训练、6.1.1 战斗模拟仿真训练、6.1.2 车辆仿真和工业操作、6.2 物理架构介绍——虚拟仿真训练系统、6.3 使用态势端发布授权任务、6.4 将分队长学员配置加入授权任务、6.5 启动仿真任务——完成一次美妙的任务体验、6.6 本章小结与分析",
    tags: ["第6章 虚拟仿真训练系统的架构和模块", "目录覆盖"],
  },
  {
    id: "ucn-06-simulation-architecture-3",
    chapter: "ucn-06-simulation-architecture",
    level: 2,
    question: "第6章 虚拟仿真训练系统的架构和模块的六阶段证据链是什么？",
    answer:
      "定义训练目标 → 绘制物理部署 → 创建授权任务 → 绑定分队与学员 → 启动仿真实例 → 收集结果并签发",
    tags: ["第6章 虚拟仿真训练系统的架构和模块", "机制链"],
  },
  {
    id: "ucn-06-simulation-architecture-4",
    chapter: "ucn-06-simulation-architecture",
    level: 3,
    question: "第6章 虚拟仿真训练系统的架构和模块应主动注入哪两类失败？",
    answer:
      "任务配置只用可变名称关联学员，重命名或重复名称后把授权发给错误实体。；旧任务的迟到消息没有任务代际，重启训练后继续修改新任务状态。",
    tags: ["第6章 虚拟仿真训练系统的架构和模块", "故障注入"],
  },
  {
    id: "ucn-06-simulation-architecture-5",
    chapter: "ucn-06-simulation-architecture",
    level: 3,
    question: "第6章 虚拟仿真训练系统的架构和模块签发时保持什么不变量？",
    answer:
      "任务、角色和终端身份唯一；授权先于启动；消息携带任务代际；结束后输入被拒绝且结果可追溯。",
    tags: ["第6章 虚拟仿真训练系统的架构和模块", "工程验收"],
  },
  {
    id: "ucn-06-simulation-architecture-6",
    chapter: "ucn-06-simulation-architecture",
    level: 3,
    question: "第6章 虚拟仿真训练系统的架构和模块怎样完成可复现实验？",
    answer:
      "以同一批学员连续启动两代任务，先预测旧代迟到状态会污染哪个模块，再注入断线、重复授权和越序启动并核对任务时间线。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["第6章 虚拟仿真训练系统的架构和模块", "可复现实验"],
  },
  {
    id: "ucn-07-character-development-1",
    chapter: "ucn-07-character-development",
    level: 1,
    question: "第7章 人物资源编辑与程序开发的核心主张是什么？",
    answer:
      "让模型、动作、数据、输入、行为状态、特效、物理瞄准和属性接口围绕一个可验证的人物状态机协作。",
    tags: ["第7章 人物资源编辑与程序开发", "核心机制"],
  },
  {
    id: "ucn-07-character-development-2",
    chapter: "ucn-07-character-development",
    level: 2,
    question: "第7章 人物资源编辑与程序开发覆盖哪些公开目录条目？",
    answer:
      "7.1 模型资源的导入和整理编辑、7.2 人物动作资源的编辑和管理、7.3 数据资源的导入和整理、7.4 人物的控制和脚本程序开发、7.5 人物的行为状态机开发、7.6 人物特效的控制和状态交互、7.7 人物的物理状态和碰撞瞄准的程序交互、7.8 人物的属性和程序接口开发、7.9 在场景中运行人物资源和调试程序、7.10 本章小结与分析",
    tags: ["第7章 人物资源编辑与程序开发", "目录覆盖"],
  },
  {
    id: "ucn-07-character-development-3",
    chapter: "ucn-07-character-development",
    level: 2,
    question: "第7章 人物资源编辑与程序开发的六阶段证据链是什么？",
    answer:
      "导入模型和动作 → 建立人物数据 → 映射控制输入 → 驱动行为状态机 → 同步特效物理瞄准 → 场景回归签发",
    tags: ["第7章 人物资源编辑与程序开发", "机制链"],
  },
  {
    id: "ucn-07-character-development-4",
    chapter: "ucn-07-character-development",
    level: 3,
    question: "第7章 人物资源编辑与程序开发应主动注入哪两类失败？",
    answer:
      "动画状态和业务状态各自切换，没有唯一状态所有者，死亡角色仍能被输入驱动并播放移动。；瞄准使用相机射线，开火却使用枪口方向，没有二次遮挡检查，近墙时子弹穿过墙角。",
    tags: ["第7章 人物资源编辑与程序开发", "故障注入"],
  },
  {
    id: "ucn-07-character-development-5",
    chapter: "ucn-07-character-development",
    level: 3,
    question: "第7章 人物资源编辑与程序开发签发时保持什么不变量？",
    answer:
      "业务状态机是唯一事实；动画只表现状态；死亡阻断输入；瞄准点经枪口遮挡复核；属性修改走统一接口。",
    tags: ["第7章 人物资源编辑与程序开发", "工程验收"],
  },
  {
    id: "ucn-07-character-development-6",
    chapter: "ucn-07-character-development",
    level: 3,
    question: "第7章 人物资源编辑与程序开发怎样完成可复现实验？",
    answer:
      "在斜坡、窄门和近墙三种场景重放同一输入，先预测根运动、碰撞或瞄准哪一个先分歧，再对齐状态、动画参数和命中点。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["第7章 人物资源编辑与程序开发", "可复现实验"],
  },
  {
    id: "ucn-08-scene-development-1",
    chapter: "ucn-08-scene-development",
    level: 1,
    question: "第8章 场景资源编辑与程序开发的核心主张是什么？",
    answer:
      "把地形、植被、光影、静动态物体、水、天气、道路、天空雾效、优化和场景切换纳入有依赖顺序的加载与卸载协议。",
    tags: ["第8章 场景资源编辑与程序开发", "核心机制"],
  },
  {
    id: "ucn-08-scene-development-2",
    chapter: "ucn-08-scene-development",
    level: 2,
    question: "第8章 场景资源编辑与程序开发覆盖哪些公开目录条目？",
    answer:
      "8.1 场景资源的导入和整理管理、8.2 场景数据资源的导入和场景程序管理、8.3 地形的编辑和程序相关功能开发、8.4 添加碰撞体树木和非碰撞体植被、8.5 创建光源和阴影渲染、8.6 添加场景静态物体和动态物体、8.7 添加场景水的插件并使用代码集成、8.8 添加天气系统插件并集成代码系统、8.9 添加场景道路插件并制作道路、8.10 添加天空盒和雾态效果、8.11 场景预览和渲染效率优化、8.12 场景系统加载切换和系统程序开发、8.13 本章小结与分析",
    tags: ["第8章 场景资源编辑与程序开发", "目录覆盖"],
  },
  {
    id: "ucn-08-scene-development-3",
    chapter: "ucn-08-scene-development",
    level: 2,
    question: "第8章 场景资源编辑与程序开发的六阶段证据链是什么？",
    answer:
      "建立场景清单 → 编辑地形植被 → 加入光影和物体 → 集成水天气道路 → 预算渲染成本 → 切换卸载后签发",
    tags: ["第8章 场景资源编辑与程序开发", "机制链"],
  },
  {
    id: "ucn-08-scene-development-4",
    chapter: "ucn-08-scene-development",
    level: 3,
    question: "第8章 场景资源编辑与程序开发应主动注入哪两类失败？",
    answer:
      "场景切换只等待SceneManager完成，没有等待依赖资源、天气和道路系统就绪，首帧出现空引用和错误天气。；动态车辆被误标为静态参与烘焙或批处理，运行时移动后阴影、碰撞或渲染数据仍停留在旧位置。",
    tags: ["第8章 场景资源编辑与程序开发", "故障注入"],
  },
  {
    id: "ucn-08-scene-development-5",
    chapter: "ucn-08-scene-development",
    level: 3,
    question: "第8章 场景资源编辑与程序开发签发时保持什么不变量？",
    answer:
      "场景依赖显式；动态对象不进入静态事实；加载完成包含子系统就绪；卸载后没有旧场景回调和资源引用。",
    tags: ["第8章 场景资源编辑与程序开发", "工程验收"],
  },
  {
    id: "ucn-08-scene-development-6",
    chapter: "ucn-08-scene-development",
    level: 3,
    question: "第8章 场景资源编辑与程序开发怎样完成可复现实验？",
    answer:
      "连续往返两个场景五十次，先预测内存、回调订阅或动态资源谁会泄漏，再记录加载阶段、GPU预算、对象数和卸载后引用。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["第8章 场景资源编辑与程序开发", "可复现实验"],
  },
  {
    id: "ucn-09-assets-interactions-1",
    chapter: "ucn-09-assets-interactions",
    level: 1,
    question: "第9章 资源组件和交互物品开发的核心主张是什么？",
    answer:
      "围绕AssetBundle构建、依赖、加载、车辆与飞行器集成、地雷交互和物品管理，建立资源身份与运行时实例的清晰边界。",
    tags: ["第9章 资源组件和交互物品开发", "核心机制"],
  },
  {
    id: "ucn-09-assets-interactions-2",
    chapter: "ucn-09-assets-interactions",
    level: 2,
    question: "第9章 资源组件和交互物品开发覆盖哪些公开目录条目？",
    answer:
      "9.1 资源组件的导入和整理管理、9.2 资源物品的数据导入和整理管理、9.3 AssetBundle的资源组成和功能API、9.4 开发自己的AssetBundle打包工具插件、9.5 加载和管理AssetBundle资源、9.6 车辆动力系统的插件使用和系统集成开发、9.7 关于飞行器直升机的开发和使用、9.8 地雷组件的开发和功能交互、9.9 物品管理器系统开发、9.10 本章小结与分析",
    tags: ["第9章 资源组件和交互物品开发", "目录覆盖"],
  },
  {
    id: "ucn-09-assets-interactions-3",
    chapter: "ucn-09-assets-interactions",
    level: 2,
    question: "第9章 资源组件和交互物品开发的六阶段证据链是什么？",
    answer:
      "规范资源身份 → 构建Bundle清单 → 解析依赖并加载 → 集成车辆飞行器 → 验证地雷和物品交互 → 卸载恢复后签发",
    tags: ["第9章 资源组件和交互物品开发", "机制链"],
  },
  {
    id: "ucn-09-assets-interactions-4",
    chapter: "ucn-09-assets-interactions",
    level: 3,
    question: "第9章 资源组件和交互物品开发应主动注入哪两类失败？",
    answer:
      "按显示名称加载AssetBundle资产，没有稳定ID和清单版本，同名资源在不同包中返回错误对象。；只卸载Bundle句柄，不跟踪实例和依赖引用计数，重复进出场景后内存持续增长或材质变粉。",
    tags: ["第9章 资源组件和交互物品开发", "故障注入"],
  },
  {
    id: "ucn-09-assets-interactions-5",
    chapter: "ucn-09-assets-interactions",
    level: 3,
    question: "第9章 资源组件和交互物品开发签发时保持什么不变量？",
    answer:
      "资源ID稳定；依赖先于主体加载；引用计数不为负；交互由服务器或权威状态确认；卸载后实例不可再访问。",
    tags: ["第9章 资源组件和交互物品开发", "工程验收"],
  },
  {
    id: "ucn-09-assets-interactions-6",
    chapter: "ucn-09-assets-interactions",
    level: 3,
    question: "第9章 资源组件和交互物品开发怎样完成可复现实验？",
    answer:
      "构建两版含共享材质的车辆Bundle，先预测热切换时哪条依赖最易失效，再执行加载、实例化、交互、卸载和回滚并比较清单。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["第9章 资源组件和交互物品开发", "可复现实验"],
  },
  {
    id: "ucn-10-ngui-interaction-1",
    chapter: "ucn-10-ngui-interaction",
    level: 1,
    question: "第10章 NGUI组件开发和操作交互开发的核心主张是什么？",
    answer:
      "从图集与DrawCall原理推进到标签、精灵、面板、滚动、按钮、自适应、动态UI及登录/大厅/战场/VR界面，保持UI状态与业务状态单向同步。",
    tags: ["第10章 NGUI组件开发和操作交互开发", "核心机制"],
  },
  {
    id: "ucn-10-ngui-interaction-2",
    chapter: "ucn-10-ngui-interaction",
    level: 2,
    question: "第10章 NGUI组件开发和操作交互开发覆盖哪些公开目录条目？",
    answer:
      "10.1 NGUI插件介绍和导入工程、10.2 NGUI图集的使用和制作、10.3 NGUI图集的优化和DrawCall的优化策略、10.4 NGUI的底层实现原理和分析、10.5 UILable的使用、10.6 UISprite的使用、10.7 UIPanel的使用、10.8 UIScrollView的使用、10.9 UIButton的使用、10.10 UIRoot和UICamera的自适应、10.11 打造UI面向对象的动态加载和管理、10.12 登录UI功能开发、10.13 大厅任务信息系统UI功能开发、10.14 战场场景中主视角UI系统功能开发、10.15 VR开发——VR可以使用的VRGUI、10.16 本章小结与分析",
    tags: ["第10章 NGUI组件开发和操作交互开发", "目录覆盖"],
  },
  {
    id: "ucn-10-ngui-interaction-3",
    chapter: "ucn-10-ngui-interaction",
    level: 2,
    question: "第10章 NGUI组件开发和操作交互开发的六阶段证据链是什么？",
    answer:
      "导入NGUI并建图集 → 解释合批与DrawCall → 组合基础控件 → 完成分辨率自适应 → 绑定登录大厅战场状态 → VR可读性签发",
    tags: ["第10章 NGUI组件开发和操作交互开发", "机制链"],
  },
  {
    id: "ucn-10-ngui-interaction-4",
    chapter: "ucn-10-ngui-interaction",
    level: 3,
    question: "第10章 NGUI组件开发和操作交互开发应主动注入哪两类失败？",
    answer:
      "为了减少图集数量把不同材质和频繁更新元素塞进一个面板，反而造成整批网格反复重建。；按钮回调直接修改玩家业务对象，界面关闭后回调仍保留，重复打开产生多次登录或任务提交。",
    tags: ["第10章 NGUI组件开发和操作交互开发", "故障注入"],
  },
  {
    id: "ucn-10-ngui-interaction-5",
    chapter: "ucn-10-ngui-interaction",
    level: 3,
    question: "第10章 NGUI组件开发和操作交互开发签发时保持什么不变量？",
    answer:
      "UI只提交意图；业务状态是唯一事实；订阅随视图生命周期释放；图集和面板边界由合批证据决定；VR界面满足可读距离。",
    tags: ["第10章 NGUI组件开发和操作交互开发", "工程验收"],
  },
  {
    id: "ucn-10-ngui-interaction-6",
    chapter: "ucn-10-ngui-interaction",
    level: 3,
    question: "第10章 NGUI组件开发和操作交互开发怎样完成可复现实验？",
    answer:
      "构造登录、大厅和战场三层UI，先预测图集切换还是动态文字导致更多DrawCall，再记录面板重建、事件订阅和分辨率变化。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["第10章 NGUI组件开发和操作交互开发", "可复现实验"],
  },
  {
    id: "ucn-11-cpp-language-1",
    chapter: "ucn-11-cpp-language",
    level: 1,
    question: "第11章 C++语言基础的核心主张是什么？",
    answer:
      "从语法、数据、变量、存储与运算推进到函数、数组、指针、引用、类、多态、抽象、文件流和STL，为服务器对象所有权建立明确规则。",
    tags: ["第11章 C++语言基础", "核心机制"],
  },
  {
    id: "ucn-11-cpp-language-2",
    chapter: "ucn-11-cpp-language",
    level: 2,
    question: "第11章 C++语言基础覆盖哪些公开目录条目？",
    answer:
      "11.1 C++简介、11.2 C++基本语法、11.3 C++数据结构、11.4 C++变量类型、11.5 C++修饰符类型、11.6 C++存储类、11.7 C++运算符和运算方式、11.8 C++函数、11.9 C++数组和高级功能、11.10 C++指针和高级功能、11.11 C++引用和常用方式、11.12 C++类和对象、11.13 C++继承和多态、11.14 C++接口和抽象、11.15 C++文件和流的处理、11.16 C++STL库介绍、11.17 本章小结与分析",
    tags: ["第11章 C++语言基础", "目录覆盖"],
  },
  {
    id: "ucn-11-cpp-language-3",
    chapter: "ucn-11-cpp-language",
    level: 2,
    question: "第11章 C++语言基础的六阶段证据链是什么？",
    answer:
      "声明类型和值 → 限定存储期 → 组合函数与容器 → 明确指针引用 → 封装类与多态 → 文件和STL回归",
    tags: ["第11章 C++语言基础", "机制链"],
  },
  {
    id: "ucn-11-cpp-language-4",
    chapter: "ucn-11-cpp-language",
    level: 3,
    question: "第11章 C++语言基础应主动注入哪两类失败？",
    answer:
      "把拥有对象的裸指针复制到多个容器，异常或提前返回后出现双重释放与悬空引用。；基类通过非虚析构函数销毁派生对象，资源只释放一部分且问题在高负载时累积。",
    tags: ["第11章 C++语言基础", "故障注入"],
  },
  {
    id: "ucn-11-cpp-language-5",
    chapter: "ucn-11-cpp-language",
    level: 3,
    question: "第11章 C++语言基础签发时保持什么不变量？",
    answer:
      "每个资源有唯一所有权策略；引用不越过对象生命周期；多态基类可安全析构；容器迭代器失效规则被遵守。",
    tags: ["第11章 C++语言基础", "工程验收"],
  },
  {
    id: "ucn-11-cpp-language-6",
    chapter: "ucn-11-cpp-language",
    level: 3,
    question: "第11章 C++语言基础怎样完成可复现实验？",
    answer:
      "给会话对象注入构造失败、容器扩容和连接提前关闭，先预测哪条裸指针最先悬空，再用地址消毒器和析构日志验证。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["第11章 C++语言基础", "可复现实验"],
  },
  {
    id: "ucn-12-cpp-network-basics-1",
    chapter: "ucn-12-cpp-network-basics",
    level: 1,
    question: "第12章 C++网络编程基础的核心主张是什么？",
    answer:
      "以Socket寻址和Windows套接字流程为骨架，分别完成TCP字节流与UDP数据报的初始化、收发、错误处理和关闭。",
    tags: ["第12章 C++网络编程基础", "核心机制"],
  },
  {
    id: "ucn-12-cpp-network-basics-2",
    chapter: "ucn-12-cpp-network-basics",
    level: 2,
    question: "第12章 C++网络编程基础覆盖哪些公开目录条目？",
    answer:
      "12.1 Socket套接字、12.2 套接字寻址方式、12.3 Winsocket网络程序开发流程、12.4 在Visual Studio中创建网络工程、12.5 Winsocket编程准备、12.6 基于TCP的Socket编程、12.7 基于UDP的Socket编程、12.8 本章小结与分析",
    tags: ["第12章 C++网络编程基础", "目录覆盖"],
  },
  {
    id: "ucn-12-cpp-network-basics-3",
    chapter: "ucn-12-cpp-network-basics",
    level: 2,
    question: "第12章 C++网络编程基础的六阶段证据链是什么？",
    answer:
      "初始化Winsock → 解析地址端口 → 创建绑定套接字 → 完成TCP连接收发 → 完成UDP数据报收发 → 错误关闭后签发",
    tags: ["第12章 C++网络编程基础", "机制链"],
  },
  {
    id: "ucn-12-cpp-network-basics-4",
    chapter: "ucn-12-cpp-network-basics",
    level: 3,
    question: "第12章 C++网络编程基础应主动注入哪两类失败？",
    answer:
      "假设一次send或recv等于一条完整消息，TCP分片后协议立即错位。；UDP接收后不校验来源端点和报文长度，任意伪造数据报都能进入业务解析器。",
    tags: ["第12章 C++网络编程基础", "故障注入"],
  },
  {
    id: "ucn-12-cpp-network-basics-5",
    chapter: "ucn-12-cpp-network-basics",
    level: 3,
    question: "第12章 C++网络编程基础签发时保持什么不变量？",
    answer:
      "地址和端口采用网络字节序；TCP按字节流累积；UDP保持报文边界并校验来源；所有系统错误可分类。",
    tags: ["第12章 C++网络编程基础", "工程验收"],
  },
  {
    id: "ucn-12-cpp-network-basics-6",
    chapter: "ucn-12-cpp-network-basics",
    level: 3,
    question: "第12章 C++网络编程基础怎样完成可复现实验？",
    answer:
      "让TCP代理按随机边界拆分数据，并向UDP端口注入截断包和伪造来源。先预测哪种错误会被错误地当成正常关闭，再保存系统错误码。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["第12章 C++网络编程基础", "可复现实验"],
  },
  {
    id: "ucn-13-threading-async-socket-1",
    chapter: "ucn-13-threading-async-socket",
    level: 1,
    question: "第13章 多线程和异步套接字的核心主张是什么？",
    answer:
      "用线程、互斥与同步、进程间通信和异步I/O明确并发所有权，让完成通知只产生一次且不会越过会话代际。",
    tags: ["第13章 多线程和异步套接字", "核心机制"],
  },
  {
    id: "ucn-13-threading-async-socket-2",
    chapter: "ucn-13-threading-async-socket",
    level: 2,
    question: "第13章 多线程和异步套接字覆盖哪些公开目录条目？",
    answer:
      "13.1 C++多线程开发、13.2 C++多线程互斥对象和同步、13.3 C++进程间通信、13.4 C++设置异步I/O的模式和方法、13.5 本章小结与分析",
    tags: ["第13章 多线程和异步套接字", "目录覆盖"],
  },
  {
    id: "ucn-13-threading-async-socket-3",
    chapter: "ucn-13-threading-async-socket",
    level: 2,
    question: "第13章 多线程和异步套接字的六阶段证据链是什么？",
    answer:
      "划分线程职责 → 选择同步原语 → 建立进程间通道 → 提交异步操作 → 消费完成通知 → 取消排空后签发",
    tags: ["第13章 多线程和异步套接字", "机制链"],
  },
  {
    id: "ucn-13-threading-async-socket-4",
    chapter: "ucn-13-threading-async-socket",
    level: 3,
    question: "第13章 多线程和异步套接字应主动注入哪两类失败？",
    answer:
      "关闭Socket后立刻复用会话内存，旧异步完成回调写入新连接对象，形成跨代际污染。；持有业务互斥量等待I/O完成，完成线程又需要同一把锁更新状态，造成稳定死锁。",
    tags: ["第13章 多线程和异步套接字", "故障注入"],
  },
  {
    id: "ucn-13-threading-async-socket-5",
    chapter: "ucn-13-threading-async-socket",
    level: 3,
    question: "第13章 多线程和异步套接字签发时保持什么不变量？",
    answer:
      "共享状态有明确锁或单线程所有者；完成事件只消费一次；取消先于释放；旧代际结果不能修改新会话。",
    tags: ["第13章 多线程和异步套接字", "工程验收"],
  },
  {
    id: "ucn-13-threading-async-socket-6",
    chapter: "ucn-13-threading-async-socket",
    level: 3,
    question: "第13章 多线程和异步套接字怎样完成可复现实验？",
    answer:
      "并发建立和关闭一千次连接，先预测完成端口、会话代际还是锁顺序最先暴露问题，再随机延迟完成通知并记录所有权。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["第13章 多线程和异步套接字", "可复现实验"],
  },
  {
    id: "ucn-14-mysql-1",
    chapter: "ucn-14-mysql",
    level: 1,
    question: "第14章 MySQL数据库的使用的核心主张是什么？",
    answer:
      "从安装和可视化管理进入C++连接、SQL、备份导入与迁移，重点保持事务、参数化、唯一约束和恢复点的一致性。",
    tags: ["第14章 MySQL数据库的使用", "核心机制"],
  },
  {
    id: "ucn-14-mysql-2",
    chapter: "ucn-14-mysql",
    level: 2,
    question: "第14章 MySQL数据库的使用覆盖哪些公开目录条目？",
    answer:
      "14.1 MySQL数据库介绍和使用范围、14.2 安装MySQL数据库、14.3 MySQL可视化管理工具的使用、14.4 使用C++连接MySQL数据库、14.5 SQL语句和语法、14.6 MySQL备份导出数据和导入转移数据、14.7 本章小结与分析",
    tags: ["第14章 MySQL数据库的使用", "目录覆盖"],
  },
  {
    id: "ucn-14-mysql-3",
    chapter: "ucn-14-mysql",
    level: 2,
    question: "第14章 MySQL数据库的使用的六阶段证据链是什么？",
    answer:
      "安装并锁定版本 → 建立最小权限账号 → 从C++连接 → 执行参数化事务 → 备份导出与迁移 → 恢复演练后签发",
    tags: ["第14章 MySQL数据库的使用", "机制链"],
  },
  {
    id: "ucn-14-mysql-4",
    chapter: "ucn-14-mysql",
    level: 3,
    question: "第14章 MySQL数据库的使用应主动注入哪两类失败？",
    answer:
      "把账号和密码拼进SQL字符串，再依赖替换引号防注入；编码和语法边界仍可绕过。；备份文件生成成功就视为可恢复，从未在隔离实例导入并核对行数、约束和字符集。",
    tags: ["第14章 MySQL数据库的使用", "故障注入"],
  },
  {
    id: "ucn-14-mysql-5",
    chapter: "ucn-14-mysql",
    level: 3,
    question: "第14章 MySQL数据库的使用签发时保持什么不变量？",
    answer:
      "业务写入要么全部提交要么全部回滚；用户值不进入SQL结构；唯一性由数据库保证；备份经过恢复演练。",
    tags: ["第14章 MySQL数据库的使用", "工程验收"],
  },
  {
    id: "ucn-14-mysql-6",
    chapter: "ucn-14-mysql",
    level: 3,
    question: "第14章 MySQL数据库的使用怎样完成可复现实验？",
    answer:
      "并发创建同名账号并在第二条更新前断开数据库，先预测唯一约束与事务回滚的结果，再把备份导入隔离实例核对摘要。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["第14章 MySQL数据库的使用", "可复现实验"],
  },
  {
    id: "ucn-15-protobuf-1",
    chapter: "ucn-15-protobuf",
    level: 1,
    question: "第15章 网络协议Protobuf的使用的核心主张是什么？",
    answer:
      "从序列化原理和proto定义推进到代码生成与双端小程序，明确字段编号、默认值、未知字段和版本兼容规则。",
    tags: ["第15章 网络协议Protobuf的使用", "核心机制"],
  },
  {
    id: "ucn-15-protobuf-2",
    chapter: "ucn-15-protobuf",
    level: 2,
    question: "第15章 网络协议Protobuf的使用覆盖哪些公开目录条目？",
    answer:
      "15.1 什么是Protobuf、15.2 Protobuf的功能是什么、15.3 Protobuf序列化的原理是什么、15.4 如何编写Protobuf的.proto文件、15.5 如何编译和生成Protobuf的编译程序、15.6 使用Protobuf协议制作一段网络小程序、15.7 本章小结与分析",
    tags: ["第15章 网络协议Protobuf的使用", "目录覆盖"],
  },
  {
    id: "ucn-15-protobuf-3",
    chapter: "ucn-15-protobuf",
    level: 2,
    question: "第15章 网络协议Protobuf的使用的六阶段证据链是什么？",
    answer:
      "定义消息职责 → 分配稳定字段号 → 生成C++与C#代码 → 封装长度和消息号 → 跨版本互通 → 畸形输入后签发",
    tags: ["第15章 网络协议Protobuf的使用", "机制链"],
  },
  {
    id: "ucn-15-protobuf-4",
    chapter: "ucn-15-protobuf",
    level: 3,
    question: "第15章 网络协议Protobuf的使用应主动注入哪两类失败？",
    answer:
      "删除字段后复用旧编号，新服务端把旧客户端数据解释成完全不同的语义。；只测试同版本编码解码，没有验证未知字段、缺省值、截断长度和超大消息。",
    tags: ["第15章 网络协议Protobuf的使用", "故障注入"],
  },
  {
    id: "ucn-15-protobuf-5",
    chapter: "ucn-15-protobuf",
    level: 3,
    question: "第15章 网络协议Protobuf的使用签发时保持什么不变量？",
    answer:
      "已发布字段号不复用；双端使用同一协议摘要；未知字段可安全跳过；长度预算先于反序列化。",
    tags: ["第15章 网络协议Protobuf的使用", "工程验收"],
  },
  {
    id: "ucn-15-protobuf-6",
    chapter: "ucn-15-protobuf",
    level: 3,
    question: "第15章 网络协议Protobuf的使用怎样完成可复现实验？",
    answer:
      "让v1客户端与v2服务端交叉通信，先预测新增可选字段和复用字段号的差异，再注入截断、未知字段和超长帧。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["第15章 网络协议Protobuf的使用", "可复现实验"],
  },
  {
    id: "ucn-16-server-topology-1",
    chapter: "ucn-16-server-topology",
    level: 1,
    question: "第16章 设计架构简单的互动服务器体系的核心主张是什么？",
    answer:
      "先用架构图声明服务职责和连接方向，再用Login、Gate、Center与Battle四类服务形成身份、接入、任务和战场的分层事实。",
    tags: ["第16章 设计架构简单的互动服务器体系", "核心机制"],
  },
  {
    id: "ucn-16-server-topology-2",
    chapter: "ucn-16-server-topology",
    level: 2,
    question: "第16章 设计架构简单的互动服务器体系覆盖哪些公开目录条目？",
    answer:
      "16.1 Visio：一个绘制架构图的软件、16.2 如何使用图和连接线来表示架构、16.3 需要哪些服务来构建整个服务体系、16.4 登录服务器（LoginServer）、16.5 网关服务器（GateServer）、16.6 中心服务器（CenterServer）、16.7 战场服务器（BattleServer）、16.8 本章小结与分析",
    tags: ["第16章 设计架构简单的互动服务器体系", "目录覆盖"],
  },
  {
    id: "ucn-16-server-topology-3",
    chapter: "ucn-16-server-topology",
    level: 2,
    question: "第16章 设计架构简单的互动服务器体系的六阶段证据链是什么？",
    answer:
      "绘制职责与数据流 → 划分外网和内网 → 定义Login授权 → 定义Gate接入 → 定义Center与Battle → 故障隔离后签发",
    tags: ["第16章 设计架构简单的互动服务器体系", "机制链"],
  },
  {
    id: "ucn-16-server-topology-4",
    chapter: "ucn-16-server-topology",
    level: 3,
    question: "第16章 设计架构简单的互动服务器体系应主动注入哪两类失败？",
    answer:
      "架构图只画服务方框不标协议、方向、所有权和失败处理，无法判断谁生成或撤销会话。；Gate、Center和Battle都能直接修改玩家持久数据，冲突时没有唯一事实来源。",
    tags: ["第16章 设计架构简单的互动服务器体系", "故障注入"],
  },
  {
    id: "ucn-16-server-topology-5",
    chapter: "ucn-16-server-topology",
    level: 3,
    question: "第16章 设计架构简单的互动服务器体系签发时保持什么不变量？",
    answer:
      "每类事实只有一个权威服务；外网不能直达内部服务；跨服务消息可追踪；单服务失败不会伪造成功。",
    tags: ["第16章 设计架构简单的互动服务器体系", "工程验收"],
  },
  {
    id: "ucn-16-server-topology-6",
    chapter: "ucn-16-server-topology",
    level: 3,
    question: "第16章 设计架构简单的互动服务器体系怎样完成可复现实验？",
    answer:
      "按架构图重放登录到战场流程，先预测关闭Center或Battle时哪条链路应降级，再核对路由、超时、重试和补偿。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["第16章 设计架构简单的互动服务器体系", "可复现实验"],
  },
  {
    id: "ucn-17-login-server-1",
    chapter: "ucn-17-login-server",
    level: 1,
    question: "第17章 开发登录服务器LoginServer的核心主张是什么？",
    answer:
      "用Protobuf、网络会话、服务逻辑、客户端协议和Redis缓存组成一次可撤销、可过期、可防重放的授权登录。",
    tags: ["第17章 开发登录服务器LoginServer", "核心机制"],
  },
  {
    id: "ucn-17-login-server-2",
    chapter: "ucn-17-login-server",
    level: 2,
    question: "第17章 开发登录服务器LoginServer覆盖哪些公开目录条目？",
    answer:
      "17.1 登录服务器的作用、17.2 使用Protobuf生成登录授权文件和协议、17.3 创建LoginServer网络会话层底层模块、17.4 创建LoginServer服务逻辑模块、17.5 导入LoginServer的Protobuf协议、17.6 客户端Protobuf协议的导入和使用、17.7 从客户端登录到授权的逻辑处理过程、17.8 启动LoginServer，完成第一次授权登录、17.9 Redis缓存存储和信息处理、17.10 本章小结与分析",
    tags: ["第17章 开发登录服务器LoginServer", "目录覆盖"],
  },
  {
    id: "ucn-17-login-server-3",
    chapter: "ucn-17-login-server",
    level: 2,
    question: "第17章 开发登录服务器LoginServer的六阶段证据链是什么？",
    answer:
      "定义授权协议 → 建立会话层 → 校验身份凭据 → 签发短期票据 → 写入Redis状态 → 首次登录与重放签发",
    tags: ["第17章 开发登录服务器LoginServer", "机制链"],
  },
  {
    id: "ucn-17-login-server-4",
    chapter: "ucn-17-login-server",
    level: 3,
    question: "第17章 开发登录服务器LoginServer应主动注入哪两类失败？",
    answer:
      "登录票据只有账号和签名，没有受众、过期时间、随机数与使用状态，被截获后可在任意网关重复使用。；Redis写入失败仍向客户端返回成功，GateServer收到票据却找不到对应授权状态。",
    tags: ["第17章 开发登录服务器LoginServer", "故障注入"],
  },
  {
    id: "ucn-17-login-server-5",
    chapter: "ucn-17-login-server",
    level: 3,
    question: "第17章 开发登录服务器LoginServer签发时保持什么不变量？",
    answer:
      "密码不明文传输或存储；票据短期、限受众且可撤销；同一Nonce只成功一次；缓存失败不签发成功。",
    tags: ["第17章 开发登录服务器LoginServer", "工程验收"],
  },
  {
    id: "ucn-17-login-server-6",
    chapter: "ucn-17-login-server",
    level: 3,
    question: "第17章 开发登录服务器LoginServer怎样完成可复现实验？",
    answer:
      "对同一登录请求并发提交并重放票据，先预测哪一次必须被拒绝，再注入Redis超时、时钟偏差和签名篡改并保存原因。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["第17章 开发登录服务器LoginServer", "可复现实验"],
  },
  {
    id: "ucn-18-gate-server-1",
    chapter: "ucn-18-gate-server",
    level: 1,
    question: "第18章 开发网关服务器GateServer的核心主张是什么？",
    answer:
      "让网关验证授权、绑定连接身份、限制流量并把客户端消息路由到内部服务，同时保持客户端C#与服务器C++协议一致。",
    tags: ["第18章 开发网关服务器GateServer", "核心机制"],
  },
  {
    id: "ucn-18-gate-server-2",
    chapter: "ucn-18-gate-server",
    level: 2,
    question: "第18章 开发网关服务器GateServer覆盖哪些公开目录条目？",
    answer:
      "18.1 网关服务器及其作用、18.2 创建GateServer的框架主程序、18.3 创建网关转发和验证所需要的Protobuf协议脚本、18.4 生成服务器所需要的C++协议程序、18.5 生成客户端所需要的C#协议程序、18.6 完成网关服务器的逻辑功能开发、18.7 完成客户端从网关授权进入大厅的逻辑、18.8 本章小结与分析",
    tags: ["第18章 开发网关服务器GateServer", "目录覆盖"],
  },
  {
    id: "ucn-18-gate-server-3",
    chapter: "ucn-18-gate-server",
    level: 2,
    question: "第18章 开发网关服务器GateServer的六阶段证据链是什么？",
    answer:
      "启动网关框架 → 生成双端协议 → 验证登录票据 → 绑定连接身份 → 路由并限流 → 进入大厅后签发",
    tags: ["第18章 开发网关服务器GateServer", "机制链"],
  },
  {
    id: "ucn-18-gate-server-4",
    chapter: "ucn-18-gate-server",
    level: 3,
    question: "第18章 开发网关服务器GateServer应主动注入哪两类失败？",
    answer:
      "网关只在首次连接验证票据，后续内部路由信任客户端自带player_id，攻击者可替换身份。；客户端和服务端分别手工维护消息号，新增协议后编号漂移，合法消息被路由到错误处理器。",
    tags: ["第18章 开发网关服务器GateServer", "故障注入"],
  },
  {
    id: "ucn-18-gate-server-5",
    chapter: "ucn-18-gate-server",
    level: 3,
    question: "第18章 开发网关服务器GateServer签发时保持什么不变量？",
    answer:
      "身份来自已验证连接而非消息体；消息号由单一协议源生成；未认证连接不能路由；每连接队列和速率有上限。",
    tags: ["第18章 开发网关服务器GateServer", "工程验收"],
  },
  {
    id: "ucn-18-gate-server-6",
    chapter: "ucn-18-gate-server",
    level: 3,
    question: "第18章 开发网关服务器GateServer怎样完成可复现实验？",
    answer:
      "让客户端篡改player_id、重复使用票据并以突发速率发送合法消息，先预测认证、路由和限流分别在哪一层拒绝。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["第18章 开发网关服务器GateServer", "可复现实验"],
  },
  {
    id: "ucn-19-center-server-1",
    chapter: "ucn-19-center-server",
    level: 1,
    question: "第19章 开发中心服务器CenterServer的核心主张是什么？",
    answer:
      "让中心服务器拥有任务配置、玩家大厅状态与战场分配，生成双端协议和数据代码后，以幂等命令启动仿真任务。",
    tags: ["第19章 开发中心服务器CenterServer", "核心机制"],
  },
  {
    id: "ucn-19-center-server-2",
    chapter: "ucn-19-center-server",
    level: 2,
    question: "第19章 开发中心服务器CenterServer覆盖哪些公开目录条目？",
    answer:
      "19.1 中心服务器及其作用、19.2 创建CenterServer框架主程序、19.3 创建中心服务器的Protobuf协议脚本、19.4 生成服务器所需要的C++协议程序、19.5 生成客户端所需要的C#协议程序、19.6 生成服务器data数据和协议代码、19.7 完成中心服务器的逻辑功能开发、19.8 启动客户端完成任务配置并开始仿真任务、19.9 本章小结与分析",
    tags: ["第19章 开发中心服务器CenterServer", "目录覆盖"],
  },
  {
    id: "ucn-19-center-server-3",
    chapter: "ucn-19-center-server",
    level: 2,
    question: "第19章 开发中心服务器CenterServer的六阶段证据链是什么？",
    answer:
      "定义中心职责 → 生成协议与数据 → 维护大厅会话 → 验证任务配置 → 分配战场实例 → 客户端启动后签发",
    tags: ["第19章 开发中心服务器CenterServer", "机制链"],
  },
  {
    id: "ucn-19-center-server-4",
    chapter: "ucn-19-center-server",
    level: 3,
    question: "第19章 开发中心服务器CenterServer应主动注入哪两类失败？",
    answer:
      "客户端重复点击开始任务，CenterServer每次都创建新Battle实例，产生多个相同任务和重复扣费。；任务配置更新没有版本号，迟到的旧配置覆盖刚完成的新配置。",
    tags: ["第19章 开发中心服务器CenterServer", "故障注入"],
  },
  {
    id: "ucn-19-center-server-5",
    chapter: "ucn-19-center-server",
    level: 3,
    question: "第19章 开发中心服务器CenterServer签发时保持什么不变量？",
    answer:
      "同一请求键只创建一个任务；配置版本单调；战场分配可查询；启动成功只在Battle确认接管后返回。",
    tags: ["第19章 开发中心服务器CenterServer", "工程验收"],
  },
  {
    id: "ucn-19-center-server-6",
    chapter: "ucn-19-center-server",
    level: 3,
    question: "第19章 开发中心服务器CenterServer怎样完成可复现实验？",
    answer:
      "并发提交相同任务键并让Battle确认超时，先预测Center应返回处理中、重试还是新建，再检查任务表和资源回收。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["第19章 开发中心服务器CenterServer", "可复现实验"],
  },
  {
    id: "ucn-20-battle-server-1",
    chapter: "ucn-20-battle-server",
    level: 1,
    question: "第20章 开发战场服务器BattleServer的核心主张是什么？",
    answer:
      "在一个确定性战场循环中整合协议、数据、聊天、战斗逻辑、人员同步、车辆飞行器、动态资源监控与AI状态机。",
    tags: ["第20章 开发战场服务器BattleServer", "核心机制"],
  },
  {
    id: "ucn-20-battle-server-2",
    chapter: "ucn-20-battle-server",
    level: 2,
    question: "第20章 开发战场服务器BattleServer覆盖哪些公开目录条目？",
    answer:
      "20.1 战场服务器及其作用、20.2 创建BattleServer框架主程序、20.3 创建战场服务器Protobuf协议脚本、20.4 生成服务器所需要的C++协议程序、20.5 生成客户端所需要的C#协议程序、20.6 生成服务器data数据和协议代码、20.7 创建战场服务器的聊天模块、20.8 创建战场逻辑模块、20.9 创建战场仿真人员同步模块、20.10 创建战场仿真车辆和飞行器模块、20.11 创建战场动态资源管理和监控模块、20.12 创建战场AI仿真敌人和飞行器AI状态机、20.13 调试战场服务器和客户端，启动仿真任务、20.14 本章小结与分析",
    tags: ["第20章 开发战场服务器BattleServer", "目录覆盖"],
  },
  {
    id: "ucn-20-battle-server-3",
    chapter: "ucn-20-battle-server",
    level: 2,
    question: "第20章 开发战场服务器BattleServer的六阶段证据链是什么？",
    answer:
      "启动战场框架 → 生成双端协议数据 → 运行聊天与战斗 → 同步人员车辆飞行器 → 监控资源并驱动AI → 双端调试后签发",
    tags: ["第20章 开发战场服务器BattleServer", "机制链"],
  },
  {
    id: "ucn-20-battle-server-4",
    chapter: "ucn-20-battle-server",
    level: 3,
    question: "第20章 开发战场服务器BattleServer应主动注入哪两类失败？",
    answer:
      "客户端上报最终位置和伤害，BattleServer只转发，修改客户端即可瞬移或伪造命中。；AI、物理和同步分别使用不同时间步，负载变化后同一输入无法重放，客户端状态持续漂移。",
    tags: ["第20章 开发战场服务器BattleServer", "故障注入"],
  },
  {
    id: "ucn-20-battle-server-5",
    chapter: "ucn-20-battle-server",
    level: 3,
    question: "第20章 开发战场服务器BattleServer签发时保持什么不变量？",
    answer:
      "战场结果由服务端权威计算；固定步长和输入序号可重放；聊天与战斗限流；动态资源有生成代际和回收证据。",
    tags: ["第20章 开发战场服务器BattleServer", "工程验收"],
  },
  {
    id: "ucn-20-battle-server-6",
    chapter: "ucn-20-battle-server",
    level: 3,
    question: "第20章 开发战场服务器BattleServer怎样完成可复现实验？",
    answer:
      "用固定种子回放一场含人员、车辆、飞行器和AI的任务，先预测丢一帧输入会从哪个状态开始分歧，再比较快照摘要。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["第20章 开发战场服务器BattleServer", "可复现实验"],
  },
  {
    id: "ucn-21-hla-ai-1",
    chapter: "ucn-21-hla-ai",
    level: 1,
    question: "第21章 一些仿真框架和人工智能的介绍的核心主张是什么？",
    answer:
      "用VR-LINK/HLA理解联邦仿真的对象与时间管理，再把有限状态机、寻路、决策和深度学习放进可解释、可降级的AI边界。",
    tags: ["第21章 一些仿真框架和人工智能的介绍", "核心机制"],
  },
  {
    id: "ucn-21-hla-ai-2",
    chapter: "ucn-21-hla-ai",
    level: 2,
    question: "第21章 一些仿真框架和人工智能的介绍覆盖哪些公开目录条目？",
    answer:
      "21.1 VR-LINK与HLA框架：高层体系模型框架的使用、21.2 游戏中常用的人工智能算法和深度学习引申",
    tags: ["第21章 一些仿真框架和人工智能的介绍", "目录覆盖"],
  },
  {
    id: "ucn-21-hla-ai-3",
    chapter: "ucn-21-hla-ai",
    level: 2,
    question: "第21章 一些仿真框架和人工智能的介绍的六阶段证据链是什么？",
    answer:
      "声明联邦对象模型 → 加入并发现成员 → 交换属性与交互 → 推进逻辑时间 → 驱动游戏AI → 失联与推理失败签发",
    tags: ["第21章 一些仿真框架和人工智能的介绍", "机制链"],
  },
  {
    id: "ucn-21-hla-ai-4",
    chapter: "ucn-21-hla-ai",
    level: 3,
    question: "第21章 一些仿真框架和人工智能的介绍应主动注入哪两类失败？",
    answer:
      "把网络到达顺序当成仿真时间顺序，不使用时间戳和时间管理，跨节点事件因抖动发生逆序。；深度学习推理结果直接控制关键角色，没有置信阈值、预算或规则回退，模型超时就冻结战场。",
    tags: ["第21章 一些仿真框架和人工智能的介绍", "故障注入"],
  },
  {
    id: "ucn-21-hla-ai-5",
    chapter: "ucn-21-hla-ai",
    level: 3,
    question: "第21章 一些仿真框架和人工智能的介绍签发时保持什么不变量？",
    answer:
      "对象属性所有权明确；仿真时间单调；成员失联可清理；AI输出受规则和预算约束；推理失败走确定性回退。",
    tags: ["第21章 一些仿真框架和人工智能的介绍", "工程验收"],
  },
  {
    id: "ucn-21-hla-ai-6",
    chapter: "ucn-21-hla-ai",
    level: 3,
    question: "第21章 一些仿真框架和人工智能的介绍怎样完成可复现实验？",
    answer:
      "让两个联邦成员以不同网络延迟发布同一时间线事件，并让AI推理随机超时。先预测事件排序和回退动作，再核对逻辑时间。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["第21章 一些仿真框架和人工智能的介绍", "可复现实验"],
  },
  {
    id: "ucn-afterword-career-development-1",
    chapter: "ucn-afterword-career-development",
    level: 1,
    question: "后记——全书总结与个人发展建议的核心主张是什么？",
    answer:
      "把21章归并为Unity客户端、C++网络基础、分布式服务、HLA与AI四类能力，用一条贯穿双端的纵向作品和可重放证据选择个人发展路线。",
    tags: ["后记——全书总结与个人发展建议", "核心机制"],
  },
  {
    id: "ucn-afterword-career-development-2",
    chapter: "ucn-afterword-career-development",
    level: 2,
    question: "后记页面覆盖哪个正式目录单元，哪些内容属于教学展开？",
    answer:
      "正式目录只披露‘后记——全书总结与个人发展建议’。能力矩阵、主攻与支撑路线、纵向作品、证据档案和十二周复盘均为本站教学展开，不冒充原书分节。",
    tags: ["后记——全书总结与个人发展建议", "目录覆盖"],
  },
  {
    id: "ucn-afterword-career-development-3",
    chapter: "ucn-afterword-career-development",
    level: 2,
    question: "后记——全书总结与个人发展建议的六阶段证据链是什么？",
    answer:
      "盘点双端能力 → 选择主攻角色 → 补齐机制缺口 → 完成纵向作品 → 采集运行证据 → 复盘并更新路线",
    tags: ["后记——全书总结与个人发展建议", "机制链"],
  },
  {
    id: "ucn-afterword-career-development-4",
    chapter: "ucn-afterword-career-development",
    level: 3,
    question: "后记——全书总结与个人发展建议应主动注入哪两类失败？",
    answer:
      "把Unity、C++、数据库、协议、HLA和AI工具清单当成成长路线，却没有端到端机制证据；把一次成功演示当成作品证据，却没有重放拒绝、断线清理和恢复复测。",
    tags: ["后记——全书总结与个人发展建议", "故障注入"],
  },
  {
    id: "ucn-afterword-career-development-5",
    chapter: "ucn-afterword-career-development",
    level: 3,
    question: "后记——全书总结与个人发展建议签发时保持什么不变量？",
    answer:
      "发展路线由目标角色和可核验证据驱动；每个能力声明至少有实现、失败或恢复证据；纵向作品不产生第二份服务器事实；复盘删除无证据声明。",
    tags: ["后记——全书总结与个人发展建议", "工程验收"],
  },
  {
    id: "ucn-afterword-career-development-6",
    chapter: "ucn-afterword-career-development",
    level: 3,
    question: "后记——全书总结与个人发展建议怎样完成可复现实验？",
    answer:
      "选择目标角色，为21章建立能力矩阵，再用同一纵向任务验证正常流程、临界队列、旧票据重放、Battle断线和AI超时；保存版本、种子、首偏离点、恢复动作和复测结论。",
    tags: ["后记——全书总结与个人发展建议", "可复现实验"],
  },
  {
    id: "ucn-official-final-review-1",
    chapter: "ucn-official-final-review",
    level: 1,
    question: "《Unity与C++网络游戏开发实战》全书总复习的核心主张是什么？",
    answer:
      "从Unity资源和交互沿协议进入Login、Gate、Center与Battle，再通过HLA和AI扩展仿真边界，用一条任务证据链复核全书。",
    tags: ["《Unity与C++网络游戏开发实战》全书总复习", "核心机制"],
  },
  {
    id: "ucn-official-final-review-2",
    chapter: "ucn-official-final-review",
    level: 2,
    question: "《Unity与C++网络游戏开发实战》全书总复习覆盖哪些公开目录条目？",
    answer:
      "第1至10章建立Unity客户端，第11至15章建立C++网络、数据库与协议基础，第16至20章实现Login、Gate、Center与Battle，第21章扩展到HLA与AI，后记把全书能力转为纵向作品、运行证据和个人发展路线。",
    tags: ["《Unity与C++网络游戏开发实战》全书总复习", "目录覆盖"],
  },
  {
    id: "ucn-official-final-review-3",
    chapter: "ucn-official-final-review",
    level: 2,
    question: "《Unity与C++网络游戏开发实战》全书总复习的六阶段证据链是什么？",
    answer:
      "复核Unity工程基线 → 复核人物场景UI → 复核C++网络数据库协议 → 复核登录与网关 → 复核中心与战场 → 复核HLA、AI、职业路线与恢复",
    tags: ["《Unity与C++网络游戏开发实战》全书总复习", "机制链"],
  },
  {
    id: "ucn-official-final-review-4",
    chapter: "ucn-official-final-review",
    level: 3,
    question: "《Unity与C++网络游戏开发实战》全书总复习应主动注入哪两类失败？",
    answer:
      "客户端最终画面正确就宣布系统通过，却没有比较Login、Gate、Center和Battle的票据、序号、版本与状态摘要。；只验证正常流程，不注入断线、重放、旧代际、资源泄漏和服务超时，恢复路径从未真正运行。",
    tags: ["《Unity与C++网络游戏开发实战》全书总复习", "故障注入"],
  },
  {
    id: "ucn-official-final-review-5",
    chapter: "ucn-official-final-review",
    level: 3,
    question: "《Unity与C++网络游戏开发实战》全书总复习签发时保持什么不变量？",
    answer:
      "客户端不产生服务器事实；协议版本一致；每类状态单一所有；失败在首偏离点被拒绝；恢复后同输入可重放。",
    tags: ["《Unity与C++网络游戏开发实战》全书总复习", "工程验收"],
  },
  {
    id: "ucn-official-final-review-6",
    chapter: "ucn-official-final-review",
    level: 3,
    question: "《Unity与C++网络游戏开发实战》全书总复习怎样完成可复现实验？",
    answer:
      "固定版本、种子和任务脚本，完整执行授权、进入大厅、启动任务、战场同步和结束归档。先预测断开任一服务的首偏离点，再复测恢复。 保存版本、随机种子、状态序号、首偏离节点、恢复动作和最终决策。",
    tags: ["《Unity与C++网络游戏开发实战》全书总复习", "可复现实验"],
  },
];
