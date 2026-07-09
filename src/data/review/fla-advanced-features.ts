import type { ReviewQuestion } from "./types";

export const flaAdvancedFeaturesQuestions: ReviewQuestion[] = [
  {
    id: "fla-af-1",
    chapter: "fla-advanced-features",
    level: 2,
    question: "Material Design的核心组件有哪些？CoordinatorLayout如何实现协调滚动效果？",
    answer:
      "Material Design核心组件：①MaterialCardView——带阴影和圆角的卡片容器。②CoordinatorLayout——高级帧布局，协调子View之间的交互行为，是实现Material Design滚动效果的核心。③AppBarLayout——垂直LinearLayout，专为CoordinatorLayout设计，支持子View（如Toolbar/CollapsingToolbarLayout）的滚动行为。④CollapsingToolbarLayout——可折叠的工具栏，配合AppBarLayout实现滚动时Toolbar折叠/展开效果。⑤FloatingActionButton（FAB）——悬浮操作按钮，可随滚动显示/隐藏。⑥Snackbar——底部提示条（比Toast更交互式，可带操作按钮）。⑦BottomNavigation——底部导航栏。⑧TabLayout——选项卡布局（配合ViewPager2）。⑨TextInputLayout——带浮动标签的输入框。CoordinatorLayout协调滚动原理：通过Behavior机制协调子View。①AppBarLayout的子View设置app:layout_scrollFlags（scroll|enterAlways|enterAlwaysCollapsed|exitUntilCollapsed|snap）声明滚动行为。②滚动容器（RecyclerView/NestedScrollView）设置app:layout_behavior=\"@string/appbar_scrolling_view_behavior\"。③当RecyclerView滚动时，CoordinatorLayout的Behavior拦截滚动事件，根据scrollFlags控制AppBarLayout的子View同步滚动（如Toolbar随列表向上滑出屏幕、CollapsingToolbarLayout折叠为状态栏高度）。④FAB设置app:layout_behavior的HideBottomViewOnScrollBehavior，向下滚动时隐藏、向上滚动时显示。Behavior是CoordinatorLayout的核心——每个子View可以定义Behavior响应其他View的布局变化和滚动事件，实现协调动画效果，无需手动写动画代码。",
    tags: ["Material Design", "CoordinatorLayout", "AppBarLayout", "Behavior", "滚动效果"],
  },
  {
    id: "fla-af-2",
    chapter: "fla-advanced-features",
    level: 3,
    question: "ViewModel和LiveData如何配合实现MVVM架构？为什么ViewModel能在配置变更时存活？",
    answer:
      "ViewModel+LiveData实现MVVM：①ViewModel——持有UI数据，在onCreate中通过ViewModelProvider(this).get(MyViewModel::class.java)获取。ViewModel不持有View引用（避免内存泄漏），Activity通过观察ViewModel中的LiveData获取数据更新。②LiveData——可观察的数据持有者，ViewModel中持有MutableLiveData（内部可修改），对外暴露不可变的LiveData（只读）。UI层在onCreate中viewModel.data.observe(this, Observer { data -> 更新UI })。LiveData是生命周期感知的——只在Activity/Fragment处于STARTED/RESUMED状态时通知更新，自动在DESTROYED时取消订阅（无需手动removeObserver）。③MVVM数据流——UI层（Activity/Fragment）调用ViewModel方法请求数据→ViewModel通过Repository（协调Room本地+Retrofit远程）获取数据→数据返回后ViewModel更新LiveData.postValue()→LiveData通知观察的UI层自动更新。单向数据流，UI层不直接操作数据源。ViewModel能在配置变更（如屏幕旋转）时存活的原理：①ViewModelStore——每个Activity/Fragment持有一个ViewModelStore（HashMap存储ViewModel实例）。②配置变更时——Activity被销毁重建，但系统在销毁前通过onRetainNonConfigurationInstance()保存ViewModelStore，重建后通过getLastNonConfigurationInstance()恢复。因此ViewModel实例不随Activity重建而销毁，数据自动保留。③真正销毁——Activity真正finish（非配置变更）时，ViewModelStore.clear()调用ViewModel的onCleared()清理资源。因此ViewModel的生命周期长于单个Activity实例（跨配置变更），但不跨进程（进程被杀ViewModel也销毁）。",
    tags: ["ViewModel", "LiveData", "MVVM", "配置变更", "生命周期感知"],
  },
  {
    id: "fla-af-3",
    chapter: "fla-advanced-features",
    level: 2,
    question: "Jetpack的Navigation Component如何工作？相比传统Intent跳转有什么优势？",
    answer:
      "Navigation Component工作原理：①导航图（NavGraph）——在res/navigation/下创建XML导航图，用<fragment>声明目的地（destination），用<action>声明目的地之间的跳转关系（含转场动画/参数），可视化编辑器中可拖拽设计。②NavHost——Activity中放置NavHostFragment作为导航容器（<androidx.navigation.fragment.NavHostFragment>），app:navGraph属性绑定导航图。③NavController——获取NavController实例（Navigation.findNavController(view)），调用navigate(R.action_fragmentA_to_fragmentB)执行跳转，navigateUp()/popBackStack()返回。④Safe Args插件——编译期生成类型安全的参数传递代码（Directions/Args类），替代手动Bundle putExtra。⑤底部导航/TabLayout集成——BottomNavigation的itemId与导航图目的地id绑定，NavigationUI.setupWithNavController(bottomNav, navController)自动管理切换。相比传统Intent的优势：①可视化——导航图XML直观展示所有页面跳转关系，便于理解应用导航结构。②类型安全传参——Safe Args生成类型安全的参数类，避免手动Bundle的key拼写错误和类型错误。③统一回退管理——NavController统一管理回退栈，无需手动维护Fragment事务和addToBackStack。④转场动画——在action中统一配置跳转动画，一致性好。⑤深层链接——支持Deep Link直接跳转到指定目的地。⑥简化Fragment事务——不再需要手写FragmentManager.beginTransaction().replace().addToBackStack().commit()。最佳实践：单Activity多Fragment架构——一个Activity持有NavHostFragment，所有页面用Fragment，通过Navigation管理跳转。",
    tags: ["Navigation", "NavGraph", "NavController", "Safe Args", "导航"],
  },
  {
    id: "fla-af-4",
    chapter: "fla-advanced-features",
    level: 2,
    question: "WorkManager的作用是什么？它如何替代传统的后台Service？",
    answer:
      "WorkManager的作用：Jetpack提供的后台任务调度库，用于执行可延迟的、需要保证执行的后台任务（即使App退出或设备重启也能执行）。核心特性：①保证执行——任务持久化到数据库，App退出或设备重启后仍会执行（不像Service可能被系统杀掉）。②可约束——设置执行条件（网络连接/设备充电/设备空闲/存储空间充足），满足条件才执行。③可延迟——任务可设为立即执行或延迟执行（setInitialDelay）。④可周期——支持一次性任务（OneTimeWorkRequest）和周期性任务（PeriodicWorkRequest，最短间隔15分钟）。⑤链式任务——任务可串联/并联组合（WorkContinuation），如A→B→C或A+B→C。⑥线程切换——在后台线程执行（默认Worker在后台线程，可指定后台线程或ListenableWorker自定义）。替代后台Service的原因：①Android后台限制——Android 8.0+后台Service严重受限（后台startService抛异常），Android 12+前台Service通知更严格，传统Service方案不可靠。②系统调度——WorkManager底层根据API版本自动选择JobScheduler（API 23+）/AlarmManager+BroadcastReceiver（API 23以下）最优实现，开发者无需关心版本差异。③省电——系统批量调度任务（如在充电时集中执行），比每个App各自起Service更省电。④持久化——任务存数据库，设备重启后自动恢复执行，比Service可靠。使用方式：定义Worker类（doWork()返回Result.success/failure/retry），创建WorkRequest（设置约束/延迟/标签），WorkManager.enqueue(request)提交。场景：数据同步/日志上传/定期缓存清理/后台推送处理等不需要实时性但需要保证执行的任务。需要实时的任务（如音乐播放）仍用前台Service。",
    tags: ["WorkManager", "后台任务", "约束", "JobScheduler", "省电"],
  },
];
