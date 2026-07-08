import type { ReviewQuestion } from "./types";

/** Python编程：从入门到实践 · 总复习复习题 */
export const pccFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "pcc-final-review-1",
    chapter: "pcc-final-review",
    level: 1,
    question: "全书四大板块的递进关系是什么？为什么不能跳过任何一层？",
    answer:
      "四大板块的递进关系：数据存储（变量与列表）→ 逻辑控制（条件循环与函数）→ 抽象封装（类与文件）→ 工程实践（项目）。\n\n不能跳过任何一层的原因：\n- 跳过数据存储：不知道变量是引用、列表怎么操作，循环和函数无从操作数据\n- 跳过逻辑控制：没有条件判断和循环，代码只能直线执行；没有函数，逻辑无法复用\n- 跳过抽象封装：没有类，数据和行为分离；没有异常处理，程序一出错就崩溃\n- 跳过工程实践：只有碎片知识，无法整合为完整产品\n\n每层建立在前层基础上：循环遍历的是列表，函数封装的是控制逻辑，类封装的是数据+行为，项目综合运用所有层。",
    tags: ["递进链", "四大板块", "知识依赖"],
  },
  {
    id: "pcc-final-review-2",
    chapter: "pcc-final-review",
    level: 2,
    question: "Python 变量的引用语义如何影响函数参数传递？",
    answer:
      "Python 函数传递的是对象引用。影响：\n\n**不可变对象**（int、str、tuple）：函数内"修改"会创建新对象，不影响外部。`def change(x): x = 100` 调用 `change(n)` 后 n 不变——因为 x = 100 是让 x 指向新对象 100，n 仍指向原对象。\n\n**可变对象**（list、dict、set）：函数内修改直接影响外部。`def add(lst): lst.append(4)` 调用 `add(numbers)` 后 numbers 变了——因为 lst 和 numbers 指向同一个列表，append 修改了这个共享对象。\n\n这是 Python 变量引用语义的直接结果：变量是标签不是盒子，赋值是贴标签不是复制内容。函数参数传递时，实参的标签被复制给形参，但两个标签指向同一个对象。",
    tags: ["引用语义", "参数传递", "可变对象"],
  },
  {
    id: "pcc-final-review-3",
    chapter: "pcc-final-review",
    level: 3,
    question: "如果你要开发一个"个人记账本"Python 程序，全书哪些知识会被用到？",
    answer:
      "个人记账本程序用到全书所有四个板块的知识：\n\n**数据存储层**：变量存储配置（预算上限）；字典存储每笔记录 {\"金额\": 50, \"类别\": \"餐饮\", \"日期\": \"2024-01-01\"}；列表存储所有记录\n\n**逻辑控制层**：if-elif-else 按类别统计支出；for 循环遍历记录计算月度汇总；函数封装 add_record、get_summary、export_report；列表推导式筛选特定类别的记录\n\n**抽象封装层**：Record 类封装单笔记录；AccountBook 类管理所有记录和统计逻辑；with + json.dump/load 持久化到文件；try-except 处理文件损坏和输入验证；test_ 函数验证统计计算\n\n**工程实践层**：Matplotlib 饼图展示各类别支出占比；折线图展示月度支出趋势；可选 Plotly 交互式图表",
    tags: ["综合应用", "知识串联", "项目设计"],
  },
  {
    id: "pcc-final-review-4",
    chapter: "pcc-final-review",
    level: 4,
    question: "全书从"能跑"到"能交付"经历了哪些能力跃迁？每一步的关键知识是什么？",
    answer:
      "从"能跑"到"能交付"的四步能力跃迁：\n\n1. **能跑**（基础语法）：变量、列表、字典。关键：理解引用语义——变量是标签不是盒子。能存数据、取数据。\n\n2. **能用**（控制流与函数）：if-elif-else、while/for、函数、列表推导式。关键：函数封装复用逻辑，LEGB 作用域规则。能根据条件处理数据、批量操作。\n\n3. **能维护**（类与文件）：class、继承、with 文件操作、try-except 异常处理、单元测试。关键：类将数据+行为封装为可维护结构，异常处理让程序健壮，测试让你敢改代码。能写工程级代码。\n\n4. **能交付**（项目实战）：Pygame 游戏循环、Matplotlib/Plotly 可视化、API 数据获取。关键：游戏循环是全书知识集大成，数据可视化是从数据源到展示的完整流水线。能做完整产品。\n\n每一步都是质变：不只是学了新语法，而是认知模式的升级——从存数据到处理数据到组织代码到交付产品。",
    tags: ["能力跃迁", "从脚本到工程", "综合复习"],
  },
];
