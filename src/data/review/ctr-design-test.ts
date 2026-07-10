import type { ReviewQuestion } from "./types";

/** C++ 编程测试秘籍 · 设计模式测试复习题 */
export const ctrDesignTestQuestions: ReviewQuestion[] = [
  {
    id: "ctr-design-test-1",
    chapter: "ctr-design-test",
    level: 1,
    question: `GoF 23 种设计模式分为哪三类？单例、工厂方法、观察者各属哪类、解决什么问题？`,
    answer:
      `GoF 23 种模式分三类：\n1. 创建型（Creational）：关注对象创建过程，把创建与使用解耦。5 种：单例、工厂方法、抽象工厂、建造者、原型。\n2. 结构型（Structural）：关注类/对象组合成更大结构。7 种：适配器、桥接、组合、装饰器、外观、享元、代理。\n3. 行为型（Behavioral）：关注对象间职责分配与通信。11 种：责任链、命令、解释器、迭代器、中介者、备忘录、观察者、状态、策略、模板方法、访问者。\n\n三个模式的归属与问题：\n- 单例（创建型）：保证一个类只有一个实例，并提供全局访问点。解决「全局唯一配置/资源管理器」的需求，避免多处创建导致状态不一致。\n- 工厂方法（创建型）：定义创建对象的接口，让子类决定实例化哪个类。解决「创建时不指定具体类」的需求，让客户端与具体类型解耦，便于扩展新产品。\n- 观察者（行为型）：定义对象间一对多依赖，当一方状态变化时所有依赖者被通知。解决「一个对象变化需通知多个相关对象」的需求，实现松耦合的事件广播。`,
    tags: ["GoF", "设计模式分类", "单例", "工厂方法", "观察者"],
  },
  {
    id: "ctr-design-test-2",
    chapter: "ctr-design-test",
    level: 2,
    question: `C++ 中实现线程安全的单例模式有哪几种写法？为什么 C++11 后推荐 Meyers 单例？`,
    answer:
      `C++ 线程安全单例的几种写法：\n1. Meyers 单例（函数内 static）：\`Singleton& instance(){ static Singleton s; return s; }\`。C++11 起标准保证局部 static 初始化线程安全（编译器插入一次性初始化的同步），析构在程序退出时自动进行。最简洁，现代 C++ 首选。\n2. std::call_once：\`std::once_flag flag; Singleton* p=nullptr; Singleton& instance(){ std::call_once(flag, []{ p=new Singleton; }); return *p; }\`。显式控制初始化时机，适合需要传参或延迟到特定点的场景。注意指针版需手动管析构或用智能指针。\n3. atomic + 双重检查（DCLP）：用 \`std::atomic<Singleton*>\` 配 acquire/release。C++11 内存模型下可正确实现，但比 Meyers 复杂、易写错，通常没必要。\n4. 饿汉式（全局静态实例）：程序启动即构造，天然线程安全（单线程初始化期），但失去延迟初始化、启动顺序依赖问题。\n\n推荐 Meyers 单例的原因：\n- 线程安全由标准保证，无需手写锁，最不易出错。\n- 自动延迟初始化（首次调用才构造），惰性高效。\n- 析构由运行时在程序退出按定义逆序处理，无需手动管理。\n- 代码极简，意图清晰。\nDCLP 在 C++11 前有内存模型 bug，C++11 后虽可修但复杂且无优势；call_once 适合需要控制初始化的特例。日常单例 Meyers 足矣。\n\n注意：单例本质是全局状态，有测试难、隐藏依赖的批评，能不用就不用，优先依赖注入。`,
    tags: ["单例", "Meyers 单例", "线程安全", "call_once", "DCLP"],
  },
  {
    id: "ctr-design-test-3",
    chapter: "ctr-design-test",
    level: 3,
    question: `工厂方法与抽象工厂的区别是什么？用 C++ 给出一个工厂方法的骨架（基类定义产品接口与工厂接口，子类生产具体产品），并说明何时该升级为抽象工厂。`,
    answer:
      `工厂方法 vs 抽象工厂：\n- 工厂方法：定义一个创建产品的方法，由子类决定实例化哪个具体产品。一个工厂只创建一种产品（一族里的一种），通过继承扩展新产品。关注「单个产品的创建」。\n- 抽象工厂：提供一个接口创建一系列相关产品（产品族），每个具体工厂创建一整族产品。关注「一组相关产品的协同创建」。当需要保证多个产品互相配套（如同一 UI 主题的按钮+滚动条+菜单）时用抽象工厂。\n\n区别要点：工厂方法创建一个产品，靠子类化扩展；抽象工厂创建一族产品，靠换工厂实例切换整族。工厂方法是「参数化单个 new」，抽象工厂是「参数化一组 new」。\n\n工厂方法骨架：\n\`\`\`cpp\n// 产品接口\nclass Product {\npublic:\n  virtual ~Product() = default;\n  virtual void use() = 0;\n};\n// 具体产品\nclass ConcreteProductA : public Product {\npublic:\n  void use() override { /* A 的实现 */ }\n};\n// 工厂接口\nclass Creator {\npublic:\n  virtual ~Creator() = default;\n  virtual std::unique_ptr<Product> create() const = 0;  // 工厂方法\n  void someOperation() {\n    auto p = create();  // 用产品，不关心具体类型\n    p->use();\n  }\n};\n// 具体工厂\nclass ConcreteCreatorA : public Creator {\npublic:\n  std::unique_ptr<Product> create() const override {\n    return std::make_unique<ConcreteProductA>();\n  }\n};\n\`\`\`\n客户端依赖 Creator 抽象，运行时注入具体工厂，创建出对应产品，与具体类型解耦。新增产品 B 只加 ConcreteProductB + ConcreteCreatorB，不改老代码（开闭原则）。\n\n何时升级为抽象工厂：当出现「多个产品必须成套使用」时。例如 UI 框架要同时创建 Button+Checkbox+Menu，且 Windows 风格的三件套要配套、Mac 风格的三件套要配套。这时一个 WinFactory 创建 WinButton/WinCheckbox/WinMenu 一整族，换 MacFactory 切换整族，保证不混搭。工厂方法只管单个产品，无法保证「一族配套」，此时升级为抽象工厂。`,
    tags: ["工厂方法", "抽象工厂", "产品族", "开闭原则", "C++ 实现"],
  },
  {
    id: "ctr-design-test-4",
    chapter: "ctr-design-test",
    level: 4,
    question: `用 C++ 实现一个观察者模式（Subject 持有 \`vector<weak_ptr<Observer>>\` 而非 shared_ptr），并解释为什么用 weak_ptr 更安全。被观察对象析构时如何保证观察者不被调用悬空对象？`,
    answer:
      `用 weak_ptr 实现观察者模式的动机：观察者可能在任何时刻被销毁（如 UI 窗口关闭），若 Subject 持有 shared_ptr<Observer>，会阻止观察者析构（引用计数不归零），且极易循环引用泄漏（Observer 又持有 Subject 的 shared_ptr 时）。用 weak_ptr 让 Subject 「观察但不拥有」，观察者可自由销毁，Subject 通知时先检测是否还活着。\n\n实现骨架：\n\`\`\`cpp\nclass Observer {\npublic:\n  virtual ~Observer() = default;\n  virtual void update(const std::string& msg) = 0;\n};\nclass Subject {\n  std::vector<std::weak_ptr<Observer>> observers;\npublic:\n  void subscribe(std::shared_ptr<Observer> o) {\n    observers.push_back(o);\n  }\n  void notify(const std::string& msg) {\n    for (auto it = observers.begin(); it != observers.end(); ) {\n      if (auto sp = it->lock()) {  // 提升为 shared_ptr，检测是否存活\n        sp->update(msg);          // 还活着就通知\n        ++it;\n      } else {\n        it = observers.erase(it);  // 已销毁，从列表移除\n      }\n    }\n  }\n};\n\`\`\`\n\nweak_ptr 更安全的原因：\n1. 不延长观察者生命周期：weak_ptr 不增加引用计数，观察者无人引用时正常析构，避免 Subject 持有 shared_ptr 导致观察者「赖着不死」。\n2. 避免循环引用：若观察者也持有 Subject 的 shared_ptr（常见，为了取消订阅），双方互持 shared_ptr 成环泄漏。Subject 一侧改 weak_ptr 即打破环。\n3. 通知时安全检测：\`lock()\` 提升失败说明观察者已销毁，跳过并清理，不会调用悬空对象。\n\n被观察对象（Subject）析构时保证不调用悬空观察者：\n- Subject 析构前应清空 observers 或在析构里不再 notify。一般 Subject 析构意味着它不再发通知，列表中的 weak_ptr 随 Subject 一起销毁，不会误调。\n- 真正要防的是「观察者先析构了，Subject 还在发通知」——这由 notify 里的 lock() 检测解决。\n- 若观察者析构时想主动取消订阅，可在观察者析构里调用 subject->unsubscribe(this)，但这要求 Observer 持有 Subject 指针，要注意顺序。更稳妥是让 notify 容忍失效项（如上，lock 失败就 erase），惰性清理，不要求观察者析构时回调。\n\n线程安全补充：多线程下 notify 与 subscribe 并发需加锁保护 observers 容器；update 回调里若再操作 Subject 要防递归/重入。生产级实现常用「拷贝一份 observers 再逐个通知」降低持锁区间。`,
    tags: ["观察者模式", "weak_ptr", "循环引用", "悬空对象", "C++ 实现", "综合分析"],
  },
];
