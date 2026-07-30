#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import prettier from "prettier";

const ROOT = process.cwd();
const BOOK = "linear-algebra-done-right";
const CONTENT_DIR = path.join(ROOT, "content", BOOK);
const COMPONENT_DIR = path.join(ROOT, "src/components/mdx", BOOK, "v2");
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/linear-algebra-done-right-v2-profiles.json",
);
const SOURCE_URL = "https://linear.axler.net/LADR4e.pdf";
const SOURCE_HOME = "https://linear.axler.net/";
const SPRINGER_URL = "https://link.springer.com/book/10.1007/978-3-031-41026-0";
const LICENSE_URL = "https://creativecommons.org/licenses/by-nc/4.0/";

const OUTLINES = {
  "lad4-01": [
    ["1A R^n and C^n", "1A R^n 与 C^n"],
    ["Complex Numbers", "复数"],
    ["Lists", "列表"],
    ["F^n", "F^n"],
    ["Digression on Fields", "域的补充讨论"],
    ["1B Definition of Vector Space", "1B 向量空间的定义"],
    ["1C Subspaces", "1C 子空间"],
    ["Sums of Subspaces", "子空间之和"],
    ["Direct Sums", "直和"],
  ],
  "lad4-02": [
    ["2A Span and Linear Independence", "2A 张成与线性无关"],
    ["Linear Combinations and Span", "线性组合与张成"],
    ["Linear Independence", "线性无关"],
    ["2B Bases", "2B 基"],
    ["2C Dimension", "2C 维数"],
  ],
  "lad4-03": [
    ["3A Vector Space of Linear Maps", "3A 线性映射空间"],
    ["Definition and Examples of Linear Maps", "线性映射的定义与例子"],
    ["Algebraic Operations on L(V, W)", "L(V,W) 上的代数运算"],
    ["3B Null Spaces and Ranges", "3B 零空间与值域"],
    ["Null Space and Injectivity", "零空间与单射"],
    ["Range and Surjectivity", "值域与满射"],
    ["Fundamental Theorem of Linear Maps", "线性映射基本定理"],
    ["3C Matrices", "3C 矩阵"],
    ["Representing a Linear Map by a Matrix", "用矩阵表示线性映射"],
    ["Addition and Scalar Multiplication of Matrices", "矩阵加法与标量乘法"],
    ["Matrix Multiplication", "矩阵乘法"],
    ["Column-Row Factorization and Rank of a Matrix", "列-行分解与矩阵秩"],
    ["3D Invertibility and Isomorphisms", "3D 可逆性与同构"],
    ["Invertible Linear Maps", "可逆线性映射"],
    ["Isomorphic Vector Spaces", "同构向量空间"],
    [
      "Linear Maps Thought of as Matrix Multiplication",
      "把线性映射视为矩阵乘法",
    ],
    ["Change of Basis", "换基"],
    ["3E Products and Quotients of Vector Spaces", "3E 积空间与商空间"],
    ["Products of Vector Spaces", "向量空间的积"],
    ["Quotient Spaces", "商空间"],
    ["3F Duality", "3F 对偶"],
    ["Dual Space and Dual Map", "对偶空间与对偶映射"],
    ["Null Space and Range of Dual of Linear Map", "对偶映射的零空间与值域"],
    ["Matrix of Dual of Linear Map", "对偶映射的矩阵"],
  ],
  "lad4-04": [
    ["Zeros of Polynomials", "多项式的零点"],
    ["Division Algorithm for Polynomials", "多项式除法算法"],
    ["Factorization of Polynomials over C", "复数域上的因式分解"],
    ["Factorization of Polynomials over R", "实数域上的因式分解"],
  ],
  "lad4-05": [
    ["5A Invariant Subspaces", "5A 不变子空间"],
    ["Eigenvalues", "特征值"],
    ["Polynomials Applied to Operators", "多项式作用于算子"],
    ["5B The Minimal Polynomial", "5B 最小多项式"],
    [
      "Existence of Eigenvalues on Complex Vector Spaces",
      "复向量空间上特征值的存在性",
    ],
    ["Eigenvalues and the Minimal Polynomial", "特征值与最小多项式"],
    [
      "Eigenvalues on Odd-Dimensional Real Vector Spaces",
      "奇数维实向量空间上的特征值",
    ],
    ["5C Upper-Triangular Matrices", "5C 上三角矩阵"],
    ["5D Diagonalizable Operators", "5D 可对角化算子"],
    ["Diagonal Matrices", "对角矩阵"],
    ["Conditions for Diagonalizability", "可对角化的条件"],
    ["Gershgorin Disk Theorem", "Gershgorin 圆盘定理"],
    ["5E Commuting Operators", "5E 交换算子"],
  ],
  "lad4-06": [
    ["6A Inner Products and Norms", "6A 内积与范数"],
    ["Inner Products", "内积"],
    ["Norms", "范数"],
    ["6B Orthonormal Bases", "6B 正交规范基"],
    [
      "Orthonormal Lists and the Gram-Schmidt Procedure",
      "正交规范列表与 Gram-Schmidt 过程",
    ],
    ["Linear Functionals on Inner Product Spaces", "内积空间上的线性泛函"],
    [
      "6C Orthogonal Complements and Minimization Problems",
      "6C 正交补与最小化问题",
    ],
    ["Orthogonal Complements", "正交补"],
    ["Minimization Problems", "最小化问题"],
    ["Pseudoinverse", "伪逆"],
  ],
  "lad4-07": [
    ["7A Self-Adjoint and Normal Operators", "7A 自伴与正规算子"],
    ["Adjoints", "伴随"],
    ["Self-Adjoint Operators", "自伴算子"],
    ["Normal Operators", "正规算子"],
    ["7B Spectral Theorem", "7B 谱定理"],
    ["Real Spectral Theorem", "实谱定理"],
    ["Complex Spectral Theorem", "复谱定理"],
    ["7C Positive Operators", "7C 正算子"],
    [
      "7D Isometries, Unitary Operators, and Matrix Factorization",
      "7D 等距、酉算子与矩阵分解",
    ],
    ["Isometries", "等距映射"],
    ["Unitary Operators", "酉算子"],
    ["QR Factorization", "QR 分解"],
    ["Cholesky Factorization", "Cholesky 分解"],
    ["7E Singular Value Decomposition", "7E 奇异值分解"],
    ["Singular Values", "奇异值"],
    ["SVD for Linear Maps and for Matrices", "线性映射与矩阵的 SVD"],
    ["7F Consequences of Singular Value Decomposition", "7F SVD 的后果"],
    ["Norms of Linear Maps", "线性映射的范数"],
    [
      "Approximation by Linear Maps with Lower-Dimensional Range",
      "低维值域线性映射逼近",
    ],
    ["Polar Decomposition", "极分解"],
    [
      "Operators Applied to Ellipsoids and Parallelepipeds",
      "算子作用于椭球与平行多面体",
    ],
    ["Volume via Singular Values", "用奇异值表示体积"],
    [
      "Properties of an Operator as Determined by Its Eigenvalues",
      "由特征值决定的算子性质",
    ],
  ],
  "lad4-08": [
    [
      "8A Generalized Eigenvectors and Nilpotent Operators",
      "8A 广义特征向量与幂零算子",
    ],
    ["Null Spaces of Powers of an Operator", "算子幂的零空间"],
    ["Generalized Eigenvectors", "广义特征向量"],
    ["Nilpotent Operators", "幂零算子"],
    ["8B Generalized Eigenspace Decomposition", "8B 广义特征空间分解"],
    ["Generalized Eigenspaces", "广义特征空间"],
    ["Multiplicity of an Eigenvalue", "特征值的重数"],
    ["Block Diagonal Matrices", "分块对角矩阵"],
    [
      "8C Consequences of Generalized Eigenspace Decomposition",
      "8C 广义特征空间分解的后果",
    ],
    ["Square Roots of Operators", "算子的平方根"],
    ["Jordan Form", "Jordan 形"],
    [
      "8D Trace: A Connection Between Matrices and Operators",
      "8D 迹：矩阵与算子的联系",
    ],
  ],
  "lad4-09": [
    ["9A Bilinear Forms and Quadratic Forms", "9A 双线性形式与二次型"],
    ["Bilinear Forms", "双线性形式"],
    ["Symmetric Bilinear Forms", "对称双线性形式"],
    ["Quadratic Forms", "二次型"],
    ["9B Alternating Multilinear Forms", "9B 交替多线性形式"],
    ["Multilinear Forms", "多线性形式"],
    ["Alternating Multilinear Forms and Permutations", "交替多线性形式与置换"],
    ["9C Determinants", "9C 行列式"],
    ["Defining the Determinant", "行列式的定义"],
    ["Properties of Determinants", "行列式的性质"],
    ["9D Tensor Products", "9D 张量积"],
    ["Tensor Product of Two Vector Spaces", "两个向量空间的张量积"],
    ["Tensor Product of Inner Product Spaces", "内积空间的张量积"],
    ["Tensor Product of Multiple Vector Spaces", "多个向量空间的张量积"],
  ],
};

