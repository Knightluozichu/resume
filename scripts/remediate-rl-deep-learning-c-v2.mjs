import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BOOK = "rl-deep-learning-c";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(
  ROOT,
  "src/components/mdx/rl-deep-learning-c/v2",
);
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/rl-deep-learning-c-v2-profiles.json",
);

const SOURCES = {
  official: "https://www.ohmsha.co.jp/book/9784274221149.html",
  chineseCatalog: "https://www.tenlong.com.tw/products/9787111627180",
  bibliography: "https://ci.nii.ac.jp/ncid/BB24695247",
  reinforcementLearning: "http://incompleteideas.net/book/the-book-2nd.html",
  deepLearning: "https://www.deeplearningbook.org/",
};

const OUTLINES = {
  "rlc-01": [
    ["第1章 強化学習と深層学習", "第1章 强化学习与深度学习"],
    ["1.1 機械学習と強化学習", "1.1 机器学习与强化学习"],
    ["1.1.1 人工知能", "1.1.1 人工智能"],
    ["1.1.2 機械学習", "1.1.2 机器学习"],
    ["1.1.3 強化学習", "1.1.3 强化学习"],
    ["1.2 深層学習とは", "1.2 什么是深度学习"],
    ["1.2.1 ニューラルネット", "1.2.1 神经网络"],
    ["1.2.2 深層学習の登場", "1.2.2 深度学习的出现"],
    ["1.3 深層強化学習とは", "1.3 什么是深度强化学习"],
    ["1.3.1 強化学習と深層学習", "1.3.1 强化学习与深度学习"],
    ["1.3.2 深層強化学習の実現", "1.3.2 深度强化学习的实现"],
    [
      "1.3.3 基本的な機械学習システムの構築例―例題プログラムの実行方法―",
      "1.3.3 基础机器学习系统示例：示例程序运行方法",
    ],
  ],
  "rlc-02": [
    ["第2章 強化学習の実装", "第2章 强化学习的实现"],
    ["2.1 強化学習とQ学習", "2.1 强化学习与 Q 学习"],
    ["2.1.1 強化学習の考え方", "2.1.1 强化学习的思路"],
    ["2.1.2 Q学習のアルゴリズム", "2.1.2 Q 学习算法"],
    ["2.2 Q学習の実装", "2.2 Q 学习的实现"],
    ["2.2.1 q21.cプログラムの実装", "2.2.1 q21.c 程序实现"],
    [
      "2.2.2 例題（2） ゴールを見つける学習プログラム",
      "2.2.2 例题二：寻找目标的学习程序",
    ],
  ],
  "rlc-03": [
    ["第3章 深層学習の技術", "第3章 深度学习技术"],
    ["3.1 深層学習を実現する技術", "3.1 实现深度学习的技术"],
    [
      "3.1.1 ニューロンの働きと階層型ニューラルネット",
      "3.1.1 神经元的作用与分层神经网络",
    ],
    ["3.1.2 階層型ニューラルネットの学習", "3.1.2 分层神经网络的学习"],
    [
      "3.1.3 階層型ニューラルネットの学習プログラム（1）ニューロン単体の学習プログラムnn1.c",
      "3.1.3 分层网络学习程序一：单神经元程序 nn1.c",
    ],
    [
      "3.1.4 階層型ニューラルネットの学習プログラム（2）バックプロパゲーションによるネットワーク学習プログラムnn2.c",
      "3.1.4 分层网络学习程序二：反向传播程序 nn2.c",
    ],
    [
      "3.1.5 階層型ニューラルネットの学習プログラム（3）複数出力を有するネットワークの学習プログラムnn3.c",
      "3.1.5 分层网络学习程序三：多输出程序 nn3.c",
    ],
    ["3.2 畳み込みニューラルネットによる学習", "3.2 使用卷积神经网络学习"],
    ["3.2.1 畳み込みニューラルネットのアルゴリズム", "3.2.1 卷积神经网络算法"],
    ["3.2.2 畳み込みニューラルネットの実装", "3.2.2 卷积神经网络的实现"],
  ],
  "rlc-04": [
    ["第4章 深層強化学習", "第4章 深度强化学习"],
    [
      "4.1 強化学習と深層学習の融合による深層強化学習の実現",
      "4.1 融合强化学习与深度学习",
    ],
    ["4.1.1 Q学習へのニューラルネットの適用", "4.1.1 把神经网络用于 Q 学习"],
    ["4.1.2 Q学習とニューラルネットの融合", "4.1.2 Q 学习与神经网络的融合"],
    ["4.2 深層強化学習の実装", "4.2 深度强化学习的实现"],
    [
      "4.2.1 枝分かれした迷路を抜ける深層強化学習プログラムq21dl.c",
      "4.2.1 分支迷宫深度强化学习程序 q21dl.c",
    ],
    [
      "4.2.2 ゴールを見つける深層学習プログラムq22dl.c",
      "4.2.2 寻找目标的深度学习程序 q22dl.c",
    ],
  ],
};

const CHAPTER_LABELS = [
  "第1章 强化学习与深度学习",
  "第2章 强化学习的实现",
  "第3章 深度学习技术",
  "第4章 深度强化学习",
];

