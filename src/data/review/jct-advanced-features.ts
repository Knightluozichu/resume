import type { ReviewQuestion } from "./types";

export const jctAdvancedFeaturesQuestions: ReviewQuestion[] = [
  {
    id: "jct-af-1",
    chapter: "jct-advanced-features",
    level: 2,
    question: "Java 注解的 @Retention 有哪几种策略？它们分别什么时候可用？",
    answer:
      "@Retention 三种策略：①RetentionPolicy.SOURCE——注解只在源码中存在，编译后丢弃。如 @Override、@SuppressWarnings，仅用于编译器检查，运行时不存在。②RetentionPolicy.CLASS（默认）——注解保留到 class 文件中，但运行时 JVM 不加载。如字节码工具（ASM/CGLIB）可在 class 文件层面读取，但反射读不到。③RetentionPolicy.RUNTIME——注解保留到运行时，可通过反射读取。如 Spring 的 @Component/@Autowired、JPA 的 @Entity/@Column、JUnit 的 @Test。使用场景：编译检查用 SOURCE（@Override 防止拼错方法名）；字节码处理用 CLASS（字节码增强工具）；运行时框架用 RUNTIME（Spring 依赖注入、ORM 映射、单元测试）。自定义注解通常用 RUNTIME + @Target（限定标注位置：TYPE/FIELD/METHOD/CONSTRUCTOR/PARAMETER 等）+ @Retention(RUNTIME)，然后通过反射 `cls.getAnnotation(MyAnno.class)` 读取。@Repeatable（Java 8+）允许同一注解多次标注。",
    tags: ["注解", "@Retention", "反射"],
  },
  {
    id: "jct-af-2",
    chapter: "jct-advanced-features",
    level: 3,
    question: "Java 反射能做什么？反射的性能问题如何优化？",
    answer:
      "反射能力：①运行时获取类信息——Class.forName(\"com.example.User\")，getDeclaredFields() 获取所有字段（含 private），getDeclaredMethods() 获取所有方法；②动态创建对象——cls.getDeclaredConstructor().newInstance()（替代已废弃的 cls.newInstance()）；③动态调用方法——`Method m = cls.getDeclaredMethod(\"setName\", String.class); m.setAccessible(true); m.invoke(obj, \"Alice\")`；④动态读写字段——`Field f = cls.getDeclaredField(\"name\"); f.setAccessible(true); f.get(obj)`。用途：框架核心——Spring IoC 扫描注解创建 Bean，ORM 反射读写实体字段，JSON 序列化反射获取字段值。性能问题：反射比直接调用慢 10~100 倍（JIT 优化后差距缩小）。优化：①缓存反射结果——Method/Field 对象获取开销大，应缓存复用而非每次重新获取；②setAccessible(true) 跳过访问检查；③MethodHandle（Java 7+）比反射更快；④MethodInvoker/LambdaMetafactory（Java 8+）将反射转为 Lambda 调用，接近直接调用性能；⑤框架级用 ASM/CGLIB 字节码增强生成代理类，比反射快。",
    tags: ["反射", "性能优化", "框架"],
  },
  {
    id: "jct-af-3",
    chapter: "jct-advanced-features",
    level: 3,
    question: "类加载器的双亲委派模型是什么？为什么要这么设计？",
    answer:
      "双亲委派模型：类加载请求先委派给父加载器，父加载器加载不到再自己加载。层次：BootstrapClassLoader（C++ 实现，加载 rt.jar 核心类如 java.lang.*）→ ExtClassLoader/PlatformClassLoader（加载 ext/jdk.ext.dirs 扩展类）→ AppClassLoader（加载 classpath 应用类）→ 自定义 ClassLoader。工作流程：AppClassLoader 收到加载请求 → 委派给 ExtClassLoader → 委派给 BootstrapClassLoader → Bootstrap 找不到 → ExtClassLoader 找 → AppClassLoader 找。设计原因：①安全——防止核心类被篡改（用户自定义 java.lang.String 会被 Bootstrap 的 String 覆盖，用户版本不会被加载）；②唯一性——同一类只会被加载一次（同一加载器+同一类名=同一 Class 对象），避免类的重复加载。打破双亲委派：①SPI 机制——线程上下文 ClassLoader 让父加载器请求子加载器加载（JDBC DriverManager）；②Tomcat——每个 Web 应用独立 ClassLoader，隔离不同应用的类；③热部署/热加载——自定义 ClassLoader 重新加载类实现更新。",
    tags: ["类加载器", "双亲委派", "安全"],
  },
  {
    id: "jct-af-4",
    chapter: "jct-advanced-features",
    level: 4,
    question: "动态代理有哪两种实现方式？它们的原理和区别是什么？",
    answer:
      "两种动态代理：①JDK 动态代理（java.lang.reflect.Proxy）——基于接口，被代理类必须实现接口。原理：运行时生成实现指定接口的代理类字节码（$Proxy0），代理类的每个方法调用 InvocationHandler.invoke()。使用：`Proxy.newProxyInstance(loader, interfaces, handler)`，handler 中 `method.invoke(target, args)` 调用真实对象。②CGLIB 代理——基于继承，无需接口。原理：运行时用 ASM 生成被代理类的子类字节码，重写非 final 方法，在方法中插入拦截逻辑（MethodInterceptor.intercept()）。区别：①JDK 代理需要接口，CGLIB 不需要但需要类非 final 且方法非 final；②JDK 代理生成速度快，CGLIB 生成速度慢但首次生成后调用速度快；③CGLIB 不能代理 final 类和 final 方法；④JDK 代理是 JDK 内置无依赖，CGLIB 需要第三方库。Spring AOP：有接口默认用 JDK 代理（Spring Boot 2.x 默认 CGLIB），可通过 `spring.aop.proxy-target-class=true` 强制 CGLIB。应用场景：AOP（事务、日志、权限）、RPC 远程调用桩、懒加载（Hibernate）、Mock 测试框架。",
    tags: ["动态代理", "JDK代理", "CGLIB"],
  },
];
