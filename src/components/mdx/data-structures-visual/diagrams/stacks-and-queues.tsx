"use client";

import { DsvOfficialLab } from "./official-lab";

const stackCases = [
  { label: "顺序栈", fields: [["状态", "data[0..top)为元素，top同时是长度和下一空位"], ["Push/Pop", "尾部读写，Theta(1)"], ["边界", "top==capacity溢出，top==0下溢"]] },
  { label: "共享栈", fields: [["状态", "left从低端增长，right从高端增长"], ["空间满", "left_top + 1 == right_top"], ["适用", "两栈峰值互补且共享同类型数组"]] },
  { label: "链栈", fields: [["状态", "head即栈顶，next指向更早元素"], ["Push/Pop", "首部链接改写，Theta(1)"], ["边界", "malloc失败与payload owner"]] },
  { label: "调用栈", fields: [["状态", "每次调用压入frame，return弹出"], ["递归", "参数、局部变量和返回点逐层保存"], ["边界", "深度过大造成stack overflow"]], alert: "LIFO语义不等于某一种表示；顺序、共享、链式与调用栈都必须满足同一push/pop次序。" },
] as const;

const expressionCases = [
  { label: "Tokenize", fields: [["输入", "数字、运算符、括号与空白"], ["输出", "有位置的typed tokens"], ["错误", "未知字符、数值溢出、空表达式"]] },
  { label: "Infix→Postfix", fields: [["状态", "output序列 + operator stack"], ["规则", "按优先级/结合性弹栈，括号控制边界"], ["错误", "括号不配对或操作符位置非法"]] },
  { label: "Evaluate", fields: [["状态", "operand stack"], ["规则", "遇数字push；二元运算先弹right再弹left"], ["错误", "操作数不足、除零、溢出"]] },
  { label: "Verify", fields: [["终局", "处理完恰好剩一个结果"], ["对照", "与reference parser/已知向量比较"], ["扰动", "一元负号、嵌套括号、长输入"]], alert: "后缀求值最常见错误是把二元操作数顺序写反：先弹出的是right operand。" },
] as const;

const queueCases = [
  { label: "线性数组", fields: [["状态", "front到rear为有效区间"], ["问题", "出队后前部空槽难复用，可能假溢出"], ["修复", "搬移代价高，改用循环队列"]] },
  { label: "循环队列", fields: [["状态", "front/rear按capacity取模"], ["判空/判满", "可空一槽，front==rear为空，next(rear)==front为满"], ["代价", "入队出队Theta(1)，容量可用capacity-1"]] },
  { label: "链队列", fields: [["状态", "front sentinel + rear尾结点"], ["入队", "rear->next=node; rear=node"], ["出队", "删除front->next，删最后一个时rear回sentinel"]] },
  { label: "并发边界", fields: [["问题", "普通队列操作不是自动线程安全"], ["需要", "single owner或锁/原子协议、容量和backpressure"], ["证据", "FIFO、无丢失重复、shutdown语义"]], alert: "循环队列必须固定判满方案；混用length、空一槽和tag三套规则会产生off-by-one。" },
] as const;

export function DsvStackRepresentationLab() {
  return <DsvOfficialLab cases={stackCases} caption="顺序、共享、链式和调用栈以不同表示实现同一LIFO语义。" tone="cyan" />;
}

export function DsvExpressionStackLab() {
  return <DsvOfficialLab cases={expressionCases} caption="Tokenize、中缀转后缀、后缀求值与验证组成表达式处理闭环。" tone="violet" />;
}

export function DsvQueueRepresentationLab() {
  return <DsvOfficialLab cases={queueCases} caption="线性数组、循环队列与链队列的边界、容量和owner不同。" tone="emerald" />;
}
