import type { ReviewQuestion } from "./types";

/** 类型对象复习题 */
export const gppTypeObjectQuestions: ReviewQuestion[] = [
  {
    id: "gpp-type-object-01",
    chapter: "gpp-type-object",
    level: 1,
    question: "类型对象（Type Object）模式的意图是什么？",
    answer:
      "意图：用「数据对象」来描述类型，让类型定义从代码（继承/类）移到数据，从而能在不重新编译、不改代码的情况下创建新类型。\n\n核心思路：\n- 传统做法：每种怪物一个子类 `class Dragon : Monster`、`class Goblin : Monster`，类型由「类」定义，加新怪物要写新类、重新编译。\n- 类型对象做法：定义一个 `Breed`（品种）数据对象，包含该类型的属性（名字、血量、攻击力、攻击声音、纹理等）和「创建实例」的方法。怪物实例 `Monster` 持有一个 `Breed` 引用，自己的属性从 `Breed` 读取或被 `Breed` 初始化。\n- 加新怪物 = 加一条 `Breed` 数据（配置文件/数据库/JSON），无需改代码。\n\n效果：\n- 类型数量不受代码限制，可由策划/数据驱动无限扩展。\n- 类型属性调整（改血量、改攻击力）只改数据，无需重新编译。\n- 不同类型共享同一套 Monster 逻辑代码，类型差异全在数据里。\n\n典型用途：怪物/道具/装备系统——种类极多、频繁增删、属性需策划调整的场景。",
    tags: ["意图", "数据驱动", "类型定义", "Breed"],
  },
  {
    id: "gpp-type-object-02",
    chapter: "gpp-type-object",
    level: 2,
    question: "类型对象与继承的区别是什么（数据驱动 vs 代码驱动）？",
    answer:
      "继承（代码驱动）：\n- 类型由「类」定义——`class Dragon extends Monster`，每个类型是一段编译进二进制的代码。\n- 类型差异通过「重写方法」表达——子类 override `attack()` 写不同的攻击逻辑。\n- 加新类型 = 写新类 + 重新编译 + 重新发布。\n- 类型集合在编译期固定，运行时不能加新类型。\n- 适合：类型少、行为差异大（需不同代码逻辑）、不常变。\n\n类型对象（数据驱动）：\n- 类型由「数据对象」定义——一个 `Breed` 实例含属性字段，所有类型共用同一份 Monster 代码。\n- 类型差异通过「不同属性值」表达——龙和哥布林的区别是 `hp=200 vs hp=30`、`attackSound=\"roar\" vs \"goblin_cry\"`，而非不同代码。\n- 加新类型 = 新增一条数据，运行时可动态创建，无需编译。\n- 类型集合运行时可扩展，可从配置文件/数据库加载。\n- 适合：类型多、差异主要是数值/资源引用、需策划频繁调整。\n\n对比表：\n- 定义载体：继承=类（代码），类型对象=数据对象（运行时数据）。\n- 差异表达：继承=重写方法（行为），类型对象=不同字段值（属性）。\n- 扩展方式：继承=写新类+编译，类型对象=加数据条目。\n- 行为差异：继承擅长「行为不同」，类型对象擅长「属性不同」。\n\n关键取舍：\n- 如果各类型「行为逻辑不同」（龙会喷火、哥布林会偷窃），纯类型对象不够——要么用子类沙箱写行为子类，要么在 Breed 里挂「行为脚本/事件表」把行为也数据化。\n- 如果各类型「只是数值不同」，类型对象完胜——不用为 1000 种「只有血量攻击力不同」的怪物写 1000 个类。\n- 实践常混合：大类用继承（龙族/哥布林族行为框架不同），同族内的变体用类型对象（不同等级的哥布林只是数值差异）。",
    tags: ["对比", "继承", "数据驱动", "代码驱动", "差异表达"],
  },
  {
    id: "gpp-type-object-03",
    chapter: "gpp-type-object",
    level: 3,
    question:
      "设计一个游戏怪物系统：用类型对象设计，支持运行时创建新怪物类型。",
    answer:
      "设计：\n\n1. 定义类型对象 `Breed`：\n```\nclass Breed {\n  name: string            // 「龙」「哥布林」\n  parentBreed: Breed|null // 父类型，支持继承属性\n  hp: number\n  attack: number\n  defense: number\n  attackSound: string\n  texture: string\n\n  // 从父类型继承未显式设置的属性\n  getHp(): number         // 若本类型没设，查 parentBreed\n  getAttack(): number\n  ...\n\n  // 工厂方法：创建一个该类型的怪物实例\n  newMonster(): Monster {\n    return new Monster(this)\n  }\n}\n```\n\n2. 定义怪物实例 `Monster`：\n```\nclass Monster {\n  breed: Breed        // 指向自己的类型对象\n  hp: number          // 当前血量（实例状态）\n  x, y: number        // 当前位置（实例状态）\n\n  constructor(breed: Breed) {\n    this.breed = breed\n    this.hp = breed.getHp()  // 初始血量从类型对象读\n  }\n\n  attack(target: Monster) {\n    const dmg = this.breed.getAttack() - target.breed.getDefense()\n    target.hp -= dmg\n    engine.audio.play(this.breed.attackSound)  // 用类型的音效\n  }\n\n  render() {\n    engine.draw(this.breed.texture, this.x, this.y)  // 用类型的纹理\n  }\n}\n```\n\n3. 运行时创建新类型（无需改代码）：\n```\n// 从 JSON 配置加载\nconst data = JSON.parse(file('breeds.json'))\n// data = [\n//   { name: \"dragon\", hp: 200, attack: 30, attackSound: \"roar\", texture: \"dragon.png\" },\n//   { name: \"ice_dragon\", parent: \"dragon\", attack: 40, texture: \"ice_dragon.png\" },\n//   { name: \"goblin\", hp: 30, attack: 8, attackSound: \"goblin_cry\", texture: \"goblin.png\" }\n// ]\n\nconst breeds = new Map<string, Breed>()\n// 先建所有 Breed 对象\nfor (b of data) breeds.set(b.name, new Breed(b.name))\n// 再链接 parent 并填充属性（两遍，因为 parent 要先存在）\nfor (b of data) {\n  const breed = breeds.get(b.name)\n  if (b.parent) breed.parentBreed = breeds.get(b.parent)\n  breed.hp = b.hp; breed.attack = b.attack; ...\n}\n\n// 运行时创建实例\nconst dragon = breeds.get('ice_dragon').newMonster()\n```\n\n效果：\n- 加新怪物只改 `breeds.json`，无需重新编译游戏代码。\n- `ice_dragon` 通过 `parent: \"dragon\"` 继承龙的 hp（200），只覆盖 attack 和 texture。\n- 策划可在不碰代码的情况下调数值、加新怪物、设置继承关系。\n- 同一份 `Monster` 代码服务所有类型，类型差异全在 `Breed` 数据里。\n\n注意：若怪物行为逻辑也需不同（不只是数值），可在 `Breed` 里加 `behaviorScript` 字段挂脚本，或结合子类沙箱——但纯类型对象阶段，差异仅限数据。",
    tags: ["应用", "怪物系统", "Breed", "运行时创建", "数据驱动"],
  },
  {
    id: "gpp-type-object-04",
    chapter: "gpp-type-object",
    level: 4,
    question: "类型对象如何支持「继承」？Breed 的 parentBreed 机制是如何工作的？",
    answer:
      "类型对象的「继承」是对语言继承的数据化模拟——用 `parentBreed` 引用链实现属性回溯（fallback）。\n\nparentBreed 机制：\n- 每个 `Breed` 可有一个 `parentBreed` 指向父类型（可为 null，表示根类型）。\n- 访问某属性时（如 `getHp()`），先看本类型是否显式设置了 `hp`：\n  - 设了 → 返回本类型的值。\n  - 没设 → 递归查 `parentBreed.getHp()`，沿父链向上找，直到找到或到根。\n- 这就是「属性继承」——子类型自动获得父类型的属性，除非自己覆盖。\n\n举例：\n```\nBreed \"monster\" (根): hp=100, attack=10, defense=5\n  ├─ Breed \"dragon\": parent=monster, hp=200, attackSound=\"roar\"\n  │    └─ Breed \"ice_dragon\": parent=dragon, attack=40, texture=\"ice.png\"\n  └─ Breed \"goblin\": parent=monster, hp=30, attack=8\n\nice_dragon.getHp()      → 本类型没设 → 查 dragon → 没设 → 查 monster → 100? 不对，dragon 设了 200 → 返回 200\nice_dragon.getAttack()  → 本类型设了 40 → 返回 40\nice_dragon.getDefense() → 本类型没设 → dragon 没设 → monster 设了 5 → 返回 5\nice_dragon.getAttackSound() → 本类型没设 → dragon 设了 \"roar\" → 返回 \"roar\"\ngoblin.getHp()          → 本类型设了 30 → 返回 30\n```\n\n与语言继承的区别：\n1. 语言继承是编译期固定的类层次；类型对象继承是运行时可变的数据链——可动态改 parentBreed 重新挂父类型。\n2. 语言继承继承「方法」（行为）；类型对象继承「属性」（数据）。行为差异需靠脚本/事件表另行数据化。\n3. 类型对象继承是「单链回溯」（查属性时沿 parent 链找），不涉及方法分派/vtable，更轻量。\n\n设计要点：\n1. 避免循环：parent 链不能成环（加载时校验）。\n2. 两遍加载：建对象 → 再连 parent（因为 parent 引用的对象可能还没建好）。\n3. 缓存查询结果：`getHp()` 每次递归查链有开销，可在首次查询后缓存到本类型（「扁平化」），parent 改动时清缓存。\n4. 覆盖语义：子类型显式设的属性覆盖父类型，未设的继承——与 OOP 的 override 一致。\n5. 多继承：类型对象通常单继承（一条 parent 链），如需多继承（混入多种特性）可改成「parent 列表」或「特性组合」，但复杂度上升，一般不推荐。\n\n一句话：类型对象用 `parentBreed` 引用链 + 属性回溯查询，把「类继承」数据化——让数据对象之间也能有「is-a」关系，且运行时可动态调整。",
    tags: ["综合", "继承", "parentBreed", "属性回溯", "数据继承"],
  },
];
