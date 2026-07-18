import type { ReviewQuestion } from "./types";
/** 《程序员的数学》三册权威23章复习题。 */
export const pmOfficialChapterQuestions: ReviewQuestion[] = [
  {
    "id": "pm1-zero-1",
    "chapter": "pm1-zero",
    "level": 1,
    "question": "第1章 0的故事：无即是有中，按位计数法是什么？",
    "answer": "每一位的符号乘以该位置的基数幂；位置改变，同一符号的权重也改变。",
    "tags": [
      "第1章 0的故事：无即是有",
      "按位计数法"
    ]
  },
  {
    "id": "pm1-zero-2",
    "chapter": "pm1-zero",
    "level": 2,
    "question": "二进制与基数转换怎样连接？",
    "answer": "只用0和1表示数，位权依次为1、2、4、8；它适合用高低电平实现。 整数不断除以目标基数并逆序收集余数；验证时应重新按位展开。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第1章 0的故事：无即是有",
      "机制"
    ]
  },
  {
    "id": "pm1-zero-3",
    "chapter": "pm1-zero",
    "level": 3,
    "question": "如何验证零的占位作用的边界？",
    "answer": "零保留缺失位的位置，让2503中的百位缺失不会改变其他位的权重。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第1章 0的故事：无即是有",
      "边界"
    ]
  },
  {
    "id": "pm1-zero-4",
    "chapter": "pm1-zero",
    "level": 4,
    "question": "指数法则在工程案例中如何验收？",
    "answer": "零次幂把边界规则统一为1，负指数把位权扩展到小数方向。 权限位是零的工程化应用：每个二进制位代表一项独立能力，按位或负责授予，按位与负责查询，按位异或负责翻转。表示很紧凑，但位号、掩码和默认值必须进入协议文档，否则一个移位错误就会改变权限边界。",
    "tags": [
      "第1章 0的故事：无即是有",
      "迁移"
    ]
  },
  {
    "id": "pm1-logic-1",
    "chapter": "pm1-logic",
    "level": 1,
    "question": "第2章 逻辑：真与假的二元世界中，命题是什么？",
    "answer": "能够明确判定真假的陈述；开放问题和含糊形容词在补充条件前不是合格命题。",
    "tags": [
      "第2章 逻辑：真与假的二元世界",
      "命题"
    ]
  },
  {
    "id": "pm1-logic-2",
    "chapter": "pm1-logic",
    "level": 2,
    "question": "真值表与逻辑与或非怎样连接？",
    "answer": "枚举原子命题的全部组合，以机械方式验证复合表达式是否等价。 与要求条件同时成立，或要求至少一个成立，非负责翻转真值。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第2章 逻辑：真与假的二元世界",
      "机制"
    ]
  },
  {
    "id": "pm1-logic-3",
    "chapter": "pm1-logic",
    "level": 3,
    "question": "如何验证蕴含的边界？",
    "answer": "只有前件真而后件假时为假；它描述承诺，不等同于因果关系。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第2章 逻辑：真与假的二元世界",
      "边界"
    ]
  },
  {
    "id": "pm1-logic-4",
    "chapter": "pm1-logic",
    "level": 4,
    "question": "德摩根定律在工程案例中如何验收？",
    "answer": "整体否定会交换与、或并逐项取反，是改写守卫条件的重要工具。 访问控制规则“已登录并且是管理员，或者持有一次性恢复令牌”必须显式加括号。先写决策表，再映射代码，可发现默认优先级、空身份和令牌过期等边界。安全条件的否定应使用德摩根定律逐项检查，避免漏掉一种放行路径。",
    "tags": [
      "第2章 逻辑：真与假的二元世界",
      "迁移"
    ]
  },
  {
    "id": "pm1-remainder-1",
    "chapter": "pm1-remainder",
    "level": 1,
    "question": "第3章 余数：周期性和分组中，带余除法是什么？",
    "answer": "给定正模数m，整数a可唯一写成qm+r且余数位于0到m减1。",
    "tags": [
      "第3章 余数：周期性和分组",
      "带余除法"
    ]
  },
  {
    "id": "pm1-remainder-2",
    "chapter": "pm1-remainder",
    "level": 2,
    "question": "同余与周期性怎样连接？",
    "answer": "两个整数除以m余数相同，记作模m同余；它把整数划分为m组。 状态每经过固定步数回到同一余数类，因此可以只保存当前位置而非累计次数。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第3章 余数：周期性和分组",
      "机制"
    ]
  },
  {
    "id": "pm1-remainder-3",
    "chapter": "pm1-remainder",
    "level": 3,
    "question": "如何验证模运算规则的边界？",
    "answer": "加法和乘法可先取模再计算；除法只有在逆元存在时才能安全迁移。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第3章 余数：周期性和分组",
      "边界"
    ]
  },
  {
    "id": "pm1-remainder-4",
    "chapter": "pm1-remainder",
    "level": 4,
    "question": "环形索引在工程案例中如何验收？",
    "answer": "逻辑位置对容量取模得到物理槽位，但覆盖策略和空满判定仍需额外状态。 容量为8的环形队列把逻辑序号13映射到槽5，但槽5可能属于旧数据也可能属于新数据。生产系统会同时维护读写序号，用差值判断元素数，用取模定位数组槽；只保存两个余数会丢失绕圈次数并产生空满二义性。",
    "tags": [
      "第3章 余数：周期性和分组",
      "迁移"
    ]
  },
  {
    "id": "pm1-induction-1",
    "chapter": "pm1-induction",
    "level": 1,
    "question": "第4章 数学归纳法：推倒无穷多骨牌中，基例是什么？",
    "answer": "验证最小规模命题，防止归纳链悬空；程序中常对应空输入或单元素。",
    "tags": [
      "第4章 数学归纳法：推倒无穷多骨牌",
      "基例"
    ]
  },
  {
    "id": "pm1-induction-2",
    "chapter": "pm1-induction",
    "level": 2,
    "question": "归纳假设与归纳步骤怎样连接？",
    "answer": "暂时假定规模k成立，只能按声明范围使用，不能偷用待证的k加1。 从P(k)严格推出P(k+1)，说明相邻规模之间的传递机制。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第4章 数学归纳法：推倒无穷多骨牌",
      "机制"
    ]
  },
  {
    "id": "pm1-induction-3",
    "chapter": "pm1-induction",
    "level": 3,
    "question": "如何验证强归纳法的边界？",
    "answer": "证明规模k加1时可使用所有不超过k的结论，适合多分支递归和质因数分解。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第4章 数学归纳法：推倒无穷多骨牌",
      "边界"
    ]
  },
  {
    "id": "pm1-induction-4",
    "chapter": "pm1-induction",
    "level": 4,
    "question": "循环不变量在工程案例中如何验收？",
    "answer": "循环每轮前后保持的命题，是把归纳法迁移到迭代程序的桥梁。 二分查找的循环不变量是：若目标存在，它始终位于半开区间left到right内。初始化覆盖全数组；每次比较后缩小一侧仍保持命题；终止时区间为空即可证明不存在。只测试若干输入不能替代这个对所有迭代的证明。",
    "tags": [
      "第4章 数学归纳法：推倒无穷多骨牌",
      "迁移"
    ]
  },
  {
    "id": "pm1-counting-1",
    "chapter": "pm1-counting",
    "level": 1,
    "question": "第5章 排列组合：不重不漏地计数中，加法原理是什么？",
    "answer": "互斥方案的数量相加；若方案重叠，必须先消除交集或使用容斥。",
    "tags": [
      "第5章 排列组合：不重不漏地计数",
      "加法原理"
    ]
  },
  {
    "id": "pm1-counting-2",
    "chapter": "pm1-counting",
    "level": 2,
    "question": "乘法原理与排列怎样连接？",
    "answer": "连续选择的分支数相乘，每一步的可选数可以依赖前面的选择。 选择对象且顺序重要；无放回时后续可选数递减。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第5章 排列组合：不重不漏地计数",
      "机制"
    ]
  },
  {
    "id": "pm1-counting-3",
    "chapter": "pm1-counting",
    "level": 3,
    "question": "如何验证组合的边界？",
    "answer": "只关心选中集合，不关心内部顺序；可由排列除去k阶乘的重复次序。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第5章 排列组合：不重不漏地计数",
      "边界"
    ]
  },
  {
    "id": "pm1-counting-4",
    "chapter": "pm1-counting",
    "level": 4,
    "question": "计数模型在工程案例中如何验收？",
    "answer": "先建立对象与一一对应关系，再计算；公式只是模型的压缩结果。 为三个浏览器、两种身份和四种网络状态设计测试，笛卡尔积有24种。但若访客身份不允许离线写入，部分组合无意义。测试设计应先列约束，再用覆盖目标压缩，而不是盲目宣称全组合或随意挑几个样例。",
    "tags": [
      "第5章 排列组合：不重不漏地计数",
      "迁移"
    ]
  },
  {
    "id": "pm1-recursion-1",
    "chapter": "pm1-recursion",
    "level": 1,
    "question": "第6章 递归：用自身定义自身中，递归定义是什么？",
    "answer": "对象通过更小规模的同类对象定义，同时必须给出不再递归的基例。",
    "tags": [
      "第6章 递归：用自身定义自身",
      "递归定义"
    ]
  },
  {
    "id": "pm1-recursion-2",
    "chapter": "pm1-recursion",
    "level": 2,
    "question": "递推关系与调用栈怎样连接？",
    "answer": "用相邻规模的数值关系描述成本或答案，是从程序结构到数学模型的桥梁。 每次调用保存参数、局部状态和返回位置；深度过大可能耗尽栈空间。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第6章 递归：用自身定义自身",
      "机制"
    ]
  },
  {
    "id": "pm1-recursion-3",
    "chapter": "pm1-recursion",
    "level": 3,
    "question": "如何验证重复子问题的边界？",
    "answer": "不同分支计算同一输入时，朴素递归会指数重复，可用记忆化或迭代消除。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第6章 递归：用自身定义自身",
      "边界"
    ]
  },
  {
    "id": "pm1-recursion-4",
    "chapter": "pm1-recursion",
    "level": 4,
    "question": "结构递归在工程案例中如何验收？",
    "answer": "沿树、列表或语法结构下降，正确性依赖每一步都进入严格更小的子结构。 遍历目录树是结构递归：文件是基例，目录的结果由子项结果组合。工程实现必须处理符号链接环、权限失败、深度限制和部分结果。数学上的树若被现实链接变成图，就需要已访问集合恢复“规模严格减小”的前提。",
    "tags": [
      "第6章 递归：用自身定义自身",
      "迁移"
    ]
  },
  {
    "id": "pm1-exponential-explosion-1",
    "chapter": "pm1-exponential-explosion",
    "level": 1,
    "question": "第7章 指数爆炸：识别问题空间中，问题空间是什么？",
    "answer": "算法可能检查的候选集合；先估计其大小，才能判断暴力法是否可行。",
    "tags": [
      "第7章 指数爆炸：识别问题空间",
      "问题空间"
    ]
  },
  {
    "id": "pm1-exponential-explosion-2",
    "chapter": "pm1-exponential-explosion",
    "level": 2,
    "question": "指数增长与对数尺度怎样连接？",
    "answer": "输入增加1使规模乘常数，长期增长远快于任意固定次数多项式。 把乘法增长转换为加法，可反推位数、安全强度和最大可处理规模。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第7章 指数爆炸：识别问题空间",
      "机制"
    ]
  },
  {
    "id": "pm1-exponential-explosion-3",
    "chapter": "pm1-exponential-explosion",
    "level": 3,
    "question": "如何验证剪枝的边界？",
    "answer": "利用约束提前排除整片候选空间；有效性依赖不会误删可行解的证明。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第7章 指数爆炸：识别问题空间",
      "边界"
    ]
  },
  {
    "id": "pm1-exponential-explosion-4",
    "chapter": "pm1-exponential-explosion",
    "level": 4,
    "question": "复杂度策略在工程案例中如何验收？",
    "answer": "减少输入、改进算法、接受近似或利用领域结构，而不是只寄希望于更快机器。 功能开关组合测试有n个二元开关，完全枚举是2的n次方。团队应识别互斥约束、关键交互和风险优先级，用成对覆盖或性质测试压缩；同时保留少量端到端组合验证，不能把压缩后的覆盖误称为穷尽证明。",
    "tags": [
      "第7章 指数爆炸：识别问题空间",
      "迁移"
    ]
  },
  {
    "id": "pm1-undecidable-problems-1",
    "chapter": "pm1-undecidable-problems",
    "level": 1,
    "question": "第8章 不可解问题：程序能力的边界中，反证法是什么？",
    "answer": "假设结论的否定成立，并推导矛盾；矛盾必须来自假设与已知规则。",
    "tags": [
      "第8章 不可解问题：程序能力的边界",
      "反证法"
    ]
  },
  {
    "id": "pm1-undecidable-problems-2",
    "chapter": "pm1-undecidable-problems",
    "level": 2,
    "question": "可数集合与对角论证怎样连接？",
    "answer": "能与自然数建立一一对应；有限字符串和程序文本虽无限但可枚举。 构造一个在第n位不同于第n个对象的新对象，证明任何枚举都不完整。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第8章 不可解问题：程序能力的边界",
      "机制"
    ]
  },
  {
    "id": "pm1-undecidable-problems-3",
    "chapter": "pm1-undecidable-problems",
    "level": 3,
    "question": "如何验证停机问题的边界？",
    "answer": "不存在一个程序能对任意程序及输入总是判定其最终是否停止。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第8章 不可解问题：程序能力的边界",
      "边界"
    ]
  },
  {
    "id": "pm1-undecidable-problems-4",
    "chapter": "pm1-undecidable-problems",
    "level": 4,
    "question": "半判定在工程案例中如何验收？",
    "answer": "某些问题找到证据时可以确认，但无证据分支可能永不结束；超时不等于逻辑否定。 静态分析器可以对受限语言、有限状态或特定缺陷给出可靠结论，却不能普遍判定任意程序所有运行性质。工程文档必须区分已证明安全、找到反例、分析超时和超出模型四种状态，不能把“未发现问题”写成“没有问题”。",
    "tags": [
      "第8章 不可解问题：程序能力的边界",
      "迁移"
    ]
  },
  {
    "id": "pm1-programmers-mathematics-1",
    "chapter": "pm1-programmers-mathematics",
    "level": 1,
    "question": "第9章 什么是程序员的数学：总结篇中，模式识别是什么？",
    "answer": "从不同表象中找到相同结构，如周期、树、状态空间或线性映射。",
    "tags": [
      "第9章 什么是程序员的数学：总结篇",
      "模式识别"
    ]
  },
  {
    "id": "pm1-programmers-mathematics-2",
    "chapter": "pm1-programmers-mathematics",
    "level": 2,
    "question": "抽象化与模型边界怎样连接？",
    "answer": "舍弃与目标无关的细节，同时明确保留哪些量、关系和约束。 写清输入域、假设和失败条件，防止数学结论被越界使用。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第9章 什么是程序员的数学：总结篇",
      "机制"
    ]
  },
  {
    "id": "pm1-programmers-mathematics-3",
    "chapter": "pm1-programmers-mathematics",
    "level": 3,
    "question": "如何验证验证闭环的边界？",
    "answer": "推导、示例、代码实验和反例相互校验，但测试不能替代普遍证明。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第9章 什么是程序员的数学：总结篇",
      "边界"
    ]
  },
  {
    "id": "pm1-programmers-mathematics-4",
    "chapter": "pm1-programmers-mathematics",
    "level": 4,
    "question": "复杂度意识在工程案例中如何验收？",
    "answer": "在实现前估算候选空间和资源增长，及时改变问题或算法。 为任务调度器建模时，先把任务、依赖和资源表示为有向图与容量约束；再用无环性作为可执行前提，用拓扑序作为结果证据，用复杂度估算容量。线上出现环时应返回结构化反例，而不是让执行器静默等待。",
    "tags": [
      "第9章 什么是程序员的数学：总结篇",
      "迁移"
    ]
  },
  {
    "id": "pm2-probability-definition-1",
    "chapter": "pm2-probability-definition",
    "level": 1,
    "question": "第1章 概率的定义中，样本空间是什么？",
    "answer": "一次随机试验所有可能基本结果的集合；遗漏结果会破坏后续概率。",
    "tags": [
      "第1章 概率的定义",
      "样本空间"
    ]
  },
  {
    "id": "pm2-probability-definition-2",
    "chapter": "pm2-probability-definition",
    "level": 2,
    "question": "事件与概率公理怎样连接？",
    "answer": "样本空间的子集；事件发生表示实际结果落在该子集中。 非负、全集概率为1、互斥事件可列可加，其他规则由此推出。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第1章 概率的定义",
      "机制"
    ]
  },
  {
    "id": "pm2-probability-definition-3",
    "chapter": "pm2-probability-definition",
    "level": 3,
    "question": "如何验证条件信息的边界？",
    "answer": "观察或机制改变后应缩小样本空间并重新归一化，而非沿用先验直觉。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第1章 概率的定义",
      "边界"
    ]
  },
  {
    "id": "pm2-probability-definition-4",
    "chapter": "pm2-probability-definition",
    "level": 4,
    "question": "蒙提霍尔问题在工程案例中如何验收？",
    "answer": "主持人知道奖品位置且必开空门，这个选择机制保留了初选门的三分之一概率。 A/B实验的样本空间不仅是点击或未点击，还包含分流规则、曝光成功与机器人过滤。若随机分配在客户端失败，实际概率模型已改变。数据管道应记录分桶依据和排除原因，才能解释频率是否估计了目标概率。",
    "tags": [
      "第1章 概率的定义",
      "迁移"
    ]
  },
  {
    "id": "pm2-multiple-random-variables-1",
    "chapter": "pm2-multiple-random-variables",
    "level": 1,
    "question": "第2章 多个随机变量的相互影响中，联合分布是什么？",
    "answer": "为变量组合分配概率，完整保留相互作用，是边缘与条件计算的来源。",
    "tags": [
      "第2章 多个随机变量的相互影响",
      "联合分布"
    ]
  },
  {
    "id": "pm2-multiple-random-variables-2",
    "chapter": "pm2-multiple-random-variables",
    "level": 2,
    "question": "边缘分布与条件概率怎样连接？",
    "answer": "对其他变量求和或积分后得到单个变量分布，会丢失依赖结构。 已知事件B后，只在B内部重新归一化A所占的概率质量。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第2章 多个随机变量的相互影响",
      "机制"
    ]
  },
  {
    "id": "pm2-multiple-random-variables-3",
    "chapter": "pm2-multiple-random-variables",
    "level": 3,
    "question": "如何验证独立性的边界？",
    "answer": "联合概率等于边缘概率乘积；零相关通常不足以推出独立。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第2章 多个随机变量的相互影响",
      "边界"
    ]
  },
  {
    "id": "pm2-multiple-random-variables-4",
    "chapter": "pm2-multiple-random-variables",
    "level": 4,
    "question": "贝叶斯公式在工程案例中如何验收？",
    "answer": "把似然与先验组合成后验，同时用证据概率完成归一化。 异常检测器命中率很高，但若真实异常极少，阳性样本中仍可能多数是假警报。计算后验必须带入异常先验、召回率和误报率。监控面板只展示“准确率”而不展示基率，会让值班人员高估告警可信度。",
    "tags": [
      "第2章 多个随机变量的相互影响",
      "迁移"
    ]
  },
  {
    "id": "pm2-discrete-distributions-1",
    "chapter": "pm2-discrete-distributions",
    "level": 1,
    "question": "第3章 离散值的概率分布中，概率质量函数是什么？",
    "answer": "为每个离散取值分配非负概率，所有取值概率之和为1。",
    "tags": [
      "第3章 离散值的概率分布",
      "概率质量函数"
    ]
  },
  {
    "id": "pm2-discrete-distributions-2",
    "chapter": "pm2-discrete-distributions",
    "level": 2,
    "question": "伯努利分布与二项分布怎样连接？",
    "answer": "一次成功或失败试验，参数p描述成功概率。 n次独立同分布伯努利试验中的成功次数；独立和固定p是关键假设。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第3章 离散值的概率分布",
      "机制"
    ]
  },
  {
    "id": "pm2-discrete-distributions-3",
    "chapter": "pm2-discrete-distributions",
    "level": 3,
    "question": "如何验证期望的边界？",
    "answer": "按概率加权的长期平均，可用线性性拆分，即使变量不独立也成立。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第3章 离散值的概率分布",
      "边界"
    ]
  },
  {
    "id": "pm2-discrete-distributions-4",
    "chapter": "pm2-discrete-distributions",
    "level": 4,
    "question": "方差在工程案例中如何验收？",
    "answer": "平方偏差的期望，衡量离均值的扩散；标准差恢复原量纲。 请求重试次数若每次成功概率固定且尝试独立，可用几何分布估计尾部；但真实服务的故障会成批相关，p随时间变化。工程上应先画经验分布和条件分层，再决定经典分布是否只是近似。",
    "tags": [
      "第3章 离散值的概率分布",
      "迁移"
    ]
  },
  {
    "id": "pm2-continuous-distributions-1",
    "chapter": "pm2-continuous-distributions",
    "level": 1,
    "question": "第4章 连续值的概率分布中，概率密度是什么？",
    "answer": "密度值不是点概率，曲线在区间下的面积才是概率，总面积为1。",
    "tags": [
      "第4章 连续值的概率分布",
      "概率密度"
    ]
  },
  {
    "id": "pm2-continuous-distributions-2",
    "chapter": "pm2-continuous-distributions",
    "level": 2,
    "question": "累积分布函数与均匀分布怎样连接？",
    "answer": "给出X不大于x的概率，单调且从0趋近1，可统一处理分位数。 有限区间内密度恒定；端点和随机数离散化会影响实现。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第4章 连续值的概率分布",
      "机制"
    ]
  },
  {
    "id": "pm2-continuous-distributions-3",
    "chapter": "pm2-continuous-distributions",
    "level": 3,
    "question": "如何验证指数分布的边界？",
    "answer": "恒定到达率下的等待时间模型，具有无记忆性。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第4章 连续值的概率分布",
      "边界"
    ]
  },
  {
    "id": "pm2-continuous-distributions-4",
    "chapter": "pm2-continuous-distributions",
    "level": 4,
    "question": "正态分布在工程案例中如何验收？",
    "answer": "由均值和方差决定的钟形分布，适合加性扰动但不自动适合所有数据。 延迟分布通常右偏并有长尾，平均值和正态假设会掩盖少量严重慢请求。服务等级应使用经验分位数；若拟合对数正态或混合模型，需用留出数据检查尾部，而不是只看中部曲线贴合。",
    "tags": [
      "第4章 连续值的概率分布",
      "迁移"
    ]
  },
  {
    "id": "pm2-covariance-normal-1",
    "chapter": "pm2-covariance-normal",
    "level": 1,
    "question": "第5章 协方差矩阵、多元正态分布与椭圆中，协方差是什么？",
    "answer": "衡量两个变量围绕各自均值共同增减的方向与尺度，受单位影响。",
    "tags": [
      "第5章 协方差矩阵、多元正态分布与椭圆",
      "协方差"
    ]
  },
  {
    "id": "pm2-covariance-normal-2",
    "chapter": "pm2-covariance-normal",
    "level": 2,
    "question": "相关系数与协方差矩阵怎样连接？",
    "answer": "用标准差归一化协方差，位于负1到1，但只刻画线性关系。 对称半正定矩阵，汇总所有变量方差和两两协方差。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第5章 协方差矩阵、多元正态分布与椭圆",
      "机制"
    ]
  },
  {
    "id": "pm2-covariance-normal-3",
    "chapter": "pm2-covariance-normal",
    "level": 3,
    "question": "如何验证多元正态分布的边界？",
    "answer": "由均值向量和协方差矩阵确定，等密度面是椭圆或椭球。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第5章 协方差矩阵、多元正态分布与椭圆",
      "边界"
    ]
  },
  {
    "id": "pm2-covariance-normal-4",
    "chapter": "pm2-covariance-normal",
    "level": 4,
    "question": "马氏距离在工程案例中如何验收？",
    "answer": "按协方差缩放和旋转后的距离，能区分高方差方向与异常方向。 CPU和请求量高度正相关时，单独用CPU阈值会产生误报。联合模型可把沿正常相关方向的变化视为常态，而把垂直主轴的偏移识别为异常。但均值和协方差也会被异常点污染，应配合稳健估计和分群。",
    "tags": [
      "第5章 协方差矩阵、多元正态分布与椭圆",
      "迁移"
    ]
  },
  {
    "id": "pm2-estimation-testing-1",
    "chapter": "pm2-estimation-testing",
    "level": 1,
    "question": "第6章 估计与检验中，点估计是什么？",
    "answer": "用样本统计量估计总体参数，需讨论偏差、方差和一致性。",
    "tags": [
      "第6章 估计与检验",
      "点估计"
    ]
  },
  {
    "id": "pm2-estimation-testing-2",
    "chapter": "pm2-estimation-testing",
    "level": 2,
    "question": "置信区间与原假设怎样连接？",
    "answer": "重复抽样程序中按指定比例覆盖真参数的区间，不是参数随机落入的概率。 检验暂时采用的基准模型，拒绝需要预先定义的统计量和显著性水平。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第6章 估计与检验",
      "机制"
    ]
  },
  {
    "id": "pm2-estimation-testing-3",
    "chapter": "pm2-estimation-testing",
    "level": 3,
    "question": "如何验证p值的边界？",
    "answer": "在原假设成立时观察到当前或更极端数据的概率，不是原假设后验概率。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第6章 估计与检验",
      "边界"
    ]
  },
  {
    "id": "pm2-estimation-testing-4",
    "chapter": "pm2-estimation-testing",
    "level": 4,
    "question": "第一二类错误在工程案例中如何验收？",
    "answer": "误拒真实原假设与未拒错误原假设之间存在取舍，功效随样本和效应变化。 A/B测试应在实验前写主要指标、最小实际效应、样本量和停止规则。每天查看并在显著时停止会膨胀误报率。报告同时给效应差、置信区间、样本缺失与分流校验，才能判断是否值得发布。",
    "tags": [
      "第6章 估计与检验",
      "迁移"
    ]
  },
  {
    "id": "pm2-pseudorandom-1",
    "chapter": "pm2-pseudorandom",
    "level": 1,
    "question": "第7章 伪随机数中，确定性生成器是什么？",
    "answer": "同一算法和种子产生同一序列，便于重放，也意味着普通生成器可预测。",
    "tags": [
      "第7章 伪随机数",
      "确定性生成器"
    ]
  },
  {
    "id": "pm2-pseudorandom-2",
    "chapter": "pm2-pseudorandom",
    "level": 2,
    "question": "种子与周期怎样连接？",
    "answer": "初始化内部状态；测试应记录种子，生产安全密钥不应使用可猜种子。 有限状态序列最终重复；周期长只是必要条件，不保证统计质量。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第7章 伪随机数",
      "机制"
    ]
  },
  {
    "id": "pm2-pseudorandom-3",
    "chapter": "pm2-pseudorandom",
    "level": 3,
    "question": "如何验证分布变换的边界？",
    "answer": "从均匀随机数构造目标分布，需处理离散精度、尾部和拒绝效率。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第7章 伪随机数",
      "边界"
    ]
  },
  {
    "id": "pm2-pseudorandom-4",
    "chapter": "pm2-pseudorandom",
    "level": 4,
    "question": "密码学随机在工程案例中如何验收？",
    "answer": "要求即使观察大量输出也难以预测后续值，接口和威胁模型不同于模拟PRNG。 游戏掉落可以用记录种子的普通PRNG重放争议局；密码重置令牌必须使用操作系统密码学随机源，且令牌还需足够熵、短时有效和一次性消费。把两个需求统一成一个random调用会同时伤害调试与安全。",
    "tags": [
      "第7章 伪随机数",
      "迁移"
    ]
  },
  {
    "id": "pm2-applications-1",
    "chapter": "pm2-applications",
    "level": 1,
    "question": "第8章 概率论的各类应用中，回归分析是什么？",
    "answer": "用条件均值描述输入与输出关系，残差结构决定线性模型是否可信。",
    "tags": [
      "第8章 概率论的各类应用",
      "回归分析"
    ]
  },
  {
    "id": "pm2-applications-2",
    "chapter": "pm2-applications",
    "level": 2,
    "question": "主成分分析与随机过程怎样连接？",
    "answer": "对协方差矩阵特征分解，选择最大方差方向进行旋转与降维。 按时间索引的一族随机变量，需要描述状态转移和跨时间依赖。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第8章 概率论的各类应用",
      "机制"
    ]
  },
  {
    "id": "pm2-applications-3",
    "chapter": "pm2-applications",
    "level": 3,
    "question": "如何验证卡尔曼滤波的边界？",
    "answer": "在线组合动态预测与带噪观测，以协方差权衡两类信息。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第8章 概率论的各类应用",
      "边界"
    ]
  },
  {
    "id": "pm2-applications-4",
    "chapter": "pm2-applications",
    "level": 4,
    "question": "信息熵在工程案例中如何验收？",
    "answer": "平均编码下限与不确定性度量，概率越均匀，熵通常越高。 位置融合系统用运动模型预测下一状态，再用GPS观测修正。GPS噪声变大时滤波器应更信任预测，模型不稳定时应更信任观测。协方差不是装饰参数，它决定增益；错误单位或未建模偏差会让估计看似平滑却系统性错误。",
    "tags": [
      "第8章 概率论的各类应用",
      "迁移"
    ]
  },
  {
    "id": "pm3-motivation-1",
    "chapter": "pm3-motivation",
    "level": 1,
    "question": "第0章 动机：空间想象与线性近似中，空间想象是什么？",
    "answer": "把多个数视为一个点或方向，关系、距离和变换因而可视化。",
    "tags": [
      "第0章 动机：空间想象与线性近似",
      "空间想象"
    ]
  },
  {
    "id": "pm3-motivation-2",
    "chapter": "pm3-motivation",
    "level": 2,
    "question": "向量表示与线性映射怎样连接？",
    "answer": "按固定顺序收集特征；每一维的语义、单位和基底必须明确。 保持加法与数乘的变换，可由矩阵统一表示并组合。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第0章 动机：空间想象与线性近似",
      "机制"
    ]
  },
  {
    "id": "pm3-motivation-3",
    "chapter": "pm3-motivation",
    "level": 3,
    "question": "如何验证线性近似的边界？",
    "answer": "在局部用切线或雅可比矩阵逼近非线性函数，误差随步长增大。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第0章 动机：空间想象与线性近似",
      "边界"
    ]
  },
  {
    "id": "pm3-motivation-4",
    "chapter": "pm3-motivation",
    "level": 4,
    "question": "数值证据在工程案例中如何验收？",
    "answer": "图形直觉、代数等式和程序计算相互检查，尤其关注尺度与舍入。 相机标定把三维点通过投影映射到像素。完整模型非线性，但在当前参数附近可以用雅可比预测微小参数调整如何改变重投影误差。迭代优化每步都依赖局部近似，步长过大会离开可信邻域。",
    "tags": [
      "第0章 动机：空间想象与线性近似",
      "迁移"
    ]
  },
  {
    "id": "pm3-vectors-matrices-determinants-1",
    "chapter": "pm3-vectors-matrices-determinants",
    "level": 1,
    "question": "第1章 用空间语言表达向量、矩阵和行列式中，基底是什么？",
    "answer": "一组线性无关且张成空间的向量，使每个向量拥有唯一坐标。",
    "tags": [
      "第1章 用空间语言表达向量、矩阵和行列式",
      "基底"
    ]
  },
  {
    "id": "pm3-vectors-matrices-determinants-2",
    "chapter": "pm3-vectors-matrices-determinants",
    "level": 2,
    "question": "坐标与矩阵映射怎样连接？",
    "answer": "向量相对指定基底的系数；换基改变坐标，不改变抽象向量。 矩阵列给出基向量的像，矩阵乘向量组合出任意输入的像。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第1章 用空间语言表达向量、矩阵和行列式",
      "机制"
    ]
  },
  {
    "id": "pm3-vectors-matrices-determinants-3",
    "chapter": "pm3-vectors-matrices-determinants",
    "level": 3,
    "question": "如何验证矩阵乘法的边界？",
    "answer": "右侧映射先作用，左侧映射后作用；通常不满足交换律。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第1章 用空间语言表达向量、矩阵和行列式",
      "边界"
    ]
  },
  {
    "id": "pm3-vectors-matrices-determinants-4",
    "chapter": "pm3-vectors-matrices-determinants",
    "level": 4,
    "question": "行列式在工程案例中如何验收？",
    "answer": "线性映射对有向面积或体积的缩放，零意味着维度被压扁。 二维场景节点的缩放、旋转和平移通常组合为齐次矩阵。组合顺序不可交换：先绕原点旋转再平移，与先平移再绕原点旋转得到不同轨迹。引擎应固定列向量或行向量约定，并在API名称中明确局部与世界空间。",
    "tags": [
      "第1章 用空间语言表达向量、矩阵和行列式",
      "迁移"
    ]
  },
  {
    "id": "pm3-rank-inverse-equations-1",
    "chapter": "pm3-rank-inverse-equations",
    "level": 1,
    "question": "第2章 秩、逆矩阵与线性方程组中，核空间是什么？",
    "answer": "被映射到零的输入方向；非零核表示不同输入可能产生同一输出。",
    "tags": [
      "第2章 秩、逆矩阵与线性方程组",
      "核空间"
    ]
  },
  {
    "id": "pm3-rank-inverse-equations-2",
    "chapter": "pm3-rank-inverse-equations",
    "level": 2,
    "question": "像空间与秩怎样连接？",
    "answer": "所有可达输出组成的子空间，维数就是矩阵秩。 独立列或独立行的数量，表示映射实际保留的独立信息维数。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第2章 秩、逆矩阵与线性方程组",
      "机制"
    ]
  },
  {
    "id": "pm3-rank-inverse-equations-3",
    "chapter": "pm3-rank-inverse-equations",
    "level": 3,
    "question": "如何验证逆矩阵的边界？",
    "answer": "撤销双射线性映射；存在性等价于方阵满秩和零核。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第2章 秩、逆矩阵与线性方程组",
      "边界"
    ]
  },
  {
    "id": "pm3-rank-inverse-equations-4",
    "chapter": "pm3-rank-inverse-equations",
    "level": 4,
    "question": "最小二乘与正则化在工程案例中如何验收？",
    "answer": "无精确解或病态时最小化残差，并用惩罚项限制不稳定方向。 传感器标定方程可能因两个特征几乎共线而近奇异。直接求逆会放大测量噪声；更稳妥的做法是用带主元分解求解，报告条件数，并在必要时增加独立观测或使用正则化，而不是把巨大系数当真实信号。",
    "tags": [
      "第2章 秩、逆矩阵与线性方程组",
      "迁移"
    ]
  },
  {
    "id": "pm3-lu-decomposition-1",
    "chapter": "pm3-lu-decomposition",
    "level": 1,
    "question": "第3章 计算机上的计算（一）：LU分解中，高斯消元是什么？",
    "answer": "用行操作逐列消去下方元素，把系统化为上三角形式。",
    "tags": [
      "第3章 计算机上的计算（一）：LU分解",
      "高斯消元"
    ]
  },
  {
    "id": "pm3-lu-decomposition-2",
    "chapter": "pm3-lu-decomposition",
    "level": 2,
    "question": "LU分解与前向后向代入怎样连接？",
    "answer": "把消元乘子存入L、消元结果存入U，复用一次消元过程。 三角系统按依赖顺序逐项求解，成本为平方量级。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第3章 计算机上的计算（一）：LU分解",
      "机制"
    ]
  },
  {
    "id": "pm3-lu-decomposition-3",
    "chapter": "pm3-lu-decomposition",
    "level": 3,
    "question": "如何验证部分主元的边界？",
    "answer": "每列选择绝对值较大的候选行交换到主元位置，避免除零并降低误差。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第3章 计算机上的计算（一）：LU分解",
      "边界"
    ]
  },
  {
    "id": "pm3-lu-decomposition-4",
    "chapter": "pm3-lu-decomposition",
    "level": 4,
    "question": "残差在工程案例中如何验收？",
    "answer": "用b减Ax检查方程满足程度；小残差仍需结合条件数判断解误差。 电路仿真每个时间步可能共享同一拓扑矩阵却有不同激励向量。缓存带主元的LU分解能显著减少重复工作，但只在矩阵未变时有效；元件状态改变后必须失效缓存，并记录残差监控数值退化。",
    "tags": [
      "第3章 计算机上的计算（一）：LU分解",
      "迁移"
    ]
  },
  {
    "id": "pm3-eigenvalues-jordan-1",
    "chapter": "pm3-eigenvalues-jordan",
    "level": 1,
    "question": "第4章 特征值、对角化与Jordan标准形中，特征值是什么？",
    "answer": "沿某特殊方向的缩放因子，可能为复数并控制迭代增长或旋转。",
    "tags": [
      "第4章 特征值、对角化与Jordan标准形",
      "特征值"
    ]
  },
  {
    "id": "pm3-eigenvalues-jordan-2",
    "chapter": "pm3-eigenvalues-jordan",
    "level": 2,
    "question": "特征向量与对角化怎样连接？",
    "answer": "非零且映射后方向保持的向量，为系统提供自然坐标轴。 拥有足够独立特征向量时换基到特征坐标，使矩阵变成对角。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第4章 特征值、对角化与Jordan标准形",
      "机制"
    ]
  },
  {
    "id": "pm3-eigenvalues-jordan-3",
    "chapter": "pm3-eigenvalues-jordan",
    "level": 3,
    "question": "如何验证稳定性的边界？",
    "answer": "离散迭代中所有特征值模小于1通常衰减，大于1的模式会增长。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第4章 特征值、对角化与Jordan标准形",
      "边界"
    ]
  },
  {
    "id": "pm3-eigenvalues-jordan-4",
    "chapter": "pm3-eigenvalues-jordan",
    "level": 4,
    "question": "Jordan标准形在工程案例中如何验收？",
    "answer": "特征向量不足时用广义特征向量形成块，幂中出现n等多项式因子。 推荐系统的状态更新若每轮乘转移矩阵，最大特征值和对应向量决定长期分布。归一化可防数值发散，但若矩阵随时间变化或存在多个单位模模式，单一稳态解释不再成立，必须检查谱间隙和周期性。",
    "tags": [
      "第4章 特征值、对角化与Jordan标准形",
      "迁移"
    ]
  },
  {
    "id": "pm3-numerical-eigenvalues-1",
    "chapter": "pm3-numerical-eigenvalues",
    "level": 1,
    "question": "第5章 计算机上的计算（二）：特征值算法中，幂法是什么？",
    "answer": "重复乘矩阵并归一化，在主特征值唯一且初始向量有投影时收敛。",
    "tags": [
      "第5章 计算机上的计算（二）：特征值算法",
      "幂法"
    ]
  },
  {
    "id": "pm3-numerical-eigenvalues-2",
    "chapter": "pm3-numerical-eigenvalues",
    "level": 2,
    "question": "Rayleigh商与QR分解怎样连接？",
    "answer": "用v转置Av除以v转置v估计与v对应的特征值。 把矩阵分成正交Q与上三角R，为稳定迭代和最小二乘提供基础。 两者必须共享输入域、单位和表示约定。",
    "tags": [
      "第5章 计算机上的计算（二）：特征值算法",
      "机制"
    ]
  },
  {
    "id": "pm3-numerical-eigenvalues-3",
    "chapter": "pm3-numerical-eigenvalues",
    "level": 3,
    "question": "如何验证QR迭代的边界？",
    "answer": "反复QR分解并交换RQ，保持相似性并趋向上三角或准上三角。 使用正常、零值、非法和退化输入，并以推导、残差或频率解释结果。",
    "tags": [
      "第5章 计算机上的计算（二）：特征值算法",
      "边界"
    ]
  },
  {
    "id": "pm3-numerical-eigenvalues-4",
    "chapter": "pm3-numerical-eigenvalues",
    "level": 4,
    "question": "特征残差在工程案例中如何验收？",
    "answer": "范数Av减lambda v直接衡量特征对满足程度，是停止与验收证据。 主成分分析不应显式构造巨大稠密协方差矩阵再求全部谱。若只需前几个方向，可对中心化数据使用迭代SVD或随机方法；验收要报告解释方差、正交误差、残差和不同种子的稳定性。",
    "tags": [
      "第5章 计算机上的计算（二）：特征值算法",
      "迁移"
    ]
  }
];
