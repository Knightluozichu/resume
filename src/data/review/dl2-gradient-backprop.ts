import { ReviewQuestion } from "./types";

export const dl2GradientBackpropQuestions: ReviewQuestion[] = [
  {
    id: "dl2-gradient-backprop-1",
    chapter: "dl2-gradient-backprop",
    level: 2,
    question: `Variable.backward 方法的实现步骤是什么？拓扑排序如何保证正确性？`,
    answer:
      `backward 方法的实现步骤：①初始化输出端梯度——若 self.grad 为 None 则设为 ones_like(data)。②收集 creator 链上的 Function——用 add_func 将 self.creator 加入 funcs 列表和 seen_set 集合，funcs 按 generation 排序。③循环处理——取出 funcs 中 generation 最大的 Function f，收集 f 所有输出的 grad，调用 f.backward(*gys) 得到输入梯度 gxs，将 gxs 累加到 f.inputs 的 grad（None 时赋值，非 None 时相加），将 f.inputs 的 creator 加入 funcs。④funcs 为空时结束。拓扑排序的正确性保证：generation 越大离输出越近，优先处理高代数 Function 保证一个 Function 的所有输出梯度都已计算完毕后才处理它。seen_set 保证同一 Function 不被重复处理。对于多路径（Variable 被多次使用），梯度累加（\`x.grad = x.grad + gx\`）确保所有路径梯度被汇总。`,
    tags: ["backward", "拓扑排序", "generation"],
  },
  {
    id: "dl2-gradient-backprop-2",
    chapter: "dl2-gradient-backprop",
    level: 1,
    question: `为什么需要梯度清零？不清零会导致什么问题？`,
    answer:
      `需要梯度清零的原因：DeZero 的反向传播采用累加机制——当 \`x.grad\` 不为 None 时，新梯度会叠加到旧值上（\`x.grad = x.grad + gx\`）。这是为了处理同一 Variable 被多条路径使用时的正确累加。但如果连续两次 backward 不清零，第二次的梯度会叠加第一次的残留值，导致结果错误。例如：\`x = Variable(3.0); y = square(x); y.backward()\` 得 x.grad=6。若不清零再算 \`y2 = square(x); y2.backward()\`，x.grad 变成 12（6+6）而非正确的 6。解决方法：每次反向传播前调用 \`x.cleargrad()\` 将 grad 重置为 None。在训练循环中，用 \`model.cleargrads()\` 批量清零所有参数梯度，与 PyTorch 的 \`optimizer.zero_grad()\` 作用一致。这是框架使用的基本规范。`,
    tags: ["梯度清零", "cleargrad", "梯度累加"],
  },
  {
    id: "dl2-gradient-backprop-3",
    chapter: "dl2-gradient-backprop",
    level: 3,
    question: `对于 \`b = add(square(x), square(x))\`，手动推导反向传播过程，求 x.grad。`,
    answer:
      `计算 \`b = add(square(x), square(x))\`，设 x=2.0。前向传播：两次 square(x) 得到两个 a=4.0，add 得到 b=8.0。计算图：x 同时输入到两个 square（记为 S1、S2），S1 和 S2 的输出都输入到 add。反向传播：①b.grad=1。②add 的 backward：梯度原样传递，传给 S1 的输出 grad=1，传给 S2 的输出 grad=1。③S1 的 backward：\`2 * x * 1 = 2*2*1 = 4\`，传给 x。④S2 的 backward：\`2 * x * 1 = 2*2*1 = 4\`，传给 x。⑤x 被两条路径传回梯度 4 和 4，累加得 x.grad = 8。验证：b = x^2 + x^2 = 2x^2，db/dx = 4x = 4*2 = 8。正确。这个例子展示了分支（x 分叉到两个 square）和汇合（两个输出汇合到 add）场景下的梯度累加。`,
    tags: ["反向传播", "梯度累加", "分支汇合"],
  },
  {
    id: "dl2-gradient-backprop-4",
    chapter: "dl2-gradient-backprop",
    level: 3,
    question: `什么是数值梯度检验？为什么它是验证反向传播正确性的有效手段？`,
    answer:
      `数值梯度检验是用数值微分验证自动微分正确性的方法：对同一函数分别用自动微分（backward）和中心差分 \`(f(x+h)-f(x-h))/(2h)\` 计算梯度，对比两者是否接近。实现：\`def numerical_grad(f, x, eps=1e-4): x0=Variable(x.data-eps); x1=Variable(x.data+eps); y0=f(x0); y1=f(x1); return (y1.data-y0.data)/(2*eps)\`。它是有效手段的原因：①数值微分只依赖函数的前向计算，不涉及 backward 实现，是独立的验证源——如果 backward 写错了梯度公式，数值微分仍能给出正确值，两者对比即可发现错误。②中心差分的精度足够（误差 O(eps^2)），eps=1e-4 时通常能匹配到 4-5 位有效数字。③适合任意复合函数，无需手动推导解析导数。DeZero 全书反复使用此方法，每实现一个新的 Function 都用数值梯度检验验证 backward 的正确性。`,
    tags: ["数值梯度检验", "梯度验证", "调试"],
  },
];
