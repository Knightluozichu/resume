import type { ReviewQuestion } from "./types";

export const apoLayoutOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "apo-lo-1",
    chapter: "apo-layout-optimization",
    level: 2,
    question: "为什么 View 层级深会导致卡顿？measure/layout/draw 的递归机制是什么？",
    answer:
      "View树的渲染流程是measure→layout→draw三个阶段，每个阶段都是递归遍历。measure阶段：父View调用每个子View的measure()，子View再递归调用自己的子View，自上而下传递MeasureSpec，自下而上返回测量结果。layout阶段：父View调用每个子View的layout()确定位置，子View递归layout自己的子View。draw阶段：从根View开始递归draw，每个View先画自己再画子View。层级越深递归次数越多：7层嵌套约2^7=128次，3层约2^3=8次，差距16倍。特别是LinearLayout的layout_weight会导致二次measure：第一遍测量原始大小算权重，第二遍按权重结果再测一次。深层嵌套+weight叠加是卡顿常见原因。ConstraintLayout用Cassowary约束求解算法一次遍历完成measure/layout，避免递归。",
    tags: ["View层级", "measure/layout/draw", "递归", "二次measure"],
  },
  {
    id: "apo-lo-2",
    chapter: "apo-layout-optimization",
    level: 2,
    question: "ViewStub 和 View.GONE 有什么区别？为什么 ViewStub 更好？",
    answer:
      "区别：①View.GONE是View已存在于视图树中但不可见，仍然占内存、已完成inflate和初始化，只是不参与measure/layout/draw；ViewStub是一个宽高为0的占位符，目标布局尚未inflate，不占内存、不初始化。②View.GONE切换为VISIBLE只需改变可见性标志；ViewStub调用inflate()时才真正解析XML布局并创建View对象。③ViewStub inflate后自身从视图树移除，被加载的布局替代，只能inflate一次。ViewStub更好的原因：错误页、空状态、加载动画等不一定显示的布局，如果用View.GONE会在页面初始化时就创建所有View对象（即使永远不会显示），浪费内存和初始化时间。用ViewStub则只在真正需要显示时才加载，实现「按需加载」。典型场景：网络错误页、空列表提示、高级设置面板。",
    tags: ["ViewStub", "View.GONE", "懒加载", "按需加载"],
  },
  {
    id: "apo-lo-3",
    chapter: "apo-layout-optimization",
    level: 3,
    question: "如何检测和消除过度绘制？给出一个完整的优化流程。",
    answer:
      "检测：①开发者选项→调试GPU过度绘制 ②屏幕用颜色表示过度绘制次数：原色=0次（理想）、蓝色=1次（可接受）、绿色=2次（需关注）、粉色=3次（需优化）、红色=4次以上（严重）③查看核心页面是否大面积红色。消除流程：①分析红色区域原因——通常多层背景叠加 ②移除Activity theme的windowBackground（如果布局根View设了背景）或反过来 ③移除DecorView默认背景：theme中设windowBackground为@null ④移除中间层ViewGroup的背景，只保留最底层View的背景 ⑤自定义View用canvas.clipRect()限制绘制区域，只画可见部分 ⑥RecyclerView/ListView移除背景（列表项已有背景时不需要容器背景）⑦用android:background=\"@null\"显式移除不需要的背景 ⑧优化后重新检测，确认核心区域降到蓝色或原色。GPU过度绘制检测是最直观的渲染优化手段。",
    tags: ["过度绘制", "GPU过度绘制", "背景优化", "clipRect"],
  },
  {
    id: "apo-lo-4",
    chapter: "apo-layout-optimization",
    level: 3,
    question: "include+merge 的工作原理是什么？为什么 merge 能减少层级？",
    answer:
      "原理：include标签用于在当前布局中插入另一个布局文件，插入时被引用布局的根View会直接放到include的位置。如果被引用布局的根是一个ViewGroup（如LinearLayout），那么include后当前布局就会多一层ViewGroup——这层可能是不必要的。merge标签的作用是作为被引用布局的根标签，它本身不对应任何View对象，inflate时会被「透明」地替换为其子View列表。因此用merge作为公共布局的根标签，include后这些子View直接放到include所在的父ViewGroup中，不增加额外层级。典型场景：公共头部布局有标题和图标两个View，如果用LinearLayout包裹，include后多一层；用merge包裹，include后标题和图标直接放到父布局中，层级不变。注意：merge的子View的layout属性需要在使用include时通过覆盖来设置。",
    tags: ["include", "merge", "布局复用", "层级优化"],
  },
];
