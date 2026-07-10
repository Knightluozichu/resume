import type { ReviewQuestion } from "./types";

export const hfjSwingGuiQuestions: ReviewQuestion[] = [
  {
    id: "hfj-sg-1",
    chapter: "hfj-swing-gui",
    level: 2,
    question: `Swing 中 JFrame 的组件层级是什么？ContentPane 的作用是什么？`,
    answer:
      `JFrame 的组件层级从外到内：JFrame（顶层窗口）→ JRootPane → JLayeredPane → ContentPane（内容面板）→ 用户添加的组件。ContentPane 是实际存放用户组件的容器。在 Java 5 之前需要用 frame.getContentPane().add(component) 添加组件，Java 5+ 之后 frame.add(component) 会自动转发到 ContentPane。ContentPane 默认使用 BorderLayout 布局管理器。不能直接向 JFrame 添加组件（会抛异常或被忽略），必须通过 ContentPane。JFrame 还包含 JMenuBar（菜单栏）和 GlassPane（玻璃面板，用于截获事件和绘制覆盖层）。`,
    tags: ["JFrame", "ContentPane", "组件层级"],
  },
  {
    id: "hfj-sg-2",
    chapter: "hfj-swing-gui",
    level: 2,
    question: `布局管理器的作用是什么？BorderLayout 和 FlowLayout 有什么区别？`,
    answer:
      `布局管理器负责决定容器内组件的大小和位置，开发者不需要手动设置坐标和尺寸，布局管理器会根据容器大小自动调整。好处：①跨平台——不同平台字体/分辨率不同，手动定位会错乱，布局管理器自动适配；②响应式——窗口缩放时组件自动重排；③开发效率——不用计算像素坐标。\nBorderLayout：将容器分为5个区域——NORTH（上）、SOUTH（下）、EAST（右）、WEST（左）、CENTER（中）。每个区域最多放一个组件，CENTER 会占据剩余空间并拉伸。是 JFrame 的默认布局。\nFlowLayout：从左到右排列组件，排满一行自动换行，组件保持自然大小不拉伸。是 JPanel 的默认布局。适合按钮排列。`,
    tags: ["布局管理器", "BorderLayout", "FlowLayout"],
  },
  {
    id: "hfj-sg-3",
    chapter: "hfj-swing-gui",
    level: 3,
    question: `JPanel 在 Swing 中扮演什么角色？为什么需要中间容器？`,
    answer:
      `JPanel 是 Swing 中的中间容器，本身也是 JComponent 的子类。它的角色：①分组——把相关组件组织到一起，形成逻辑分组；②嵌套布局——JPanel 可以设置自己的布局管理器，不同 JPanel 用不同布局，组合实现复杂界面。例如一个窗口用 BorderLayout，NORTH 放一个 JPanel(FlowLayout) 装按钮组，CENTER 放一个 JPanel(BorderLayout) 装表格和标签；③复用——自定义 JPanel 子类可以封装一组组件逻辑，在多处复用。\n需要中间容器的原因：JFrame 的 ContentPane 用 BorderLayout 只有5个区域，每个区域只能放一个组件。要放多个组件就需要先放在 JPanel 里，再把 JPanel 放到 ContentPane。没有中间容器，复杂界面无法用布局管理器组合实现。`,
    tags: ["JPanel", "中间容器", "布局嵌套"],
  },
  {
    id: "hfj-sg-4",
    chapter: "hfj-swing-gui",
    level: 3,
    question: `构建一个 Swing 窗口的完整步骤是什么？为什么 setVisible 要最后调用？`,
    answer:
      `完整步骤：①创建 JFrame——JFrame frame = new JFrame(\"标题\"); ②设置布局——frame.setLayout(new BorderLayout()) 或使用默认；③创建组件——JButton btn = new JButton(\"点击\"); JTextField input = new JTextField(20); ④添加组件——frame.add(btn, BorderLayout.SOUTH); frame.add(input, BorderLayout.CENTER); ⑤设置窗口大小——frame.setSize(400, 300); ⑥设置关闭行为——frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); ⑦显示窗口——frame.setVisible(true);\nsetVisible 要最后调用的原因：setVisible(true) 会触发窗口的首次布局计算和绘制。如果在此之前组件没添加完、布局没设置好，窗口显示时就会出现错误布局或空白。之后再添加组件虽然也能显示，但需要调用 revalidate() 和 repaint() 手动触发重排和重绘，不如在 setVisible 之前一次性设置好。`,
    tags: ["JFrame", "构建流程", "setVisible"],
  },
];
