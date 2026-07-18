import type { ReviewQuestion } from "./types";
export const lad4OfficialChapterQuestions:ReviewQuestion[]=[
  {
    "id": "lad4-vector-spaces-1",
    "chapter": "lad4-vector-spaces",
    "level": 1,
    "question": "向量空间的完整定义是什么？",
    "answer": "集合连同向量加法和标量乘法满足八条公理，标量域取实数或复数。",
    "tags": [
      "第1章 向量空间",
      "向量空间"
    ]
  },
  {
    "id": "lad4-vector-spaces-2",
    "chapter": "lad4-vector-spaces",
    "level": 2,
    "question": "子空间与子空间和如何连接？",
    "answer": "向量空间的子集若含零向量且对加法和标量乘封闭，则自身也是向量空间。 多个子空间中各取一个向量相加所得的最小包含它们的子空间。",
    "tags": [
      "第1章 向量空间",
      "证明"
    ]
  },
  {
    "id": "lad4-vector-spaces-3",
    "chapter": "lad4-vector-spaces",
    "level": 3,
    "question": "删除哪项假设会破坏直和？",
    "answer": "先逐项检查域、维数、非零、内积与正交假设。反例提示：只验证集合含零向量就称为子空间，漏掉加法与标量乘封闭。",
    "tags": [
      "第1章 向量空间",
      "反例"
    ]
  },
  {
    "id": "lad4-vector-spaces-4",
    "chapter": "lad4-vector-spaces",
    "level": 4,
    "question": "如何验收标量域？",
    "answer": "实数域与复数域决定特征值、内积和算子结构的差异。 把多项式、函数和矩阵都当向量后，只需验证封闭性就能复用同一套线性结构；证明时必须说明标量域，因为某些实空间的算子在复数域上才有特征值。",
    "tags": [
      "第1章 向量空间",
      "验收"
    ]
  },
  {
    "id": "lad4-finite-dimensional-vector-spaces-1",
    "chapter": "lad4-finite-dimensional-vector-spaces",
    "level": 1,
    "question": "张成的完整定义是什么？",
    "answer": "一个向量列表所有线性组合构成的集合，是包含该列表的最小子空间。",
    "tags": [
      "第2章 有限维向量空间",
      "张成"
    ]
  },
  {
    "id": "lad4-finite-dimensional-vector-spaces-2",
    "chapter": "lad4-finite-dimensional-vector-spaces",
    "level": 2,
    "question": "线性无关与基如何连接？",
    "answer": "只有全零系数才能给出零向量的线性组合，意味着表示没有冗余。 既线性无关又张成空间的向量列表，使每个向量拥有唯一坐标。",
    "tags": [
      "第2章 有限维向量空间",
      "证明"
    ]
  },
  {
    "id": "lad4-finite-dimensional-vector-spaces-3",
    "chapter": "lad4-finite-dimensional-vector-spaces",
    "level": 3,
    "question": "删除哪项假设会破坏维数？",
    "answer": "先逐项检查域、维数、非零、内积与正交假设。反例提示：把张成空间的生成列表当成基，未检查其中是否存在冗余向量。",
    "tags": [
      "第2章 有限维向量空间",
      "反例"
    ]
  },
  {
    "id": "lad4-finite-dimensional-vector-spaces-4",
    "chapter": "lad4-finite-dimensional-vector-spaces",
    "level": 4,
    "question": "如何验收基扩充？",
    "answer": "线性无关列表可扩充为基，张成列表可删减为基。 数据特征列是否冗余可转化为线性无关问题；选基不是寻找唯一的一组向量，而是在保持张成的同时删除冗余，并用秩或重构残差验收。",
    "tags": [
      "第2章 有限维向量空间",
      "验收"
    ]
  },
  {
    "id": "lad4-linear-maps-1",
    "chapter": "lad4-linear-maps",
    "level": 1,
    "question": "线性映射的完整定义是什么？",
    "answer": "保持向量加法和标量乘法的映射，由一组基上的取值唯一确定。",
    "tags": [
      "第3章 线性映射",
      "线性映射"
    ]
  },
  {
    "id": "lad4-linear-maps-2",
    "chapter": "lad4-linear-maps",
    "level": 2,
    "question": "核与像与秩-零度定理如何连接？",
    "answer": "核记录被映到零的方向，像记录可以到达的输出。 有限维定义域的维数等于核维数与像维数之和。",
    "tags": [
      "第3章 线性映射",
      "证明"
    ]
  },
  {
    "id": "lad4-linear-maps-3",
    "chapter": "lad4-linear-maps",
    "level": 3,
    "question": "删除哪项假设会破坏商空间？",
    "answer": "先逐项检查域、维数、非零、内积与正交假设。反例提示：把零空间与值为零的单个向量混淆，或把像误认为整个陪域。",
    "tags": [
      "第3章 线性映射",
      "反例"
    ]
  },
  {
    "id": "lad4-linear-maps-4",
    "chapter": "lad4-linear-maps",
    "level": 4,
    "question": "如何验收对偶映射？",
    "answer": "把输出空间上的线性泛函拉回定义域，揭示核、像和转置矩阵关系。 接口只暴露矩阵会隐藏定义域、陪域和基。应同时记录T的输入空间、输出空间、核基、像基与换基矩阵，用秩-零度和往返映射作为验收不变量。",
    "tags": [
      "第3章 线性映射",
      "验收"
    ]
  },
  {
    "id": "lad4-polynomials-1",
    "chapter": "lad4-polynomials",
    "level": 1,
    "question": "多项式零点的完整定义是什么？",
    "answer": "若p(lambda)为零，则lambda是p的零点且z减lambda整除p。",
    "tags": [
      "第4章 多项式",
      "多项式零点"
    ]
  },
  {
    "id": "lad4-polynomials-2",
    "chapter": "lad4-polynomials",
    "level": 2,
    "question": "除法算法与复数因式分解如何连接？",
    "answer": "对非零多项式s，唯一存在q和r使p=sq+r且r次数低于s。 非常数复系数多项式可分解为一次因子的乘积。",
    "tags": [
      "第4章 多项式",
      "证明"
    ]
  },
  {
    "id": "lad4-polynomials-3",
    "chapter": "lad4-polynomials",
    "level": 3,
    "question": "删除哪项假设会破坏实数因式分解？",
    "answer": "先逐项检查域、维数、非零、内积与正交假设。反例提示：把实系数多项式也默认能全部分解成实一次因子。",
    "tags": [
      "第4章 多项式",
      "反例"
    ]
  },
  {
    "id": "lad4-polynomials-4",
    "chapter": "lad4-polynomials",
    "level": 4,
    "question": "如何验收算子多项式？",
    "answer": "把变量替换为线性算子并以复合作为乘法，为最小多项式提供语言。 后续求最小多项式前先区分标量多项式p(z)与算子多项式p(T)。同一系数序列在算子环境中按复合求幂，验收点是p(T)作用于一组基是否全为零。",
    "tags": [
      "第4章 多项式",
      "验收"
    ]
  },
  {
    "id": "lad4-eigenvalues-eigenvectors-1",
    "chapter": "lad4-eigenvalues-eigenvectors",
    "level": 1,
    "question": "不变子空间的完整定义是什么？",
    "answer": "子空间U满足T(U)包含于U，可在更小空间中研究算子结构。",
    "tags": [
      "第5章 特征值与特征向量",
      "不变子空间"
    ]
  },
  {
    "id": "lad4-eigenvalues-eigenvectors-2",
    "chapter": "lad4-eigenvalues-eigenvectors",
    "level": 2,
    "question": "特征向量与最小多项式如何连接？",
    "answer": "非零向量v满足Tv=lambda v，所在一维子空间在T下不变。 首一且次数最低、满足p(T)=0的多项式，其零点正是算子特征值。",
    "tags": [
      "第5章 特征值与特征向量",
      "证明"
    ]
  },
  {
    "id": "lad4-eigenvalues-eigenvectors-3",
    "chapter": "lad4-eigenvalues-eigenvectors",
    "level": 3,
    "question": "删除哪项假设会破坏上三角化？",
    "answer": "先逐项检查域、维数、非零、内积与正交假设。反例提示：把零向量也称为特征向量，导致任意lambda都满足等式。",
    "tags": [
      "第5章 特征值与特征向量",
      "反例"
    ]
  },
  {
    "id": "lad4-eigenvalues-eigenvectors-4",
    "chapter": "lad4-eigenvalues-eigenvectors",
    "level": 4,
    "question": "如何验收可对角化？",
    "answer": "空间有一组特征向量基；等价于最小多项式分裂且没有重复根。 判断可对角化不要只数不同特征值；应比较每个特征空间维数、最小多项式根的重数与重构残差。Gershgorin圆盘可先给出特征值位置的便宜边界。",
    "tags": [
      "第5章 特征值与特征向量",
      "验收"
    ]
  },
  {
    "id": "lad4-inner-product-spaces-1",
    "chapter": "lad4-inner-product-spaces",
    "level": 1,
    "question": "内积的完整定义是什么？",
    "answer": "满足共轭对称、线性和正定的标量函数，用于定义长度与角度。",
    "tags": [
      "第6章 内积空间",
      "内积"
    ]
  },
  {
    "id": "lad4-inner-product-spaces-2",
    "chapter": "lad4-inner-product-spaces",
    "level": 2,
    "question": "正交规范基与Gram-Schmidt如何连接？",
    "answer": "基向量两两正交且长度为一，坐标直接由内积取得。 按顺序减去已有正交方向上的投影，把独立列表转成正交规范列表。",
    "tags": [
      "第6章 内积空间",
      "证明"
    ]
  },
  {
    "id": "lad4-inner-product-spaces-3",
    "chapter": "lad4-inner-product-spaces",
    "level": 3,
    "question": "删除哪项假设会破坏正交补？",
    "answer": "先逐项检查域、维数、非零、内积与正交假设。反例提示：在复内积空间忘记一个槽需要共轭，导致所谓范数不再总是实非负。",
    "tags": [
      "第6章 内积空间",
      "反例"
    ]
  },
  {
    "id": "lad4-inner-product-spaces-4",
    "chapter": "lad4-inner-product-spaces",
    "level": 4,
    "question": "如何验收伪逆？",
    "answer": "把目标投影到range T后求最小范数原像，统一最小二乘与欠定问题。 最小二乘应同时输出投影、残差和正规方程残差；若列向量近线性相关，不直接求逆正规矩阵，而使用QR或SVD构造伪逆。",
    "tags": [
      "第6章 内积空间",
      "验收"
    ]
  },
  {
    "id": "lad4-operators-inner-product-spaces-1",
    "chapter": "lad4-operators-inner-product-spaces",
    "level": 1,
    "question": "伴随算子的完整定义是什么？",
    "answer": "T星满足内积Tv,w等于内积v,T星w，把映射从一个槽移到另一个槽。",
    "tags": [
      "第7章 内积空间上的算子",
      "伴随算子"
    ]
  },
  {
    "id": "lad4-operators-inner-product-spaces-2",
    "chapter": "lad4-operators-inner-product-spaces",
    "level": 2,
    "question": "谱定理与正算子如何连接？",
    "answer": "复正规算子或实自伴算子存在正交规范特征向量基。 对所有v都有内积Tv,v非负，并且拥有唯一正平方根。",
    "tags": [
      "第7章 内积空间上的算子",
      "证明"
    ]
  },
  {
    "id": "lad4-operators-inner-product-spaces-3",
    "chapter": "lad4-operators-inner-product-spaces",
    "level": 3,
    "question": "删除哪项假设会破坏奇异值分解？",
    "answer": "先逐项检查域、维数、非零、内积与正交假设。反例提示：把任何可对角化算子都当正规算子，错误使用正交特征向量基。",
    "tags": [
      "第7章 内积空间上的算子",
      "反例"
    ]
  },
  {
    "id": "lad4-operators-inner-product-spaces-4",
    "chapter": "lad4-operators-inner-product-spaces",
    "level": 4,
    "question": "如何验收低秩近似？",
    "answer": "截断SVD在算子范数或Frobenius范数下给出最佳指定秩近似。 压缩或降维时不能只给保留秩；应报告奇异值谱、截断误差、保留能量与下游任务变化。QR用于稳定正交化，Cholesky只适用于正定结构。",
    "tags": [
      "第7章 内积空间上的算子",
      "验收"
    ]
  },
  {
    "id": "lad4-operators-complex-vector-spaces-1",
    "chapter": "lad4-operators-complex-vector-spaces",
    "level": 1,
    "question": "广义特征向量的完整定义是什么？",
    "answer": "非零v满足(T减lambda I)的某个正整数次幂作用后为零。",
    "tags": [
      "第8章 复向量空间上的算子",
      "广义特征向量"
    ]
  },
  {
    "id": "lad4-operators-complex-vector-spaces-2",
    "chapter": "lad4-operators-complex-vector-spaces",
    "level": 2,
    "question": "幂零算子与广义特征空间如何连接？",
    "answer": "某个正整数次幂为零，存在由Jordan链构成的基。 null(T减lambda I)的足够高次幂，维数给出特征值重数。",
    "tags": [
      "第8章 复向量空间上的算子",
      "证明"
    ]
  },
  {
    "id": "lad4-operators-complex-vector-spaces-3",
    "chapter": "lad4-operators-complex-vector-spaces",
    "level": 3,
    "question": "删除哪项假设会破坏Jordan形？",
    "answer": "先逐项检查域、维数、非零、内积与正交假设。反例提示：把广义特征向量都当普通特征向量，忽略Jordan链中的层级。",
    "tags": [
      "第8章 复向量空间上的算子",
      "反例"
    ]
  },
  {
    "id": "lad4-operators-complex-vector-spaces-4",
    "chapter": "lad4-operators-complex-vector-spaces",
    "level": 4,
    "question": "如何验收迹？",
    "answer": "矩阵对角元之和，与基无关，也等于按重数计的特征值之和。 Jordan形适合解释理论结构，但数值上对扰动极敏感。工程计算用Schur或SVD，教学验收则检查链关系、分块维数、最小多项式和迹。",
    "tags": [
      "第8章 复向量空间上的算子",
      "验收"
    ]
  },
  {
    "id": "lad4-multilinear-algebra-determinants-1",
    "chapter": "lad4-multilinear-algebra-determinants",
    "level": 1,
    "question": "双线性形式的完整定义是什么？",
    "answer": "对两个输入槽分别线性的标量函数；对称形式对应二次型。",
    "tags": [
      "第9章 多线性代数与行列式",
      "双线性形式"
    ]
  },
  {
    "id": "lad4-multilinear-algebra-determinants-2",
    "chapter": "lad4-multilinear-algebra-determinants",
    "level": 2,
    "question": "交替多线性形式与行列式如何连接？",
    "answer": "任意两个输入相同即为零，交换两个槽会改变符号。 算子对最高阶交替形式的缩放因子，因而是与基无关的不变量。",
    "tags": [
      "第9章 多线性代数与行列式",
      "证明"
    ]
  },
  {
    "id": "lad4-multilinear-algebra-determinants-3",
    "chapter": "lad4-multilinear-algebra-determinants",
    "level": 3,
    "question": "删除哪项假设会破坏张量积？",
    "answer": "先逐项检查域、维数、非零、内积与正交假设。反例提示：把行列式只当递归展开公式，忘记其基无关与体积缩放含义。",
    "tags": [
      "第9章 多线性代数与行列式",
      "反例"
    ]
  },
  {
    "id": "lad4-multilinear-algebra-determinants-4",
    "chapter": "lad4-multilinear-algebra-determinants",
    "level": 4,
    "question": "如何验收体积解释？",
    "answer": "行列式绝对值给有向平行多面体体积缩放，奇异值乘积给体积因子。 第四版把行列式放在多线性结构之后：先说明它缩放交替体积，再计算矩阵公式。张量接口则用维数、基张量和双线性泛性质验收。",
    "tags": [
      "第9章 多线性代数与行列式",
      "验收"
    ]
  }
];
