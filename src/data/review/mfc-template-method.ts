import type { ReviewQuestion } from "./types";

export const mfcTemplateMethodQuestions: ReviewQuestion[] = [
  {
    id: "mfc-template-method-1",
    chapter: "mfc-template-method",
    level: 2,
    question: `模板方法模式的核心思想是什么？MFC 在哪里用了它？`,
    answer:
      `核心思想：基类用一个非虚（或固定流程的）方法定义「算法骨架」，把其中变化的步骤声明为虚函数（钩子），由派生类重写填入具体实现；流程的控制权在基类（框架），派生类只填「变化点」。这就是「Don't call us, we'll call you」的好莱坞原则——你写的代码是被框架调用的，而非你调用框架。MFC 多处用了它：①最典型是 CWinApp::InitInstance——MFC 的 WinMain 调 theApp.InitInstance()，用户在派生 CMyApp 重写它填「加文档模板、显示主窗口」；②CWinApp::Run 控制消息循环骨架，内部可重写 OnIdle/ExitInstance；③CDocument::OnNewDocument 是新建文档的钩子；④CView::OnDraw 是绘制钩子（框架在 WM_PAINT 里调 OnPaint→OnDraw）；⑤CDocument::Serialize 也是钩子。共同点：流程由框架编排（何时调、调几次、调完干什么），用户只重写几个虚函数提供具体内容。这让框架拥有主控权，用户代码「挂」在框架的流程节点上。`,
    tags: ["模板方法", "设计模式", "CWinApp"],
  },
  {
    id: "mfc-template-method-2",
    chapter: "mfc-template-method",
    level: 3,
    question: `为什么 MFC 要用模板方法（框架控流程）而不是让用户自己写 WinMain？这带来什么利弊？`,
    answer:
      `用模板方法的原因：①统一流程——所有 MFC 程序的启动/消息循环/退出流程一致，框架能在固定节点插入自己的管理（OnIdle 空闲处理、临时对象清理、退出资源回收），用户无需关心；②减少样板——用户不用每次重写 RegisterClass/CreateWindow/消息循环那套，只填 InitInstance 几行；③保证一致性——框架能确保「文档模板注册了才进消息循环」「退出前调 ExitInstance」等不变量，降低出错。利：开发效率高（向导生成即跑）、流程统一易维护、框架能演进（改 Run 不影响用户代码）。弊：①控制反转带来「隐式」——流程在框架内部，新手不知道「我的代码何时被调」，调试时要懂框架流程才能定位；②灵活性受限——骨架不易大改，想自定义消息循环细节得重写 Run，破坏统一性；③学习曲线——必须理解「框架调你」的思维。这是「框架」与「库」的本质区别：库是你调它，框架是它调你。MFC 是典型框架，模板方法是它实现控制反转的核心手段。`,
    tags: ["模板方法", "控制反转", "框架vs库"],
  },
  {
    id: "mfc-template-method-3",
    chapter: "mfc-template-method",
    level: 3,
    question: `CWinApp::InitInstance / Run / ExitInstance 三者如何协作完成程序生命周期？`,
    answer:
      `MFC 的 WinMain（在 mfc 源码里）固定流程：①构造全局 theApp（CWinApp 派生）——全局对象在 WinMain 前构造；②调 theApp.InitInstance()——这是模板方法的「初始化钩子」，用户重写它完成：注册文档模板（AddDocTemplate）、解析命令行、创建并显示主窗口（m_pMainWnd->ShowWindow）；返回 TRUE 才继续，FALSE 直接退出；③若 InitInstance 返回 TRUE，调 theApp.Run()——这是「消息循环骨架」，内部 GetMessage/TranslateMessage/DispatchMessage 分发消息，空闲时调 OnIdle，直到收到 WM_QUIT；④Run 返回后调 theApp.ExitInstance()——「退出钩子」，用户重写做清理（关闭数据库、释放资源）；⑤theApp 析构（全局对象在 WinMain 后析构）。三者分工：InitInstance 管「起来」（建窗口/文档）、Run 管「活着」（消息循环）、ExitInstance 管「收尾」（清理）。用户只在 InitInstance/ExitInstance 填代码，Run 一般不重写。这是模板方法的教科书级应用——骨架固定，变化点暴露为虚函数。`,
    tags: ["模板方法", "CWinApp", "生命周期"],
  },
  {
    id: "mfc-template-method-4",
    chapter: "mfc-template-method",
    level: 4,
    question: `对比 MFC 的「模板方法 + 消息映射表」和现代框架（如 Qt 信号槽、C# 事件），它们在解耦思路上有何异同？`,
    answer:
      `相同点：都解决「框架在某个时机调用用户代码」的反向控制问题，都是事件驱动。不同点：①MFC 模板方法——流程节点是基类预定义的虚函数（InitInstance/OnDraw/OnIdle），用户重写填内容；耦合点固定在继承体系里，用户必须派生 CWinApp/CView 才能接入；扩展性受限于基类预留的钩子。②MFC 消息映射表——用宏把「消息码→成员函数指针」登记进静态表，比虚函数灵活（按需登记、可跨层级路由），但仍绑死在 CCmdTarget 继承体系和宏语法上。③Qt 信号槽——对象发出信号，任意对象的槽函数 connect 接收，基于 moc 元对象编译，解耦了发送者与接收者，支持跨对象、跨线程，不要求接收者派生自某基类。④C# 事件——基于委托+事件，多播委托链，类型安全，彻底解耦发布者与订阅者，语法更现代。MFC 方案的局限：继承耦合（必须派生）、宏晦涩、静态登记不够动态。但 MFC 在 1992 年用宏+虚函数+静态表实现了「可扩展的事件处理 + 框架控制流」，已是那个年代 C++ 能力下的高水平设计。理解演进能看清「框架如何从继承耦合走向委托解耦」。`,
    tags: ["模板方法", "信号槽", "演进对比"],
  },
];
