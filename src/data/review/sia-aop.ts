import type { ReviewQuestion } from "./types";

export const siaAopQuestions: ReviewQuestion[] = [
  {
    id: "sia-aop-1",
    chapter: "sia-aop",
    level: 2,
    question: `AOP 的五个核心概念是什么？它们如何协作？`,
    answer:
      `五个概念：①切面（Aspect）——封装横切关注点的类，用 @Aspect 标注；②切点（Pointcut）——定义「在哪些方法上生效」，用 execution 表达式匹配；③通知（Advice）——定义「做什么」及「何时做」，五种类型；④连接点（JoinPoint）——程序执行中可织入的点，Spring 仅支持方法级连接点；⑤织入（Weaving）——把切面应用到目标对象创建代理的过程，Spring 用运行时代理。协作关系：切面 = 切点 + 通知，切点定位「在哪」，通知定义「做什么」，织入在运行时通过代理把通知插入到切点匹配的方法调用前后。`,
    tags: ["AOP概念", "切面"],
  },
  {
    id: "sia-aop-2",
    chapter: "sia-aop",
    level: 3,
    question: `@Around 通知为什么最强大？它和 @Before/@After 有什么区别？`,
    answer:
      `@Around 最强大因为它完全包裹目标方法，可以控制：①是否执行目标——调用 pjp.proceed() 才执行，不调用则跳过；②修改参数——pjp.proceed(newArgs) 传入新参数；③修改返回值——proceed() 后可替换返回结果；④吞掉异常——try-catch 后不重抛；⑤前后都做逻辑——兼具 @Before 和 @After 能力。区别：@Before/@After 只能在固定时机做副作用，无法控制目标执行、无法改参数和返回值；@Around 等价于「手写代理方法」。代价是 @Around 最复杂容易写错（忘记 proceed() 导致目标不执行）。实践：简单日志/计时用 @Around，前置检查用 @Before，后置清理用 @After，需要控制执行流程时才用 @Around。`,
    tags: ["通知类型", "@Around"],
  },
  {
    id: "sia-aop-3",
    chapter: "sia-aop",
    level: 3,
    question: `为什么 Spring AOP 的内部方法自调用会失效？怎么解决？`,
    answer:
      `原因：Spring AOP 用运行时代理织入。容器为 Bean 创建代理对象，外部调用经过代理（代理执行通知→调用目标方法）；但方法内部用 this.xxx() 调用，this 指向原始对象而非代理，所以不经过代理，AOP（包括 @Transactional）失效。解决方式：①注入自身代理——@Autowired private OrderService self; 然后用 self.methodB()（self 是代理对象）；②AopContext.currentProxy()——((OrderService) AopContext.currentProxy()).methodB()，需开启 @EnableAspectJAutoProxy(exposeProxy=true)；③重构设计——把要自调用的方法拆到另一个 Bean（推荐，避免自调用本身就是更好的设计）。根本建议：AOP 失效往往说明设计有问题，优先重构而非 hack 绕过。`,
    tags: ["AOP失效", "代理"],
  },
  {
    id: "sia-aop-4",
    chapter: "sia-aop",
    level: 4,
    question: `声明式事务（@Transactional）作为 AOP 的典型应用，有哪些关键配置和陷阱？`,
    answer:
      `@Transactional 由 AOP 在方法周围织入开启事务/提交/回滚逻辑，业务方法不写事务代码。关键配置：①rollbackFor——默认只回滚 RuntimeException 和 Error，受检异常不回滚，rollbackFor=Exception.class 扩展；②propagation 传播行为——REQUIRED（默认，加入当前事务）、REQUIRES_NEW（新开事务挂起当前）、NESTED（嵌套）；③readOnly=true 只读事务优化；④timeout 超时回滚。陷阱：①内部自调用失效——this.xxx() 不经过代理，@Transactional 失效；②非 public 方法失效——默认 JDK 代理只拦截 public；③try-catch 吞异常导致不回滚——捕获异常不重抛，AOP 感知不到异常就不回滚；④rollbackFor 默认不含受检异常——IOException 不会回滚（需配 rollbackFor）。生产环境建议显式 rollbackFor=Exception.class 并避免在事务方法内吞异常。`,
    tags: ["声明式事务", "陷阱"],
  },
];
