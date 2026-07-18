import type { ReviewQuestion } from "./types";

export const uctOfficialQuestions: ReviewQuestion[] = [
  {
    id: "uct-official-learning-map-1",
    chapter: "uct-official-learning-map",
    level: 1,
    question: "全书导读中，什么是“权威目录”？",
    answer: "由书籍身份资料与完整目录交叉核对的十四章结构。",
    tags: ["全书导读", "原书复刻"],
  },
  {
    id: "uct-official-learning-map-2",
    chapter: "uct-official-learning-map",
    level: 2,
    question: "全书导读为什么必须保留原目录中的“第1章 3D数学与UNITY”？",
    answer: "它定义了本章独有的问题边界，不能被现代功能清单或别章内容替代。",
    tags: ["全书导读", "原书复刻"],
  },
  {
    id: "uct-official-learning-map-3",
    chapter: "uct-official-learning-map",
    level: 3,
    question: "全书导读的关键输入输出链是什么？",
    answer:
      "书籍身份和14章目录先固定边界，数学与数据章节建立运行时契约，AI和效果章节消费这些数据，MVC、FSM与热更新组织生命周期，Shader与工程经验在真机验证并发布。每章输出成为后续输入，最终可从发布结果反查到全部原章证据。",
    tags: ["全书导读", "证据实验"],
  },
  {
    id: "uct-official-learning-map-4",
    chapter: "uct-official-learning-map",
    level: 4,
    question: "全书导读最有诊断价值的故障样本是什么？",
    answer:
      "把常用Unity功能重新分十页会删除Avatar、Protobuf、海水、MVC、FSM和Lua热更新等原书身份。",
    tags: ["全书导读", "证据实验"],
  },
  {
    id: "uct-official-learning-map-5",
    chapter: "uct-official-learning-map",
    level: 1,
    question: "全书导读迁移到当前 Unity 时保留什么不变量？",
    answer:
      "原书出版于2017年，部分插件、Built-in Shader、AssetBundle与Lua桥接接口已变化；迁移只替换载体，不改写14章问题和依赖。",
    tags: ["全书导读", "证据实验"],
  },
  {
    id: "uct-official-learning-map-6",
    chapter: "uct-official-learning-map",
    level: 2,
    question: "全书导读签发前至少保存哪些证据？",
    answer:
      "导读验收要求14/14正文章有唯一页面，16页导航准确，96道题与slug一一对应，14单元清单覆盖100%，并能从最终发布案例反查数学、数据、AI、效果、架构与更新证据。",
    tags: ["全书导读", "证据实验"],
  },
  {
    id: "uct-01-3d-math-unity-1",
    chapter: "uct-01-3d-math-unity",
    level: 1,
    question: "第 1 章 3D 数学与 Unity中，什么是“坐标空间”？",
    answer: "为点、方向和变换赋予共同原点与基向量的参照系。",
    tags: ["第 1 章 3D 数学与 Unity", "原书复刻"],
  },
  {
    id: "uct-01-3d-math-unity-2",
    chapter: "uct-01-3d-math-unity",
    level: 2,
    question: "第 1 章 3D 数学与 Unity为什么必须保留原目录中的“Unity坐标系”？",
    answer: "它定义了本章独有的问题边界，不能被现代功能清单或别章内容替代。",
    tags: ["第 1 章 3D 数学与 Unity", "原书复刻"],
  },
  {
    id: "uct-01-3d-math-unity-3",
    chapter: "uct-01-3d-math-unity",
    level: 3,
    question: "第 1 章 3D 数学与 Unity的关键输入输出链是什么？",
    answer:
      "输入是带空间标签的位置、方向和旋转，变换阶段先完成局部到世界的矩阵组合，再用点积或叉积做几何判定，最后由 Quaternion 驱动朝向。输出不仅是画面，还应包含矩阵、单位向量、夹角和父子层级快照；这些数值能区分数学错误与渲染错觉。",
    tags: ["第 1 章 3D 数学与 Unity", "证据实验"],
  },
  {
    id: "uct-01-3d-math-unity-4",
    chapter: "uct-01-3d-math-unity",
    level: 4,
    question: "第 1 章 3D 数学与 Unity最有诊断价值的故障样本是什么？",
    answer:
      "把 Transform.position 与 localPosition 混用，会让代码在无父节点时通过、进入层级后失效。",
    tags: ["第 1 章 3D 数学与 Unity", "证据实验"],
  },
  {
    id: "uct-01-3d-math-unity-5",
    chapter: "uct-01-3d-math-unity",
    level: 1,
    question: "第 1 章 3D 数学与 Unity迁移到当前 Unity 时保留什么不变量？",
    answer:
      "Vector3、Matrix4x4、Quaternion 和 Transform 的核心数学语义在现代 Unity 中仍稳定，迁移重点不是替换 API，而是把空间、单位、左右乘约定写进测试。",
    tags: ["第 1 章 3D 数学与 Unity", "证据实验"],
  },
  {
    id: "uct-01-3d-math-unity-6",
    chapter: "uct-01-3d-math-unity",
    level: 2,
    question: "第 1 章 3D 数学与 Unity签发前至少保存哪些证据？",
    answer:
      "验收包应包含父子层级截图、局部与世界数值表、点积和叉积断言、两种矩阵顺序的对照、欧拉角边界轨迹与四元数插值曲线。另一位读者只看这些证据即可定位空间错误。",
    tags: ["第 1 章 3D 数学与 Unity", "证据实验"],
  },
  {
    id: "uct-02-avatar-outfit-system-1",
    chapter: "uct-02-avatar-outfit-system",
    level: 1,
    question: "第 2 章 Avatar 换装系统中，什么是“骨架签名”？",
    answer: "由骨骼相对路径、父子关系和绑定信息生成的兼容性标识。",
    tags: ["第 2 章 Avatar 换装系统", "原书复刻"],
  },
  {
    id: "uct-02-avatar-outfit-system-2",
    chapter: "uct-02-avatar-outfit-system",
    level: 2,
    question: "第 2 章 Avatar 换装系统为什么必须保留原目录中的“换装原理”？",
    answer: "它定义了本章独有的问题边界，不能被现代功能清单或别章内容替代。",
    tags: ["第 2 章 Avatar 换装系统", "原书复刻"],
  },
  {
    id: "uct-02-avatar-outfit-system-3",
    chapter: "uct-02-avatar-outfit-system",
    level: 3,
    question: "第 2 章 Avatar 换装系统的关键输入输出链是什么？",
    answer:
      "输入是经导入校验的服装 Prefab、骨架签名、材质和资源句柄；装配器先核对签名，再生成 bones 映射并设置 Renderer，动画系统随后以同一骨架驱动身体和服装。输出包括可变形角色、映射报告、材质槽报告与释放记录。",
    tags: ["第 2 章 Avatar 换装系统", "证据实验"],
  },
  {
    id: "uct-02-avatar-outfit-system-4",
    chapter: "uct-02-avatar-outfit-system",
    level: 4,
    question: "第 2 章 Avatar 换装系统最有诊断价值的故障样本是什么？",
    answer:
      "用骨骼短名映射会在左右同名、武器挂点或重复层级中静默连错，必须使用相对路径或稳定 ID。",
    tags: ["第 2 章 Avatar 换装系统", "证据实验"],
  },
  {
    id: "uct-02-avatar-outfit-system-5",
    chapter: "uct-02-avatar-outfit-system",
    level: 1,
    question: "第 2 章 Avatar 换装系统迁移到当前 Unity 时保留什么不变量？",
    answer:
      "现代 Unity 仍以 SkinnedMeshRenderer、bones、bindposes 和 BoneWeight 为核心；Addressables 只改变服装资产的取得与释放，不改变蒙皮契约。",
    tags: ["第 2 章 Avatar 换装系统", "证据实验"],
  },
  {
    id: "uct-02-avatar-outfit-system-6",
    chapter: "uct-02-avatar-outfit-system",
    level: 2,
    question: "第 2 章 Avatar 换装系统签发前至少保存哪些证据？",
    answer:
      "验收包含骨架差异报告、映射数组、bind pose 数量断言、五个极限姿态截图、材质实例计数、连续换装分配曲线和资源释放后内存快照。",
    tags: ["第 2 章 Avatar 换装系统", "证据实验"],
  },
  {
    id: "uct-03-message-event-encapsulation-1",
    chapter: "uct-03-message-event-encapsulation",
    level: 1,
    question: "第 3 章 消息事件封装中，什么是“消息契约”？",
    answer: "消息标识、载荷类型、语义、顺序与错误策略的共同定义。",
    tags: ["第 3 章 消息事件封装", "原书复刻"],
  },
  {
    id: "uct-03-message-event-encapsulation-2",
    chapter: "uct-03-message-event-encapsulation",
    level: 2,
    question:
      "第 3 章 消息事件封装为什么必须保留原目录中的“消息类型定义和封装”？",
    answer: "它定义了本章独有的问题边界，不能被现代功能清单或别章内容替代。",
    tags: ["第 3 章 消息事件封装", "原书复刻"],
  },
  {
    id: "uct-03-message-event-encapsulation-3",
    chapter: "uct-03-message-event-encapsulation",
    level: 3,
    question: "第 3 章 消息事件封装的关键输入输出链是什么？",
    answer:
      "发布者构造强类型消息并交给总线，总线读取订阅快照、记录链路信息并按策略调用监听者；后台来源只入队，主线程泵负责真正分发。输出是业务状态变化以及可追溯日志，取消订阅后监听计数必须立即下降。",
    tags: ["第 3 章 消息事件封装", "证据实验"],
  },
  {
    id: "uct-03-message-event-encapsulation-4",
    chapter: "uct-03-message-event-encapsulation",
    level: 4,
    question: "第 3 章 消息事件封装最有诊断价值的故障样本是什么？",
    answer:
      "只订阅不取消会让失效场景对象被总线持有，既重复响应又阻止垃圾回收。",
    tags: ["第 3 章 消息事件封装", "证据实验"],
  },
  {
    id: "uct-03-message-event-encapsulation-5",
    chapter: "uct-03-message-event-encapsulation",
    level: 1,
    question: "第 3 章 消息事件封装迁移到当前 Unity 时保留什么不变量？",
    answer:
      "C# event、UnityEvent、ScriptableObject Event Channel 和第三方消息总线都是载体选择；原书稳定不变量是消息协议、监听所有权与分发顺序。",
    tags: ["第 3 章 消息事件封装", "证据实验"],
  },
  {
    id: "uct-03-message-event-encapsulation-6",
    chapter: "uct-03-message-event-encapsulation",
    level: 2,
    question: "第 3 章 消息事件封装签发前至少保存哪些证据？",
    answer:
      "验收包含消息协议表、订阅计数曲线、场景卸载后零回调证明、重入上限测试、异常监听者日志、跨线程队列延迟和连续发布分配数据。",
    tags: ["第 3 章 消息事件封装", "证据实验"],
  },
  {
    id: "uct-04-protobuf-in-games-1",
    chapter: "uct-04-protobuf-in-games",
    level: 1,
    question: "第 4 章 Protobuf 在游戏中的运用中，什么是“字段编号”？",
    answer: "Protobuf 线格式中标识字段的稳定数字，发布后不可随意复用。",
    tags: ["第 4 章 Protobuf 在游戏中的运用", "原书复刻"],
  },
  {
    id: "uct-04-protobuf-in-games-2",
    chapter: "uct-04-protobuf-in-games",
    level: 2,
    question:
      "第 4 章 Protobuf 在游戏中的运用为什么必须保留原目录中的“Protobuf消息结构体定义”？",
    answer: "它定义了本章独有的问题边界，不能被现代功能清单或别章内容替代。",
    tags: ["第 4 章 Protobuf 在游戏中的运用", "原书复刻"],
  },
  {
    id: "uct-04-protobuf-in-games-3",
    chapter: "uct-04-protobuf-in-games",
    level: 3,
    question: "第 4 章 Protobuf 在游戏中的运用的关键输入输出链是什么？",
    answer:
      "唯一 proto 仓库经过固定 protoc 生成 C# 和服务端代码，构建产物记录 schema 哈希；发送端先序列化消息，再写入消息 ID 与长度前缀；接收端先重组完整帧，之后按类型解析。输出包括领域对象、协议指标和失败字节样本。",
    tags: ["第 4 章 Protobuf 在游戏中的运用", "证据实验"],
  },
  {
    id: "uct-04-protobuf-in-games-4",
    chapter: "uct-04-protobuf-in-games",
    level: 4,
    question: "第 4 章 Protobuf 在游戏中的运用最有诊断价值的故障样本是什么？",
    answer:
      "重排或复用字段编号会让同一字节被解释为不同语义，字段名相同也救不了兼容性。",
    tags: ["第 4 章 Protobuf 在游戏中的运用", "证据实验"],
  },
  {
    id: "uct-04-protobuf-in-games-5",
    chapter: "uct-04-protobuf-in-games",
    level: 1,
    question:
      "第 4 章 Protobuf 在游戏中的运用迁移到当前 Unity 时保留什么不变量？",
    answer:
      "书中可能基于较早 proto2 或插件版本，现代项目可用 proto3 与当前 Google.Protobuf；迁移必须逐字段记录 required、optional、默认值和未知字段差异。",
    tags: ["第 4 章 Protobuf 在游戏中的运用", "证据实验"],
  },
  {
    id: "uct-04-protobuf-in-games-6",
    chapter: "uct-04-protobuf-in-games",
    level: 2,
    question: "第 4 章 Protobuf 在游戏中的运用签发前至少保存哪些证据？",
    answer:
      "验收包含 schema 提交与哈希、生成命令和版本、客户端服务器生成文件一致性、半包粘包测试、旧新版本双向解析矩阵、错误载荷十六进制样本及目标平台 IL2CPP 结果。",
    tags: ["第 4 章 Protobuf 在游戏中的运用", "证据实验"],
  },
  {
    id: "uct-05-text-file-encryption-1",
    chapter: "uct-05-text-file-encryption",
    level: 1,
    question: "第 5 章 游戏中的文本文件加密中，什么是“威胁模型”？",
    answer: "明确攻击者能力、保护对象和可接受损失的安全假设。",
    tags: ["第 5 章 游戏中的文本文件加密", "原书复刻"],
  },
  {
    id: "uct-05-text-file-encryption-2",
    chapter: "uct-05-text-file-encryption",
    level: 2,
    question:
      "第 5 章 游戏中的文本文件加密为什么必须保留原目录中的“配置文件格式”？",
    answer: "它定义了本章独有的问题边界，不能被现代功能清单或别章内容替代。",
    tags: ["第 5 章 游戏中的文本文件加密", "原书复刻"],
  },
  {
    id: "uct-05-text-file-encryption-3",
    chapter: "uct-05-text-file-encryption",
    level: 3,
    question: "第 5 章 游戏中的文本文件加密的关键输入输出链是什么？",
    answer:
      "构建期先校验明文 schema，再将规范化字节认证加密并生成版本清单；运行时加载器读取密文、校验元数据、完成认证解密，解析器最后生成强类型配置。任何阶段失败都保留上一版本，并输出不含敏感内容的错误证据。",
    tags: ["第 5 章 游戏中的文本文件加密", "证据实验"],
  },
  {
    id: "uct-05-text-file-encryption-4",
    chapter: "uct-05-text-file-encryption",
    level: 4,
    question: "第 5 章 游戏中的文本文件加密最有诊断价值的故障样本是什么？",
    answer: "Base64、压缩或简单异或只改变可读性，不提供可靠机密性和篡改检测。",
    tags: ["第 5 章 游戏中的文本文件加密", "证据实验"],
  },
  {
    id: "uct-05-text-file-encryption-5",
    chapter: "uct-05-text-file-encryption",
    level: 1,
    question: "第 5 章 游戏中的文本文件加密迁移到当前 Unity 时保留什么不变量？",
    answer:
      "原书算法应作为理解加载链与攻击面的历史基线；现代项目不要自创密码算法，使用平台或成熟库提供的 AEAD 与签名实现。",
    tags: ["第 5 章 游戏中的文本文件加密", "证据实验"],
  },
  {
    id: "uct-05-text-file-encryption-6",
    chapter: "uct-05-text-file-encryption",
    level: 2,
    question: "第 5 章 游戏中的文本文件加密签发前至少保存哪些证据？",
    answer:
      "验收包含格式 schema、规范化字节样本、历史算法攻击示例、标准认证加密测试向量、篡改拒绝日志、错误密钥与中断回滚、密钥不落日志检查及服务器权威边界说明。",
    tags: ["第 5 章 游戏中的文本文件加密", "证据实验"],
  },
  {
    id: "uct-06-behavior-trees-1",
    chapter: "uct-06-behavior-trees",
    level: 1,
    question: "第 6 章 行为树在游戏中的运用中，什么是“行为状态”？",
    answer: "节点每次执行返回 Success、Failure 或 Running 的三态协议。",
    tags: ["第 6 章 行为树在游戏中的运用", "原书复刻"],
  },
  {
    id: "uct-06-behavior-trees-2",
    chapter: "uct-06-behavior-trees",
    level: 2,
    question:
      "第 6 章 行为树在游戏中的运用为什么必须保留原目录中的“行为树插件介绍”？",
    answer: "它定义了本章独有的问题边界，不能被现代功能清单或别章内容替代。",
    tags: ["第 6 章 行为树在游戏中的运用", "原书复刻"],
  },
  {
    id: "uct-06-behavior-trees-3",
    chapter: "uct-06-behavior-trees",
    level: 3,
    question: "第 6 章 行为树在游戏中的运用的关键输入输出链是什么？",
    answer:
      "感知系统把可见目标、距离和生命值写入黑板快照，调度器以固定频率 Tick 根节点，组合节点选择路径，Action 驱动移动或技能并返回状态；跟踪器记录访问路径和黑板差异。输出是行为命令与可回放决策轨迹。",
    tags: ["第 6 章 行为树在游戏中的运用", "证据实验"],
  },
  {
    id: "uct-06-behavior-trees-4",
    chapter: "uct-06-behavior-trees",
    level: 4,
    question: "第 6 章 行为树在游戏中的运用最有诊断价值的故障样本是什么？",
    answer:
      "条件节点执行动画或扣血等副作用，会因重评估而重复触发，条件应尽量纯粹。",
    tags: ["第 6 章 行为树在游戏中的运用", "证据实验"],
  },
  {
    id: "uct-06-behavior-trees-5",
    chapter: "uct-06-behavior-trees",
    level: 1,
    question: "第 6 章 行为树在游戏中的运用迁移到当前 Unity 时保留什么不变量？",
    answer:
      "具体插件界面和序列化格式可能变化，但三态、组合节点、黑板、Tick 和 Abort 是稳定核心；迁移时先用无引擎测试锁定语义。",
    tags: ["第 6 章 行为树在游戏中的运用", "证据实验"],
  },
  {
    id: "uct-06-behavior-trees-6",
    chapter: "uct-06-behavior-trees",
    level: 2,
    question: "第 6 章 行为树在游戏中的运用签发前至少保存哪些证据？",
    answer:
      "验收包含节点三态单元测试、巡逻追击树图、固定感知时间线、逐 Tick 访问轨迹、黑板差异、中断清理证明、阈值抖动测试和目标平台性能数据。",
    tags: ["第 6 章 行为树在游戏中的运用", "证据实验"],
  },
  {
    id: "uct-07-afterimage-1",
    chapter: "uct-07-afterimage",
    level: 1,
    question: "第 7 章 残影中，什么是“蒙皮快照”？",
    answer: "把某一时刻骨骼变形后的顶点固化为普通网格的结果。",
    tags: ["第 7 章 残影", "原书复刻"],
  },
  {
    id: "uct-07-afterimage-2",
    chapter: "uct-07-afterimage",
    level: 2,
    question: "第 7 章 残影为什么必须保留原目录中的“残影的技术实现”？",
    answer: "它定义了本章独有的问题边界，不能被现代功能清单或别章内容替代。",
    tags: ["第 7 章 残影", "原书复刻"],
  },
  {
    id: "uct-07-afterimage-3",
    chapter: "uct-07-afterimage",
    level: 3,
    question: "第 7 章 残影的关键输入输出链是什么？",
    answer:
      "触发器按时间请求残影，快照池提供空闲 Mesh 与 Renderer，烘焙器写入当前蒙皮网格并复制世界变换，衰减器根据年龄写颜色和透明度，生命周期结束后清空引用并回池。输出是视觉轨迹以及活跃数、烘焙耗时和分配指标。",
    tags: ["第 7 章 残影", "证据实验"],
  },
  {
    id: "uct-07-afterimage-4",
    chapter: "uct-07-afterimage",
    level: 4,
    question: "第 7 章 残影最有诊断价值的故障样本是什么？",
    answer:
      "复制完整角色会连同 Animator、脚本和骨架一起运行，效果数量一高就放大 CPU 与内存成本。",
    tags: ["第 7 章 残影", "证据实验"],
  },
  {
    id: "uct-07-afterimage-5",
    chapter: "uct-07-afterimage",
    level: 1,
    question: "第 7 章 残影迁移到当前 Unity 时保留什么不变量？",
    answer:
      "BakeMesh 与 MaterialPropertyBlock 的核心方案仍可用；SRP 下需要为 URP 或 HDRP 编写兼容透明 Shader，并重新验证深度、阴影和批处理。",
    tags: ["第 7 章 残影", "证据实验"],
  },
  {
    id: "uct-07-afterimage-6",
    chapter: "uct-07-afterimage",
    level: 2,
    question: "第 7 章 残影签发前至少保存哪些证据？",
    answer:
      "验收包含原角色与快照重合图、时间采样轨迹、材质实例计数、活跃对象上限、十分钟分配曲线、不同顶点数 BakeMesh 耗时、透明排序对照与目标设备视频。",
    tags: ["第 7 章 残影", "证据实验"],
  },
  {
    id: "uct-08-mobile-realtime-shadows-1",
    chapter: "uct-08-mobile-realtime-shadows",
    level: 1,
    question: "第 8 章 移动端实时阴影绘制中，什么是“光源空间”？",
    answer: "从光源位置和方向观察场景所使用的坐标空间。",
    tags: ["第 8 章 移动端实时阴影绘制", "原书复刻"],
  },
  {
    id: "uct-08-mobile-realtime-shadows-2",
    chapter: "uct-08-mobile-realtime-shadows",
    level: 2,
    question: "第 8 章 移动端实时阴影绘制为什么必须保留原目录中的“实现原理”？",
    answer: "它定义了本章独有的问题边界，不能被现代功能清单或别章内容替代。",
    tags: ["第 8 章 移动端实时阴影绘制", "原书复刻"],
  },
  {
    id: "uct-08-mobile-realtime-shadows-3",
    chapter: "uct-08-mobile-realtime-shadows",
    level: 3,
    question: "第 8 章 移动端实时阴影绘制的关键输入输出链是什么？",
    answer:
      "光源相机裁剪遮挡物并生成深度纹理，接收 Shader 把世界位置投影到该纹理并做带偏移过滤比较，透明材质的 ShadowCaster 复用主材质 alpha 规则。输出是阴影颜色以及深度图、采样坐标、过绘制和 GPU 时间证据。",
    tags: ["第 8 章 移动端实时阴影绘制", "证据实验"],
  },
  {
    id: "uct-08-mobile-realtime-shadows-4",
    chapter: "uct-08-mobile-realtime-shadows",
    level: 4,
    question: "第 8 章 移动端实时阴影绘制最有诊断价值的故障样本是什么？",
    answer: "只提高阴影分辨率而不收紧光源范围，会用更高带宽保存大量无效区域。",
    tags: ["第 8 章 移动端实时阴影绘制", "证据实验"],
  },
  {
    id: "uct-08-mobile-realtime-shadows-5",
    chapter: "uct-08-mobile-realtime-shadows",
    level: 1,
    question: "第 8 章 移动端实时阴影绘制迁移到当前 Unity 时保留什么不变量？",
    answer:
      "书中可能基于 Built-in 管线和自定义投影，现代 URP 提供主光阴影、级联和 Renderer Feature；迁移要保留两遍深度比较原理与移动预算证据。",
    tags: ["第 8 章 移动端实时阴影绘制", "证据实验"],
  },
  {
    id: "uct-08-mobile-realtime-shadows-6",
    chapter: "uct-08-mobile-realtime-shadows",
    level: 2,
    question: "第 8 章 移动端实时阴影绘制签发前至少保存哪些证据？",
    answer:
      "验收包含光源深度图、投影视锥截图、bias 扫描矩阵、透明轮廓对照、阴影替代方案比较、低中高设备 GPU 时间、带宽或过绘制指标以及故障样本。",
    tags: ["第 8 章 移动端实时阴影绘制", "证据实验"],
  },
  {
    id: "uct-09-mobile-ocean-simulation-1",
    chapter: "uct-09-mobile-ocean-simulation",
    level: 1,
    question: "第 9 章 移动端海水仿真技术中，什么是“波谱参数”？",
    answer: "定义波方向、波长、幅度、速度、相位和陡度的一组数据。",
    tags: ["第 9 章 移动端海水仿真技术", "原书复刻"],
  },
  {
    id: "uct-09-mobile-ocean-simulation-2",
    chapter: "uct-09-mobile-ocean-simulation",
    level: 2,
    question:
      "第 9 章 移动端海水仿真技术为什么必须保留原目录中的“海水实现原理”？",
    answer: "它定义了本章独有的问题边界，不能被现代功能清单或别章内容替代。",
    tags: ["第 9 章 移动端海水仿真技术", "原书复刻"],
  },
  {
    id: "uct-09-mobile-ocean-simulation-3",
    chapter: "uct-09-mobile-ocean-simulation",
    level: 3,
    question: "第 9 章 移动端海水仿真技术的关键输入输出链是什么？",
    answer:
      "风和海况生成统一 WaveSet，网格系统按相机提供顶点，GPU 用 WaveSet 位移并计算法线与着色，CPU 浮力系统在若干点查询同一时间和参数，UI 修改的也是这份数据。输出是画面、刚体运动和参数快照三条可对照证据。",
    tags: ["第 9 章 移动端海水仿真技术", "证据实验"],
  },
  {
    id: "uct-09-mobile-ocean-simulation-4",
    chapter: "uct-09-mobile-ocean-simulation",
    level: 4,
    question: "第 9 章 移动端海水仿真技术最有诊断价值的故障样本是什么？",
    answer: "GPU 与 CPU 各维护一套波参数或时间，会让水面视觉与浮力长期漂移。",
    tags: ["第 9 章 移动端海水仿真技术", "证据实验"],
  },
  {
    id: "uct-09-mobile-ocean-simulation-5",
    chapter: "uct-09-mobile-ocean-simulation",
    level: 1,
    question: "第 9 章 移动端海水仿真技术迁移到当前 Unity 时保留什么不变量？",
    answer:
      "Built-in、URP 与自定义 SRP 的抓屏、深度和反射接口不同，但统一波模型、网格 LOD、浮力查询与参数快照是稳定核心。",
    tags: ["第 9 章 移动端海水仿真技术", "证据实验"],
  },
  {
    id: "uct-09-mobile-ocean-simulation-6",
    chapter: "uct-09-mobile-ocean-simulation",
    level: 2,
    question: "第 9 章 移动端海水仿真技术签发前至少保存哪些证据？",
    answer:
      "验收包含单波 CPU/GPU 高度表、网格 LOD 线框、特性增量 GPU 数据、浮力点轨迹、风向案例、UI 参数快照、三档设备画面与性能，以及故意错开时间后的失败样本。",
    tags: ["第 9 章 移动端海水仿真技术", "证据实验"],
  },
  {
    id: "uct-10-mvc-architecture-1",
    chapter: "uct-10-mvc-architecture",
    level: 1,
    question: "第 10 章 MVC 架构设计中，什么是“Model”？",
    answer: "保存领域状态与规则且不依赖具体 Unity 视图的层。",
    tags: ["第 10 章 MVC 架构设计", "原书复刻"],
  },
  {
    id: "uct-10-mvc-architecture-2",
    chapter: "uct-10-mvc-architecture",
    level: 2,
    question:
      "第 10 章 MVC 架构设计为什么必须保留原目录中的“MVC代码模块设计”？",
    answer: "它定义了本章独有的问题边界，不能被现代功能清单或别章内容替代。",
    tags: ["第 10 章 MVC 架构设计", "原书复刻"],
  },
  {
    id: "uct-10-mvc-architecture-3",
    chapter: "uct-10-mvc-architecture",
    level: 3,
    question: "第 10 章 MVC 架构设计的关键输入输出链是什么？",
    answer:
      "WindowManager 打开窗口并注入 Controller，View 发出用户意图，Controller 调用 Model 或服务并生成新 State，View 以幂等方式渲染；关闭时按相反顺序取消订阅、停止任务、释放资源并归还缓存。输出是界面状态与完整用例轨迹。",
    tags: ["第 10 章 MVC 架构设计", "证据实验"],
  },
  {
    id: "uct-10-mvc-architecture-4",
    chapter: "uct-10-mvc-architecture",
    level: 4,
    question: "第 10 章 MVC 架构设计最有诊断价值的故障样本是什么？",
    answer:
      "Controller 直接查找场景对象和修改控件，会让业务无法脱离场景测试，View 边界名存实亡。",
    tags: ["第 10 章 MVC 架构设计", "证据实验"],
  },
  {
    id: "uct-10-mvc-architecture-5",
    chapter: "uct-10-mvc-architecture",
    level: 1,
    question: "第 10 章 MVC 架构设计迁移到当前 Unity 时保留什么不变量？",
    answer:
      "uGUI、UI Toolkit 或第三方 MVVM 改变 View 实现，但 Model、用例协调、状态快照和窗口生命周期仍是原书架构的稳定问题。",
    tags: ["第 10 章 MVC 架构设计", "证据实验"],
  },
  {
    id: "uct-10-mvc-architecture-6",
    chapter: "uct-10-mvc-architecture",
    level: 2,
    question: "第 10 章 MVC 架构设计签发前至少保存哪些证据？",
    answer:
      "验收包含 MVC 依赖图、窗口基类契约、子类示例、Controller 无场景测试、State 快照、模态栈回放、订阅与资源清理计数，以及成功和失败用例的相关 ID 日志。",
    tags: ["第 10 章 MVC 架构设计", "证据实验"],
  },
  {
    id: "uct-11-fsm-in-games-1",
    chapter: "uct-11-fsm-in-games",
    level: 1,
    question: "第 11 章 FSM 有限状态机在游戏中的运用中，什么是“状态”？",
    answer: "在一段时间内拥有特定行为与允许转移集合的离散模式。",
    tags: ["第 11 章 FSM 有限状态机在游戏中的运用", "原书复刻"],
  },
  {
    id: "uct-11-fsm-in-games-2",
    chapter: "uct-11-fsm-in-games",
    level: 2,
    question:
      "第 11 章 FSM 有限状态机在游戏中的运用为什么必须保留原目录中的“FSM基类设计”？",
    answer: "它定义了本章独有的问题边界，不能被现代功能清单或别章内容替代。",
    tags: ["第 11 章 FSM 有限状态机在游戏中的运用", "原书复刻"],
  },
  {
    id: "uct-11-fsm-in-games-3",
    chapter: "uct-11-fsm-in-games",
    level: 3,
    question: "第 11 章 FSM 有限状态机在游戏中的运用的关键输入输出链是什么？",
    answer:
      "输入系统、AI 或网络产生事件并写入实体队列，FSM 读取当前状态的转移表，执行守卫，按 Exit、赋值、Enter 顺序切换；状态 Tick 发出领域命令而非直接越权切换。输出是实体行为、技能阶段与完整转移日志。",
    tags: ["第 11 章 FSM 有限状态机在游戏中的运用", "证据实验"],
  },
  {
    id: "uct-11-fsm-in-games-4",
    chapter: "uct-11-fsm-in-games",
    level: 4,
    question:
      "第 11 章 FSM 有限状态机在游戏中的运用最有诊断价值的故障样本是什么？",
    answer:
      "状态子类直接给 currentState 赋值会绕过 Exit、守卫和日志，留下未清理副作用。",
    tags: ["第 11 章 FSM 有限状态机在游戏中的运用", "证据实验"],
  },
  {
    id: "uct-11-fsm-in-games-5",
    chapter: "uct-11-fsm-in-games",
    level: 1,
    question:
      "第 11 章 FSM 有限状态机在游戏中的运用迁移到当前 Unity 时保留什么不变量？",
    answer:
      "Animator StateMachine、Playable、DOTS 状态组件和网络预测改变载体，但事件、守卫、转移顺序与日志是不变量。",
    tags: ["第 11 章 FSM 有限状态机在游戏中的运用", "证据实验"],
  },
  {
    id: "uct-11-fsm-in-games-6",
    chapter: "uct-11-fsm-in-games",
    level: 2,
    question: "第 11 章 FSM 有限状态机在游戏中的运用签发前至少保存哪些证据？",
    answer:
      "验收包含状态图、转移表、守卫单元测试、实体与技能仲裁案例、固定输入回放、非法边拒绝日志、动画通知丢失兜底和同帧多事件顺序证明。",
    tags: ["第 11 章 FSM 有限状态机在游戏中的运用", "证据实验"],
  },
  {
    id: "uct-12-mobile-hot-update-1",
    chapter: "uct-12-mobile-hot-update",
    level: 1,
    question: "第 12 章 移动端热更新技术实现中，什么是“版本清单”？",
    answer: "描述发布版本、文件、依赖、大小、哈希和兼容条件的权威记录。",
    tags: ["第 12 章 移动端热更新技术实现", "原书复刻"],
  },
  {
    id: "uct-12-mobile-hot-update-2",
    chapter: "uct-12-mobile-hot-update",
    level: 2,
    question:
      "第 12 章 移动端热更新技术实现为什么必须保留原目录中的“热更新架构”？",
    answer: "它定义了本章独有的问题边界，不能被现代功能清单或别章内容替代。",
    tags: ["第 12 章 移动端热更新技术实现", "原书复刻"],
  },
  {
    id: "uct-12-mobile-hot-update-3",
    chapter: "uct-12-mobile-hot-update",
    level: 3,
    question: "第 12 章 移动端热更新技术实现的关键输入输出链是什么？",
    answer:
      "构建工具从固定提交生成平台包和版本清单，发布服务提供签名清单，客户端规划差分并下载到 staging，逐文件校验后执行脚本与资源烟雾测试，最后原子切换 current 指针；启动失败则回到 last-known-good。输出是版本状态机和完整更新日志。",
    tags: ["第 12 章 移动端热更新技术实现", "证据实验"],
  },
  {
    id: "uct-12-mobile-hot-update-4",
    chapter: "uct-12-mobile-hot-update",
    level: 4,
    question: "第 12 章 移动端热更新技术实现最有诊断价值的故障样本是什么？",
    answer:
      "边下载边覆盖 live 文件会在中断时留下混合版本，下一次启动无法判断真实状态。",
    tags: ["第 12 章 移动端热更新技术实现", "证据实验"],
  },
  {
    id: "uct-12-mobile-hot-update-5",
    chapter: "uct-12-mobile-hot-update",
    level: 1,
    question:
      "第 12 章 移动端热更新技术实现迁移到当前 Unity 时保留什么不变量？",
    answer:
      "书中的 AssetBundle 与 Lua 方案是历史基线；现代 Addressables 可管理目录和依赖，但脚本热更新、原子提交、签名和回滚仍需单独设计。",
    tags: ["第 12 章 移动端热更新技术实现", "证据实验"],
  },
  {
    id: "uct-12-mobile-hot-update-6",
    chapter: "uct-12-mobile-hot-update",
    level: 2,
    question: "第 12 章 移动端热更新技术实现签发前至少保存哪些证据？",
    answer:
      "验收包含构建版本与提交、包依赖图、签名清单、差分计划、断点续传、错误哈希、磁盘不足、脚本异常、冷启动烟雾测试、回滚结果、Lua 释放证明和平台政策记录。",
    tags: ["第 12 章 移动端热更新技术实现", "证据实验"],
  },
  {
    id: "uct-13-mobile-shader-techniques-1",
    chapter: "uct-13-mobile-shader-techniques",
    level: 1,
    question: "第 13 章 移动端 Shader 技术中，什么是“顶点阶段”？",
    answer: "对每个输入顶点执行变换并输出裁剪位置与插值数据的阶段。",
    tags: ["第 13 章 移动端 Shader 技术", "原书复刻"],
  },
  {
    id: "uct-13-mobile-shader-techniques-2",
    chapter: "uct-13-mobile-shader-techniques",
    level: 2,
    question:
      "第 13 章 移动端 Shader 技术为什么必须保留原目录中的“可编程渲染管线”？",
    answer: "它定义了本章独有的问题边界，不能被现代功能清单或别章内容替代。",
    tags: ["第 13 章 移动端 Shader 技术", "原书复刻"],
  },
  {
    id: "uct-13-mobile-shader-techniques-3",
    chapter: "uct-13-mobile-shader-techniques",
    level: 3,
    question: "第 13 章 移动端 Shader 技术的关键输入输出链是什么？",
    answer:
      "Mesh 属性和材质常量进入顶点阶段，裁剪位置与 varying 经光栅化插值进入片元阶段，纹理与光照生成颜色，深度与混合决定最终像素；构建过程生成目标平台变体。输出是画面以及编译、变体、Overdraw 和 GPU 捕获。",
    tags: ["第 13 章 移动端 Shader 技术", "证据实验"],
  },
  {
    id: "uct-13-mobile-shader-techniques-4",
    chapter: "uct-13-mobile-shader-techniques",
    level: 4,
    question: "第 13 章 移动端 Shader 技术最有诊断价值的故障样本是什么？",
    answer: "只看三角形数量而忽略大面积透明层，会低估片元次数与带宽成本。",
    tags: ["第 13 章 移动端 Shader 技术", "证据实验"],
  },
  {
    id: "uct-13-mobile-shader-techniques-5",
    chapter: "uct-13-mobile-shader-techniques",
    level: 1,
    question: "第 13 章 移动端 Shader 技术迁移到当前 Unity 时保留什么不变量？",
    answer:
      "书中 ShaderLab 和 Built-in 内置变量可迁移到 URP HLSL 库，但顶点、插值、片元、深度和混合的阶段模型保持不变。",
    tags: ["第 13 章 移动端 Shader 技术", "证据实验"],
  },
  {
    id: "uct-13-mobile-shader-techniques-6",
    chapter: "uct-13-mobile-shader-techniques",
    level: 2,
    question: "第 13 章 移动端 Shader 技术签发前至少保存哪些证据？",
    answer:
      "验收包含最小顶点片元 Shader、逐特性画面对照、精度边界样本、Overdraw 视图、变体清单、构建剥离日志、低中高设备 GPU 时间与一次帧捕获。",
    tags: ["第 13 章 移动端 Shader 技术", "证据实验"],
  },
  {
    id: "uct-14-game-development-experience-1",
    chapter: "uct-14-game-development-experience",
    level: 1,
    question: "第 14 章 游戏开发经验分享中，什么是“最小复现”？",
    answer: "去掉无关变量后仍稳定呈现故障的最小输入和步骤。",
    tags: ["第 14 章 游戏开发经验分享", "原书复刻"],
  },
  {
    id: "uct-14-game-development-experience-2",
    chapter: "uct-14-game-development-experience",
    level: 2,
    question: "第 14 章 游戏开发经验分享为什么必须保留原目录中的“调试经验”？",
    answer: "它定义了本章独有的问题边界，不能被现代功能清单或别章内容替代。",
    tags: ["第 14 章 游戏开发经验分享", "原书复刻"],
  },
  {
    id: "uct-14-game-development-experience-3",
    chapter: "uct-14-game-development-experience",
    level: 3,
    question: "第 14 章 游戏开发经验分享的关键输入输出链是什么？",
    answer:
      "发布流水线生成符号、包体分类和资源清单，安全门检查签名与敏感配置，客户端下载器按清单并发取得资源、校验后原子提交，资源管理器在主线程实例化并记录句柄；崩溃和性能指标带版本 ID 回传。输出是一份可诊断、可更新和可回滚的发布证据。",
    tags: ["第 14 章 游戏开发经验分享", "证据实验"],
  },
  {
    id: "uct-14-game-development-experience-4",
    chapter: "uct-14-game-development-experience",
    level: 4,
    question: "第 14 章 游戏开发经验分享最有诊断价值的故障样本是什么？",
    answer:
      "把客户端防破解描述为绝对安全，会掩盖密钥可提取与本地逻辑可修改的事实。",
    tags: ["第 14 章 游戏开发经验分享", "证据实验"],
  },
  {
    id: "uct-14-game-development-experience-5",
    chapter: "uct-14-game-development-experience",
    level: 1,
    question: "第 14 章 游戏开发经验分享迁移到当前 Unity 时保留什么不变量？",
    answer:
      "现代 Android App Bundle、iOS On-Demand Resources 与 Addressables 改变分发形式，但包体分类、资源峰值、完整性和回滚仍是稳定工程问题。",
    tags: ["第 14 章 游戏开发经验分享", "证据实验"],
  },
  {
    id: "uct-14-game-development-experience-6",
    chapter: "uct-14-game-development-experience",
    level: 2,
    question: "第 14 章 游戏开发经验分享签发前至少保存哪些证据？",
    answer:
      "验收包含真机最小复现、符号化结果、安全威胁模型、包体分类差分、动态对象加载释放快照、不同并发吞吐曲线、故障注入矩阵、完整性拒绝与最终发布清单。",
    tags: ["第 14 章 游戏开发经验分享", "证据实验"],
  },
  {
    id: "uct-official-final-review-1",
    chapter: "uct-official-final-review",
    level: 1,
    question: "全书综合验收中，什么是“垂直切片”？",
    answer: "贯通关键玩法、内容、技术和发布链的最小完整产品片段。",
    tags: ["全书综合验收", "原书复刻"],
  },
  {
    id: "uct-official-final-review-2",
    chapter: "uct-official-final-review",
    level: 2,
    question: "全书综合验收为什么必须保留原目录中的“数学与Avatar装配验收”？",
    answer: "它定义了本章独有的问题边界，不能被现代功能清单或别章内容替代。",
    tags: ["全书综合验收", "原书复刻"],
  },
  {
    id: "uct-official-final-review-3",
    chapter: "uct-official-final-review",
    level: 3,
    question: "全书综合验收的关键输入输出链是什么？",
    answer:
      "固定构建和设备启动垂直切片，输入依次穿过MVC、FSM、行为树和消息协议，角色与三类效果消费运行时数据，热更新与下载维护资源版本，Shader和Profiler提供GPU证据；每个故障都通过契约图回到最早失败输入。输出是可安装包、可回滚内容与全链证据。",
    tags: ["全书综合验收", "证据实验"],
  },
  {
    id: "uct-official-final-review-4",
    chapter: "uct-official-final-review",
    level: 4,
    question: "全书综合验收最有诊断价值的故障样本是什么？",
    answer:
      "只演示最终画面而不保存中间契约、版本和失败样本，不能证明十四章真正连接。",
    tags: ["全书综合验收", "证据实验"],
  },
  {
    id: "uct-official-final-review-5",
    chapter: "uct-official-final-review",
    level: 1,
    question: "全书综合验收迁移到当前 Unity 时保留什么不变量？",
    answer:
      "总验收以2017年原书问题为历史基线，以当前Unity载体和目标移动设备重放；任何现代替代都要写出不可等价处。",
    tags: ["全书综合验收", "证据实验"],
  },
  {
    id: "uct-official-final-review-6",
    chapter: "uct-official-final-review",
    level: 2,
    question: "全书综合验收签发前至少保存哪些证据？",
    answer:
      "签发要求14/14原章覆盖、16/16页面不低于90分、96题唯一、7个导航分组准确、定向与全库MDX零错误；产品证据还要包含契约图、真机帧捕获、包体内存、更新烟雾测试和回滚。",
    tags: ["全书综合验收", "证据实验"],
  },
];
