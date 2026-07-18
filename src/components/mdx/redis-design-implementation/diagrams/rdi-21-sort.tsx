import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第21章 排序",
  focus:
    "还原SORT对象数组、数值与字典序比较、BY外部键、LIMIT、GET、STORE和选项执行顺序",
  invariant:
    "输入元素、比较键、排序方向、分页与输出投影按固定顺序组合，缺失外部键语义一致",
  artifact: "SORT执行管线、选项组合矩阵、稳定性与复杂度测试",
  nodes: [
    "SORT <key>命令的实现",
    "ALPHA选项的实现",
    "ASC选项和DESC选项的实现",
    "BY选项的实现",
    "带有ALPHA选项的BY选项的实现",
    "LIMIT选项的实现",
    "GET选项的实现",
    "STORE选项的实现",
    "多个选项的执行顺序",
    "重点回顾",
  ],
};

export function Rdi21SortStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi21SortTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi21SortEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
