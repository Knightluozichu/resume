import type { ReviewQuestion } from "./types";

/** 数组与切片 复习题 */
export const giaArraysSlicesQuestions: ReviewQuestion[] = [
  {
    id: "gia-arrays-slices-1",
    chapter: "gia-arrays-slices",
    level: 1,
    question: `Go 数组和切片的本质区别是什么？`,
    answer: `数组 [N]T 是固定长度值类型，长度是类型一部分（[5]int≠[6]int），赋值/传参复制全部元素。切片 []T 是动态长度引用类型，由 ptr（指向底层数组）+ len + cap 三元组组成，赋值/传参共享底层数组。实际代码中切片远比数组常用。`,
    tags: ["数组", "切片", "值类型", "引用类型"],
  },
  {
    id: "gia-arrays-slices-2",
    chapter: "gia-arrays-slices",
    level: 2,
    question: `为什么 s = append(s, x) 必须接收返回值？append 不修改原切片吗？`,
    answer: `append 不修改原切片变量 s，因为切片三元组（ptr+len+cap）是值传递。append 接收 s 的副本：len<cap 时写入底层数组返回 len+1 的新三元组；len==cap 时分配新底层数组返回新三元组。两种情况都返回新切片值。不接收 s=append(s,x) 则 s 仍是原三元组——看不到新长度或数据丢失。Go 没有引用传递，append 无法修改调用方的 s 变量。`,
    tags: ["append", "返回值", "值传递"],
  },
  {
    id: "gia-arrays-slices-3",
    chapter: "gia-arrays-slices",
    level: 3,
    question: `以下代码输出什么？为什么？如何避免子切片污染原切片？\ns := []int{1,2,3,4,5}; sub := s[1:3]; sub = append(sub, 99)`,
    answer: `输出 s=[1,2,3,99,5]，sub=[2,3,99]。因为 sub 共享 s 的底层数组，sub 的 cap=4（从 s[1] 到末尾），append 时 len(2)<cap(4) 无需扩容，直接写入底层数组第 3 位置（s[3]），污染了 s。避免方法：用三索引切片 sub:=s[1:3:3]（cap=2），append 时 len==cap 必扩容分配新数组，不影响 s；或用 copy 创建独立副本。三索引切片是防止 append 污染共享底层数组的标准手段。`,
    tags: ["共享底层数组", "三索引切片", "append污染"],
  },
  {
    id: "gia-arrays-slices-4",
    chapter: "gia-arrays-slices",
    level: 4,
    question: `append 的扩容规则是什么？设计一个需要高频追加的场景，如何优化性能？`,
    answer: `扩容规则：cap<256 时翻倍，cap>=256 时约 1.25 倍增长。扩容分配新底层数组并复制旧数据。高频追加优化：1. 预分配容量——make([]T, 0, expectedSize) 一次性分配足够 cap，避免多次扩容复制，这是最有效的优化；2. 若最终大小已知，make([]T, n) 直接分配 n 长度再赋值；3. 用 bytes.Buffer（内部 []byte 预分配策略）拼接字符串/字节，比 += 或多次 append 高效；4. benchmark 验证：关注 allocs/op，减少分配次数比减少 CPU 指令更有效。预分配是 Go 切片性能优化的第一原则。`,
    tags: ["扩容规则", "预分配", "性能优化", "综合"],
  },
];
