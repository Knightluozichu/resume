"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "直觉：你的代码需要一个“加工车间”",
    mechanism:
      "到目前为止你写的程序都可以装在一个 main() 里面——所有代码从上到下一口气跑完。但真实世界的软件不是这样的：一个程序可能有几千行甚至几百万行代码——如果全挤在一个大块里，你找不到哪段代码在干什么、也没法说「同样的逻辑别写两遍，下次直接调用」。",
    failure:
      "若把「直觉：你的代码需要一个“加工车间”」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「直觉：你的代码需要一个“加工车间”」的契约。",
  },
  {
    label: "函数是什么：四个零件拼出一个加工车间",
    mechanism:
      "// 调用 —— 把材料送进去、拿成品出来 int main() int sum = add(3, 5); // 3 和 5 是实参——实际的原材料 std::cout << sum; // 输出 8 return 0;",
    failure:
      "若把「函数是什么：四个零件拼出一个加工车间」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「函数是什么：四个零件拼出一个加工车间」的契约。",
  },
  {
    label: "参数传递：拷贝还是别名？——这是整章最重要的一节",
    mechanism:
      "上一节说了函数调用时实参会被「拷贝」给形参。但 C++ 给了你三种传递原材料的方式—— 什么时候用哪一种，是这章最重要的决策 。",
    failure:
      "若把「参数传递：拷贝还是别名？——这是整章最重要的一节」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「参数传递：拷贝还是别名？——这是整章最重要的一节」的契约。",
  },
];

export function FunctionsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="函数：机制与证据"
      prompt="切换《函数》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《函数》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function FunctionsMechanismMap() {
  return <ChapterMechanismMap title="函数：机制路径" stages={STAGES} />;
}

export function FunctionsFailureDiagram() {
  return <ChapterFailureMatrix title="函数：失效与核验" stages={STAGES} />;
}
