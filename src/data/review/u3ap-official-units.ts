import type { ReviewQuestion } from "./types";

export const u3apOfficialUnitQuestions: ReviewQuestion[] = [
  {
    "id": "u3ap-official-learning-map-1",
    "chapter": "u3ap-official-learning-map",
    "level": 1,
    "question": "连载导览的核心主张是什么？",
    "answer": "这是一套由陆泽西（Jesse Lu）发布的在线技术连载，不是有 ISBN 的纸质书。现存目录能核实第1至第8章与第10章，共 9 个编号章节；第9章没有出现在可验证索引中。学习地图按可证实文章重建，并明确缺号，避免用热更新或 CI/CD 等旧自拟主题填空。",
    "tags": [
      "连载导览",
      "核心主张"
    ]
  },
  {
    "id": "u3ap-official-learning-map-2",
    "chapter": "u3ap-official-learning-map",
    "level": 2,
    "question": "连载导览覆盖哪些连载主题？",
    "answer": "第1章 C# 要点技术、第2章 架构、第3章 数据表、第4章 UI、第5章 资源、3D 模型与动画、第6章 网络层、第7章 渲染管线与图形学、第8章 AI、第10章 地图与寻路",
    "tags": [
      "连载导览",
      "连载覆盖"
    ]
  },
  {
    "id": "u3ap-official-learning-map-3",
    "chapter": "u3ap-official-learning-map",
    "level": 2,
    "question": "连载导览的证据链是什么？",
    "answer": "确认连载身份 → 核对文章索引 → 映射九个章节 → 标记缺失第9章 → 建立实验题库 → 全链验收",
    "tags": [
      "连载导览",
      "证据链"
    ]
  },
  {
    "id": "u3ap-official-learning-map-4",
    "chapter": "u3ap-official-learning-map",
    "level": 3,
    "question": "连载导览应主动注入什么失败？",
    "answer": "把在线连载误写成正式出版书，并用架构、内存、热更新、CI/CD 十页自拟课程替换原作者的九章文章索引。",
    "tags": [
      "连载导览",
      "失败注入"
    ]
  },
  {
    "id": "u3ap-official-learning-map-5",
    "chapter": "u3ap-official-learning-map",
    "level": 3,
    "question": "连载导览签发时保持什么不变量？",
    "answer": "9 个可验证编号章节全部有独立页面，48 个文章主题逐项命中，第9章缺号被明确标注且没有虚构内容。",
    "tags": [
      "连载导览",
      "签发不变量"
    ]
  },
  {
    "id": "u3ap-official-learning-map-6",
    "chapter": "u3ap-official-learning-map",
    "level": 3,
    "question": "连载导览怎样完成可复现实验？",
    "answer": "逐项对照保存的文章索引，为每个条目定位章节页、实验、交互图和复习题。先预测旧目录遗漏最多的领域，再检查 C#、数据表、模型动画、渲染、AI 与寻路是否恢复。保存版本、故障计划、首个偏离节点和签发结论。",
    "tags": [
      "连载导览",
      "复现实验"
    ]
  },
  {
    "id": "u3ap-01-csharp-key-techniques-1",
    "chapter": "u3ap-01-csharp-key-techniques",
    "level": 1,
    "question": "第1章的核心主张是什么？",
    "answer": "主程需要把语言特性还原为成本模型：集合的扩容和寻址决定热路径，浮点表示决定比较边界，委托与事件决定调用关系，装箱决定隐藏分配，排序和搜索算法决定规模增长后的上限。",
    "tags": [
      "第1章",
      "核心主张"
    ]
  },
  {
    "id": "u3ap-01-csharp-key-techniques-2",
    "chapter": "u3ap-01-csharp-key-techniques",
    "level": 2,
    "question": "第1章覆盖哪些连载主题？",
    "answer": "List 底层源码剖析、Dictionary 底层源码剖析、浮点数的精度问题、委托、事件、装箱、拆箱、排序算法、搜索算法",
    "tags": [
      "第1章",
      "连载覆盖"
    ]
  },
  {
    "id": "u3ap-01-csharp-key-techniques-3",
    "chapter": "u3ap-01-csharp-key-techniques",
    "level": 2,
    "question": "第1章的证据链是什么？",
    "answer": "声明数据规模 → 读取源码路径 → 建立成本模型 → 构造边界输入 → 采集分配耗时 → 签发语言约束",
    "tags": [
      "第1章",
      "证据链"
    ]
  },
  {
    "id": "u3ap-01-csharp-key-techniques-4",
    "chapter": "u3ap-01-csharp-key-techniques",
    "level": 3,
    "question": "第1章应主动注入什么失败？",
    "answer": "只背复杂度结论，不检查 Unity 运行时版本、容量变化、哈希冲突和 GC 分配，微基准与真实热路径完全脱节。",
    "tags": [
      "第1章",
      "失败注入"
    ]
  },
  {
    "id": "u3ap-01-csharp-key-techniques-5",
    "chapter": "u3ap-01-csharp-key-techniques",
    "level": 3,
    "question": "第1章签发时保持什么不变量？",
    "answer": "相同数据规模和运行时配置下，性能结论可复现，且所有浮点边界与集合容量变化都有明确证据。",
    "tags": [
      "第1章",
      "签发不变量"
    ]
  },
  {
    "id": "u3ap-01-csharp-key-techniques-6",
    "chapter": "u3ap-01-csharp-key-techniques",
    "level": 3,
    "question": "第1章怎样完成可复现实验？",
    "answer": "对相同数据分别使用预分配 List、逐步扩容 List 和装箱接口，固定运行次数并记录容量、分配与耗时；再用临界浮点值验证相等判断和排序顺序。保存版本、故障计划、首个偏离节点和签发结论。",
    "tags": [
      "第1章",
      "复现实验"
    ]
  },
  {
    "id": "u3ap-02-architecture-1",
    "chapter": "u3ap-02-architecture",
    "level": 1,
    "question": "第2章的核心主张是什么？",
    "answer": "架构不是目录命名，而是把变化频率、依赖方向、运行约束和团队边界转成可检查决策。Unity 前端架构还要处理 MonoBehaviour 生命周期、场景引用与资源异步性，不能机械照搬服务器分层。",
    "tags": [
      "第2章",
      "核心主张"
    ]
  },
  {
    "id": "u3ap-02-architecture-2",
    "chapter": "u3ap-02-architecture",
    "level": 2,
    "question": "第2章覆盖哪些连载主题？",
    "answer": "架构的意义、软件系统架构思维方式、架构的误区、前端架构、Unity3D 项目架构",
    "tags": [
      "第2章",
      "连载覆盖"
    ]
  },
  {
    "id": "u3ap-02-architecture-3",
    "chapter": "u3ap-02-architecture",
    "level": 2,
    "question": "第2章的证据链是什么？",
    "answer": "列出质量属性 → 画出现有依赖 → 识别变化轴 → 定义模块契约 → 迁移一条用例 → 验证故障边界",
    "tags": [
      "第2章",
      "证据链"
    ]
  },
  {
    "id": "u3ap-02-architecture-4",
    "chapter": "u3ap-02-architecture",
    "level": 3,
    "question": "第2章应主动注入什么失败？",
    "answer": "先搭建庞大框架再找需求，所有模块通过全局单例互调，名义上分层但依赖方向无法验证。",
    "tags": [
      "第2章",
      "失败注入"
    ]
  },
  {
    "id": "u3ap-02-architecture-5",
    "chapter": "u3ap-02-architecture",
    "level": 3,
    "question": "第2章签发时保持什么不变量？",
    "answer": "一条业务用例可以在不启动完整 Unity 场景和真实网络的条件下验证，依赖只沿声明方向流动。",
    "tags": [
      "第2章",
      "签发不变量"
    ]
  },
  {
    "id": "u3ap-02-architecture-6",
    "chapter": "u3ap-02-architecture",
    "level": 3,
    "question": "第2章怎样完成可复现实验？",
    "answer": "选择登录到大厅的一条真实用例，画出 UI、业务、网络、配置和资源依赖。先预测需求变化会波及哪些模块，再把传输层替换为模拟实现并比较修改范围。保存版本、故障计划、首个偏离节点和签发结论。",
    "tags": [
      "第2章",
      "复现实验"
    ]
  },
  {
    "id": "u3ap-03-data-tables-1",
    "chapter": "u3ap-03-data-tables",
    "level": 1,
    "question": "第3章的核心主张是什么？",
    "answer": "数据表是策划输入与运行时对象之间的契约。格式选择、生成流程、版本校验和多语言键必须一起设计；只把 Excel 转成某种文件不等于建立了可靠的数据系统。",
    "tags": [
      "第3章",
      "核心主张"
    ]
  },
  {
    "id": "u3ap-03-data-tables-2",
    "chapter": "u3ap-03-data-tables",
    "level": 2,
    "question": "第3章覆盖哪些连载主题？",
    "answer": "数据表的种类、数据表的制作方式、多语言的实现、表结构约束、版本与兼容",
    "tags": [
      "第3章",
      "连载覆盖"
    ]
  },
  {
    "id": "u3ap-03-data-tables-3",
    "chapter": "u3ap-03-data-tables",
    "level": 2,
    "question": "第3章的证据链是什么？",
    "answer": "分类数据 → 声明 schema → 导出生成 → 验证引用 → 加载运行时 → 切换语言复验",
    "tags": [
      "第3章",
      "证据链"
    ]
  },
  {
    "id": "u3ap-03-data-tables-4",
    "chapter": "u3ap-03-data-tables",
    "level": 3,
    "question": "第3章应主动注入什么失败？",
    "answer": "运行时直接按列号和字符串读取表格，缺失字段被默认值吞掉，错误直到线上特定语言才出现。",
    "tags": [
      "第3章",
      "失败注入"
    ]
  },
  {
    "id": "u3ap-03-data-tables-5",
    "chapter": "u3ap-03-data-tables",
    "level": 3,
    "question": "第3章签发时保持什么不变量？",
    "answer": "同一 schema 与源表生成确定性产物，重复主键、越界值、失效引用和缺失语言键在进入运行时前被拒绝。",
    "tags": [
      "第3章",
      "签发不变量"
    ]
  },
  {
    "id": "u3ap-03-data-tables-6",
    "chapter": "u3ap-03-data-tables",
    "level": 3,
    "question": "第3章怎样完成可复现实验？",
    "answer": "建立角色配置和本地化文本两张小表，固定 schema 版本。先预测重复主键、缺失引用和缺失语言键的错误位置，再注入三种故障验证构建门。保存版本、故障计划、首个偏离节点和签发结论。",
    "tags": [
      "第3章",
      "复现实验"
    ]
  },
  {
    "id": "u3ap-04-ui-1",
    "chapter": "u3ap-04-ui",
    "level": 1,
    "question": "第4章的核心主张是什么？",
    "answer": "UI 章节从 NGUI 与 UGUI 的选择进入 UGUI 的渲染、输入、事件和源码，再落到框架与性能。主程必须把页面状态、事件路由、生命周期和 Canvas 重建成本串成一条可测链。",
    "tags": [
      "第4章",
      "核心主张"
    ]
  },
  {
    "id": "u3ap-04-ui-2",
    "chapter": "u3ap-04-ui",
    "level": 2,
    "question": "第4章覆盖哪些连载主题？",
    "answer": "NGUI 和 UGUI 比较、UGUI 原理及组件使用、UGUI 输入与事件模块、UGUI 核心源码、UI 框架架构、UI 优化一、UI 优化二、UI 优化三",
    "tags": [
      "第4章",
      "连载覆盖"
    ]
  },
  {
    "id": "u3ap-04-ui-3",
    "chapter": "u3ap-04-ui",
    "level": 2,
    "question": "第4章的证据链是什么？",
    "answer": "选择 UI 栈 → 追踪输入 → 更新页面状态 → 触发重建 → 采集批次帧时 → 验证页面生命周期",
    "tags": [
      "第4章",
      "证据链"
    ]
  },
  {
    "id": "u3ap-04-ui-4",
    "chapter": "u3ap-04-ui",
    "level": 3,
    "question": "第4章应主动注入什么失败？",
    "answer": "每个按钮直接访问全局业务单例，所有元素放在同一个 Canvas，任何小更新都触发整页重建。",
    "tags": [
      "第4章",
      "失败注入"
    ]
  },
  {
    "id": "u3ap-04-ui-5",
    "chapter": "u3ap-04-ui",
    "level": 3,
    "question": "第4章签发时保持什么不变量？",
    "answer": "一次输入只产生一个业务命令，页面退出后无残留订阅，动态更新只影响声明的 Canvas 边界。",
    "tags": [
      "第4章",
      "签发不变量"
    ]
  },
  {
    "id": "u3ap-04-ui-6",
    "chapter": "u3ap-04-ui",
    "level": 3,
    "question": "第4章怎样完成可复现实验？",
    "answer": "建立静态背景、滚动列表和频繁更新计数器三层 UI，先预测一次文本变化会重建哪些 Canvas，再调整拆分边界并比较批次、布局和长尾帧。保存版本、故障计划、首个偏离节点和签发结论。",
    "tags": [
      "第4章",
      "复现实验"
    ]
  },
  {
    "id": "u3ap-05-models-animation-1",
    "chapter": "u3ap-05-models-animation",
    "level": 1,
    "question": "第5章的核心主张是什么？",
    "answer": "资源加载释放、制作规范、模型合并和空间变换共同决定资产能否稳定进入运行时。主程既要理解美术交付，也要能证明引用计数、模型边界、骨骼层级和矩阵变换不会造成泄漏或视觉漂移。",
    "tags": [
      "第5章",
      "核心主张"
    ]
  },
  {
    "id": "u3ap-05-models-animation-2",
    "chapter": "u3ap-05-models-animation",
    "level": 2,
    "question": "第5章覆盖哪些连载主题？",
    "answer": "资源的加载与释放、美术资源的规范、合并 3D 模型、3D 模型的变与换一、3D 模型的变与换二、3D 模型的变与换三、3D 模型的变与换四",
    "tags": [
      "第5章",
      "连载覆盖"
    ]
  },
  {
    "id": "u3ap-05-models-animation-3",
    "chapter": "u3ap-05-models-animation",
    "level": 2,
    "question": "第5章的证据链是什么？",
    "answer": "校验源资产 → 加载依赖 → 实例化模型 → 执行空间变换 → 合并或保留 → 释放并验收",
    "tags": [
      "第5章",
      "证据链"
    ]
  },
  {
    "id": "u3ap-05-models-animation-4",
    "chapter": "u3ap-05-models-animation",
    "level": 3,
    "question": "第5章应主动注入什么失败？",
    "answer": "只看到合并后 Draw Call 下降就签发，忽略剔除粒度、重复网格内存、骨骼更新和异步句柄未释放。",
    "tags": [
      "第5章",
      "失败注入"
    ]
  },
  {
    "id": "u3ap-05-models-animation-5",
    "chapter": "u3ap-05-models-animation",
    "level": 3,
    "question": "第5章签发时保持什么不变量？",
    "answer": "资产按规范导入，变换结果可复现，场景退出后实例与依赖句柄回到基线且无丢失引用。",
    "tags": [
      "第5章",
      "签发不变量"
    ]
  },
  {
    "id": "u3ap-05-models-animation-6",
    "chapter": "u3ap-05-models-animation",
    "level": 3,
    "question": "第5章怎样完成可复现实验？",
    "answer": "对同一批模型分别保持独立、静态合并和运行时合并，固定相机路径。先预测 Draw Call、剔除、内存和加载耗时，再销毁场景验证依赖是否归零。保存版本、故障计划、首个偏离节点和签发结论。",
    "tags": [
      "第5章",
      "复现实验"
    ]
  },
  {
    "id": "u3ap-06-network-layer-1",
    "chapter": "u3ap-06-network-layer",
    "level": 1,
    "question": "第6章的核心主张是什么？",
    "answer": "网络层不是 Socket API 集合，而是根据消息语义选择传输，定义帧边界、序列化、超时、重试和同步权威。TCP、UDP 与 HTTP 各自解决不同问题，协议必须在粘包、乱序、丢包和重连下仍可解释。",
    "tags": [
      "第6章",
      "核心主张"
    ]
  },
  {
    "id": "u3ap-06-network-layer-2",
    "chapter": "u3ap-06-network-layer",
    "level": 2,
    "question": "第6章覆盖哪些连载主题？",
    "answer": "TCP 还是 UDP、实现 TCP、实现 UDP、封装 HTTP、数据协议原理、网络同步解决方案",
    "tags": [
      "第6章",
      "连载覆盖"
    ]
  },
  {
    "id": "u3ap-06-network-layer-3",
    "chapter": "u3ap-06-network-layer",
    "level": 2,
    "question": "第6章的证据链是什么？",
    "answer": "声明消息语义 → 选择传输 → 编码协议帧 → 注入网络故障 → 重建权威状态 → 统计延迟一致性",
    "tags": [
      "第6章",
      "证据链"
    ]
  },
  {
    "id": "u3ap-06-network-layer-4",
    "chapter": "u3ap-06-network-layer",
    "level": 3,
    "question": "第6章应主动注入什么失败？",
    "answer": "假设一次 Receive 就是一条完整消息，或把 UDP 当成更快的 TCP，没有序号、确认、重放保护和超时策略。",
    "tags": [
      "第6章",
      "失败注入"
    ]
  },
  {
    "id": "u3ap-06-network-layer-5",
    "chapter": "u3ap-06-network-layer",
    "level": 3,
    "question": "第6章签发时保持什么不变量？",
    "answer": "相同命令序列和故障计划能重放出相同协议轨迹，非法帧被拒绝，最终状态收敛到声明的权威。",
    "tags": [
      "第6章",
      "签发不变量"
    ]
  },
  {
    "id": "u3ap-06-network-layer-6",
    "chapter": "u3ap-06-network-layer",
    "level": 3,
    "question": "第6章怎样完成可复现实验？",
    "answer": "用同一移动命令经过 TCP 流和 UDP 数据报传输，固定种子注入延迟、丢包、乱序和重复。先预测客户端状态，再检查协议解析与服务器校正轨迹。保存版本、故障计划、首个偏离节点和签发结论。",
    "tags": [
      "第6章",
      "复现实验"
    ]
  },
  {
    "id": "u3ap-07-rendering-graphics-1",
    "chapter": "u3ap-07-rendering-graphics",
    "level": 1,
    "question": "第7章的核心主张是什么？",
    "answer": "渲染章节从图形学基础和管线阶段进入批处理、实例化、采样、Shader 编译与 Projector。任何优化结论都要同时说明 CPU 提交、GPU 阶段、显存、变体和画质，不能把 Draw Call 当成唯一指标。",
    "tags": [
      "第7章",
      "核心主张"
    ]
  },
  {
    "id": "u3ap-07-rendering-graphics-2",
    "chapter": "u3ap-07-rendering-graphics",
    "level": 2,
    "question": "第7章覆盖哪些连载主题？",
    "answer": "图形学基础、渲染管线一、渲染管线二、渲染原理与知识一、渲染原理与知识二、渲染原理与知识三、多重采样与着色器编译原理、Projector 投影原理",
    "tags": [
      "第7章",
      "连载覆盖"
    ]
  },
  {
    "id": "u3ap-07-rendering-graphics-3",
    "chapter": "u3ap-07-rendering-graphics",
    "level": 2,
    "question": "第7章的证据链是什么？",
    "answer": "锁定画面场景 → 捕获管线阶段 → 定位限制端 → 修改一种策略 → 复测变体画质 → 签发设备预算",
    "tags": [
      "第7章",
      "证据链"
    ]
  },
  {
    "id": "u3ap-07-rendering-graphics-4",
    "chapter": "u3ap-07-rendering-graphics",
    "level": 3,
    "question": "第7章应主动注入什么失败？",
    "answer": "只统计 Draw Call，启用所有合批和 Shader 关键字，结果 CPU 指标变好但显存、变体、透明排序或 GPU 长尾恶化。",
    "tags": [
      "第7章",
      "失败注入"
    ]
  },
  {
    "id": "u3ap-07-rendering-graphics-5",
    "chapter": "u3ap-07-rendering-graphics",
    "level": 3,
    "question": "第7章签发时保持什么不变量？",
    "answer": "同一设备、相机路径和画质设置下，优化后的 CPU、GPU、显存、变体与截图门同时通过。",
    "tags": [
      "第7章",
      "签发不变量"
    ]
  },
  {
    "id": "u3ap-07-rendering-graphics-6",
    "chapter": "u3ap-07-rendering-graphics",
    "level": 3,
    "question": "第7章怎样完成可复现实验？",
    "answer": "构建包含重复网格、透明物体、MSAA 和 Projector 的固定场景，在同一设备比较无批处理、实例化与 SRP Batcher。先预测瓶颈，再保存 Frame Debugger 与 GPU 捕获。保存版本、故障计划、首个偏离节点和签发结论。",
    "tags": [
      "第7章",
      "复现实验"
    ]
  },
  {
    "id": "u3ap-08-ai-1",
    "chapter": "u3ap-08-ai",
    "level": 1,
    "question": "第8章的核心主张是什么？",
    "answer": "AI 章节依次比较有限状态机、行为树和非典型方案。结构选择取决于行为数量、并发性、可中断性和调试要求；主程要让感知、决策和动作可回放，而不是用随机表现掩盖不可解释状态。",
    "tags": [
      "第8章",
      "核心主张"
    ]
  },
  {
    "id": "u3ap-08-ai-2",
    "chapter": "u3ap-08-ai",
    "level": 2,
    "question": "第8章覆盖哪些连载主题？",
    "answer": "状态机构架机器人行为、行为树构建 AI、非典型性 AI、感知输入、决策轨迹、动作仲裁",
    "tags": [
      "第8章",
      "连载覆盖"
    ]
  },
  {
    "id": "u3ap-08-ai-3",
    "chapter": "u3ap-08-ai",
    "level": 2,
    "question": "第8章的证据链是什么？",
    "answer": "固定感知 → 运行决策 → 选择动作 → 处理中断 → 记录轨迹 → 复验行为目标",
    "tags": [
      "第8章",
      "证据链"
    ]
  },
  {
    "id": "u3ap-08-ai-4",
    "chapter": "u3ap-08-ai",
    "level": 3,
    "question": "第8章应主动注入什么失败？",
    "answer": "感知、决策和动作都在 Update 中直接修改共享字段，行为偶尔正确却无法解释是谁覆盖了命令。",
    "tags": [
      "第8章",
      "失败注入"
    ]
  },
  {
    "id": "u3ap-08-ai-5",
    "chapter": "u3ap-08-ai",
    "level": 3,
    "question": "第8章签发时保持什么不变量？",
    "answer": "固定感知时间线能复现相同决策与动作轨迹，中断后系统回到声明的合法状态。",
    "tags": [
      "第8章",
      "签发不变量"
    ]
  },
  {
    "id": "u3ap-08-ai-6",
    "chapter": "u3ap-08-ai",
    "level": 3,
    "question": "第8章怎样完成可复现实验？",
    "answer": "用状态机和行为树各实现巡逻、发现、追逐、失去目标和返回。固定感知时间线，先预测状态或节点轨迹，再注入目标消失与高优先级中断。保存版本、故障计划、首个偏离节点和签发结论。",
    "tags": [
      "第8章",
      "复现实验"
    ]
  },
  {
    "id": "u3ap-10-map-pathfinding-1",
    "chapter": "u3ap-10-map-pathfinding",
    "level": 1,
    "question": "第10章的核心主张是什么？",
    "answer": "地图与寻路把 A*、导航网格、地图编辑器和制作优化连接成生产链。算法正确只是起点，还要证明地图数据能生成、障碍能更新、路径能平滑、编辑结果能校验且运行预算可控。现存连载索引没有第9章，本页保留原编号而不补造缺失章节。",
    "tags": [
      "第10章",
      "核心主张"
    ]
  },
  {
    "id": "u3ap-10-map-pathfinding-2",
    "chapter": "u3ap-10-map-pathfinding",
    "level": 2,
    "question": "第10章覆盖哪些连载主题？",
    "answer": "A* 算法及优化、寻路网格的构建、地图编辑器、地图的制作与优化、动态障碍、路径验收",
    "tags": [
      "第10章",
      "连载覆盖"
    ]
  },
  {
    "id": "u3ap-10-map-pathfinding-3",
    "chapter": "u3ap-10-map-pathfinding",
    "level": 2,
    "question": "第10章的证据链是什么？",
    "answer": "生成地图数据 → 构建导航 → 提交起终点 → 运行 A* → 平滑与避障 → 编辑器回归",
    "tags": [
      "第10章",
      "证据链"
    ]
  },
  {
    "id": "u3ap-10-map-pathfinding-4",
    "chapter": "u3ap-10-map-pathfinding",
    "level": 3,
    "question": "第10章应主动注入什么失败？",
    "answer": "只在空旷地图验证 A*，地图编辑器允许非法连接，角色半径和动态障碍没有进入导航数据。",
    "tags": [
      "第10章",
      "失败注入"
    ]
  },
  {
    "id": "u3ap-10-map-pathfinding-5",
    "chapter": "u3ap-10-map-pathfinding",
    "level": 3,
    "question": "第10章签发时保持什么不变量？",
    "answer": "相同地图版本、代理参数和起终点得到相同路径或明确失败原因，编辑器在导出前拒绝非法拓扑。",
    "tags": [
      "第10章",
      "签发不变量"
    ]
  },
  {
    "id": "u3ap-10-map-pathfinding-6",
    "chapter": "u3ap-10-map-pathfinding",
    "level": 3,
    "question": "第10章怎样完成可复现实验？",
    "answer": "建立窄门、斜坡、动态障碍和不可达岛四类地图，固定代理半径与启发函数。先预测路径，再比较网格构建、搜索节点数、路径长度和失败原因。保存版本、故障计划、首个偏离节点和签发结论。",
    "tags": [
      "第10章",
      "复现实验"
    ]
  },
  {
    "id": "u3ap-official-final-review-1",
    "chapter": "u3ap-official-final-review",
    "level": 1,
    "question": "连载验收的核心主张是什么？",
    "answer": "综合验收以一条可运行游戏前端链为对象：配置驱动 UI 和 AI，资源系统加载模型，网络传输权威状态，渲染在预算内呈现，地图与寻路提供空间约束。每一层都要能被替换、注入故障并回放首个偏离节点。",
    "tags": [
      "连载验收",
      "核心主张"
    ]
  },
  {
    "id": "u3ap-official-final-review-2",
    "chapter": "u3ap-official-final-review",
    "level": 2,
    "question": "连载验收覆盖哪些连载主题？",
    "answer": "语言成本证据、架构依赖证据、数据与本地化证据、UI 生命周期证据、资源与变换证据、网络协议证据、渲染预算证据、AI 与寻路证据",
    "tags": [
      "连载验收",
      "连载覆盖"
    ]
  },
  {
    "id": "u3ap-official-final-review-3",
    "chapter": "u3ap-official-final-review",
    "level": 2,
    "question": "连载验收的证据链是什么？",
    "answer": "载入配置资源 → 建立页面角色 → 连接协议状态 → 运行 AI 寻路 → 捕获渲染性能 → 执行全链回归",
    "tags": [
      "连载验收",
      "证据链"
    ]
  },
  {
    "id": "u3ap-official-final-review-4",
    "chapter": "u3ap-official-final-review",
    "level": 3,
    "question": "连载验收应主动注入什么失败？",
    "answer": "只展示最终玩法视频，没有语言基准、依赖图、schema、句柄、协议轨迹、GPU 捕获、决策轨迹和地图版本。",
    "tags": [
      "连载验收",
      "失败注入"
    ]
  },
  {
    "id": "u3ap-official-final-review-5",
    "chapter": "u3ap-official-final-review",
    "level": 3,
    "question": "连载验收签发时保持什么不变量？",
    "answer": "同一版本和故障计划能重放完整前端链，九个章节门都能拒绝对应错误并在修复后恢复基线。",
    "tags": [
      "连载验收",
      "签发不变量"
    ]
  },
  {
    "id": "u3ap-official-final-review-6",
    "chapter": "u3ap-official-final-review",
    "level": 3,
    "question": "连载验收怎样完成可复现实验？",
    "answer": "从干净工程运行一个配置驱动的联网角色场景，按章节依次注入重复主键、UI 残留订阅、资源泄漏、丢包乱序、Shader 变体膨胀、AI 中断和不可达地图。保存版本、故障计划、首个偏离节点和签发结论。",
    "tags": [
      "连载验收",
      "复现实验"
    ]
  }
];
