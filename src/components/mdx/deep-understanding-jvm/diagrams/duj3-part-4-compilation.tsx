import { OfficialDuj3Lab } from "./official-duj3-lab";

const props = {
  "unitId": "duj3-part-4-compilation",
  "title": "第四部分 程序编译与代码优化",
  "concepts": [
    "第四部分 程序编译与代码优化",
    "第四部分 程序编译与代码优化：失败边界",
    "第四部分 程序编译与代码优化：恢复证据"
  ],
  "chain": [
    "冻结JDK与输入",
    "区分规范和实现",
    "执行章专属探针",
    "注入失败并恢复",
    "保存原始发布证据"
  ],
  "model": {
    "studio": "前端—JIT证据路线台",
    "boundary": "source → AST/desugar → bytecode → profile → compiled code",
    "axisA": {
      "label": "编译阶段",
      "levels": [
        "javac",
        "解释",
        "JIT"
      ]
    },
    "axisB": {
      "label": "运行阶段",
      "levels": [
        "冷启动",
        "预热",
        "稳态"
      ]
    },
    "fault": "把编译器一次输出外推到所有运行阶段",
    "invariant": "前端语义、Class结构、编译事件和去优化在同一工作量上对齐",
    "probe": "javac -XprintRounds Sample.java\njava -XX:+PrintCompilation Sample",
    "signal": "AST/字节码、编译事件与去优化",
    "practiceMode": "design",
    "metric": "前端—JIT证据路线台复现度",
    "risk": "运行阶段失真风险",
    "task": "区分前端编译、即时编译和提前编译，观察语法糖、IR与优化如何改变代码表示而保持语义；执行下面探针，保存基线、变体、故障、恢复与复位证据。",
    "artifact": "编译流水线、源码到字节码差异、JIT事件、IR和基准证据"
  }
} as const;

export function Duj3Part4CompilationStructureLab() { return <OfficialDuj3Lab {...props} view="structure" />; }
export function Duj3Part4CompilationExecutionLab() { return <OfficialDuj3Lab {...props} view="execution" />; }
export function Duj3Part4CompilationEvidenceLab() { return <OfficialDuj3Lab {...props} view="evidence" />; }
