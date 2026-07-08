import type { ReviewQuestion } from "./types";

export const siaSpringCoreQuestions: ReviewQuestion[] = [
  {
    id: "sia-sc-1",
    chapter: "sia-spring-core",
    level: 2,
    question: "控制反转（IoC）和依赖注入（DI）是什么关系？IoC 解决了什么问题？",
    answer:
      "IoC 是思想，DI 是实现。IoC（控制反转）指把对象创建和依赖查找的控制权从业务代码「反转」给容器——对象不再主动 new 依赖，而是被动等待容器注入。DI（依赖注入）是 IoC 的具体实现方式：容器通过构造器、setter 或字段把依赖「注入」到对象中。IoC 解决的核心问题是紧耦合：传统方式中对象自己 new 依赖，换实现就要改源码；IoC 让对象只依赖接口，由容器注入具体实现，生产注入真实实现、测试注入 mock，源码不动，实现了松耦合。",
    tags: ["IoC", "依赖注入"],
  },
  {
    id: "sia-sc-2",
    chapter: "sia-spring-core",
    level: 3,
    question: "为什么构造器注入优于字段注入？至少说出三点。",
    answer:
      "三点优势：①不可变性——构造器注入可以声明 final 字段，对象初始化后依赖不可变，线程安全且防止意外修改；②可测试性——脱离 Spring 容器也能用 new OrderService(mockRepo, mockClient) 构造对象进行单元测试，不需要反射或启动容器；③依赖显式——构造器参数列表明确声明所有必需依赖，不看字段注解就知道依赖什么。此外构造器注入还能在启动时暴露循环依赖（A 依赖 B、B 依赖 A 会直接报错），强迫重新设计。Spring 4.3+ 单构造器 Bean 自动注入，连 @Autowired 都不用写，简洁性不输字段注入。字段注入的三大问题：非 final 不不可变、脱离容器无法测试 mock、隐藏依赖。",
    tags: ["依赖注入", "最佳实践"],
  },
  {
    id: "sia-sc-3",
    chapter: "sia-spring-core",
    level: 3,
    question: "Bean 生命周期的四个阶段是什么？每个阶段容器做什么？",
    answer:
      "四阶段：①实例化——容器通过反射调用构造器创建 Bean 对象（此时只是空对象，依赖未注入）；②属性填充——容器根据 @Autowired/@Value 注入依赖和配置值（此时依赖可用）；③初始化——依次调用 @PostConstruct、BeanPostProcessor 的前后处理、InitializingBean.afterPropertiesSet、自定义 init-method（此时 Bean 完全就绪）；④销毁——容器关闭时依次调用 @PreDestroy、DisposableBean.destroy、自定义 destroy-method（释放资源、关闭连接）。关键扩展点：BeanPostProcessor 在初始化前后介入，Spring AOP 的代理对象就是在此阶段替换原始 Bean 的。",
    tags: ["Bean生命周期", "容器"],
  },
  {
    id: "sia-sc-4",
    chapter: "sia-spring-core",
    level: 4,
    question: "Spring 如何处理循环依赖？为什么构造器注入的循环依赖无法解决？",
    answer:
      "Spring 通过「三级缓存」支持单例 setter 注入的循环依赖：一级缓存存完全初始化的 Bean、二级缓存存早期暴露的半成品 Bean、三级缓存存 ObjectFactory（用于生成早期引用）。当 A 注入 B、B 注入 A 时：创建 A 实例化后把 ObjectFactory 放入三级缓存 → 注入 B → 创建 B → B 注入 A 时从三级缓存拿到 A 的早期引用 → B 完成 → A 完成。但构造器注入的循环依赖无法解决：因为构造器注入要求在实例化阶段就有依赖，而此时对象还没创建出来无法放入缓存——A 构造时需要 B，B 构造时需要 A，死锁。Spring 默认报错。这其实是优点：强迫开发者重新设计而非掩盖问题。解决方案是重构设计或其中一方改 setter 注入（不推荐掩盖）。",
    tags: ["循环依赖", "容器原理"],
  },
];
