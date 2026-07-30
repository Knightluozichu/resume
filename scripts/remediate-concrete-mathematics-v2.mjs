#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { format } from "prettier";

const ROOT = process.cwd();
const BOOK = "concrete-mathematics";
const CONTENT_ROOT = path.join(ROOT, "content", BOOK);
const COMPONENT_ROOT = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/concrete-mathematics-v2-profiles.json",
);
const PUBLISHER =
  "https://www.informit.com/store/concrete-mathematics-a-foundation-for-computer-science-9780201558029";
const PUBLISHER_SAMPLE =
  "https://www.informit.com/content/images/9780201558029/samplepages/9780201558029.pdf";
const AUTHOR_PAGE = "https://cs.stanford.edu/~knuth/gkp.html";
const BERNOULLI_REPLACEMENT = "https://cs.stanford.edu/~knuth/gkp34.pdf";

const SOURCES = {
  publisher: PUBLISHER,
  publisherSample: PUBLISHER_SAMPLE,
  authorPage: AUTHOR_PAGE,
  bernoulliReplacement: BERNOULLI_REPLACEMENT,
  dlmfAsymptotics: "https://dlmf.nist.gov/2",
  dlmfBernoulli: "https://dlmf.nist.gov/24",
  dlmfCombinatorial: "https://dlmf.nist.gov/26",
  oeisConcordance:
    "https://oeis.org/wiki/Sequences_from_Graham%2C_Knuth%2C_Patashnik_%22Concrete_Math%22",
};

const SOURCE_META = {
  publisher: [
    "InformIT第二版出版社页",
    "official-publisher-edition-outline",
    "核对作者、1994年第二版、ISBN、出版信息、9章结构与500余道练习说明",
  ],
  publisherSample: [
    "InformIT授权样章",
    "official-publisher-authorized-sample",
    "核对完整目录的57个编号小节、前言、第3章和索引；授权样章不等于整书正文授权",
  ],
  authorPage: [
    "Donald Knuth作者书页与勘误",
    "official-author-book-page-errata",
    "核对第二版历史、机械求和增补、历次勘误、样卷与后续印次修订",
  ],
  bernoulliReplacement: [
    "作者2022年Bernoulli替换页",
    "official-author-replacement-pages",
    "核对第34次印刷采用B₁=+1/2的约定及与旧印次、其他资料的符号边界",
  ],
  dlmfAsymptotics: [
    "NIST DLMF渐近方法",
    "nist-primary-mathematical-reference",
    "核对渐近展开、误差与适用条件的当前参考记法",
  ],
  dlmfBernoulli: [
    "NIST DLMF Bernoulli与Euler多项式",
    "nist-primary-mathematical-reference",
    "核对Bernoulli数的定义、生成函数、递推和渐近性质，并显式转换B₁约定",
  ],
  dlmfCombinatorial: [
    "NIST DLMF组合分析",
    "nist-primary-mathematical-reference",
    "核对二项式系数、整数序列与生成函数的标准定义和恒等式边界",
  ],
  oeisConcordance: [
    "OEIS《Concrete Mathematics》序列索引",
    "curated-sequence-finding-aid",
    "只把它作为原书页码到整数序列的查找入口，不把社区索引单独当成证明",
  ],
};

const OUTLINE = [
  {
    id: "cm2-01",
    title: "第1章 Recurrent Problems（递归问题）",
    concepts: [
      "1.1 The Tower of Hanoi",
      "1.2 Lines in the Plane",
      "1.3 The Josephus Problem",
    ],
  },
  {
    id: "cm2-02",
    title: "第2章 Sums（求和）",
    concepts: [
      "2.1 Notation",
      "2.2 Sums and Recurrences",
      "2.3 Manipulation of Sums",
      "2.4 Multiple Sums",
      "2.5 General Methods",
      "2.6 Finite and Infinite Calculus",
      "2.7 Infinite Sums",
    ],
  },
  {
    id: "cm2-03",
    title: "第3章 Integer Functions（整数函数）",
    concepts: [
      "3.1 Floors and Ceilings",
      "3.2 Floor/Ceiling Applications",
      "3.3 Floor/Ceiling Recurrences",
      "3.4 ‘mod’: The Binary Operation",
      "3.5 Floor/Ceiling Sums",
    ],
  },
  {
    id: "cm2-04",
    title: "第4章 Number Theory（数论）",
    concepts: [
      "4.1 Divisibility",
      "4.2 Primes",
      "4.3 Prime Examples",
      "4.4 Factorial Factors",
      "4.5 Relative Primality",
      "4.6 ‘mod’: The Congruence Relation",
      "4.7 Independent Residues",
      "4.8 Additional Applications",
      "4.9 Phi and Mu",
    ],
  },
  {
    id: "cm2-05",
    title: "第5章 Binomial Coefficients（二项式系数）",
    concepts: [
      "5.1 Basic Identities",
      "5.2 Basic Practice",
      "5.3 Tricks of the Trade",
      "5.4 Generating Functions",
      "5.5 Hypergeometric Functions",
      "5.6 Hypergeometric Transformations",
      "5.7 Partial Hypergeometric Sums",
      "5.8 Mechanical Summation",
    ],
  },
  {
    id: "cm2-06",
    title: "第6章 Special Numbers（特殊数）",
    concepts: [
      "6.1 Stirling Numbers",
      "6.2 Eulerian Numbers",
      "6.3 Harmonic Numbers",
      "6.4 Harmonic Summation",
      "6.5 Bernoulli Numbers",
      "6.6 Fibonacci Numbers",
      "6.7 Continuants",
    ],
  },
  {
    id: "cm2-07",
    title: "第7章 Generating Functions（生成函数）",
    concepts: [
      "7.1 Domino Theory and Change",
      "7.2 Basic Maneuvers",
      "7.3 Solving Recurrences",
      "7.4 Special Generating Functions",
      "7.5 Convolutions",
      "7.6 Exponential Generating Functions",
      "7.7 Dirichlet Generating Functions",
    ],
  },
  {
    id: "cm2-08",
    title: "第8章 Discrete Probability（离散概率）",
    concepts: [
      "8.1 Definitions",
      "8.2 Mean and Variance",
      "8.3 Probability Generating Functions",
      "8.4 Flipping Coins",
      "8.5 Hashing",
    ],
  },
  {
    id: "cm2-09",
    title: "第9章 Asymptotics（渐近分析）",
    concepts: [
      "9.1 A Hierarchy",
      "9.2 O Notation",
      "9.3 O Manipulation",
      "9.4 Two Asymptotic Tricks",
      "9.5 Euler’s Summation Formula",
      "9.6 Final Summations",
    ],
  },
];

