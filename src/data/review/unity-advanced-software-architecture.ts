/** 复习题库 · 软件架构（unity-advanced-software-architecture）。《Unity3D高级编程：主程手记》第1章。 */

import type { ReviewQuestion } from "./types";

export const unityAdvancedSoftwareArchitectureQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ua-arch-1",
    chapter: "unity-advanced-software-architecture",
    level: 1,
    question: "什么是「架构」？架构的目标是什么？",
    answer:
      "架构是系统的高层结构设计：模块怎么划分、层之间怎么依赖、数据怎么流动、关键技术决策是怎么定的。架构的目标不是画漂亮的框图，而是**让大型项目里的人能高效协作、代码能长期演进、系统能稳定运行**——简单说就是「让多人长期开发的项目不烂掉」。",
    tags: ["架构", "定义", "目标"],
  },
  {
    id: "ua-arch-2",
    chapter: "unity-advanced-software-architecture",
    level: 1,
    question: "Unity客户端典型四层架构分别是什么？",
    answer:
      "自上而下四层：① **表现层（Presentation/View）**——玩家直接看到和交互的部分（UI、3D表现、特效、输入）；② **业务层（Business Logic/System）**——游戏规则和玩法逻辑（战斗、任务、背包等系统）；③ **数据层（Data/Model）**——配置数据、存档、运行时状态；④ **基础层（Infrastructure/Engine）**——引擎封装和通用工具（资源管理、网络、对象池、UI框架）。",
    tags: ["分层", "四层架构", "表现层", "业务层", "数据层", "基础层"],
  },
  {
    id: "ua-arch-3",
    chapter: "unity-advanced-software-architecture",
    level: 1,
    question: "表现层的职责是什么？它绝对不能做什么？",
    answer:
      "表现层只做两件事：① **把状态画出来**（更新UI、播放动画、显示特效）；② **把玩家输入转发给下层**（按钮点击调用业务层方法）。它**绝对不能**直接改数据、直接写业务逻辑、直接发网络消息——比如点击购买按钮时不应该直接扣金币，而是调用业务层的BuyItem方法。",
    tags: ["表现层", "职责", "禁止事项"],
  },
  {
    id: "ua-arch-4",
    chapter: "unity-advanced-software-architecture",
    level: 1,
    question: "业务层为什么不能依赖表现层？",
    answer:
      "业务层是游戏的「大脑」，负责游戏规则和逻辑。如果业务层直接引用UI组件（比如BattleSystem里持有HpBar引用），就会导致**紧耦合**——改个UI结构战斗逻辑就得跟着改，而且业务逻辑没法做单元测试（必须挂着UI才能跑）。正确做法是业务层派发事件，表现层监听事件来更新显示。",
    tags: ["业务层", "依赖方向", "解耦", "紧耦合"],
  },
  {
    id: "ua-arch-5",
    chapter: "unity-advanced-software-architecture",
    level: 1,
    question: "什么是「横切关注点」？举两个例子。",
    answer:
      "横切关注点是**不专属于某一层，但所有层都可能用到的通用能力**。它们通常独立实现，以接口或工具类的形式被各层使用，不会破坏分层依赖。典型例子：**事件系统**（各层都可以派发和监听）、**对象池**（任何需要频繁创建销毁对象的地方都能用）、**日志系统**、**资源管理**。",
    tags: ["横切关注点", "事件系统", "对象池"],
  },

  // ── L2 理解：为什么 / 区别 ──
  {
    id: "ua-arch-6",
    chapter: "unity-advanced-software-architecture",
    level: 2,
    question: "为什么说「依赖只能从上往下走，不能反向」是分层最核心的规则？反向依赖会带来什么问题？",
    answer:
      "反向依赖是紧耦合的根源：如果业务层依赖表现层，改UI就会改崩业务逻辑；如果基础层依赖业务层，基础层就再也没法复用到别的项目；如果数据层有业务判断，加新物品类型就得改数据层。反向依赖会导致：① 改一处崩多处；② 代码无法独立测试；③ 模块无法复用；④ 新人不敢动代码。依赖方向保证了下层是稳定的、上层依赖稳定的抽象，改动被局限在层内。",
    tags: ["依赖方向", "反向依赖", "紧耦合", "解耦"],
  },
  {
    id: "ua-arch-7",
    chapter: "unity-advanced-software-architecture",
    level: 2,
    question: "「高内聚、低耦合」分别是什么意思？",
    answer:
      "**高内聚**：一个模块内部的元素应该紧密相关、只做一件事——比如「背包系统」就只管背包的添加/删除/查询，不要同时管角色属性升级和任务进度。**低耦合**：模块之间的依赖要少、通过清晰的接口通信——改背包系统不应该影响战斗系统，两个系统之间只通过事件或接口交互，而不是直接互相引用内部实现。",
    tags: ["高内聚", "低耦合", "模块设计"],
  },
  {
    id: "ua-arch-8",
    chapter: "unity-advanced-software-architecture",
    level: 2,
    question: "为什么说数据层应该是「傻」的？",
    answer:
      "数据层的职责只是「存数据、给数据」——它不应该做业务判断。比如PlayerModel.Gold只是个属性，你读它就给你值，写它就存起来；但「能不能扣金币」「扣完要不要触发成就」这些是业务层WalletSystem的事。如果数据层里写了`if (item.type == Weapon) {...}`这种业务逻辑，那数据层就不稳定了——加新物品类型就得改数据层，违反了分层原则。",
    tags: ["数据层", "单一职责", "业务逻辑"],
  },
  {
    id: "ua-arch-9",
    chapter: "unity-advanced-software-architecture",
    level: 2,
    question: "主程做架构为什么主张「演化优于预设」？过度设计有什么问题？",
    answer:
      "因为在项目第一天你不可能预知所有需求，上来就搞十几个接口、依赖注入容器、复杂框架，结果写个简单功能要先写8个样板文件——这是过度设计，浪费生产力、提高了新人上手成本，而且很多预设的抽象最后根本用不上。正确做法是：先把基础分层和规范定好，满足当前需求，哪个模块随着迭代变复杂了再重构哪个——架构是长出来的，不是设计出来的。",
    tags: ["演化", "过度设计", "架构原则", "主程思维"],
  },
  {
    id: "ua-arch-10",
    chapter: "unity-advanced-software-architecture",
    level: 2,
    question: "为什么说「能在不挂UI、不加载场景的情况下跑通业务层单元测试」说明分层是成功的？",
    answer:
      "因为这说明业务层**不依赖表现层和Unity场景对象**——它是纯C#逻辑，可以独立实例化、调用方法、断言结果。如果业务层直接持有UI引用、直接FindObjectOfType、直接操作场景里的Transform，那你就必须启动Unity、加载场景、创建UI才能测试业务逻辑——这根本没法写单元测试，每次测试都要手动跑游戏，效率极低且不可靠。可测试性是架构好坏的试金石。",
    tags: ["单元测试", "可测试性", "分层验证"],
  },

  // ── L3 应用：代码分析 / 场景判断 ──
  {
    id: "ua-arch-11",
    chapter: "unity-advanced-software-architecture",
    level: 3,
    question: "下面这段代码违反了哪些架构原则？`public class HpBar : MonoBehaviour { void Update() { GetComponent<Text>().text = Player.Instance.Hp.ToString(); if (Player.Instance.Hp <= 0) { SceneManager.LoadScene(\"GameOver\"); } } }`",
    answer:
      "至少违反了三个原则：① **表现层每帧Find/ GetComponent**——Update里每帧GetComponent性能极差，应该在Awake/Start里缓存；② **表现层直接读单例数据**——HpBar直接拉Player.Instance.Hp，形成紧耦合，应该是业务层派发OnHpChanged事件，HpBar监听事件更新；③ **表现层直接做业务判断和场景管理**——血量<=0就切场景是业务逻辑（GameOver流程可能还要弹结算、存数据、发上报），不应该写在UI的Update里，应该由业务层处理。",
    tags: ["代码分析", "表现层", "单例耦合", "Update"],
  },
  {
    id: "ua-arch-12",
    chapter: "unity-advanced-software-architecture",
    level: 3,
    question: "单例（Singleton）在Unity项目里到底能不能用？什么情况下可以用，什么情况下不要用？",
    answer:
      "单例不是洪水猛兽，但要用对地方：**可以用**在基础层的管理器——比如ResourceManager、NetworkManager，这些是全局唯一的通用能力，不持有业务状态。**不要用**在业务层——比如不要做Player.Instance、BattleManager.Instance来存业务状态；不要在单例里持有场景对象引用（比如某个UI、某个Transform），场景卸载时这些引用会变成野指针；不要让单例变成「全局垃圾桶」——什么变量都往里面塞，谁都能改，最后谁改了什么根本追踪不到。业务状态应该用System/Model管理，通过事件通信。",
    tags: ["单例", "Singleton", "设计模式", "最佳实践"],
  },

  // ── L4 主程视角：架构决策 ──
  {
    id: "ua-arch-13",
    chapter: "unity-advanced-software-architecture",
    level: 4,
    question: "你接手了一个做了半年的Unity项目，发现代码全乱了：UI直接改数据、网络回调里直接操作Transform、到处是public static变量、五个不同的人写了五套资源加载方式。作为主程你会怎么处理？",
    answer:
      "主程处理屎山的原则是「**渐进重构，不要大爆炸重写**」：① **先定规范，守住底线**——立刻写一份架构规范文档（分层、目录、命名、哪些能做哪些不能做），所有新代码必须遵守，Code Review严格卡；② **封装旧代码，提供新接口**——不要上来就改旧代码，而是在基础层封装统一的ResourceManager、UIManager、EventManager，新代码必须用新接口；③ **模块级逐步替换**——哪个模块要加新功能或出bug了，就重构哪个模块，把它从旧架构里迁到新架构，改完一块是一块；④ **加防护**——写编辑器工具检查违规代码（比如Update里GetComponent、直接访问Player.Instance），CI跑检查。大爆炸重写通常会延期半年以上、而且新架构未必比旧的好——重构是马拉松，不是冲刺。",
    tags: ["重构", "屎山", "主程决策", "技术债务"],
  },
];
