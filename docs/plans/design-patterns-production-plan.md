# 设计模式课程生产计划

> 书 slug：`design-patterns`
> 显示名：设计模式：GoF 23 模式图解
> 来源：GoF《设计模式》+ Head First Design Patterns（合并为一门课程）
> 分支：`feature/edu-design-patterns-foundation`
> 生成时间：2026-07-07

---

## 一、材料结构拆解

GoF 23 模式按三大类组织，Head First 以故事驱动覆盖其中核心子集。合并策略：以 GoF 分类为骨架，以 Head First 教学法为血肉。

### 1.1 章节结构（5 篇 27 章）

| 篇 | section 名 | 章节 | 章节 slug | 类型 | 核心图解 |
|----|-----------|------|----------|------|---------|
| 入门 | 设计模式入门 | 全书学习地图 | learning-map | A | 23 模式全景图 + 关系网 |
| | | 什么是设计模式 | intro | A | 问题→模式→解决 + SOLID 原则图 |
| 创建型 | 创建型模式 | 单例模式 | singleton | A | 实例唯一性 + 线程安全对比 |
| | | 工厂方法模式 | factory-method | A | 简单工厂→工厂方法演进 |
| | | 抽象工厂模式 | abstract-factory | D | 工厂方法 vs 抽象工厂 |
| | | 建造者模式 | builder | A | 分步构建流程图 |
| | | 原型模式 | prototype | A | 原型克隆 vs new 对比 |
| 结构型 | 结构型模式 | 适配器模式 | adapter | A | 不兼容接口转换图 |
| | | 桥接模式 | bridge | A | 抽象与实现分离 |
| | | 组合模式 | composite | A | 树形结构统一处理 |
| | | 装饰器模式 | decorator | A | 包装链动态扩展 |
| | | 外观模式 | facade | A | 复杂子系统简化入口 |
| | | 享元模式 | flyweight | A | 共享细粒度对象 |
| | | 代理模式 | proxy | A | 访问控制中间层 |
| 行为型 | 行为型模式 | 责任链模式 | chain-of-responsibility | A | 请求沿链传递 |
| | | 命令模式 | command | A | 请求封装为对象 |
| | | 解释器模式 | interpreter | A | 文法规则树 |
| | | 迭代器模式 | iterator | A | 遍历统一接口 |
| | | 中介者模式 | mediator | A | 多对多→星型通信 |
| | | 备忘录模式 | memento | A | 状态快照与恢复 |
| | | 观察者模式 | observer | A | 一对多依赖通知 |
| | | 状态模式 | state | A | 状态驱动行为切换 |
| | | 策略模式 | strategy | A | 算法族可互换 |
| | | 模板方法模式 | template-method | A | 骨架+钩子 |
| | | 访问者模式 | visitor | A | 双分派操作 |
| 复合 | 复合与总复习 | 复合模式 | compound-patterns | A | MVC = Observer+Strategy+Composite |
| | | 全书总复习 | final-review | A | 23 模式关系网 + 选型决策树 |

### 1.2 教学顺序

侧边栏按 GoF 分类（创建型→结构型→行为型）排列，但**学习地图推荐路径**按 Head First 直觉顺序：

```
入门 → 策略（最直观的"封装变化"）→ 观察者（最直观的"松耦合"）→ 装饰器（最直观的"开放扩展"）
→ 工厂方法 → 单例 → 命令 → 适配器+外观 → 模板方法 → 迭代器+组合 → 状态 → 代理
→ 其余创建型/结构型/行为型 → 复合模式 → 总复习
```

---

## 二、可视化组件体系

### 2.1 通用组件（可跨章复用）

| 组件 | 用途 | 形态 |
|------|------|------|
| `PatternClassDiagram` | UML 类关系图 | SVG，可高亮角色 |
| `PatternSequenceDiagram` | 对象协作时序图 | SVG + Stepper 分步 |
| `BeforeAfterCompare` | 模式前后对比 | CompareSlider 或并排 |
| `PatternDecisionTree` | "何时用哪个模式"决策树 | SVG 交互 |
| `PatternCategoryMap` | 23 模式全景分类图 | SVG |

### 2.2 章节专属组件（按需建）

每个模式章至少 1 个专属图解组件，放在 `src/components/mdx/design-patterns/diagrams/`。

优先策略：
- 能用通用组件 + props 差异化 → 不建新组件
- 模式有独特结构（如装饰器包装链、责任链传递）→ 建专属组件
- 交互演示（如策略切换、状态切换）→ 建专属交互组件

### 2.3 组件目录

```
src/components/mdx/design-patterns/
  diagrams/
    pattern-category-map.tsx        # 23 模式全景图
    solid-principles-diagram.tsx    # SOLID 五原则
    strategy-pattern-diagram.tsx    # 策略模式类图 + 时序
    observer-pattern-diagram.tsx    # 观察者模式类图 + 通知流
    ...（逐章新增）
  pattern-class-diagram.tsx         # 通用 UML 类图
  pattern-sequence-diagram.tsx      # 通用时序图
```

---

## 三、生产阶段

### Phase 0：Foundation（本轮）

| 交付物 | 说明 |
|--------|------|
| `content/design-patterns/00-intro/learning-map.mdx` | 全书学习地图 |
| `content/design-patterns/00-intro/intro.mdx` | 什么是设计模式 |
| `src/components/mdx/design-patterns/diagrams/pattern-category-map.tsx` | 23 模式全景图 |
| `src/components/mdx/design-patterns/diagrams/solid-principles-diagram.tsx` | SOLID 原则图 |
| `src/components/mdx/design-patterns/diagrams/what-is-pattern-diagram.tsx` | 模式是什么图解 |
| `content.ts` 注册 | bookSlug + bookTitle + SECTION_ORDER |
| `types.ts` 注册 | ReviewChapterSlug |
| `review-questions.ts` | 入门章 3-5 题 |
| `mdx-components.tsx` | 组件注册 |

### Phase 1+：逐模式章生产

每章流程：任务卡 → 实现 → commit → 总监 review → 通过 → 下一章。

推荐顺序：
1. 策略模式（strategy）— 最直观的"封装变化"
2. 观察者模式（observer）— 最直观的"松耦合"
3. 装饰器模式（decorator）— 最直观的"开放扩展"
4. 单例模式（singleton）— 最简单的创建型
5. 工厂方法（factory-method）— 创建型核心
6. …（按学习地图推荐路径推进）

---

## 四、验收标准

每章必须满足 chapter-spec.md 对应类型的强度矩阵：

- **A 概念型**（大部分模式章）：概念讲解为重心，交互 Demo 必有，常见误区 ≥2 个
- **D 对比型**（abstract-factory 等）：方案差异为重心，CompareSlider 必有，场景选型题必有
- 所有章节：出处声明必有（设计模式为原创转述，sourceUrl 留空或标注 GoF/Head First）
- 所有章节：名词解释覆盖正文全部 `<Term>` 高亮
- 所有章节：图解服务教学目标，不做装饰图
- 所有章节：移动端可读，无元素遮挡
- 构建：`pnpm build` 通过，`tsc --noEmit` 通过

---

## 五、风险

| 风险 | 缓解 |
|------|------|
| 23 模式工作量巨大 | 按 Head First 推荐路径优先做核心 10 个，其余 P2 补齐 |
| UML 类图 SVG 绘制复杂 | 建通用 `PatternClassDiagram` 组件，props 驱动差异化 |
| 模式间易混淆（Strategy vs State） | 对比型章节 + 决策树组件 |
| 代码示例语言选择 | 用 TypeScript（与项目一致）+ 简短伪码，不做多语言 Tab |
