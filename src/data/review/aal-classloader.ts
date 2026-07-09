import type { ReviewQuestion } from "./types";

export const aalClassloaderQuestions: ReviewQuestion[] = [
  {
    id: "aal-cl-1",
    chapter: "aal-classloader",
    level: 1,
    question: "Android中有哪些类加载器？它们的层级关系是怎样的？",
    answer: "Android类加载器层级（从上到下）：①BootClassLoader——加载核心类库（java.lang.*、java.util.*等），由C++实现，是所有ClassLoader的根parent；②PathClassLoader——Android应用的默认类加载器，加载已安装APK的classes.dex（路径在/data/app/），每个App进程都有一个PathClassLoader实例；③DexClassLoader——可以加载任意路径的dex/jar/apk文件，是插件化和热修复的核心加载器。层级关系：PathClassLoader和DexClassLoader都继承自BaseDexClassLoader，它们的parent都是BootClassLoader。双亲委派：加载类时先交给parent加载，parent加载失败才自己加载。PathClassLoader只能加载/data/app/目录下已安装的APK（没有optimizedDirectory参数），DexClassLoader可以指定任意dex路径和optimizedDirectory（优化后的odex输出目录）。在Android 8.0+后两者实现基本相同。",
    tags: ["ClassLoader", "BootClassLoader", "PathClassLoader", "DexClassLoader"]
  },
  {
    id: "aal-cl-2",
    chapter: "aal-classloader",
    level: 2,
    question: "双亲委派机制（Parent Delegation）的工作流程是什么？为什么需要双亲委派？",
    answer: "双亲委派工作流程：当ClassLoader收到loadClass()请求时：①先检查类是否已被加载（findLoadedClass），如果已加载直接返回；②如果没有，先委托parent加载（parent.loadClass()），parent会递归向上委派直到BootClassLoader；③如果parent加载成功则返回，如果parent加载失败（抛出ClassNotFoundException），则自己调用findClass()尝试加载。为什么需要双亲委派：①安全性——防止用户伪造核心类（如自定义java.lang.String），因为核心类始终由BootClassLoader优先加载，用户自定义的String永远不会被加载；②唯一性——保证同一个类只被加载一次，避免类的重复加载和类型冲突；③层次清晰——核心类由BootClassLoader加载，应用类由PathClassLoader加载，职责分明。打破双亲委派的场景：插件化需要加载外部dex中的类，通常通过DexClassLoader加载，并将parent设置为宿主的PathClassLoader，使插件可以访问宿主类。",
    tags: ["双亲委派", "Parent Delegation", "loadClass", "安全性"]
  },
  {
    id: "aal-cl-3",
    chapter: "aal-classloader",
    level: 3,
    question: "热修复（Hot Fix）的原理是什么？如何实现类的替换？",
    answer: "热修复原理：通过DexClassLoader加载补丁dex中的修复后的类，并让它优先于原有bug类被加载。实现类的替换核心是操纵dexElements数组：①BaseDexClassLoader内部通过DexPathList管理dex文件列表，DexPathList中有一个dexElements数组，存储了所有dex文件的Element；②类加载时findClass()会按dexElements数组的顺序遍历查找类，找到第一个匹配的就返回；③热修复的关键：将补丁dex插入到dexElements数组的头部，这样查找类时会先在补丁dex中找到修复后的类，原有bug类就不会被加载。实现步骤：①通过反射获取PathClassLoader的pathList（DexPathList）字段；②用DexClassLoader加载补丁dex，获取其pathList.dexElements；③通过反射获取宿主PathClassLoader的pathList.dexElements；④将补丁的dexElements拼接到宿主dexElements前面，通过反射设置回宿主的pathList.dexElements；⑤这样后续加载修复过的类时，会先从补丁dex中找到修复后的类。典型框架：Tinker、Sophix、Amigo。",
    tags: ["热修复", "Hot Fix", "dexElements", "DexPathList", "反射"]
  },
  {
    id: "aal-cl-4",
    chapter: "aal-classloader",
    level: 3,
    question: "插件化框架的核心原理是什么？如何启动插件APK中的Activity？",
    answer: "插件化核心原理：通过DexClassLoader加载插件APK的代码，突破PathClassLoader只能加载已安装APK的限制，实现动态加载未安装的APK。启动插件Activity的关键挑战：Activity需要在AMS中注册（Manifest中声明），但插件的Activity不在宿主Manifest中，AMS会拒绝启动。解决方案有两种：①Hook AMS（预注册占坑）——在宿主Manifest中预注册若干个空的Stub Activity（占坑），启动插件Activity时先用Stub Activity的Intent欺骗AMS（AMS检查通过），然后在ActivityThread创建Activity实例时通过Hook替换为真正的插件Activity；②启动流程：App调用startActivity(插件Activity) → Hook拦截，替换为Stub Activity的Intent → AMS检查通过 → AMS通知ActivityThread创建Stub Activity → Hook ActivityThread的handler/Instrumentation拦截，替换回插件Activity → 用DexClassLoader加载插件Activity类并实例化；③资源处理：插件Activity需要访问插件APK的资源，通过新建Resources对象加载插件APK的resources.arsc；④生命周期：Stub Activity在AMS中有完整生命周期，通过Hook将生命周期回调转发给插件Activity。典型框架：VirtualAPK、RePlugin、Shadow。",
    tags: ["插件化", "DexClassLoader", "Hook AMS", "占坑Activity", "动态加载"]
  }
];
