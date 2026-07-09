import type { ReviewQuestion } from "./types";

export const apoMemoryOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "apo-mo-1",
    chapter: "apo-memory-optimization",
    level: 2,
    question: "JVM 堆的新生代和老年代在 GC 策略上有什么区别？为什么 Major GC 会导致卡顿？",
    answer:
      "新生代（Eden+S0+S1）：用复制算法，GC时将Eden和当前Survivor中存活的对象复制到另一个Survivor区，然后清空原区域。Minor GC触发频繁（Eden满即触发）但速度快，因为大部分对象朝生夕死存活少复制量小。老年代：用标记-清除或标记-整理算法，需遍历所有对象标记存活者，然后清除或整理碎片。Major GC/Full GC触发不频繁但速度慢。Major GC导致卡顿原因：①采用Stop-The-World机制暂停所有应用线程 ②老年代对象多标记和整理耗时 ③整理阶段需移动对象并更新引用暂停时间可达几百毫秒 ④一次Major GC就可能造成连续多帧丢帧。优化方向：减少晋升到老年代的对象（避免内存泄漏+控制长期缓存大小），减少Full GC触发频率。",
    tags: ["JVM堆", "新生代", "老年代", "Major GC", "Stop-The-World"],
  },
  {
    id: "apo-mo-2",
    chapter: "apo-memory-optimization",
    level: 3,
    question: "LeakCanary 检测内存泄漏的原理是什么？列出四种常见泄漏模式及修复方法。",
    answer:
      "LeakCanary原理四步：①通过Application.registerActivityLifecycleCallbacks监听Activity onDestroy回调 ②onDestroy后用WeakReference包装该Activity并关联ReferenceQueue ③触发GC，检查ReferenceQueue中是否有该WeakReference（被回收的WeakReference会被放入ReferenceQueue）④如果WeakReference未出现在ReferenceQueue中说明Activity未被回收=泄漏，Dump堆内存用Shark库分析从GcRoot到该Activity的最短引用链报告泄漏原因。四种常见泄漏模式：①静态变量持有Activity——改为持有ApplicationContext或WeakReference ②非静态内部类隐式持有外部Activity引用——改为静态内部类+WeakReference ③Handler延迟消息——onDestroy时调用handler.removeCallbacksAndMessages(null) ④注册未反注册——onDestroy时unregisterReceiver/EventBus.unregister。",
    tags: ["LeakCanary", "内存泄漏", "WeakReference", "GcRoot"],
  },
  {
    id: "apo-mo-3",
    chapter: "apo-memory-optimization",
    level: 3,
    question: "一张 4000x3000 的 ARGB_8888 Bitmap 占多少内存？如何优化到目标显示尺寸 200x150？",
    answer:
      "原始内存：4000*3000*4字节=48MB（ARGB_8888每像素4字节）。优化步骤：①先用inJustDecodeBounds=true解码只获取原始尺寸（outWidth=4000,outHeight=3000）不分配内存 ②计算inSampleSize：4000/200=20，3000/150=20取20，但inSampleSize必须是2的幂取16 ③用inSampleSize=16+inJustDecodeBounds=false重新解码得到250x188的Bitmap内存=250*188*4=188KB ④进一步用inPreferredConfig=RGB_565（每像素2字节）内存降到94KB ⑤或用Glide的.override(200,150)自动完成采样+缩放。从48MB优化到94KB节省99.8%。注意inSampleSize=16后尺寸是250x188而非精确200x150，需ImageView的scaleType做最终缩放。Bitmap是内存大户必须按需加载。",
    tags: ["Bitmap", "inSampleSize", "RGB_565", "内存优化"],
  },
  {
    id: "apo-mo-4",
    chapter: "apo-memory-optimization",
    level: 2,
    question: "什么是内存抖动？如何检测和消除？给出一个完整案例。",
    answer:
      "内存抖动指短时间内大量创建和销毁对象导致Eden区快速填满频繁触发Minor GC。检测：①Memory Profiler中内存曲线呈锯齿状（快速上升后突然下降=GC）②CPU Profiler中看到频繁GC事件 ③Allocations跟踪发现同一类型对象被反复创建。完整案例——自定义View onDraw中创建Paint：问题代码onDraw中每帧val paint=Paint()，60fps下每秒创建60个Paint对象GC频繁触发。修复：①将Paint提取为成员变量初始化一次private val paint=Paint()，onDraw中只复用 ②类似地Rect/Path/Matrix等对象都应复用 ③字符串拼接用StringBuilder替代+ ④循环内避免创建临时集合改为成员变量提前分配 ⑤Message用Message.obtain()从对象池获取 ⑥修复后Memory Profiler锯齿消失帧率稳定60fps。本质：减少短生命周期对象的创建通过对象复用降低GC频率。",
    tags: ["内存抖动", "Minor GC", "对象复用", "onDraw"],
  },
];