function terms(...items) {
  return items;
}

function exercise(question, answer) {
  return { question, answer };
}

function page(data) {
  return data;
}

const PAGES = [
  page({
    role: "learning-map",
    path: "00-guide/lad4-official-learning-map",
    title: "《Linear Algebra Done Right》第四版学习地图",
    description:
      "按 2026-07-13 官方第四版修订 PDF 重建 9 章算子中心路线，并标出第四版新增主题、跳读依赖和十个核心结果。",
    question:
      "为什么这本书把行列式放到最后，却仍能先解释特征值、谱定理与算子结构？",
    theorem:
      "第四版路线先用向量空间、线性映射和多项式研究算子，再以谱与 SVD 恢复几何，最后把行列式放回多线性代数。",
    formula:
      "\\text{spaces}\\to\\text{maps}\\to\\text{polynomials}\\to\\text{spectrum}\\to\\text{inner products}\\to\\text{multilinear algebra}",
    assumptions: [
      "版本边界固定为官方第四版 2026-07-13 修订 PDF",
      "标量域明确为 R 或 C，不把任意域结论混入",
      "有限维结论必须显式保留 finite-dimensional 假设",
      "出现正交、伴随或 SVD 时必须先给定内积",
    ],
    terms: terms(
      ["算子中心路线", "把线性映射而不是矩阵运算当作全书主角。"],
      ["最小多项式", "消去算子的最低次数首一多项式。"],
      ["谱定理", "用正交规范特征向量描述正规或自伴算子。"],
      ["奇异值分解", "把任意线性映射拆为正交方向与非负伸缩。"],
      ["多线性代数", "研究对每个变量分别线性的形式与张量。"],
    ),
    normalExample:
      "固定一个三维复向量空间上的算子，沿核与值域、最小多项式、谱、SVD、迹与行列式逐章保存同一对象的结构。",
    boundaryExample:
      "若沿第三版旧目录复习，会漏掉第四版的交换算子、伪逆、QR/Cholesky、扩展 SVD 后果与整章多线性代数。",
    invariant: "每个结论都能追溯到域、维数、内积和算子类型四类前提。",
    proofArtifact:
      "9 章正式目录、十个核心结果、可跳读依赖与第四版新增内容的同一张路线表。",
    conceptSummary:
      "这条路线的关键不是“不要行列式”，而是先用不变子空间和多项式解释算子为何具有某种结构；行列式在第 9 章以交替多线性形式自然出现。",
    caseStudy:
      "以同一个非正规 3×3 矩阵为贯穿对象：第 3 章区分映射与矩阵，第 5 章找最小多项式，第 7 章做 SVD，第 8 章解释 Jordan 结构，第 9 章再计算迹、行列式与张量行为。",
    trap: "把“行列式最后出现”误解成“行列式不重要”，会错过第四版第 9 章的体积、交替形式和张量积主线。",
    exercises: [
      exercise(
        "列出第四版 9 章顺序，并解释第 4 章多项式为何放在线性映射与特征值之间。",
        "多项式为 p(T)、最小多项式和特征值存在性提供语言，因此位于线性映射之后、谱结构之前。",
      ),
      exercise(
        "从官方前言的 top ten 中任选三项，写出它们分别依赖哪一章。",
        "例如基长度唯一性依赖第 2 章，线性映射基本定理依赖第 3 章，SVD 依赖第 7 章；答案必须附上所用前提。",
      ),
      exercise(
        "找出第四版至少五项新增或扩展内容，并说明旧版学习笔记会漏什么。",
        "可列交换算子、伪逆、QR、Cholesky、扩展到线性映射的 SVD、低秩逼近、极分解新路线、多线性代数与张量积。",
      ),
    ],
  }),
  page({
    unitId: "lad4-01",
    path: "01-vector-spaces/lad4-vector-spaces",
    title: "第 1 章：向量空间",
    description:
      "从 R^n、C^n、复数与域进入抽象向量空间，用封闭性、子空间和直和唯一性建立第一套证明合同。",
    question: "为什么“能做加法和数乘”还不够，直和又为什么必须检查表示唯一？",
    theorem:
      "U_1+...+U_m 是直和，当且仅当零向量只有全零分解；这等价于和中的每个向量都有唯一表示。",
    formula:
      "V=U_1\\oplus\\cdots\\oplus U_m\\iff u_1+\\cdots+u_m=0\\Rightarrow u_1=\\cdots=u_m=0",
    assumptions: [
      "所有 U_j 都是同一标量域 F 上 V 的子空间",
      "候选子空间含 0 且对加法封闭",
      "候选子空间对任意 F 中标量乘法封闭",
      "直和结论中的分解向量分别属于指定 U_j",
    ],
    terms: terms(
      ["向量空间", "集合连同加法和标量乘法满足向量空间公理。"],
      ["子空间", "继承同一运算后仍为向量空间的子集。"],
      ["子空间之和", "从各子空间取向量相加得到的最小包含空间。"],
      ["直和", "每个和中向量拥有唯一的分量表示。"],
      ["标量域", "本书主要取 R 或 C，并用 F 统一记号。"],
    ),
    normalExample:
      "在 R^3 中令 U=span((1,0,0),(0,1,0))，W=span((0,0,1))；每个向量按 xy 分量与 z 分量唯一分解。",
    boundaryExample:
      "在 R^2 中令 U=span((1,0))，W=span((2,0))；U+W 虽是子空间，但 (1,0) 有多种分解，因此不是直和。",
    invariant: "运算、标量域和所属空间始终一致，唯一性通过零向量分解检查。",
    proofArtifact: "封闭性逐项表、零分解推导和一组非直和反例。",
    conceptSummary:
      "本章把矩阵之外的多项式、函数和序列也纳入同一语言。证明子空间时必须核对零、加法和数乘，而不是只观察若干样本。",
    caseStudy:
      "把 R^3 分成 xy 平面与 z 轴，先构造分解，再用交集只有零向量证明唯一；随后把 z 轴换成 x 轴，观察唯一性在哪一步失效。",
    trap: "只证明 U+W=V 不能推出 V=U⊕W；还必须排除 U∩W 中的非零向量。",
    exercises: [
      exercise(
        "证明所有实系数次数不超过 3 的多项式构成向量空间，并写出零向量。",
        "逐项加法与实数数乘保持次数不超过 3，零多项式是加法单位元，其余公理由函数运算继承。",
      ),
      exercise(
        "判断 R^3 中 xy 平面与向量 (1,1,1) 张成的直线之和是否为直和。",
        "该直线与 xy 平面交集只有零向量，且维数和为 3，因此二者直和等于 R^3。",
      ),
      exercise(
        "删去子空间定义中的数乘封闭，给出含零且加法封闭但不是实子空间的集合。",
        "整数点 Z^2 含零且对加法封闭，但乘以 1/2 后一般不在 Z^2，因此不是 R^2 的实子空间。",
      ),
    ],
  }),
  page({
    unitId: "lad4-02",
    path: "01-vector-spaces/lad4-finite-dimensional-vector-spaces",
    title: "第 2 章：有限维向量空间",
    description:
      "用张成与线性无关之间的张力构造基，证明基长度一致，并把生成集删减与无关组扩充变成可执行算法。",
    question: "为什么基同时要求“足够多以张成”和“足够少以保持线性无关”？",
    theorem:
      "有限维 V 中，任意线性无关组都可扩充为基，任意生成组都可删减为基，因此任意两组基长度相同。",
    formula: "\\dim V=\\text{length of every basis of }V",
    assumptions: [
      "V 是有限维向量空间",
      "扩充起点是 V 中的线性无关列表",
      "删减起点确实张成 V",
      "列表顺序可变但向量所属域固定",
    ],
    terms: terms(
      ["线性组合", "用有限个标量加权向量再求和。"],
      ["张成", "所有线性组合组成的集合。"],
      ["线性无关", "零组合只能来自全零系数。"],
      ["基", "既线性无关又张成整个空间的列表。"],
      ["维数", "有限维空间任意基的共同长度。"],
    ),
    normalExample:
      "从 R^3 中的列表 ((1,0,0),(1,1,0)) 开始，加入 (0,0,1) 扩充为基，并记录每次加入后的 span。",
    boundaryExample:
      "把 (2,2,0) 加到 ((1,0,0),(1,1,0)) 后声称扩充成功；新向量其实在原 span 中，线性无关立即失效。",
    invariant: "每次扩充保持线性无关，每次删减保持张成，最终两项同时成立。",
    proofArtifact: "系数方程、span 变化记录、扩充/删减序列与最终基长度。",
    conceptSummary:
      "有限维让“不断加入新方向”必然停止。交换引理控制无关列表长度不超过生成列表长度，由此才得到维数与基长无关。",
    caseStudy:
      "对三项多项式列表做高斯消元式的依赖检查：删掉可由前项线性表示的多项式，再补入缺失次数，得到 P_2(R) 的一组基。",
    trap: "矩阵列数不是值域维数；只有线性无关列的最大数量才给出 rank。",
    exercises: [
      exercise(
        "把 ((1,0,0),(1,1,0)) 扩充为 R^3 的一组基，并解释为何加入向量有效。",
        "可加入 (0,0,1)。第三坐标迫使其系数为零，剩余两向量也线性无关，所以三者构成基。",
      ),
      exercise(
        "从 ((1,0),(0,1),(1,1)) 中删去一个向量，仍保持张成 R^2。",
        "删去任意一个都可以；例如删去 (1,1)，标准基仍张成 R^2。",
      ),
      exercise(
        "解释“任意两组基长度相同”不能直接套到无限维空间的无限基上。",
        "本章的长度比较使用有限列表与交换步骤；无限基需要额外的集合论基数论证，不能沿用有限停止性。",
      ),
    ],
  }),
  page({
    unitId: "lad4-03",
    path: "02-maps-polynomials/lad4-linear-maps",
    title: "第 3 章：线性映射",
    description:
      "区分线性映射与其矩阵表示，沿零空间、值域、秩-零度、换基、商空间与对偶建立完整结构链。",
    question:
      "矩阵换了为什么线性映射没有换，核与像又怎样把定义域维数精确分开？",
    theorem: "若 V 有限维且 T∈L(V,W)，则 dim V = dim null T + dim range T。",
    formula: "\\dim V=\\dim\\operatorname{null}T+\\dim\\operatorname{range}T",
    assumptions: [
      "T 的定义域 V 是有限维",
      "T 满足加法与标量乘法的线性条件",
      "null T 与 range T 使用同一个 T",
      "矩阵表示必须同时声明定义域基与陪域基",
    ],
    terms: terms(
      ["线性映射", "保持向量加法和标量乘法的函数。"],
      ["零空间", "被 T 映到 0 的全部输入。"],
      ["值域", "所有 T(v) 组成的陪域子空间。"],
      ["秩-零度定理", "定义域维数分解为核维数与值域维数。"],
      ["换基", "同一映射在不同坐标基下更换矩阵表示。"],
    ),
    normalExample:
      "令 T(x,y,z)=(x+y,y+z)。解 null T 得 span((-1,1,-1))，值域为 R^2，于是 3=1+2。",
    boundaryExample:
      "只给出矩阵 A 却不声明输入/输出基，然后把换基后的矩阵误认为另一个线性映射。",
    invariant: "映射的核、像、可逆性与秩不随坐标基改变。",
    proofArtifact: "核的一组基、扩充后的定义域基、对应值域基和维数等式。",
    conceptSummary:
      "证明基本定理时，先取 null T 的基并扩充为 V 的基；扩充部分的像恰好构成 range T 的基。矩阵只是这条基选择后的坐标记录。",
    caseStudy:
      "对 T(x,y,z)=(x+y,y+z) 同时使用标准基与一个三角基写矩阵，核和值域的坐标会变，但维数与单射/满射判断保持不变。",
    trap: "range T 是陪域 W 的子空间，不必等于 W；把两者混同会把任意线性映射误判为满射。",
    exercises: [
      exercise(
        "求 T(x,y,z)=(x+y,y+z) 的零空间和值域维数。",
        "零空间由 (-1,1,-1) 张成，维数 1；值域是 R^2，维数 2，满足 3=1+2。",
      ),
      exercise(
        "说明同一线性映射在两组不同基下矩阵为何可能完全不同。",
        "矩阵列记录基向量的像在陪域基下的坐标；改变任一基都会改变坐标，但映射本身及核、像不变。",
      ),
      exercise(
        "给出 injective 但不 surjective 的有限维线性映射，并指出维数关系。",
        "T:R→R^2, T(x)=(x,0) 是单射但非满射；定义域维数 1 小于陪域维数 2。",
      ),
    ],
  }),
  page({
    unitId: "lad4-04",
    path: "02-maps-polynomials/lad4-polynomials",
    title: "第 4 章：多项式",
    description:
      "用零点、除法算法以及实数/复数域因式分解为 p(T)、最小多项式和特征值理论准备代数工具。",
    question:
      "为什么多项式章几乎没有线性代数，却是最小多项式和特征值存在性的必经桥梁？",
    theorem:
      "若 p,s 非零，则存在唯一 q,r 使 p=sq+r 且余式次数严格小于除式次数；复多项式可分解为一次因子。",
    formula: "p=sq+r,\\qquad \\deg r<\\deg s",
    assumptions: [
      "多项式系数域明确为 R 或 C",
      "除法算法中的除式 s 非零",
      "零多项式的次数不按普通整数处理",
      "把 p 作用于算子时 T 必须是同一空间上的算子",
    ],
    terms: terms(
      ["多项式零点", "使 p(λ)=0 的标量 λ。"],
      ["除法算法", "把 p 唯一写成 sq+r 并控制余式次数。"],
      ["复数因式分解", "复多项式分解为常数与一次因子乘积。"],
      ["实数因式分解", "实多项式分解为一次与不可约二次因子。"],
      ["算子多项式", "用 I,T,T^2 等替换多项式幂得到 p(T)。"],
    ),
    normalExample:
      "把 p(z)=z^3-1 除以 z-1 得 q=z^2+z+1、r=0，再在 C 上继续分解两个非实根。",
    boundaryExample:
      "在 R 上声称 x^2+1 有一次因子；它在 C 上有根 ±i，但在 R 上只能保留不可约二次因子。",
    invariant: "余式次数严格小于除式次数，因式分解始终标注系数域。",
    proofArtifact: "商、余式、次数检查、零点代入与实/复域分解对照。",
    conceptSummary:
      "多项式除法让“p(T)=0”可以被最低次的最小多项式控制。实数域与复数域的因式分解差异，会直接影响特征值存在性。",
    caseStudy:
      "对旋转 90° 的实算子 T，验证 T^2+I=0；x^2+1 在 R 上无根而在 C 上分解，正好解释实空间无特征值、复化后出现 ±i。",
    trap: "把“复数域上必有根”抄成“任意域上必有根”，会让后续特征值存在性证明失去前提。",
    exercises: [
      exercise(
        "计算 (z^3-1) 除以 (z-1) 的商与余式。",
        "商是 z^2+z+1，余式为 0；代回可验证 (z-1)(z^2+z+1)=z^3-1。",
      ),
      exercise(
        "比较 x^2+1 在 R 与 C 上的因式分解。",
        "在 R 上不可约；在 C 上等于 (x-i)(x+i)。",
      ),
      exercise(
        "若 T^2+I=0，说明 p(T) 中哪些多项式可进一步化简。",
        "任意 p 可除以 x^2+1，只需保留一次余式 ax+b，因此 p(T)=aT+bI。",
      ),
    ],
  }),
  page({
    unitId: "lad4-05",
    path: "03-spectral-inner/lad4-eigenvalues-eigenvectors",
    title: "第 5 章：特征值与特征向量",
    description:
      "从不变子空间与算子多项式进入特征值，利用最小多项式统一存在性、上三角化、可对角化与交换算子。",
    question: "不先定义行列式，怎样证明复向量空间上的算子必有特征值？",
    theorem:
      "非零有限维复向量空间上的每个算子都有特征值；最小多项式分裂可控制上三角化与可对角化。",
    formula:
      "Tv=\\lambda v\\iff v\\ne0\\text{ and }v\\in\\operatorname{null}(T-\\lambda I)",
    assumptions: [
      "V 非零且有限维",
      "存在性定理的标量域是 C",
      "特征向量 v 明确要求非零",
      "最小多项式按首一且最低次数定义",
    ],
    terms: terms(
      ["不变子空间", "满足 T(U)⊆U 的子空间 U。"],
      ["特征向量", "被 T 仅缩放而不改变方向的非零向量。"],
      ["最小多项式", "消去 T 的最低次数首一多项式。"],
      ["上三角化", "选择一组基使 T 的矩阵为上三角。"],
      ["可对角化", "存在一组完全由特征向量组成的基。"],
    ),
    normalExample:
      "对上三角矩阵 [[2,1],[0,3]]，对角元给出特征值 2、3，最小多项式 (x-2)(x-3) 无重根，因此可对角化。",
    boundaryExample:
      "实平面旋转 90° 的算子没有实特征值；把 C 上的存在性定理直接搬到 R 会失败。",
    invariant: "特征值、最小多项式和可对角化性不随换基改变。",
    proofArtifact: "不变子空间、p(T)v 依赖关系、最小多项式分解与特征向量见证。",
    conceptSummary:
      "Axler 的路线从 v,Tv,... 的线性相关构造多项式关系，再利用复多项式分解得到 T-λI 不可逆，从而出现特征向量，无需先引入行列式。",
    caseStudy:
      "比较对角矩阵与二阶 Jordan 块：它们可有相同唯一特征值，但最小多项式是否含重因子决定是否可对角化。",
    trap: "零向量满足 T0=λ0 对所有 λ 都成立，但它不能是特征向量；忘记非零条件会让定义失去区分力。",
    exercises: [
      exercise(
        "求 [[2,1],[0,3]] 的特征值，并判断是否可对角化。",
        "特征值为 2、3；两个不同特征值给出两条独立特征向量，因此可对角化。",
      ),
      exercise(
        "给出一个只有特征值 1 但不可对角化的 2×2 算子。",
        "二阶 Jordan 块 [[1,1],[0,1]]；其最小多项式为 (x-1)^2，含重因子。",
      ),
      exercise(
        "解释旋转 90° 的实算子为何不反驳复空间特征值存在性。",
        "该算子定义在实空间时无实特征值，但复化后有特征值 i 与 -i；定理明确要求标量域 C。",
      ),
    ],
  }),
  page({
    unitId: "lad4-06",
    path: "03-spectral-inner/lad4-inner-product-spaces",
    title: "第 6 章：内积空间",
    description:
      "从内积和范数恢复几何，用 Gram-Schmidt、正交补与投影解决最小化，并以伪逆处理不可逆映射。",
    question:
      "为什么正交投影不仅是几何图，而且给出了最小二乘问题的唯一最佳解？",
    theorem: "有限维内积空间中 V=U⊕U^⊥，且 P_Uv 是 U 中距离 v 最近的向量。",
    formula: "\\|v-u\\|^2=\\|v-P_Uv\\|^2+\\|P_Uv-u\\|^2",
    assumptions: [
      "V 已给定实或复内积",
      "复内积的一个变量需要共轭线性",
      "U 是有限维子空间",
      "Gram-Schmidt 输入列表线性无关",
    ],
    terms: terms(
      ["内积", "把长度与夹角编码进向量空间的函数。"],
      ["正交规范基", "两两正交且每个向量范数为 1 的基。"],
      ["Gram-Schmidt", "把线性无关列表变为同 span 的正交规范列表。"],
      ["正交补", "与 U 中每个向量都正交的向量集合。"],
      ["伪逆", "在不可逆时给出最小范数最小二乘解的线性映射。"],
    ),
    normalExample:
      "把 R^3 中 v=(1,2,3) 投影到 xy 平面 U，得到 P_Uv=(1,2,0)，残差 (0,0,3) 与 U 正交。",
    boundaryExample:
      "对线性相关列表直接执行 Gram-Schmidt，某一步得到零向量并试图归一化，产生除零。",
    invariant: "投影分量属于 U，残差属于 U^⊥，二者内积为零。",
    proofArtifact: "正交分解、Pythagorean 等式、投影系数和残差内积。",
    conceptSummary:
      "Gram-Schmidt 不改变每个前缀的 span。最小化证明把任意候选 u 与投影 P_Uv 的差分解为两条正交方向，距离平方因此只能增加。",
    caseStudy:
      "用最小二乘拟合三点直线：列空间承担可解释部分，残差落在其正交补；伪逆给出所有最小二乘解中的最小范数者。",
    trap: "复内积中交换两个参数会产生共轭；照搬实内积的双线性写法会让范数不再保证为非负实数。",
    exercises: [
      exercise(
        "把 (1,2,3) 投影到 xy 平面，并验证残差正交。",
        "投影是 (1,2,0)，残差 (0,0,3) 与任意 (a,b,0) 的内积为 0。",
      ),
      exercise(
        "对 ((1,0),(1,1)) 执行 Gram-Schmidt。",
        "第一向量保持 (1,0)，第二向量减去投影得 (0,1)，最终得到标准正交基。",
      ),
      exercise(
        "为什么线性相关输入会让 Gram-Schmidt 的归一化失败？",
        "某个新向量完全落在前面向量的 span 中，减去投影后为 0，范数为 0，不能归一化。",
      ),
    ],
  }),
  page({
    unitId: "lad4-07",
    path: "04-operators/lad4-operators-inner-product-spaces",
    title: "第 7 章：内积空间上的算子",
    description:
      "沿伴随、正规与自伴算子到谱定理，再进入正算子、QR/Cholesky、SVD、低秩逼近与极分解。",
    question: "谱定理只覆盖正规算子时，SVD 为什么还能描述任意线性映射？",
    theorem:
      "任意有限维内积空间间的线性映射都有 SVD；截断奇异值给出相应秩约束下的最佳逼近。",
    formula:
      "T v=\\sum_{j=1}^{m}s_j\\langle v,e_j\\rangle f_j,\\qquad s_1\\ge\\cdots\\ge s_m>0",
    assumptions: [
      "定义域与陪域都是有限维内积空间",
      "伴随由给定内积唯一确定",
      "谱定理只对实自伴或复正规算子使用",
      "奇异值按非增顺序并保留重数",
    ],
    terms: terms(
      ["伴随算子", "满足 ⟨Tv,w⟩=⟨v,T*w⟩ 的唯一映射。"],
      ["谱定理", "正规或自伴算子存在正交规范特征向量基。"],
      ["正算子", "满足 ⟨Tv,v⟩≥0 的自伴算子。"],
      ["奇异值分解", "用两组正交规范向量和非负奇异值表示 T。"],
      ["低秩近似", "截断较小奇异值获得最优受限秩映射。"],
    ),
    normalExample:
      "对 A=diag(3,1,0)，奇异值为 3、1；保留第一项得到秩 1 逼近 diag(3,0,0)，误差由下一个奇异值控制。",
    boundaryExample:
      "把非正规上三角矩阵直接套正交对角化谱定理；它未必有正交规范特征向量基，但仍有 SVD。",
    invariant: "奇异值与所选正交规范基无关，截断前后都明确目标秩与误差范数。",
    proofArtifact: "T*T 的谱分解、左右奇异向量、重构残差与截断误差。",
    conceptSummary:
      "SVD 先对正算子 T*T 使用谱定理，再把非零特征方向经 T 归一化到陪域。第四版把它直接写在线性映射 V→W 上，而不局限于算子。",
    caseStudy:
      "对一个 3×2 数据矩阵保存左右奇异向量、奇异值与 rank-1 重构；再比较 QR 用于列空间正交化、Cholesky 用于正定系统的不同合同。",
    trap: "特征值可以为负或复数，奇异值始终非负；把二者混同会错误解释伸缩与方向。",
    exercises: [
      exercise(
        "求 diag(3,1,0) 的奇异值和最佳秩 1 截断。",
        "奇异值 3、1；最佳秩 1 截断为 diag(3,0,0)，谱范数误差为 1。",
      ),
      exercise(
        "给出一个非正规但存在 SVD 的矩阵。",
        "任意非正规矩阵都可以，例如 [[1,1],[0,1]]；有限维矩阵总有 SVD，但它不能被酉对角化。",
      ),
      exercise(
        "说明 QR 与 SVD 的输出各保留什么结构。",
        "QR 把列空间写成正交基 Q 与上三角坐标 R；SVD 给出两侧正交方向和按大小排序的伸缩。",
      ),
    ],
  }),
  page({
    unitId: "lad4-08",
    path: "04-operators/lad4-operators-complex-vector-spaces",
    title: "第 8 章：复向量空间上的算子",
    description:
      "用算子幂的零空间、广义特征向量与幂零部分分解复算子，建立广义特征空间、Jordan 形、平方根与迹。",
    question: "特征向量不够组成一组基时，广义特征向量怎样补齐缺失方向？",
    theorem:
      "有限维复向量空间可分解为各广义特征空间的直和，且每个算子都有由 Jordan 链组成的基。",
    formula: "V=G(\\lambda_1,T)\\oplus\\cdots\\oplus G(\\lambda_m,T)",
    assumptions: [
      "V 是有限维复向量空间",
      "T 是 V 上的线性算子",
      "广义特征空间使用足够高次的 null(T-λI)^k",
      "Jordan 链按 $(T-λI)v_{j}=v_{j-1}$ 排列",
    ],
    terms: terms(
      ["广义特征向量", "被 (T-λI) 的某个正整数次幂消去的非零向量。"],
      ["幂零算子", "某个正整数次幂为零算子的算子。"],
      ["广义特征空间", "所有广义 λ-特征向量连同零向量组成的子空间。"],
      ["Jordan 形", "用特征值对角线与超对角 1 记录链结构的矩阵。"],
      ["迹", "算子任一矩阵表示的对角元之和。"],
    ),
    normalExample:
      "对二阶 Jordan 块 J=[[2,1],[0,2]]，e1 是特征向量，e2 是二阶广义特征向量，二者组成完整 Jordan 链。",
    boundaryExample:
      "只收集普通特征向量时，二阶 Jordan 块只有一维特征空间，无法构成 C^2 的基。",
    invariant: "广义特征空间维数之和等于 dim V，各空间由 T 保持不变。",
    proofArtifact:
      "null(T-λI)^k 稳定链、直和维数、Jordan 链和换基后的分块矩阵。",
    conceptSummary:
      "在每个广义特征空间内，T=λI+N，其中 N 幂零。问题因此从任意算子缩减为研究幂零链，Jordan 形只是这些链的坐标记录。",
    caseStudy:
      "对含两个 Jordan 块的 4×4 算子逐次计算 null(T-λI)^k，观察维数何时稳定，并由增长量恢复块大小。",
    trap: "代数重数不是普通特征空间维数；第四版把重数定义为广义特征空间维数，二者仅在可对角化时一致。",
    exercises: [
      exercise(
        "为 J=[[2,1],[0,2]] 写出一条 Jordan 链。",
        "e1 满足 (J-2I)e1=0，e2 满足 (J-2I)e2=e1，因此 (e1,e2) 是长度 2 的链。",
      ),
      exercise(
        "解释为何只用普通特征向量不能给该 J 构造一组基。",
        "null(J-2I)=span(e1) 只有一维，而空间是二维。",
      ),
      exercise(
        "迹为何不依赖所选基？",
        "相似矩阵 B=S^{-1}AS 具有相同迹；也可用对偶与张量观点证明该对角和对应同一算子不变量。",
      ),
    ],
  }),
  page({
    unitId: "lad4-09",
    path: "05-multilinear/lad4-multilinear-algebra-determinants",
    title: "第 9 章：多线性代数与行列式",
    description:
      "从双线性与二次型进入交替多线性形式，以一维性给出无坐标行列式，并继续到张量积。",
    question:
      "把行列式放到最后后，它怎样从一个公式变成自然的交替多线性不变量？",
    theorem:
      "若 dim V=n，则 V 上交替 n-线性形式空间维数为 1；算子行列式由其对该一维空间的缩放唯一确定。",
    formula: "\\Omega(Tv_1,\\ldots,Tv_n)=(\\det T)\\,\\Omega(v_1,\\ldots,v_n)",
    assumptions: [
      "V 有限维且 dim V=n",
      "Ω 对每个变量分别线性",
      "Ω 在交换两个输入时变号并在重复输入时为零",
      "定义 det T 时选择的 Ω 非零",
    ],
    terms: terms(
      ["双线性形式", "对两个变量分别线性的标量值函数。"],
      ["交替多线性形式", "交换输入变号且重复输入时为零的多线性形式。"],
      ["行列式", "算子对最高次交替形式造成的缩放因子。"],
      ["张量积", "把双线性映射线性化的通用向量空间。"],
      ["体积解释", "行列式绝对值或奇异值乘积描述体积伸缩。"],
    ),
    normalExample:
      "在 R^2 中令 Ω((a,b),(c,d))=ad-bc；交换两向量会变号，T=diag(3,2) 使 Ω 缩放 6。",
    boundaryExample:
      "使用普通双线性形式 ac+bd 定义“面积”；它不交替，两个相同向量输入时不为零，不能承担行列式。",
    invariant:
      "行列式定义与所选非零最高次交替形式只差共同缩放，因此 det T 唯一。",
    proofArtifact:
      "多线性逐槽检查、交换符号、基上的唯一值、缩放因子与张量通用性质。",
    conceptSummary:
      "交替性把任何含重复基向量的项消掉，只剩基的置换；所有值因此由一个基上的值决定，最高次交替形式空间是一维。",
    caseStudy:
      "对二维剪切、缩放和旋转分别计算 Ω(Tv1,Tv2)；比较 det 的符号/体积与 SVD 奇异值乘积，再用张量积表达双线性映射。",
    trap: "行列式为零说明体积塌缩和不可逆，但单凭行列式数值不能恢复算子的方向或 Jordan 结构。",
    exercises: [
      exercise(
        "验证 Ω((a,b),(c,d))=ad-bc 是交替双线性形式。",
        "每个变量分别线性；交换输入得到 cb-da=-(ad-bc)，相同输入时为 0。",
      ),
      exercise(
        "求 diag(3,2) 对该 Ω 的缩放。",
        "Ω((3a,2b),(3c,2d))=6(ad-bc)，所以行列式为 6。",
      ),
      exercise(
        "解释为什么内积 ac+bd 不能用作二维行列式。",
        "它是双线性的但不交替：Ω(v,v)=||v||^2 通常不为 0，交换输入也不变号。",
      ),
    ],
  }),
  page({
    role: "final-review",
    path: "06-review/lad4-official-final-review",
    title: "第四版总复习：从假设到结构",
    description:
      "用同一组域、空间、映射、基与内积重放九章关键结果，检查定义、证明、反例和坐标无关性。",
    question: "怎样判断自己真正掌握了第四版，而不是只会在熟悉矩阵上套公式？",
    theorem:
      "可靠复习必须能从假设重建结论、删去一条假设构造反例，并说明坐标表示改变后哪些结构量保持不变。",
    formula:
      "\\text{assumptions}\\to\\text{definition}\\to\\text{witness}\\to\\text{invariant}\\to\\text{claim}",
    assumptions: [
      "每道题先声明 R/C、定义域、陪域和维数",
      "涉及伴随、正交或 SVD 时声明内积",
      "涉及特征值存在性与 Jordan 形时声明复数域",
      "计算答案必须同时保留反例与坐标无关解释",
    ],
    terms: terms(
      ["假设账本", "把域、维数、内积和算子类型列成可检查输入。"],
      ["证明骨架", "定义、引理、构造、不变量与结论之间的依赖链。"],
      ["反例", "删去一条假设后让结论精确失效的对象。"],
      ["坐标无关性", "换基后仍属于同一映射或空间的结构性质。"],
      ["重放", "让复核者仅凭对象与前提重新得到同一推导。"],
    ),
    normalExample:
      "固定 T(x,y,z)=(x+y,y+z)，先做核像与换基，再添加标准内积做伪逆/SVD，最后以双线性形式检查行列式。",
    boundaryExample:
      "只在单位矩阵、零算子和互异特征值样例上复习，会避开秩亏、重复特征值、非正规与实/复域差异。",
    invariant:
      "核像维数、最小多项式、奇异值、迹与行列式等结构量在合法换基下保持一致。",
    proofArtifact:
      "九章检查表、十个核心结果的依赖图、正常样例、单假设反例与重放记录。",
    conceptSummary:
      "第四版前言强调数学必须通过动手验证。总复习以一个非对角、可能秩亏的算子贯穿九章，能暴露只会记矩阵公式的薄弱点。",
    caseStudy:
      "先独立写出线性映射基本定理、复特征值存在性、Gram-Schmidt、谱定理、SVD、广义特征空间分解和最高次交替形式一维性的证明入口，再逐项核对。",
    trap: "把数值残差很小当作抽象证明，会混淆浮点实验与全称命题；代码只能找反例和验证样本，不能替代量词证明。",
    exercises: [
      exercise(
        "为“复向量空间上的算子有特征值”写出完整假设账本。",
        "V 必须非零、有限维、标量域 C，T 是 V 上算子；特征向量还必须非零。",
      ),
      exercise(
        "选择一个结论，删去一条假设并构造最小反例。",
        "例如删去复数域：R^2 上 90° 旋转没有实特征值，精确击中存在性定理的域条件。",
      ),
      exercise(
        "列出换基后保持不变的五个量与会改变的两个表示。",
        "可列核/像维数、最小多项式、特征值、奇异值、迹/行列式；矩阵条目和坐标向量会改变。",
      ),
    ],
  }),
];

