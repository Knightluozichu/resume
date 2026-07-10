import type { ReviewQuestion } from "./types";

/** 数据局部性复习题 */
export const gppDataLocalityQuestions: ReviewQuestion[] = [
  {
    id: "gpp-data-locality-01",
    chapter: "gpp-data-locality",
    level: 1,
    question: `数据局部性（Data Locality）模式的意图是什么？`,
    answer:
      `意图：把「会被一起访问的数据」在内存中连续排列，让 CPU cache 能高效命中，避免因数据分散导致的 cache miss 性能损失。\n\n核心原理：\n- 现代 CPU 访问内存比访问 cache 慢 100~1000 倍。CPU 读内存时不是按字节读，而是按「cache line」（通常 64 字节）整块读入 cache。\n- 如果接下来访问的数据在同一个 cache line（即内存连续），直接命中 cache，极快。\n- 如果数据散布在堆各处（如每个对象 new 在不同地址），每次访问都可能 miss，要去内存取，慢且费电。\n\n模式做法：\n- 把同类实体的关键数据放进连续数组（而非每个对象独立分配在堆上）。\n- 遍历更新时按数组顺序访问，cache line 预取后续数据，命中率高。\n\n解决的问题：\n- 传统 OOP「每个对象独立封装、散布在堆上」，遍历时 cache miss 严重。\n- 同屏上万实体（粒子、子弹、敌人）时，cache miss 成为性能瓶颈，比算法复杂度更致命。\n\n一句话：数据局部性是「为 CPU cache 优化数据布局」——让数据排列方式匹配访问模式，把 cache 命中率从「碰运气」变成「必然」。`,
    tags: ["意图", "cache", "连续内存", "cache line"],
  },
  {
    id: "gpp-data-locality-02",
    chapter: "gpp-data-locality",
    level: 2,
    question: `AoS（Array of Structures）与 SoA（Structure of Arrays）有什么区别？`,
    answer:
      `AoS（Array of Structures，结构体数组）：\n- 每个实体的所有字段打包成一个结构体，多个结构体组成数组。\n- 例如 \`struct Particle { x, y, vx, vy, color, life }\`，数组为 \`[P1, P2, P3, ...]\`，内存里字段交错排列：\`[x1,y1,vx1,vy1,c1,l1, x2,y2,vx2,vy2,c2,l2, ...]\`。\n- 符合 OOP 直觉（一个对象封装所有字段），易于理解和操作单个实体。\n- 遍历时：若只更新 \`x, y\`（位置），但 cache line 会把 \`color, life\` 也一起载入——只用到部分字段，cache 利用率低（载入的没全用，浪费带宽）。\n\nSoA（Structure of Arrays，数组结构体）：\n- 把每个字段拆成独立数组，所有实体的同一字段连续存放。\n- 例如 \`xs: [x1,x2,x3,...]\`、\`ys: [y1,y2,y3,...]\`、\`vxs: [vx1,vx2,vx3,...]\` 等独立数组。\n- 遍历更新位置时只读 \`xs, ys, vxs, vys\` 数组——这四个数组各自连续，cache line 全是有效数据，命中率高。\n- 适合 SIMD：四个连续 float 数组可直接用 SIMD 指令一次处理 4/8 个实体的同字段，批量加速。\n- 缺点：操作单个实体要跨多个数组（\`particles.xs[i], particles.ys[i]\`），不直观；增删实体要同步改所有数组。\n\n对比：\n- 内存布局：AoS 字段交错，SoA 字段分列。\n- cache 友好度：只访问部分字段时 SoA 更优（不浪费 cache line 载入无用字段）；访问全部字段时两者相近。\n- SIMD 友好度：SoA 天然适合（同字段连续可向量化），AoS 难（字段交错）。\n- 可读性：AoS 直观（一个对象一个实体），SoA 分散（实体身份隐式）。\n- 增删：AoS 整体增删一个结构体简单；SoA 要在多个数组同步增删，易出错。\n\n混合形态：\n- AoSoA（Array of Structures of Arrays）：分块——每 16 个实体一组，组内 SoA，组间数组。兼顾 SIMD 友好和局部性，是 DOD 框架常用布局。\n- 按访问模式分组：经常一起读的字段放一个结构体（如 position+velocity），少用的字段（如 color）单独数组——按「热字段/冷字段」分离（hot/cold splitting）。\n\n选择：遍历密集、只访问部分字段、需 SIMD → SoA；随机访问单实体、字段都用 → AoS。游戏粒子/物理等热路径普遍用 SoA。`,
    tags: ["AoS", "SoA", "内存布局", "SIMD", "cache友好"],
  },
  {
    id: "gpp-data-locality-03",
    chapter: "gpp-data-locality",
    level: 3,
    question:
      `设计一个游戏粒子系统，用 SoA 布局让遍历更新时 cache 友好。对比 AoS 的问题。`,
    answer:
      `AoS 的问题：\n结构体 \`Particle\` 含热字段 \`x, y, vx, vy, life\`（每帧更新）和冷字段 \`color, textureId, size\`（更新时不碰）。每个 Particle 结构体约 60+ 字节，但每帧更新只读写约 40 字节的热字段。cache line 载入一个 Particle 时把冷字段也载入了——本帧无用，浪费 cache 带宽。对象散布在堆，遍历时地址跳跃，预取失效，miss 多。无法 SIMD：x,y 交错在结构体里，不能一次取 4 个 x 做向量运算。\n\nSoA 设计：\n\`ParticleSystem\` 持有热字段数组（\`xs\`, \`ys\`, \`vxs\`, \`vys\`, \`lifes\`，均为 \`Float32Array\`）和冷字段数组（\`colors\`, \`textureIds\`, \`sizes\`），以及 \`count\` 计数。\n\n\`update(dt)\` 只遍历热字段数组：\`xs[i] += vxs[i] * dt\`、\`ys[i] += vys[i] * dt\`、\`lifes[i] -= dt\`。每个数组纯 float 连续，cache line 载入的全是有效数据，命中率极高。预取生效：顺序访问，CPU 硬件预取器提前拉入后续 cache line。SIMD 可行：\`xs[i] += vxs[i]*dt\` 可用 SIMD 一次处理 4~8 个粒子。冷字段不干扰——更新阶段 cache 完全不被 color/textureId 污染。TypedArray 本身保证内存连续无空洞，比对象数组更紧凑。\n\n\`render()\` 才碰冷字段：\`draw(xs[i], ys[i], colors[i*4..], sizes[i])\`。\n\n效果对比：\n- AoS：1 万粒子，每帧更新 cache miss 率高，假设 100ns/miss，总开销大。\n- SoA：同样 1 万粒子，热字段数组连续，miss 率极低，总开销可能降到 1/3~1/5。\n\n注意事项：\n1. 增删粒子：用「swap-remove」——删除第 i 个时把最后一个粒子数据复制到 i 位置，count--。保持数组紧凑无空洞（不能留 gap，否则遍历要跳过，cache 失效）。\n2. 容量预分配：TypedArray 固定长度，按 MAX 预分配，超了要扩容重建（或限制最大粒子数）。\n3. 热冷分离粒度：如果某冷字段偶尔也更新（如颜色随生命渐变），要权衡是否归入热组——按「更新频率」而非「字段类型」分组。\n\n这正是 ECS/DOD 框架的核心数据布局——组件数据按 SoA 连续存储，系统批量遍历处理，现代游戏引擎（Unity DOTS、Bevy）都采用此思路。`,
    tags: ["应用", "粒子系统", "SoA", "热冷分离", "TypedArray", "swap-remove"],
  },
  {
    id: "gpp-data-locality-04",
    chapter: "gpp-data-locality",
    level: 4,
    question: `数据局部性如何与 OOP 封装冲突？在实践中如何权衡？`,
    answer:
      `冲突的本质：\nOOP 封装主张「把一个实体的所有状态和行为打包在对象里」，数据局部性主张「把同类数据连续排列以利 cache」。两者方向相反。\n\n具体冲突点：\n\n1. 数据布局：\n- OOP：\`class Particle { x, y, vx, vy, color, life }\`——一个对象的字段聚在一起，多对象在堆上散布。\n- 数据局部性：\`xs[], ys[], vxs[]...\`——同字段聚在一起，跨实体连续。\n- OOP 的「封装」让一个实体的数据物理上聚拢，却让「同字段跨实体」散布——而遍历正是按字段跨实体访问的，cache 不友好。\n\n2. 访问接口：\n- OOP：\`particle.update(dt)\` 操作自己的字段，天然只碰一个对象的数据。\n- 数据局部性：\`system.update(particles, dt)\` 批量处理所有粒子的某字段，跨对象访问。\n- OOP 的「对象自洽」与「批量同字段处理」相悖——对象方法天然是「逐对象」的，无法批量。\n\n3. 虚函数与间接：\n- OOP 多态用虚函数表，每次调用是间接跳转，破坏分支预测，且对象指针散布。\n- 数据局部性要直接函数调用 + 连续数据，虚函数拖累。\n\n4. 封装边界：\n- OOP 把字段设 \`private\`，外部不能直接访问，只能通过方法——方法有调用开销，且系统无法直接批量读写字段。\n- 数据局部性要系统直接操作裸数据数组，绕过封装。\n\n权衡实践：\n\n1. 按性能热度分层：\n- 热路径（粒子、物理、碰撞，每帧遍历上万实体）：放弃 OOP 封装，用 SoA + 系统批量处理。数据公开给系统直接操作。这是 ECS/DOD 的领域。\n- 冷路径（技能、UI、存档，偶发调用）：保留 OOP 封装，享受可维护性。数据局部性收益小，不值得牺牲架构。\n- 不要全局一刀切——按「是否性能瓶颈」分区选用。\n\n2. ECS 作为调和：\n- ECS（Entity-Component-System）本质是「数据局部性 + 组件」的工业化：实体只是 ID，组件是纯数据（SoA 存储），系统批量处理组件数据。\n- 它放弃了「对象=数据+行为」的 OOP 封装，把行为从对象移到系统，数据公开给系统。\n- 换来的是 cache 友好 + SIMD + 并行。代价是失去 OOP 的「对象自洽」，调试时数据流跨系统。\n- 适合大规模实体；小规模用 OOP 仍清晰。\n\n3. 保持「逻辑封装」换「物理布局」：\n- 逻辑上仍可面向对象设计（Particle 概念清晰），物理存储用 SoA。\n- 提供「视图」API：\`particles.getView(i)\` 返回一个临时对象封装第 i 个粒子的字段访问，写起来像 OOP，底层是 SoA 索引。兼顾可读性与性能。\n\n4. 性能测量驱动：\n- 不要为「可能」的性能优化预先牺牲封装。先用 OOP 实现，Profiler 发现 cache miss 是瓶颈时，再对热点做 SoA 化重构。\n- 「封装是默认，SoA 是优化」——按需引入，而非全局 DOD。\n\n5. 团队认知成本：\n- OOP 是大众熟悉的范式，SoA/DOD 需要团队学习成本。小团队/原型期优先 OOP 保迭代速度；大团队/性能敏感产品期才引入 DOD。\n\n一句话：数据局部性与 OOP 封装在「数据如何组织」上根本对立。实践不是二选一，而是「按性能热度分层」——热路径让位给数据布局（SoA/ECS），冷路径保留 OOP 封装。用 Profiler 划界，按需优化，避免过早放弃封装。`,
    tags: ["综合", "OOP封装", "冲突", "ECS", "DOD", "分层权衡", "Profiler"],
  },
];