const PATHS = {
  "cm2-01": "01-recurrences-sums/cm2-recurrent-problems",
  "cm2-02": "01-recurrences-sums/cm2-sums",
  "cm2-03": "02-integers-number-theory/cm2-integer-functions",
  "cm2-04": "02-integers-number-theory/cm2-number-theory",
  "cm2-05": "03-combinatorial-numbers/cm2-binomial-coefficients",
  "cm2-06": "03-combinatorial-numbers/cm2-special-numbers",
  "cm2-07": "04-generating-probability/cm2-generating-functions",
  "cm2-08": "04-generating-probability/cm2-discrete-probability",
  "cm2-09": "05-asymptotics/cm2-asymptotics",
};

const SPECS = {
  "cm2-01": {
    question: "怎样从可枚举的小问题建立有初值、有适用域、可被反例攻击的递推？",
    scenario: "分别重放汉诺塔、一般位置直线分割与Josephus删除过程的最小规模",
    fault: "保留递推式却删除初值，或改变编号基准后沿用旧偏移",
    invariant: "递推、初值、索引域、闭式和小规模枚举描述同一个序列",
    artifact: "状态定义、递推树、前十项、闭式代回和偏移反例",
    focus: "汉诺塔、平面分割和Josephus问题怎样把故事翻译为递推关系",
    experiment: "hanoi",
    sourceIds: [
      "publisher",
      "publisherSample",
      "authorPage",
      "oeisConcordance",
    ],
    proofSteps: [
      [
        "定义状态",
        "Hₙ = 最少移动 n 个圆盘的步数",
        "圆盘数、合法移动和目标柱必须固定。",
      ],
      [
        "分解动作",
        "Hₙ ≥ 2Hₙ₋₁ + 1",
        "最大片移动前后各要处理一次 n−1 片子问题。",
      ],
      ["构造上界", "Hₙ ≤ 2Hₙ₋₁ + 1", "标准递归算法达到同一移动次数。"],
      [
        "解与代回",
        "Hₙ = 2ⁿ − 1，H₀=0",
        "闭式满足递推与初值，因此与原序列一致。",
      ],
    ],
  },
  "cm2-02": {
    question: "怎样在换元、交换顺序和望远镜消去时完整保存索引集合与边界项？",
    scenario: "用零到n的整数和同时执行逐项累加、配对和有限差分重放",
    fault: "变量换元后仍使用旧上下界，或把有限和的交换理由套到未证收敛的无限和",
    invariant: "变换前后索引多重集、边界项与收敛前提完全对应",
    artifact: "索引域图、换元表、消去项、剩余边界和逐项复算",
    focus: "求和记号、递推、有限微积分、多重求和与无限和的证明责任",
    experiment: "sum",
    sourceIds: [
      "publisher",
      "publisherSample",
      "authorPage",
      "dlmfAsymptotics",
    ],
    proofSteps: [
      ["固定有限和", "Sₙ = Σₖ₌₀ⁿ k", "空和、起点和终点先于代数操作。"],
      ["反向配对", "Sₙ = Σₖ₌₀ⁿ (n−k)", "映射 k↦n−k 是索引集合上的双射。"],
      ["逐项相加", "2Sₙ = Σₖ₌₀ⁿ n", "两个和具有相同的有限索引域。"],
      ["计算常数和", "Sₙ = n(n+1)/2", "共有 n+1 项，每项为 n。"],
    ],
  },
  "cm2-03": {
    question: "怎样把floor、ceiling和mod的语言约定转成可复算的整数分块？",
    scenario: "枚举取整和并用商—余数分块得到第二条独立计算路径",
    fault: "混用不同编程语言的负数余数语义，或在端点上把严格不等号写成非严格",
    invariant: "每个实数落入唯一半开区间，商与余数满足固定除数下的唯一分解",
    artifact: "半开区间图、商余数表、逐项取整和与负数语义对照",
    focus: "下取整、上取整、取模、取整递推和格点计数怎样处理离散边界",
    experiment: "floor",
    sourceIds: ["publisher", "publisherSample", "authorPage"],
    proofSteps: [
      ["定义下取整", "⌊x⌋ ≤ x < ⌊x⌋+1", "唯一整数由一闭一开的夹逼确定。"],
      ["建立对偶", "⌈x⌉ = −⌊−x⌋", "取负使不等号反向并交换上下界。"],
      ["整数分解", "n = mq+r，0≤r<m", "正除数 m 固定时商余数唯一。"],
      [
        "按商分块",
        "Σₖ₌₀ⁿ⌊k/m⌋ = mq(q−1)/2+q(r+1)",
        "每个完整商值出现 m 次，末段出现 r+1 次。",
      ],
    ],
  },
  "cm2-04": {
    question: "怎样让整除、同余、互素与算术函数结论携带可检查的整数证书？",
    scenario: "对两整数执行Euclid除法链，并检查每一步余数严格下降",
    fault: "把同余当普通等式消去不可逆因子，或在模数不互素时直接套中国剩余结论",
    invariant: "每次整除或同余变换都保留模数、互素前提与整数线性组合证书",
    artifact: "Euclid除法链、Bézout回代、剩余类表和失败模数反例",
    focus: "整除、素数、阶乘因子、互素、同余、独立剩余与phi、mu函数",
    experiment: "gcd",
    sourceIds: [
      "publisher",
      "publisherSample",
      "authorPage",
      "dlmfCombinatorial",
    ],
    proofSteps: [
      ["执行带余除法", "a = qb+r，0≤r<b", "每一步都在整数域并让非零余数下降。"],
      [
        "保持公因子",
        "gcd(a,b)=gcd(b,r)",
        "a−qb=r 使两对整数拥有相同公因子集合。",
      ],
      ["到达终点", "gcd(d,0)=d", "最后非零余数同时整除原输入。"],
      ["回代证书", "d = xa+yb", "逐层回代给出Bézout整数线性组合。"],
    ],
  },
  "cm2-05": {
    question: "怎样在组合解释、生成函数与机械求和之间传递同一恒等式的证书？",
    scenario: "用两组对象的分组选择重放Vandermonde卷积，并与一次选择比较",
    fault: "忽略二项式系数的整数参数域，或只信符号系统输出而不保存望远镜证书",
    invariant: "代数两侧计数同一个有限对象集，机械结果另有初值与递推证书",
    artifact: "对象双计数、卷积展开、参数域、初值和机械证书残差",
    focus: "二项式恒等式、超几何项、变换、部分和与Gosper–Zeilberger机械求和",
    experiment: "binomial",
    sourceIds: [
      "publisher",
      "publisherSample",
      "authorPage",
      "dlmfCombinatorial",
    ],
    proofSteps: [
      ["定义两组对象", "|R|=r，|S|=s，R∩S=∅", "两组有限且不相交。"],
      ["按来源分组", "Σₖ C(r,k)C(s,n−k)", "k记录从第一组选择的元素数。"],
      ["合并对象集", "C(r+s,n)", "不分类时直接从并集选择n个元素。"],
      [
        "识别同一集合",
        "Σₖ C(r,k)C(s,n−k)=C(r+s,n)",
        "分组计数与直接计数覆盖相同选择且无重无漏。",
      ],
    ],
  },
  "cm2-06": {
    question:
      "怎样在Stirling、Eulerian、调和、Bernoulli、Fibonacci与continuant之间保持定义和符号约定？",
    scenario: "重放Fibonacci递推，并把Bernoulli的B₁约定固定到作者2022替换页",
    fault: "把B₁=+1/2与B₁=−1/2的公式逐项混合，或只凭序列前几项猜恒等式",
    invariant: "特殊数的初值、符号、索引方向、生成函数和递推来自同一约定",
    artifact: "定义卡、前若干项、递推重放、生成函数系数与约定转换表",
    focus: "六类特殊数怎样以递推、生成函数和组合对象建立可转换坐标",
    experiment: "special",
    sourceIds: [
      "publisher",
      "publisherSample",
      "authorPage",
      "bernoulliReplacement",
      "dlmfBernoulli",
      "oeisConcordance",
    ],
    proofSteps: [
      ["冻结Fibonacci初值", "F₀=0，F₁=1", "索引从零开始，避免整体偏移。"],
      ["递推生成", "Fₙ₊₂=Fₙ₊₁+Fₙ", "每个新值只依赖前两个已验收值。"],
      [
        "冻结Bernoulli约定",
        "z/(1−e⁻ᶻ)=Σ Bₙzⁿ/n!",
        "作者2022替换页由该生成函数得到B₁=+1/2。",
      ],
      [
        "跨资料换算",
        "B₁⁺=−B₁⁻，其余Bₙ同约定逐式核查",
        "涉及一次项的公式必须先转换，不能只改标签。",
      ],
    ],
  },
  "cm2-07": {
    question: "怎样把序列编码、代数运算与系数提取组成可逆的形式幂级数推导？",
    scenario: "把两个全1序列做Cauchy卷积，并从(1−z)的负二次方提取同一系数",
    fault: "索引平移时丢失初值修正项，或把形式幂级数恒等式误说成处处解析收敛",
    invariant: "每个系数都由有限项决定，索引平移与乘法完整保留初值和卷积边界",
    artifact: "序列表、形式幂级数、逐项卷积、系数提取和收敛声明边界",
    focus: "基本操作、递推求解、特殊生成函数、卷积、EGF与Dirichlet生成函数",
    experiment: "generating",
    sourceIds: [
      "publisher",
      "publisherSample",
      "authorPage",
      "dlmfCombinatorial",
    ],
    proofSteps: [
      ["编码序列", "A(z)=Σₙ≥0 aₙzⁿ", "形式语境先定义系数，不要求给z数值。"],
      ["相乘展开", "A(z)B(z)=ΣᵢΣⱼ aᵢbⱼzⁱ⁺ʲ", "每个目标次数只接收有限对索引。"],
      ["按总次数收集", "[zⁿ]AB=Σₖ₌₀ⁿ aₖbₙ₋ₖ", "约束i+j=n得到Cauchy卷积。"],
      [
        "逐项回代",
        "aₙ、bₙ与卷积前项匹配",
        "从代数结果提取系数并与原递推重放。",
      ],
    ],
  },
  "cm2-08": {
    question: "怎样用指示变量、期望线性与生成函数分析随机算法而不偷用独立性？",
    scenario: "把哈希碰撞对写成指示变量之和，直接计算精确期望",
    fault: "误以为期望线性要求事件独立，或从期望值直接推出高概率保证",
    invariant:
      "样本空间、分布、随机变量与事件先定义；独立性只在需要乘概率或化简方差时使用",
    artifact: "样本空间、指示变量表、期望推导、协方差清单和尾部声明",
    focus: "概率定义、均值方差、概率生成函数、抛硬币与哈希分析",
    experiment: "probability",
    sourceIds: [
      "publisher",
      "publisherSample",
      "authorPage",
      "dlmfCombinatorial",
    ],
    proofSteps: [
      ["定义碰撞指示量", "Iᵢⱼ=1{h(i)=h(j)}", "每一无序键对对应一个零一变量。"],
      ["写总碰撞数", "X=Σᵢ<ⱼ Iᵢⱼ", "每个碰撞对恰好计数一次。"],
      ["应用期望线性", "E[X]=Σᵢ<ⱼ E[Iᵢⱼ]", "有限和无需变量相互独立。"],
      ["代入均匀概率", "E[X]=C(n,2)/m", "每对键碰到同一桶的概率为1/m。"],
    ],
  },
  "cm2-09": {
    question:
      "怎样让大O、渐近等价与Euler求和同时携带趋向变量、常数依赖和余项？",
    scenario: "比较调和数精确有限和与含首个端点修正的渐近式，并观察有符号残差",
    fault: "从f属于O(g)反推g属于O(f)，或只画接近曲线却不提供余项定理",
    invariant:
      "每个渐近结论声明趋向、参数一致性、主项、保留项、余项阶与适用范围",
    artifact: "增长层级、常数依赖表、精确样本、归一化残差和余项证明",
    focus: "增长层级、O记号、渐近变换、两类技巧、Euler求和与最终求和",
    experiment: "asymptotic",
    sourceIds: [
      "publisher",
      "publisherSample",
      "authorPage",
      "dlmfAsymptotics",
      "dlmfBernoulli",
    ],
    proofSteps: [
      ["声明趋向", "n→∞，其他参数固定", "不声明趋向变量就无法解释O记号。"],
      ["保留精确对象", "Hₙ=Σₖ₌₁ⁿ 1/k", "渐近式必须有可比较的精确基线。"],
      ["写保留项", "Hₙ=ln n+γ+1/(2n)+Rₙ", "主项、常数项、端点修正和余项分开。"],
      ["约束余项", "Rₙ=O(n⁻²)", "曲线接近不是证明；常数与适用域由定理给出。"],
    ],
  },
};