const profiles = [
  {
    chapterPath: "00-learning-map/rlc-official-learning-map",
    componentBase: "RlcOfficialLearningMap",
    title: "《强化学习与深度学习：C语言模拟》学习地图",
    section: "学习地图",
    order: 0,
    role: "map",
    officialUnitId: null,
    description:
      "以环境、Q 更新、网络训练和深度强化学习融合四条实现链重建原书 36 个正式目录节点。",
    question:
      "怎样把四章排成一条能运行、能定位首个错误状态、又不越过 2017 年原书边界的学习路径？",
    duty: "先冻结目录、代码来源和评价边界，再把每章交付物接成同一条可重放证据链。",
    thesis:
      "学习顺序应从环境转移与表格型 Q 更新开始，再进入神经网络前向与反向，最后才把 Q 目标送入函数近似器。",
    formula:
      "transition → TD target → Q update → network target → frozen evaluation",
    terms: [
      ["状态合同", "状态编号、可行动作和终止标记的共同约束。"],
      ["转移记录", "一次状态、动作、奖励、下一状态和终止标记。"],
      ["Q 值", "给定状态下选择某动作的长期回报估计。"],
      ["函数近似", "用有限参数模型近似大量状态动作价值。"],
      ["训练轨迹", "从初值到参数更新的有序中间状态。"],
      ["冻结评价", "关闭探索与参数更新后的独立运行。"],
    ],
    assumptions: [
      "官方页面只用于核定 2017 年版的四章与 36 个正式节点",
      "购书者限定的示例压缩包不进入仓库，也不作为页面代码来源",
      "四章使用同一套状态、动作、终止和随机种子合同",
      "评价阶段不更新 Q 表、网络权重或探索率",
    ],
    concepts: CHAPTER_LABELS,
    stages: [
      {
        label: "环境与状态",
        contract: "固定状态编号、合法动作、转移函数、奖励和终止条件。",
        evidence: "保存同一状态动作的下一状态、奖励、终止标记与随机种子。",
      },
      {
        label: "表格型 Q 学习",
        contract: "旧 Q、TD 目标与新 Q 分开存放，终止状态未来价值为零。",
        evidence: "手算一次更新并逐项对照数组索引、学习率和折扣因子。",
      },
      {
        label: "神经网络学习",
        contract: "声明各层尺寸、激活、偏置与权重更新次序。",
        evidence: "保存前向激活、局部误差、一个权重的数值梯度检查。",
      },
      {
        label: "融合与评价",
        contract: "目标向量只替换被选动作；评价关闭探索和学习。",
        evidence: "对照表格基线、融合训练与冻结评价的三条轨迹。",
      },
    ],
    normalTrace: [
      "固定迷宫、随机种子和所有数组初值。",
      "重放一个终止前转移并手算 TD 目标。",
      "把所选动作目标送入网络，保留其他动作当前预测。",
      "冻结参数执行评价，核对轨迹可重复。",
    ],
    failureTrace: [
      "沿用上一轮隐藏状态或未初始化数组。",
      "终止状态仍读取下一状态价值。",
      "网络目标覆盖所有动作输出。",
      "评价继续探索和更新，结果无法比较。",
    ],
    invariant:
      "相同初值和随机序列必须得到相同的状态、目标、参数更新与评价轨迹。",
    artifact:
      "四章目录映射、状态转移表、一次 Q 更新、一次前向反向记录、融合目标向量和冻结评价日志。",
    fault: "让评价阶段继续写入参数",
    trap: "把现代 DQN 的经验回放、目标网络或策略梯度倒填成原书内容。",
    caseStudy:
      "以一个固定小迷宫贯穿四章：先列出状态动作表，再手算 Q 更新，随后用小网络近似同一 Q 值，最后比较冻结评价轨迹。",
    code: String.raw`typedef struct {
    int state;
    int action;
    double reward;
    int next_state;
    int done;
} Transition;`,
    exercises: [
      [
        "为什么学习地图必须先固定终止状态语义？",
        "因为表格更新和网络目标都依赖是否继续自举；终止语义漂移会同时污染第二章和第四章。",
      ],
      [
        "哪些现代算法只能作为扩展边界出现？",
        "经验回放、目标网络、策略梯度等不在官方四章目录中，只能明确标成后续扩展。",
      ],
      [
        "整书最小验收包包含什么？",
        "目录映射、输入合同、正常与失败轨迹、复位结果、手算值、参数变化和冻结评价日志。",
      ],
    ],
  },
  {
    chapterPath: "01-rl-deep-learning/rlc-01-rl-deep-learning",
    componentBase: "Rlc01RlDeepLearning",
    title: "第1章：强化学习与深度学习",
    section: "第1章 强化学习与深度学习",
    order: 1,
    role: "chapter",
    officialUnitId: "rlc-01",
    description:
      "区分人工智能、机器学习、强化学习与深度学习，并用回报、Q 值和函数近似建立共同接口。",
    question:
      "深度学习在强化学习中究竟替代了什么，又有哪些目标和边界完全没有改变？",
    duty: "把术语层级落实为状态、动作、奖励、回报与函数近似器之间的可检查接口。",
    thesis:
      "深度网络替代表格的存储方式，但不会替代环境、奖励、策略或最大化累计回报的学习目标。",
    formula: "G_t = Σ γ^k r_(t+k+1); Q(s,a) ≈ f_θ(s)_a",
    terms: [
      ["智能体", "观察状态、选择动作并接收奖励的学习主体。"],
      ["环境", "根据状态动作产生下一状态、奖励和终止信号的系统。"],
      ["回报", "从当前时刻起折扣累计的未来奖励。"],
      ["策略", "从状态到动作选择概率或规则的映射。"],
      ["价值函数", "对未来回报期望的估计。"],
      ["深度函数近似", "用多层网络参数表示状态动作价值。"],
    ],
    assumptions: [
      "折扣因子在零到一的闭区间内",
      "状态、动作、奖励和终止标记含义固定",
      "表格与网络比较使用同一任务和评价轨迹",
      "神经网络只承担函数近似，不改写强化学习目标",
    ],
    concepts: OUTLINES["rlc-01"].map((entry) => entry[1]),
    stages: [
      {
        label: "定义任务",
        contract: "声明智能体、环境、状态、动作、奖励和 episode 终止条件。",
        evidence: "给出一个完整转移记录并解释每个字段。",
      },
      {
        label: "计算回报",
        contract: "明确折扣方向和奖励时间下标，不把即时奖励等同长期回报。",
        evidence: "对三步轨迹手算折扣回报并核对边界值。",
      },
      {
        label: "选择表示",
        contract: "小空间用 Q 表，大空间用参数模型近似同一 Q(s,a)。",
        evidence: "比较参数数量、可泛化性和近似误差，不声称网络天然更准确。",
      },
    ],
    normalTrace: [
      "环境返回下一状态、即时奖励和终止标记。",
      "智能体把奖励放入回报或 TD 目标。",
      "Q 表或网络输出表示同一个状态动作价值。",
      "策略依据当前价值选择下一动作。",
    ],
    failureTrace: [
      "把监督学习标签误当作环境奖励。",
      "把单步奖励误当作整个 episode 回报。",
      "用不同任务比较表格和网络。",
      "宣称增加网络层数会自动改变强化学习目标。",
    ],
    invariant:
      "无论使用表格还是网络，环境转移、奖励语义与最大化期望回报的目标保持不变。",
    artifact:
      "术语边界图、三步回报手算、同任务的表格与网络接口、状态动作尺寸和冻结评价记录。",
    fault: "把网络预测误写成环境奖励",
    trap: "把“深度”当作新的强化学习目标，忽略它只是价值或策略的参数化方式。",
    caseStudy:
      "对四状态两动作迷宫同时建立 4×2 的 Q 表和输入四维、输出二维的小网络；比较两者接收同一状态、返回同一动作价值接口的方式。",
    code: String.raw`double discounted_return(const double reward[], int length, double gamma) {
    double value = 0.0;
    for (int i = length - 1; i >= 0; --i) {
        value = reward[i] + gamma * value;
    }
    return value;
}`,
    exercises: [
      [
        "三步奖励为 0、0、1，折扣因子为 0.9，起点回报是多少？",
        "起点回报为 0.9 的平方，即 0.81。",
      ],
      [
        "表格型 Q 与网络 Q 的共同接口是什么？",
        "输入状态并为每个合法动作给出价值估计；差别在存储与泛化方式。",
      ],
      [
        "什么证据能推翻“网络一定优于表格”？",
        "在小状态空间中若表格精确收敛，而网络存在近似误差或训练不稳定，该强结论即不成立。",
      ],
    ],
  },
  {
    chapterPath:
      "02-reinforcement-implementation/rlc-02-reinforcement-implementation",
    componentBase: "Rlc02ReinforcementImplementation",
    title: "第2章：强化学习的实现",
    section: "第2章 强化学习的实现",
    order: 2,
    role: "chapter",
    officialUnitId: "rlc-02",
    description:
      "把 Q 学习写成可手算、可重放的 C 循环，明确探索、合法动作和终止状态的更新边界。",
    question:
      "怎样证明一次 Q 更新使用的是旧值、合法动作和正确的终止语义，而不是“看起来收敛”的偶然运行？",
    duty: "为 q21.c 类迷宫程序建立数组、动作掩码、TD 目标和 episode 生命周期的完整合同。",
    thesis:
      "可靠的 Q 学习实现必须保存更新前值和 TD 目标，并在终止转移切断未来价值。",
    formula: "target = r + (done ? 0 : γ max_a Q[next][a]); Q += α(target - Q)",
    terms: [
      ["Q 学习", "用下一个状态最大动作价值构造目标的离策略 TD 方法。"],
      ["TD 目标", "即时奖励与折扣后的下一状态价值之和。"],
      ["TD 误差", "TD 目标减去更新前状态动作价值。"],
      ["探索利用", "在尝试未知动作与选择当前最优动作之间取舍。"],
      ["合法动作掩码", "限定状态下允许进入最大值与采样的动作集合。"],
      ["终止自举", "终止状态错误地继续加入未来价值的缺陷。"],
    ],
    assumptions: [
      "Q 表尺寸覆盖全部状态与动作编号",
      "最大值和随机探索只遍历合法动作",
      "计算目标时读取更新前的 Q 表快照",
      "终止转移的下一状态价值固定为零",
    ],
    concepts: OUTLINES["rlc-02"].map((entry) => entry[1]),
    stages: [
      {
        label: "采样转移",
        contract: "环境独立返回状态、动作、奖励、下一状态和终止标记。",
        evidence: "保存固定种子下的动作来源、合法动作集和转移五元组。",
      },
      {
        label: "计算目标",
        contract: "非终止时只在下一状态合法动作中取最大值，终止时未来项为零。",
        evidence: "记录即时奖励、下一状态最大值、折扣和完整 TD 目标。",
      },
      {
        label: "原位更新",
        contract: "先保存旧 Q，再计算误差，最后只写一个状态动作单元。",
        evidence: "输出旧值、目标、误差和新值，验证其他单元未变化。",
      },
    ],
    normalTrace: [
      "从状态二按固定种子选择合法动作一。",
      "环境返回奖励零、下一状态三、未终止。",
      "用下一状态合法动作最大值构造 TD 目标。",
      "只更新 Q[2][1] 并保存前后值。",
    ],
    failureTrace: [
      "argmax 读入墙体对应的非法动作。",
      "终止状态仍读取未初始化的下一状态 Q。",
      "原位更新后的值被同一步再次用于目标。",
      "累计奖励上升掩盖了单元级错误。",
    ],
    invariant:
      "一次转移只允许一个 Q 单元变化，且终止转移的目标不包含任何下一状态价值。",
    artifact:
      "固定种子、合法动作列表、转移五元组、旧 Q、TD 目标、TD 误差、新 Q 和终止分支日志。",
    fault: "终止状态继续自举下一状态价值",
    trap: "只看最终找到目标，不核对非法动作、更新前值和终止分支。",
    caseStudy:
      "令旧 Q 为 0.4、奖励为 1、学习率为 0.5；终止转移的目标是 1，新 Q 为 0.7。若误加下一状态垃圾值，第一处偏差就在目标计算。",
    code: String.raw`double q_update(double old_q, double reward, double next_max,
                double alpha, double gamma, int done) {
    const double target = reward + (done ? 0.0 : gamma * next_max);
    return old_q + alpha * (target - old_q);
}`,
    exercises: [
      [
        "旧 Q 为 0.4、奖励为 1、学习率为 0.5 且已终止，新 Q 是多少？",
        "目标为 1，误差为 0.6，新 Q 为 0.4 加 0.5 乘 0.6，即 0.7。",
      ],
      [
        "为什么 argmax 必须使用合法动作掩码？",
        "非法动作的默认值可能被误选为最大值，从而污染目标和策略。",
      ],
      [
        "怎样确认评价没有继续学习？",
        "评价前后比较 Q 表字节或哈希，并关闭探索与更新分支。",
      ],
    ],
  },
  {
    chapterPath: "03-deep-learning-techniques/rlc-03-deep-learning-techniques",
    componentBase: "Rlc03DeepLearningTechniques",
    title: "第3章：深度学习技术",
    section: "第3章 深度学习技术",
    order: 3,
    role: "chapter",
    officialUnitId: "rlc-03",
    description:
      "从单神经元、分层网络、反向传播到卷积，逐项保存张量尺寸、激活、局部误差和参数更新证据。",
    question:
      "没有自动微分和张量框架时，怎样证明 C 数组中的每个前向值与反向梯度都对应正确的节点？",
    duty: "为 nn1.c、nn2.c、nn3.c 与卷积小程序建立层尺寸、索引和更新顺序的可重放合同。",
    thesis:
      "反向传播的可靠性来自明确尺寸、更新前权重和数值梯度检查，而不是训练轮数增加后损失下降。",
    formula: "z_j = Σ_i w_ji x_i + b_j; δ_hidden = f'(z) Σ_k w_kj δ_k",
    terms: [
      ["加权和", "输入乘权重并加偏置得到的激活前值。"],
      ["激活函数", "把加权和映射为神经元输出的非线性函数。"],
      ["局部误差", "损失对某层加权和的偏导。"],
      ["反向传播", "按链式法则从输出层向输入层传播梯度。"],
      ["梯度检查", "用有限差分近似与解析梯度对照。"],
      ["卷积窗口", "在局部输入区域复用同一组核参数的计算区域。"],
    ],
    assumptions: [
      "每层输入输出长度和内存布局明确",
      "偏置在每个输出神经元上只加一次",
      "隐藏层误差使用更新前的下一层权重",
      "卷积声明步幅、边界和输出尺寸约定",
    ],
    concepts: OUTLINES["rlc-03"].map((entry) => entry[1]),
    stages: [
      {
        label: "前向传播",
        contract: "逐层计算加权和与激活，索引顺序和层尺寸固定。",
        evidence: "保存一个样本的每层 z、激活值和输出。",
      },
      {
        label: "反向传播",
        contract:
          "先完成所有局部误差，再统一更新参数，避免新权重泄漏到旧梯度。",
        evidence: "保存输出误差、隐藏误差和更新前后一个权重。",
      },
      {
        label: "卷积计算",
        contract: "固定输入布局、核方向、步幅、填充与输出尺寸。",
        evidence: "手算一个窗口并与循环输出逐元素比较。",
      },
    ],
    normalTrace: [
      "固定两输入、一个隐藏层和目标输出。",
      "保存各层加权和与激活。",
      "用更新前权重传播隐藏层误差。",
      "统一更新参数并执行有限差分检查。",
    ],
    failureTrace: [
      "输入与权重数组的主次序不一致。",
      "偏置在输入循环内被重复添加。",
      "先更新输出权重再计算隐藏误差。",
      "只看总损失下降，不检查单个梯度。",
    ],
    invariant:
      "同一输入和参数快照必须产生相同激活与梯度；解析梯度应在容差内匹配有限差分。",
    artifact:
      "层尺寸表、前向激活、输出和隐藏局部误差、更新前参数、有限差分结果与卷积窗口手算。",
    fault: "用已经更新的输出层权重传播隐藏层误差",
    trap: "把损失下降当作索引和梯度都正确的充分证明。",
    caseStudy:
      "为二输入、二隐藏单元、一输出的网络固定参数，先手算一个前向值，再对单个权重做中心有限差分；若两种梯度方向相反，立即停止训练。",
    code: String.raw`double neuron(const double input[], const double weight[],
              int length, double bias) {
    double sum = bias;
    for (int i = 0; i < length; ++i) {
        sum += input[i] * weight[i];
    }
    return sum > 0.0 ? sum : 0.0;
}`,
    exercises: [
      [
        "为什么隐藏层误差必须使用更新前权重？",
        "链式法则针对同一参数快照；混入新权重会让梯度不再对应当前损失。",
      ],
      [
        "中心有限差分怎样检查一个权重？",
        "分别把权重加减很小的量，计算两次损失之差再除以两倍步长，与解析梯度比较。",
      ],
      [
        "卷积输出尺寸必须声明哪些约定？",
        "输入尺寸、核尺寸、步幅、填充和边界处理。",
      ],
    ],
  },
  {
    chapterPath:
      "04-deep-reinforcement-learning/rlc-04-deep-reinforcement-learning",
    componentBase: "Rlc04DeepReinforcementLearning",
    title: "第4章：深度强化学习",
    section: "第4章 深度强化学习",
    order: 4,
    role: "chapter",
    officialUnitId: "rlc-04",
    description:
      "把 Q 学习的 TD 目标接入多输出神经网络，区分状态编码、动作输出、目标向量和冻结评价。",
    question:
      "把 Q 表换成网络后，怎样只训练被选动作，又不破坏其他动作当前估计和终止状态边界？",
    duty: "为 q21dl.c 与 q22dl.c 类程序定义网络输入、动作输出、TD 目标向量和训练评价分离。",
    thesis:
      "融合的关键是先复制当前网络输出，再只替换被选动作的 TD 目标；终止时仍必须切断未来价值。",
    formula:
      "target[:] = Q_θ(s,:); target[action] = r + (done ? 0 : γ max Q_θ(next,:))",
    terms: [
      ["状态编码", "把环境状态转换为网络输入向量的确定规则。"],
      ["动作输出", "网络为每个合法动作给出的独立价值估计。"],
      ["目标向量", "保留未选动作预测、只替换所选动作目标的训练标签。"],
      ["函数近似误差", "网络预测与 TD 目标之间的差。"],
      ["训练模式", "允许探索、计算梯度并更新参数的运行阶段。"],
      ["评价模式", "冻结探索与参数，只观察策略行为的阶段。"],
    ],
    assumptions: [
      "输入向量与状态编号存在唯一映射",
      "输出节点次序与动作编号和合法动作集合一致",
      "目标向量先复制当前输出再替换所选动作",
      "评价阶段冻结探索和所有参数更新",
    ],
    concepts: OUTLINES["rlc-04"].map((entry) => entry[1]),
    stages: [
      {
        label: "编码状态",
        contract: "状态编号稳定映射为固定长度输入，训练与评价共用同一编码。",
        evidence: "保存原状态、输入向量和动作输出次序。",
      },
      {
        label: "构造 TD 目标",
        contract: "终止时未来值为零，非终止时只在合法动作输出中取最大值。",
        evidence: "记录当前输出、下一状态输出、动作掩码和标量 TD 目标。",
      },
      {
        label: "训练所选动作",
        contract: "先复制全部当前输出，只替换所选动作位置，再反向传播。",
        evidence: "比较目标向量与原输出，确认只有一个元素改变。",
      },
      {
        label: "冻结评价",
        contract: "关闭随机探索、梯度和权重写入，从固定初态重放。",
        evidence: "保存评价前后参数哈希和完整动作轨迹。",
      },
    ],
    normalTrace: [
      "把状态二编码为固定输入向量。",
      "网络输出三个动作的当前 Q 估计。",
      "复制输出并只替换实际动作的 TD 目标。",
      "训练一次后冻结参数，从固定初态评价。",
    ],
    failureTrace: [
      "训练与评价使用不同状态编码。",
      "把非法动作输出加入下一状态最大值。",
      "用同一个 TD 标量覆盖全部动作目标。",
      "评价仍随机探索并更新参数。",
    ],
    invariant:
      "单次转移的目标向量只有所选动作位置允许变化，评价前后参数必须逐字节一致。",
    artifact:
      "状态编码、当前与下一状态输出、合法动作掩码、目标向量差异、梯度更新和评价前后参数哈希。",
    fault: "用一个 TD 目标覆盖全部动作输出",
    trap: "把一个小迷宫的成功运行外推为现代 DQN 的稳定性结论。",
    caseStudy:
      "若网络当前输出为 [0.2, 0.4, 0.1]，选择动作一且 TD 目标为 0.7，则训练目标应为 [0.2, 0.7, 0.1]，而不是三个位置都写 0.7。",
    code: String.raw`void make_target(const double prediction[], double target[],
                 int actions, int chosen, double td_target) {
    for (int a = 0; a < actions; ++a) {
        target[a] = prediction[a];
    }
    target[chosen] = td_target;
}`,
    exercises: [
      [
        "当前输出为 [0.2, 0.4, 0.1]，动作一的 TD 目标是 0.7，目标向量是什么？",
        "目标向量为 [0.2, 0.7, 0.1]，其他动作保持当前预测。",
      ],
      [
        "为什么评价要比较参数哈希？",
        "它能直接证明评价路径没有悄悄写入权重，而不只依赖代码审阅。",
      ],
      [
        "哪些结论不能从本章小迷宫直接推出？",
        "不能推出大规模深度强化学习的样本效率、稳定性或现代 DQN 改进效果。",
      ],
    ],
  },
  {
    chapterPath: "05-final-review/rlc-official-final-review",
    componentBase: "RlcOfficialFinalReview",
    title: "《强化学习与深度学习：C语言模拟》总复习",
    section: "总复习",
    order: 5,
    role: "review",
    officialUnitId: null,
    description:
      "用一个固定迷宫串联四章，复核 36 个目录节点、C 数组合同、故障注入与冻结评价。",
    question:
      "怎样用一份证据包证明四章不是分别背过，而是能在同一任务上从环境追到参数更新和评价结果？",
    duty: "把全书压缩成基线、故障、恢复和复位四条轨迹，要求每个结论都能定位到中间状态。",
    thesis:
      "总复习不以最终累计奖励验收，而以同一输入能否重放状态、TD 目标、网络梯度和冻结评价为准。",
    formula:
      "replay = initial state + random sequence + transition + target + update + frozen evaluation",
    terms: [
      ["基线轨迹", "在无故障且初值固定时保存的完整执行链。"],
      ["故障轨迹", "只改变一个前提后保存的首个分岔。"],
      ["恢复轨迹", "修复故障后重放并回到基线的记录。"],
      ["状态哈希", "检查表格、参数或缓存是否被意外写入的摘要。"],
      ["最小反例", "保留其余条件，仅让一条假设失效的输入。"],
      ["独立复核", "未参与实现的人按记录重现实验并得到相同结论。"],
    ],
    assumptions: [
      "四章使用同一个迷宫、状态编号和动作编号",
      "所有随机选择由保存的种子或随机序列驱动",
      "每个故障实验只删除一条前提",
      "复位必须同时恢复输入、表格、权重、轨迹和模式开关",
    ],
    concepts: CHAPTER_LABELS,
    stages: [
      {
        label: "基线",
        contract: "从零初始化环境、Q 表、网络和随机数状态。",
        evidence: "保存四章共同输入和一次完整训练评价轨迹。",
      },
      {
        label: "故障",
        contract: "一次只启用一个错误：越界、终止自举、梯度快照或评价写入。",
        evidence: "定位首个不同的数组元素、目标值或参数字节。",
      },
      {
        label: "恢复",
        contract: "修正缺陷后从相同初值和随机序列重放。",
        evidence: "比较基线与恢复轨迹，确认差异消失而非被后续训练掩盖。",
      },
      {
        label: "复位",
        contract: "清除所有交互状态并回到同一初始快照。",
        evidence: "初值哈希、首个转移和首个网络输出与基线一致。",
      },
    ],
    normalTrace: [
      "读取固定迷宫并验证合法动作表。",
      "手算并执行一个非终止和一个终止 Q 更新。",
      "对一个网络权重完成解析梯度与有限差分对照。",
      "构造单动作目标向量并冻结评价。",
    ],
    failureTrace: [
      "状态编号越界但最终仍偶然到达目标。",
      "终止自举让 TD 目标从第一步就偏离。",
      "更新后权重进入同一步隐藏层梯度。",
      "评价继续学习使两次运行不可比较。",
    ],
    invariant:
      "重置后首个状态、首个 TD 目标、首个网络输出和评价参数哈希必须与基线完全一致。",
    artifact:
      "36 节点清单、编译告警、数组断言、两次手算更新、梯度检查、目标向量差异、参数哈希和四条轨迹。",
    fault: "只恢复界面选择，不恢复 Q 表和网络参数",
    trap: "把最终成功率当作全部证据，忽略中间状态从第一步已经错误。",
    caseStudy:
      "对同一固定迷宫依次注入非法动作、终止自举、更新后权重传播和评价写入四类故障；每次只保留首个分岔，修复后从同一快照重放。",
    code: String.raw`int same_snapshot(const double before[], const double after[], int length) {
    for (int i = 0; i < length; ++i) {
        if (before[i] != after[i]) return 0;
    }
    return 1;
}`,
    exercises: [
      [
        "为什么最终到达目标不能证明实现正确？",
        "越界、非法动作或评价写入可能被后续更新偶然掩盖，必须检查首个中间分岔。",
      ],
      [
        "复位要恢复哪些状态？",
        "环境、随机数、Q 表、网络参数、轨迹、探索率、学习开关和界面选择。",
      ],
      [
        "独立复核者应按什么顺序运行？",
        "先盲跑基线，再注入一个故障，修复后重放恢复轨迹，最后执行复位一致性检查。",
      ],
    ],
  },
];

