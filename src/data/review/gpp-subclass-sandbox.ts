import type { ReviewQuestion } from "./types";

/** 子类沙箱复习题 */
export const gppSubclassSandboxQuestions: ReviewQuestion[] = [
  {
    id: "gpp-subclass-sandbox-01",
    chapter: "gpp-subclass-sandbox",
    level: 1,
    question: "子类沙箱（Subclass Sandbox）模式的意图是什么？",
    answer:
      "意图：在基类中提供一组「受控的」基础操作 API（沙箱方法），让子类只通过调用这些 API 来实现自己的行为，而不直接依赖外部系统。\n\n核心思路：\n- 基类定义若干 `protected` 的原语方法（如 `move()`、`playSound()`、`spawnEffect()`），这些方法封装了与外部系统（物理、音频、特效）的交互。\n- 子类实现一个 `activate()` / `update()` 之类的「沙箱方法」，在里面组合调用这些原语来表达具体行为。\n- 子类不直接 import 或调用外部系统的具体实现，只通过基类提供的受控接口操作。\n\n效果：\n- 子类行为被「沙箱化」——只能用基类允许的操作，不能越界乱碰全局状态。\n- 外部系统变了，只改基类的原语方法，子类无需改动（依赖倒置）。\n- 子类编写简单：只需关注「我要做什么」，不用关心「怎么找到物理引擎、怎么调音频系统」。\n\n典型用途：游戏中的技能系统、怪物 AI 行为、超能力系统——每个具体技能/行为是一个子类，用基类提供的能力原语组合出效果。",
    tags: ["意图", "沙箱", "基类API", "受控操作"],
  },
  {
    id: "gpp-subclass-sandbox-02",
    chapter: "gpp-subclass-sandbox",
    level: 2,
    question: "沙箱 API 与 `protected` 方法的关系是什么？",
    answer:
      "沙箱 API 通常就是基类的 `protected` 方法，两者是「实现手段」与「设计意图」的关系：\n\n`protected` 方法的语言特性：\n- 只有本类及其子类能访问，外部类不可见。\n- 天然适合「基类提供给子类用的内部工具方法」。\n\n沙箱 API 的设计意图：\n- 它是基类给子类搭建的「积木」——子类在 `activate()` 里组合这些积木表达行为。\n- 它封装了对外部系统的访问——子类不用知道物理引擎怎么拿、音频系统怎么调，调 `move()` / `playSound()` 即可。\n\n两者的结合：\n- 把沙箱 API 声明为 `protected`，既保证子类能调用，又防止外部代码绕过子类直接乱调这些原语（封装）。\n- 基类自己可以持有外部系统的引用，在 `protected` 方法里转发调用；子类只看到简洁的原语接口。\n\n举例：基类 `Superpower` 提供 `protected move(dx, dy)`（调 `engine.physics.move`）、`protected playSound(name)`（调 `engine.audio.play`）、`protected spawnEffect(name)`（调 `engine.fx.spawn`），并声明 `abstract activate()`。子类 `SkyLaunch` 的 `activate()` 里组合调 `playSound('whoosh')`、`move(0, 100)`、`spawnEffect('dust')`——只用沙箱 API，不碰 engine。\n\n注意点：\n- 沙箱 API 不一定非得是 `protected`——也可以是 `public`（若外部也需调用）或委托给独立的 Service 对象。\n- 但 `protected` 是最贴合「给子类用的内部工具」语义的选择，也是本模式的典型实现方式。\n- 当原语方法变多时，可考虑把它们抽到一个独立的「上下文/服务」对象注入，避免基类膨胀（与组件模式、服务定位器结合）。",
    tags: ["protected", "沙箱API", "封装", "实现手段"],
  },
  {
    id: "gpp-subclass-sandbox-03",
    chapter: "gpp-subclass-sandbox",
    level: 3,
    question:
      "设计一个技能系统：基类 `Skill` 提供沙箱 API，子类实现各种技能。给出结构设计。",
    answer:
      "结构设计：\n\n基类 `Skill`（提供沙箱 API + 沙箱方法入口）：\n- 持有 `owner: Character`（施法者）和 `target: Character`（目标）。\n- 沙箱原语（protected，封装对外部系统的访问）：\n  - `moveActor(actor, dx, dy)` → 调 `engine.physics.move(actor, dx, dy)`\n  - `dealDamage(actor, amount)` → 调 `engine.combat.damage(actor, amount)`\n  - `heal(actor, amount)` → 调 `engine.combat.heal(actor, amount)`\n  - `playSound(name)` → 调 `engine.audio.play(name)`\n  - `spawnEffect(name, pos)` → 调 `engine.fx.spawn(name, pos)`\n  - `spawnProjectile(type, dir)` → 调 `engine.combat.spawnProjectile(type, owner, dir)`\n  - `cooldown(seconds)` → 设 `owner.cooldowns.set(this, seconds)`\n- 沙箱方法：`abstract activate(): void`——子类实现具体技能逻辑。\n\n子类举例：\n- `FireballSkill.activate()`：`playSound('fireball_cast')` → `spawnEffect('fire_charge', owner.position)` → `spawnProjectile('fireball', owner.facing)` → `cooldown(3.0)`。\n- `HealSkill.activate()`：`playSound('heal')` → `heal(target, 50)` → `spawnEffect('heal_glow', target.position)` → `cooldown(5.0)`。\n- `DashSkill.activate()`：`playSound('dash')` → `moveActor(owner, owner.facing.x * 200, owner.facing.y * 200)` → `spawnEffect('dash_trail', owner.position)` → `cooldown(2.0)`。\n\n设计要点：\n1. 子类只调用沙箱原语，不直接碰 `engine`——外部系统换了实现，只改基类原语，技能子类零改动。\n2. 新增技能只需写一个子类实现 `activate()`，不用理解物理/音频/特效系统的细节——上手成本低。\n3. 原语集合要稳定——加原语是「给所有子类添能力」，改原语签名会影响所有子类，需谨慎。\n4. 当原语过多（>10 个）时，基类会膨胀。可把原语拆到 `SkillContext` 服务对象，注入给 `Skill`，沙箱方法调 `context.move()` 等——这演变成「服务定位器 + 子类沙箱」的混合。\n5. 若技能行为需要数据驱动（策划配表而非写代码），应进一步用「类型对象 + 脚本/事件」替代继承——但子类沙箱是「代码定义行为」时的清晰选择。",
    tags: ["应用", "技能系统", "基类设计", "沙箱原语", "子类实现"],
  },
  {
    id: "gpp-subclass-sandbox-04",
    chapter: "gpp-subclass-sandbox",
    level: 4,
    question: "子类沙箱模式与组件模式各自适合什么场景？如何取舍？",
    answer:
      "两者都用于「给实体赋予行为」，但组织方式不同：\n\n子类沙箱：\n- 用「继承」组织行为——一个基类 + 多个子类，每个子类是一种具体行为（技能、怪物 AI）。\n- 行为是「代码驱动」的——每个变体是一个类，写死在代码里。\n- 适合：行为变体数量有限、相对固定、每个变体逻辑较复杂的场景（如十几种技能、几种怪物 AI）。\n- 优点：实现简单直接，IDE 跳转友好，类型安全。\n- 缺点：行为变体多时子类爆炸（100 种技能 = 100 个类）；一个实体只能「是」一种行为（单继承限制），想同时有多种行为需多重继承或组合，复杂；加新行为必须改代码、重新编译，无法运行时由数据/策划添加。\n\n组件模式：\n- 用「组合」组织行为——实体持有多个组件，每个组件负责一方面（物理、渲染、飞行、战斗）。\n- 行为是「组合驱动」的——实体的能力由挂载的组件集合决定，运行时可动态增删组件。\n- 适合：行为维度多、需要灵活组合、实体类型极多且需数据驱动的场景（如 RPG 角色可同时走/飞/战斗/拾取）。\n- 优点：实体可同时拥有多种行为（组合优于继承）；加新能力只需新组件，实体按需挂载，不碰其他实体；支持数据驱动——策划配表决定挂哪些组件。\n- 缺点：组件间通信复杂（需消息/事件/共享数据）；实体身份模糊（「这个实体是什么」由组件集合隐式定义）；间接调用多，性能略低于直接继承。\n\n取舍维度：\n\n1. 行为是「互斥分类」还是「可叠加维度」：\n- 互斥（一个技能要么火球要么治疗，不能同时是两种）→ 子类沙箱清晰。\n- 可叠加（角色可同时会走、会飞、会战斗）→ 组件模式灵活。\n\n2. 变体数量：\n- 几个到几十个 → 子类沙箱够用。\n- 上百上千、需数据驱动 → 组件 + 类型对象/脚本更合适。\n\n3. 是否需运行时增删行为：\n- 不需要（技能编译期定死）→ 子类沙箱。\n- 需要（buff 系统动态加移除能力）→ 组件。\n\n4. 团队与性能：\n- 小团队、行为简单 → 子类沙箱上手快。\n- 大型项目、实体众多、需 ECS 级性能 → 组件（进一步演进到 DOD/ECS）。\n\n实践中常混合：实体用组件模式组织（Physics/Render/Combat 组件），而某个组件内部（如 CombatComponent）的「具体攻击方式」用子类沙箱组织（Attack 基类 + 各种子类）。两者非互斥，按粒度分层选用。",
    tags: ["综合", "子类沙箱", "组件模式", "取舍", "继承vs组合"],
  },
];