const MAP_SPEC = {
  question: "66个正式坐标怎样连接为一条从精确对象到带余项近似的证据链？",
  scenario: "为每章选择一个定义、一次等价变换、一个反例和一个可复算证书",
  fault: "把57个编号小节压缩成本站自造概念，或把授权样章误标成整书可访问",
  invariant: "每个目录坐标都有唯一证据键，原版范围、本站扩展和当前勘误保持分层",
  artifact: "66坐标矩阵、章节依赖、来源身份、实验索引和缺口清单",
  focus: "9个章根与57个编号小节怎样组成可导航、可复核的学习地图",
  experiment: "cross",
  sourceIds: [
    "publisher",
    "publisherSample",
    "authorPage",
    "bernoulliReplacement",
    "dlmfAsymptotics",
    "dlmfBernoulli",
    "dlmfCombinatorial",
    "oeisConcordance",
  ],
  proofSteps: [
    [
      "定义精确对象层",
      "递推 → 有限和 → 整数结构",
      "前三类坐标先固定状态、索引和边界。",
    ],
    [
      "建立代数变换层",
      "二项式 → 特殊数 → 生成函数",
      "中间三类坐标保存可逆变换与系数证书。",
    ],
    [
      "连接随机对象层",
      "指示变量 → 期望与方差",
      "概率坐标先定义分布，再使用线性和独立性。",
    ],
    [
      "交付近似层",
      "精确式 → 主项 + 余项",
      "渐近坐标保留可复算精确基线与误差声明。",
    ],
  ],
};

