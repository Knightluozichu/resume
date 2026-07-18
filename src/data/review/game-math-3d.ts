import type { ReviewQuestion } from "./types";
export const gameMath3dQuestions:ReviewQuestion[]=[
  {
    "id": "gm3d-official-learning-map-1",
    "chapter": "gm3d-official-learning-map",
    "level": 1,
    "question": "权威目录是什么？",
    "answer": "第二版由14章、附录A几何测试和附录B练习答案组成。",
    "tags": [
      "《3D数学基础》全书导览",
      "权威目录"
    ]
  },
  {
    "id": "gm3d-official-learning-map-2",
    "chapter": "gm3d-official-learning-map",
    "level": 2,
    "question": "空间主线与方位主线如何连接？",
    "answer": "点和向量通过基、矩阵与层级在物体、世界、相机和裁剪空间流动。 欧拉角、矩阵、轴角和四元数服务于不同编辑、计算和插值任务。",
    "tags": [
      "《3D数学基础》全书导览",
      "机制"
    ]
  },
  {
    "id": "gm3d-official-learning-map-3",
    "chapter": "gm3d-official-learning-map",
    "level": 3,
    "question": "如何检查模拟主线的边界？",
    "answer": "导数、积分、动量与冲量把轨迹和碰撞变成可验收状态更新。 必须加入零长度、退化、近阈值或约定切换样例，并解释第一个失效的不变量。",
    "tags": [
      "《3D数学基础》全书导览",
      "边界"
    ]
  },
  {
    "id": "gm3d-official-learning-map-4",
    "chapter": "gm3d-official-learning-map",
    "level": 4,
    "question": "如何验收证据闭环？",
    "answer": "每章同时交付推导、代码、交互图、反例和可重放测试。 学习时维护一个共享3D沙盒，每完成一章就增加一个可视层和一个断言：从坐标轴、向量与矩阵开始，逐步加入相机、图元、光照、刚体和曲线。",
    "tags": [
      "《3D数学基础》全书导览",
      "验收"
    ]
  },
  {
    "id": "gm3d-cartesian-coordinate-systems-1",
    "chapter": "gm3d-cartesian-coordinate-systems",
    "level": 1,
    "question": "笛卡尔坐标系是什么？",
    "answer": "用原点、互相垂直的轴与单位刻度为点分配坐标。",
    "tags": [
      "第1章 笛卡尔坐标系",
      "笛卡尔坐标系"
    ]
  },
  {
    "id": "gm3d-cartesian-coordinate-systems-2",
    "chapter": "gm3d-cartesian-coordinate-systems",
    "level": 2,
    "question": "坐标手性与弧度如何连接？",
    "answer": "右手系与左手系决定正向旋转、叉积和观察方向的符号约定。 以弧长除以半径度量角度，一整圈等于二乘pi。",
    "tags": [
      "第1章 笛卡尔坐标系",
      "机制"
    ]
  },
  {
    "id": "gm3d-cartesian-coordinate-systems-3",
    "chapter": "gm3d-cartesian-coordinate-systems",
    "level": 3,
    "question": "如何检查三角函数的边界？",
    "answer": "正弦与余弦把角度映射为圆周上的坐标分量。 必须加入零长度、退化、近阈值或约定切换样例，并解释第一个失效的不变量。",
    "tags": [
      "第1章 笛卡尔坐标系",
      "边界"
    ]
  },
  {
    "id": "gm3d-cartesian-coordinate-systems-4",
    "chapter": "gm3d-cartesian-coordinate-systems",
    "level": 4,
    "question": "如何验收求和记号？",
    "answer": "用Sigma压缩重复加法，并明确索引的起点、终点和项。 导入模型时先记录源工具的向上轴、前向轴与手性，再通过一个已知朝向的测试三角形验收转换；只看模型是否出现在画面里，会漏掉法线和旋转方向反转。",
    "tags": [
      "第1章 笛卡尔坐标系",
      "验收"
    ]
  },
  {
    "id": "gm3d-vectors-1",
    "chapter": "gm3d-vectors",
    "level": 1,
    "question": "向量与点是什么？",
    "answer": "点描述位置，向量描述位移；两点相减得到向量，点加向量得到点。",
    "tags": [
      "第2章 向量",
      "向量与点"
    ]
  },
  {
    "id": "gm3d-vectors-2",
    "chapter": "gm3d-vectors",
    "level": 2,
    "question": "单位向量与点积如何连接？",
    "answer": "长度为一的向量只保留方向，单位化前必须处理零向量。 分量乘积之和，也等于两向量长度乘夹角余弦。",
    "tags": [
      "第2章 向量",
      "机制"
    ]
  },
  {
    "id": "gm3d-vectors-3",
    "chapter": "gm3d-vectors",
    "level": 3,
    "question": "如何检查叉积的边界？",
    "answer": "生成垂直于两个输入的向量，方向由坐标手性决定。 必须加入零长度、退化、近阈值或约定切换样例，并解释第一个失效的不变量。",
    "tags": [
      "第2章 向量",
      "边界"
    ]
  },
  {
    "id": "gm3d-vectors-4",
    "chapter": "gm3d-vectors",
    "level": 4,
    "question": "如何验收线性代数恒等式？",
    "answer": "交换、结合、分配等规则决定公式能否安全重排。 角色视野判断先把目标位移与角色前向单位化，再比较点积和视野阈值；碰撞法线则用叉积与三角形绕序生成，并用已知朝外的面验收符号。",
    "tags": [
      "第2章 向量",
      "验收"
    ]
  },
  {
    "id": "gm3d-multiple-coordinate-spaces-1",
    "chapter": "gm3d-multiple-coordinate-spaces",
    "level": 1,
    "question": "世界空间是什么？",
    "answer": "场景共享的全局参考系，适合比较不同对象的位置。",
    "tags": [
      "第3章 多个坐标空间",
      "世界空间"
    ]
  },
  {
    "id": "gm3d-multiple-coordinate-spaces-2",
    "chapter": "gm3d-multiple-coordinate-spaces",
    "level": 2,
    "question": "物体空间与相机空间如何连接？",
    "answer": "以模型自身原点和轴为参考，便于复用网格与局部动画。 以观察者为原点，把可见性与投影问题统一到视线方向。",
    "tags": [
      "第3章 多个坐标空间",
      "机制"
    ]
  },
  {
    "id": "gm3d-multiple-coordinate-spaces-3",
    "chapter": "gm3d-multiple-coordinate-spaces",
    "level": 3,
    "question": "如何检查基向量的边界？",
    "answer": "一组独立方向定义坐标轴，坐标是向量在该基下的分量。 必须加入零长度、退化、近阈值或约定切换样例，并解释第一个失效的不变量。",
    "tags": [
      "第3章 多个坐标空间",
      "边界"
    ]
  },
  {
    "id": "gm3d-multiple-coordinate-spaces-4",
    "chapter": "gm3d-multiple-coordinate-spaces",
    "level": 4,
    "question": "如何验收嵌套变换？",
    "answer": "局部空间沿父子层级逐层组合到世界或相机空间。 枪口特效应先从武器骨骼局部空间变到角色空间，再到世界空间；调试时同时画出每一级原点和三条基轴，能定位到底是哪一级方向或尺度错误。",
    "tags": [
      "第3章 多个坐标空间",
      "验收"
    ]
  },
  {
    "id": "gm3d-introduction-to-matrices-1",
    "chapter": "gm3d-introduction-to-matrices",
    "level": 1,
    "question": "矩阵维度是什么？",
    "answer": "m行n列矩阵把n维输入映射为m维输出。",
    "tags": [
      "第4章 矩阵导论",
      "矩阵维度"
    ]
  },
  {
    "id": "gm3d-introduction-to-matrices-2",
    "chapter": "gm3d-introduction-to-matrices",
    "level": 2,
    "question": "矩阵乘法与转置如何连接？",
    "answer": "输出元素是左矩阵一行与右矩阵一列的点积。 沿主对角线交换行列，并反转乘积的顺序。",
    "tags": [
      "第4章 矩阵导论",
      "机制"
    ]
  },
  {
    "id": "gm3d-introduction-to-matrices-3",
    "chapter": "gm3d-introduction-to-matrices",
    "level": 3,
    "question": "如何检查行列约定的边界？",
    "answer": "行向量与列向量都可用，但公式、存储和组合顺序必须一致。 必须加入零长度、退化、近阈值或约定切换样例，并解释第一个失效的不变量。",
    "tags": [
      "第4章 矩阵导论",
      "边界"
    ]
  },
  {
    "id": "gm3d-introduction-to-matrices-4",
    "chapter": "gm3d-introduction-to-matrices",
    "level": 4,
    "question": "如何验收几何解释？",
    "answer": "变换矩阵的基向量像描述坐标网格如何被拉伸、旋转或剪切。 CPU端与着色器对接时同时写明向量在左还是右、矩阵内存是行主序还是列主序、组合按哪一侧发生；用非对称测试矩阵验收，单位矩阵无法暴露转置错误。",
    "tags": [
      "第4章 矩阵导论",
      "验收"
    ]
  },
  {
    "id": "gm3d-matrices-linear-transformations-1",
    "chapter": "gm3d-matrices-linear-transformations",
    "level": 1,
    "question": "旋转矩阵是什么？",
    "answer": "正交且行列式为一，保持长度、角度和朝向。",
    "tags": [
      "第5章 矩阵与线性变换",
      "旋转矩阵"
    ]
  },
  {
    "id": "gm3d-matrices-linear-transformations-2",
    "chapter": "gm3d-matrices-linear-transformations",
    "level": 2,
    "question": "缩放与剪切与正交投影如何连接？",
    "answer": "分别改变基向量长度或让一个轴随另一个轴偏移。 删除垂直于目标直线或平面的分量。",
    "tags": [
      "第5章 矩阵与线性变换",
      "机制"
    ]
  },
  {
    "id": "gm3d-matrices-linear-transformations-3",
    "chapter": "gm3d-matrices-linear-transformations",
    "level": 3,
    "question": "如何检查变换组合的边界？",
    "answer": "矩阵乘法把多个步骤折叠为一次映射，但顺序不可交换。 必须加入零长度、退化、近阈值或约定切换样例，并解释第一个失效的不变量。",
    "tags": [
      "第5章 矩阵与线性变换",
      "边界"
    ]
  },
  {
    "id": "gm3d-matrices-linear-transformations-4",
    "chapter": "gm3d-matrices-linear-transformations",
    "level": 4,
    "question": "如何验收变换分类？",
    "answer": "线性、仿射、可逆、正交和刚体类别给出不同不变量。 模型实例的SRT组合必须用一组非均匀缩放、非零旋转和非零平移的测试姿态验收；只测原点、单位尺度或零角度，会让错误顺序看起来正确。",
    "tags": [
      "第5章 矩阵与线性变换",
      "验收"
    ]
  },
  {
    "id": "gm3d-more-on-matrices-1",
    "chapter": "gm3d-more-on-matrices",
    "level": 1,
    "question": "行列式是什么？",
    "answer": "度量有向面积或体积缩放，零值意味着变换压扁维度而不可逆。",
    "tags": [
      "第6章 矩阵进阶",
      "行列式"
    ]
  },
  {
    "id": "gm3d-more-on-matrices-2",
    "chapter": "gm3d-more-on-matrices",
    "level": 2,
    "question": "逆矩阵与正交矩阵如何连接？",
    "answer": "撤销可逆变换；数值实现应避免显式求逆并检查条件。 基向量两两垂直且单位化，逆等于转置。",
    "tags": [
      "第6章 矩阵进阶",
      "机制"
    ]
  },
  {
    "id": "gm3d-more-on-matrices-3",
    "chapter": "gm3d-more-on-matrices",
    "level": 3,
    "question": "如何检查齐次坐标的边界？",
    "answer": "用第四分量区分点和方向，并把平移纳入矩阵乘法。 必须加入零长度、退化、近阈值或约定切换样例，并解释第一个失效的不变量。",
    "tags": [
      "第6章 矩阵进阶",
      "边界"
    ]
  },
  {
    "id": "gm3d-more-on-matrices-4",
    "chapter": "gm3d-more-on-matrices",
    "level": 4,
    "question": "如何验收透视投影？",
    "answer": "在齐次裁剪空间编码视锥，随后透视除法产生近大远小。 相机投影调试要保存视图空间、裁剪空间、NDC和屏幕空间四组坐标，并测试近平面、远平面和w接近零的点；只看最终像素无法区分矩阵与除法错误。",
    "tags": [
      "第6章 矩阵进阶",
      "验收"
    ]
  },
  {
    "id": "gm3d-polar-coordinate-systems-1",
    "chapter": "gm3d-polar-coordinate-systems",
    "level": 1,
    "question": "二维极坐标是什么？",
    "answer": "用半径和方位角描述平面点，适合绕中心的运动。",
    "tags": [
      "第7章 极坐标系",
      "二维极坐标"
    ]
  },
  {
    "id": "gm3d-polar-coordinate-systems-2",
    "chapter": "gm3d-polar-coordinate-systems",
    "level": 2,
    "question": "坐标别名与柱坐标如何连接？",
    "answer": "不同角度甚至负半径可表示同一点，必须规定规范范围。 在二维极坐标上增加高度，适合圆柱对称场景。",
    "tags": [
      "第7章 极坐标系",
      "机制"
    ]
  },
  {
    "id": "gm3d-polar-coordinate-systems-3",
    "chapter": "gm3d-polar-coordinate-systems",
    "level": 3,
    "question": "如何检查球坐标的边界？",
    "answer": "用半径、方位角和俯仰角描述三维方向与位置。 必须加入零长度、退化、近阈值或约定切换样例，并解释第一个失效的不变量。",
    "tags": [
      "第7章 极坐标系",
      "边界"
    ]
  },
  {
    "id": "gm3d-polar-coordinate-systems-4",
    "chapter": "gm3d-polar-coordinate-systems",
    "level": 4,
    "question": "如何验收坐标转换？",
    "answer": "借助正弦、余弦和atan2在笛卡尔与极坐标之间转换。 环形UI、炮塔瞄准和球形相机适合在极坐标中编辑，但输出给渲染器前要固定角度范围、零半径行为和俯仰极点策略。",
    "tags": [
      "第7章 极坐标系",
      "验收"
    ]
  },
  {
    "id": "gm3d-rotation-three-dimensions-1",
    "chapter": "gm3d-rotation-three-dimensions",
    "level": 1,
    "question": "欧拉角是什么？",
    "answer": "按约定顺序绕三个轴旋转，直观但有顺序依赖与万向节锁。",
    "tags": [
      "第8章 三维旋转",
      "欧拉角"
    ]
  },
  {
    "id": "gm3d-rotation-three-dimensions-2",
    "chapter": "gm3d-rotation-three-dimensions",
    "level": 2,
    "question": "轴角与指数映射与单位四元数如何连接？",
    "answer": "用旋转轴和角度描述角位移，适合小旋转与优化。 单位四元数表示三维旋转，q与负q代表同一方位。",
    "tags": [
      "第8章 三维旋转",
      "机制"
    ]
  },
  {
    "id": "gm3d-rotation-three-dimensions-3",
    "chapter": "gm3d-rotation-three-dimensions",
    "level": 3,
    "question": "如何检查球面插值的边界？",
    "answer": "Slerp沿单位四元数球面的短弧以恒定角速度插值。 必须加入零长度、退化、近阈值或约定切换样例，并解释第一个失效的不变量。",
    "tags": [
      "第8章 三维旋转",
      "边界"
    ]
  },
  {
    "id": "gm3d-rotation-three-dimensions-4",
    "chapter": "gm3d-rotation-three-dimensions",
    "level": 4,
    "question": "如何验收表示转换？",
    "answer": "矩阵、欧拉角、轴角与四元数各有边界，转换必须固定约定。 网络同步方位时保存归一化四元数，插值前做同半球修正；编辑器可以显示欧拉角，但运行时不能假设往返转换后角度分量保持不变。",
    "tags": [
      "第8章 三维旋转",
      "验收"
    ]
  },
  {
    "id": "gm3d-geometric-primitives-1",
    "chapter": "gm3d-geometric-primitives",
    "level": 1,
    "question": "参数射线是什么？",
    "answer": "用起点加方向乘参数表示半直线，并规定参数下界。",
    "tags": [
      "第9章 几何图元",
      "参数射线"
    ]
  },
  {
    "id": "gm3d-geometric-primitives-2",
    "chapter": "gm3d-geometric-primitives",
    "level": 2,
    "question": "包围体与平面方程如何连接？",
    "answer": "AABB与包围球用便宜的保守测试筛掉不可能相交的对象。 单位法线与常数定义平面，也直接给出有符号距离。",
    "tags": [
      "第9章 几何图元",
      "机制"
    ]
  },
  {
    "id": "gm3d-geometric-primitives-3",
    "chapter": "gm3d-geometric-primitives",
    "level": 3,
    "question": "如何检查重心坐标的边界？",
    "answer": "用三个权重表达三角形内点，并插值顶点属性。 必须加入零长度、退化、近阈值或约定切换样例，并解释第一个失效的不变量。",
    "tags": [
      "第9章 几何图元",
      "边界"
    ]
  },
  {
    "id": "gm3d-geometric-primitives-4",
    "chapter": "gm3d-geometric-primitives",
    "level": 4,
    "question": "如何验收多边形三角化？",
    "answer": "将简单多边形拆为三角形，同时处理凹性、绕序和退化边。 宽阶段用AABB筛选，窄阶段用射线或三角形测试；所有图元结构同时记录坐标空间、是否归一化和边界包含规则，避免同一接触在不同平台上忽隐忽现。",
    "tags": [
      "第9章 几何图元",
      "验收"
    ]
  },
  {
    "id": "gm3d-mathematical-topics-graphics-1",
    "chapter": "gm3d-mathematical-topics-graphics",
    "level": 1,
    "question": "渲染方程是什么？",
    "answer": "出射辐亮度由自发光和入射光经材质散射的积分组成。",
    "tags": [
      "第10章 3D图形学中的数学主题",
      "渲染方程"
    ]
  },
  {
    "id": "gm3d-mathematical-topics-graphics-2",
    "chapter": "gm3d-mathematical-topics-graphics",
    "level": 2,
    "question": "视锥与裁剪空间与网格与属性插值如何连接？",
    "answer": "相机参数定义可见体积，裁剪坐标让六个平面测试统一。 索引三角形共享顶点，重心权重在片元内插值纹理坐标和法线。",
    "tags": [
      "第10章 3D图形学中的数学主题",
      "机制"
    ]
  },
  {
    "id": "gm3d-mathematical-topics-graphics-3",
    "chapter": "gm3d-mathematical-topics-graphics",
    "level": 3,
    "question": "如何检查局部光照的边界？",
    "answer": "环境、自发光、漫反射和高光只是完整光传输的局部近似。 必须加入零长度、退化、近阈值或约定切换样例，并解释第一个失效的不变量。",
    "tags": [
      "第10章 3D图形学中的数学主题",
      "边界"
    ]
  },
  {
    "id": "gm3d-mathematical-topics-graphics-4",
    "chapter": "gm3d-mathematical-topics-graphics",
    "level": 4,
    "question": "如何验收切线空间与骨骼？",
    "answer": "局部基支持法线贴图，骨骼矩阵加权支持网格变形。 像素异常时保存模型、世界、视图、裁剪和屏幕坐标，另保存几何法线、切线空间法线和光向量；逐阶段对照比只修改着色器最终颜色更快定位问题。",
    "tags": [
      "第10章 3D图形学中的数学主题",
      "验收"
    ]
  },
  {
    "id": "gm3d-linear-kinematics-calculus-1",
    "chapter": "gm3d-linear-kinematics-calculus",
    "level": 1,
    "question": "速度是什么？",
    "answer": "位置对时间的导数，包含速率和方向。",
    "tags": [
      "第11章 力学1：线性运动学与微积分",
      "速度"
    ]
  },
  {
    "id": "gm3d-linear-kinematics-calculus-2",
    "chapter": "gm3d-linear-kinematics-calculus",
    "level": 2,
    "question": "加速度与导数如何连接？",
    "answer": "速度对时间的导数，可改变速率、方向或两者。 差商在时间间隔趋于零时的极限，描述瞬时变化率。",
    "tags": [
      "第11章 力学1：线性运动学与微积分",
      "机制"
    ]
  },
  {
    "id": "gm3d-linear-kinematics-calculus-3",
    "chapter": "gm3d-linear-kinematics-calculus",
    "level": 3,
    "question": "如何检查积分的边界？",
    "answer": "把微小变化累积为总量，与导数通过微积分基本定理连接。 必须加入零长度、退化、近阈值或约定切换样例，并解释第一个失效的不变量。",
    "tags": [
      "第11章 力学1：线性运动学与微积分",
      "边界"
    ]
  },
  {
    "id": "gm3d-linear-kinematics-calculus-4",
    "chapter": "gm3d-linear-kinematics-calculus",
    "level": 4,
    "question": "如何验收圆周运动？",
    "answer": "恒定速率仍有指向圆心的加速度，大小为速度平方除以半径。 跳跃轨迹先用解析恒加速度公式做基准，再对不同帧率的数值积分结果比较位置和能量误差；记录秒、米等单位，不能用每帧速度掩盖时间步。",
    "tags": [
      "第11章 力学1：线性运动学与微积分",
      "验收"
    ]
  },
  {
    "id": "gm3d-linear-rotational-dynamics-1",
    "chapter": "gm3d-linear-rotational-dynamics",
    "level": 1,
    "question": "牛顿定律是什么？",
    "answer": "合力等于动量变化率；作用与反作用力大小相等方向相反。",
    "tags": [
      "第12章 力学2：线性与旋转动力学",
      "牛顿定律"
    ]
  },
  {
    "id": "gm3d-linear-rotational-dynamics-2",
    "chapter": "gm3d-linear-rotational-dynamics",
    "level": 2,
    "question": "动量与冲量与碰撞响应如何连接？",
    "answer": "冲量是力对时间的积分，直接改变线动量。 沿接触法线求冲量，并结合恢复系数和摩擦处理速度变化。",
    "tags": [
      "第12章 力学2：线性与旋转动力学",
      "机制"
    ]
  },
  {
    "id": "gm3d-linear-rotational-dynamics-3",
    "chapter": "gm3d-linear-rotational-dynamics",
    "level": 3,
    "question": "如何检查转动惯量的边界？",
    "answer": "物体对角速度变化的阻抗，取决于质量相对转轴的分布。 必须加入零长度、退化、近阈值或约定切换样例，并解释第一个失效的不变量。",
    "tags": [
      "第12章 力学2：线性与旋转动力学",
      "边界"
    ]
  },
  {
    "id": "gm3d-linear-rotational-dynamics-4",
    "chapter": "gm3d-linear-rotational-dynamics",
    "level": 4,
    "question": "如何验收数值积分？",
    "answer": "实时模拟离散推进状态，时间步与积分器决定稳定性和误差。 刚体求解器用固定时间步、最大子步数和确定性接触排序；验收自由落体、弹簧、无摩擦碰撞和偏心碰撞四个基准，再观察能量漂移与穿透。",
    "tags": [
      "第12章 力学2：线性与旋转动力学",
      "验收"
    ]
  },
  {
    "id": "gm3d-curves-in-3d-1",
    "chapter": "gm3d-curves-in-3d",
    "level": 1,
    "question": "参数曲线是什么？",
    "answer": "位置是参数t的向量函数，几何形状与采样速度是不同问题。",
    "tags": [
      "第13章 三维曲线",
      "参数曲线"
    ]
  },
  {
    "id": "gm3d-curves-in-3d-2",
    "chapter": "gm3d-curves-in-3d",
    "level": 2,
    "question": "多项式插值与Hermite曲线如何连接？",
    "answer": "构造通过给定数据点的多项式，但高阶全局插值可能振荡。 用端点位置和端点切向量控制一段三次曲线。",
    "tags": [
      "第13章 三维曲线",
      "机制"
    ]
  },
  {
    "id": "gm3d-curves-in-3d-3",
    "chapter": "gm3d-curves-in-3d",
    "level": 3,
    "question": "如何检查Bezier曲线的边界？",
    "answer": "由控制点和Bernstein基加权，de Casteljau算法可稳定求值与细分。 必须加入零长度、退化、近阈值或约定切换样例，并解释第一个失效的不变量。",
    "tags": [
      "第13章 三维曲线",
      "边界"
    ]
  },
  {
    "id": "gm3d-curves-in-3d-4",
    "chapter": "gm3d-curves-in-3d",
    "level": 4,
    "question": "如何验收样条连续性？",
    "answer": "分段曲线通过结点连接，并以参数或几何连续性约束平滑程度。 相机轨迹要分别验收位置连续、切线连续和近似恒速；编辑器显示控制多边形、切向量和曲率热点，运行时按弧长表重参数化，不能假设等间隔t就是等距离。",
    "tags": [
      "第13章 三维曲线",
      "验收"
    ]
  },
  {
    "id": "gm3d-afterword-1",
    "chapter": "gm3d-afterword",
    "level": 1,
    "question": "最小项目是什么？",
    "answer": "用一个可运行场景串联相机、对象变换、碰撞和曲线路径。",
    "tags": [
      "第14章 后记：接下来做什么",
      "最小项目"
    ]
  },
  {
    "id": "gm3d-afterword-2",
    "chapter": "gm3d-afterword",
    "level": 2,
    "question": "可视化调试与数值验收如何连接？",
    "answer": "把基向量、法线、包围体、速度和接触点直接画进场景。 用不变量、解析基准和误差预算判断实现是否可信。",
    "tags": [
      "第14章 后记：接下来做什么",
      "机制"
    ]
  },
  {
    "id": "gm3d-afterword-3",
    "chapter": "gm3d-afterword",
    "level": 3,
    "question": "如何检查知识迁移的边界？",
    "answer": "将同一数学对象在渲染、物理、动画和工具中交叉验证。 必须加入零长度、退化、近阈值或约定切换样例，并解释第一个失效的不变量。",
    "tags": [
      "第14章 后记：接下来做什么",
      "边界"
    ]
  },
  {
    "id": "gm3d-afterword-4",
    "chapter": "gm3d-afterword",
    "level": 4,
    "question": "如何验收继续学习？",
    "answer": "在图形学、动力学、计算几何和数值方法中按项目瓶颈深入。 做一个可切换坐标空间的刚体样例：相机沿Bezier轨迹移动，物体发生旋转碰撞，画面叠加基轴、速度、法线和包围盒；每个模块都保留可重放输入。",
    "tags": [
      "第14章 后记：接下来做什么",
      "验收"
    ]
  },
  {
    "id": "gm3d-geometric-tests-1",
    "chapter": "gm3d-geometric-tests",
    "level": 1,
    "question": "最近点是什么？",
    "answer": "通过投影或逐轴钳制找到图元上距离查询点最近的位置。",
    "tags": [
      "附录A 几何测试",
      "最近点"
    ]
  },
  {
    "id": "gm3d-geometric-tests-2",
    "chapter": "gm3d-geometric-tests",
    "level": 2,
    "question": "相交参数与分离判据如何连接？",
    "answer": "将两个图元方程联立，求满足各自参数范围的解。 找到能把两个图元分开的轴或平面即可证明不相交。",
    "tags": [
      "附录A 几何测试",
      "机制"
    ]
  },
  {
    "id": "gm3d-geometric-tests-3",
    "chapter": "gm3d-geometric-tests",
    "level": 3,
    "question": "如何检查退化输入的边界？",
    "answer": "零方向、零面积、平行、共面和切触需要明确结果语义。 必须加入零长度、退化、近阈值或约定切换样例，并解释第一个失效的不变量。",
    "tags": [
      "附录A 几何测试",
      "边界"
    ]
  },
  {
    "id": "gm3d-geometric-tests-4",
    "chapter": "gm3d-geometric-tests",
    "level": 4,
    "question": "如何验收容差策略？",
    "answer": "容差应与尺度和计算误差相关，不能用一个全局魔法常数。 为每个几何查询固定返回结构：是否命中、参数、最近点、法线和退化状态；测试明确区分穿过、切触、平行、共面、端点和零尺寸输入。",
    "tags": [
      "附录A 几何测试",
      "验收"
    ]
  },
  {
    "id": "gm3d-official-final-review-1",
    "chapter": "gm3d-official-final-review",
    "level": 1,
    "question": "约定清单是什么？",
    "answer": "手性、向上轴、角度单位、向量侧、矩阵布局和深度范围必须显式记录。",
    "tags": [
      "《3D数学基础》全书总复习",
      "约定清单"
    ]
  },
  {
    "id": "gm3d-official-final-review-2",
    "chapter": "gm3d-official-final-review",
    "level": 2,
    "question": "空间追踪与不变量如何连接？",
    "answer": "每个点、方向和法线都标记来源空间与目标空间。 正交性、单位长度、重心权重和、动量与端点条件用于自动验收。",
    "tags": [
      "《3D数学基础》全书总复习",
      "机制"
    ]
  },
  {
    "id": "gm3d-official-final-review-3",
    "chapter": "gm3d-official-final-review",
    "level": 3,
    "question": "如何检查误差预算的边界？",
    "answer": "浮点、离散积分和近似模型的允许误差在运行前定义。 必须加入零长度、退化、近阈值或约定切换样例，并解释第一个失效的不变量。",
    "tags": [
      "《3D数学基础》全书总复习",
      "边界"
    ]
  },
  {
    "id": "gm3d-official-final-review-4",
    "chapter": "gm3d-official-final-review",
    "level": 4,
    "question": "如何验收重放证据？",
    "answer": "保存输入、时间步、随机种子、状态快照和图形调试层。 最终项目用轨道相机观察一组刚体沿曲线进入碰撞区：显示物体、世界和相机基轴，记录裁剪坐标、接触参数、冲量、角速度和曲线弧长误差。",
    "tags": [
      "《3D数学基础》全书总复习",
      "验收"
    ]
  }
];
