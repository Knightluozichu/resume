import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "第四部分 程序编译与代码优化"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="第四部分 程序编译与代码优化" focus="区分前端编译、即时编译和提前编译，观察语法糖、IR与优化如何改变代码表示而保持语义" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="第四部分 程序编译与代码优化" focus="让同一热点经历解释、分层编译、内联和去优化，保存编译日志与行为不变量" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="第四部分 程序编译与代码优化" focus="编译流水线、源码到字节码差异、JIT事件、IR和基准证据" nodes={nodes} />;
}
