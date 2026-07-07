import type { ReviewQuestion } from "./types";

/** Head First 设计模式 · 观察者模式复习题 */
export const hfdObserverQuestions: ReviewQuestion[] = [
  {
    id: "hfd-observer-1",
    chapter: "hfd-observer",
    level: 1,
    question: "观察者模式的定义是什么？Subject 和 Observer 之间是什么关系？",
    answer:
      "观察者模式定义：定义对象之间的一对多依赖关系，当一个对象（Subject）状态改变时，所有依赖于它的对象（Observer）都会得到通知并自动更新。\n\nSubject 和 Observer 的关系：\n- Subject 维护一个 Observer 列表，提供注册（registerObserver）、移除（removeObserver）、通知（notifyObservers）方法。\n- Observer 定义统一的更新接口（update），Subject 状态变化时遍历列表调用每个 Observer 的 update。\n- Observer 通过注册获得更新，可以随时注销。\n- Subject 不需要知道 Observer 的具体类型——松耦合。\n\n本质：Subject 是数据拥有者，Observer 是数据消费者，通过注册/通知机制解耦。",
    tags: ["定义", "Subject", "Observer"],
  },
  {
    id: "hfd-observer-2",
    chapter: "hfd-observer",
    level: 2,
    question: "观察者模式的推模式和拉模式有什么区别？各自适合什么场景？",
    answer:
      "推模式（Push）：\n- Subject 在 notifyObservers 时把所有数据作为参数推给 Observer：`update(temp, humidity, pressure)`。\n- 优点：简单直接，Observer 不需要回头查 Subject。\n- 缺点：Observer 被迫接收不需要的字段；Subject 加字段要改 update 签名，所有 Observer 都要改。\n\n拉模式（Pull）：\n- Subject 在 notify 时只传自身引用（或只发一个信号）：`update(subject)`，Observer 按需调用 getter 拉取数据。\n- 优点：Observer 只取自己需要的字段；Subject 加字段不改 update 签名；更灵活。\n- 缺点：Observer 需要知道 Subject 的具体类型来调 getter（可面向接口）；多一次方法调用。\n\n选择：数据字段少且稳定 → 推模式；数据字段多或会变化 → 拉模式。Java 的 java.util.Observable 默认是推模式（传 data 对象）。",
    tags: ["推模式", "拉模式", "对比"],
  },
  {
    id: "hfd-observer-3",
    chapter: "hfd-observer",
    level: 3,
    question: "气象站 WeatherData 有 setMeasurements() 方法，但每次调用都手动调三个 display 的 update()。如何用观察者模式重构？",
    answer:
      "问题：WeatherData 直接依赖三个 Display 具体类，新增 Display 要改 WeatherData——紧耦合。\n\n重构步骤：\n1. 定义 Subject 接口：`registerObserver(o)`, `removeObserver(o)`, `notifyObservers()`。\n2. 定义 Observer 接口：`update(temp, humidity, pressure)`。\n3. WeatherData 实现 Subject，内部维护 `List<Observer> observers`：\n   - registerObserver 添加到列表，removeObserver 从列表移除。\n   - notifyObservers 遍历列表调 update。\n   - measurementsChanged() 调 notifyObservers()。\n4. 三个 Display 实现 Observer，在构造函数中调 weatherData.registerObserver(this) 注册。\n5. setMeasurements 更新数据后调 measurementsChanged()。\n\n效果：WeatherData 只依赖 Observer 接口，新增 Display 只需实现接口并注册，WeatherData 一行不改。松耦合达成。",
    tags: ["重构", "应用", "松耦合"],
  },
  {
    id: "hfd-observer-4",
    chapter: "hfd-observer",
    level: 4,
    question: "观察者模式中 Subject 通知 Observer 的顺序是确定的吗？如果 Observer A 的 update 触发了 Observer B 的状态变化，会出现什么问题？",
    answer:
      "通知顺序问题：\nSubject 用 List 遍历通知，顺序通常是注册顺序，但 GoF 没有规定必须如此。依赖顺序是脆弱设计——如果 A 必须在 B 之前更新，说明 A 和 B 之间有隐含依赖，违背了观察者模式的松耦合初衷。\n\n链式通知问题（更严重）：\n如果 Observer A 的 update() 修改了 Subject 的状态，会再次触发 notifyObservers()。这导致：\n1. 无限递归：A 通知 → 改状态 → 再通知 → A 再改状态……栈溢出。\n2. 不可预测：B 可能在 A 修改后的新状态上更新，而不是原始状态。\n3. 调试困难：通知链路复杂，难以追踪谁触发了谁。\n\n解决方案：\n1. 避免在 update 中修改 Subject 状态——Observer 应该只读不写。\n2. 如果必须改，用事件队列缓冲通知，延迟到当前通知周期结束后再发。\n3. 用标记防重入：Subject 在 notify 中设 isNotifying 标志，期间状态变化不立即通知。\n\n核心原则：Observer 的 update 应该是「被动响应」而非「主动触发新事件」。",
    tags: ["综合", "通知顺序", "链式通知", "递归"],
  },
];
