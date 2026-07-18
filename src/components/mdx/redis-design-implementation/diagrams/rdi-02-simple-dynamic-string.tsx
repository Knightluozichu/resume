import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第2章 简单动态字符串",
  focus:
    "从sdshdr的len、free和buf理解常数时间取长、二进制安全、空间预分配与惰性释放",
  invariant:
    "字符串长度、终止字节和可用空间始终一致，扩容不会溢出，二进制数据不被截断",
  artifact: "SDS内存图、扩缩容轨迹、边界测试与C字符串对照",
  nodes: ["SDS的定义", "SDS与C字符串的区别", "SDS API", "重点回顾", "参考资料"],
};

export function Rdi02SimpleDynamicStringStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi02SimpleDynamicStringTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi02SimpleDynamicStringEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
