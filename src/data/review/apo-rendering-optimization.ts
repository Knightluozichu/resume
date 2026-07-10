import type { ReviewQuestion } from "./types";

export const apoRenderingOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "apo-ro-1",
    chapter: "apo-rendering-optimization",
    level: 2,
    question: `Android 渲染管线从 VSync 到屏幕显示经过哪些阶段？为什么超过 16ms 会丢帧？`,
    answer:
      `渲染管线八阶段：①VSync信号到达Choreographer接收并分发 ②Input——处理输入事件（触摸/按键）③Animation——计算动画当前值（ObjectAnimator/Transition）④Measure——从根View递归测量每个View宽高 ⑤Layout——从根View递归确定每个View位置 ⑥Draw——生成DisplayList（绘制命令记录）⑦RenderThread——将DisplayList提交给GPU执行渲染到Buffer ⑧SurfaceFlinger合成多个图层Buffer送显。超过16ms丢帧原因：VSync每16.6ms触发一次，如果某帧Input→Draw全流程超16ms，GPU还没渲染完上一帧，下一个VSync到来时没有新帧可显示屏幕重复显示上一帧=丢一帧。双缓冲下还可能导致CPU空等GPU（Buffer被占用），三重缓冲增加一个Buffer缓解但引入一帧延迟。`,
    tags: ["渲染管线", "VSync", "16ms", "丢帧", "三重缓冲"],
  },
  {
    id: "apo-ro-2",
    chapter: "apo-rendering-optimization",
    level: 3,
    question: `硬件加速和软件渲染有什么区别？硬件层在什么场景下使用？使用后为什么要移除？`,
    answer:
      `硬件加速vs软件渲染：①硬件加速：View.draw()生成DisplayList（绘制命令记录）RenderThread将DisplayList提交给GPU执行GPU并行批量处理 ②软件渲染：View.draw()直接在CPU上用Skia画布逐条执行绘制命令 ③硬件加速优势：GPU并行计算能力强、DisplayList可缓存重用（重绘时只重放命令）、RenderThread与UI线程并行工作 ④Android 4.0+默认开启。硬件层使用场景：频繁变化的属性动画（translationX/Y、scaleX/Y、rotation、alpha），将View缓存为GPU纹理动画时直接变换纹理不需要重新measure/layout/draw。使用后要移除原因：①硬件层占用GPU显存存储纹理不需要时释放避免浪费 ②硬件层缓存的纹理在View内容变化时需重新生成如果View内容频繁变化反而增加开销 ③正确模式：动画开始setLayerType(HARDWARE)动画结束setLayerType(NONE)。API 21+ Property Animator自动管理硬件层。`,
    tags: ["硬件加速", "软件渲染", "硬件层", "DisplayList", "RenderThread"],
  },
  {
    id: "apo-ro-3",
    chapter: "apo-rendering-optimization",
    level: 3,
    question: `RecyclerView 有哪些性能优化手段？DiffUtil 相比 notifyDataSetChanged 有什么优势？`,
    answer:
      `RecyclerView六大优化：①ViewHolder复用——已内置确保onBindViewHolder轻量 ②setHasFixedSize(true)——Item尺寸不随内容变化时跳过requestLayout ③预取（prefetch）——滑动时在空闲帧提前绑定下一个Item默认开启 ④DiffUtil——精确计算列表差异只更新变化的Item ⑤共享RecycledViewPool——多个RecyclerView共享回收池 ⑥预加载——距底部N项时提前加载更多数据。DiffUtil优势：notifyDataSetChanged通知adapter全量刷新所有可见Item都重新bind（即使内容没变）无动画效果。DiffUtil用Myers差分算法计算新旧列表最小编辑集精确通知adapter哪些位置插入/删除/移动/修改只bind变化的Item支持增删动画。1000条列表notifyDataSetChanged要bind全部可见项约10个DiffUtil可能只需bind 1-2个。注意DiffUtil计算应在后台线程（calculateDiff在后台dispatchUpdatesTo在主线程）。`,
    tags: ["RecyclerView", "DiffUtil", "ViewHolder", "预取", "性能优化"],
  },
  {
    id: "apo-ro-4",
    chapter: "apo-rendering-optimization",
    level: 4,
    question: `如何用 Choreographer 实现线上帧率监控？监控到丢帧后如何定位原因？`,
    answer:
      `线上帧率监控实现：通过Choreographer.postFrameCallback注册FrameCallback，doFrame回调中记录两次frameTimeNanos的差值。差值/16ms-1=丢帧数。累计丢帧数超阈值（如3帧）时记录现场信息（页面名/操作类型/时间戳）批量上报。代码：注册FrameCallback，doFrame中计算与上一帧时间差超过16ms记录丢帧数postFrameCallback重新注册形成循环。定位丢帧原因：①用GPU Profile Rendering柱状图看丢帧时颜色分布——蓝色高=measure/layout/draw慢，红色高=GPU绘制慢 ②用Perfetto抓gfx+view+sched trace找到超16ms的帧查看view轨道哪个阶段耗时长 ③用CPU Profiler录制trace找帧渲染期间主线程热点方法 ④常见原因：a)onDraw中创建对象（内存抖动→GC→卡顿）b)布局层级太深（measure/layout递归慢）c)主线程做了IO/DB d)动画期间频繁invalidate e)RecyclerView onBindViewHolder中图片解码 f)过度绘制导致GPU负载重。针对性优化后用Choreographer监控验证帧率恢复。`,
    tags: ["Choreographer", "帧率监控", "丢帧", "线上监控"],
  },
];
