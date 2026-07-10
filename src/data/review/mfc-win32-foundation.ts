import type { ReviewQuestion } from "./types";

export const mfcWin32FoundationQuestions: ReviewQuestion[] = [
  {
    id: "mfc-win32-foundation-1",
    chapter: "mfc-win32-foundation",
    level: 2,
    question: `一个 Win32 窗口程序从 WinMain 到退出的完整流程是什么？`,
    answer:
      `①WinMain 入口，接收 hInstance（实例句柄）；②填充 WNDCLASS 结构，把窗口过程函数地址 lpfnWndProc 填入，调用 RegisterClass 注册窗口类；③调用 CreateWindow 按类名创建窗口实例，返回 HWND（窗口句柄）；④ShowWindow 显示窗口，UpdateWindow 触发首次 WM_PAINT；⑤进入消息循环：while(GetMessage(&msg)) { TranslateMessage(&msg); DispatchMessage(&msg); }，GetMessage 阻塞取消息，TranslateMessage 把按键翻译成字符消息，DispatchMessage 把消息分发到窗口过程；⑥窗口过程 WndProc(HWND, msg, wParam, lParam) 用 switch(msg) 处理 WM_CREATE/WM_PAINT/WM_COMMAND 等，未处理的交给 DefWindowProc 默认处理；⑦WM_DESTROY 中调用 PostQuitMessage(0) 投递 WM_QUIT；⑧GetMessage 收到 WM_QUIT 返回 FALSE，循环结束，WinMain 返回，进程退出。MFC 把这套流程封装进 CWinApp：WinMain 在 MFC 内部，InitInstance 是用户填的钩子，消息循环在 CWinApp::Run。`,
    tags: ["Win32", "程序生命周期"],
  },
  {
    id: "mfc-win32-foundation-2",
    chapter: "mfc-win32-foundation",
    level: 2,
    question: `HWND 和 WndProc 在 Win32 窗口模型中各扮演什么角色？`,
    answer:
      `HWND（窗口句柄）是窗口的唯一标识——一个不透明的 void* 类型值，由系统分配，程序通过它引用窗口、调用 API（如 ShowWindow(hwnd)、DestroyWindow(hwnd)）。句柄而非直接指针的原因是封装与安全：内核对象由系统管理，用户态不能直接操作其内存。WndProc（窗口过程）是一个回调函数 LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM)，在注册窗口类时通过 lpfnWndProc 绑定到窗口类。系统把所有发往该窗口的消息都送到这个函数处理——它是窗口「处理消息的中枢」。WndProc 用 switch-case 区分不同消息码（WM_PAINT/WM_DESTROY 等），每个 case 处理一种消息。HWND 是「找窗口」，WndProc 是「处理窗口的事件」，二者通过窗口类关联。MFC 的关键工作就是把散落的 WndProc + switch-case 升级为面向对象的消息映射表 + 成员函数。`,
    tags: ["Win32", "HWND", "WndProc"],
  },
  {
    id: "mfc-win32-foundation-3",
    chapter: "mfc-win32-foundation",
    level: 3,
    question: `为什么 MFC 要在 Win32 之上再做一层封装？封装解决了 Win32 程序的哪些痛点？`,
    answer:
      `Win32 程序的痛点：①窗口过程是全局回调函数，无法和「窗口数据」绑定，状态靠全局变量或窗口属性传递，难以面向对象；②switch-case 处理消息，消息一多就成巨型函数，难维护；③重复样板代码——每个程序都要写 RegisterClass/CreateWindow/消息循环那套；④没有类型识别、没有持久化，全靠手工。MFC 封装解决：①把 HWND 包装成 CWnd 对象，窗口数据和成员函数绑定，消息处理变成成员函数；②用消息映射表（BEGIN_MESSAGE_MAP/ON_COMMAND）取代 switch-case，每条消息映射到一个成员函数，编译期生成静态表，运行期查表分发；③把 WinMain、消息循环、注册等样板收进 CWinApp 框架，用户只重写 InitInstance 填变化点（模板方法）；④基于 CObject 提供 RTTI、动态创建、序列化等可复用机制。一句话：MFC 用 C++ 把 Win32 的「过程式回调 + 句柄」抽象成「对象 + 消息映射 + 可复用框架」。`,
    tags: ["Win32", "MFC封装", "设计动机"],
  },
  {
    id: "mfc-win32-foundation-4",
    chapter: "mfc-win32-foundation",
    level: 4,
    question: `GetMessage 为什么是阻塞的而非忙等待？这和 MFC 的消息循环设计有什么关系？`,
    answer:
      `GetMessage 在没有消息时会让线程阻塞（交出 CPU），等系统有消息才唤醒返回；若用忙等待（while 循环不停查询）会空耗 100% CPU。阻塞让其他程序能正常用 CPU，是事件驱动模型能省 CPU 的关键。当 GetMessage 取到 WM_QUIT 时返回 FALSE 退出循环，其他消息返回 TRUE 继续。MFC 的消息循环封装在 CWinApp::Run：基本结构仍是 GetMessage/TranslateMessage/DispatchMessage，但扩展了空闲处理（OnIdle）——消息队列空时 Run 会调 OnIdle 做后台任务（如更新 UI、回收临时对象映射），再回到 GetMessage 阻塞。PumpMessage 还会处理模态对话框、加速键等。所以 MFC 不是「重新发明消息循环」，而是在标准循环上加 OnIdle 钩子和特殊情况分流，让框架能在不破坏 Win32 模型的前提下插入自己的管理逻辑。理解这点才能解释为什么 MFC 程序空闲时 CPU 占用低、为什么 OnIdle 会被周期性调用。`,
    tags: ["Win32", "消息循环", "OnIdle"],
  },
];
