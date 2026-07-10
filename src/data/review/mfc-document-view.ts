import type { ReviewQuestion } from "./types";

export const mfcDocumentViewQuestions: ReviewQuestion[] = [
  {
    id: "mfc-document-view-1",
    chapter: "mfc-document-view",
    level: 2,
    question: `文档/视图架构中 CDocument、CView、CFrameWnd、CDocTemplate 各自的职责是什么？`,
    answer:
      `①CDocument——职责是「存储与管理数据」。它派生自 CObject，提供 Serialize（存取）、OnNewDocument（新建初始化）、UpdateAllViews（通知视图刷新）。用户的业务数据放在派生的 CMyDoc 成员里。②CView——职责是「显示数据与接收交互」。派生自 CWnd，在 OnDraw(CDC*) 里调 GetDocument() 取数据再绘制；用户的鼠标/键盘交互也由视图处理。③CFrameWnd——职责是「外壳」。容纳视图（作为子窗口）、挂载菜单/工具栏/状态栏，管理窗口框架的尺寸与布局。④CDocTemplate——职责是「绑定三者」。CSingleDocTemplate/CMultiDocTemplate 在构造时接收三个 CRuntimeClass（Doc/View/Frame），把这三类「运行时类型信息」绑定为一个协作单元；当用户「文件/新建」时，模板用这三个 CRuntimeClass 动态创建 Doc/View/Frame 实例并建立关联。一句话：文档管数据、视图管显示、框架管外壳、模板管装配。`,
    tags: ["文档视图", "架构", "CDocTemplate"],
  },
  {
    id: "mfc-document-view-2",
    chapter: "mfc-document-view",
    level: 2,
    question: `为什么要把「文档」和「视图」分开？合并成一个类会有什么问题？`,
    answer:
      `分开的核心收益是「数据与显示解耦」：①一个文档可对应多个视图——同一份数据既能用表格视图看，又能用图表视图看，改一处数据所有视图自动刷新（UpdateAllViews→OnUpdate）；②显示逻辑变化不影响数据存储——换 UI 只改 View，Doc 不动；③数据逻辑独立可测——Doc 不依赖窗口，可单独测试与复用；④支持多种存储——Doc 的 Serialize 与显示无关，存盘读盘只关心数据。若合并成一个类：数据成员和绘制代码混在一起；要加一种显示就得复制整份数据；改 UI 容易碰坏数据；窗口销毁数据也没了，无法「关视图留数据」。这正是「模型与视图分离」思想（MVC 的 M 与 V）在桌面 GUI 的体现，MFC 把 Controller 的职责分散到 View/Frame/Document 的命令路由里。所以文档/视图分离不是 MFC 的任性，而是 GUI 架构的通用原则。`,
    tags: ["文档视图", "解耦", "MVC"],
  },
  {
    id: "mfc-document-view-3",
    chapter: "mfc-document-view",
    level: 3,
    question: `数据改动后视图如何自动刷新？UpdateAllViews 和 OnUpdate 的协作流程是什么？`,
    answer:
      `流程：①文档数据被改动（通常在某个命令处理函数或视图操作里）；②调用 CDocument::UpdateAllViews(CView* pSender, LPARAM lHint, CObject* pHint)，pSender 是发起改动的视图（可选，避免通知自己）；③UpdateAllViews 遍历该文档关联的所有视图，对每个非 sender 视图调 CView::OnUpdate(pSender, lHint, pHint)；④OnUpdate 默认实现是 Invalidate() 标记整个视图客户区无效，触发 WM_PAINT；⑤消息循环分发 WM_PAINT 到视图，CView 的 OnPaint 调 OnDraw(CDC*)，用户在 OnDraw 里重新读取文档数据并绘制，画面更新。lHint/pHint 可传「改了哪一块」的提示，让 OnUpdate 只 Invalidate 局部矩形以减少重绘。这是「观察者模式」的经典实现：文档是被观察者，视图是观察者，UpdateAllViews 即 notify，OnUpdate 即 update。理解这条链就能解释「为什么在 Doc 里改了数据 View 自动重画」。`,
    tags: ["文档视图", "观察者模式", "刷新机制"],
  },
  {
    id: "mfc-document-view-4",
    chapter: "mfc-document-view",
    level: 4,
    question: `CDocTemplate 为什么必须用 CRuntimeClass（运行时类型信息）来绑定 Doc/View/Frame？用普通 C++ 类做不到吗？`,
    answer:
      `普通 C++ 类做不到「按类型动态创建」。CDocTemplate 的需求是：用户点「文件/新建」时，框架要根据用户在 AppWizard 里选定的 Doc/View/Frame 类型 new 出实例——但框架代码（CWinApp/CDocTemplate）写的时候不知道用户派生了 CMyDoc/CMyView/CMainFrame。普通 C++ 的 new 必须在编译期写死类型名（new CMyDoc），框架无法「凭一个类型标识 new 出任意用户类」。CRuntimeClass 解决：每个类用 IMPLEMENT_DYNCREATE 注册一个静态 CRuntimeClass，其中含工厂函数指针 m_pfnCreateObject；CDocTemplate 构造时接收三个 CRuntimeClass*，新建时调 pRuntimeClass->CreateObject() 就能按类型 new 出对象，无需框架知道具体类名。这就是「动态创建」——它打通了「框架（编译期）↔用户类（运行期）」。所以文档模板强依赖 RTTI+动态创建，这正是 MFC 六大技术环环相扣的体现：文档/视图（第4章）建立在 RTTI/动态创建（第6章）之上。`,
    tags: ["文档视图", "动态创建", "CRuntimeClass"],
  },
];