const REVIEW_SPEC = {
  question: "怎样用同一组定义、反例与恢复门验收全书，而不是背诵66个标题？",
  scenario: "随机抽取每章一个坐标，重建定义、推导、边界样例与失败前提",
  fault: "跳过精确小样例，直接相信符号化结果、数值拟合或记忆中的公式",
  invariant: "任何结论都能从定义重放，破坏一个前提时能定位首错，撤销后能恢复",
  artifact: "全书口试记录、九章证书、反例库、误差表与未决问题",
  focus: "递推、求和、整数、数论、组合、特殊数、生成函数、概率与渐近的综合验收",
  experiment: "cross",
  sourceIds: [
    "publisher",
    "publisherSample",
    "authorPage",
    "bernoulliReplacement",
    "dlmfAsymptotics",
    "dlmfBernoulli",
    "dlmfCombinatorial",
  ],
  proofSteps: [
    [
      "口述对象",
      "对象 + 索引域 + 初值 + 边界",
      "先说清问题，不能从答案反推题目。",
    ],
    [
      "重建推导",
      "每一步 = 等价式 + 适用前提",
      "换元、交换与近似各有独立责任。",
    ],
    [
      "攻击前提",
      "删除一个前提 → 最小反例",
      "反例应指出首个失败步骤而非只给错误数字。",
    ],
    [
      "同输入恢复",
      "撤销故障 → 精确值、证书与余项恢复",
      "恢复结果与基线共同进入最终记录。",
    ],
  ],
};

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
    .join("");
}

function alphaKey(index, profile) {
  let value = index;
  let suffix = "";
  do {
    suffix = String.fromCharCode(65 + (value % 26)) + suffix;
    value = Math.floor(value / 26) - 1;
  } while (value >= 0);
  return `${profile.id.toUpperCase()}-${suffix}`;
}

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

