import type { ReviewQuestion } from "./types";

/** Head First 设计模式 · 适配器与外观复习题 */
export const hfdAdapterFacadeQuestions: ReviewQuestion[] = [
  {
    id: "hfd-adapter-facade-1",
    chapter: "hfd-adapter-facade",
    level: 1,
    question: "适配器模式和外观模式的定义分别是什么？它们各自解决什么问题？",
    answer:
      "适配器模式：将一个类的接口转换成客户期望的另一个接口。适配器让原本接口不兼容的类可以协作。\n\n解决的问题：已有类的接口和需要的接口不匹配，但不能修改已有类（第三方库、遗留代码）。适配器在中间做接口转换。\n\n外观模式：为子系统中的一组接口提供一个统一的高层接口。外观定义了一个更简化的接口，让子系统更容易使用。\n\n解决的问题：子系统由多个复杂组件组成，客户端需要协调多个组件才能完成一个操作。外观提供一个简化入口，屏蔽内部复杂度。\n\n核心区别：\n- 适配器：转换一个接口（1 对 1），让不兼容的类协作。\n- 外观：简化多个接口（多对 1），屏蔽子系统复杂度。\n- 适配器是「接口转换器」，外观是「复杂度屏蔽层」。",
    tags: ["定义", "对比", "问题"],
  },
  {
    id: "hfd-adapter-facade-2",
    chapter: "hfd-adapter-facade",
    level: 2,
    question: "适配器模式有「对象适配器」和「类适配器」两种，它们的区别是什么？Java 为什么通常用对象适配器？",
    answer:
      "对象适配器：\n- Adapter 实现 Target 接口，持有 Adaptee 引用（组合）。\n- Target 的方法内部委托给 Adaptee 的方法。\n- 结构：`class Adapter implements Target { Adaptee adaptee; }`\n\n类适配器：\n- Adapter 同时继承 Adaptee 并实现 Target 接口。\n- 直接调用继承来的 Adaptee 方法。\n- 结构：`class Adapter extends Adaptee implements Target { }`\n\n区别：\n1. 关系：对象适配器用组合（HAS-A），类适配器用继承（IS-A）。\n2. 灵活性：对象适配器可以适配 Adaptee 及其子类（持有父类引用），类适配器只能适配特定的 Adaptee。\n3. 覆盖：对象适配器不能覆盖 Adaptee 的方法，类适配器可以（继承后覆盖）。\n4. 多适配：对象适配器可以同时持有多 个 Adaptee，类适配器只能继承一个。\n\nJava 通常用对象适配器的原因：\n1. Java 不支持多重继承——类适配器继承了 Adaptee 就不能再继承其他类。\n2. 组合优于继承原则——对象适配器用组合更灵活，运行时可替换 Adaptee。\n3. 如果 Adaptee 是接口而非类，类适配器可以 implements 多个接口，但实际场景中 Adaptee 通常是具体类。",
    tags: ["对象适配器", "类适配器", "组合优于继承"],
  },
  {
    id: "hfd-adapter-facade-3",
    chapter: "hfd-adapter-facade",
    level: 3,
    question: "家庭影院有 Amplifier、Projector、Screen、Light、Player 五个组件。看一部电影需要依次操作它们。如何用外观模式简化？写出 Java 代码结构。",
    answer:
      "没有外观时，客户端要手动协调五个组件：\n```java\n// 客户端直接调子系统——复杂、容易出错\nlight.dim(10);\nscreen.down();\nprojector.on();\nprojector.setInput(dvdPlayer);\namplifier.on();\namplifier.setVolume(7);\ndvdPlayer.on();\ndvdPlayer.play(movie);\n```\n\n外观模式简化：\n```java\npublic class HomeTheaterFacade {\n    Amplifier amp;\n    Projector projector;\n    Screen screen;\n    Light light;\n    Player player;\n\n    public HomeTheaterFacade(Amplifier a, Projector p,\n            Screen s, Light l, Player pl) {\n        amp = a; projector = p; screen = s;\n        light = l; player = pl;\n    }\n\n    public void watchMovie(String movie) {\n        System.out.println(\"准备看电影...\");\n        light.dim(10);\n        screen.down();\n        projector.on();\n        projector.setInput(player);\n        amp.on();\n        amp.setVolume(7);\n        player.on();\n        player.play(movie);\n    }\n\n    public void endMovie() {\n        System.out.println(\"关闭影院...\");\n        player.stop();\n        player.off();\n        amp.off();\n        projector.off();\n        screen.up();\n        light.on();\n    }\n}\n\n// 客户端只需一行\nfacade.watchMovie(\"盗梦空间\");\n```\n\n关键：外观不封装子系统——子系统仍然可以直接访问。外观只是提供了一个「简化入口」，客户端可以选择用外观也可以直接调子系统。外观降低耦合但不限制灵活性。",
    tags: ["外观模式", "应用", "Java", "家庭影院"],
  },
  {
    id: "hfd-adapter-facade-4",
    chapter: "hfd-adapter-facade",
    level: 4,
    question: "设计原则说「最少知识原则（Law of Demeter）——只和直接朋友交谈」。外观模式如何体现这个原则？适配器是否也体现了？",
    answer:
      "最少知识原则（Law of Demeter）：一个对象应该只调用以下对象的方法：\n1. 对象自身\n2. 作为参数传入的对象\n3. 对象自己创建/实例化的对象\n4. 对象的直接组件（字段）\n\n不应该调用「方法调用的返回值」的方法——那是间接朋友。\n\n外观模式如何体现：\n没有外观时，客户端要调 `amp.getPlayer().getMovie().getTitle()`——链式调用经过多个间接对象，违反最少知识。\n\n外观把所有子系统组件作为自己的直接组件（字段），客户端只调 `facade.watchMovie()`——只和 Facade 这一个直接朋友交谈。Facade 内部协调子系统是合法的（子系统是它的直接组件）。\n\n外观本质上是「最少知识原则的建筑级实现」——把复杂的交互封装到一个对象中，客户端不需要知道子系统的内部结构。\n\n适配器是否也体现：\n部分体现。适配器让客户端面向 Target 接口，不直接接触 Adaptee——客户端只和 Target（直接朋友）交谈。但适配器的主要意图是「接口转换」而非「减少知识」，最少知识是附带效果。\n\n对比：\n- 外观：主动设计来减少客户端需要知道的组件数量——最少知识是核心目的。\n- 适配器：转换接口让不兼容的类协作——最少知识是附带收益。\n- 两者都让客户端更简单，但外观的「最少知识」意图更明确。\n\n注意：最少知识会降低耦合但也可能增加不必要的包装层。不要为了遵守原则而过度包装——在需要解耦的边界（如子系统入口）用外观，在内部紧密协作的代码中不必拘泥。",
    tags: ["综合", "最少知识原则", "Law of Demeter", "原则"],
  },
];
