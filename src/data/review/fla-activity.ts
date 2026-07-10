import type { ReviewQuestion } from "./types";

export const flaActivityQuestions: ReviewQuestion[] = [
  {
    id: "fla-ac-1",
    chapter: "fla-activity",
    level: 2,
    question: `Activity的完整生命周期是什么？每个回调方法的触发时机和典型操作是什么？`,
    answer:
      `Activity七个生命周期回调（完整流程）：①onCreate()——Activity首次创建时调用，执行初始化（setContentView加载布局、findViewById绑定控件、初始化变量、恢复savedInstanceState中保存的状态），只调用一次。②onStart()——Activity变为可见时调用（但不可交互），此时Activity即将显示在前台。③onResume()——Activity获得焦点可交互时调用，此时处于前台运行状态，用户可操作。④onPause()——Activity失去焦点（被部分遮挡，如弹出对话框或新Activity部分覆盖）时调用，应释放消耗CPU的资源（停止动画/暂停音视频），但不能做耗时操作（会影响新Activity显示。⑤onStop()——Activity完全不可见时调用，可释放较重的资源（取消网络请求/注册的广播/传感器监听）。⑥onDestroy()——Activity被销毁前调用，释放所有资源（关闭数据库连接/取消所有注册）。⑦onRestart()——从停止状态（onStop后）重新启动时调用，之后调onStart。典型流转：启动→onCreate→onStart→onResume（运行）→onPause→onStop（后台）→onRestart→onStart→onResume（回到前台）→onPause→onStop→onDestroy（销毁）。特殊情况：屏幕旋转时完整走onPause→onStop→onDestroy→onCreate→onStart→onResume（重建），需用ViewModel或onSaveInstanceState保存数据。`,
    tags: ["Activity", "生命周期", "onCreate", "onResume", "onDestroy"],
  },
  {
    id: "fla-ac-2",
    chapter: "fla-activity",
    level: 2,
    question: `Activity的四种启动模式（launchMode）是什么？各自的应用场景是什么？`,
    answer:
      `四种启动模式：①standard（默认）——每次startActivity都创建新实例并入栈。场景：普通页面，每次打开都是新实例。②singleTop——栈顶复用。如果要启动的Activity已在栈顶，不创建新实例而是调用onNewIntent()；如果不在栈顶则创建新实例。场景：消息推送详情页、新闻内容页，避免连续打开产生多个相同实例。③singleTask——栈内单例。整个任务栈中只有一个实例，如果已存在则清除其上方的所有Activity并调用onNewIntent()。场景：应用首页/主界面，确保回到首页时清空上方页面。④singleInstance——单实例。Activity独占一个任务栈，整个系统中只有一个实例。场景：系统级页面（如来电界面），需要独立于应用任务栈的特殊页面。启动模式配置：在AndroidManifest的<activity>标签中设置android:launchMode属性，或在Intent中设置addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP等)。任务栈（Task）由系统管理，back键弹出栈顶Activity。singleTask和singleInstance会影响任务栈结构，使用时需理解Activity栈和Task的层次关系。`,
    tags: ["启动模式", "launchMode", "singleTop", "singleTask", "任务栈"],
  },
  {
    id: "fla-ac-3",
    chapter: "fla-activity",
    level: 3,
    question: `Fragment的生命周期与Activity有何不同？Fragment事务管理（回退栈）是如何工作的？`,
    answer:
      `Fragment生命周期比Activity更复杂，因为Fragment有自己的生命周期且依附于Activity：Fragment完整回调链：onAttach（绑定到Activity）→onCreate（初始化）→onCreateView（创建视图）→onViewCreated（视图创建完成）→onActivityCreated（Activity的onCreate完成）→onStart→onResume→运行→onPause→onStop→onDestroyView（视图销毁，但Fragment实例还在）→onDestroy→onDetach（与Activity解绑）。关键区别：①Fragment多了视图生命周期——onCreateView/onDestroyView，因为Fragment的视图可以被销毁和重建（如ViewPager预加载销毁），但Fragment实例仍存活。②Fragment生命周期由FragmentManager管理，不是系统直接管理。③Fragment状态跟随宿主Activity——Activity的onDestroy会导致Fragment的onDestroyView→onDestroy→onDetach。Fragment事务管理：通过FragmentManager.beginTransaction()获取FragmentTransaction，调用replace()替换容器中的Fragment，addToBackStack(name)将事务加入回退栈，commit()提交事务。用户按back键时，回退栈弹出最近一次事务，恢复到上一个Fragment状态（调用onCreateView重建视图）。addToBackStack不调则replace后旧Fragment直接销毁不可恢复。注意：commit()是异步的（加入消息队列），commitNow()同步执行。配置变更时Fragment会重建，数据保存用arguments Bundle或ViewModel。`,
    tags: ["Fragment", "生命周期", "FragmentManager", "回退栈", "事务"],
  },
  {
    id: "fla-ac-4",
    chapter: "fla-activity",
    level: 2,
    question: `显式Intent和隐式Intent的区别是什么？如何在Activity间传递数据？`,
    answer:
      `显式Intent vs隐式Intent：①显式Intent——直接指定目标组件的类名：Intent(this, TargetActivity::class.java)或Intent(this, TargetActivity::class.java)。用于应用内跳转，明确知道目标Activity。②隐式Intent——不指定类名，而是指定action和category，由系统匹配能响应该Intent的组件：Intent(Intent.ACTION_VIEW, Uri.parse(\"http://...\"))。用于跨应用通信（如打开浏览器/拨打电话/分享）。目标组件通过AndroidManifest中的<intent-filter>声明能响应的action和category。如果多个组件匹配，系统弹出选择器（Chooser）。数据传递方式：①Intent.putExtra(key, value)——传递基本类型和Parcelable/Serializable对象，目标Activity用getIntent().getStringExtra(key)等读取。②Bundle——将多个数据打包传递：intent.putExtras(bundle)。③startActivityForResult——启动目标Activity并等待返回结果：在源Activity调用startActivityForResult(intent, requestCode)，目标Activity setResult(RESULT_OK, returnIntent)设置返回数据后finish()，源Activity在onActivityResult(requestCode, resultCode, data)中处理返回。④Fragment arguments——Fragment间传递用arguments Bundle，在创建Fragment时setArguments(bundle)，在Fragment中getArguments()读取（比直接设字段更安全，配置变更时保留）。⑤共享ViewModel——同一Activity下的多个Fragment可通过共享ViewModel通信。`,
    tags: ["Intent", "显式Intent", "隐式Intent", "数据传递", "startActivityForResult"],
  },
];