function mechanismFor(concept, profile, index) {
  const label = concept.toLowerCase();
  if (label.includes("hanoi"))
    return `${profile.title}把“移动最大片前后各解决一次子问题”写成上下界相合的递推，而不是只展示2的幂。`;
  if (label.includes("josephus"))
    return `${profile.title}必须冻结从零还是从一编号，并把删除后的循环重编号写成双射。`;
  if (label.includes("floor") || label.includes("ceiling"))
    return `${profile.title}以半开区间和商余数唯一性处理端点，负数例子必须跟随已声明语义。`;
  if (label.includes("mod"))
    return `${profile.title}把二元余数运算与同余关系分开，约分前检查因子在给定模数下是否可逆。`;
  if (label.includes("prime") || label.includes("divis"))
    return `${profile.title}要求整除结论携带整数商或Euclid链，素性主张不能由少量试除样本替代。`;
  if (label.includes("phi") || label.includes("mu"))
    return `${profile.title}从素因子分解定义算术函数，并单独记录反演所需的整除偏序。`;
  if (label.includes("hypergeometric") || label.includes("summation"))
    return `${profile.title}把项比、参数域、望远镜证书、初值和边界残差一起保存，符号系统输出不是独立证明。`;
  if (label.includes("bernoulli"))
    return `${profile.title}显式采用作者2022替换页的B₁=+1/2约定，并在引用B₁=−1/2资料时逐式转换。`;
  if (label.includes("stirling") || label.includes("eulerian"))
    return `${profile.title}用所计数组合对象固定第一类、第二类或上升次数的含义，避免同名三角形混用。`;
  if (label.includes("generating") || label.includes("convolution"))
    return `${profile.title}先在形式幂级数环逐系数运算；只有讨论数值代入时才增加收敛域责任。`;
  if (label.includes("mean") || label.includes("variance"))
    return `${profile.title}先区分期望线性与方差可加性，后者需要协方差消失而前者不要求独立。`;
  if (label.includes("hashing") || label.includes("coin"))
    return `${profile.title}把样本空间、分布和随机变量写全，期望结论不得升级为未经证明的尾部保证。`;
  if (
    label.includes("asymptotic") ||
    label.includes("hierarchy") ||
    label.includes("o notation")
  )
    return `${profile.title}给出趋向变量、常数依赖和余项；单向上界、渐近等价与有限样本拟合不能互换。`;
  if (label.includes("euler’s"))
    return `${profile.title}把积分、端点修正、Bernoulli项与余项分开，截断位置必须与光滑性前提匹配。`;
  return `${profile.title}把坐标“${concept.replaceAll(".", "·")}”落实为对象、合法输入、等价变换、最小样例和反例；序号${index + 1}只用于追踪，不代表难度或得分。`;
}

function makeGates(title, spec) {
  return [
    {
      label: "来源与印次门",
      detail: `${title}分开出版社目录、授权样章、作者勘误、2022替换页与本站独立推导。`,
    },
    {
      label: "定义与适用域门",
      detail: `${title}记录对象、索引域、初值、参数、空对象和端点约定。`,
    },
    {
      label: "等价变换门",
      detail: `${title}为换元、交换求和、卷积、同余约分或渐近截断逐步写理由。`,
    },
    {
      label: "精确样例门",
      detail: `${title}至少重放零规模、第一非平凡值、连续小规模和一个边界输入。`,
    },
    {
      label: "单前提反例门",
      detail: `${title}只注入“${spec.fault}”，并定位相对参考推导的首个失败步骤。`,
    },
    {
      label: "证书、误差与未知门",
      detail: `${title}交付${spec.artifact}，同时保留余项、未证范围与竞争性解释。`,
    },
  ];
}

function enrich(id, title, target, concepts, spec, role, officialUnitId) {
  return {
    id,
    title,
    target,
    chapterSlug: path.basename(target),
    componentBase: pascal(path.basename(target)),
    concepts,
    role,
    officialUnitId,
    ...spec,
    proofSteps: spec.proofSteps.map(([label, expression, reason]) => ({
      label,
      expression,
      reason,
    })),
    gates: makeGates(title, spec),
  };
}

function objectives(profile) {
  return `<Objectives>

- 为${profile.title}冻结对象、索引域、初值、参数和边界约定
- 只注入“${profile.fault}”，定位参考推导的首个失效前提
- 交付${profile.artifact}，并把原版范围、后续勘误与本站推导分层

</Objectives>`;
}

function sourceSection(profile) {
  const links = profile.sourceIds
    .map((id) => {
      const meta = SOURCE_META[id];
      if (!meta) throw new Error(`缺少来源元数据：${id}`);
      return `- [${meta[0]}](${SOURCES[id]})：${profile.title}用它${meta[2]}。`;
    })
    .join("\n");
  return `## 原版、授权样章与后续修订边界

${profile.title}以[InformIT出版社页](${PUBLISHER})核对Ronald L· Graham、Donald E· Knuth、Oren Patashnik、Addison-Wesley、1994年第二版、ISBN 978-0-201-55802-9和9个正式章节。出版社页面当前显示672个装帧页；[授权样章PDF](${PUBLISHER_SAMPLE})的书志写xiii+657个正文编号页，两者是不同页数口径，${profile.title}不把它们伪装成冲突或任选其一。

${profile.title}从出版社授权样章的完整目录核对57个编号小节，并可阅读前言、第3章和索引。${profile.title}把总体访问级别记为authorized-sample：样章可以支持第3章的局部逐页核验，却不扩大其余8章正文、图表、练习和答案的复制许可。${profile.title}的中文讲解均为独立重构，不是翻译、节译、原书替代品，也不把本站设计的小实验说成作者原有内容。

${profile.title}还以[作者书页与勘误](${AUTHOR_PAGE})核对第二版新增机械求和、历次修订与作者公开样卷。${profile.title}特别采用[2022年替换页](${BERNOULLI_REPLACEMENT})中B₁=+1/2的作者新约定；旧印次以及许多现代资料使用B₁=−1/2，任何含一次项的公式都要先声明并转换约定。${profile.title}把NIST DLMF作为当前数学参考，把OEIS原书序列索引仅作为查找入口，二者都不能倒写成1994年原文。

${profile.title}的交互只在浏览器内做小整数精确计算与透明近似，不上传数据、不运行任意代码，也不把有限样本、浮点接近或勾选清单变成正确率。${profile.title}遇到大整数、发散级数、未给收敛域、未证余项或超出样章可核对范围时，必须缩小结论或标记未知。

### 本页独立事实来源

${links}`;
}

