import type { ReviewQuestion } from "./types";

export const davNativeLayerQuestions: ReviewQuestion[] = [
  {
    id: "dav-nl-1",
    chapter: "dav-native-layer",
    level: 1,
    question: "JNI的静态注册和动态注册有什么区别？动态注册的源码流程是什么？",
    answer: "静态注册按命名规则Java_包名_类名_方法名自动关联，简单但函数名固定长、查找慢。动态注册在JNI_OnLoad()中通过RegisterNatives()手动注册：①定义JNINativeMethod数组（方法名/签名/函数指针三元组）；②JNI_OnLoad中GetEnv获取JNIEnv；③FindClass获取jclass；④RegisterNatives注册到方法表。优势：函数名自定义、查找快、可做初始化。Java调用native方法直接查方法表跳转。",
    tags: ["JNI", "静态注册", "动态注册", "RegisterNatives"],
  },
  {
    id: "dav-nl-2",
    chapter: "dav-native-layer",
    level: 2,
    question: "详细描述MediaScanner案例中Java与C++的完整交互流程。",
    answer: "Java→Native：Java processDirectory()→JNI跳转→C++ android_media_MediaScanner_processDirectory()→GetStringUTFChars转C字符串→调用MyMediaScanner.processDirectory()扫描。Native→Java回调：扫描到文件→MyMediaScannerClient.callScanFile()→GetObjectClass获取jclass→GetMethodID获取scanFile的jmethodID→CallVoidMethod回调Java scanFile()。完整闭环：Java→JNI→C++→JNI→Java。",
    tags: ["MediaScanner", "JNI回调", "CallVoidMethod", "GetMethodID"],
  },
  {
    id: "dav-nl-3",
    chapter: "dav-native-layer",
    level: 2,
    question: "JNIEnv的线程安全规则是什么？子线程如何使用JNI？",
    answer: "JNIEnv只在当前线程有效，不能跨线程传递。JavaVM是进程级单例，可跨线程共享。子线程使用JNI：①在JNI_OnLoad中保存JavaVM到全局变量gJavaVM；②子线程调用gJavaVM->AttachCurrentThread(&env, NULL)获取该线程专属JNIEnv；③使用env调用JNI函数；④用完调用gJavaVM->DetachCurrentThread()释放。忘记Detach会导致线程资源泄漏。",
    tags: ["JNIEnv", "线程安全", "JavaVM", "AttachCurrentThread"],
  },
  {
    id: "dav-nl-4",
    chapter: "dav-native-layer",
    level: 3,
    question: "JNI的三种引用类型分别是什么？编程中如何避免引用泄漏？",
    answer: "局部引用（默认，返回自动释放，上限512个）、全局引用（NewGlobalRef创建，跨方法线程，需DeleteGlobalRef）、弱全局引用（NewWeakGlobalRef，不阻止GC，用前检查NULL）。避免泄漏：①循环中局部引用用完立即DeleteLocalRef或用PushLocalFrame/PopLocalFrame；②缓存jclass用全局引用（FindClass→NewGlobalRef→DeleteLocalRef）；③全局引用配对DeleteGlobalRef；④线程退出前DetachCurrentThread释放局部引用表。",
    tags: ["局部引用", "全局引用", "弱全局引用", "引用泄漏", "DeleteLocalRef"],
  },
];
