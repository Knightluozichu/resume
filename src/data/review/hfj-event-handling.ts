import type { ReviewQuestion } from "./types";

export const hfjEventHandlingQuestions: ReviewQuestion[] = [
  {
    id: "hfj-eh-1",
    chapter: "hfj-event-handling",
    level: 2,
    question: "Java 事件处理的三个核心要素是什么？它们如何协作？",
    answer:
      "三个核心要素：①事件源（Source）——产生事件的 GUI 组件，如 JButton。事件源维护一个监听器列表，通过 addActionListener 等方法注册监听器；②事件对象（Event）——封装事件信息的对象，如 ActionEvent。包含事件源引用（getSource()）、命令字符串（getActionCommand()）等信息；③监听器（Listener）——实现特定监听器接口的对象，如 ActionListener，包含回调方法 actionPerformed(ActionEvent e)。\n协作流程：用户操作事件源（如点击按钮）→ 事件源创建事件对象 → 事件源遍历已注册的监听器列表 → 对每个监听器调用对应的回调方法，传入事件对象 → 监听器在回调方法中处理事件。三者通过「注册—通知」模式解耦：事件源不知道监听器具体做什么，监听器不知道事件源是谁，只通过接口和事件对象通信。",
    tags: ["事件源", "事件对象", "监听器"],
  },
  {
    id: "hfj-eh-2",
    chapter: "hfj-event-handling",
    level: 3,
    question: "事件分发线程（EDT）是什么？为什么耗时操作不能在 EDT 上执行？",
    answer:
      "EDT（Event Dispatch Thread）是 Swing 的单线程事件分发线程。所有 GUI 事件（按钮点击、鼠标移动、键盘输入）和组件绘制都在 EDT 上串行处理。Swing 选择单线程模型的原因：①避免多线程并发访问 GUI 组件导致的状态不一致；②简化编程模型——开发者不需要在事件处理中加锁。\n耗时操作不能在 EDT 上执行的原因：EDT 是单线程的，如果一个事件处理方法执行耗时操作（如网络请求、大量计算、Thread.sleep），EDT 就被阻塞，无法处理后续事件，导致界面冻结——按钮点不动、窗口拖不动、不重绘。用户体验极差。\n解决方法：耗时操作放到工作线程（new Thread 或 SwingWorker）执行，执行完后用 SwingUtilities.invokeLater() 把 UI 更新操作提交回 EDT 执行。",
    tags: ["EDT", "事件分发线程", "线程安全"],
  },
  {
    id: "hfj-eh-3",
    chapter: "hfj-event-handling",
    level: 3,
    question: "监听器适配器（Adapter）是什么？为什么不直接实现监听器接口？",
    answer:
      "适配器是一个实现了监听器接口所有方法的空类（方法体为空）。例如 MouseAdapter 实现了 MouseListener 接口的5个方法（mouseClicked、mousePressed、mouseReleased、mouseEntered、mouseExited），每个方法都是空实现。使用时继承适配器，只重写需要的方法即可。\n不直接实现接口的原因：很多监听器接口有多个方法。如 MouseListener 有5个方法、WindowListener 有7个方法、KeyListener 有3个方法。直接 implements 接口，即使只需要一个方法，也必须把所有方法都写出来（空方法体），否则编译报错。代码冗余、可读性差。用适配器继承，只需重写关心的方法，未重写的方法自动使用空实现。口诀：接口要全部实现，适配器只需重写需要的。\n注意：适配器是类不是接口，所以只能继承（extends），而 Java 单继承限制了扩展性。Java 8+ 可以用 Lambda（函数式接口只有1个方法时）替代。",
    tags: ["适配器", "Adapter", "监听器接口"],
  },
  {
    id: "hfj-eh-4",
    chapter: "hfj-event-handling",
    level: 3,
    question: "如何给 JButton 添加点击事件处理？写出完整代码。",
    answer:
      "方法1：匿名内部类（经典写法）\n```java\nJButton button = new JButton(\"点击我\");\nbutton.addActionListener(new ActionListener() {\n    public void actionPerformed(ActionEvent e) {\n        System.out.println(\"按钮被点击了\");\n    }\n});\n```\n方法2：Lambda 表达式（Java 8+，ActionListener 是函数式接口只有一个方法）\n```java\nbutton.addActionListener(e -> System.out.println(\"按钮被点击了\"));\n```\n方法3：让类实现 ActionListener 接口\n```java\nclass MyFrame extends JFrame implements ActionListener {\n    public void actionPerformed(ActionEvent e) {\n        System.out.println(\"按钮被点击了\");\n    }\n}\n// button.addActionListener(this);\n```\n关键：ActionListener 是函数式接口（只有一个抽象方法 actionPerformed），所以可以用 Lambda。e 是 ActionEvent 参数，e.getSource() 获取事件源（按钮），e.getActionCommand() 获取按钮文字。",
    tags: ["ActionListener", "按钮事件", "Lambda"],
  },
];