function conceptsSection(profile) {
  return `## 正式目录坐标逐项深读

${profile.concepts
  .map((concept, index) => {
    const key = alphaKey(index, profile);
    const label = concept.replaceAll(".", "·");
    return `### ${concept}

**坐标 ${index + 1}/${profile.concepts.length}：${label}；稳定证据键 ${key}。** ${mechanismFor(concept, profile, index)} ${profile.title}在 ${key} 下保存定义、输入、变换前提、逐步等式、精确小样例、单前提反例和恢复结果；目录标题只限定范围，不能单独证明公式、历史判断或教学扩展。`;
  })
  .join("\n\n")}`;
}

function experimentSection(profile) {
  return `## 三个可操作数学证据实验

${profile.title}先预测：若只注入“${profile.fault}”，定义、等价变换、精确值、边界样例或余项中的哪一个最先失效？${profile.title}随后选择来源轨和证明义务，调整小整数比较两条计算路径，再沿参考、反例与恢复轨逐步关闭发布门。

<Stepper>
  <Step title="身份合同：选择坐标、来源层与证明义务">
    <${profile.componentBase}IdentityContractLab />
  </Step>
  <Step title="精确工作台：用两条路径复算当前整数输入">
    <${profile.componentBase}ExactWorkbenchLab />
  </Step>
  <Step title="证明门：定位首错并重放恢复">
    <${profile.componentBase}ProofGateLab />
  </Step>
</Stepper>

${profile.title}的工作台使用整数循环、BigInt组合数、Euclid除法链或显式有限和；这些结果由当前输入直接复算。${profile.title}的调和数视图含浮点近似，只把有符号残差作为诊断，并明确拒绝“曲线接近就是余项证明”。`;
}

function protocolSection(profile) {
  return `## 最小可重现证明协议

1. ${profile.title}先写对象、索引域、初值、参数、边界约定和目标结论，原版小节标题不替代这些定义。
2. ${profile.title}从定义侧建立参考计算，保存${profile.artifact}；若连续小规模与边界输入不稳定，就停止解释变换。
3. ${profile.title}保持其余条件不变，只注入“${profile.fault}”，记录第一个不再成立的定义、双射、等价式、收敛前提或余项条件。
4. ${profile.title}撤销该前提变化，从原始定义以同一输入重放；精确值、推导证书和已声明误差没有一起恢复时，结论标记失败或未知。

<Callout type="trap" title="${profile.title}误区一：授权样章等于完整原书">
${profile.title}只有出版社样章中的前言、第3章、目录与索引可以逐页核验；其余章节只能按公开目录限定范围并独立讲解，不能虚构原文、图表、练习或作者语气。
</Callout>

<Callout type="trap" title="${profile.title}误区二：公式同名就使用同一约定">
${profile.title}必须检查索引起点、空和空积、负数取模、Stirling数种类和Bernoulli的B₁符号；名称相同不保证定义、符号或适用域相同。
</Callout>

<Callout type="trap" title="${profile.title}误区三：小样例或符号输出就是证明">
${profile.title}用小样例发现偏一错误，但有限测试不能证明全称命题；符号系统、数值拟合与交互图也必须附带等价推导、证书或余项定理。
</Callout>`;
}

function exerciseEntries(profile) {
  if (profile.role === "chapter") {
    return profile.concepts.map((concept, index) => ({ concept, index }));
  }
  return profile.concepts
    .map((concept, index) => ({ concept, index }))
    .filter(({ concept }) => /^第\d章/.test(concept));
}

function exercises(profile) {
  const entries = exerciseEntries(profile);
  const coordinateQuestions = entries
    .map(({ concept, index }, exerciseIndex) => {
      const key = alphaKey(index, profile);
      return `**问题 ${exerciseIndex + 1}：${concept}**

为${profile.title}的证据键 ${key} 写一个定义侧计算、一次等价变换、一个只破坏“${profile.fault}”相关前提的最小反例，以及撤销后的恢复断言。

<Answer>
${profile.title}先把 ${key} 绑定到“${concept.replaceAll(".", "·")}”的对象、合法输入、初值与边界；随后从定义枚举连续小规模，再执行一条有理由的变换。${profile.title}的反例只改变一个前提并定位首个失败等式，撤销后以同一输入重新满足“${profile.invariant}”；无法访问的原文细节、未证收敛域和未给余项常数继续标记未知。
</Answer>`;
    })
    .join("\n\n");
  const start = entries.length + 1;
  return `## 练习与答案

<Exercises>

${coordinateQuestions}

**问题 ${start}：为什么66个正式坐标不是66条原书正文**

${profile.title}应怎样描述章根、编号小节、授权样章可见内容与本站教学扩展之间的关系？

<Answer>
${profile.title}的正式分母来自授权样章目录中的9个章根和57个编号小节；坐标只回答“原版覆盖什么”。${profile.title}只有样章实际开放的第3章可做局部正文核对，其余解释、实验、中文例子与练习属于本站独立重构；作者勘误回答后续印次变化，也不能自动授权整书正文。
</Answer>

**问题 ${start + 1}：什么时候必须拒绝数学结论**

${profile.title}缺少哪些材料时不能发布“恒等式成立”“算法正确”或“近似误差受控”？

<Answer>
${profile.title}缺少对象定义、索引域、初值、参数范围、边界约定、逐步等价理由、精确小样例、反例攻击、机械证书或余项定理中的关键一项时，就只能报告局部观察。${profile.title}不会用一次数值相等、曲线接近、符号软件返回值或多数测试通过填补逻辑缺口。
</Answer>

</Exercises>`;
}

