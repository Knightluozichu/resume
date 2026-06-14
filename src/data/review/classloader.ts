import type { ReviewQuestion } from "./types";
export const classloaderQuestions: ReviewQuestion[] = [
  { id: "cl-1", chapter: "classloader", level: 1, question: "Android ClassLoader 继承体系是什么？", answer: "ClassLoader→BootClassLoader(系统核心类)/BaseDexClassLoader→PathClassLoader(已安装App)/DexClassLoader(外部dex)。", tags: ["继承体系"] },
  { id: "cl-2", chapter: "classloader", level: 1, question: "双亲委派模型的流程是什么？为什么要这样就做？", answer: "loadClass→检查缓存→委托parent加载→parent找不到→自己findClass。目的：安全——防止核心类被篡改(BootClassLoader先加载系统Activity→App自定义的同名类永不生效)。", tags: ["双亲委派"] },
  { id: "cl-3", chapter: "classloader", level: 2, question: "热修复怎么利用 ClassLoader 替换有 bug 的类？", answer: "补丁 dex 插入 PathClassLoader 的 dexElements 数组最前面。ClassLoader 从前往后遍历找类→先找到补丁里的修复版→后面有bug的类被'遮蔽'。", tags: ["热修复"] },
  { id: "cl-4", chapter: "classloader", level: 2, question: "PathClassLoader 和 DexClassLoader 有什么区别？各用于什么场景？", answer: "PathClassLoader：只能加载已安装APK的dex→系统默认。DexClassLoader：可加载任意路径的dex→热修复(补丁dex)、插件化(插件APK)。", tags: ["ClassLoader区别"] },
  { id: "cl-5", chapter: "classloader", level: 3, question: "热修复补丁不生效最常见原因是什么？怎么解决？", answer: "补丁加载太晚——要修复的类在补丁前已被加载缓存。loadClass 第一步就命中缓存返回旧类。解决：在 Application.attachBaseContext() 尽早加载补丁。", tags: ["加载时机"] },
];
