import type { ReviewQuestion } from "./types";

/** 更新方法复习题 */
export const gppUpdateMethodQuestions: ReviewQuestion[] = [
  {
    id: "gpp-update-method-01",
    chapter: "gpp-update-method",
    level: 1,
    question: `更新方法（Update Method）的意图是什么？`,
    answer:
      `意图：每帧给游戏世界中的每个实体一次「更新自己」的机会，让所有实体看起来在同时、持续地活动。\n\n具体来说：\n- 每个实体（敌人、子弹、粒子、NPC）实现一个 \`update(dt)\` 方法。\n- 游戏循环每帧遍历所有实体，依次调用它们的 \`update(dt)\`。\n- 每个实体在 \`update\` 里推进自己的状态——移动、改动画帧、执行 AI、倒计时等。\n\n效果：\n- 把「世界持续运动」拆成「每个对象自己每帧动一点」，模拟出并行感（实际是串行调用，但帧率够高时玩家感觉是同时的）。\n- 是实现「实时模拟」的基础模式，几乎所有游戏引擎的实体系统都建立在其上。\n\n一句话：更新方法让「让世界动起来」这件事变成「每帧挨个问每个对象：该你了，动一下」。`,
    tags: ["意图", "每帧更新", "实体"],
  },
  {
    id: "gpp-update-method-02",
    chapter: "gpp-update-method",
    level: 2,
    question: `更新方法与游戏循环是什么关系？`,
    answer:
      `两者是「骨架」与「血肉」的关系——游戏循环是时间骨架，更新方法是填在骨架上的实体调度。\n\n游戏循环负责「时间节奏」：\n- 决定每帧推进多少游戏时间（固定步/可变步）。\n- 每帧调用：\`processInput()\` → \`update(dt)\` → \`render()\`。\n- 它本身不关心世界里有谁、谁该怎么动。\n\n更新方法负责「世界内容」：\n- \`update(dt)\` 这一步的具体实现就是「遍历所有实体，调用 \`entity.update(dt)\`」。\n- 每个实体自己决定怎么动。\n\n协作流程：\n\`\`\`\nwhile (running) {\n  processInput()\n  for (entity of entities) {\n    entity.update(dt)   // ← 更新方法填在这里\n  }\n  render()\n}\n\`\`\`\n\n分层视角：\n- 游戏循环 = 顶层时间驱动器（一个游戏只有一个）。\n- 更新方法 = 实体级的时间响应接口（每个实体一个 \`update\`）。\n- 游戏循环调「集合的 update」，集合再 fan-out 到每个实体的 \`update\`。\n\n可以说：更新方法是游戏循环在「实体维度」的展开。没有游戏循环，update 没人调用；没有更新方法，游戏循环的 update 步骤不知道该动谁。两者一起构成实时模拟的最小闭环。`,
    tags: ["关系", "游戏循环", "调度", "分层"],
  },
  {
    id: "gpp-update-method-03",
    chapter: "gpp-update-method",
    level: 3,
    question:
      `在遍历实体调用 update 时，实体可能被新增或删除（如子弹击中敌人后两者都消失、新子弹生成），如何安全处理这种「遍历中增删」问题？`,
    answer:
      `直接在遍历中增删集合会导致迭代器失效、跳过元素、越界崩溃。常见解法：\n\n1. 双缓冲集合（延迟增删）：\n- 维护两个列表：\`currentEntities\`（本帧遍历的）和 \`pendingAdd\` / \`pendingRemove\`。\n- 遍历时只读 \`currentEntities\`，增删操作只往 pending 队列里塞。\n- 一帧遍历结束后，统一 apply：把 pendingAdd 加进集合，把 pendingRemove 删掉。\n- 优点：遍历期间集合稳定，绝对安全。\n- 缺点：新增的实体下一帧才生效（一帧延迟，通常可接受）。\n\n2. 标记删除 + 遍历后清理：\n- 实体加一个 \`isAlive\` 标志，删除时不立刻移除，而是 \`entity.isAlive = false\`。\n- 遍历时跳过 \`!isAlive\` 的，遍历结束后统一 \`entities = entities.filter(e => e.isAlive)\`（或 swap-remove）。\n- 新增的可以先放 pendingAdd，下帧加入。\n\n3. 倒序遍历 + swap-remove（就地删除）：\n- 如果只删不增，可以从后往前遍历，删除时用「末尾元素填补空洞」的 swap-remove，O(1) 删除且不影响未遍历部分。\n- 注意：swap-remove 会改变顺序，若 update 顺序敏感则不能用。\n\n4. 不变快照遍历：\n- 遍历前复制一份集合 \`for (e of [...entities])\`，遍历快照。原集合的增删不影响遍历。\n- 缺点：每帧拷贝有开销，实体多时不划算。\n\n推荐做法（综合）：\n- 用方案 1（pending 队列）处理新增——新实体下帧生效，安全且简单。\n- 用方案 2（isAlive 标记）处理删除——遍历后统一清理，避免遍历中修改。\n- 这也是 Unity 等引擎的标准做法：\`Destroy()\` 实际是延迟到帧末执行。\n\n关键原则：遍历期间集合结构不变，所有结构变更延迟到遍历结束后统一 apply。`,
    tags: ["应用", "遍历增删", "迭代器安全", "延迟删除", "pending队列"],
  },
  {
    id: "gpp-update-method-04",
    chapter: "gpp-update-method",
    level: 4,
    question:
      `更新方法有哪些性能风险（大量实体每帧更新）？如何缓解？`,
    answer:
      `性能风险：\n\n1. 每帧 O(N) 遍历开销：\n实体多（同屏上万）时，光是遍历调用 \`update\` 就有开销，尤其虚函数调用无法内联，每实体一次间接跳转破坏分支预测。\n\n2. cache 不友好：\n每个实体是独立对象（堆上散布），\`update\` 访问的字段分散，cache miss 严重。OOP 的「封装」让相关数据不连续。\n\n3. 空闲实体白跑：\n很多实体本帧其实没变化（静止的箱子、远处不动的 NPC），却仍被 \`update\` 调用，白白消耗 CPU。\n\n4. 同质操作无法批量：\n每个实体各自 \`update\`，编译器无法把「1000 颗子弹的位移」优化成 SIMD 批量计算。\n\n5. 增删管理的额外开销：\npending 队列、isAlive 检查、遍历后清理，都有常量开销。\n\n缓解策略：\n\n1. 数据局部性（Data Locality 模式）：\n- 把实体的关键数据按 SoA 连续存储（所有位置 x 连续、所有速度 v 连续），遍历时 cache 友好，可 SIMD。\n- 这正是 ECS 架构的核心——牺牲 OOP 封装换数据连续性。\n\n2. 空间分区剔除（Spatial Partition）：\n- 远离玩家/视锥的实体不更新或降频更新（LOD for update）。\n\n3. 脏标记避免空转（Dirty Flag 模式）：\n- 静止实体标「干净」，\`update\` 直接 return；状态变了才标「脏」真正计算。\n\n4. 分桶/分频更新：\n- 不是所有实体都需要每帧更新。远处的敌人 10 帧更新一次，粒子每帧更新，UI 0.5 秒更新一次。\n- 按更新频率分桶，每帧只跑对应桶。\n\n5. 对象池减少分配：\n- 实体频繁增删时用对象池，避免 GC 压力拖垮 update 循环。\n\n6. 多线程并行更新：\n- 把实体分片，多线程并行 \`update\`（需保证实体间无数据依赖，或用批处理隔离）。\n- ECS 框架（如 Unity DOTS）天然适合 job 化并行。\n\n7. 避免虚函数——用数组+函数指针/switch：\n- 热点实体的 update 不用虚函数，改用按类型分组的数组 + 直接函数调用，便于内联和 SIMD。\n\n综合判断：更新方法简单通用，适合中小规模实体；当实体量级上万、性能吃紧时，逐步引入数据局部性、分频更新、并行化——这就是从「传统 OOP 实体」演进到「ECS/DOD」的路径。本书把更新方法列为基础模式，把数据局部性列为优化模式，正是这个演进关系。`,
    tags: ["综合", "性能风险", "cache", "DOD", "ECS", "优化"],
  },
];
