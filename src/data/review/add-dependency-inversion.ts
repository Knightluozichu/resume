import type { ReviewQuestion } from "./types";

/** 依赖倒置与边界复习题 */
export const addDependencyInversionQuestions: ReviewQuestion[] = [
  {
    id: "add-dependency-inversion-01",
    chapter: "add-dependency-inversion",
    level: 1,
    question: "依赖倒置原则（DIP）的两条核心规则是什么？什么是「稳定依赖」？",
    answer:
      "依赖倒置原则（DIP）的两条核心规则：\n\n1. 高层模块不应依赖低层模块，二者都应依赖抽象：\n传统设计中，高层业务逻辑直接调用低层基础设施（如业务逻辑直接调用数据库驱动）。DIP 要求双方都依赖中间的抽象层（接口）——高层调用接口，低层实现接口。这样高层和低层之间没有直接依赖，通过抽象解耦。\n\n2. 抽象不应依赖细节，细节应依赖抽象：\n「抽象」指接口/抽象类（稳定的、高层的），「细节」指具体实现（易变的、低层的）。接口定义不应该引用具体实现类，而具体实现类要实现接口。简言之：接口不关心谁来实现，实现必须遵守接口。\n\n稳定依赖（Stable Dependencies Principle, SDP）：\n\n「依赖应该指向稳定的方向。」一个包/模块被依赖的次数越多，它就越应该稳定（不常变化）；一个经常变化的模块不应该被很多其他模块依赖。\n\n稳定性度量：一个模块的稳定性 = 它依赖的模块数 / (它依赖的模块数 + 依赖它的模块数)。如果模块 A 被很多模块依赖但自己不依赖别人，它的稳定性接近 1（最稳定）；如果模块 A 依赖很多模块但没人依赖它，稳定性接近 0（最不稳定）。\n\n稳定依赖原则要求：依赖方向应该从「不稳定」指向「稳定」——不稳定的模块依赖稳定的模块，而不是反过来。因为如果稳定模块依赖了不稳定模块，不稳定模块一变，稳定模块也得跟着变，它就不稳定了。\n\nDIP 与稳定依赖的关系：DIP 通过引入抽象（接口）来反转依赖方向，本质就是让依赖指向更稳定的一方（抽象比具体实现稳定）。两者是同一思想在不同层面的体现——DIP 是类级别，稳定依赖是包/模块级别。",
    tags: ["DIP", "依赖倒置", "稳定依赖", "SDP", "抽象", "定义"],
  },
  {
    id: "add-dependency-inversion-02",
    chapter: "add-dependency-inversion",
    level: 2,
    question: "什么是「边界（Boundary）」？在架构中为什么要划分边界？边界划分的核心依据是什么？",
    answer:
      "边界（Boundary）是系统中不同模块/子系统之间的分界线，边界两侧的代码可以独立变化、独立部署、独立替换。边界处通常通过接口（抽象）来连接，使两侧不产生直接依赖。\n\n为什么要划分边界：\n\n1. 隔离变化：\n系统中不同部分的「变化速率」不同——业务逻辑相对稳定，技术基础设施（数据库、消息队列、第三方 API）变化频繁。边界把变化快的和变化慢的隔开，让基础设施的变化不会波及业务核心。\n\n2. 保护核心：\n系统的核心价值在业务逻辑（「这个系统到底解决什么业务问题」），而非技术细节（用什么数据库、什么框架）。边界确保核心业务逻辑不依赖外围技术细节，使核心可以被独立测试、独立复用。\n\n3. 独立开发与部署：\n有了清晰的边界，不同团队可以并行开发各自的模块，只要边界接口契约不变，内部实现怎么改都行。边界也使得独立部署成为可能（如微服务）。\n\n4. 决策延迟：\n边界让「不可逆决策」可以被推迟。如果业务核心通过接口与数据库交互，那么「用什么数据库」这个决策可以被推迟到最后责任时刻，而不阻塞核心业务逻辑的开发。\n\n边界划分的核心依据——「变化的方向」和「变化的速率」：\n\n1. 按变化方向划分：\n如果两个模块因不同的原因、在不同的时间变化，它们之间就应该有边界。如「订单业务逻辑」和「MySQL 数据访问」——前者因业务规则变化，后者因技术选型变化，变化原因不同，应有边界。\n\n2. 按变化速率划分：\n变化快的模块不应被变化慢的模块依赖。业务策略（如折扣规则）可能每周变，而「订单」这个概念本身可能几年不变。两者应有边界，且依赖方向从变化快指向变化慢（稳定依赖）。\n\n3. 按业务领域划分：\n在 DDD 中，限界上下文就是天然的边界——不同业务子领域有自己的模型和语言，边界让它们各自演化不互相干扰。\n\n边界的技术实现：\n- 接口（抽象）：边界处定义接口，两侧通过接口通信。\n- 依赖注入：高层定义接口，低层实现接口，通过 DI 容器注入。\n- 防腐层（ACL）：在与遗留系统或第三方系统交界处加一层翻译，保护内部模型不被外部「腐蚀」。\n- 适配器：把外部 API 的接口形态转换成内部期望的接口形态。\n\n一句话：边界就是系统里的「防火墙」——一边着火不会烧到另一边。划界的依据不是「技术好不好看」，而是「哪里会变、变得多快」。",
    tags: ["边界", "Boundary", "隔离变化", "保护核心", "变化方向", "变化速率"],
  },
  {
    id: "add-dependency-inversion-03",
    chapter: "add-dependency-inversion",
    level: 3,
    question: "用代码示例说明：一个业务模块直接依赖 MySQL 数据访问层，如何通过 DIP 重构？重构后带来了什么好处？",
    answer:
      "场景：用户注册业务，直接依赖 MySQL 数据访问。\n\n重构前（高层直接依赖低层，依赖未倒置）：\n```typescript\n// 低层：MySQL 数据访问（细节）\nclass MySQLUserRepository {\n  save(user: User): void {\n    // 直接写 MySQL SQL\n    db.execute('INSERT INTO users ...');\n  }\n}\n\n// 高层：注册业务逻辑（直接依赖 MySQL 实现）\nclass RegistrationService {\n  private userRepo = new MySQLUserRepository();  // 直接 new 具体类\n\n  register(email: string, password: string): void {\n    // 业务规则\n    if (this.userRepo.findByEmail(email)) {\n      throw new Error('邮箱已注册');\n    }\n    const user = new User(email, hashPassword(password));\n    this.userRepo.save(user);  // 直接调用 MySQL 实现\n  }\n}\n```\n问题：\n- RegistrationService 直接依赖 MySQLUserRepository，换数据库要改业务代码。\n- 无法单元测试——测试 register() 必须连真实 MySQL。\n- 业务逻辑和技术实现耦合，违反 DIP。\n\n重构后（引入抽象，依赖倒置）：\n```typescript\n// 1. 定义抽象接口（稳定，属于高层）\ninterface UserRepository {\n  findByEmail(email: string): User | null;\n  save(user: User): void;\n}\n\n// 2. 高层业务逻辑依赖抽象接口，不依赖具体实现\nclass RegistrationService {\n  constructor(private userRepo: UserRepository) {}  // 依赖注入\n\n  register(email: string, password: string): void {\n    if (this.userRepo.findByEmail(email)) {\n      throw new Error('邮箱已注册');\n    }\n    const user = new User(email, hashPassword(password));\n    this.userRepo.save(user);\n  }\n}\n\n// 3. 低层实现抽象接口（细节依赖抽象）\nclass MySQLUserRepository implements UserRepository {\n  findByEmail(email: string): User | null { /* MySQL 查询 */ }\n  save(user: User): void { /* MySQL 插入 */ }\n}\n\n// 4. 还可以加 PostgreSQL 实现，业务代码一行不改\nclass PostgresUserRepository implements UserRepository {\n  findByEmail(email: string): User | null { /* PostgreSQL 查询 */ }\n  save(user: User): void { /* PostgreSQL 插入 */ }\n}\n\n// 5. 甚至加内存测试实现\nclass InMemoryUserRepository implements UserRepository {\n  private users: User[] = [];\n  findByEmail(email: string): User | null { /* 内存查找 */ }\n  save(user: User): void { this.users.push(user); }\n}\n```\n\n使用方式：\n```typescript\n// 生产环境\nconst service = new RegistrationService(new MySQLUserRepository());\n\n// 测试环境——不需要连数据库\nconst testService = new RegistrationService(new InMemoryUserRepository());\n```\n\n重构带来的好处：\n\n1. 可替换性：从 MySQL 换 PostgreSQL，只需换注入的实现类，业务代码（RegistrationService）一行不改。\n\n2. 可测试性：单元测试注入 InMemoryUserRepository，不依赖真实数据库，测试快且稳定。\n\n3. 依赖方向正确：高层 RegistrationService 依赖抽象 UserRepository，低层 MySQLUserRepository 也依赖抽象（实现接口）。依赖方向从「高层→低层」反转为「两侧→抽象」。\n\n4. 延迟决策：项目初期可以先写 InMemoryUserRepository 跑起来，「用什么数据库」的决策可以推迟到后期再定，不阻塞业务开发。\n\n5. 并行开发：业务开发者写 RegistrationService，数据库开发者写 MySQLUserRepository，双方约定接口后并行工作，互不阻塞。\n\n这就是 DIP 在架构中最常见的落地模式——它也是整洁架构、六边形架构中「依赖方向向内」的技术基础。",
    tags: ["DIP", "代码示例", "重构", "依赖注入", "可测试性", "可替换性"],
  },
  {
    id: "add-dependency-inversion-04",
    chapter: "add-dependency-inversion",
    level: 4,
    question: "在实际项目中，什么时候该用 DIP 引入抽象，什么时候直接依赖具体类更合理？如何避免「过度抽象」？",
    answer:
      "DIP 是强大的设计原则，但并非所有依赖都该倒置。过度抽象会带来接口爆炸、间接层过多、代码可读性下降等问题。判断「该不该引入抽象」需要区分场景。\n\n该用 DIP 引入抽象的场景：\n\n1. 跨越架构边界的依赖：\n业务核心层依赖外部基础设施（数据库、消息队列、第三方 API、文件系统）。这些外部依赖变化频繁、替换可能、且测试时需要隔离。必须在边界处引入接口，倒置依赖。这是 DIP 的首要应用场景。\n\n2. 同一行为有多个实现或预期会有多个：\n如多种支付方式、多种缓存策略、多种日志输出。变化点是真实的，接口抽象有明确的多态收益。\n\n3. 需要单元测试的模块依赖外部资源：\n如果业务逻辑依赖发邮件、调 API、写文件等副作用，测试时需要 Mock。引入接口让测试可以注入 Mock 实现，是可测试性的前提。\n\n4. 不同团队协作的接合点：\n两个团队各自开发的模块之间，接口是最好的契约——双方约定接口后并行开发，实现细节互不干扰。\n\n5. 需要延迟技术决策的点：\n项目初期不确定用什么数据库/消息队列，先定义接口用内存实现跑起来，后期再换真实实现。\n\n不该用 DIP、直接依赖具体类更合理的场景：\n\n1. 系统内部的工具函数/值对象：\n如 `StringUtils.capitalize()`、`Money` 值对象。这些是稳定的、无副作用的、不会被替换的。为它们定义接口纯属多余——只有一个实现，且永远不会有第二个。\n\n2. 同一个模块内部、同一个团队维护的类：\n如果一个类只被同模块内的另一个类使用，且它们一起变化、一起部署，引入接口只是增加间接层，没有解耦收益。直接依赖具体类更直白。\n\n3. 框架提供的稳定 API：\n如标准库的 `List`、`Map`。它们已经足够稳定，再包一层接口没有意义（除非要在测试中 Mock，但通常应该 Mock 自己的代码而非标准库）。\n\n4. 一次性脚本/原型验证：\n预期寿命短的代码，投入抽象的成本收不回来。直接写具体实现更快更清晰。\n\n如何避免过度抽象：\n\n1. Rule of Three（三次法则）：\n同样的依赖模式出现三次以上，再抽象。第一次直接写，第二次容忍重复，第三次才提取接口。避免为「可能」的复用提前抽象。\n\n2. 只有一个实现的接口要警惕：\n如果一个接口只有一个实现，且看不到第二个实现的可能，这个接口可能是过度的。可以保留（为测试 Mock 留余地），但要诚实地评估它是否真的有价值。\n\n3. 区分「架构边界」和「内部边界」：\n架构边界（跨层、跨子系统、跨团队）一定要用接口。模块内部边界可以用抽象类、组合等轻量手段，不必每个类都配接口。\n\n4. 接口应该由消费方定义，而非实现方：\n好的接口是从使用者的需求出发定义的（ISP），而非实现方「把所有方法都暴露出去」。如果发现接口很胖、方法很多，可能是实现方在驱动接口设计，应该反过来问「消费方真正需要哪些方法」。\n\n5. 先具体后抽象（Refactoring to Interfaces）：\n不要在设计阶段就为每个类配接口。先用具体类实现，等真正出现多实现需求或测试 Mock 需求时，再提取接口。这是「最后一次负责时刻」原则在抽象上的应用。\n\n6. 评估抽象的 ROI：\n每个抽象层都有维护成本（多一个文件、多一层间接、多一份理解负担）。只有当抽象带来的收益（可替换性、可测试性、解耦）超过这个成本时才引入。对于「永远不会变」「只有一个实现」「不需要 Mock」的依赖，直接用具体类是更好的工程决策。\n\n总结：DIP 的核心价值是「隔离变化」和「保护核心」。在变化真实存在、核心确实需要保护的地方用 DIP；在稳定不变、同模块内部的依赖上直接用具体类。判断标准不是「是否优雅」，而是「这个抽象有没有在为真实的变化点和测试需求服务」。",
    tags: ["综合", "DIP", "过度抽象", "权衡", "Rule of Three", "工程实践"],
  },
];
