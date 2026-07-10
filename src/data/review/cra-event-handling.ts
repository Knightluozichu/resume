import type { ReviewQuestion } from "./types";

export const craEventHandlingQuestions: ReviewQuestion[] = [
  {
    id: "cra-eh-1",
    chapter: "cra-event-handling",
    level: 1,
    question: `Android基于监听的事件处理模型包含哪几个核心角色？工作流程是什么？`,
    answer:
      `基于监听的事件处理模型包含四个核心角色：①EventSource（事件源）——产生事件的GUI组件，如Button被点击、EditText内容改变。②Event（事件对象）——封装事件信息的对象，如MotionEvent（触摸事件，含坐标和动作）、KeyEvent（按键事件，含键码）。③EventListener（事件监听器）——接口，定义处理事件的回调方法，如OnClickListener.onClick(View)、OnTouchListener.onTouch(View, MotionEvent)、OnLongClickListener.onLongClick(View)。④工作流程：事件源被触发后创建Event对象，将Event对象传递给已注册的EventListener，EventListener的回调方法中编写业务逻辑处理事件。注册方式：\`button.setOnClickListener(new OnClickListener() { public void onClick(View v) { ... } })\`。也可用Activity实现接口然后\`button.setOnClickListener(this)\`。基于监听是最常用的事件处理方式，适合处理特定View的特定事件。`,
    tags: ["事件处理", "基于监听", "EventListener", "EventSource", "工作流程"],
  },
  {
    id: "cra-eh-2",
    chapter: "cra-event-handling",
    level: 2,
    question: `基于监听和基于回调两种事件处理模型有什么区别？各自适合什么场景？`,
    answer:
      `基于监听的事件处理：在Activity或外部类中创建监听器对象，通过setOnClickListener等方法注册到事件源View。事件触发时由监听器的回调方法处理。优点：不继承View类即可处理事件，灵活通用。适合处理Button点击、EditText文本变化等标准控件的交互事件。基于回调的事件处理：继承View子类（如class MyView extends View），在子类中重写回调方法（onKeyDown/onKeyUp/onTouchEvent/onTrackballEvent）。事件触发时先调用View自身的回调方法，返回true表示消费事件（不再传递），返回false表示不消费（继续传递给其他监听器）。优点：事件处理逻辑与View定义内聚在一起，适合自定义View内部处理触摸/按键事件。区别：监听是「外部注册观察者」，回调是「内部重写方法」。实践中常结合使用——自定义View用回调处理底层触摸绘制，Activity用监听处理业务点击。`,
    tags: ["基于监听", "基于回调", "对比", "自定义View", "事件处理"],
  },
  {
    id: "cra-eh-3",
    chapter: "cra-event-handling",
    level: 2,
    question: `Handler异步消息处理机制的工作原理是什么？为什么Android规定主线程不能做耗时操作？`,
    answer:
      `Handler机制工作原理：①子线程创建Message对象，通过Handler.sendMessage(msg)发送消息。②消息被放入与Handler关联的MessageQueue（消息队列，按时间排序）。③Looper不断循环调用MessageQueue.next()取出消息。④Looper将取出的Message分发给创建该Message的Handler的handleMessage(Message)方法。⑤handleMessage在Handler所在线程（通常是主线程）执行，更新UI。主线程默认已有Looper和MessageQueue，子线程需Looper.prepare()创建Looper再Looper.loop()启动循环。Android规定主线程不能做耗时操作（网络请求/数据库/大文件IO），因为：①主线程负责UI渲染和事件分发，被阻塞会导致界面卡顿。②超过5秒无响应触发ANR（Application Not Responding）弹窗，应用被系统强制关闭。网络请求在主线程直接抛NetworkOnMainThreadException。解决方案：耗时操作放子线程，完成后用Handler/post或AsyncTask切回主线程更新UI。`,
    tags: ["Handler", "异步消息", "MessageQueue", "Looper", "ANR", "主线程"],
  },
  {
    id: "cra-eh-4",
    chapter: "cra-event-handling",
    level: 3,
    question: `如何实现Android手势检测？GestureDetector和VelocityTracker各自的作用是什么？`,
    answer:
      `Android手势检测组合使用GestureDetector和VelocityTracker：①GestureDetector——检测常见手势（单击/双击/长按/滑动/快速滑动）。创建\`new GestureDetector(context, new SimpleOnGestureListener())\`，重写回调方法：onSingleTapUp（单击）、onDoubleTap（双击）、onLongPress（长按）、onScroll（拖动滑动）、onFling（快速滑动，e1起点e2终点velocityX/Y速度）。在View的onTouchEvent中调用\`gestureDetector.onTouchEvent(event)\`将触摸事件交给GestureDetector分析。②VelocityTracker——追踪触摸滑动速度。在onTouchEvent的ACTION_DOWN时\`VelocityTracker.obtain()\`获取，ACTION_MOVE时\`addMovement(event)\`记录轨迹，需要计算速度时\`computeCurrentVelocity(units)\`后通过\`getXVelocity()/getYVelocity()\`获取X/Y方向速度。用于判断快速滑动方向和力度。③onTouchEvent中通过event.getAction()判断ACTION_DOWN/MOVE/UP三阶段，ACTION_DOWN按下、ACTION_MOVE移动、ACTION_UP抬起，结合GestureDetector和VelocityTracker实现完整手势识别。典型应用：图片浏览器左右滑动翻页、列表快速滑动、摇一摇。`,
    tags: ["手势检测", "GestureDetector", "VelocityTracker", "onTouchEvent", "onFling"],
  },
];
