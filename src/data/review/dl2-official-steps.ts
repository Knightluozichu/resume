import type { ReviewQuestion } from "./types";

export const dl2OfficialQuestions: ReviewQuestion[] = [
  {
    id: "dl2-official-learning-map-1",
    chapter: "dl2-official-learning-map",
    level: 1,
    question:
      "如何用最小对象图解释《深度学习入门2：自制框架》权威学习地图的核心机制？",
    answer:
      "按官方60步从Variable和Function出发，完成自动微分、自然接口、高阶导数、神经网络以及GPU/CNN/RNN挑战。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“5个阶段、60个步骤、207个编号小节和3个附录全部可导航，任何便利API都不破坏计算图、shape、梯度与模式合同。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Define-by-Run", "Function", "DeZero", "框架证据"],
  },
  {
    id: "dl2-official-learning-map-2",
    chapter: "dl2-official-learning-map",
    level: 1,
    question:
      "在《深度学习入门2：自制框架》权威学习地图中，哪条中间证据必须先于训练结果检查？",
    answer:
      "按官方60步从Variable和Function出发，完成自动微分、自然接口、高阶导数、神经网络以及GPU/CNN/RNN挑战。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“5个阶段、60个步骤、207个编号小节和3个附录全部可导航，任何便利API都不破坏计算图、shape、梯度与模式合同。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Variable", "高阶导数", "DeZero", "框架证据"],
  },
  {
    id: "dl2-official-learning-map-3",
    chapter: "dl2-official-learning-map",
    level: 2,
    question:
      "如何在《深度学习入门2：自制框架》权威学习地图中手算并验证Function的forward与backward？",
    answer:
      "按官方60步从Variable和Function出发，完成自动微分、自然接口、高阶导数、神经网络以及GPU/CNN/RNN挑战。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“5个阶段、60个步骤、207个编号小节和3个附录全部可导航，任何便利API都不破坏计算图、shape、梯度与模式合同。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Function", "Layer", "DeZero", "框架证据"],
  },
  {
    id: "dl2-official-learning-map-4",
    chapter: "dl2-official-learning-map",
    level: 2,
    question:
      "怎样为《深度学习入门2：自制框架》权威学习地图构造违反shape、对象或模式合同的失败样本？",
    answer:
      "按官方60步从Variable和Function出发，完成自动微分、自然接口、高阶导数、神经网络以及GPU/CNN/RNN挑战。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“5个阶段、60个步骤、207个编号小节和3个附录全部可导航，任何便利API都不破坏计算图、shape、梯度与模式合同。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["高阶导数", "DeZero", "DeZero", "框架证据"],
  },
  {
    id: "dl2-official-learning-map-5",
    chapter: "dl2-official-learning-map",
    level: 3,
    question:
      "如何在《深度学习入门2：自制框架》权威学习地图中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "按官方60步从Variable和Function出发，完成自动微分、自然接口、高阶导数、神经网络以及GPU/CNN/RNN挑战。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“5个阶段、60个步骤、207个编号小节和3个附录全部可导航，任何便利API都不破坏计算图、shape、梯度与模式合同。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Layer", "Define-by-Run", "DeZero", "框架证据"],
  },
  {
    id: "dl2-official-learning-map-6",
    chapter: "dl2-official-learning-map",
    level: 3,
    question:
      "怎样把《深度学习入门2：自制框架》权威学习地图接入DeZero端到端回归测试？",
    answer:
      "按官方60步从Variable和Function出发，完成自动微分、自然接口、高阶导数、神经网络以及GPU/CNN/RNN挑战。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“5个阶段、60个步骤、207个编号小节和3个附录全部可导航，任何便利API都不破坏计算图、shape、梯度与模式合同。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DeZero", "Variable", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-01-variable-box-1",
    chapter: "dl2-step-01-variable-box",
    level: 1,
    question: "如何用最小对象图解释步骤1 作为“箱子”的变量的核心机制？",
    answer:
      "步骤1 作为“箱子”的变量沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Variable", "creator", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-01-variable-box-2",
    chapter: "dl2-step-01-variable-box",
    level: 1,
    question: "在步骤1 作为“箱子”的变量中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤1 作为“箱子”的变量沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Function", "计算图", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-01-variable-box-3",
    chapter: "dl2-step-01-variable-box",
    level: 2,
    question:
      "如何在步骤1 作为“箱子”的变量中手算并验证creator的forward与backward？",
    answer:
      "步骤1 作为“箱子”的变量沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["creator", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-01-variable-box-4",
    chapter: "dl2-step-01-variable-box",
    level: 2,
    question:
      "怎样为步骤1 作为“箱子”的变量构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤1 作为“箱子”的变量沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["计算图", "Variable", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-01-variable-box-5",
    chapter: "dl2-step-01-variable-box",
    level: 3,
    question:
      "如何在步骤1 作为“箱子”的变量中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤1 作为“箱子”的变量沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "Function", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-01-variable-box-6",
    chapter: "dl2-step-01-variable-box",
    level: 3,
    question: "怎样把步骤1 作为“箱子”的变量接入DeZero端到端回归测试？",
    answer:
      "步骤1 作为“箱子”的变量沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Variable", "creator", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-02-function-creator-1",
    chapter: "dl2-step-02-function-creator",
    level: 1,
    question: "如何用最小对象图解释步骤2 创建变量的函数的核心机制？",
    answer:
      "步骤2 创建变量的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Variable", "creator", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-02-function-creator-2",
    chapter: "dl2-step-02-function-creator",
    level: 1,
    question: "在步骤2 创建变量的函数中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤2 创建变量的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Function", "计算图", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-02-function-creator-3",
    chapter: "dl2-step-02-function-creator",
    level: 2,
    question:
      "如何在步骤2 创建变量的函数中手算并验证creator的forward与backward？",
    answer:
      "步骤2 创建变量的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["creator", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-02-function-creator-4",
    chapter: "dl2-step-02-function-creator",
    level: 2,
    question:
      "怎样为步骤2 创建变量的函数构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤2 创建变量的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["计算图", "Variable", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-02-function-creator-5",
    chapter: "dl2-step-02-function-creator",
    level: 3,
    question:
      "如何在步骤2 创建变量的函数中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤2 创建变量的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "Function", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-02-function-creator-6",
    chapter: "dl2-step-02-function-creator",
    level: 3,
    question: "怎样把步骤2 创建变量的函数接入DeZero端到端回归测试？",
    answer:
      "步骤2 创建变量的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Variable", "creator", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-03-function-chain-1",
    chapter: "dl2-step-03-function-chain",
    level: 1,
    question: "如何用最小对象图解释步骤3 函数的连续调用的核心机制？",
    answer:
      "步骤3 函数的连续调用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Variable", "creator", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-03-function-chain-2",
    chapter: "dl2-step-03-function-chain",
    level: 1,
    question: "在步骤3 函数的连续调用中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤3 函数的连续调用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Function", "计算图", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-03-function-chain-3",
    chapter: "dl2-step-03-function-chain",
    level: 2,
    question:
      "如何在步骤3 函数的连续调用中手算并验证creator的forward与backward？",
    answer:
      "步骤3 函数的连续调用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["creator", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-03-function-chain-4",
    chapter: "dl2-step-03-function-chain",
    level: 2,
    question:
      "怎样为步骤3 函数的连续调用构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤3 函数的连续调用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["计算图", "Variable", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-03-function-chain-5",
    chapter: "dl2-step-03-function-chain",
    level: 3,
    question:
      "如何在步骤3 函数的连续调用中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤3 函数的连续调用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "Function", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-03-function-chain-6",
    chapter: "dl2-step-03-function-chain",
    level: 3,
    question: "怎样把步骤3 函数的连续调用接入DeZero端到端回归测试？",
    answer:
      "步骤3 函数的连续调用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Variable", "creator", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-04-numerical-differentiation-1",
    chapter: "dl2-step-04-numerical-differentiation",
    level: 1,
    question: "如何用最小对象图解释步骤4 数值微分的核心机制？",
    answer:
      "步骤4 数值微分沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Variable", "creator", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-04-numerical-differentiation-2",
    chapter: "dl2-step-04-numerical-differentiation",
    level: 1,
    question: "在步骤4 数值微分中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤4 数值微分沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Function", "计算图", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-04-numerical-differentiation-3",
    chapter: "dl2-step-04-numerical-differentiation",
    level: 2,
    question: "如何在步骤4 数值微分中手算并验证creator的forward与backward？",
    answer:
      "步骤4 数值微分沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["creator", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-04-numerical-differentiation-4",
    chapter: "dl2-step-04-numerical-differentiation",
    level: 2,
    question: "怎样为步骤4 数值微分构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤4 数值微分沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["计算图", "Variable", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-04-numerical-differentiation-5",
    chapter: "dl2-step-04-numerical-differentiation",
    level: 3,
    question:
      "如何在步骤4 数值微分中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤4 数值微分沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "Function", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-04-numerical-differentiation-6",
    chapter: "dl2-step-04-numerical-differentiation",
    level: 3,
    question: "怎样把步骤4 数值微分接入DeZero端到端回归测试？",
    answer:
      "步骤4 数值微分沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Variable", "creator", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-05-backprop-theory-1",
    chapter: "dl2-step-05-backprop-theory",
    level: 1,
    question: "如何用最小对象图解释步骤5 反向传播的理论知识的核心机制？",
    answer:
      "步骤5 反向传播的理论知识沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Variable", "creator", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-05-backprop-theory-2",
    chapter: "dl2-step-05-backprop-theory",
    level: 1,
    question:
      "在步骤5 反向传播的理论知识中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤5 反向传播的理论知识沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Function", "计算图", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-05-backprop-theory-3",
    chapter: "dl2-step-05-backprop-theory",
    level: 2,
    question:
      "如何在步骤5 反向传播的理论知识中手算并验证creator的forward与backward？",
    answer:
      "步骤5 反向传播的理论知识沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["creator", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-05-backprop-theory-4",
    chapter: "dl2-step-05-backprop-theory",
    level: 2,
    question:
      "怎样为步骤5 反向传播的理论知识构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤5 反向传播的理论知识沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["计算图", "Variable", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-05-backprop-theory-5",
    chapter: "dl2-step-05-backprop-theory",
    level: 3,
    question:
      "如何在步骤5 反向传播的理论知识中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤5 反向传播的理论知识沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "Function", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-05-backprop-theory-6",
    chapter: "dl2-step-05-backprop-theory",
    level: 3,
    question: "怎样把步骤5 反向传播的理论知识接入DeZero端到端回归测试？",
    answer:
      "步骤5 反向传播的理论知识沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Variable", "creator", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-06-manual-backprop-1",
    chapter: "dl2-step-06-manual-backprop",
    level: 1,
    question: "如何用最小对象图解释步骤6 手动进行反向传播的核心机制？",
    answer:
      "步骤6 手动进行反向传播沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Variable", "creator", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-06-manual-backprop-2",
    chapter: "dl2-step-06-manual-backprop",
    level: 1,
    question: "在步骤6 手动进行反向传播中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤6 手动进行反向传播沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Function", "计算图", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-06-manual-backprop-3",
    chapter: "dl2-step-06-manual-backprop",
    level: 2,
    question:
      "如何在步骤6 手动进行反向传播中手算并验证creator的forward与backward？",
    answer:
      "步骤6 手动进行反向传播沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["creator", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-06-manual-backprop-4",
    chapter: "dl2-step-06-manual-backprop",
    level: 2,
    question:
      "怎样为步骤6 手动进行反向传播构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤6 手动进行反向传播沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["计算图", "Variable", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-06-manual-backprop-5",
    chapter: "dl2-step-06-manual-backprop",
    level: 3,
    question:
      "如何在步骤6 手动进行反向传播中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤6 手动进行反向传播沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "Function", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-06-manual-backprop-6",
    chapter: "dl2-step-06-manual-backprop",
    level: 3,
    question: "怎样把步骤6 手动进行反向传播接入DeZero端到端回归测试？",
    answer:
      "步骤6 手动进行反向传播沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Variable", "creator", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-07-automatic-backprop-1",
    chapter: "dl2-step-07-automatic-backprop",
    level: 1,
    question: "如何用最小对象图解释步骤7 反向传播的自动化的核心机制？",
    answer:
      "步骤7 反向传播的自动化沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Variable", "creator", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-07-automatic-backprop-2",
    chapter: "dl2-step-07-automatic-backprop",
    level: 1,
    question: "在步骤7 反向传播的自动化中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤7 反向传播的自动化沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Function", "计算图", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-07-automatic-backprop-3",
    chapter: "dl2-step-07-automatic-backprop",
    level: 2,
    question:
      "如何在步骤7 反向传播的自动化中手算并验证creator的forward与backward？",
    answer:
      "步骤7 反向传播的自动化沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["creator", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-07-automatic-backprop-4",
    chapter: "dl2-step-07-automatic-backprop",
    level: 2,
    question:
      "怎样为步骤7 反向传播的自动化构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤7 反向传播的自动化沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["计算图", "Variable", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-07-automatic-backprop-5",
    chapter: "dl2-step-07-automatic-backprop",
    level: 3,
    question:
      "如何在步骤7 反向传播的自动化中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤7 反向传播的自动化沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "Function", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-07-automatic-backprop-6",
    chapter: "dl2-step-07-automatic-backprop",
    level: 3,
    question: "怎样把步骤7 反向传播的自动化接入DeZero端到端回归测试？",
    answer:
      "步骤7 反向传播的自动化沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Variable", "creator", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-08-recursion-to-loop-1",
    chapter: "dl2-step-08-recursion-to-loop",
    level: 1,
    question: "如何用最小对象图解释步骤8 从递归到循环的核心机制？",
    answer:
      "步骤8 从递归到循环沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Variable", "creator", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-08-recursion-to-loop-2",
    chapter: "dl2-step-08-recursion-to-loop",
    level: 1,
    question: "在步骤8 从递归到循环中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤8 从递归到循环沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Function", "计算图", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-08-recursion-to-loop-3",
    chapter: "dl2-step-08-recursion-to-loop",
    level: 2,
    question:
      "如何在步骤8 从递归到循环中手算并验证creator的forward与backward？",
    answer:
      "步骤8 从递归到循环沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["creator", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-08-recursion-to-loop-4",
    chapter: "dl2-step-08-recursion-to-loop",
    level: 2,
    question:
      "怎样为步骤8 从递归到循环构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤8 从递归到循环沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["计算图", "Variable", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-08-recursion-to-loop-5",
    chapter: "dl2-step-08-recursion-to-loop",
    level: 3,
    question:
      "如何在步骤8 从递归到循环中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤8 从递归到循环沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "Function", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-08-recursion-to-loop-6",
    chapter: "dl2-step-08-recursion-to-loop",
    level: 3,
    question: "怎样把步骤8 从递归到循环接入DeZero端到端回归测试？",
    answer:
      "步骤8 从递归到循环沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Variable", "creator", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-09-usable-functions-1",
    chapter: "dl2-step-09-usable-functions",
    level: 1,
    question: "如何用最小对象图解释步骤9 让函数更易用的核心机制？",
    answer:
      "步骤9 让函数更易用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Variable", "creator", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-09-usable-functions-2",
    chapter: "dl2-step-09-usable-functions",
    level: 1,
    question: "在步骤9 让函数更易用中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤9 让函数更易用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Function", "计算图", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-09-usable-functions-3",
    chapter: "dl2-step-09-usable-functions",
    level: 2,
    question:
      "如何在步骤9 让函数更易用中手算并验证creator的forward与backward？",
    answer:
      "步骤9 让函数更易用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["creator", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-09-usable-functions-4",
    chapter: "dl2-step-09-usable-functions",
    level: 2,
    question:
      "怎样为步骤9 让函数更易用构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤9 让函数更易用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["计算图", "Variable", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-09-usable-functions-5",
    chapter: "dl2-step-09-usable-functions",
    level: 3,
    question:
      "如何在步骤9 让函数更易用中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤9 让函数更易用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "Function", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-09-usable-functions-6",
    chapter: "dl2-step-09-usable-functions",
    level: 3,
    question: "怎样把步骤9 让函数更易用接入DeZero端到端回归测试？",
    answer:
      "步骤9 让函数更易用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Variable", "creator", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-10-testing-1",
    chapter: "dl2-step-10-testing",
    level: 1,
    question: "如何用最小对象图解释步骤10 测试的核心机制？",
    answer:
      "步骤10 测试沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Variable", "creator", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-10-testing-2",
    chapter: "dl2-step-10-testing",
    level: 1,
    question: "在步骤10 测试中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤10 测试沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Function", "计算图", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-10-testing-3",
    chapter: "dl2-step-10-testing",
    level: 2,
    question: "如何在步骤10 测试中手算并验证creator的forward与backward？",
    answer:
      "步骤10 测试沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["creator", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-10-testing-4",
    chapter: "dl2-step-10-testing",
    level: 2,
    question: "怎样为步骤10 测试构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤10 测试沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["计算图", "Variable", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-10-testing-5",
    chapter: "dl2-step-10-testing",
    level: 3,
    question:
      "如何在步骤10 测试中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤10 测试沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "Function", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-10-testing-6",
    chapter: "dl2-step-10-testing",
    level: 3,
    question: "怎样把步骤10 测试接入DeZero端到端回归测试？",
    answer:
      "步骤10 测试沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“Variable保存数据与梯度，Function保存输入输出关系；反向传播沿creator链逆序执行，解析梯度必须通过中心差分。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Variable", "creator", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-11-variadic-forward-1",
    chapter: "dl2-step-11-variadic-forward",
    level: 1,
    question: "如何用最小对象图解释步骤11 可变长参数（正向传播篇）的核心机制？",
    answer:
      "步骤11 可变长参数（正向传播篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-11-variadic-forward-2",
    chapter: "dl2-step-11-variadic-forward",
    level: 1,
    question:
      "在步骤11 可变长参数（正向传播篇）中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤11 可变长参数（正向传播篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度累加", "weakref", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-11-variadic-forward-3",
    chapter: "dl2-step-11-variadic-forward",
    level: 2,
    question:
      "如何在步骤11 可变长参数（正向传播篇）中手算并验证generation的forward与backward？",
    answer:
      "步骤11 可变长参数（正向传播篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["generation", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-11-variadic-forward-4",
    chapter: "dl2-step-11-variadic-forward",
    level: 2,
    question:
      "怎样为步骤11 可变长参数（正向传播篇）构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤11 可变长参数（正向传播篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["weakref", "可变长参数", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-11-variadic-forward-5",
    chapter: "dl2-step-11-variadic-forward",
    level: 3,
    question:
      "如何在步骤11 可变长参数（正向传播篇）中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤11 可变长参数（正向传播篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "梯度累加", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-11-variadic-forward-6",
    chapter: "dl2-step-11-variadic-forward",
    level: 3,
    question: "怎样把步骤11 可变长参数（正向传播篇）接入DeZero端到端回归测试？",
    answer:
      "步骤11 可变长参数（正向传播篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-12-variadic-improvements-1",
    chapter: "dl2-step-12-variadic-improvements",
    level: 1,
    question: "如何用最小对象图解释步骤12 可变长参数（改进篇）的核心机制？",
    answer:
      "步骤12 可变长参数（改进篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-12-variadic-improvements-2",
    chapter: "dl2-step-12-variadic-improvements",
    level: 1,
    question:
      "在步骤12 可变长参数（改进篇）中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤12 可变长参数（改进篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度累加", "weakref", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-12-variadic-improvements-3",
    chapter: "dl2-step-12-variadic-improvements",
    level: 2,
    question:
      "如何在步骤12 可变长参数（改进篇）中手算并验证generation的forward与backward？",
    answer:
      "步骤12 可变长参数（改进篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["generation", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-12-variadic-improvements-4",
    chapter: "dl2-step-12-variadic-improvements",
    level: 2,
    question:
      "怎样为步骤12 可变长参数（改进篇）构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤12 可变长参数（改进篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["weakref", "可变长参数", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-12-variadic-improvements-5",
    chapter: "dl2-step-12-variadic-improvements",
    level: 3,
    question:
      "如何在步骤12 可变长参数（改进篇）中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤12 可变长参数（改进篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "梯度累加", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-12-variadic-improvements-6",
    chapter: "dl2-step-12-variadic-improvements",
    level: 3,
    question: "怎样把步骤12 可变长参数（改进篇）接入DeZero端到端回归测试？",
    answer:
      "步骤12 可变长参数（改进篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-13-variadic-backward-1",
    chapter: "dl2-step-13-variadic-backward",
    level: 1,
    question: "如何用最小对象图解释步骤13 可变长参数（反向传播篇）的核心机制？",
    answer:
      "步骤13 可变长参数（反向传播篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-13-variadic-backward-2",
    chapter: "dl2-step-13-variadic-backward",
    level: 1,
    question:
      "在步骤13 可变长参数（反向传播篇）中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤13 可变长参数（反向传播篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度累加", "weakref", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-13-variadic-backward-3",
    chapter: "dl2-step-13-variadic-backward",
    level: 2,
    question:
      "如何在步骤13 可变长参数（反向传播篇）中手算并验证generation的forward与backward？",
    answer:
      "步骤13 可变长参数（反向传播篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["generation", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-13-variadic-backward-4",
    chapter: "dl2-step-13-variadic-backward",
    level: 2,
    question:
      "怎样为步骤13 可变长参数（反向传播篇）构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤13 可变长参数（反向传播篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["weakref", "可变长参数", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-13-variadic-backward-5",
    chapter: "dl2-step-13-variadic-backward",
    level: 3,
    question:
      "如何在步骤13 可变长参数（反向传播篇）中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤13 可变长参数（反向传播篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "梯度累加", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-13-variadic-backward-6",
    chapter: "dl2-step-13-variadic-backward",
    level: 3,
    question: "怎样把步骤13 可变长参数（反向传播篇）接入DeZero端到端回归测试？",
    answer:
      "步骤13 可变长参数（反向传播篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-14-reused-variable-1",
    chapter: "dl2-step-14-reused-variable",
    level: 1,
    question: "如何用最小对象图解释步骤14 重复使用同一个变量的核心机制？",
    answer:
      "步骤14 重复使用同一个变量沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-14-reused-variable-2",
    chapter: "dl2-step-14-reused-variable",
    level: 1,
    question:
      "在步骤14 重复使用同一个变量中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤14 重复使用同一个变量沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度累加", "weakref", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-14-reused-variable-3",
    chapter: "dl2-step-14-reused-variable",
    level: 2,
    question:
      "如何在步骤14 重复使用同一个变量中手算并验证generation的forward与backward？",
    answer:
      "步骤14 重复使用同一个变量沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["generation", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-14-reused-variable-4",
    chapter: "dl2-step-14-reused-variable",
    level: 2,
    question:
      "怎样为步骤14 重复使用同一个变量构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤14 重复使用同一个变量沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["weakref", "可变长参数", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-14-reused-variable-5",
    chapter: "dl2-step-14-reused-variable",
    level: 3,
    question:
      "如何在步骤14 重复使用同一个变量中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤14 重复使用同一个变量沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "梯度累加", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-14-reused-variable-6",
    chapter: "dl2-step-14-reused-variable",
    level: 3,
    question: "怎样把步骤14 重复使用同一个变量接入DeZero端到端回归测试？",
    answer:
      "步骤14 重复使用同一个变量沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-15-complex-graph-theory-1",
    chapter: "dl2-step-15-complex-graph-theory",
    level: 1,
    question: "如何用最小对象图解释步骤15 复杂的计算图（理论篇）的核心机制？",
    answer:
      "步骤15 复杂的计算图（理论篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-15-complex-graph-theory-2",
    chapter: "dl2-step-15-complex-graph-theory",
    level: 1,
    question:
      "在步骤15 复杂的计算图（理论篇）中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤15 复杂的计算图（理论篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度累加", "weakref", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-15-complex-graph-theory-3",
    chapter: "dl2-step-15-complex-graph-theory",
    level: 2,
    question:
      "如何在步骤15 复杂的计算图（理论篇）中手算并验证generation的forward与backward？",
    answer:
      "步骤15 复杂的计算图（理论篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["generation", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-15-complex-graph-theory-4",
    chapter: "dl2-step-15-complex-graph-theory",
    level: 2,
    question:
      "怎样为步骤15 复杂的计算图（理论篇）构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤15 复杂的计算图（理论篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["weakref", "可变长参数", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-15-complex-graph-theory-5",
    chapter: "dl2-step-15-complex-graph-theory",
    level: 3,
    question:
      "如何在步骤15 复杂的计算图（理论篇）中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤15 复杂的计算图（理论篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "梯度累加", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-15-complex-graph-theory-6",
    chapter: "dl2-step-15-complex-graph-theory",
    level: 3,
    question: "怎样把步骤15 复杂的计算图（理论篇）接入DeZero端到端回归测试？",
    answer:
      "步骤15 复杂的计算图（理论篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-16-complex-graph-implementation-1",
    chapter: "dl2-step-16-complex-graph-implementation",
    level: 1,
    question: "如何用最小对象图解释步骤16 复杂的计算图（实现篇）的核心机制？",
    answer:
      "步骤16 复杂的计算图（实现篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-16-complex-graph-implementation-2",
    chapter: "dl2-step-16-complex-graph-implementation",
    level: 1,
    question:
      "在步骤16 复杂的计算图（实现篇）中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤16 复杂的计算图（实现篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度累加", "weakref", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-16-complex-graph-implementation-3",
    chapter: "dl2-step-16-complex-graph-implementation",
    level: 2,
    question:
      "如何在步骤16 复杂的计算图（实现篇）中手算并验证generation的forward与backward？",
    answer:
      "步骤16 复杂的计算图（实现篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["generation", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-16-complex-graph-implementation-4",
    chapter: "dl2-step-16-complex-graph-implementation",
    level: 2,
    question:
      "怎样为步骤16 复杂的计算图（实现篇）构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤16 复杂的计算图（实现篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["weakref", "可变长参数", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-16-complex-graph-implementation-5",
    chapter: "dl2-step-16-complex-graph-implementation",
    level: 3,
    question:
      "如何在步骤16 复杂的计算图（实现篇）中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤16 复杂的计算图（实现篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "梯度累加", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-16-complex-graph-implementation-6",
    chapter: "dl2-step-16-complex-graph-implementation",
    level: 3,
    question: "怎样把步骤16 复杂的计算图（实现篇）接入DeZero端到端回归测试？",
    answer:
      "步骤16 复杂的计算图（实现篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-17-memory-cycles-1",
    chapter: "dl2-step-17-memory-cycles",
    level: 1,
    question: "如何用最小对象图解释步骤17 内存管理和循环引用的核心机制？",
    answer:
      "步骤17 内存管理和循环引用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-17-memory-cycles-2",
    chapter: "dl2-step-17-memory-cycles",
    level: 1,
    question:
      "在步骤17 内存管理和循环引用中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤17 内存管理和循环引用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度累加", "weakref", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-17-memory-cycles-3",
    chapter: "dl2-step-17-memory-cycles",
    level: 2,
    question:
      "如何在步骤17 内存管理和循环引用中手算并验证generation的forward与backward？",
    answer:
      "步骤17 内存管理和循环引用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["generation", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-17-memory-cycles-4",
    chapter: "dl2-step-17-memory-cycles",
    level: 2,
    question:
      "怎样为步骤17 内存管理和循环引用构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤17 内存管理和循环引用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["weakref", "可变长参数", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-17-memory-cycles-5",
    chapter: "dl2-step-17-memory-cycles",
    level: 3,
    question:
      "如何在步骤17 内存管理和循环引用中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤17 内存管理和循环引用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "梯度累加", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-17-memory-cycles-6",
    chapter: "dl2-step-17-memory-cycles",
    level: 3,
    question: "怎样把步骤17 内存管理和循环引用接入DeZero端到端回归测试？",
    answer:
      "步骤17 内存管理和循环引用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-18-memory-mode-1",
    chapter: "dl2-step-18-memory-mode",
    level: 1,
    question: "如何用最小对象图解释步骤18 减少内存使用量的模式的核心机制？",
    answer:
      "步骤18 减少内存使用量的模式沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-18-memory-mode-2",
    chapter: "dl2-step-18-memory-mode",
    level: 1,
    question:
      "在步骤18 减少内存使用量的模式中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤18 减少内存使用量的模式沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度累加", "weakref", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-18-memory-mode-3",
    chapter: "dl2-step-18-memory-mode",
    level: 2,
    question:
      "如何在步骤18 减少内存使用量的模式中手算并验证generation的forward与backward？",
    answer:
      "步骤18 减少内存使用量的模式沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["generation", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-18-memory-mode-4",
    chapter: "dl2-step-18-memory-mode",
    level: 2,
    question:
      "怎样为步骤18 减少内存使用量的模式构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤18 减少内存使用量的模式沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["weakref", "可变长参数", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-18-memory-mode-5",
    chapter: "dl2-step-18-memory-mode",
    level: 3,
    question:
      "如何在步骤18 减少内存使用量的模式中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤18 减少内存使用量的模式沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "梯度累加", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-18-memory-mode-6",
    chapter: "dl2-step-18-memory-mode",
    level: 3,
    question: "怎样把步骤18 减少内存使用量的模式接入DeZero端到端回归测试？",
    answer:
      "步骤18 减少内存使用量的模式沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-19-usable-variable-1",
    chapter: "dl2-step-19-usable-variable",
    level: 1,
    question: "如何用最小对象图解释步骤19 让变量更易用的核心机制？",
    answer:
      "步骤19 让变量更易用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-19-usable-variable-2",
    chapter: "dl2-step-19-usable-variable",
    level: 1,
    question: "在步骤19 让变量更易用中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤19 让变量更易用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度累加", "weakref", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-19-usable-variable-3",
    chapter: "dl2-step-19-usable-variable",
    level: 2,
    question:
      "如何在步骤19 让变量更易用中手算并验证generation的forward与backward？",
    answer:
      "步骤19 让变量更易用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["generation", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-19-usable-variable-4",
    chapter: "dl2-step-19-usable-variable",
    level: 2,
    question:
      "怎样为步骤19 让变量更易用构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤19 让变量更易用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["weakref", "可变长参数", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-19-usable-variable-5",
    chapter: "dl2-step-19-usable-variable",
    level: 3,
    question:
      "如何在步骤19 让变量更易用中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤19 让变量更易用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "梯度累加", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-19-usable-variable-6",
    chapter: "dl2-step-19-usable-variable",
    level: 3,
    question: "怎样把步骤19 让变量更易用接入DeZero端到端回归测试？",
    answer:
      "步骤19 让变量更易用沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-20-operator-overload-one-1",
    chapter: "dl2-step-20-operator-overload-one",
    level: 1,
    question: "如何用最小对象图解释步骤20 运算符重载（1）的核心机制？",
    answer:
      "步骤20 运算符重载（1）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-20-operator-overload-one-2",
    chapter: "dl2-step-20-operator-overload-one",
    level: 1,
    question: "在步骤20 运算符重载（1）中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤20 运算符重载（1）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度累加", "weakref", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-20-operator-overload-one-3",
    chapter: "dl2-step-20-operator-overload-one",
    level: 2,
    question:
      "如何在步骤20 运算符重载（1）中手算并验证generation的forward与backward？",
    answer:
      "步骤20 运算符重载（1）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["generation", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-20-operator-overload-one-4",
    chapter: "dl2-step-20-operator-overload-one",
    level: 2,
    question:
      "怎样为步骤20 运算符重载（1）构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤20 运算符重载（1）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["weakref", "可变长参数", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-20-operator-overload-one-5",
    chapter: "dl2-step-20-operator-overload-one",
    level: 3,
    question:
      "如何在步骤20 运算符重载（1）中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤20 运算符重载（1）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "梯度累加", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-20-operator-overload-one-6",
    chapter: "dl2-step-20-operator-overload-one",
    level: 3,
    question: "怎样把步骤20 运算符重载（1）接入DeZero端到端回归测试？",
    answer:
      "步骤20 运算符重载（1）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-21-operator-overload-two-1",
    chapter: "dl2-step-21-operator-overload-two",
    level: 1,
    question: "如何用最小对象图解释步骤21 运算符重载（2）的核心机制？",
    answer:
      "步骤21 运算符重载（2）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-21-operator-overload-two-2",
    chapter: "dl2-step-21-operator-overload-two",
    level: 1,
    question: "在步骤21 运算符重载（2）中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤21 运算符重载（2）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度累加", "weakref", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-21-operator-overload-two-3",
    chapter: "dl2-step-21-operator-overload-two",
    level: 2,
    question:
      "如何在步骤21 运算符重载（2）中手算并验证generation的forward与backward？",
    answer:
      "步骤21 运算符重载（2）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["generation", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-21-operator-overload-two-4",
    chapter: "dl2-step-21-operator-overload-two",
    level: 2,
    question:
      "怎样为步骤21 运算符重载（2）构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤21 运算符重载（2）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["weakref", "可变长参数", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-21-operator-overload-two-5",
    chapter: "dl2-step-21-operator-overload-two",
    level: 3,
    question:
      "如何在步骤21 运算符重载（2）中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤21 运算符重载（2）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "梯度累加", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-21-operator-overload-two-6",
    chapter: "dl2-step-21-operator-overload-two",
    level: 3,
    question: "怎样把步骤21 运算符重载（2）接入DeZero端到端回归测试？",
    answer:
      "步骤21 运算符重载（2）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-22-operator-overload-three-1",
    chapter: "dl2-step-22-operator-overload-three",
    level: 1,
    question: "如何用最小对象图解释步骤22 运算符重载（3）的核心机制？",
    answer:
      "步骤22 运算符重载（3）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-22-operator-overload-three-2",
    chapter: "dl2-step-22-operator-overload-three",
    level: 1,
    question: "在步骤22 运算符重载（3）中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤22 运算符重载（3）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度累加", "weakref", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-22-operator-overload-three-3",
    chapter: "dl2-step-22-operator-overload-three",
    level: 2,
    question:
      "如何在步骤22 运算符重载（3）中手算并验证generation的forward与backward？",
    answer:
      "步骤22 运算符重载（3）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["generation", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-22-operator-overload-three-4",
    chapter: "dl2-step-22-operator-overload-three",
    level: 2,
    question:
      "怎样为步骤22 运算符重载（3）构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤22 运算符重载（3）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["weakref", "可变长参数", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-22-operator-overload-three-5",
    chapter: "dl2-step-22-operator-overload-three",
    level: 3,
    question:
      "如何在步骤22 运算符重载（3）中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤22 运算符重载（3）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "梯度累加", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-22-operator-overload-three-6",
    chapter: "dl2-step-22-operator-overload-three",
    level: 3,
    question: "怎样把步骤22 运算符重载（3）接入DeZero端到端回归测试？",
    answer:
      "步骤22 运算符重载（3）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-23-package-1",
    chapter: "dl2-step-23-package",
    level: 1,
    question: "如何用最小对象图解释步骤23 打包的核心机制？",
    answer:
      "步骤23 打包沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-23-package-2",
    chapter: "dl2-step-23-package",
    level: 1,
    question: "在步骤23 打包中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤23 打包沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度累加", "weakref", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-23-package-3",
    chapter: "dl2-step-23-package",
    level: 2,
    question: "如何在步骤23 打包中手算并验证generation的forward与backward？",
    answer:
      "步骤23 打包沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["generation", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-23-package-4",
    chapter: "dl2-step-23-package",
    level: 2,
    question: "怎样为步骤23 打包构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤23 打包沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["weakref", "可变长参数", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-23-package-5",
    chapter: "dl2-step-23-package",
    level: 3,
    question:
      "如何在步骤23 打包中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤23 打包沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "梯度累加", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-23-package-6",
    chapter: "dl2-step-23-package",
    level: 3,
    question: "怎样把步骤23 打包接入DeZero端到端回归测试？",
    answer:
      "步骤23 打包沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-24-complex-derivatives-1",
    chapter: "dl2-step-24-complex-derivatives",
    level: 1,
    question: "如何用最小对象图解释步骤24 复杂函数的求导的核心机制？",
    answer:
      "步骤24 复杂函数的求导沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-24-complex-derivatives-2",
    chapter: "dl2-step-24-complex-derivatives",
    level: 1,
    question: "在步骤24 复杂函数的求导中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤24 复杂函数的求导沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度累加", "weakref", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-24-complex-derivatives-3",
    chapter: "dl2-step-24-complex-derivatives",
    level: 2,
    question:
      "如何在步骤24 复杂函数的求导中手算并验证generation的forward与backward？",
    answer:
      "步骤24 复杂函数的求导沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["generation", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-24-complex-derivatives-4",
    chapter: "dl2-step-24-complex-derivatives",
    level: 2,
    question:
      "怎样为步骤24 复杂函数的求导构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤24 复杂函数的求导沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["weakref", "可变长参数", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-24-complex-derivatives-5",
    chapter: "dl2-step-24-complex-derivatives",
    level: 3,
    question:
      "如何在步骤24 复杂函数的求导中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤24 复杂函数的求导沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "梯度累加", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-24-complex-derivatives-6",
    chapter: "dl2-step-24-complex-derivatives",
    level: 3,
    question: "怎样把步骤24 复杂函数的求导接入DeZero端到端回归测试？",
    answer:
      "步骤24 复杂函数的求导沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“多输入多输出梯度按位置配对，同一变量的多路径贡献必须累加；函数按generation逆序，图释放与模式切换不改变数值语义。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["可变长参数", "generation", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-25-graphviz-one-1",
    chapter: "dl2-step-25-graphviz-one",
    level: 1,
    question: "如何用最小对象图解释步骤25 计算图的可视化（1）的核心机制？",
    answer:
      "步骤25 计算图的可视化（1）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DOT语言", "梯度下降", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-25-graphviz-one-2",
    chapter: "dl2-step-25-graphviz-one",
    level: 1,
    question:
      "在步骤25 计算图的可视化（1）中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤25 计算图的可视化（1）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["泰勒展开", "牛顿法", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-25-graphviz-one-3",
    chapter: "dl2-step-25-graphviz-one",
    level: 2,
    question:
      "如何在步骤25 计算图的可视化（1）中手算并验证梯度下降的forward与backward？",
    answer:
      "步骤25 计算图的可视化（1）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度下降", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-25-graphviz-one-4",
    chapter: "dl2-step-25-graphviz-one",
    level: 2,
    question:
      "怎样为步骤25 计算图的可视化（1）构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤25 计算图的可视化（1）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["牛顿法", "DOT语言", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-25-graphviz-one-5",
    chapter: "dl2-step-25-graphviz-one",
    level: 3,
    question:
      "如何在步骤25 计算图的可视化（1）中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤25 计算图的可视化（1）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "泰勒展开", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-25-graphviz-one-6",
    chapter: "dl2-step-25-graphviz-one",
    level: 3,
    question: "怎样把步骤25 计算图的可视化（1）接入DeZero端到端回归测试？",
    answer:
      "步骤25 计算图的可视化（1）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DOT语言", "梯度下降", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-26-graphviz-two-1",
    chapter: "dl2-step-26-graphviz-two",
    level: 1,
    question: "如何用最小对象图解释步骤26 计算图的可视化（2）的核心机制？",
    answer:
      "步骤26 计算图的可视化（2）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DOT语言", "梯度下降", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-26-graphviz-two-2",
    chapter: "dl2-step-26-graphviz-two",
    level: 1,
    question:
      "在步骤26 计算图的可视化（2）中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤26 计算图的可视化（2）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["泰勒展开", "牛顿法", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-26-graphviz-two-3",
    chapter: "dl2-step-26-graphviz-two",
    level: 2,
    question:
      "如何在步骤26 计算图的可视化（2）中手算并验证梯度下降的forward与backward？",
    answer:
      "步骤26 计算图的可视化（2）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度下降", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-26-graphviz-two-4",
    chapter: "dl2-step-26-graphviz-two",
    level: 2,
    question:
      "怎样为步骤26 计算图的可视化（2）构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤26 计算图的可视化（2）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["牛顿法", "DOT语言", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-26-graphviz-two-5",
    chapter: "dl2-step-26-graphviz-two",
    level: 3,
    question:
      "如何在步骤26 计算图的可视化（2）中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤26 计算图的可视化（2）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "泰勒展开", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-26-graphviz-two-6",
    chapter: "dl2-step-26-graphviz-two",
    level: 3,
    question: "怎样把步骤26 计算图的可视化（2）接入DeZero端到端回归测试？",
    answer:
      "步骤26 计算图的可视化（2）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DOT语言", "梯度下降", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-27-taylor-derivative-1",
    chapter: "dl2-step-27-taylor-derivative",
    level: 1,
    question: "如何用最小对象图解释步骤27 泰勒展开的导数的核心机制？",
    answer:
      "步骤27 泰勒展开的导数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DOT语言", "梯度下降", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-27-taylor-derivative-2",
    chapter: "dl2-step-27-taylor-derivative",
    level: 1,
    question: "在步骤27 泰勒展开的导数中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤27 泰勒展开的导数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["泰勒展开", "牛顿法", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-27-taylor-derivative-3",
    chapter: "dl2-step-27-taylor-derivative",
    level: 2,
    question:
      "如何在步骤27 泰勒展开的导数中手算并验证梯度下降的forward与backward？",
    answer:
      "步骤27 泰勒展开的导数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度下降", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-27-taylor-derivative-4",
    chapter: "dl2-step-27-taylor-derivative",
    level: 2,
    question:
      "怎样为步骤27 泰勒展开的导数构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤27 泰勒展开的导数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["牛顿法", "DOT语言", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-27-taylor-derivative-5",
    chapter: "dl2-step-27-taylor-derivative",
    level: 3,
    question:
      "如何在步骤27 泰勒展开的导数中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤27 泰勒展开的导数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "泰勒展开", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-27-taylor-derivative-6",
    chapter: "dl2-step-27-taylor-derivative",
    level: 3,
    question: "怎样把步骤27 泰勒展开的导数接入DeZero端到端回归测试？",
    answer:
      "步骤27 泰勒展开的导数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DOT语言", "梯度下降", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-28-function-optimization-1",
    chapter: "dl2-step-28-function-optimization",
    level: 1,
    question: "如何用最小对象图解释步骤28 函数优化的核心机制？",
    answer:
      "步骤28 函数优化沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DOT语言", "梯度下降", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-28-function-optimization-2",
    chapter: "dl2-step-28-function-optimization",
    level: 1,
    question: "在步骤28 函数优化中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤28 函数优化沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["泰勒展开", "牛顿法", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-28-function-optimization-3",
    chapter: "dl2-step-28-function-optimization",
    level: 2,
    question: "如何在步骤28 函数优化中手算并验证梯度下降的forward与backward？",
    answer:
      "步骤28 函数优化沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度下降", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-28-function-optimization-4",
    chapter: "dl2-step-28-function-optimization",
    level: 2,
    question: "怎样为步骤28 函数优化构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤28 函数优化沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["牛顿法", "DOT语言", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-28-function-optimization-5",
    chapter: "dl2-step-28-function-optimization",
    level: 3,
    question:
      "如何在步骤28 函数优化中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤28 函数优化沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "泰勒展开", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-28-function-optimization-6",
    chapter: "dl2-step-28-function-optimization",
    level: 3,
    question: "怎样把步骤28 函数优化接入DeZero端到端回归测试？",
    answer:
      "步骤28 函数优化沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DOT语言", "梯度下降", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-29-manual-newton-1",
    chapter: "dl2-step-29-manual-newton",
    level: 1,
    question:
      "如何用最小对象图解释步骤29 使用牛顿法进行优化（手动计算）的核心机制？",
    answer:
      "步骤29 使用牛顿法进行优化（手动计算）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DOT语言", "梯度下降", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-29-manual-newton-2",
    chapter: "dl2-step-29-manual-newton",
    level: 1,
    question:
      "在步骤29 使用牛顿法进行优化（手动计算）中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤29 使用牛顿法进行优化（手动计算）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["泰勒展开", "牛顿法", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-29-manual-newton-3",
    chapter: "dl2-step-29-manual-newton",
    level: 2,
    question:
      "如何在步骤29 使用牛顿法进行优化（手动计算）中手算并验证梯度下降的forward与backward？",
    answer:
      "步骤29 使用牛顿法进行优化（手动计算）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度下降", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-29-manual-newton-4",
    chapter: "dl2-step-29-manual-newton",
    level: 2,
    question:
      "怎样为步骤29 使用牛顿法进行优化（手动计算）构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤29 使用牛顿法进行优化（手动计算）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["牛顿法", "DOT语言", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-29-manual-newton-5",
    chapter: "dl2-step-29-manual-newton",
    level: 3,
    question:
      "如何在步骤29 使用牛顿法进行优化（手动计算）中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤29 使用牛顿法进行优化（手动计算）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "泰勒展开", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-29-manual-newton-6",
    chapter: "dl2-step-29-manual-newton",
    level: 3,
    question:
      "怎样把步骤29 使用牛顿法进行优化（手动计算）接入DeZero端到端回归测试？",
    answer:
      "步骤29 使用牛顿法进行优化（手动计算）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DOT语言", "梯度下降", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-30-higher-order-preparation-1",
    chapter: "dl2-step-30-higher-order-preparation",
    level: 1,
    question: "如何用最小对象图解释步骤30 高阶导数（准备篇）的核心机制？",
    answer:
      "步骤30 高阶导数（准备篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DOT语言", "梯度下降", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-30-higher-order-preparation-2",
    chapter: "dl2-step-30-higher-order-preparation",
    level: 1,
    question:
      "在步骤30 高阶导数（准备篇）中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤30 高阶导数（准备篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["泰勒展开", "牛顿法", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-30-higher-order-preparation-3",
    chapter: "dl2-step-30-higher-order-preparation",
    level: 2,
    question:
      "如何在步骤30 高阶导数（准备篇）中手算并验证梯度下降的forward与backward？",
    answer:
      "步骤30 高阶导数（准备篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度下降", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-30-higher-order-preparation-4",
    chapter: "dl2-step-30-higher-order-preparation",
    level: 2,
    question:
      "怎样为步骤30 高阶导数（准备篇）构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤30 高阶导数（准备篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["牛顿法", "DOT语言", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-30-higher-order-preparation-5",
    chapter: "dl2-step-30-higher-order-preparation",
    level: 3,
    question:
      "如何在步骤30 高阶导数（准备篇）中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤30 高阶导数（准备篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "泰勒展开", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-30-higher-order-preparation-6",
    chapter: "dl2-step-30-higher-order-preparation",
    level: 3,
    question: "怎样把步骤30 高阶导数（准备篇）接入DeZero端到端回归测试？",
    answer:
      "步骤30 高阶导数（准备篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DOT语言", "梯度下降", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-31-higher-order-theory-1",
    chapter: "dl2-step-31-higher-order-theory",
    level: 1,
    question: "如何用最小对象图解释步骤31 高阶导数（理论篇）的核心机制？",
    answer:
      "步骤31 高阶导数（理论篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DOT语言", "梯度下降", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-31-higher-order-theory-2",
    chapter: "dl2-step-31-higher-order-theory",
    level: 1,
    question:
      "在步骤31 高阶导数（理论篇）中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤31 高阶导数（理论篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["泰勒展开", "牛顿法", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-31-higher-order-theory-3",
    chapter: "dl2-step-31-higher-order-theory",
    level: 2,
    question:
      "如何在步骤31 高阶导数（理论篇）中手算并验证梯度下降的forward与backward？",
    answer:
      "步骤31 高阶导数（理论篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度下降", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-31-higher-order-theory-4",
    chapter: "dl2-step-31-higher-order-theory",
    level: 2,
    question:
      "怎样为步骤31 高阶导数（理论篇）构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤31 高阶导数（理论篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["牛顿法", "DOT语言", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-31-higher-order-theory-5",
    chapter: "dl2-step-31-higher-order-theory",
    level: 3,
    question:
      "如何在步骤31 高阶导数（理论篇）中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤31 高阶导数（理论篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "泰勒展开", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-31-higher-order-theory-6",
    chapter: "dl2-step-31-higher-order-theory",
    level: 3,
    question: "怎样把步骤31 高阶导数（理论篇）接入DeZero端到端回归测试？",
    answer:
      "步骤31 高阶导数（理论篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DOT语言", "梯度下降", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-32-higher-order-implementation-1",
    chapter: "dl2-step-32-higher-order-implementation",
    level: 1,
    question: "如何用最小对象图解释步骤32 高阶导数（实现篇）的核心机制？",
    answer:
      "步骤32 高阶导数（实现篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DOT语言", "梯度下降", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-32-higher-order-implementation-2",
    chapter: "dl2-step-32-higher-order-implementation",
    level: 1,
    question:
      "在步骤32 高阶导数（实现篇）中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤32 高阶导数（实现篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["泰勒展开", "牛顿法", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-32-higher-order-implementation-3",
    chapter: "dl2-step-32-higher-order-implementation",
    level: 2,
    question:
      "如何在步骤32 高阶导数（实现篇）中手算并验证梯度下降的forward与backward？",
    answer:
      "步骤32 高阶导数（实现篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度下降", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-32-higher-order-implementation-4",
    chapter: "dl2-step-32-higher-order-implementation",
    level: 2,
    question:
      "怎样为步骤32 高阶导数（实现篇）构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤32 高阶导数（实现篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["牛顿法", "DOT语言", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-32-higher-order-implementation-5",
    chapter: "dl2-step-32-higher-order-implementation",
    level: 3,
    question:
      "如何在步骤32 高阶导数（实现篇）中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤32 高阶导数（实现篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "泰勒展开", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-32-higher-order-implementation-6",
    chapter: "dl2-step-32-higher-order-implementation",
    level: 3,
    question: "怎样把步骤32 高阶导数（实现篇）接入DeZero端到端回归测试？",
    answer:
      "步骤32 高阶导数（实现篇）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DOT语言", "梯度下降", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-33-automatic-newton-1",
    chapter: "dl2-step-33-automatic-newton",
    level: 1,
    question:
      "如何用最小对象图解释步骤33 使用牛顿法进行优化（自动计算）的核心机制？",
    answer:
      "步骤33 使用牛顿法进行优化（自动计算）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DOT语言", "梯度下降", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-33-automatic-newton-2",
    chapter: "dl2-step-33-automatic-newton",
    level: 1,
    question:
      "在步骤33 使用牛顿法进行优化（自动计算）中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤33 使用牛顿法进行优化（自动计算）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["泰勒展开", "牛顿法", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-33-automatic-newton-3",
    chapter: "dl2-step-33-automatic-newton",
    level: 2,
    question:
      "如何在步骤33 使用牛顿法进行优化（自动计算）中手算并验证梯度下降的forward与backward？",
    answer:
      "步骤33 使用牛顿法进行优化（自动计算）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度下降", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-33-automatic-newton-4",
    chapter: "dl2-step-33-automatic-newton",
    level: 2,
    question:
      "怎样为步骤33 使用牛顿法进行优化（自动计算）构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤33 使用牛顿法进行优化（自动计算）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["牛顿法", "DOT语言", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-33-automatic-newton-5",
    chapter: "dl2-step-33-automatic-newton",
    level: 3,
    question:
      "如何在步骤33 使用牛顿法进行优化（自动计算）中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤33 使用牛顿法进行优化（自动计算）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "泰勒展开", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-33-automatic-newton-6",
    chapter: "dl2-step-33-automatic-newton",
    level: 3,
    question:
      "怎样把步骤33 使用牛顿法进行优化（自动计算）接入DeZero端到端回归测试？",
    answer:
      "步骤33 使用牛顿法进行优化（自动计算）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DOT语言", "梯度下降", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-34-sin-higher-order-1",
    chapter: "dl2-step-34-sin-higher-order",
    level: 1,
    question: "如何用最小对象图解释步骤34 sin函数的高阶导数的核心机制？",
    answer:
      "步骤34 sin函数的高阶导数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DOT语言", "梯度下降", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-34-sin-higher-order-2",
    chapter: "dl2-step-34-sin-higher-order",
    level: 1,
    question:
      "在步骤34 sin函数的高阶导数中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤34 sin函数的高阶导数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["泰勒展开", "牛顿法", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-34-sin-higher-order-3",
    chapter: "dl2-step-34-sin-higher-order",
    level: 2,
    question:
      "如何在步骤34 sin函数的高阶导数中手算并验证梯度下降的forward与backward？",
    answer:
      "步骤34 sin函数的高阶导数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度下降", "sin", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-34-sin-higher-order-4",
    chapter: "dl2-step-34-sin-higher-order",
    level: 2,
    question:
      "怎样为步骤34 sin函数的高阶导数构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤34 sin函数的高阶导数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["牛顿法", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-34-sin-higher-order-5",
    chapter: "dl2-step-34-sin-higher-order",
    level: 3,
    question:
      "如何在步骤34 sin函数的高阶导数中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤34 sin函数的高阶导数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["sin", "DOT语言", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-34-sin-higher-order-6",
    chapter: "dl2-step-34-sin-higher-order",
    level: 3,
    question: "怎样把步骤34 sin函数的高阶导数接入DeZero端到端回归测试？",
    answer:
      "步骤34 sin函数的高阶导数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "泰勒展开", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-35-higher-order-graph-1",
    chapter: "dl2-step-35-higher-order-graph",
    level: 1,
    question: "如何用最小对象图解释步骤35 高阶导数的计算图的核心机制？",
    answer:
      "步骤35 高阶导数的计算图沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DOT语言", "梯度下降", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-35-higher-order-graph-2",
    chapter: "dl2-step-35-higher-order-graph",
    level: 1,
    question: "在步骤35 高阶导数的计算图中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤35 高阶导数的计算图沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["泰勒展开", "牛顿法", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-35-higher-order-graph-3",
    chapter: "dl2-step-35-higher-order-graph",
    level: 2,
    question:
      "如何在步骤35 高阶导数的计算图中手算并验证梯度下降的forward与backward？",
    answer:
      "步骤35 高阶导数的计算图沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度下降", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-35-higher-order-graph-4",
    chapter: "dl2-step-35-higher-order-graph",
    level: 2,
    question:
      "怎样为步骤35 高阶导数的计算图构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤35 高阶导数的计算图沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["牛顿法", "DOT语言", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-35-higher-order-graph-5",
    chapter: "dl2-step-35-higher-order-graph",
    level: 3,
    question:
      "如何在步骤35 高阶导数的计算图中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤35 高阶导数的计算图沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "泰勒展开", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-35-higher-order-graph-6",
    chapter: "dl2-step-35-higher-order-graph",
    level: 3,
    question: "怎样把步骤35 高阶导数的计算图接入DeZero端到端回归测试？",
    answer:
      "步骤35 高阶导数的计算图沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DOT语言", "梯度下降", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-36-double-backprop-1",
    chapter: "dl2-step-36-double-backprop",
    level: 1,
    question: "如何用最小对象图解释步骤36 DeZero的其他用途的核心机制？",
    answer:
      "步骤36 DeZero的其他用途沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DOT语言", "梯度下降", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-36-double-backprop-2",
    chapter: "dl2-step-36-double-backprop",
    level: 1,
    question: "在步骤36 DeZero的其他用途中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤36 DeZero的其他用途沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["泰勒展开", "牛顿法", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-36-double-backprop-3",
    chapter: "dl2-step-36-double-backprop",
    level: 2,
    question:
      "如何在步骤36 DeZero的其他用途中手算并验证梯度下降的forward与backward？",
    answer:
      "步骤36 DeZero的其他用途沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度下降", "DeZero", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-36-double-backprop-4",
    chapter: "dl2-step-36-double-backprop",
    level: 2,
    question:
      "怎样为步骤36 DeZero的其他用途构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤36 DeZero的其他用途沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["牛顿法", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-36-double-backprop-5",
    chapter: "dl2-step-36-double-backprop",
    level: 3,
    question:
      "如何在步骤36 DeZero的其他用途中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤36 DeZero的其他用途沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DeZero", "DOT语言", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-36-double-backprop-6",
    chapter: "dl2-step-36-double-backprop",
    level: 3,
    question: "怎样把步骤36 DeZero的其他用途接入DeZero端到端回归测试？",
    answer:
      "步骤36 DeZero的其他用途沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“一次反向传播产生的梯度在create_graph模式下仍是Variable并保留creator，才能继续反向得到高阶导数。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "泰勒展开", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-37-tensor-1",
    chapter: "dl2-step-37-tensor",
    level: 1,
    question: "如何用最小对象图解释步骤37 处理张量的核心机制？",
    answer:
      "步骤37 处理张量沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-37-tensor-2",
    chapter: "dl2-step-37-tensor",
    level: 1,
    question: "在步骤37 处理张量中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤37 处理张量沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["shape", "Parameter", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-37-tensor-3",
    chapter: "dl2-step-37-tensor",
    level: 2,
    question: "如何在步骤37 处理张量中手算并验证广播的forward与backward？",
    answer:
      "步骤37 处理张量沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["广播", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-37-tensor-4",
    chapter: "dl2-step-37-tensor",
    level: 2,
    question: "怎样为步骤37 处理张量构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤37 处理张量沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Parameter", "张量", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-37-tensor-5",
    chapter: "dl2-step-37-tensor",
    level: 3,
    question:
      "如何在步骤37 处理张量中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤37 处理张量沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "shape", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-37-tensor-6",
    chapter: "dl2-step-37-tensor",
    level: 3,
    question: "怎样把步骤37 处理张量接入DeZero端到端回归测试？",
    answer:
      "步骤37 处理张量沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-38-reshape-transpose-1",
    chapter: "dl2-step-38-reshape-transpose",
    level: 1,
    question: "如何用最小对象图解释步骤38 改变形状的函数的核心机制？",
    answer:
      "步骤38 改变形状的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-38-reshape-transpose-2",
    chapter: "dl2-step-38-reshape-transpose",
    level: 1,
    question: "在步骤38 改变形状的函数中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤38 改变形状的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["shape", "Parameter", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-38-reshape-transpose-3",
    chapter: "dl2-step-38-reshape-transpose",
    level: 2,
    question:
      "如何在步骤38 改变形状的函数中手算并验证广播的forward与backward？",
    answer:
      "步骤38 改变形状的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["广播", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-38-reshape-transpose-4",
    chapter: "dl2-step-38-reshape-transpose",
    level: 2,
    question:
      "怎样为步骤38 改变形状的函数构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤38 改变形状的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Parameter", "张量", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-38-reshape-transpose-5",
    chapter: "dl2-step-38-reshape-transpose",
    level: 3,
    question:
      "如何在步骤38 改变形状的函数中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤38 改变形状的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "shape", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-38-reshape-transpose-6",
    chapter: "dl2-step-38-reshape-transpose",
    level: 3,
    question: "怎样把步骤38 改变形状的函数接入DeZero端到端回归测试？",
    answer:
      "步骤38 改变形状的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-39-sum-1",
    chapter: "dl2-step-39-sum",
    level: 1,
    question: "如何用最小对象图解释步骤39 求和的函数的核心机制？",
    answer:
      "步骤39 求和的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-39-sum-2",
    chapter: "dl2-step-39-sum",
    level: 1,
    question: "在步骤39 求和的函数中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤39 求和的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["shape", "Parameter", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-39-sum-3",
    chapter: "dl2-step-39-sum",
    level: 2,
    question: "如何在步骤39 求和的函数中手算并验证广播的forward与backward？",
    answer:
      "步骤39 求和的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["广播", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-39-sum-4",
    chapter: "dl2-step-39-sum",
    level: 2,
    question:
      "怎样为步骤39 求和的函数构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤39 求和的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Parameter", "张量", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-39-sum-5",
    chapter: "dl2-step-39-sum",
    level: 3,
    question:
      "如何在步骤39 求和的函数中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤39 求和的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "shape", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-39-sum-6",
    chapter: "dl2-step-39-sum",
    level: 3,
    question: "怎样把步骤39 求和的函数接入DeZero端到端回归测试？",
    answer:
      "步骤39 求和的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-40-broadcast-1",
    chapter: "dl2-step-40-broadcast",
    level: 1,
    question: "如何用最小对象图解释步骤40 进行广播的函数的核心机制？",
    answer:
      "步骤40 进行广播的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-40-broadcast-2",
    chapter: "dl2-step-40-broadcast",
    level: 1,
    question: "在步骤40 进行广播的函数中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤40 进行广播的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["shape", "Parameter", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-40-broadcast-3",
    chapter: "dl2-step-40-broadcast",
    level: 2,
    question:
      "如何在步骤40 进行广播的函数中手算并验证广播的forward与backward？",
    answer:
      "步骤40 进行广播的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["广播", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-40-broadcast-4",
    chapter: "dl2-step-40-broadcast",
    level: 2,
    question:
      "怎样为步骤40 进行广播的函数构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤40 进行广播的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Parameter", "张量", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-40-broadcast-5",
    chapter: "dl2-step-40-broadcast",
    level: 3,
    question:
      "如何在步骤40 进行广播的函数中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤40 进行广播的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "shape", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-40-broadcast-6",
    chapter: "dl2-step-40-broadcast",
    level: 3,
    question: "怎样把步骤40 进行广播的函数接入DeZero端到端回归测试？",
    answer:
      "步骤40 进行广播的函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-41-matrix-product-1",
    chapter: "dl2-step-41-matrix-product",
    level: 1,
    question: "如何用最小对象图解释步骤41 矩阵的乘积的核心机制？",
    answer:
      "步骤41 矩阵的乘积沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-41-matrix-product-2",
    chapter: "dl2-step-41-matrix-product",
    level: 1,
    question: "在步骤41 矩阵的乘积中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤41 矩阵的乘积沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["shape", "Parameter", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-41-matrix-product-3",
    chapter: "dl2-step-41-matrix-product",
    level: 2,
    question: "如何在步骤41 矩阵的乘积中手算并验证广播的forward与backward？",
    answer:
      "步骤41 矩阵的乘积沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["广播", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-41-matrix-product-4",
    chapter: "dl2-step-41-matrix-product",
    level: 2,
    question:
      "怎样为步骤41 矩阵的乘积构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤41 矩阵的乘积沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Parameter", "张量", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-41-matrix-product-5",
    chapter: "dl2-step-41-matrix-product",
    level: 3,
    question:
      "如何在步骤41 矩阵的乘积中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤41 矩阵的乘积沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "shape", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-41-matrix-product-6",
    chapter: "dl2-step-41-matrix-product",
    level: 3,
    question: "怎样把步骤41 矩阵的乘积接入DeZero端到端回归测试？",
    answer:
      "步骤41 矩阵的乘积沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-42-linear-regression-1",
    chapter: "dl2-step-42-linear-regression",
    level: 1,
    question: "如何用最小对象图解释步骤42 线性回归的核心机制？",
    answer:
      "步骤42 线性回归沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-42-linear-regression-2",
    chapter: "dl2-step-42-linear-regression",
    level: 1,
    question: "在步骤42 线性回归中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤42 线性回归沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["shape", "Parameter", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-42-linear-regression-3",
    chapter: "dl2-step-42-linear-regression",
    level: 2,
    question: "如何在步骤42 线性回归中手算并验证广播的forward与backward？",
    answer:
      "步骤42 线性回归沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["广播", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-42-linear-regression-4",
    chapter: "dl2-step-42-linear-regression",
    level: 2,
    question: "怎样为步骤42 线性回归构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤42 线性回归沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Parameter", "张量", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-42-linear-regression-5",
    chapter: "dl2-step-42-linear-regression",
    level: 3,
    question:
      "如何在步骤42 线性回归中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤42 线性回归沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "shape", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-42-linear-regression-6",
    chapter: "dl2-step-42-linear-regression",
    level: 3,
    question: "怎样把步骤42 线性回归接入DeZero端到端回归测试？",
    answer:
      "步骤42 线性回归沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-43-neural-network-1",
    chapter: "dl2-step-43-neural-network",
    level: 1,
    question: "如何用最小对象图解释步骤43 神经网络的核心机制？",
    answer:
      "步骤43 神经网络沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-43-neural-network-2",
    chapter: "dl2-step-43-neural-network",
    level: 1,
    question: "在步骤43 神经网络中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤43 神经网络沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["shape", "Parameter", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-43-neural-network-3",
    chapter: "dl2-step-43-neural-network",
    level: 2,
    question: "如何在步骤43 神经网络中手算并验证广播的forward与backward？",
    answer:
      "步骤43 神经网络沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["广播", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-43-neural-network-4",
    chapter: "dl2-step-43-neural-network",
    level: 2,
    question: "怎样为步骤43 神经网络构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤43 神经网络沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Parameter", "张量", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-43-neural-network-5",
    chapter: "dl2-step-43-neural-network",
    level: 3,
    question:
      "如何在步骤43 神经网络中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤43 神经网络沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "shape", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-43-neural-network-6",
    chapter: "dl2-step-43-neural-network",
    level: 3,
    question: "怎样把步骤43 神经网络接入DeZero端到端回归测试？",
    answer:
      "步骤43 神经网络沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-44-parameter-layer-1",
    chapter: "dl2-step-44-parameter-layer",
    level: 1,
    question: "如何用最小对象图解释步骤44 汇总参数的层的核心机制？",
    answer:
      "步骤44 汇总参数的层沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-44-parameter-layer-2",
    chapter: "dl2-step-44-parameter-layer",
    level: 1,
    question: "在步骤44 汇总参数的层中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤44 汇总参数的层沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["shape", "Parameter", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-44-parameter-layer-3",
    chapter: "dl2-step-44-parameter-layer",
    level: 2,
    question: "如何在步骤44 汇总参数的层中手算并验证广播的forward与backward？",
    answer:
      "步骤44 汇总参数的层沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["广播", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-44-parameter-layer-4",
    chapter: "dl2-step-44-parameter-layer",
    level: 2,
    question:
      "怎样为步骤44 汇总参数的层构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤44 汇总参数的层沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Parameter", "张量", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-44-parameter-layer-5",
    chapter: "dl2-step-44-parameter-layer",
    level: 3,
    question:
      "如何在步骤44 汇总参数的层中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤44 汇总参数的层沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "shape", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-44-parameter-layer-6",
    chapter: "dl2-step-44-parameter-layer",
    level: 3,
    question: "怎样把步骤44 汇总参数的层接入DeZero端到端回归测试？",
    answer:
      "步骤44 汇总参数的层沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-45-model-layer-1",
    chapter: "dl2-step-45-model-layer",
    level: 1,
    question: "如何用最小对象图解释步骤45 汇总层的层的核心机制？",
    answer:
      "步骤45 汇总层的层沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-45-model-layer-2",
    chapter: "dl2-step-45-model-layer",
    level: 1,
    question: "在步骤45 汇总层的层中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤45 汇总层的层沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["shape", "Parameter", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-45-model-layer-3",
    chapter: "dl2-step-45-model-layer",
    level: 2,
    question: "如何在步骤45 汇总层的层中手算并验证广播的forward与backward？",
    answer:
      "步骤45 汇总层的层沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["广播", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-45-model-layer-4",
    chapter: "dl2-step-45-model-layer",
    level: 2,
    question:
      "怎样为步骤45 汇总层的层构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤45 汇总层的层沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Parameter", "张量", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-45-model-layer-5",
    chapter: "dl2-step-45-model-layer",
    level: 3,
    question:
      "如何在步骤45 汇总层的层中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤45 汇总层的层沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "shape", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-45-model-layer-6",
    chapter: "dl2-step-45-model-layer",
    level: 3,
    question: "怎样把步骤45 汇总层的层接入DeZero端到端回归测试？",
    answer:
      "步骤45 汇总层的层沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-46-optimizer-1",
    chapter: "dl2-step-46-optimizer",
    level: 1,
    question: "如何用最小对象图解释步骤46 通过Optimizer更新参数的核心机制？",
    answer:
      "步骤46 通过Optimizer更新参数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-46-optimizer-2",
    chapter: "dl2-step-46-optimizer",
    level: 1,
    question:
      "在步骤46 通过Optimizer更新参数中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤46 通过Optimizer更新参数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["shape", "Parameter", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-46-optimizer-3",
    chapter: "dl2-step-46-optimizer",
    level: 2,
    question:
      "如何在步骤46 通过Optimizer更新参数中手算并验证广播的forward与backward？",
    answer:
      "步骤46 通过Optimizer更新参数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["广播", "Optimizer", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-46-optimizer-4",
    chapter: "dl2-step-46-optimizer",
    level: 2,
    question:
      "怎样为步骤46 通过Optimizer更新参数构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤46 通过Optimizer更新参数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Parameter", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-46-optimizer-5",
    chapter: "dl2-step-46-optimizer",
    level: 3,
    question:
      "如何在步骤46 通过Optimizer更新参数中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤46 通过Optimizer更新参数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Optimizer", "张量", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-46-optimizer-6",
    chapter: "dl2-step-46-optimizer",
    level: 3,
    question: "怎样把步骤46 通过Optimizer更新参数接入DeZero端到端回归测试？",
    answer:
      "步骤46 通过Optimizer更新参数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "shape", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-47-softmax-cross-entropy-1",
    chapter: "dl2-step-47-softmax-cross-entropy",
    level: 1,
    question: "如何用最小对象图解释步骤47 softmax函数和交叉熵误差的核心机制？",
    answer:
      "步骤47 softmax函数和交叉熵误差沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-47-softmax-cross-entropy-2",
    chapter: "dl2-step-47-softmax-cross-entropy",
    level: 1,
    question:
      "在步骤47 softmax函数和交叉熵误差中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤47 softmax函数和交叉熵误差沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["shape", "Parameter", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-47-softmax-cross-entropy-3",
    chapter: "dl2-step-47-softmax-cross-entropy",
    level: 2,
    question:
      "如何在步骤47 softmax函数和交叉熵误差中手算并验证广播的forward与backward？",
    answer:
      "步骤47 softmax函数和交叉熵误差沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["广播", "softmax", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-47-softmax-cross-entropy-4",
    chapter: "dl2-step-47-softmax-cross-entropy",
    level: 2,
    question:
      "怎样为步骤47 softmax函数和交叉熵误差构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤47 softmax函数和交叉熵误差沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Parameter", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-47-softmax-cross-entropy-5",
    chapter: "dl2-step-47-softmax-cross-entropy",
    level: 3,
    question:
      "如何在步骤47 softmax函数和交叉熵误差中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤47 softmax函数和交叉熵误差沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["softmax", "张量", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-47-softmax-cross-entropy-6",
    chapter: "dl2-step-47-softmax-cross-entropy",
    level: 3,
    question: "怎样把步骤47 softmax函数和交叉熵误差接入DeZero端到端回归测试？",
    answer:
      "步骤47 softmax函数和交叉熵误差沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "shape", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-48-multiclass-1",
    chapter: "dl2-step-48-multiclass",
    level: 1,
    question: "如何用最小对象图解释步骤48 多分类的核心机制？",
    answer:
      "步骤48 多分类沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-48-multiclass-2",
    chapter: "dl2-step-48-multiclass",
    level: 1,
    question: "在步骤48 多分类中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤48 多分类沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["shape", "Parameter", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-48-multiclass-3",
    chapter: "dl2-step-48-multiclass",
    level: 2,
    question: "如何在步骤48 多分类中手算并验证广播的forward与backward？",
    answer:
      "步骤48 多分类沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["广播", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-48-multiclass-4",
    chapter: "dl2-step-48-multiclass",
    level: 2,
    question: "怎样为步骤48 多分类构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤48 多分类沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Parameter", "张量", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-48-multiclass-5",
    chapter: "dl2-step-48-multiclass",
    level: 3,
    question:
      "如何在步骤48 多分类中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤48 多分类沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "shape", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-48-multiclass-6",
    chapter: "dl2-step-48-multiclass",
    level: 3,
    question: "怎样把步骤48 多分类接入DeZero端到端回归测试？",
    answer:
      "步骤48 多分类沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-49-dataset-preprocess-1",
    chapter: "dl2-step-49-dataset-preprocess",
    level: 1,
    question: "如何用最小对象图解释步骤49 Dataset类和预处理的核心机制？",
    answer:
      "步骤49 Dataset类和预处理沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-49-dataset-preprocess-2",
    chapter: "dl2-step-49-dataset-preprocess",
    level: 1,
    question:
      "在步骤49 Dataset类和预处理中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤49 Dataset类和预处理沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["shape", "Parameter", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-49-dataset-preprocess-3",
    chapter: "dl2-step-49-dataset-preprocess",
    level: 2,
    question:
      "如何在步骤49 Dataset类和预处理中手算并验证广播的forward与backward？",
    answer:
      "步骤49 Dataset类和预处理沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["广播", "Dataset", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-49-dataset-preprocess-4",
    chapter: "dl2-step-49-dataset-preprocess",
    level: 2,
    question:
      "怎样为步骤49 Dataset类和预处理构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤49 Dataset类和预处理沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Parameter", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-49-dataset-preprocess-5",
    chapter: "dl2-step-49-dataset-preprocess",
    level: 3,
    question:
      "如何在步骤49 Dataset类和预处理中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤49 Dataset类和预处理沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Dataset", "张量", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-49-dataset-preprocess-6",
    chapter: "dl2-step-49-dataset-preprocess",
    level: 3,
    question: "怎样把步骤49 Dataset类和预处理接入DeZero端到端回归测试？",
    answer:
      "步骤49 Dataset类和预处理沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "shape", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-50-dataloader-1",
    chapter: "dl2-step-50-dataloader",
    level: 1,
    question:
      "如何用最小对象图解释步骤50 用于取出小批量数据的DataLoader的核心机制？",
    answer:
      "步骤50 用于取出小批量数据的DataLoader沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-50-dataloader-2",
    chapter: "dl2-step-50-dataloader",
    level: 1,
    question:
      "在步骤50 用于取出小批量数据的DataLoader中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤50 用于取出小批量数据的DataLoader沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["shape", "Parameter", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-50-dataloader-3",
    chapter: "dl2-step-50-dataloader",
    level: 2,
    question:
      "如何在步骤50 用于取出小批量数据的DataLoader中手算并验证广播的forward与backward？",
    answer:
      "步骤50 用于取出小批量数据的DataLoader沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["广播", "DataLoader", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-50-dataloader-4",
    chapter: "dl2-step-50-dataloader",
    level: 2,
    question:
      "怎样为步骤50 用于取出小批量数据的DataLoader构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤50 用于取出小批量数据的DataLoader沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Parameter", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-50-dataloader-5",
    chapter: "dl2-step-50-dataloader",
    level: 3,
    question:
      "如何在步骤50 用于取出小批量数据的DataLoader中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤50 用于取出小批量数据的DataLoader沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["DataLoader", "张量", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-50-dataloader-6",
    chapter: "dl2-step-50-dataloader",
    level: 3,
    question:
      "怎样把步骤50 用于取出小批量数据的DataLoader接入DeZero端到端回归测试？",
    answer:
      "步骤50 用于取出小批量数据的DataLoader沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "shape", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-51-mnist-1",
    chapter: "dl2-step-51-mnist",
    level: 1,
    question: "如何用最小对象图解释步骤51 MNIST的训练的核心机制？",
    answer:
      "步骤51 MNIST的训练沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["张量", "广播", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-51-mnist-2",
    chapter: "dl2-step-51-mnist",
    level: 1,
    question: "在步骤51 MNIST的训练中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤51 MNIST的训练沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["shape", "Parameter", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-51-mnist-3",
    chapter: "dl2-step-51-mnist",
    level: 2,
    question: "如何在步骤51 MNIST的训练中手算并验证广播的forward与backward？",
    answer:
      "步骤51 MNIST的训练沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["广播", "MNIST", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-51-mnist-4",
    chapter: "dl2-step-51-mnist",
    level: 2,
    question:
      "怎样为步骤51 MNIST的训练构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤51 MNIST的训练沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Parameter", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-51-mnist-5",
    chapter: "dl2-step-51-mnist",
    level: 3,
    question:
      "如何在步骤51 MNIST的训练中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤51 MNIST的训练沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["MNIST", "张量", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-51-mnist-6",
    chapter: "dl2-step-51-mnist",
    level: 3,
    question: "怎样把步骤51 MNIST的训练接入DeZero端到端回归测试？",
    answer:
      "步骤51 MNIST的训练沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“张量函数的forward与backward保持shape合同，广播反向用sum_to还原原shape；参数由Layer递归收集并只由Optimizer更新。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "shape", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-52-gpu-1",
    chapter: "dl2-step-52-gpu",
    level: 1,
    question: "如何用最小对象图解释步骤52 支持GPU的核心机制？",
    answer:
      "步骤52 支持GPU沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["CuPy", "序列化", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-52-gpu-2",
    chapter: "dl2-step-52-gpu",
    level: 1,
    question: "在步骤52 支持GPU中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤52 支持GPU沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["设备", "测试模式", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-52-gpu-3",
    chapter: "dl2-step-52-gpu",
    level: 2,
    question: "如何在步骤52 支持GPU中手算并验证序列化的forward与backward？",
    answer:
      "步骤52 支持GPU沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["序列化", "GPU", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-52-gpu-4",
    chapter: "dl2-step-52-gpu",
    level: 2,
    question: "怎样为步骤52 支持GPU构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤52 支持GPU沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["测试模式", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-52-gpu-5",
    chapter: "dl2-step-52-gpu",
    level: 3,
    question:
      "如何在步骤52 支持GPU中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤52 支持GPU沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["GPU", "CuPy", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-52-gpu-6",
    chapter: "dl2-step-52-gpu",
    level: 3,
    question: "怎样把步骤52 支持GPU接入DeZero端到端回归测试？",
    answer:
      "步骤52 支持GPU沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "设备", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-53-save-load-1",
    chapter: "dl2-step-53-save-load",
    level: 1,
    question: "如何用最小对象图解释步骤53 模型的保存和加载的核心机制？",
    answer:
      "步骤53 模型的保存和加载沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["CuPy", "序列化", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-53-save-load-2",
    chapter: "dl2-step-53-save-load",
    level: 1,
    question: "在步骤53 模型的保存和加载中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤53 模型的保存和加载沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["设备", "测试模式", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-53-save-load-3",
    chapter: "dl2-step-53-save-load",
    level: 2,
    question:
      "如何在步骤53 模型的保存和加载中手算并验证序列化的forward与backward？",
    answer:
      "步骤53 模型的保存和加载沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["序列化", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-53-save-load-4",
    chapter: "dl2-step-53-save-load",
    level: 2,
    question:
      "怎样为步骤53 模型的保存和加载构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤53 模型的保存和加载沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["测试模式", "CuPy", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-53-save-load-5",
    chapter: "dl2-step-53-save-load",
    level: 3,
    question:
      "如何在步骤53 模型的保存和加载中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤53 模型的保存和加载沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "设备", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-53-save-load-6",
    chapter: "dl2-step-53-save-load",
    level: 3,
    question: "怎样把步骤53 模型的保存和加载接入DeZero端到端回归测试？",
    answer:
      "步骤53 模型的保存和加载沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["CuPy", "序列化", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-54-dropout-test-mode-1",
    chapter: "dl2-step-54-dropout-test-mode",
    level: 1,
    question: "如何用最小对象图解释步骤54 Dropout和测试模式的核心机制？",
    answer:
      "步骤54 Dropout和测试模式沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["CuPy", "序列化", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-54-dropout-test-mode-2",
    chapter: "dl2-step-54-dropout-test-mode",
    level: 1,
    question:
      "在步骤54 Dropout和测试模式中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤54 Dropout和测试模式沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["设备", "测试模式", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-54-dropout-test-mode-3",
    chapter: "dl2-step-54-dropout-test-mode",
    level: 2,
    question:
      "如何在步骤54 Dropout和测试模式中手算并验证序列化的forward与backward？",
    answer:
      "步骤54 Dropout和测试模式沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["序列化", "Dropout", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-54-dropout-test-mode-4",
    chapter: "dl2-step-54-dropout-test-mode",
    level: 2,
    question:
      "怎样为步骤54 Dropout和测试模式构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤54 Dropout和测试模式沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["测试模式", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-54-dropout-test-mode-5",
    chapter: "dl2-step-54-dropout-test-mode",
    level: 3,
    question:
      "如何在步骤54 Dropout和测试模式中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤54 Dropout和测试模式沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Dropout", "CuPy", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-54-dropout-test-mode-6",
    chapter: "dl2-step-54-dropout-test-mode",
    level: 3,
    question: "怎样把步骤54 Dropout和测试模式接入DeZero端到端回归测试？",
    answer:
      "步骤54 Dropout和测试模式沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "设备", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-55-cnn-mechanism-one-1",
    chapter: "dl2-step-55-cnn-mechanism-one",
    level: 1,
    question: "如何用最小对象图解释步骤55 CNN的机制（1）的核心机制？",
    answer:
      "步骤55 CNN的机制（1）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["CuPy", "序列化", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-55-cnn-mechanism-one-2",
    chapter: "dl2-step-55-cnn-mechanism-one",
    level: 1,
    question: "在步骤55 CNN的机制（1）中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤55 CNN的机制（1）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["设备", "测试模式", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-55-cnn-mechanism-one-3",
    chapter: "dl2-step-55-cnn-mechanism-one",
    level: 2,
    question:
      "如何在步骤55 CNN的机制（1）中手算并验证序列化的forward与backward？",
    answer:
      "步骤55 CNN的机制（1）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["序列化", "CNN", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-55-cnn-mechanism-one-4",
    chapter: "dl2-step-55-cnn-mechanism-one",
    level: 2,
    question:
      "怎样为步骤55 CNN的机制（1）构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤55 CNN的机制（1）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["测试模式", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-55-cnn-mechanism-one-5",
    chapter: "dl2-step-55-cnn-mechanism-one",
    level: 3,
    question:
      "如何在步骤55 CNN的机制（1）中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤55 CNN的机制（1）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["CNN", "CuPy", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-55-cnn-mechanism-one-6",
    chapter: "dl2-step-55-cnn-mechanism-one",
    level: 3,
    question: "怎样把步骤55 CNN的机制（1）接入DeZero端到端回归测试？",
    answer:
      "步骤55 CNN的机制（1）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "设备", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-56-cnn-mechanism-two-1",
    chapter: "dl2-step-56-cnn-mechanism-two",
    level: 1,
    question: "如何用最小对象图解释步骤56 CNN的机制（2）的核心机制？",
    answer:
      "步骤56 CNN的机制（2）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["CuPy", "序列化", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-56-cnn-mechanism-two-2",
    chapter: "dl2-step-56-cnn-mechanism-two",
    level: 1,
    question: "在步骤56 CNN的机制（2）中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤56 CNN的机制（2）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["设备", "测试模式", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-56-cnn-mechanism-two-3",
    chapter: "dl2-step-56-cnn-mechanism-two",
    level: 2,
    question:
      "如何在步骤56 CNN的机制（2）中手算并验证序列化的forward与backward？",
    answer:
      "步骤56 CNN的机制（2）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["序列化", "CNN", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-56-cnn-mechanism-two-4",
    chapter: "dl2-step-56-cnn-mechanism-two",
    level: 2,
    question:
      "怎样为步骤56 CNN的机制（2）构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤56 CNN的机制（2）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["测试模式", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-56-cnn-mechanism-two-5",
    chapter: "dl2-step-56-cnn-mechanism-two",
    level: 3,
    question:
      "如何在步骤56 CNN的机制（2）中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤56 CNN的机制（2）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["CNN", "CuPy", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-56-cnn-mechanism-two-6",
    chapter: "dl2-step-56-cnn-mechanism-two",
    level: 3,
    question: "怎样把步骤56 CNN的机制（2）接入DeZero端到端回归测试？",
    answer:
      "步骤56 CNN的机制（2）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "设备", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-57-conv2d-pooling-1",
    chapter: "dl2-step-57-conv2d-pooling",
    level: 1,
    question: "如何用最小对象图解释步骤57 conv2d函数和pooling函数的核心机制？",
    answer:
      "步骤57 conv2d函数和pooling函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["CuPy", "序列化", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-57-conv2d-pooling-2",
    chapter: "dl2-step-57-conv2d-pooling",
    level: 1,
    question:
      "在步骤57 conv2d函数和pooling函数中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤57 conv2d函数和pooling函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["设备", "测试模式", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-57-conv2d-pooling-3",
    chapter: "dl2-step-57-conv2d-pooling",
    level: 2,
    question:
      "如何在步骤57 conv2d函数和pooling函数中手算并验证序列化的forward与backward？",
    answer:
      "步骤57 conv2d函数和pooling函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["序列化", "conv2d", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-57-conv2d-pooling-4",
    chapter: "dl2-step-57-conv2d-pooling",
    level: 2,
    question:
      "怎样为步骤57 conv2d函数和pooling函数构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤57 conv2d函数和pooling函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["测试模式", "pooling", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-57-conv2d-pooling-5",
    chapter: "dl2-step-57-conv2d-pooling",
    level: 3,
    question:
      "如何在步骤57 conv2d函数和pooling函数中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤57 conv2d函数和pooling函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["conv2d", "CuPy", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-57-conv2d-pooling-6",
    chapter: "dl2-step-57-conv2d-pooling",
    level: 3,
    question: "怎样把步骤57 conv2d函数和pooling函数接入DeZero端到端回归测试？",
    answer:
      "步骤57 conv2d函数和pooling函数沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["pooling", "设备", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-58-vgg16-1",
    chapter: "dl2-step-58-vgg16",
    level: 1,
    question: "如何用最小对象图解释步骤58 具有代表性的CNN（VGG16）的核心机制？",
    answer:
      "步骤58 具有代表性的CNN（VGG16）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["CuPy", "序列化", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-58-vgg16-2",
    chapter: "dl2-step-58-vgg16",
    level: 1,
    question:
      "在步骤58 具有代表性的CNN（VGG16）中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤58 具有代表性的CNN（VGG16）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["设备", "测试模式", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-58-vgg16-3",
    chapter: "dl2-step-58-vgg16",
    level: 2,
    question:
      "如何在步骤58 具有代表性的CNN（VGG16）中手算并验证序列化的forward与backward？",
    answer:
      "步骤58 具有代表性的CNN（VGG16）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["序列化", "CNN", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-58-vgg16-4",
    chapter: "dl2-step-58-vgg16",
    level: 2,
    question:
      "怎样为步骤58 具有代表性的CNN（VGG16）构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤58 具有代表性的CNN（VGG16）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["测试模式", "VGG16", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-58-vgg16-5",
    chapter: "dl2-step-58-vgg16",
    level: 3,
    question:
      "如何在步骤58 具有代表性的CNN（VGG16）中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤58 具有代表性的CNN（VGG16）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["CNN", "CuPy", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-58-vgg16-6",
    chapter: "dl2-step-58-vgg16",
    level: 3,
    question: "怎样把步骤58 具有代表性的CNN（VGG16）接入DeZero端到端回归测试？",
    answer:
      "步骤58 具有代表性的CNN（VGG16）沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["VGG16", "设备", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-59-rnn-1",
    chapter: "dl2-step-59-rnn",
    level: 1,
    question: "如何用最小对象图解释步骤59 使用RNN处理时间序列数据的核心机制？",
    answer:
      "步骤59 使用RNN处理时间序列数据沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["CuPy", "序列化", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-59-rnn-2",
    chapter: "dl2-step-59-rnn",
    level: 1,
    question:
      "在步骤59 使用RNN处理时间序列数据中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤59 使用RNN处理时间序列数据沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["设备", "测试模式", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-59-rnn-3",
    chapter: "dl2-step-59-rnn",
    level: 2,
    question:
      "如何在步骤59 使用RNN处理时间序列数据中手算并验证序列化的forward与backward？",
    answer:
      "步骤59 使用RNN处理时间序列数据沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["序列化", "RNN", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-59-rnn-4",
    chapter: "dl2-step-59-rnn",
    level: 2,
    question:
      "怎样为步骤59 使用RNN处理时间序列数据构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤59 使用RNN处理时间序列数据沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["测试模式", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-59-rnn-5",
    chapter: "dl2-step-59-rnn",
    level: 3,
    question:
      "如何在步骤59 使用RNN处理时间序列数据中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤59 使用RNN处理时间序列数据沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["RNN", "CuPy", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-59-rnn-6",
    chapter: "dl2-step-59-rnn",
    level: 3,
    question: "怎样把步骤59 使用RNN处理时间序列数据接入DeZero端到端回归测试？",
    answer:
      "步骤59 使用RNN处理时间序列数据沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "设备", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-60-lstm-dataloader-1",
    chapter: "dl2-step-60-lstm-dataloader",
    level: 1,
    question: "如何用最小对象图解释步骤60 LSTM与数据加载器的核心机制？",
    answer:
      "步骤60 LSTM与数据加载器沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["CuPy", "序列化", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-60-lstm-dataloader-2",
    chapter: "dl2-step-60-lstm-dataloader",
    level: 1,
    question: "在步骤60 LSTM与数据加载器中，哪条中间证据必须先于训练结果检查？",
    answer:
      "步骤60 LSTM与数据加载器沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["设备", "测试模式", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-60-lstm-dataloader-3",
    chapter: "dl2-step-60-lstm-dataloader",
    level: 2,
    question:
      "如何在步骤60 LSTM与数据加载器中手算并验证序列化的forward与backward？",
    answer:
      "步骤60 LSTM与数据加载器沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["序列化", "LSTM", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-60-lstm-dataloader-4",
    chapter: "dl2-step-60-lstm-dataloader",
    level: 2,
    question:
      "怎样为步骤60 LSTM与数据加载器构造违反shape、对象或模式合同的失败样本？",
    answer:
      "步骤60 LSTM与数据加载器沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["测试模式", "证据重放", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-60-lstm-dataloader-5",
    chapter: "dl2-step-60-lstm-dataloader",
    level: 3,
    question:
      "如何在步骤60 LSTM与数据加载器中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "步骤60 LSTM与数据加载器沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["LSTM", "CuPy", "DeZero", "框架证据"],
  },
  {
    id: "dl2-step-60-lstm-dataloader-6",
    chapter: "dl2-step-60-lstm-dataloader",
    level: 3,
    question: "怎样把步骤60 LSTM与数据加载器接入DeZero端到端回归测试？",
    answer:
      "步骤60 LSTM与数据加载器沿“输入合同、前向状态、反向规则、独立测试”扩展DeZero，并保持设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“设备迁移、保存加载和训练/测试模式不改变模型数学语义；卷积与循环层的shape、状态边界和反向路径必须可重放。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["证据重放", "设备", "DeZero", "框架证据"],
  },
  {
    id: "dl2-appendix-a-in-place-1",
    chapter: "dl2-appendix-a-in-place",
    level: 1,
    question:
      "如何用最小对象图解释附录A in-place运算（步骤14的补充内容）的核心机制？",
    answer:
      "附录A in-place运算（步骤14的补充内容）补足主线实现边界，并用最小失败样本验证状态、shape与反向语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“原地覆盖不得销毁反向所需值或通过别名静默改变其他Variable。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["in-place", "覆盖", "DeZero", "框架证据"],
  },
  {
    id: "dl2-appendix-a-in-place-2",
    chapter: "dl2-appendix-a-in-place",
    level: 1,
    question:
      "在附录A in-place运算（步骤14的补充内容）中，哪条中间证据必须先于训练结果检查？",
    answer:
      "附录A in-place运算（步骤14的补充内容）补足主线实现边界，并用最小失败样本验证状态、shape与反向语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“原地覆盖不得销毁反向所需值或通过别名静默改变其他Variable。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["别名", "前向缓存", "DeZero", "框架证据"],
  },
  {
    id: "dl2-appendix-a-in-place-3",
    chapter: "dl2-appendix-a-in-place",
    level: 2,
    question:
      "如何在附录A in-place运算（步骤14的补充内容）中手算并验证覆盖的forward与backward？",
    answer:
      "附录A in-place运算（步骤14的补充内容）补足主线实现边界，并用最小失败样本验证状态、shape与反向语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“原地覆盖不得销毁反向所需值或通过别名静默改变其他Variable。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["覆盖", "梯度", "DeZero", "框架证据"],
  },
  {
    id: "dl2-appendix-a-in-place-4",
    chapter: "dl2-appendix-a-in-place",
    level: 2,
    question:
      "怎样为附录A in-place运算（步骤14的补充内容）构造违反shape、对象或模式合同的失败样本？",
    answer:
      "附录A in-place运算（步骤14的补充内容）补足主线实现边界，并用最小失败样本验证状态、shape与反向语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“原地覆盖不得销毁反向所需值或通过别名静默改变其他Variable。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["前向缓存", "版本", "DeZero", "框架证据"],
  },
  {
    id: "dl2-appendix-a-in-place-5",
    chapter: "dl2-appendix-a-in-place",
    level: 3,
    question:
      "如何在附录A in-place运算（步骤14的补充内容）中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "附录A in-place运算（步骤14的补充内容）补足主线实现边界，并用最小失败样本验证状态、shape与反向语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“原地覆盖不得销毁反向所需值或通过别名静默改变其他Variable。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度", "in-place", "DeZero", "框架证据"],
  },
  {
    id: "dl2-appendix-a-in-place-6",
    chapter: "dl2-appendix-a-in-place",
    level: 3,
    question:
      "怎样把附录A in-place运算（步骤14的补充内容）接入DeZero端到端回归测试？",
    answer:
      "附录A in-place运算（步骤14的补充内容）补足主线实现边界，并用最小失败样本验证状态、shape与反向语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“原地覆盖不得销毁反向所需值或通过别名静默改变其他Variable。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["版本", "别名", "DeZero", "框架证据"],
  },
  {
    id: "dl2-appendix-b-get-item-1",
    chapter: "dl2-appendix-b-get-item",
    level: 1,
    question:
      "如何用最小对象图解释附录B 实现get_item函数（步骤47的补充内容）的核心机制？",
    answer:
      "附录B 实现get_item函数（步骤47的补充内容）补足主线实现边界，并用最小失败样本验证状态、shape与反向语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“切片反向把梯度散射回原shape，重复索引贡献必须累加。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["get_item", "散射", "DeZero", "框架证据"],
  },
  {
    id: "dl2-appendix-b-get-item-2",
    chapter: "dl2-appendix-b-get-item",
    level: 1,
    question:
      "在附录B 实现get_item函数（步骤47的补充内容）中，哪条中间证据必须先于训练结果检查？",
    answer:
      "附录B 实现get_item函数（步骤47的补充内容）补足主线实现边界，并用最小失败样本验证状态、shape与反向语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“切片反向把梯度散射回原shape，重复索引贡献必须累加。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["切片", "重复索引", "DeZero", "框架证据"],
  },
  {
    id: "dl2-appendix-b-get-item-3",
    chapter: "dl2-appendix-b-get-item",
    level: 2,
    question:
      "如何在附录B 实现get_item函数（步骤47的补充内容）中手算并验证散射的forward与backward？",
    answer:
      "附录B 实现get_item函数（步骤47的补充内容）补足主线实现边界，并用最小失败样本验证状态、shape与反向语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“切片反向把梯度散射回原shape，重复索引贡献必须累加。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["散射", "shape", "DeZero", "框架证据"],
  },
  {
    id: "dl2-appendix-b-get-item-4",
    chapter: "dl2-appendix-b-get-item",
    level: 2,
    question:
      "怎样为附录B 实现get_item函数（步骤47的补充内容）构造违反shape、对象或模式合同的失败样本？",
    answer:
      "附录B 实现get_item函数（步骤47的补充内容）补足主线实现边界，并用最小失败样本验证状态、shape与反向语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“切片反向把梯度散射回原shape，重复索引贡献必须累加。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["重复索引", "梯度", "DeZero", "框架证据"],
  },
  {
    id: "dl2-appendix-b-get-item-5",
    chapter: "dl2-appendix-b-get-item",
    level: 3,
    question:
      "如何在附录B 实现get_item函数（步骤47的补充内容）中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "附录B 实现get_item函数（步骤47的补充内容）补足主线实现边界，并用最小失败样本验证状态、shape与反向语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“切片反向把梯度散射回原shape，重复索引贡献必须累加。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["shape", "get_item", "DeZero", "框架证据"],
  },
  {
    id: "dl2-appendix-b-get-item-6",
    chapter: "dl2-appendix-b-get-item",
    level: 3,
    question:
      "怎样把附录B 实现get_item函数（步骤47的补充内容）接入DeZero端到端回归测试？",
    answer:
      "附录B 实现get_item函数（步骤47的补充内容）补足主线实现边界，并用最小失败样本验证状态、shape与反向语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“切片反向把梯度散射回原shape，重复索引贡献必须累加。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["梯度", "切片", "DeZero", "框架证据"],
  },
  {
    id: "dl2-appendix-c-colab-1",
    chapter: "dl2-appendix-c-colab",
    level: 1,
    question:
      "如何用最小对象图解释附录C 在Google Colaboratory上运行的核心机制？",
    answer:
      "附录C 在Google Colaboratory上运行补足主线实现边界，并用最小失败样本验证状态、shape与反向语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“云端环境的版本、设备、路径和数据可从干净运行时完整恢复。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["Colaboratory", "依赖", "DeZero", "框架证据"],
  },
  {
    id: "dl2-appendix-c-colab-2",
    chapter: "dl2-appendix-c-colab",
    level: 1,
    question:
      "在附录C 在Google Colaboratory上运行中，哪条中间证据必须先于训练结果检查？",
    answer:
      "附录C 在Google Colaboratory上运行补足主线实现边界，并用最小失败样本验证状态、shape与反向语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“云端环境的版本、设备、路径和数据可从干净运行时完整恢复。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["运行时", "GPU", "DeZero", "框架证据"],
  },
  {
    id: "dl2-appendix-c-colab-3",
    chapter: "dl2-appendix-c-colab",
    level: 2,
    question:
      "如何在附录C 在Google Colaboratory上运行中手算并验证依赖的forward与backward？",
    answer:
      "附录C 在Google Colaboratory上运行补足主线实现边界，并用最小失败样本验证状态、shape与反向语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“云端环境的版本、设备、路径和数据可从干净运行时完整恢复。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["依赖", "路径", "DeZero", "框架证据"],
  },
  {
    id: "dl2-appendix-c-colab-4",
    chapter: "dl2-appendix-c-colab",
    level: 2,
    question:
      "怎样为附录C 在Google Colaboratory上运行构造违反shape、对象或模式合同的失败样本？",
    answer:
      "附录C 在Google Colaboratory上运行补足主线实现边界，并用最小失败样本验证状态、shape与反向语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“云端环境的版本、设备、路径和数据可从干净运行时完整恢复。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["GPU", "复现", "DeZero", "框架证据"],
  },
  {
    id: "dl2-appendix-c-colab-5",
    chapter: "dl2-appendix-c-colab",
    level: 3,
    question:
      "如何在附录C 在Google Colaboratory上运行中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "附录C 在Google Colaboratory上运行补足主线实现边界，并用最小失败样本验证状态、shape与反向语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“云端环境的版本、设备、路径和数据可从干净运行时完整恢复。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["路径", "Colaboratory", "DeZero", "框架证据"],
  },
  {
    id: "dl2-appendix-c-colab-6",
    chapter: "dl2-appendix-c-colab",
    level: 3,
    question:
      "怎样把附录C 在Google Colaboratory上运行接入DeZero端到端回归测试？",
    answer:
      "附录C 在Google Colaboratory上运行补足主线实现边界，并用最小失败样本验证状态、shape与反向语义。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“云端环境的版本、设备、路径和数据可从干净运行时完整恢复。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["复现", "运行时", "DeZero", "框架证据"],
  },
  {
    id: "dl2-official-final-review-1",
    chapter: "dl2-official-final-review",
    level: 1,
    question:
      "如何用最小对象图解释《深度学习入门2：自制框架》全书总复习的核心机制？",
    answer:
      "用一条端到端证据链复查60步DeZero：建图、逆序反向、高阶建图、张量shape、模型训练、设备和时序状态。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“从固定输入到预测、损失、梯度、参数更新、保存加载和独立测试均可重放，275个正式目录层级无遗漏。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["动态图", "高阶导数", "DeZero", "框架证据"],
  },
  {
    id: "dl2-official-final-review-2",
    chapter: "dl2-official-final-review",
    level: 1,
    question:
      "在《深度学习入门2：自制框架》全书总复习中，哪条中间证据必须先于训练结果检查？",
    answer:
      "用一条端到端证据链复查60步DeZero：建图、逆序反向、高阶建图、张量shape、模型训练、设备和时序状态。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“从固定输入到预测、损失、梯度、参数更新、保存加载和独立测试均可重放，275个正式目录层级无遗漏。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["拓扑逆序", "参数发现", "DeZero", "框架证据"],
  },
  {
    id: "dl2-official-final-review-3",
    chapter: "dl2-official-final-review",
    level: 2,
    question:
      "如何在《深度学习入门2：自制框架》全书总复习中手算并验证高阶导数的forward与backward？",
    answer:
      "用一条端到端证据链复查60步DeZero：建图、逆序反向、高阶建图、张量shape、模型训练、设备和时序状态。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“从固定输入到预测、损失、梯度、参数更新、保存加载和独立测试均可重放，275个正式目录层级无遗漏。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["高阶导数", "设备迁移", "DeZero", "框架证据"],
  },
  {
    id: "dl2-official-final-review-4",
    chapter: "dl2-official-final-review",
    level: 2,
    question:
      "怎样为《深度学习入门2：自制框架》全书总复习构造违反shape、对象或模式合同的失败样本？",
    answer:
      "用一条端到端证据链复查60步DeZero：建图、逆序反向、高阶建图、张量shape、模型训练、设备和时序状态。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“从固定输入到预测、损失、梯度、参数更新、保存加载和独立测试均可重放，275个正式目录层级无遗漏。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["参数发现", "序列状态", "DeZero", "框架证据"],
  },
  {
    id: "dl2-official-final-review-5",
    chapter: "dl2-official-final-review",
    level: 3,
    question:
      "如何在《深度学习入门2：自制框架》全书总复习中排除旧梯度、缓存、设备或随机状态造成的伪改进？",
    answer:
      "用一条端到端证据链复查60步DeZero：建图、逆序反向、高阶建图、张量shape、模型训练、设备和时序状态。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“从固定输入到预测、损失、梯度、参数更新、保存加载和独立测试均可重放，275个正式目录层级无遗漏。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["设备迁移", "动态图", "DeZero", "框架证据"],
  },
  {
    id: "dl2-official-final-review-6",
    chapter: "dl2-official-final-review",
    level: 3,
    question:
      "怎样把《深度学习入门2：自制框架》全书总复习接入DeZero端到端回归测试？",
    answer:
      "用一条端到端证据链复查60步DeZero：建图、逆序反向、高阶建图、张量shape、模型训练、设备和时序状态。 先按“冻结输入与版本 -> 执行forward -> 保存图与shape -> 执行backward -> 核对数值梯度 -> 独立重放测试”冻结输入、对象身份、shape、模式、设备和随机状态；运行前预测第一处分叉，运行后比较手算、解析梯度与中心差分。通过标准是“从固定输入到预测、损失、梯度、参数更新、保存加载和独立测试均可重放，275个正式目录层级无遗漏。”；若首个证据不一致，应回退到上一版测试通过的DeZero，清空图、grad、优化器与循环状态后重放。",
    tags: ["序列状态", "拓扑逆序", "DeZero", "框架证据"],
  },
];
