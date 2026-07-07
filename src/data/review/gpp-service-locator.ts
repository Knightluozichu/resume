import type { ReviewQuestion } from "./types";

/** 服务定位器复习题 */
export const gppServiceLocatorQuestions: ReviewQuestion[] = [
  {
    id: "gpp-service-locator-01",
    chapter: "gpp-service-locator",
    level: 1,
    question: "服务定位器（Service Locator）的意图是什么？",
    answer:
      "意图：为某些全局需要的服务（音频、日志、配置等）提供一个统一的访问入口，让调用方不必硬编码依赖具体实现，也不必把服务实例层层传参。\n\n核心机制：\n- 一个 `ServiceLocator` 类持有一个服务实例引用（如 `audioService`）。\n- 调用方通过 `ServiceLocator.getAudio()` 获取服务，而非自己 new 或持有引用。\n- 服务实例可在启动时或运行时注册/替换——`ServiceLocator.provideAudio(new ConsoleAudio())`。\n\n解决的问题：\n- 避免单例的「硬编码全局唯一」——服务定位器允许替换服务实例（测试时换 Mock、不同平台换不同实现）。\n- 避免「依赖层层透传」——不用把 `AudioService` 从 main 一路传到每个需要发声的对象。\n- 集中管理服务的「提供」与「获取」，调用方只依赖服务接口。\n\n与直接全局变量的区别：服务定位器返回的是「接口」，具体实现可换；全局变量通常绑死具体类型。定位器多了一层间接，换来了可替换性。",
    tags: ["意图", "全局访问", "服务", "可替换"],
  },
  {
    id: "gpp-service-locator-02",
    chapter: "gpp-service-locator",
    level: 2,
    question: "服务定位器与单例模式有什么区别？",
    answer:
      "相似点：都提供「全局访问点」，都让某对象在系统各处可用而不必层层传参。\n\n核心区别：\n\n1. 实例数量与可替换性：\n- 单例：强制全局唯一实例（`instance` 静态字段），一旦创建通常不可替换。换实现要改单例类本身。\n- 服务定位器：只提供「访问入口」，背后的服务实例可被 `provide()` 替换——测试时换 Mock，发布时换真实实现，运行时也可切换。实例不强制唯一（虽然通常只持有一个）。\n\n2. 依赖的是「接口」还是「具体类」：\n- 单例：调用方通常直接依赖单例的具体类（`AudioManager.instance.play()`），强耦合。\n- 服务定位器：定位器返回服务接口（`IAudio`），调用方依赖接口，不知道具体实现是谁。\n\n3. 初始化时机：\n- 单例：通常懒加载，首次访问时创建，初始化时机不可控。\n- 服务定位器：由外部显式 `provide()` 注册，初始化时机明确可控（启动时注册好）。\n\n4. 可测试性：\n- 单例：难以 Mock——单例是静态全局的，测试时无法替换，会污染所有测试。\n- 服务定位器：测试前 `provide(mockService)`，测试用 Mock，测完恢复——可测试性好。\n\n5. 「找不到」的处理：\n- 单例：永远存在（自己保证创建），不会「找不到」。\n- 服务定位器：可能「服务还没注册就有人调 `getAudio()`」——需处理 null（返回 null 服务或抛异常）。\n\n6. 耦合的隐蔽性（两者共同的缺点）：\n- 单例：调用 `XXX.instance` 把依赖硬编码进代码，难以静态分析依赖关系。\n- 服务定位器：调用 `ServiceLocator.getAudio()` 同样把依赖藏在代码里，比构造函数注入更隐蔽——看起来解耦了，实际仍隐式依赖全局定位器。\n\n一句话：单例是「全局唯一的实现」，服务定位器是「全局可替换的接口」。定位器比单例灵活（可换实现、可测），但两者都有「隐式全局依赖」的根本缺陷——现代工程更推荐依赖注入（DI）把依赖显式注入，而非用定位器隐式获取。",
    tags: ["对比", "单例", "服务定位器", "可替换", "可测试性"],
  },
  {
    id: "gpp-service-locator-03",
    chapter: "gpp-service-locator",
    level: 3,
    question: "游戏中如何用服务定位器注册音频/日志/配置系统？",
    answer:
      "设计：\n\n1. 定义服务接口：\n`interface IAudio { play(name: string): void; stopAll(): void }`\n`interface ILogger { log(msg: string): void; error(msg: string): void }`\n`interface IConfig { get(key: string): string }`\n\n2. 实现具体服务：\n- `ConsoleAudio` 实现真实声卡播放；`NullAudio` 是空实现（用于服务未注册或静音模式，`play()` 啥也不做）。\n- `FileLogger` 写文件；`JsonConfig` 从 JSON 读配置。\n\n3. 服务定位器（静态类持有服务引用）：\n- `Services.getAudio()` / `getLogger()` / `getConfig()` 返回当前注册的服务。\n- `Services.provideAudio(a)` / `provideLogger(l)` / `provideConfig(c)` 注册/替换服务。\n- 默认持有 Null 实现，避免未注册时返回 null。\n\n4. 启动时注册（根据平台/模式）：\n- 正式环境：`Services.provideAudio(new ConsoleAudio())`、`Services.provideLogger(new FileLogger('game.log'))`、`Services.provideConfig(new JsonConfig(loadFile('config.json')))`。\n- 静音模式/无声卡平台：`Services.provideAudio(new NullAudio())`——静音：空实现，安全调用。\n\n5. 任意代码处使用（不传参，不 new）：\n`Services.getAudio().play('explosion')`——用当前注册的音频服务。\n`Services.getLogger().log('explosion at ...')`——用当前注册的日志。\n`const dmg = Number(Services.getConfig().get('explosion_damage'))`。\n\n效果：\n- 调用方不持有服务引用，也不从构造函数接收——通过定位器按需获取。\n- 换音频实现（PC 用 OpenAL、移动端用 NullAudio 节省资源）只改启动注册，调用方零改动。\n- 默认 Null 实现保证「即使没注册也不崩溃」，调用方拿到空服务安全调用。\n- 日志/配置等同理，全局可访问且可替换。\n\n注意：这是经典用法。现代工程会警惕「全局隐式依赖」——调用方看起来不依赖音频，实际运行时却需要音频服务已注册，这种隐式依赖在大型项目里会增加理解成本。小到中型游戏用服务定位器足够便捷；大型项目倾向依赖注入把服务显式注入。",
    tags: ["应用", "音频", "日志", "配置", "注册", "Null实现"],
  },
  {
    id: "gpp-service-locator-04",
    chapter: "gpp-service-locator",
    level: 4,
    question: "服务定位器为什么难以测试？如何解决这个测试困难问题？",
    answer:
      "测试困难的原因：\n\n1. 隐式全局依赖：\n- 代码里调 `Services.getAudio().play()`，看起来不依赖任何参数，实际隐式依赖「定位器已注册音频服务」。\n- 单元测试某个类时，从它的构造函数/方法签名看不出它需要哪些服务——必须读实现代码才知道它偷偷调了定位器。这让「隔离测试」变难：你以为测的是 `Explosion`，实际它拖出了音频、日志、配置一串全局服务。\n\n2. 全局状态污染：\n- 定位器是静态全局的。测试 A 用 `provideAudio(MockA)`，测试 B 用 `provideAudio(MockB)`。若测试间没正确恢复，A 的 Mock 会泄漏到 B，导致测试相互影响、时好时坏（flaky tests）。\n- 并行测试时尤其严重——多个测试同时改同一个全局定位器，竞态条件。\n\n3. 服务未注册的 null 风险：\n- 测试某类时忘了注册它依赖的服务，`getAudio()` 返回 null（或 NullAudio），测试可能「意外通过」（因为空实现不报错）或诡异失败。难以发现「忘了提供依赖」。\n\n4. Mock 注入繁琐：\n- 每个测试要 `Services.provideXxx(mock)`，测完要 `restore()`。setup/teardown 代码冗长，易遗漏。\n\n解决方案：\n\n1. 改用依赖注入（DI）——根治方案：\n- 不用定位器，而是把服务作为构造函数参数显式传入：`class Explosion { constructor(audio: IAudio, logger: ILogger) {...} }`。\n- 依赖在签名里显式可见，测试时直接 `new Explosion(mockAudio, mockLogger)`，无全局状态。\n- 用 DI 容器（如 tsyringe、InversifyJS）在组合根统一装配，开发时享受「自动注入」便利，测试时可手动传 Mock。\n- 这是现代工程的主流推荐，彻底消除隐式全局依赖。\n\n2. 若必须用定位器，加可测试性补救：\n- 每个测试 setUp 时保存原服务、注入 Mock，tearDown 时恢复：`beforeEach` 里 `this.saved = Services.getAudio(); Services.provideAudio(mock)`，`afterEach` 里 `Services.provideAudio(this.saved)`。\n- 用作用域定位器（非纯静态）：定位器做成实例对象，每个测试创建独立实例，避免全局污染。游戏代码通过传入的定位器实例而非静态类访问服务。\n- 提供 `reset()` 方法测试间清空所有注册。\n\n3. 服务接口加 `isAvailable()` 检查：\n- 让「服务未注册」显式可查，测试 setup 时断言所有依赖服务已就绪，及早发现遗漏。\n\n4. 区分「全局唯一」与「可注入」服务：\n- 真正全局唯一、无副作用的服务（如只读配置）用定位器无妨。\n- 有副作用、需 Mock 的服务（音频、网络、日志）尽量注入，不进定位器。\n\n综合判断：服务定位器的测试困难根子在「静态全局状态 + 隐式依赖」。根治之道是依赖注入——把依赖从「隐式全局获取」改成「显式参数传入」。定位器适合快速原型或全局只读服务；一旦项目需要严肃的单元测试，应逐步迁移到 DI。这也是为什么本书把服务定位器列为「解耦型模式」但同时警告其代价——解耦了具体实现，却耦合了定位器本身。",
    tags: ["综合", "测试困难", "全局状态", "依赖注入", "Mock", "可测试性"],
  },
];
