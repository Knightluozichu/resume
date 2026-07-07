import type { ReviewQuestion } from "./types";

/** 索引与搜索引擎复习题 */
export const aaeIndexingSearchQuestions: ReviewQuestion[] = [
  {
    id: "aae-indexing-search-1",
    chapter: "aae-indexing-search",
    level: 1,
    question:
      "倒排索引（Inverted Index）的基本结构是什么？它由哪几个核心部分组成？",
    answer:
      "倒排索引是搜索引擎的核心数据结构，从「文档 → 词」的正向映射反转为「词 → 文档」的逆向映射，使得给定一个词能快速找到包含它的所有文档。\n\n核心组成部分：\n\n1. 词项词典（Term Dictionary）：\n所有出现过的词（term）的有序集合，通常用跳表或 FST（Finite State Transducer）存储，支持快速查找。FST 还能压缩存储（如 Lucene 的 FST 把词典压缩到内存中）。\n\n2. 倒排表（Posting List / Postings）：\n对每个词项，记录包含该词的文档列表。每个 posting 通常包含：\n- 文档 ID（DocID）\n- 词频（TF，该词在该文档中出现的次数）\n- 位置信息（Positions，用于短语查询和 proximity 查询）\n- 可选的 payload（如词权重、偏移量）\n\n3. 词项索引（Term Index）：\n词典的索引结构，用于快速定位词项在词典中的位置。Lucene 用 FST 作为词项索引，既省内存又能前缀查找。\n\n查找流程：\n查询词「apple」→ 词项索引定位 → 词项词典确认存在 → 取倒排表 → 得到包含「apple」的所有文档 ID 列表 → 按相关性排序返回。\n\n工程优化：\n- 倒排表压缩：文档 ID 列表用 delta 编码 + varint 或 Roaring Bitmap 压缩，减少磁盘和内存占用。\n- 跳表加速合并：多词查询（AND/OR）需要合并多个倒排表，跳表让合并从 O(n+m) 优化到 O(min(n,m) × log(max(n,m)/min(n,m)))。",
    tags: ["倒排索引", "词项词典", "倒排表", "搜索引擎"],
  },
  {
    id: "aae-indexing-search-2",
    chapter: "aae-indexing-search",
    level: 2,
    question:
      "TF-IDF 和 BM25 的打分公式分别是什么？BM25 相比 TF-IDF 解决了什么问题？",
    answer:
      "TF-IDF 打分：\n\nscore(d, t) = TF(t, d) × IDF(t)\n\n- TF(t, d)：词 t 在文档 d 中的词频。通常用原始词频或归一化词频（如 1 + log(TF)）。\n- IDF(t) = log(N / DF(t))，N 为文档总数，DF(t) 为包含 t 的文档数。DF 越小（词越稀有），IDF 越大。\n\n直觉：一个词在某文档中出现越多（TF 大），且在整个语料中越稀有（IDF 大），则该词对该文档的代表性越强，打分越高。\n\nTF-IDF 的问题：\n- TF 线性增长无上界：一个词出现 1000 次的文档得分是出现 1 次的 1000 倍，但实际上出现 10 次和 100 次的区别远小于 10 倍——存在「边际递减」效应。\n- 不考虑文档长度归一化：长文档天然 TF 更高，导致长文档被偏爱。\n\nBM25 打分：\n\nscore(d, t) = IDF(t) × (TF(t, d) × (k1 + 1)) / (TF(t, d) + k1 × (1 − b + b × |d| / avgdl))\n\n参数：\n- k1：词频饱和参数（通常 1.2~2.0），控制 TF 的增长速度。TF 趋近无穷时，得分趋近 IDF × (k1+1)，有上界。\n- b：文档长度归一化参数（通常 0.75），b=1 为完全按长度归一化，b=0 为不归一化。\n- |d|：文档 d 的长度，avgdl：平均文档长度。\n- IDF(t) = log((N − DF(t) + 0.5) / (DF(t) + 0.5) + 1)，比 TF-IDF 的 IDF 更平滑。\n\nBM25 相比 TF-IDF 的改进：\n1. TF 饱和效应：分子分母都有 TF，使得分随 TF 增长但渐近上界 IDF × (k1+1)。出现 1000 次和 100 次的得分差距远小于 10 倍，符合直觉。\n2. 文档长度归一化：分母中的 (1 − b + b × |d| / avgdl) 对长文档做惩罚——同样 TF 下，长文档得分更低，因为词在长文档中的密度更低。\n\n一句话：TF-IDF 是线性增长无上界的朴素打分；BM25 引入 TF 饱和和文档长度归一化，更符合「词频边际递减」和「长文档不偏爱」的信息检索直觉，是工业搜索引擎的事实标准。",
    tags: ["TF-IDF", "BM25", "打分公式", "词频饱和", "文档长度归一化"],
  },
  {
    id: "aae-indexing-search-3",
    chapter: "aae-indexing-search",
    level: 3,
    question:
      "给定一个查询「machine learning」，请描述搜索引擎从接收查询到返回结果的完整处理流程（含分词、倒排索引检索、BM25 打分、排序）。",
    answer:
      "搜索引擎处理「machine learning」查询的完整流程：\n\n第一步：查询分析（Query Analysis）\n\n1. 分词（Tokenization）：\n   「machine learning」→ [\"machine\", \"learning\"]（英文按空格分词；中文需用 jieba/IK 等分词器）。\n\n2. 归一化（Normalization）：\n   - 小写化：「Machine」→「machine」\n   - 去停用词：如「the」「is」被过滤（「machine」「learning」不是停用词，保留）\n   - 词干提取（可选）：「learning」→「learn」（Porter Stemmer）\n\n3. 短语检测（可选）：\n   识别「machine learning」为短语，后续做短语查询（要求两词相邻）。\n\n第二步：倒排索引检索\n\n1. 查词项词典：\n   - 查找「machine」→ 在 FST/跳表中定位 → 获取倒排表 PostingList_machine = [Doc1, Doc3, Doc7, Doc12, ...]\n   - 查找「learning」→ 获取 PostingList_learning = [Doc1, Doc2, Doc7, Doc15, ...]\n\n2. 合并倒排表：\n   - OR 查询（默认）：取两个倒排表的并集 = [Doc1, Doc2, Doc3, Doc7, Doc12, Doc15, ...]\n   - AND 查询：取交集 = [Doc1, Doc7, ...]（同时包含两词的文档）\n   - 短语查询：在交集中进一步检查位置信息，要求「machine」和「learning」相邻\n   - 合并用跳表加速，避免线性扫描长倒排表\n\n第三步：BM25 打分\n\n对合并后的每个候选文档计算 BM25 得分：\n\n以 Doc1 为例（假设 |Doc1| = 200, avgdl = 250, N = 10,000, DF(machine) = 500, DF(learning) = 800, k1 = 1.5, b = 0.75）：\n\n1. 计算 IDF：\n   - IDF(machine) = log((10000 − 500 + 0.5) / (500 + 0.5) + 1) ≈ log(19.02) ≈ 2.94\n   - IDF(learning) = log((10000 − 800 + 0.5) / (800 + 0.5) + 1) ≈ log(11.51) ≈ 2.44\n\n2. 计算 TF 项（假设 Doc1 中 machine 出现 3 次，learning 出现 2 次）：\n   - TF_term(machine) = (3 × 2.5) / (3 + 1.5 × (1 − 0.75 + 0.75 × 200/250)) = 7.5 / (3 + 1.5 × 0.85) = 7.5 / 4.275 ≈ 1.754\n   - TF_term(learning) = (2 × 2.5) / (2 + 1.5 × 0.85) = 5.0 / 3.275 ≈ 1.527\n\n3. 加总：\n   - score(Doc1) = 2.94 × 1.754 + 2.44 × 1.527 ≈ 5.16 + 3.73 ≈ 8.89\n\n对所有候选文档重复以上计算。\n\n第四步：排序与返回\n\n1. 按 BM25 得分降序排列候选文档。\n2. 取 Top-K（如 K = 10）返回给用户。\n3. 可选优化：用 WAND / MaxScore 算法提前剪枝——如果某文档的最大可能得分已低于当前第 K 名，直接跳过，避免对全部候选打分。\n\n第五步：结果增强（可选）\n- 高亮：在摘要中高亮查询词\n- 分面（Faceting）：按分类、时间等维度统计结果数量\n- 相关性反馈：用用户点击数据调整排序（Learning to Rank）",
    tags: ["应用", "搜索引擎", "查询流程", "倒排索引", "BM25", "打分", "排序"],
  },
  {
    id: "aae-indexing-search-4",
    chapter: "aae-indexing-search",
    level: 4,
    question:
      "PageRank 的核心思想是什么？请描述其迭代计算公式，并解释「随机游走」模型与 PageRank 的关系。 damping factor（阻尼系数）为什么通常取 0.85？",
    answer:
      "PageRank 核心思想：\n\n一个网页的重要性取决于指向它的网页的数量和质量。如果一个网页被很多重要网页链接，那它自己也重要。这是一种「链接投票」机制——链接相当于投票，但重要网页的投票权重更高。\n\nPageRank 迭代公式：\n\nPR(p_i) = (1 − d) / N + d × Σ_{p_j ∈ In(p_i)} PR(p_j) / Out(p_j)\n\n参数：\n- PR(p_i)：网页 p_i 的 PageRank 值\n- N：网页总数\n- d：阻尼系数（damping factor），通常 0.85\n- In(p_i)：指向 p_i 的网页集合\n- Out(p_j)：网页 p_j 的出链数量\n- PR(p_j) / Out(p_j)：p_j 把自己的 PageRank 均分给它链接的所有网页\n\n迭代过程：\n1. 初始化所有网页 PR = 1/N。\n2. 用上述公式更新所有网页的 PR 值。\n3. 重复迭代直到 PR 值收敛（变化量 < ε）。\n4. 收敛后 PR 值之和 = 1（概率分布）。\n\n随机游走模型与 PageRank 的关系：\n\nPageRank 等价于一个「随机冲浪者」在网页图上的随机游走的稳态分布：\n\n- 模型：假设一个上网者在网页间随机跳转。\n  - 以概率 d：从当前网页随机点击一个出链（均匀选择），跳到链接的网页。\n  - 以概率 (1 − d)：对当前网页感到厌倦，随机输入一个 URL 跳转到任意网页（均匀选择）。\n- 稳态：经过足够长时间的随机游走，上网者在每个网页上停留的概率就是该网页的 PageRank 值。\n- 公式对应：PR(p_i) = (1−d)/N（随机跳转部分）+ d × Σ（从链接跳转部分）。\n\n为什么需要阻尼系数 d：\n\n1. 解决「Rank Sink」问题：\n如果一组网页互相链接但不链接外部（死循环），没有阻尼系数时，所有 PageRank 会流入这个环出不来，其他网页的 PR 趋于 0。阻尼系数保证每个网页至少有 (1−d)/N 的基础 PR，不会归零。\n\n2. 解决悬挂节点（Dangling Node）问题：\n没有出链的网页（如 PDF 文件）会导致随机游走者「无处可去」。阻尼系数的随机跳转机制保证游走者不会卡住。\n\n为什么取 d = 0.85：\n\n1. 经验平衡：\n   - d 太大（如 0.99）：随机跳转概率低，PageRank 更依赖链接结构，但对 Rank Sink 和长链路的传导变慢，收敛速度慢。\n   - d 太小（如 0.5）：随机跳转概率高，PageRank 趋近均匀分布 1/N，丢失了链接结构的信息——所有网页重要性趋同。\n   - 0.85 是 Brin 和 Page 在原始论文中通过实验确定的经验值，在「尊重链接结构」和「保证收敛性」之间取得平衡。\n\n2. 收敛速度：\n   d = 0.85 时，PageRank 迭代约 50~100 次即可收敛（变化量 < 10^-10）。d 越大收敛越慢。\n\n3. 用户行为建模：\n   0.85 意味着上网者有 85% 的概率继续点击链接、15% 的概率随机跳转。这与真实用户浏览行为（每隔几个页面就会跳到新网站）大致吻合。\n\n工程注意：\n- PageRank 是离线计算的，周期性更新（如每周一次），不实时计算。\n- 现代搜索引擎不再单纯依赖 PageRank，而是结合内容相关性（BM25）、用户行为信号（点击率、停留时间）、新鲜度等多维信号综合排序。PageRank 只是链接分析维度之一。",
    tags: ["综合", "PageRank", "随机游走", "迭代计算", "阻尼系数", "链接分析"],
  },
];
