import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "第三部分 虚拟机执行子系统"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="第三部分 虚拟机执行子系统" focus="沿Class文件、加载与链接、栈帧执行、动态调用和案例实战解释字节码如何成为运行行为" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="第三部分 虚拟机执行子系统" focus="编译一个包含泛型、异常、同步和动态调用的最小类，串联解析、加载、验证和逐指令执行证据" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="第三部分 虚拟机执行子系统" focus="源码到Class映射、加载状态机、栈帧时间线、动态调用验证" nodes={nodes} />;
}