const formalNodes = Object.values(OUTLINES).reduce(
  (sum, entries) => sum + entries.length,
  0,
);
if (formalNodes !== 36) {
  throw new Error(`正式目录节点应为 36，实际为 ${formalNodes}`);
}

function quote(value) {
  return JSON.stringify(value);
}

function termsBlock(profile) {
  return profile.terms
    .map(
      ([term, definition]) =>
        `- <Term def=${quote(definition)}>${term}</Term>：${definition}`,
    )
    .join("\n");
}

function glossaryBlock(profile) {
  return profile.terms
    .map(
      ([term, definition]) =>
        `<GlossaryItem term=${quote(term)}>${definition}</GlossaryItem>`,
    )
    .join("\n");
}

function outlineBlock(profile) {
  return profile.concepts
    .map(
      (concept, index) => `### ${concept}

**目录映射 ${index + 1}/${profile.concepts.length}。** ${concept}在“${profile.title}”中承担${profile.duty}的一个明确节点。复核时先指出它读取的输入和允许改变的状态，再用“${profile.invariant}”核对结果；不能把目录标题本身当作技术结论。`,
    )
    .join("\n\n");
}

function exercisesBlock(profile) {
  return profile.exercises
    .map(
      ([question, answer], index) => `**问题 ${index + 1}：** ${question}

<Answer>

${answer}

</Answer>`,
    )
    .join("\n\n");
}

