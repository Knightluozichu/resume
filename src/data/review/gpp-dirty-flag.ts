import type { ReviewQuestion } from "./types";

/** 脏标记复习题 */
export const gppDirtyFlagQuestions: ReviewQuestion[] = [
  {
    id: "gpp-dirty-flag-01",
    chapter: "gpp-dirty-flag",
    level: 1,
    question: `脏标记（Dirty Flag）模式的意图是什么？`,
    answer:
      `意图：用一个布尔标志记录「某状态是否已变化但尚未同步」，避免对未变化的状态做重复的、昂贵的同步计算。\n\n核心思路：\n- 维护一个 \`dirty\` 标志，初始为 false（干净）。\n- 状态被修改时，把 \`dirty\` 置为 true（标脏）。\n- 需要用到「派生结果」（如根据状态算出的变换矩阵、渲染数据）时，先检查 \`dirty\`：\n  - dirty=true → 重新计算派生结果，然后清 dirty（标干净）。\n  - dirty=false → 直接用上次缓存的派生结果，跳过计算。\n\n解决的问题：\n- 某些派生数据计算昂贵（如场景图的全局变换矩阵、物理体的边界盒），但源状态并非每帧都变。\n- 若每帧无条件重算，大部分计算是浪费（状态没变也算）。\n- 脏标记让计算「按需触发」——只有状态真正变了才算，没变就用缓存。\n\n典型用途：场景图变换缓存、UI 布局重算、编译器增量编译、ORM 脏字段更新、前端框架 diff。`,
    tags: ["意图", "按需计算", "避免重复", "缓存"],
  },
  {
    id: "gpp-dirty-flag-02",
    chapter: "gpp-dirty-flag",
    level: 2,
    question: `脏标记的完整工作流程是什么（修改→标脏→按需同步→清标）？`,
    answer:
      `四个阶段构成闭环：\n\n1. 修改源状态（标脏）：\n\`\`\`\nclass Node {\n  private _localX = 0\n  private _dirty = true   // 初始脏，因为还没算过世界变换\n  setLocalX(x) {\n    if (this._localX !== x) {\n      this._localX = x\n      this._dirty = true   // 源变了，标记需要重新同步\n      // 子节点也要标脏（因为父变了它们的世界变换也失效）\n      this.markChildrenDirty()\n    }\n  }\n}\n\`\`\`\n- 任何修改源状态的操作都置 dirty=true。\n- 若派生结果依赖其他对象（如子节点依赖父节点），连带标脏依赖链。\n\n2. 按需同步（检查并重算）：\n\`\`\`\ngetWorldTransform() {\n  if (this._dirty) {\n    // 真正昂贵的计算放这里，只在脏时执行\n    this._worldTransform = this.parent.getWorldTransform().multiply(this.localTransform)\n    this._dirty = false   // 算完清标\n  }\n  return this._worldTransform   // 干净时直接返回缓存\n}\n\`\`\`\n- 需要派生结果时才触发计算——没人要就不算（惰性）。\n- dirty=false 时直接返回缓存，O(1)。\n\n3. 清标：\n- 重算完成后 \`dirty = false\`，表示派生结果已是最新，与源状态一致。\n- 下次再要派生结果，若源没变，直接用缓存。\n\n4. 再次修改回到阶段 1：\n- 源状态又变 → 重新标脏 → 下次同步时重算 → 清标……循环。\n\n时序示例：\n\`\`\`\nnode.setLocalX(10)   // dirty=true\nnode.getWorldTransform()  // 重算，dirty=false（耗时）\nnode.getWorldTransform()  // 用缓存，跳过计算（快）\nnode.getWorldTransform()  // 用缓存（快）\nnode.setLocalX(20)   // dirty=true\nnode.getWorldTransform()  // 重算，dirty=false（耗时）\n\`\`\`\n- 多次查询但状态没变 → 只算一次，其余用缓存。\n- 状态频繁变但很少查 → 因为「按需」，不查就不算，省掉无谓计算。\n\n关键点：\n- 脏标记是「惰性求值」的标志位——把计算推迟到「真正需要时」且「只在变化后第一次需要时」。\n- 适合「写多读少」或「读写都多但变化不频繁」的场景。若每次读前都改了（永远脏），标记无收益，反而多一次判断开销。`,
    tags: ["工作流程", "标脏", "按需同步", "清标", "惰性求值"],
  },
  {
    id: "gpp-dirty-flag-03",
    chapter: "gpp-dirty-flag",
    level: 3,
    question:
      `游戏中场景图的变换如何用脏标记优化，避免每帧重算所有节点的世界变换？`,
    answer:
      `问题（不用脏标记）：\n场景图是树形结构，每个节点有 localTransform（相对父节点）和 worldTransform（相对世界）。\nworldTransform = parent.worldTransform × localTransform。\n若每帧无条件递归重算所有节点的 worldTransform：N 个节点 O(N) 计算，但大部分节点本帧没移动，重算是浪费。场景大（几千节点）时开销显著。\n\n用脏标记优化：\n\n1. 节点结构：\n\`\`\`\nclass SceneNode {\n  localTransform: Matrix\n  worldTransform: Matrix   // 缓存\n  dirty: boolean = true\n  children: SceneNode[]\n\n  setLocalTransform(m: Matrix) {\n    this.localTransform = m\n    this.markDirty()   // 自己脏，并传播给子树\n  }\n\n  private markDirty() {\n    if (!this.dirty) {       // 已经脏就不重复传播（避免冗余）\n      this.dirty = true\n      for (child of this.children) child.markDirty()  // 子节点世界变换也失效\n    }\n  }\n\n  updateWorldTransform(parentWorld: Matrix) {\n    if (this.dirty) {\n      this.worldTransform = parentWorld.multiply(this.localTransform)\n      // 注意：子节点在本节点变脏时已被 markDirty，这里不重复标\n    }\n    // 子节点：若本节点脏，子节点一定也脏（已传播）；若本节点干净，子节点可能独立脏\n    for (child of this.children) {\n      child.updateWorldTransform(this.worldTransform)\n    }\n    this.dirty = false\n  }\n}\n\`\`\`\n\n2. 每帧调用：\n\`\`\`\nroot.updateWorldTransform(identityMatrix)\n\`\`\`\n- 遍历整棵树，但只在 \`dirty=true\` 的节点做矩阵乘法，干净节点跳过乘法直接用缓存 worldTransform。\n- 仍遍历所有节点（O(N)），但「重算」只发生在脏节点——大部分静止节点 dirty=false，跳过昂贵乘法。\n\n3. 效果：\n- 静态场景：只有首次全脏算一遍，之后每帧所有节点 dirty=false，遍历 O(N) 但无乘法，极快。\n- 动一个节点：只有该节点及其子树被标脏，下帧只有这棵子树重算，其余跳过。\n- 相比「每帧全量重算」，省掉了未变化节点的矩阵乘法。\n\n4. 进一步优化——传播剪枝：\n- \`markDirty\` 里 \`if (!this.dirty)\` 判断：若节点已脏，子树必然也已脏（上次传播过），不再重复向下传播。这避免了「同一帧多次改同一节点」导致的重复标脏遍历。\n- 子节点的 \`updateWorldTransform\` 即使本节点不脏也要递归（子节点可能独立脏）。可进一步用「子树整体脏标志」剪枝——若整棵子树都干净，直接跳过不递归。\n\n5. 注意点：\n- 渲染时取 worldTransform，确保 update 已跑过（否则可能取到旧值）。\n- 节点删除/重挂父节点时，新子树要 markDirty。\n- 矩阵乘法虽不算极贵，但几千节点 ×60fps 累积可观，脏标记能省 90%+ 计算（静态场景）。\n\n这就是 Unity、Godot 等引擎场景图变换的标准优化——Transform 组件的 \`hasChanged\` 标志本质就是脏标记。`,
    tags: ["应用", "场景图", "变换矩阵", "子树传播", "剪枝"],
  },
  {
    id: "gpp-dirty-flag-04",
    chapter: "gpp-dirty-flag",
    level: 4,
    question: `脏标记模式有哪些内存开销和延迟同步的风险？如何应对？`,
    answer:
      `内存开销：\n\n1. 标志位本身：\n- 每个被追踪对象多一个布尔字段（1 字节，但因对齐可能占 4~8 字节）。对象多时累积，但通常可忽略。\n\n2. 缓存的派生数据：\n- 脏标记的目的是缓存「派生结果」（如 worldTransform 矩阵 64 字节、边界盒 32 字节）。每个对象都要存这份缓存，即使很少用——内存换时间。\n- 若派生数据体积大（如复杂几何体的预计算数据）且对象多，缓存内存可观。\n\n3. 标志膨胀：\n- 复杂对象可能有多种独立的派生数据（变换矩阵、边界盒、渲染数据），每种各需一个脏标志。标志多了管理繁琐，易遗漏标脏。\n- 应对：按「派生数据依赖的源字段组」分组标志，而非每个字段一个标志。或用位掩码压缩多个标志到一个整数。\n\n延迟同步的风险：\n\n1. 读取到过期数据：\n- 脏标记是「惰性」的——源变了但派生结果还没重算（直到下次访问触发）。若在「源已改但派生未同步」的窗口期读取派生数据，读到的是旧的过期值。\n- 风险场景：改了节点位置（标脏），立刻读 worldTransform（若实现是「读时重算」则安全；若是「帧末统一同步」则读到旧值）。\n- 应对：明确「同步时机」契约——读时同步（getWorldTransform 内检查 dirty）保证读到最新；帧末同步则要求使用者在同步后读。\n\n2. 同步遗漏：\n- 某个修改路径忘了标脏，派生数据永远不更新，导致「改了没效果」的诡异 bug。\n- 应对：把「修改源」的入口收敛到 setter，setter 内强制标脏；禁止直接改字段（封装）。加自动化测试覆盖所有修改路径。\n\n3. 传播链断裂：\n- 依赖其他对象的派生数据（如子节点依赖父节点），改父节点时若忘了把子节点标脏，子节点用旧父变换算新 worldTransform，结果错误。\n- 应对：markDirty 必须递归传播到所有依赖者；增删依赖关系时重新建立传播链。\n\n4. 脏标志堆积（永远脏）：\n- 若状态每帧都变（如动画驱动的节点），dirty 永远 true，脏标记无收益，反而多一次判断开销。\n- 应对：识别「高频变化」对象，这类对象脏标记无效，考虑「直接每帧重算」或换更细粒度的增量更新。\n\n5. 同步时机与帧一致性：\n- 帧内多次修改：每次标脏，但只在某次访问时重算一次——中间修改被合并，符合预期。\n- 跨系统读取：系统 A 改了状态（标脏），系统 B 在同步前读了旧值做决策——可能逻辑错乱。需约定「统一同步点」（如帧末 update 后、render 前）让所有系统读到一致状态。\n\n6. 调试困难：\n- 「为什么这个节点的变换没更新？」——可能是漏标脏，但脏标志是隐式状态，难以可视化排查。\n- 应对：调试模式可视化 dirty 状态、记录标脏/清标的调用栈；加断言「同步后 dirty 必为 false」。\n\n综合应对原则：\n- 收敛修改入口到 setter，强制标脏，防遗漏。\n- 明确同步时机契约（读时同步 or 帧末同步），文档化。\n- 传播链完整，递归标脏依赖者。\n- 对「永远脏」的高频对象识别并豁免（直接重算）。\n- 调试工具支持 dirty 状态可视化。\n\n脏标记是「用内存（缓存+标志）和复杂度（同步逻辑）换计算时间」的权衡。适合「变化不频繁、派生计算昂贵」的场景；变化频繁时收益消失，反而增加维护负担——此时应回归直接计算或更精细的增量策略。`,
    tags: ["综合", "内存开销", "延迟同步", "过期数据", "传播链", "风险应对"],
  },
];
