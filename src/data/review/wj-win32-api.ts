import type { ReviewQuestion } from "./types";

export const wjWin32ApiQuestions: ReviewQuestion[] = [
  {
    id: "wj-win32-api-1",
    chapter: "wj-win32-api",
    level: 2,
    question: `什么是句柄（HANDLE）？为什么 Windows 大量使用句柄而非直接指针？`,
    answer:
      `句柄是一个不透明的标识符（本质上是进程句柄表中的索引），代表一个内核对象或资源（窗口、文件、进程、事件等）。Windows 大量使用句柄而非直接指针的原因：①安全隔离——用户态代码不能直接访问内核态对象数据，句柄是间接引用，内核在每次操作时验证有效性；②封装性——内核对象的内存布局可随版本变更，句柄屏蔽了内部结构；③统一管理——所有内核对象通过 \`CloseHandle\` 统一释放，防止资源泄漏；④权限控制——句柄在创建时携带权限标志（如 \`GENERIC_READ\`），内核在每次操作时检查。常见句柄类型：\`HWND\`（窗口）、\`HANDLE\`（文件/进程/线程）、\`HDC\`（设备上下文）、\`HKEY\`（注册表键）。`,
    tags: ["核心概念", "句柄"],
  },
  {
    id: "wj-win32-api-2",
    chapter: "wj-win32-api",
    level: 2,
    question: `Win32 API 从应用层到硬件层的调用路径是什么？涉及哪些关键层？`,
    answer:
      `调用路径为：应用程序 → Win32 API 层（\`user32.dll\`/\`kernel32.dll\`/\`gdi32.dll\`）→ \`NTDLL.dll\`（系统调用入口）→ Windows 内核（\`ntoskrnl.exe\`）→ 硬件。应用程序调用如 \`CreateFile\`，由 \`kernel32.dll\` 做参数校验和预处理，再调用 \`NTDLL.dll\` 中的 \`NtCreateFile\`，后者执行 \`syscall\` 指令从用户态切换到内核态，内核的 I/O 管理器接收请求并调度驱动程序操作硬件。\`NTDLL.dll\` 是用户态和内核态的分界线——所有 Win32 API 最终都要经过它进入内核。用户态到内核态的切换（上下文切换）有性能开销，因此频繁的小操作应考虑批量处理。`,
    tags: ["架构", "系统调用"],
  },
  {
    id: "wj-win32-api-3",
    chapter: "wj-win32-api",
    level: 3,
    question: `Win32 API 中的宽字符与 Unicode 处理机制是什么？ TCHAR 和 WCHAR 的关系？`,
    answer:
      `Windows NT 内核内部使用 UTF-16LE 编码的宽字符（\`WCHAR\` = \`wchar_t\`，2 字节），Win32 API 提供两套函数：A 版（ANSI，如 \`CreateWindowA\`）和 W 版（Unicode，如 \`CreateWindowW\`）。A 版在内部将 ANSI 字符串转为 Unicode 再调用 W 版，有额外开销。\`TCHAR\` 是条件编译宏：定义了 \`UNICODE\` 时映射为 \`WCHAR\`，否则为 \`char\`；对应的 \`TEXT()\` 宏同理。现代 Windows 程序应直接使用 W 版函数和 \`WCHAR\`，避免 A 版转换开销和编码问题。\`_T()\` / \`TEXT()\` 宏保证字符串字面量与编译模式一致。最佳实践：始终定义 \`UNICODE\` 和 \`_UNICODE\`，直接用 \`wchar_t\` 和 \`L\` 前缀。`,
    tags: ["编码", "Unicode"],
  },
  {
    id: "wj-win32-api-4",
    chapter: "wj-win32-api",
    level: 3,
    question: `WinMain 函数的四个参数分别是什么含义？与标准 C 的 main 有何不同？`,
    answer:
      `\`WinMain\` 的四个参数：①\`hInstance\`——当前模块的实例句柄，用于标识本进程加载的基址，注册窗口类和创建窗口时必须提供；②\`hPrevInstance\`——16 位 Windows 遗留参数，在 32/64 位系统中始终为 \`NULL\`，仅保留兼容；③\`lpCmdLine\`——命令行参数字符串（不含程序名），与 \`main\` 的 \`argc\`/\`argv\` 不同，这里是一个完整的字符串，需要自行解析；④\`nCmdShow\`——窗口初始显示方式（如 \`SW_SHOWNORMAL\`、\`SW_MAXIMIZE\`），传给 \`ShowWindow\`。与标准 \`main\` 的区别：入口是图形子系统而非控制台、参数语义不同、返回值是 \`int\`（退出码）、链接器需指定 \`/SUBSYSTEM:WINDOWS\`。若同时需要控制台输出可用 \`AllocConsole\` 创建。`,
    tags: ["入口点", "编程模型"],
  },
];
