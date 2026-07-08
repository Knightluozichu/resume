import type { ReviewQuestion } from "./types";

export const uhmDataBindingQuestions: ReviewQuestion[] = [
  {
    id: "uhm-data-binding-1",
    chapter: "uhm-data-binding",
    level: 1,
    question: "数据绑定的核心原理是什么？",
    answer: "数据绑定的核心是观察者模式：数据源持有订阅者列表，值变化时遍历列表通知所有订阅者。UI 元素是订阅者，收到通知后更新显示。数据源是唯一的真相，界面是它的投影。",
    tags: ["数据绑定", "观察者模式"],
  },
  {
    id: "uhm-data-binding-2",
    chapter: "uhm-data-binding",
    level: 2,
    question: "单向绑定和双向绑定在 HMI 中分别用于什么场景？",
    answer: "单向绑定（数据→UI）用于纯显示场景，如车速、转速、油量等只读信息。双向绑定（数据↔UI）用于可交互控件，如亮度调节滑块——用户拖滑块改数据，数据变化也更新滑块位置。HMI 中大部分是单向绑定，双向绑定用于设置类控件。",
    tags: ["单向绑定", "双向绑定"],
  },
  {
    id: "uhm-data-binding-3",
    chapter: "uhm-data-binding",
    level: 3,
    question: "脏标记如何减少无效 UI 刷新？具体机制是什么？",
    answer: "不用脏标记时每次赋值立即触发 UI 更新，一帧内 10 次赋值导致 10 次刷新，但只有最后一次可见。用脏标记后：赋值时只设 _dirty = true 不更新 UI；帧末（LateUpdate 或定时器）统一检查脏标记，只刷新一次。10 次赋值合并为 1 次 UI 更新，大幅降低 CPU/GPU 开销。",
    tags: ["脏标记", "批量更新", "性能优化"],
  },
  {
    id: "uhm-data-binding-4",
    chapter: "uhm-data-binding",
    level: 4,
    question: "订阅事件时常见的内存泄漏问题是什么？如何彻底避免？",
    answer: "问题是：UI 元素销毁后数据源仍持有对其的引用（通过事件委托），导致 GC 无法回收，造成内存泄漏；且数据源下次触发事件时调用已销毁对象的方法会抛空引用异常。避免方法：在 OnEnable 中订阅、OnDisable 中取消订阅，确保生命周期对称；或使用弱引用事件系统（WeakReference Event），让数据源不阻止订阅者被 GC 回收。HMI 长时间运行场景中必须严格处理此问题。",
    tags: ["内存泄漏", "生命周期", "事件订阅", "综合"],
  },
];
