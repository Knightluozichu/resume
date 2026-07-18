import type { ReviewQuestion } from "./types";
export const cm2OfficialChapterQuestions:ReviewQuestion[]=[
  {
    "id": "cm2-recurrent-problems-1",
    "chapter": "cm2-recurrent-problems",
    "level": 1,
    "question": "递推式是什么？",
    "answer": "用较小规模问题的值定义当前规模的值，并附带足够初值。",
    "tags": [
      "第1章 递归问题",
      "递推式"
    ]
  },
  {
    "id": "cm2-recurrent-problems-2",
    "chapter": "cm2-recurrent-problems",
    "level": 2,
    "question": "汉诺塔与平面分割如何连接？",
    "answer": "移动n个圆盘的最少步数满足H_n=2H_{n-1}+1。 一般位置直线带来的新增区域数转化为一阶差分求和。",
    "tags": [
      "第1章 递归问题",
      "推导"
    ]
  },
  {
    "id": "cm2-recurrent-problems-3",
    "chapter": "cm2-recurrent-problems",
    "level": 3,
    "question": "如何检查Josephus问题的边界？",
    "answer": "循环删除过程通过编号变换得到规模递减关系。 加入零规模、端点和反例：只写递推关系却没有初值，导致无限多组序列都满足公式。",
    "tags": [
      "第1章 递归问题",
      "边界"
    ]
  },
  {
    "id": "cm2-recurrent-problems-4",
    "chapter": "cm2-recurrent-problems",
    "level": 4,
    "question": "如何验收递归验收？",
    "answer": "同时核对初值、索引范围、展开式和小规模枚举。 递归算法分析先从状态转移写递推，再用小规模枚举验证初值和偏移；闭式、递推计算与程序调用次数三路一致后才接受。",
    "tags": [
      "第1章 递归问题",
      "验收"
    ]
  },
  {
    "id": "cm2-sums-1",
    "chapter": "cm2-sums",
    "level": 1,
    "question": "求和记号是什么？",
    "answer": "把索引集合、被加项和边界显式分离，空和约定为零。",
    "tags": [
      "第2章 求和",
      "求和记号"
    ]
  },
  {
    "id": "cm2-sums-2",
    "chapter": "cm2-sums",
    "level": 2,
    "question": "扰动法与多重求和如何连接？",
    "answer": "平移索引或参数后将两个和相减，使大部分项消去。 通过改变求和顺序、区域或计数对象化简嵌套求和。",
    "tags": [
      "第2章 求和",
      "推导"
    ]
  },
  {
    "id": "cm2-sums-3",
    "chapter": "cm2-sums",
    "level": 3,
    "question": "如何检查有限微积分的边界？",
    "answer": "差分与不定和对应微分与积分，可系统构造求和公式。 加入零规模、端点和反例：变量换元后仍沿用旧上下界，公式主体正确但边界差一项。",
    "tags": [
      "第2章 求和",
      "边界"
    ]
  },
  {
    "id": "cm2-sums-4",
    "chapter": "cm2-sums",
    "level": 4,
    "question": "如何验收机械求和？",
    "answer": "超几何项可用Gosper-Zeilberger思想寻找证书与递推。 分析循环总成本时先写精确索引域，再交换求和或构造望远镜项；报告保留边界项，不能只给大O掩盖偏一错误。",
    "tags": [
      "第2章 求和",
      "验收"
    ]
  },
  {
    "id": "cm2-integer-functions-1",
    "chapter": "cm2-integer-functions",
    "level": 1,
    "question": "下取整是什么？",
    "answer": "floor x是小于等于x的最大整数，精确表达完整块数量。",
    "tags": [
      "第3章 整数函数",
      "下取整"
    ]
  },
  {
    "id": "cm2-integer-functions-2",
    "chapter": "cm2-integer-functions",
    "level": 2,
    "question": "上取整与取整谱如何连接？",
    "answer": "ceiling x是大于等于x的最小整数，精确表达覆盖需求。 floor与ceiling通过负号、平移和分数部分形成可转换恒等式。",
    "tags": [
      "第3章 整数函数",
      "推导"
    ]
  },
  {
    "id": "cm2-integer-functions-3",
    "chapter": "cm2-integer-functions",
    "level": 3,
    "question": "如何检查模运算的边界？",
    "answer": "a mod m给出除法余数；负数语义必须固定到数学约定。 加入零规模、端点和反例：认为floor负数等于向零截断，导致负坐标分桶错误。",
    "tags": [
      "第3章 整数函数",
      "边界"
    ]
  },
  {
    "id": "cm2-integer-functions-4",
    "chapter": "cm2-integer-functions",
    "level": 4,
    "question": "如何验收取整和？",
    "answer": "通过格点计数、互补区域或分块计算包含floor的求和。 分页、环形缓冲和任务分片必须明确整数除法与负余数语义；用边界正好整除、少一和多一三组输入验证floor或ceiling选择。",
    "tags": [
      "第3章 整数函数",
      "验收"
    ]
  },
  {
    "id": "cm2-number-theory-1",
    "chapter": "cm2-number-theory",
    "level": 1,
    "question": "整除是什么？",
    "answer": "a整除b表示存在整数k使b=ak，是数论推导的基本关系。",
    "tags": [
      "第4章 数论",
      "整除"
    ]
  },
  {
    "id": "cm2-number-theory-2",
    "chapter": "cm2-number-theory",
    "level": 2,
    "question": "最大公约数与同余如何连接？",
    "answer": "Euclid算法用余数递减且保持公约数集合，最终得到gcd。 a与b模m同余等价于m整除a减b，可在等价类上运算。",
    "tags": [
      "第4章 数论",
      "推导"
    ]
  },
  {
    "id": "cm2-number-theory-3",
    "chapter": "cm2-number-theory",
    "level": 3,
    "question": "如何检查中国剩余定理的边界？",
    "answer": "两两互素模数下，一组余数在模乘积意义下唯一确定整数。 加入零规模、端点和反例：在使用模逆或CRT前没有检查互素条件。",
    "tags": [
      "第4章 数论",
      "边界"
    ]
  },
  {
    "id": "cm2-number-theory-4",
    "chapter": "cm2-number-theory",
    "level": 4,
    "question": "如何验收Euler与Mobius函数？",
    "answer": "phi计数互素剩余类，mu通过平方因子与素因子数编码反演。 哈希步长、周期调度和分片合并都依赖互素性。先用gcd验收模数条件，再用每个余数方程重放CRT结果，不能只检查一个最终整数。",
    "tags": [
      "第4章 数论",
      "验收"
    ]
  },
  {
    "id": "cm2-binomial-coefficients-1",
    "chapter": "cm2-binomial-coefficients",
    "level": 1,
    "question": "二项式系数是什么？",
    "answer": "n选k计数k元素子集，并通过广义定义扩展到更多参数。",
    "tags": [
      "第5章 二项式系数",
      "二项式系数"
    ]
  },
  {
    "id": "cm2-binomial-coefficients-2",
    "chapter": "cm2-binomial-coefficients",
    "level": 2,
    "question": "Pascal恒等式与Vandermonde卷积如何连接？",
    "answer": "按是否包含指定元素分组，得到相邻两项之和。 按从两个集合分别选取多少元素对同一对象双重计数。",
    "tags": [
      "第5章 二项式系数",
      "推导"
    ]
  },
  {
    "id": "cm2-binomial-coefficients-3",
    "chapter": "cm2-binomial-coefficients",
    "level": 3,
    "question": "如何检查超几何项的边界？",
    "answer": "相邻项比值是索引的有理函数，适合机械化求和。 加入零规模、端点和反例：把组合定义域限制在教科书正整数后，又在变换中静默使用广义二项式。",
    "tags": [
      "第5章 二项式系数",
      "边界"
    ]
  },
  {
    "id": "cm2-binomial-coefficients-4",
    "chapter": "cm2-binomial-coefficients",
    "level": 4,
    "question": "如何验收求和证书？",
    "answer": "把目标和写成望远镜差分或参数递推，提供可检查证明。 组合恒等式优先寻找双重计数解释，再用符号变换或机械证书补充。程序验收覆盖k小于零、大于n和边界n为零。",
    "tags": [
      "第5章 二项式系数",
      "验收"
    ]
  },
  {
    "id": "cm2-special-numbers-1",
    "chapter": "cm2-special-numbers",
    "level": 1,
    "question": "Stirling数是什么？",
    "answer": "第一类连接排列循环与升降阶乘，第二类计数集合划分。",
    "tags": [
      "第6章 特殊数",
      "Stirling数"
    ]
  },
  {
    "id": "cm2-special-numbers-2",
    "chapter": "cm2-special-numbers",
    "level": 2,
    "question": "Eulerian数与调和数如何连接？",
    "answer": "按上升或下降次数细分排列，并形成多项式恒等式。 前n个倒数之和，常出现在平均复杂度和随机过程。",
    "tags": [
      "第6章 特殊数",
      "推导"
    ]
  },
  {
    "id": "cm2-special-numbers-3",
    "chapter": "cm2-special-numbers",
    "level": 3,
    "question": "如何检查Bernoulli数的边界？",
    "answer": "通过生成函数定义并编码幂和与Euler求和公式。 加入零规模、端点和反例：把两类Stirling数的对象和符号混用。",
    "tags": [
      "第6章 特殊数",
      "边界"
    ]
  },
  {
    "id": "cm2-special-numbers-4",
    "chapter": "cm2-special-numbers",
    "level": 4,
    "question": "如何验收Fibonacci与continuant？",
    "answer": "二阶递推、矩阵幂和连分数行列式共享同一结构。 不要把特殊数当表格记忆；为每个序列保留组合对象、递推、生成函数和前几项，用两种定义交叉验收。",
    "tags": [
      "第6章 特殊数",
      "验收"
    ]
  },
  {
    "id": "cm2-generating-functions-1",
    "chapter": "cm2-generating-functions",
    "level": 1,
    "question": "普通生成函数是什么？",
    "answer": "把序列a_n编码为A(z)=sum a_n z^n，不要求解析收敛也可形式运算。",
    "tags": [
      "第7章 生成函数",
      "普通生成函数"
    ]
  },
  {
    "id": "cm2-generating-functions-2",
    "chapter": "cm2-generating-functions",
    "level": 2,
    "question": "系数提取与卷积如何连接？",
    "answer": "记号[z^n]A(z)返回z的n次项系数，把代数结果还原为序列。 生成函数乘法的系数是两个序列的Cauchy卷积。",
    "tags": [
      "第7章 生成函数",
      "推导"
    ]
  },
  {
    "id": "cm2-generating-functions-3",
    "chapter": "cm2-generating-functions",
    "level": 3,
    "question": "如何检查指数生成函数的边界？",
    "answer": "用a_n除以n阶乘作为系数，适合带标签组合对象。 加入零规模、端点和反例：索引平移后遗漏初值修正项，得到看似漂亮但错误的有理函数。",
    "tags": [
      "第7章 生成函数",
      "边界"
    ]
  },
  {
    "id": "cm2-generating-functions-4",
    "chapter": "cm2-generating-functions",
    "level": 4,
    "question": "如何验收Dirichlet生成函数？",
    "answer": "用a_n除以n的s次方编码算术函数，使乘法对应Dirichlet卷积。 解递推时先乘z的n次方并对合法n求和，单独处理被移位漏掉的初值项；最后用系数展开与原递推逐项对照。",
    "tags": [
      "第7章 生成函数",
      "验收"
    ]
  },
  {
    "id": "cm2-discrete-probability-1",
    "chapter": "cm2-discrete-probability",
    "level": 1,
    "question": "概率空间是什么？",
    "answer": "样本空间、事件和概率测度共同定义随机试验。",
    "tags": [
      "第8章 离散概率",
      "概率空间"
    ]
  },
  {
    "id": "cm2-discrete-probability-2",
    "chapter": "cm2-discrete-probability",
    "level": 2,
    "question": "期望线性与方差如何连接？",
    "answer": "无论随机变量是否独立，有限和的期望等于期望之和。 测量相对均值的平方偏差；协方差决定和的方差能否相加。",
    "tags": [
      "第8章 离散概率",
      "推导"
    ]
  },
  {
    "id": "cm2-discrete-probability-3",
    "chapter": "cm2-discrete-probability",
    "level": 3,
    "question": "如何检查概率生成函数的边界？",
    "answer": "离散非负整数变量的PGF编码概率，导数在一处给阶乘矩。 加入零规模、端点和反例：误以为期望线性要求随机变量相互独立。",
    "tags": [
      "第8章 离散概率",
      "边界"
    ]
  },
  {
    "id": "cm2-discrete-probability-4",
    "chapter": "cm2-discrete-probability",
    "level": 4,
    "question": "如何验收指示变量？",
    "answer": "把事件表示为零一变量，使计数的期望转化为事件概率之和。 哈希碰撞数写成每对键是否碰撞的指示变量之和，即使这些事件不独立也能直接求期望；方差分析再单独检查协方差。",
    "tags": [
      "第8章 离散概率",
      "验收"
    ]
  },
  {
    "id": "cm2-asymptotics-1",
    "chapter": "cm2-asymptotics",
    "level": 1,
    "question": "增长层级是什么？",
    "answer": "对数、幂、指数和阶乘形成严格增长关系，为主导项比较提供坐标。",
    "tags": [
      "第9章 渐近分析",
      "增长层级"
    ]
  },
  {
    "id": "cm2-asymptotics-2",
    "chapter": "cm2-asymptotics",
    "level": 2,
    "question": "大O记号与渐近等价如何连接？",
    "answer": "给出最终被常数倍上界控制的函数集合，必须声明变量趋向和参数一致性。 f除以g趋于一，比同阶大O保留更精确的首项信息。",
    "tags": [
      "第9章 渐近分析",
      "推导"
    ]
  },
  {
    "id": "cm2-asymptotics-3",
    "chapter": "cm2-asymptotics",
    "level": 3,
    "question": "如何检查Euler求和公式的边界？",
    "answer": "以积分、端点和Bernoulli修正项连接离散和与连续积分。 加入零规模、端点和反例：从f属于O(g)反推g属于O(f)，忽略大O只给单向上界。",
    "tags": [
      "第9章 渐近分析",
      "边界"
    ]
  },
  {
    "id": "cm2-asymptotics-4",
    "chapter": "cm2-asymptotics",
    "level": 4,
    "question": "如何验收误差项？",
    "answer": "渐近展开必须同时交付余项阶和适用范围，不能只写首项。 算法复杂度报告同时给精确小规模值、主导项、常数或次阶项与误差界；用比值或归一化残差检查数据是否进入渐近区间。",
    "tags": [
      "第9章 渐近分析",
      "验收"
    ]
  }
];
