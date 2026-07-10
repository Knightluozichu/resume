import type { ReviewQuestion } from "./types";

export const craUiComponentsQuestions: ReviewQuestion[] = [
  {
    id: "cra-ui-1",
    chapter: "cra-ui-components",
    level: 1,
    question: `Android六大布局管理器各自的特点和适用场景是什么？`,
    answer:
      `①LinearLayout（线性布局）——沿水平或垂直方向排列子View，通过orientation属性控制方向，weight属性按比例分配剩余空间。适合简单线性排列。②RelativeLayout（相对布局）——子View通过above/below/toLeftOf/toRightOf/alignParentX等属性相对定位，灵活性强。适合复杂相对位置界面。③TableLayout（表格布局）——以行（TableRow）为单位组织，支持collapseColumns/shrinkColumns/stretchColumns控制列的隐藏/收缩/拉伸。适合规整表单。④FrameLayout（帧布局）——所有子View层叠堆放在左上角，通过layout_gravity定位。适合Fragment容器和层叠效果。⑤GridLayout（网格布局）——rowCount/columnCount定义网格，layout_columnSpan/layout_rowSpan支持跨列跨行。适合计算器等网格界面。⑥AbsoluteLayout（绝对布局）——通过x/y坐标绝对定位，已废弃，不推荐使用（屏幕适配差）。`,
    tags: ["布局管理器", "LinearLayout", "RelativeLayout", "六大布局"],
  },
  {
    id: "cra-ui-2",
    chapter: "cra-ui-components",
    level: 2,
    question: `AdapterView的工作原理是什么？Adapter在其中扮演什么角色？`,
    answer:
      `AdapterView是列表型容器（ListView/GridView/Spinner/Gallery）的基类，其工作原理是通过Adapter桥接数据源与列表项视图。核心流程：①数据源（List/数组/Cursor/JSON）提供给Adapter。②AdapterView向Adapter请求数量getCount()。③对每个可见位置，AdapterView调用Adapter的getView(position, convertView, parent)获取该位置的View。④getView负责把数据项渲染为列表项View——inflate布局、findViewById获取控件、setData绑定数据。⑤用户滚动时，滑出屏幕的item的View被回收为convertView，新进入的item复用convertView，只重新绑定数据，不重新inflate，这就是View复用机制。Adapter类型：ArrayAdapter（数组+简单布局）、SimpleAdapter（List+Map+多列布局）、BaseAdapter（自定义最灵活，重写getView实现复用优化）。核心：Adapter = 数据与视图的桥梁，getView的convertView复用是列表性能关键。`,
    tags: ["AdapterView", "Adapter", "getView", "View复用", "ListView"],
  },
  {
    id: "cra-ui-3",
    chapter: "cra-ui-components",
    level: 3,
    question: `如何在ListView中通过BaseAdapter实现高效列表？convertView复用机制的原理是什么？`,
    answer:
      `BaseAdapter实现高效列表：①继承BaseAdapter，重写getCount/getItem/getItemId/getView四个方法。②在getView中实现convertView复用：\`if (convertView == null) { convertView = inflater.inflate(layout, null); }\`——只在convertView为null时inflate新布局，否则复用。③使用ViewHolder模式进一步优化：创建ViewHolder类持有item内所有控件引用，convertView为null时findViewById找到控件存入ViewHolder，通过setTag绑定到convertView；convertView不为null时通过getTag取出ViewHolder，避免重复findViewById。④在getView中从数据源取出position位置的数据，绑定到ViewHolder的控件上。convertView复用原理：ListView只创建屏幕可见数量+少量缓冲的item View，滑出屏幕的View进入RecycleBin回收池，滑入的新item从回收池取convertView复用。这样无论数据量多大，View对象数量恒定，避免OOM和频繁GC。ViewHolder避免每次getView都findViewById（findViewById是耗时操作）。`,
    tags: ["BaseAdapter", "convertView", "ViewHolder", "性能优化", "ListView"],
  },
  {
    id: "cra-ui-4",
    chapter: "cra-ui-components",
    level: 2,
    question: `Android常用UI组件有哪些？各自的核心用途和关键属性是什么？`,
    answer:
      `①TextView——文本显示，核心属性text/textSize/textColor/textStyle/maxLines。②EditText——可编辑输入框，核心属性hint/inputType（text/password/number/phone）/maxLength。③AutoCompleteTextView——自动补全输入框，setAdapter提供候选词。④Button/ImageButton——按钮，onClick或setOnClickListener处理点击。⑤ToggleButton/Switch——开关按钮。⑥CheckBox——多选框，setOnCheckedChangeListener监听选中状态。⑦RadioButton——单选框，需放在RadioGroup中。⑧ImageView——图片显示，src指定图片、scaleType控制缩放方式。⑨ProgressBar——进度条，style控制圆形/水平，max/progress设置范围和当前值。⑩SeekBar——可拖拽进度条，setOnSeekBarChangeListener监听拖动。⑪RatingBar——评分条，numStars/rating设置星数和当前评分。⑫Spinner——下拉选择框，setAdapter提供选项。这些组件都在res/layout XML中声明，通过findViewById在Activity中获取引用。`,
    tags: ["UI组件", "TextView", "EditText", "Button", "ImageView", "ProgressBar"],
  },
];