function glossary(profile) {
  const terms = [
    [
      "适用域",
      `${profile.title}中使定义、恒等式或渐近结论有意义的输入与参数集合`,
    ],
    ["初值", `${profile.title}中与递推关系共同唯一确定目标序列的起始数据`],
    [
      "证书",
      `${profile.title}中可机械或逐步检查结论的望远镜项、递推、双射或整数线性组合`,
    ],
    [
      "形式幂级数",
      `${profile.title}中按系数定义运算且不预先要求数值收敛的级数对象`,
    ],
    [
      "首个失效前提",
      `${profile.title}的反例轨迹相对参考推导最早不再满足的定义或条件`,
    ],
    ["余项", `${profile.title}的精确对象减去已保留近似项后仍需定理约束的差`],
  ];
  return `## 六个裁决术语

${profile.title}使用${terms
    .map(
      ([term, definition]) =>
        `<Term def="${escapeAttribute(definition)}">${term}</Term>`,
    )
    .join(
      "、",
    )}构成最小证据语言；${profile.title}用它们指向真实定义、推导与误差，不生成成熟度分、置信分或综合数学能力分。

<Glossary>
${terms
  .map(
    ([term, definition]) =>
      `<GlossaryItem term="${term}">${definition}。</GlossaryItem>`,
  )
  .join("\n")}
</Glossary>`;
}

function synthesis(profile) {
  return `## 小结与上架门

${profile.title}把${profile.focus}连接成可复核证明链：公开目录给坐标，授权样章限定可见正文，作者勘误修正印次，当前数学参考核对新陈述，双路计算暴露偏一与约定差异，单前提反例定位首错，同输入恢复决定结论能否上架。${profile.title}最终交付${profile.artifact}，并同时报告来源身份、约定、适用域、余项和未知项。

${exercises(profile)}

${glossary(profile)}

<Attribution
  mode="independent-rewrite"
  sourceBasis="authorized-sample"
  workTitle="Graham、Knuth、Patashnik《Concrete Mathematics》第二版公开目录、授权样章与作者勘误"
  adaptedUrl="${PUBLISHER}"
/>`;
}

function wrapper(profile) {
  const model = {
    unitId: profile.id,
    title: profile.title,
    question: profile.question,
    concepts: profile.concepts,
    invariant: profile.invariant,
    fault: profile.fault,
    artifact: profile.artifact,
    experiment: profile.experiment,
    proofSteps: profile.proofSteps,
    gates: profile.gates,
  };
  return `"use client";

import {
  ConcreteMathEvidenceLab,
  type ConcreteMathEvidenceModel,
} from "@/components/mdx/concrete-mathematics/v2/concrete-math-evidence-lab";

const model = ${JSON.stringify(model, null, 2)} as const satisfies ConcreteMathEvidenceModel;

export function ${profile.componentBase}IdentityContractLab() {
  return <ConcreteMathEvidenceLab model={model} view="identity-contract" />;
}

export function ${profile.componentBase}ExactWorkbenchLab() {
  return <ConcreteMathEvidenceLab model={model} view="exact-workbench" />;
}

export function ${profile.componentBase}ProofGateLab() {
  return <ConcreteMathEvidenceLab model={model} view="proof-gate" />;
}
`;
}

async function writeFormatted(filePath, source, parser) {
  const output = await format(source, { parser });
  const current = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "";
  if (current !== output) fs.writeFileSync(filePath, output);
}

