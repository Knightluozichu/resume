import type { ReviewQuestion } from "./types";

export const craAdvancedUiQuestions: ReviewQuestion[] = [
  {
    id: "cra-aui-1",
    chapter: "cra-advanced-ui",
    level: 1,
    question: `Android的对话框体系有哪些类型？AlertDialog的核心API是什么？`,
    answer:
      `Android对话框类型：①AlertDialog——最通用的对话框，通过AlertDialog.Builder构建，支持setTitle/setMessage设置标题和内容，setItems设置列表选项，setMultiChoiceItems/setSingleChoiceItems设置多选/单选列表，setPositiveButton/setNegativeButton/setNeutralButton设置确定/取消/中立按钮，setView载入自定义布局。②DatePickerDialog/TimePickerDialog——日期/时间选择对话框，内置DatePicker/TimePicker控件，通过OnDateSetListener/OnTimeSetListener回调选择结果。③ProgressDialog——进度对话框（已废弃，Android 8.0+推荐用ProgressBar+AlertDialog替代）。④自定义Dialog——继承Dialog或通过AlertDialog.Builder.setView载入完全自定义的布局。推荐使用DialogFragment包裹Dialog——屏幕旋转时Fragment自动管理Dialog生命周期，避免Activity重建导致Dialog丢失。对话框通过show()显示，dismiss()关闭。`,
    tags: ["对话框", "AlertDialog", "DatePickerDialog", "DialogFragment", "Builder"],
  },
  {
    id: "cra-aui-2",
    chapter: "cra-advanced-ui",
    level: 2,
    question: `Android三种菜单的触发方式和生命周期回调是什么？推荐用什么方式定义菜单？`,
    answer:
      `三种菜单：①OptionsMenu（选项菜单）——用户按菜单键或点击ActionBar溢出按钮触发。Activity通过onCreateOptionsMenu(Menu)创建菜单（只调一次），onPrepareOptionsMenu(Menu)每次显示前调用可动态修改，onOptionsItemSelected(MenuItem)处理菜单项点击。②ContextMenu（上下文菜单）——长按某个View触发。需先registerForContextMenu(view)注册，Activity通过onCreateContextMenu(ContextMenu, View, ContextMenuInfo)创建，onContextItemSelected(MenuItem)处理点击。③SubMenu（子菜单）——通过Menu.addSubMenu()在选项菜单或上下文菜单中嵌套子菜单。推荐用XML定义菜单：在res/menu/下创建XML文件，用\`<item>\`定义菜单项（id/title/icon/showAsAction），通过MenuInflater.inflate(R.menu.xxx, menu)加载。XML方式将菜单结构与代码解耦，便于维护和国际化。showAsAction属性控制菜单项显示在ActionBar上还是溢出菜单中（ifRoom/withText/always/never）。`,
    tags: ["菜单", "OptionsMenu", "ContextMenu", "SubMenu", "XML定义菜单"],
  },
  {
    id: "cra-aui-3",
    chapter: "cra-advanced-ui",
    level: 2,
    question: `Android Notification通知的构建流程是什么？Android 8.0后有什么重要变化？`,
    answer:
      `Notification构建流程：①获取NotificationManager实例——\`getSystemService(NOTIFICATION_SERVICE)\`。②创建Notification.Builder——setSmallIcon（必须，状态栏小图标）、setContentTitle（标题）、setContentText（内容）、setTicker（状态栏提示文本）、setWhen（时间）、setAutoCancel（点击后自动取消）。③设置交互效果——setContentIntent(PendingIntent)设置点击通知后的跳转Intent（PendingIntent是延迟执行的Intent）。④设置提醒方式——setSound（声音）、setVibrate（震动模式）、setLights（呼吸灯）。⑤发送通知——\`notificationManager.notify(id, builder.build())\`。⑥取消通知——\`notificationManager.cancel(id)\`或setAutoCancel(true)点击后自动取消。Android 8.0+重要变化：必须先创建NotificationChannel（通知渠道），指定channelId/channelName/重要性级别，否则通知不显示。渠道允许用户在系统设置中按渠道单独控制通知行为。自定义通知布局用RemoteViews，可在状态栏和下拉通知中显示自定义UI。`,
    tags: ["Notification", "通知", "NotificationChannel", "PendingIntent", "Android 8.0"],
  },
  {
    id: "cra-aui-4",
    chapter: "cra-advanced-ui",
    level: 3,
    question: `ScrollView、ListView和RecyclerView三种滚动容器的区别是什么？为什么View复用是性能关键？`,
    answer:
      `三种滚动容器区别：①ScrollView——通用垂直滚动容器，只能包含一个直接子View（通常是LinearLayout包裹所有内容）。所有内容一次性全部inflate，数据量大时内存占用高、性能差。适合内容不多的表单页。②ListView/GridView——列表型容器，自带滚动，通过Adapter按需创建列表项View。只有屏幕可见的item被inflate，滑出后回收复用（convertView）。适合大量同构数据列表。③RecyclerView——更先进的列表容器（支持LinearLayoutManager/GridLayoutManager/StaggeredGridLayoutManager多种布局，强制ViewHolder模式，支持ItemDecoration分割线和ItemAnimator动画，局部刷新notifyItemChanged）。View复用是性能关键的原因：①inflate布局是耗时操作（XML解析+View对象创建）。②findViewById是耗时操作（遍历View树查找）。③如果不复用，每个item都inflate+findViewById，大数据量时产生大量临时View对象导致频繁GC甚至OOM。复用机制（convertView/ViewHolder）使View对象数量恒定（屏幕可见数+少量缓冲），无论数据量多大都高效。RecyclerView强制ViewHolder进一步规范了复用模式。`,
    tags: ["ScrollView", "ListView", "RecyclerView", "View复用", "性能优化", "ViewHolder"],
  },
];
