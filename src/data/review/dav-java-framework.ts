import type { ReviewQuestion } from "./types";

export const davJavaFrameworkQuestions: ReviewQuestion[] = [
  {
    id: "dav-jf-1",
    chapter: "dav-java-framework",
    level: 1,
    question: `ZygoteInit.main()做了哪些核心工作？为什么Zygote要预加载资源？`,
    answer: `三步：①preload()预加载系统类和资源；②forkSystemServer()创建system_server进程；③runSelectLoop()循环等待AMS请求fork新应用进程。预加载原因：Zygote是所有应用进程的父进程，fork采用COW机制，子进程共享父进程物理内存页，只有写入时才复制。预加载的类和资源被所有应用进程共享，无需重复加载，提升启动速度并降低内存占用。`,
    tags: ["ZygoteInit", "preload", "forkSystemServer", "COW"],
  },
  {
    id: "dav-jf-2",
    chapter: "dav-java-framework",
    level: 2,
    question: `ClassLoader的双亲委派模型是什么？插件化如何突破它？`,
    answer: `双亲委派：loadClass()先检查已加载，再委托parent加载，parent加载不了才自己findClass()。保证核心类不被篡改。插件化突破：反射合并dexElements数组——获取插件DexClassLoader的pathList.dexElements，获取宿主PathClassLoader的pathList.dexElements，合并两个数组，反射设置回宿主pathList.dexElements。这样宿主findClass()遍历dexElements时就能找到插件类，绕过双亲委派。`,
    tags: ["ClassLoader", "双亲委派", "插件化", "dexElements"],
  },
  {
    id: "dav-jf-3",
    chapter: "dav-java-framework",
    level: 3,
    question: `插件化如何欺骗AMS启动未注册的Activity？详细描述hook流程。`,
    answer: `两步hook：①hook IActivityManager——动态代理拦截startActivity，将原始Intent（PluginActivity）替换为StubActivity（Manifest预注册），原始Intent存入extra。AMS检查通过创建StubActivity。②hook ActivityThread的Handler.Callback——拦截LAUNCH_ACTIVITY消息，从extra取出原始Intent还原为PluginActivity。关键：AMS在system_server只见StubActivity；ActivityThread在应用进程内偷梁换柱。需理解Activity启动流程和Handler消息机制。`,
    tags: ["插件化", "StubActivity", "hook", "IActivityManager", "Handler"],
  },
  {
    id: "dav-jf-4",
    chapter: "dav-java-framework",
    level: 2,
    question: `Binder Java层如何封装Native层能力？ServiceManager(Java)的作用是什么？`,
    answer: `IBinder接口定义transact()；Binder类的transact()由native execTransact()实现，onTransact()由AIDL Stub重写；BinderProxy持有native BpBinder指针，transact()通过JNI调用BpBinder.transact()→ioctl与驱动交互；Parcel底层通过native writeTo/readFrom与驱动交互。ServiceManager(Java)是Java层访问系统服务的入口：getService(name)通过JNI调用native ServiceManager返回IBinder代理，App再通过asInterface包装为Manager类使用。`,
    tags: ["Binder Java层", "ServiceManager", "IBinder", "Parcel", "AIDL"],
  },
];