async function transformPage(profile) {
  const filePath = path.join(CONTENT_ROOT, `${profile.target}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`缺少页面：${filePath}`);
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const body = `import {
  Objectives,
  Term,
  Callout,
  Stepper,
  Step,
  Exercises,
  Answer,
  Glossary,
  GlossaryItem,
  Attribution,
} from "@/components/mdx/mdx-components";
import {
  ${profile.componentBase}IdentityContractLab,
  ${profile.componentBase}ExactWorkbenchLab,
  ${profile.componentBase}ProofGateLab,
} from "@/components/mdx/${BOOK}/v2/${profile.chapterSlug}";

${objectives(profile)}

## 为什么从这个问题开始

${profile.title}围绕“${profile.question}”建立贯穿任务：${profile.scenario}。${profile.title}先冻结定义和来源身份，再比较精确路径与变换路径，最后用单前提反例和同输入恢复验收；只有守住“${profile.invariant}”并交付${profile.artifact}，一个漂亮公式才可能升级为可复核结论。

${sourceSection(profile)}

${conceptsSection(profile)}

${experimentSection(profile)}

${protocolSection(profile)}

${synthesis(profile)}
`;
  const data = {
    ...parsed.data,
    title: profile.title,
    description: `${profile.title}覆盖${profile.concepts.length}个正式目录坐标，用来源合同、双路精确计算与证明门交付${profile.artifact}`,
    demo: true,
    math: true,
    sourceUrl: PUBLISHER,
    qualityVersion: 2,
    practiceMode: "simulation",
    sourceMode: "independent-rewrite",
  };
  if (profile.officialUnitId) data.officialUnitId = profile.officialUnitId;
  else delete data.officialUnitId;
  await writeFormatted(
    filePath,
    matter.stringify(body.trimStart(), data),
    "mdx",
  );
  await writeFormatted(
    path.join(COMPONENT_ROOT, `${profile.chapterSlug}.tsx`),
    wrapper(profile),
    "typescript",
  );
}

const document = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const manifest = document.books[BOOK];
if (!manifest) throw new Error(`缺少manifest：${BOOK}`);

const existingById = new Map(manifest.units.map((unit) => [unit.id, unit]));
manifest.units = OUTLINE.map((outlineUnit) => {
  const existing = existingById.get(outlineUnit.id) ?? {};
  return {
    ...existing,
    id: outlineUnit.id,
    title: outlineUnit.title,
    concepts: outlineUnit.concepts.map((concept) => [concept]),
  };
});

const allCoordinates = manifest.units.flatMap((unit) => [
  unit.title,
  ...unit.concepts.flat(),
]);
const publicSections = manifest.units.reduce(
  (count, unit) => count + unit.concepts.flat().length,
  0,
);
if (manifest.units.length !== 9)
  throw new Error(`正式章数应为9，实际${manifest.units.length}`);
if (publicSections !== 57)
  throw new Error(`编号小节应为57，实际${publicSections}`);
if (allCoordinates.length !== 66)
  throw new Error(`正式坐标应为66，实际${allCoordinates.length}`);

const profiles = [
  enrich(
    "learningMap",
    "《具体数学》第二版66坐标证据学习地图",
    "00-guide/cm2-official-learning-map",
    allCoordinates,
    MAP_SPEC,
    "learning-map",
  ),
  ...manifest.units.map((unit) =>
    enrich(
      unit.id,
      unit.title,
      PATHS[unit.id],
      [unit.title, ...unit.concepts.flat()],
      SPECS[unit.id],
      "chapter",
      unit.id,
    ),
  ),
  enrich(
    "finalReview",
    "《具体数学》第二版66坐标全书证据总复习",
    "06-review/cm2-official-final-review",
    allCoordinates,
    REVIEW_SPEC,
    "final-review",
  ),
];
if (profiles.length !== 11)
  throw new Error(`页面数量应为11，实际${profiles.length}`);

fs.mkdirSync(COMPONENT_ROOT, { recursive: true });
for (const profile of profiles) await transformPage(profile);

for (const unit of manifest.units) {
  const spec = SPECS[unit.id];
  if (!spec || !PATHS[unit.id]) throw new Error(`缺少单元配置：${unit.id}`);
  unit.chapterPath = PATHS[unit.id];
  unit.sourceMode = "independent-rewrite";
  unit.sourceAccess = "authorized-sample";
  unit.factSourceIds = spec.sourceIds;
}
manifest.edition =
  "Concrete Mathematics: A Foundation for Computer Science, Second Edition，Ronald L. Graham、Donald E. Knuth、Oren Patashnik，Addison-Wesley，1994，ISBN 978-0-201-55802-9；书志xiii+657个正文编号页，出版社当前装帧口径672页";
manifest.sourceKind =
  "official-publisher-edition-page-plus-authorized-sample-full-toc-and-chapter-3-plus-official-author-errata-and-replacement-pages-plus-current-nist-references";
manifest.sourceUrl = PUBLISHER;
manifest.secondarySourceUrls = Object.values(SOURCES).filter(
  (url) => url !== PUBLISHER,
);
manifest.status =
  "verified-66-coordinate-authorized-sample-independent-rewrite-author-errata-current-math-cross-check";
manifest.verifiedAt = "2026-07-30";
manifest.sourceAccess = "authorized-sample";
manifest.defaultSourceMode = "independent-rewrite";
manifest.disclosureNote =
  "正式分母来自InformIT授权样章的完整目录：9个章根与57个编号小节，共66个正式坐标。出版社页核对作者、1994第二版、ISBN与9章；授权样章含前言、第3章和索引，因此全书访问级别为authorized-sample，但只有第3章可做局部正文核对，其余章节保持独立重构。书志xiii+657与出版社672页是正文编号页和当前装帧页两种口径。作者页核对机械求和增补与勘误；2022替换页把作者约定改为B1=+1/2，涉及其他约定时必须显式转换。NIST DLMF核对当前数学陈述，OEIS索引只作查找入口。";
manifest.unitMappingEvidence = "quality/concrete-mathematics-v2-profiles.json";
manifest.factSourcePolicy =
  "出版社页和授权样章限定第二版书志、正式目录与可见正文范围；作者页、勘误和2022替换页限定后续印次变化。本站讲解、交互与练习均为中文独立重构；特殊数、组合分析和渐近事实由NIST DLMF交叉核对，OEIS只作序列查找入口，不能单独充当证明或倒写成原作者观点。";
manifest.factSources = Object.fromEntries(
  Object.entries(SOURCE_META).map(([id, [label, kind]]) => [
    id,
    { kind, label, url: SOURCES[id] },
  ]),
);
manifest.coverageMetrics = {
  targetFormalNodes: 66,
  coveredFormalNodes: 66,
  coveragePercent: 100,
};
manifest.metrics = {
  officialChapterRoots: 9,
  officialNumberedSections: 57,
  formalNodes: 66,
  officialUnits: 9,
  authorizedFullChapterSamples: 1,
  learningMapPages: 1,
  chapterPages: 9,
  finalReviewPages: 1,
  totalPages: 11,
  interactiveViews: 33,
};

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      generatedAt: "2026-07-30",
      sourceAccess: "authorized-sample",
      originalEdition: "1994 second edition, ISBN 978-0-201-55802-9",
      formalNodes: 66,
      officialChapterRoots: 9,
      officialNumberedSections: 57,
      profiles: profiles.map((profile) => ({
        ...profile,
        filePath: `content/${BOOK}/${profile.target}.mdx`,
        componentPath: `src/components/mdx/${BOOK}/v2/${profile.chapterSlug}.tsx`,
      })),
    },
    null,
    2,
  )}\n`,
  "json",
);
await writeFormatted(
  MANIFEST_PATH,
  `${JSON.stringify(document, null, 2)}\n`,
  "json",
);

console.log("已重构11页、9章、57个编号小节、66个正式坐标与33个交互视图。");
