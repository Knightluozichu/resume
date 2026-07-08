import type { ReviewQuestion } from "./types";

/** 装饰器与元类 复习题 */
export const pyaDecoratorsMetaQuestions: ReviewQuestion[] = [
  {
    id: "pya-decorators-meta-1",
    chapter: "pya-decorators-meta",
    level: 1,
    question: "@decorator 等价于什么操作？",
    answer: "func = decorator(func)。装饰器接收原函数，返回新函数替代原函数。",
    tags: ["装饰器"],
  },
  {
    id: "pya-decorators-meta-2",
    chapter: "pya-decorators-meta",
    level: 2,
    question: "为什么装饰器需要 functools.wraps？",
    answer: "不加 wraps，包装函数的 __name__ 变成 wrapper，__doc__ 丢失。wraps 把原函数元信息复制到包装函数。",
    tags: ["functools.wraps"],
  },
  {
    id: "pya-decorators-meta-3",
    chapter: "pya-decorators-meta",
    level: 3,
    question: "实现一个带参数的 @retry(times=3) 装饰器，说明三层嵌套。",
    answer: "外层 retry(times) 接收参数返回装饰器；中层 decorator(func) 接收函数返回包装函数；内层 wrapper 执行重试逻辑。",
    tags: ["带参装饰器", "retry"],
  },
  {
    id: "pya-decorators-meta-4",
    chapter: "pya-decorators-meta",
    level: 4,
    question: "请阐述装饰器、描述符、元类三者如何构成 Python 元编程体系。",
    answer: "三者是三个层次：装饰器拦截函数定义结果；描述符拦截属性访问；元类拦截类创建过程。框架如 Django ORM 三者并用。",
    tags: ["综合", "元编程"],
  },
];
