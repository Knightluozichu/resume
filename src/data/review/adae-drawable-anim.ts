import type { ReviewQuestion } from "./types";

export const adaeDrawableAnimQuestions: ReviewQuestion[] = [
  {
    id: "adae-da-1",
    chapter: "adae-drawable-anim",
    level: 1,
    question: `Drawable是什么？常见的Drawable种类有哪些？`,
    answer:
      `Drawable是Android中「可绘制对象」的抽象（一种图像资源的通用表示），它不一定是图片，可以是颜色、形状、图层组合等，能在Canvas上draw自己，比View轻量。常见种类：①BitmapDrawable——包装位图，支持平铺/拉伸等显示模式。②ShapeDrawable——用XML定义纯色或渐变、圆角、描边，可做圆角背景、渐变按钮，无需图片资源。③LayerDrawable——多层Drawable叠加（类似PS图层），可做带阴影/多效果的复合背景。④StateListDrawable——按状态（pressed/selected/focused/enabled）切换不同Drawable，selector标签，做按钮按压效果。⑤LevelListDrawable——按level值（0~10000）切换不同Drawable，做电量/进度条。⑥InsetDrawable——给Drawable加内边距。⑦ClipDrawable——按level裁剪显示比例，做进度展开。Drawable可通过setBackground/setImageDrawable绑到View，也可独立绘制，是UI视觉的基石。`,
    tags: ["Drawable", "ShapeDrawable", "StateListDrawable", "可绘制对象"],
  },
  {
    id: "adae-da-2",
    chapter: "adae-drawable-anim",
    level: 2,
    question: `View动画（补间动画）和属性动画有什么本质区别？为什么推荐属性动画？`,
    answer:
      `本质区别：①作用对象——View动画（AlphaAnimation/TranslateAnimation等）只能作用于View；属性动画（ObjectAnimator/ValueAnimator）可作用于任意对象的任意属性。②效果本质——View动画只是「视觉变换」，通过改变View的绘制矩阵实现平移/缩放/旋转/透明，View的真实位置（left/top）和事件响应区域不变；属性动画真实地修改对象的属性值（如View的translationX），所以位置和点击区域会跟着变。③交互——View动画移动后的View，点击区域还在原处（事件仍按原始位置响应），属性动画移动后点击区域跟着移动。④功能——View动画只支持四种变换，属性动画支持任意属性渐变（颜色、宽度、自定义属性），还能用TypeEvaluator自定义估值、用AnimatorSet组合编排。⑤兼容——属性动画是3.0引入。推荐属性动画是因为它「真实改变状态」，交互正确、可扩展性强，View动画只适合纯视觉过渡且不涉及交互的场景。`,
    tags: ["View动画", "属性动画", "补间动画", "ObjectAnimator", "本质区别"],
  },
  {
    id: "adae-da-3",
    chapter: "adae-drawable-anim",
    level: 3,
    question: `属性动画中ValueAnimator、ObjectAnimator、TypeEvaluator、Interpolator分别起什么作用？`,
    answer:
      `属性动画四要素：①ValueAnimator——动画的「数值发生器」，不直接操作对象，只按时间从startValue到endValue计算当前值（ofInt/ofFloat/ofObject），需在AnimatorUpdateListener里拿到animatedValue自己赋给目标属性。它是基础，ObjectAnimator内部也用它。②ObjectAnimator——ValueAnimator的便捷封装，ofFloat(view, \"translationX\", 0, 100)，自动把每次计算的值通过反射赋给view的setTranslationX方法，省去手动监听。要求目标有对应的setter且属性可访问。③TypeEvaluator——估值器，定义「值如何在起止间过渡」。IntEvaluator/FloatEvaluator做线性数值过渡，ArgbEvaluator做颜色过渡；自定义Evaluator可实现贝塞尔曲线等任意轨迹（如按二阶贝塞尔算x,y）。④Interpolator——插值器，定义「时间比例→进度比例」的映射，控制节奏。LinearInterpolator匀速，AccelerateInterpolator加速，DecelerateInterpolator减速，OvershootInterpolator回弹。Evaluator决定「值怎么算」，Interpolator决定「时间怎么分配」，两者配合实现丰富的动画曲线。`,
    tags: ["ValueAnimator", "ObjectAnimator", "TypeEvaluator", "Interpolator"],
  },
  {
    id: "adae-da-4",
    chapter: "adae-drawable-anim",
    level: 2,
    question: `帧动画（Frame Animation）是什么？它有什么缺点？`,
    answer:
      `帧动画（AnimationDrawable）通过顺序播放一组预先准备好的图片（类似GIF）实现动画：①定义——在res/drawable用<animation-list>包裹多个<item drawable duration>，每项是一张图和显示时长。②使用——把该drawable设为View的background，然后((AnimationDrawable)view.getBackground()).start()启动。③缺点：资源占用大——每帧都是一张独立图片，帧数多则内存和APK体积激增；不可控——只能播放/停止，不能像属性动画那样插值、反转、监听进度；OOM风险——大量Bitmap加载易内存溢出；性能差——逐帧加载绘制不如属性动画流畅。④适用场景——短而精的序列（loading小动画、表情），不适合长或复杂动画。现代实践多属性动画或Lottie替代。原则：能用属性动画就别用帧动画，帧动画仅作简单序列的补充。`,
    tags: ["帧动画", "AnimationDrawable", "GIF", "缺点"],
  },
];
