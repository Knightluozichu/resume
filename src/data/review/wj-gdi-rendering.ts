import type { ReviewQuestion } from "./types";

export const wjGdiRenderingQuestions: ReviewQuestion[] = [
  {
    id: "wj-gdi-rendering-1",
    chapter: "wj-gdi-rendering",
    level: 2,
    question: "什么是设备上下文（DC）？为什么 GDI 绘制必须通过 DC？",
    answer:
      "设备上下文（Device Context，DC）是一个数据结构，定义了图形输出的目标设备和绘制属性（画笔、画刷、字体、映射模式、裁剪区域等）。`HDC` 是 DC 的句柄。GDI 绘制必须通过 DC 的原因：①设备无关性——应用程序使用统一的 GDI 函数（`Rectangle`、`TextOut`），由 DC 将逻辑坐标映射到具体物理设备（屏幕、打印机、位图），同一代码可在不同设备上输出；②属性封装——绘制颜色、线宽、字体等属性绑定在 DC 上而非每次调用传入，简化 API；③状态管理——DC 维护当前绘制状态，连续绘制操作共享同一组属性。获取 DC 的方式：`GetDC`（客户区）、`BeginPaint`（`WM_PAINT` 中）、`CreateCompatibleDC`（内存 DC，离屏绘制）。用完必须 `ReleaseDC` 或 `EndPaint` 释放。",
    tags: ["DC", "核心概念", "设备无关性"],
  },
  {
    id: "wj-gdi-rendering-2",
    chapter: "wj-gdi-rendering",
    level: 2,
    question: "GDI 对象的创建→使用→销毁标准流程是什么？为什么要严格遵循？",
    answer:
      "GDI 对象标准流程：①创建——`CreatePen`/`CreateSolidBrush`/`CreateFont` 等创建 GDI 对象返回句柄；②选入——`SelectObject(hdc, hObj)` 将对象选入 DC，之前的旧对象被替换并返回旧对象句柄（必须保存）；③绘制——调用绘制原语（`LineTo`/`Rectangle` 等），使用当前选入的对象属性；④恢复——`SelectObject(hdc, hOldObj)` 将旧对象选回 DC；⑤销毁——`DeleteObject(hObj)` 释放新对象的内存。必须严格遵循的原因：①不选回旧对象就 `DeleteObject` 会失败——DC 中正在使用的对象不能删除；②不 `DeleteObject` 会泄漏内核 GDI 对象（每个进程有 GDI 对象上限约 10000 个）；③不恢复旧对象可能导致默认系统对象泄漏。内存 DC（`CreateCompatibleDC`）创建时默认选入一个 1x1 单色位图，必须选入真实位图后才能绘制。",
    tags: ["GDI对象", "资源管理"],
  },
  {
    id: "wj-gdi-rendering-3",
    chapter: "wj-gdi-rendering",
    level: 3,
    question: "GDI 的映射模式（Map Mode）是什么？MM_TEXT 和 MM_LOMETRIC 有何区别？",
    answer:
      "映射模式定义了逻辑坐标到设备坐标（像素）的转换规则，包括单位、方向和比例。`MM_TEXT`（默认）：逻辑单位 = 设备单位 = 像素，x 向右增、y 向下增（屏幕坐标系），适用于像素级控制。`MM_LOMETRIC`：逻辑单位 = 0.1 毫米，x 向右增、y 向上增（数学坐标系），适用于打印或需要物理尺寸一致的场景。其他模式：`MM_HIENGLISH`（0.001 英寸）、`MM_TWIPS`（1/1440 英寸，文字处理用）、`MM_ISOTROPIC`（自定义等比缩放，x/y 比例一致）、`MM_ANISOTROPIC`（自定义不等比缩放）。映射模式通过 `SetMapMode(hdc, mode)` 设置。`DPtoLP`/`LPtoDP` 在设备坐标和逻辑坐标间转换。`SetWindowExtEx`/`SetViewportExtEx` 配合 `MM_ISOTROPIC` 可实现自定义缩放。",
    tags: ["映射模式", "坐标系统"],
  },
  {
    id: "wj-gdi-rendering-4",
    chapter: "wj-gdi-rendering",
    level: 3,
    question: "双缓冲（Double Buffering）技术如何解决闪烁问题？在 GDI 中如何实现？",
    answer:
      "闪烁原因：直接在窗口 DC 上绘制时，每一步绘制（如先 `FillRect` 填背景再画图形）都会立即显示在屏幕上，背景填充和图形绘制之间的时间差造成肉眼可见的闪烁。双缓冲原理：创建一个与窗口兼容的内存 DC（`CreateCompatibleDC`）和同尺寸位图（`CreateCompatibleBitmap`），在内存 DC 上完成全部绘制（不可见），然后用 `BitBlt` 一次性将内存位图拷贝到窗口 DC——整个画面同时更新，无中间闪烁。实现步骤：①`CreateCompatibleDC(hdc)` 创建内存 DC；②`CreateCompatibleBitmap(hdc, w, h)` 创建兼容位图并 `SelectObject` 选入内存 DC；③在内存 DC 上完成所有绘制；④`BitBlt(hdc, 0, 0, w, h, memDC, 0, 0, SRCCOPY)` 一次拷贝到屏幕；⑤恢复旧位图、`DeleteObject` 位图、`DeleteDC` 内存 DC。双缓冲是 GDI 流畅动画的标配。",
    tags: ["双缓冲", "渲染技巧", "性能"],
  },
];