function frontmatter(profile) {
  return {
    title: profile.title,
    type: "C",
    section: profile.section,
    order: profile.order,
    description: profile.description,
    demo: true,
    math: true,
    sourceUrl: SOURCES.official,
    draft: false,
    qualityVersion: 2,
    practiceMode: "calculation",
    sourceMode: "independent-rewrite",
    ...(profile.officialUnitId
      ? { officialUnitId: profile.officialUnitId }
      : {}),
  };
}

function body(profile) {
  const assumptions = profile.assumptions.map((item) => `- ${item}`).join("\n");
  const importPath = `@/components/mdx/rl-deep-learning-c/v2/${path.basename(profile.chapterPath)}`;
  const componentNames = [
    `${profile.componentBase}PipelineLab`,
    `${profile.componentBase}ReplayLab`,
    `${profile.componentBase}FaultLab`,
  ];

  return `import { Objectives } from "@/components/mdx/objectives";
import { Term } from "@/components/mdx/term";
import { Callout } from "@/components/mdx/callout";
import { Exercises, Answer } from "@/components/mdx/exercises";
import { Glossary, GlossaryItem } from "@/components/mdx/glossary";
import { Attribution } from "@/components/mdx/attribution";
import { ${componentNames.join(", ")} } from "${importPath}";

<Objectives>

- 能用“${profile.question}”解释本页问题，并把结论限制在官方 2017 年版目录范围内
- 能逐项重建“${profile.thesis}”的输入、状态、公式与中间证据
- 能对“${profile.caseStudy}”完成一次手算或逐步重放，而不是只观察最终奖励
- 能注入“${profile.fault}”，定位首个分岔并用重置回到相同初值

</Objectives>

## 为什么从这个问题开始

${profile.question} ${profile.thesis} “${profile.title}”的学习目标不是复述原书目录，而是把目录约束转成可以计算、运行、失败和复位的教学合同。${profile.duty}

先写预测：在同一初值下，如果故障“${profile.fault}”被启用，最先变化的是输入、转移、TD 目标、激活、梯度还是评价哈希？运行后若观察不一致，应缩小结论并检查第一处差异，不能用更长训练覆盖它。

## 来源、版次与版权边界

[欧姆社官方书页](${SOURCES.official})确认小高知宏著、2017 年 10 月 14 日出版、208 页、ISBN 978-4-274-22114-9，并公开四章详细目录。官方页同时声明配套压缩包仅供购书者使用；本课程没有下载、缓存或改写该压缩包，只用公开目录核定范围。

技术事实另以[《Reinforcement Learning: An Introduction》作者页面](${SOURCES.reinforcementLearning})和[《Deep Learning》作者开放页面](${SOURCES.deepLearning})交叉核对。${profile.title}的中文解释、C 片段、交互、数值、反例、练习与答案均为独立教学重写；现代 DQN、经验回放、目标网络或策略梯度若出现，只能明确标成边界，不能倒填为 2017 年原书内容。

## 术语、对象与前提

${termsBlock(profile)}

必须先声明以下假设：

${assumptions}

<${profile.componentBase}PipelineLab />

## 核心机制与可复算表达

**本页主张：** ${profile.thesis}

$$
${profile.formula}
$$

这条主张只在上述四条假设下成立。${profile.caseStudy} 验收时必须保存“${profile.artifact}”，否则最终奖励或损失曲线不足以排除索引、初始化、终止和评价模式错误。

## 正常轨迹与单故障轨迹

<${profile.componentBase}ReplayLab />

正常轨迹要求同一输入和随机序列得到同一中间状态。故障轨迹只删除一个前提：“${profile.fault}”。两条轨迹共用其余条件，才能把首个分岔归因到该故障，而不是换了任务、模型或初值。

## 独立 C 实现片段

\`\`\`c
${profile.code}
\`\`\`

这段代码由本课程独立编写，只展示“${profile.title}”的最小接口，不复制官方购书者压缩包。编译时应启用告警、地址检测和未定义行为检测；运行记录包含输入尺寸、索引、旧值、新值和终止标记。

## 反例、适用边界与复位

<Callout type="trap" title="本页最容易误用的地方">
  ${profile.trap}
</Callout>

<${profile.componentBase}FaultLab />

复位不是只把按钮切回默认值。它必须恢复与“${profile.title}”有关的环境、随机数、表格、参数、轨迹和模式开关，并再次确认“${profile.invariant}”。

## 正式目录逐项深读

${outlineBlock(profile)}

## 最小可重放记录

\`\`\`yaml
unit: ${profile.chapterPath}
question: ${quote(profile.question)}
initial_state: fixed_and_hashed
normal_trace: saved
fault: ${quote(profile.fault)}
first_divergence: required
invariant: ${quote(profile.invariant)}
artifact: ${quote(profile.artifact)}
reset: restore_environment_rng_tables_weights_trace_and_mode
\`\`\`

这份记录把“${profile.title}”的目录坐标、输入、故障和证据绑在一起。复核者应先盲跑正常轨迹，再注入故障，最后执行恢复与复位；任何依赖隐藏操作者或上一轮状态的运行都不合格。

## 练习与答案

<Exercises>

${exercisesBlock(profile)}

</Exercises>

## 本页回顾

${profile.thesis} 掌握“${profile.title}”的标准是：能声明假设、手算关键值、逐步解释 C 状态变化、制造一个最小反例，并证明“${profile.invariant}”在复位后仍然成立。

<Glossary>
${glossaryBlock(profile)}
</Glossary>

<Attribution
  mode="independent-rewrite"
  sourceBasis="catalog-only"
  workTitle="小高知宏《强化学习与深度学习：C语言模拟》（2017）"
  adaptedUrl="${SOURCES.official}"
/>`;
}