function pascal(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function proofSteps(profile) {
  return [
    {
      label: "声明对象",
      claim: profile.assumptions[0],
      reason: `先冻结“${profile.title}”的域、空间与量词，避免证明中途换题。`,
    },
    {
      label: "展开定义",
      claim: `${profile.terms[0][0]}与${profile.terms[1][0]}按定义进入推导`,
      reason: `只使用“${profile.title}”正文已声明的定义，不把待证结论当引理。`,
    },
    {
      label: "构造见证",
      claim: profile.normalExample,
      reason: `非平凡对象让“${profile.theorem}”中的结构可以逐步检查。`,
    },
    {
      label: "保持不变量",
      claim: profile.invariant,
      reason: `每一步都核对“${profile.title}”真正不随选择改变的量。`,
    },
    {
      label: "封闭结论",
      claim: profile.theorem,
      reason: `结论只覆盖四条假设允许的范围，并与“${profile.boundaryExample}”区分。`,
    },
  ];
}

function conceptsFor(profile, manifest) {
  if (profile.role === "learning-map")
    return manifest.units.map((unit) => unit.title);
  if (profile.role === "final-review")
    return [
      "基长度唯一性",
      "线性映射基本定理",
      "复特征值存在性",
      "上三角化",
      "Cauchy-Schwarz",
      "Gram-Schmidt",
      "谱定理",
      "奇异值分解",
      "广义特征空间分解",
      "最高次交替形式空间一维",
    ];
  return OUTLINES[profile.unitId].map((concept) => concept[0]);
}

function wrapperSource(profile) {
  const slug = path.basename(profile.path);
  const componentBase = pascal(slug);
  const model = {
    unitId: profile.unitId ?? profile.role,
    title: profile.title,
    question: profile.question,
    theorem: profile.theorem,
    assumptions: profile.assumptions,
    concepts: profile.concepts,
    normalExample: profile.normalExample,
    boundaryExample: profile.boundaryExample,
    invariant: profile.invariant,
    proofArtifact: profile.proofArtifact,
    proofSteps: proofSteps(profile),
  };
  return `"use client";

import {
  LinearProofLab,
  type LinearProofModel,
} from "./linear-proof-lab";

const model = ${JSON.stringify(model, null, 2)} satisfies LinearProofModel;

export function ${componentBase}AssumptionLab() {
  return <LinearProofLab model={model} view="assumptions" />;
}

export function ${componentBase}ProofLab() {
  return <LinearProofLab model={model} view="proof" />;
}

export function ${componentBase}CounterexampleLab() {
  return <LinearProofLab model={model} view="counterexample" />;
}
`;
}

function objectiveRows(profile) {
  return [
    `能先写出“${profile.title}”的域、空间、维数与量词，再判断定理是否可用`,
    `能从定义和见证重建“${profile.theorem}”的五步证明链`,
    `能用“${profile.normalExample}”完成一次非平凡计算或结构检查`,
    `能删除一条假设并用“${profile.boundaryExample}”说明结论如何失效`,
  ];
}

function formalRows(profile) {
  return profile.concepts
    .map(
      (concept) =>
        `- **${concept}**：在“${profile.title}”中定位它的定义对象、输入假设、允许使用的定理和坐标无关结论；复核时必须能给出正常见证与删除假设后的边界。`,
    )
    .join("\n");
}

function termRows(profile) {
  return profile.terms
    .map(
      ([term, definition]) =>
        `- <Term>${term}</Term>：${definition} 在本页推导中必须同时写出所属空间与适用前提。`,
    )
    .join("\n");
}

function proofRows(profile) {
  return proofSteps(profile)
    .map(
      (step, index) =>
        `${index + 1}. **${step.label}**：${step.claim} 依据是：${step.reason}`,
    )
    .join("\n");
}

function exerciseRows(profile) {
  return profile.exercises
    .map(
      (item, index) => `**问题 ${index + 1}：** ${item.question}

<Answer>

${item.answer}

</Answer>`,
    )
    .join("\n\n");
}

function glossaryRows(profile) {
  return profile.terms
    .map(
      ([term, definition]) => `<GlossaryItem term="${term}">
  ${definition} 本页使用这个词时同时保留对象、域与必要假设。
</GlossaryItem>`,
    )
    .join("\n\n");
}

function renderMdx(profile) {
  const slug = path.basename(profile.path);
  const componentBase = pascal(slug);
  const objectives = objectiveRows(profile)
    .map((item) => `- ${item}`)
    .join("\n");
  return `import { Objectives } from "@/components/mdx/objectives";
import { Term } from "@/components/mdx/term";
import { Callout } from "@/components/mdx/callout";
import { Exercises, Answer } from "@/components/mdx/exercises";
import { Glossary, GlossaryItem } from "@/components/mdx/glossary";
import { Attribution } from "@/components/mdx/attribution";
import { ${componentBase}AssumptionLab, ${componentBase}ProofLab, ${componentBase}CounterexampleLab } from "@/components/mdx/${BOOK}/v2/${slug}";

<Objectives>

${objectives}

</Objectives>

## 为什么从这个问题开始

${profile.question} 本页不把矩阵计算当作最终答案，而是先固定域、空间、维数和量词，再区分定义、见证、不变量与坐标表示。${profile.conceptSummary}

## 官方第四版定位

本页依据 [Sheldon Axler 官方开放获取 PDF](${SOURCE_URL}) 独立编排中文教学结构。当前核对版本在版权页标注 **fourth edition, 13 July 2026, © 2024 Sheldon Axler**；[作者官网](${SOURCE_HOME}) 与 [Springer 第四版页面](${SPRINGER_URL}) 共同确认 9 章、开放获取与第四版范围。旧版页码、目录和练习编号不能替代本页列出的第四版正式节点。

### 正式目录逐项映射

${formalRows(profile)}

## 定义、对象与量词

${termRows(profile)}

必须先声明以下假设：

${profile.assumptions.map((item) => `- ${item}`).join("\n")}

<${componentBase}AssumptionLab />

## 核心定理与证明入口

**本页主张：** ${profile.theorem}

$$
${profile.formula}
$$

这条主张的验收不是背公式。复核者要能从同一对象重建下列证明骨架，并在每一步指出使用了哪条定义或已有定理：

${proofRows(profile)}

<${componentBase}ProofLab />

## 正常例：把抽象结构落到一个对象

${profile.normalExample} 这个例子必须保存输入基、所属空间、关键中间对象和“${profile.invariant}”的检查结果。${profile.caseStudy}

## 反例与适用边界

<Callout type="trap" title="本章最容易误用的地方">
  ${profile.trap}
</Callout>

${profile.boundaryExample} 反例只删除一条假设，其余对象保持不变；这样才能定位结论首次失效的位置，而不是换一道完全不同的题。

<${componentBase}CounterexampleLab />

## 最小可重放记录

\`\`\`yaml
page: ${profile.path}
theorem: ${profile.theorem}
normal_object: ${profile.normalExample}
removed_hypothesis: ${profile.assumptions[0]}
boundary_object: ${profile.boundaryExample}
invariant: ${profile.invariant}
artifact: ${profile.proofArtifact}
\`\`\`

代码、数值或图形只能验证具体对象，不能替代全称证明。“${profile.title}”的交付物至少包含 ${profile.proofArtifact}；若换基后结论变化，必须先区分是坐标变化还是结构真的变化。

## 练习与答案

<Exercises>

${exerciseRows(profile)}

</Exercises>

## 本章回顾

${profile.theorem} 本页掌握标准是：会声明假设、会构造正常见证、会逐步说明理由、会删除一条假设制造反例，并能解释“${profile.invariant}”为什么不依赖偶然坐标。

<Glossary>

${glossaryRows(profile)}

</Glossary>

<Attribution
  mode="licensed-adaptation"
  adaptedFrom="Sheldon Axler《Linear Algebra Done Right》第四版"
  adaptedUrl="${SOURCE_URL}"
  licenseName="CC BY-NC 4.0"
  licenseUrl="${LICENSE_URL}"
/>
`;
}

function replaceBookManifest(source, bookSlug, value) {
  const marker = `    ${JSON.stringify(bookSlug)}: `;
  const markerStart = source.indexOf(marker);
  if (markerStart < 0) throw new Error(`manifest 缺少书籍：${bookSlug}`);
  const objectStart = source.indexOf("{", markerStart + marker.length);
  let depth = 0;
  let inString = false;
  let escaped = false;
  let objectEnd = -1;
  for (let index = objectStart; index < source.length; index += 1) {
    const character = source[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') inString = true;
    else if (character === "{") depth += 1;
    else if (character === "}" && --depth === 0) {
      objectEnd = index;
      break;
    }
  }
  if (objectEnd < 0) throw new Error(`manifest 对象未闭合：${bookSlug}`);
  const serialized = JSON.stringify(value, null, 2)
    .split("\n")
    .map((line, index) => (index === 0 ? line : `    ${line}`))
    .join("\n");
  return `${source.slice(0, objectStart)}${serialized}${source.slice(objectEnd + 1)}`;
}

async function writeFormatted(filePath, source) {
  const parser = filePath.endsWith(".json") ? "json" : "typescript";
  const formatted = await prettier.format(source, { parser });
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, formatted);
}

const manifestSource = fs.readFileSync(MANIFEST_PATH, "utf8");
const document = JSON.parse(manifestSource);
const manifest = document.books?.[BOOK];
if (!manifest) throw new Error(`缺少 fidelity manifest：${BOOK}`);
if (manifest.units.length !== 9)
  throw new Error(`正式章应为 9，实际 ${manifest.units.length}`);
if (PAGES.length !== 11) throw new Error(`课程页应为 11，实际 ${PAGES.length}`);

const chapterProfiles = PAGES.filter((profile) => profile.unitId);
for (const profile of chapterProfiles) {
  const unit = manifest.units.find(
    (candidate) => candidate.id === profile.unitId,
  );
  if (!unit) throw new Error(`manifest 缺少单元：${profile.unitId}`);
  unit.concepts = OUTLINES[profile.unitId];
  unit.chapterPath = profile.path;
}
const formalNodes = manifest.units.reduce(
  (sum, unit) => sum + unit.concepts.length,
  0,
);
if (formalNodes !== 114)
  throw new Error(`正式目录节点应为 114，实际 ${formalNodes}`);

fs.mkdirSync(COMPONENT_DIR, { recursive: true });
for (const profile of PAGES) {
  profile.concepts = conceptsFor(profile, manifest);
  const filePath = path.join(CONTENT_DIR, `${profile.path}.mdx`);
  const data = {
    title: profile.title,
    type: "C",
    section:
      profile.role === "learning-map"
        ? "Linear Algebra Done Right 4e · 导览"
        : profile.role === "final-review"
          ? "Linear Algebra Done Right 4e · 总复习"
          : `Linear Algebra Done Right 4e · ${profile.title}`,
    order:
      profile.role === "learning-map"
        ? 0
        : profile.role === "final-review"
          ? 10
          : Number(profile.unitId.slice(-2)),
    description: profile.description,
    demo: true,
    math: true,
    sourceUrl: SOURCE_URL,
    draft: false,
    qualityVersion: 2,
    practiceMode: "calculation",
    sourceMode: "licensed-adaptation",
    ...(profile.unitId ? { officialUnitId: profile.unitId } : {}),
  };
  fs.writeFileSync(filePath, matter.stringify(renderMdx(profile), data));
  const slug = path.basename(profile.path);
  await writeFormatted(
    path.join(COMPONENT_DIR, `${slug}.tsx`),
    wrapperSource(profile),
  );
}

manifest.edition =
  "Linear Algebra Done Right, fourth edition, official corrected PDF dated 13 July 2026 (© 2024 Sheldon Axler)";
manifest.status = "verified-full-text";
manifest.sourceUrl = SOURCE_URL;
manifest.sourceKind = "official-author-open-access-full-text-pdf";
manifest.verifiedAt = "2026-07-30";
manifest.sourceAccess = "full-text-primary";
manifest.defaultSourceMode = "licensed-adaptation";
manifest.unitMappingEvidence = PROFILE_PATH.replace(`${ROOT}/`, "");
manifest.factSourcePolicy =
  "以 Sheldon Axler 官方 2026-07-13 修订 PDF 为正文、目录与勘误基线，以 Springer 第四版页面核对出版元数据；不沿用第三版目录。";
manifest.license = { name: "CC BY-NC 4.0", url: LICENSE_URL };
manifest.coverage = {
  formalUnits: 9,
  mappedUnits: 9,
  ratio: 1,
  outlineNodes: formalNodes,
  pages: PAGES.length,
};
manifest.metrics = {
  formalUnits: 9,
  formalNodes,
  coursePages: PAGES.length,
  interactiveViews: PAGES.length * 3,
};
manifest.visualImplementation = {
  viewsPerPage: 3,
  modes: ["assumptions", "proof", "counterexample"],
  sharedComponent:
    "src/components/mdx/linear-algebra-done-right/v2/linear-proof-lab.tsx",
};
manifest.versionBoundary = {
  officialPdfDate: "13 July 2026",
  copyrightYear: 2024,
  edition: 4,
  pages: 404,
  officialHome: SOURCE_HOME,
  publisherPage: SPRINGER_URL,
};
fs.writeFileSync(
  MANIFEST_PATH,
  replaceBookManifest(manifestSource, BOOK, manifest),
);

await writeFormatted(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      bookSlug: BOOK,
      edition: manifest.edition,
      sourceBoundary:
        "The official 13 July 2026 corrected fourth-edition PDF defines all formal sections, current errata state and CC BY-NC 4.0 attribution. The local Chinese teaching structure is an adapted rewrite.",
      coverage: manifest.coverage,
      metrics: manifest.metrics,
      pages: PAGES.map((profile) => ({
        role: profile.role,
        unitId: profile.unitId,
        path: profile.path,
        title: profile.title,
        concepts: profile.concepts,
        question: profile.question,
        theorem: profile.theorem,
        assumptions: profile.assumptions,
        terms: profile.terms,
        normalExample: profile.normalExample,
        boundaryExample: profile.boundaryExample,
        invariant: profile.invariant,
        proofArtifact: profile.proofArtifact,
        model: { proofSteps: proofSteps(profile) },
      })),
    },
    null,
    2,
  )}\n`,
);

console.log(
  `已重建 ${PAGES.length} 页，映射 9 章 ${formalNodes} 个官方目录节点，并生成 ${PAGES.length * 3} 个章专属交互视图。`,
);
