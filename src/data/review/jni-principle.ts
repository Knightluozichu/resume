import type { ReviewQuestion } from "./types";
export const jniPrincipleQuestions: ReviewQuestion[] = [
  { id: "jni-1", chapter: "jni-principle", level: 1, question: "JNI 的静态注册和动态注册有什么区别？", answer: "静态：按 Java_包名_类名_方法名 命名→ART在.so符号表查找。动态：JNI_OnLoad里RegisterNatives建立方法-函数指针映射表。动态注册不怕ProGuard混淆、更灵活→Android Framework全用。", tags: ["注册方式"] },
  { id: "jni-2", chapter: "jni-principle", level: 1, question: "写出 `String getName(int id, String key)` 的 JNI 函数签名。", answer: "`(ILjava/lang/String;)Ljava/lang/String;`。int=I，String=Ljava/lang/String;，返回String。", tags: ["函数签名"] },
  { id: "jni-3", chapter: "jni-principle", level: 2, question: "JNIEnv 能跨线程传递吗？为什么？", answer: "不能。JNIEnv 是线程绑定的——每个线程有独立的 JNIEnv。跨线程传递用会导致崩溃。子线程使用 JNI 必须先 JavaVM.AttachCurrentThread 获取。", tags: ["JNIEnv"] },
  { id: "jni-4", chapter: "jni-principle", level: 2, question: "为什么 Android Framework 源码全部用动态注册而不是静态注册？", answer: "① 不受ProGuard混淆影响；② 更高效——RegisterNatives直接建立映射，不需要运行时遍历符号表；③ 更灵活——可在JNI_OnLoad控制注册时机。", tags: ["动态注册"] },
  { id: "jni-5", chapter: "jni-principle", level: 3, question: "静态注册被 ProGuard 混淆后为什么 UnsatisfiedLinkError？怎么修？", answer: "ProGuard改了Java类名/包名→静态注册的 C 函数名对不上→符号表找不到。修复：要么 keep 含 native 方法的类，要么改用动态注册(不受混淆影响)。", tags: ["ProGuard"] },
];