function wrapperSource(profile) {
  const model = {
    unitId: profile.officialUnitId ?? profile.role,
    title: profile.title,
    question: profile.question,
    sourceBoundary:
      "欧姆社公开目录核定范围；购书者示例包未下载、未缓存、未改写；本课程代码与实验独立编写。",
    concepts: profile.concepts,
    stages: profile.stages,
    normalTrace: profile.normalTrace,
    failureTrace: profile.failureTrace,
    invariant: profile.invariant,
    formula: profile.formula,
    artifact: profile.artifact,
    fault: profile.fault,
  };

  return `"use client";

import {
  RlcExperimentLab,
  type RlcExperimentModel,
} from "./rl-experiment-lab";

const model = ${JSON.stringify(model, null, 2)} satisfies RlcExperimentModel;

export function ${profile.componentBase}PipelineLab() {
  return <RlcExperimentLab model={model} view="pipeline" />;
}

export function ${profile.componentBase}ReplayLab() {
  return <RlcExperimentLab model={model} view="replay" />;
}

export function ${profile.componentBase}FaultLab() {
  return <RlcExperimentLab model={model} view="fault" />;
}
`;
}

for (const profile of profiles) {
  const mdxPath = path.join(CONTENT_ROOT, `${profile.chapterPath}.mdx`);
  if (!fs.existsSync(mdxPath)) throw new Error(`缺少页面：${mdxPath}`);
  fs.writeFileSync(
    mdxPath,
    matter.stringify(body(profile).trimStart(), frontmatter(profile)),
  );

  const wrapperPath = path.join(
    COMPONENT_ROOT,
    `${path.basename(profile.chapterPath)}.tsx`,
  );
  fs.mkdirSync(path.dirname(wrapperPath), { recursive: true });
  fs.writeFileSync(wrapperPath, wrapperSource(profile));
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
manifest.books[BOOK] = {
  edition:
    "小高知宏《強化学習と深層学習 C言語によるシミュレーション》，欧姆社，2017年10月14日，208页，ISBN 9784274221149；中文译本《强化学习与深度学习：通过C语言模拟》，机械工业出版社，2019年，ISBN 9787111627180",
  sourceKind: "official-publisher-complete-detailed-table-of-contents",
  sourceUrl: SOURCES.official,
  secondarySourceUrls: [
    SOURCES.chineseCatalog,
    SOURCES.bibliography,
    SOURCES.reinforcementLearning,
    SOURCES.deepLearning,
  ],
  status: "verified-outline",
  verifiedAt: "2026-07-30",
  disclosureNote:
    "欧姆社官方页确认2017年版、208页、4章完整详细目录。分母计入4个章标题和32个编号节/小节，共36个正式节点；3.1.3至3.1.5换行程序名不另计。日文原题仅保留在本清单用于溯源，页面正文使用中文映射。官方示例压缩包限定购书者使用，本课程未下载、缓存或改写，只用公开目录核定范围。",
  units: Object.entries(OUTLINES).map(([id, concepts]) => {
    const profile = profiles.find(
      (candidate) => candidate.officialUnitId === id,
    );
    if (!profile) throw new Error(`缺少单元页面：${id}`);
    return {
      id,
      title: profile.title.replace(/^第\d章：/, (value) =>
        value.replace("：", " "),
      ),
      concepts,
      chapterPath: profile.chapterPath,
    };
  }),
  sourceAccess: "outline-only",
  defaultSourceMode: "independent-rewrite",
  unitMappingEvidence: "quality/rl-deep-learning-c-v2-profiles.json",
  factSourcePolicy:
    "公开目录只核定范围；技术事实由作者教材页面交叉核对。课程代码、数值、图示、交互和练习全部独立编写，不复制购书者示例包。",
};

fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
fs.writeFileSync(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      book: BOOK,
      generatedAt: "2026-07-30",
      officialSource: SOURCES.official,
      formalNodes,
      interactiveViews: profiles.length * 3,
      sourceBoundary:
        "官方目录核定范围；购书者示例包未下载、未缓存、未改写；所有教学实现独立编写。",
      pages: profiles.map((profile) => ({
        chapterPath: profile.chapterPath,
        title: profile.title,
        role: profile.role,
        officialUnitId: profile.officialUnitId,
        concepts: profile.concepts,
        question: profile.question,
        invariant: profile.invariant,
        fault: profile.fault,
        artifact: profile.artifact,
      })),
    },
    null,
    2,
  )}\n`,
);

console.log(
  `已重建 ${profiles.length} 页，映射 4 章 ${formalNodes} 个正式目录节点，生成 ${profiles.length * 3} 个交互视图。`,
);
