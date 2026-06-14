import type { ReviewQuestion } from "./types";
export const hookTechnologyQuestions: ReviewQuestion[] = [
  { id: "hk-1", chapter: "hook-technology", level: 1, question: "Hook 的两大实现方式是什么？", answer: "① 静态代理(编译期)：AspectJ/ASM 修改字节码→需重编译但类型安全。② 动态代理(运行时)：反射+DynamicProxy→灵活但需注意兼容。", tags: ["实现方式"] },
  { id: "hk-2", chapter: "hook-technology", level: 1, question: "Hook 和 AOP 是什么关系？", answer: "Hook 是手段(挂钩子拦截行为)，AOP 是目的(横切关注点的织入)。通过 Hook 实现 AOP：拦截所有 Activity.onCreate→自动统计页面访问——无侵入埋点。", tags: ["AOP"] },
  { id: "hk-3", chapter: "hook-technology", level: 2, question: "DynamicProxy 有什么限制？", answer: "只能代理接口——被代理对象必须有实现的接口。如果系统调用需要的是具体类(Binder)而不是接口，会抛 ClassCastException。需改用 BinderHook 或 cglib/ASM 创建代理子类。", tags: ["DynamicProxy"] },
  { id: "hk-4", chapter: "hook-technology", level: 2, question: "Hook AMS 为什么能实现无侵入式埋点？", answer: "Hook AMS的startActivity方法→拦截所有页面跳转→在回调中自动记录目标页面和时间→App业务代码完全不需要改动。这就是'无侵入'。", tags: ["无埋点"] },
  { id: "hk-5", chapter: "hook-technology", level: 3, question: "ProGuard 混淆后为什么Hook可能失效？怎么修？", answer: "ProGuard 改了被 Hook 的目标类/方法名→反射找不到。修复：proguard-rules.pro 里 keep 被 Hook 的类和方法。", tags: ["ProGuard"] },
];
