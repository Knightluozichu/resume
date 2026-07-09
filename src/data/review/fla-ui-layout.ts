import type { ReviewQuestion } from "./types";

export const flaUiLayoutQuestions: ReviewQuestion[] = [
  {
    id: "fla-ui-1",
    chapter: "fla-ui-layout",
    level: 2,
    question: "RecyclerView相比ListView有哪些核心优势？其三件套（Adapter/LayoutManager/ViewHolder）各自的作用是什么？",
    answer:
      "RecyclerView的核心优势：①强制ViewHolder模式——ListView的convertView复用需手动实现ViewHolder（容易遗漏），RecyclerView将ViewHolder作为必须的内置机制，onCreateViewHolder创建、onBindViewHolder绑定，强制解耦创建和绑定逻辑。②布局灵活——通过LayoutManager切换排列方式（LinearLayoutManager线性、GridLayoutManager网格、StaggeredGridLayoutManager瀑布流），ListView只能垂直滚动。③细粒度刷新——提供notifyItemInserted/notifyItemRemoved/notifyItemChanged等局部刷新方法，配合DiffUtil自动计算差异，避免全局notifyDataSetChanged。④内置动画——ItemAnimator提供item增删移除的默认动画。⑤装饰器——ItemDecoration支持自定义分隔线/边距。三件套作用：①Adapter——桥接数据与视图，负责创建ViewHolder和绑定数据到控件。②LayoutManager——决定item的布局排列和滚动方向，管理item的测量、布局和回收。③ViewHolder——持有item中各控件的引用（findViewById只执行一次），避免滚动时重复查找。复用流程：滑出屏幕的ViewHolder放入RecycledViewPool，新item进入屏幕时从池中取复用，只调onBindViewHolder重新绑定数据，不重新inflate布局。",
    tags: ["RecyclerView", "Adapter", "LayoutManager", "ViewHolder", "复用"],
  },
  {
    id: "fla-ui-2",
    chapter: "fla-ui-layout",
    level: 2,
    question: "Android六大布局各自的特点和适用场景是什么？为什么推荐ConstraintLayout？",
    answer:
      "六大布局特点：①LinearLayout——线性排列（水平/垂直），通过orientation指定方向，layout_weight按比例分配剩余空间。适合简单线性排列，但嵌套多时层级深影响性能。②RelativeLayout——相对定位，控件可相对父容器或其他控件定位（above/below/toLeftOf/toRightOf），灵活但属性多容易写乱。③ConstraintLayout——约束布局（Android推荐），通过约束关系（app:layout_constraintXXX）连接控件的边到其他控件或父容器，支持链（Chain）、比例（Guideline）、屏障（Barrier）等高级特性。核心优势是扁平化：一个ConstraintLayout可以替代多层嵌套的LinearLayout+RelativeLayout，减少View树层级，降低measure/layout的开销，提升渲染性能。④FrameLayout——帧布局，控件层叠堆放（后添加的在上方），gravity控制对齐。适合Fragment切换容器或叠加层。⑤TableLayout——表格布局，TableRow行+列结构，适合规整的表单。⑥GridLayout——网格布局，行列网格，比TableLayout更灵活。选型建议：首选ConstraintLayout扁平化布局，简单线性用LinearLayout，Fragment容器用FrameLayout，尽量减少嵌套层级。",
    tags: ["布局", "ConstraintLayout", "扁平化", "性能优化"],
  },
  {
    id: "fla-ui-3",
    chapter: "fla-ui-layout",
    level: 3,
    question: "如何实现一个自定义View？需要重写哪些方法？",
    answer:
      "自定义View的实现步骤：①继承View（或现有控件）——创建类继承View，提供构造函数（Context+AttributeSet用于XML解析）。②自定义属性——在res/values/attrs.xml中声明<declare-styleable>定义属性，在XML中通过命名空间引用，在构造函数中用TypedArray读取属性值。③重写onMeasure(int widthMeasureSpec, int heightMeasureSpec)——测量View大小，解析MeasureSpec（EXACTLY/AT_MOST/UNSPECIFIED模式），根据内容和父容器约束计算最终宽高，调用setMeasuredDimension()设置。不重写则默认wrap_content不生效（表现为match_parent效果）。④重写onDraw(Canvas canvas)——绘制View内容，用Canvas和Paint绘制图形/文字/图片。Canvas提供drawRect/drawCircle/drawText/drawPath等方法，Paint设置颜色/样式/抗锯齿/字体大小。注意onDraw中不要创建对象（每次绘制都调用，创建对象导致GC频繁）。⑤重写onTouchEvent(MotionEvent event)——处理触摸交互，解析ACTION_DOWN/MOVE/UP，返回true消费事件。⑥重写onLayout（仅ViewGroup）——如果是自定义ViewGroup，需重写onLayout定位子View位置。⑦性能优化——使用invalidate()触发重绘（主线程），postInvalidate()（子线程），避免在onDraw中分配对象，复杂绘制用硬件加速。",
    tags: ["自定义View", "onMeasure", "onDraw", "onTouchEvent", "Canvas"],
  },
  {
    id: "fla-ui-4",
    chapter: "fla-ui-layout",
    level: 1,
    question: "Android中常用的基本控件有哪些？各自的核心属性是什么？",
    answer:
      "常用基本控件：①TextView——文本显示，核心属性：text（文本内容）、textSize（字体大小，建议用sp）、textColor（文字颜色）、maxLines（最大行数）、ellipsize（省略号位置end/middle）。②EditText——文本输入（继承TextView），核心属性：hint（提示文字）、inputType（输入类型text/password/number/phone）、maxLength（最大长度）。③Button——按钮（继承TextView），核心属性：text、onClick（XML绑定点击事件）、background（背景）。④ImageView——图片显示，核心属性：src（图片资源）、scaleType（缩放类型fitXY/centerCrop/centerInside）、adjustViewBounds（调整宽高比）。⑤ProgressBar——进度条，核心属性：max（最大值）、progress（当前进度）、style（水平/圆形）。⑥AlertDialog——对话框，通过AlertDialog.Builder构建：setTitle/setMessage/setPositiveButton/setNegativeButton。⑦ListView/RecyclerView——列表展示。⑧ViewPager2——页面滑动切换。⑨CheckBox/RadioButton——选择控件。⑩Spinner——下拉选择。控件属性可通过XML设置（静态）或代码设置（动态），尺寸用dp、字体用sp、颜色在res/values/colors.xml中定义。",
    tags: ["控件", "TextView", "EditText", "Button", "ImageView"],
  },
];
