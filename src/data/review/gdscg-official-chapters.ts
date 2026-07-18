import type { ReviewQuestion } from "./types";
export const gdscgOfficialChapterQuestions: ReviewQuestion[] = [
  {
    "id": "gdscg-quadtrees-octrees-1",
    "chapter": "gdscg-quadtrees-octrees",
    "level": 1,
    "question": "第1章 四叉树与八叉树中的四叉树是什么？",
    "answer": "二维区域每次沿两个坐标轴等分为四个子区域的递归层次。",
    "tags": [
      "第1章 四叉树与八叉树",
      "四叉树"
    ]
  },
  {
    "id": "gdscg-quadtrees-octrees-2",
    "chapter": "gdscg-quadtrees-octrees",
    "level": 2,
    "question": "第1章 四叉树与八叉树如何连接八叉树与Morton编码？",
    "answer": "三维空间每次等分为八个子体素的递归层次。 把各坐标位交错后形成从根到叶的空间路径编码。 查询时保存剪枝和候选轨迹。",
    "tags": [
      "第1章 四叉树与八叉树",
      "构建与查询"
    ]
  },
  {
    "id": "gdscg-quadtrees-octrees-3",
    "chapter": "gdscg-quadtrees-octrees",
    "level": 3,
    "question": "第1章 四叉树与八叉树怎样处理边界与反例？",
    "answer": "所有点重合会把树推到最大深度；点正落在中线时若左右都接收会重复计数；相邻叶深度差过大会让等值面断裂。设置最大深度、最小单元和统一半开区间，并对跨层邻接做平衡或缝合。 典型反例是：把位于分割线上的点同时插入两个孩子，节点数随深度指数增长并产生重复命中。",
    "tags": [
      "第1章 四叉树与八叉树",
      "边界与反例"
    ]
  },
  {
    "id": "gdscg-quadtrees-octrees-4",
    "chapter": "gdscg-quadtrees-octrees",
    "level": 4,
    "question": "第1章 四叉树与八叉树如何形成邻接平衡？",
    "answer": "约束相邻叶节点层级差，避免跨层查询和网格连接失控。 使用半开区间和唯一子索引，另为根域最大边界保留显式闭合规则。",
    "tags": [
      "第1章 四叉树与八叉树",
      "验收证书"
    ]
  },
  {
    "id": "gdscg-orthogonal-queries-1",
    "chapter": "gdscg-orthogonal-queries",
    "level": 1,
    "question": "第2章 正交窗口与刺穿查询中的刺穿查询是什么？",
    "answer": "给定点或查询对象，报告所有与其相交的已存对象。",
    "tags": [
      "第2章 正交窗口与刺穿查询",
      "刺穿查询"
    ]
  },
  {
    "id": "gdscg-orthogonal-queries-2",
    "chapter": "gdscg-orthogonal-queries",
    "level": 2,
    "question": "第2章 正交窗口与刺穿查询如何连接窗口查询与线段树？",
    "answer": "报告完全位于或与轴对齐查询盒相交的对象。 把基本区间分层存储，使跨越查询点的区间可按规范节点报告。 查询时保存剪枝和候选轨迹。",
    "tags": [
      "第2章 正交窗口与刺穿查询",
      "构建与查询"
    ]
  },
  {
    "id": "gdscg-orthogonal-queries-3",
    "chapter": "gdscg-orthogonal-queries",
    "level": 3,
    "question": "第2章 正交窗口与刺穿查询怎样处理边界与反例？",
    "answer": "零长度区间、端点相接、重复坐标和查询窗零面积会暴露闭区间约定冲突。高维范围树内存快速增长，kd树在高维也会接近全扫描；报告复杂度时应同时给维数和输出规模。 典型反例是：只报告访问节点为对数级，却忽略查询返回了接近全部对象，声称总时间仍为对数。",
    "tags": [
      "第2章 正交窗口与刺穿查询",
      "边界与反例"
    ]
  },
  {
    "id": "gdscg-orthogonal-queries-4",
    "chapter": "gdscg-orthogonal-queries",
    "level": 4,
    "question": "第2章 正交窗口与刺穿查询如何形成范围树？",
    "answer": "主排序树的每个规范节点携带下一维关联结构。 把复杂度写成搜索开销加输出规模，并单独统计候选与最终命中。",
    "tags": [
      "第2章 正交窗口与刺穿查询",
      "验收证书"
    ]
  },
  {
    "id": "gdscg-bsp-trees-1",
    "chapter": "gdscg-bsp-trees",
    "level": 1,
    "question": "第3章 BSP树中的BSP树是什么？",
    "answer": "以任意超平面递归划分空间并在两侧保存子问题的二叉树。",
    "tags": [
      "第3章 BSP树",
      "BSP树"
    ]
  },
  {
    "id": "gdscg-bsp-trees-2",
    "chapter": "gdscg-bsp-trees",
    "level": 2,
    "question": "第3章 BSP树如何连接分类谓词与分裂片元？",
    "answer": "根据有符号距离把点或多边形判为前侧、后侧或共面。 跨越分割面的图元被切成分别落在两侧的片段。 查询时保存剪枝和候选轨迹。",
    "tags": [
      "第3章 BSP树",
      "构建与查询"
    ]
  },
  {
    "id": "gdscg-bsp-trees-3",
    "chapter": "gdscg-bsp-trees",
    "level": 3,
    "question": "第3章 BSP树怎样处理边界与反例？",
    "answer": "共面多边形的朝向、观察点落在分割面、细长片元和循环数值误差最容易破坏拓扑。若每次切分都重新舍入顶点，裂缝会累积；应复用交点并保存来源边。 典型反例是：每次选第一个多边形作分割面，在有序输入上形成链并制造大量碎片。",
    "tags": [
      "第3章 BSP树",
      "边界与反例"
    ]
  },
  {
    "id": "gdscg-bsp-trees-4",
    "chapter": "gdscg-bsp-trees",
    "level": 4,
    "question": "第3章 BSP树如何形成代价启发式？",
    "answer": "平衡树深、查询概率与片元分裂数量的构建目标。 对候选面计算平衡与分裂联合代价，并用查询分布校正静态启发式。",
    "tags": [
      "第3章 BSP树",
      "验收证书"
    ]
  },
  {
    "id": "gdscg-bounding-volume-hierarchies-1",
    "chapter": "gdscg-bounding-volume-hierarchies",
    "level": 1,
    "question": "第4章 包围体层次中的包围体层次是什么？",
    "answer": "叶包围图元、内部节点包围全部后代的对象层次。",
    "tags": [
      "第4章 包围体层次",
      "包围体层次"
    ]
  },
  {
    "id": "gdscg-bounding-volume-hierarchies-2",
    "chapter": "gdscg-bounding-volume-hierarchies",
    "level": 2,
    "question": "第4章 包围体层次如何连接AABB与k-DOP？",
    "answer": "边与坐标轴平行、可用逐轴区间重叠快速测试的包围盒。 由固定方向上的最小最大投影组成的离散方向多面体。 查询时保存剪枝和候选轨迹。",
    "tags": [
      "第4章 包围体层次",
      "构建与查询"
    ]
  },
  {
    "id": "gdscg-bounding-volume-hierarchies-3",
    "chapter": "gdscg-bounding-volume-hierarchies",
    "level": 3,
    "question": "第4章 包围体层次怎样处理边界与反例？",
    "answer": "无限平面不能直接放入有限AABB；零面积三角形和NaN会污染所有父盒；两个盒只接触边界是否算碰撞必须与窄相一致。形变后只更新叶不更新祖先会产生假阴性。 典型反例是：只追求最小根包围盒，却把高度重叠的子集合分到两个孩子，遍历几乎同时访问两侧。",
    "tags": [
      "第4章 包围体层次",
      "边界与反例"
    ]
  },
  {
    "id": "gdscg-bounding-volume-hierarchies-4",
    "chapter": "gdscg-bounding-volume-hierarchies",
    "level": 4,
    "question": "第4章 包围体层次如何形成重拟合？",
    "answer": "形变后从叶到根更新包围体而暂不改变树拓扑。 用预期遍历成本评估候选分裂，并把子包围体重叠率作为重建信号。",
    "tags": [
      "第4章 包围体层次",
      "验收证书"
    ]
  },
  {
    "id": "gdscg-distance-fields-1",
    "chapter": "gdscg-distance-fields",
    "level": 1,
    "question": "第5章 距离场中的距离场是什么？",
    "answer": "为域内每个位置记录到目标集合最短距离的标量场。",
    "tags": [
      "第5章 距离场",
      "距离场"
    ]
  },
  {
    "id": "gdscg-distance-fields-2",
    "chapter": "gdscg-distance-fields",
    "level": 2,
    "question": "第5章 距离场如何连接有符号距离与传播方法？",
    "answer": "在封闭表面内外赋予相反符号，并以零等值面表示表面。 从已知边界距离向邻域按局部更新规则扩散近似最短距离。 查询时保存剪枝和候选轨迹。",
    "tags": [
      "第5章 距离场",
      "构建与查询"
    ]
  },
  {
    "id": "gdscg-distance-fields-3",
    "chapter": "gdscg-distance-fields",
    "level": 3,
    "question": "第5章 距离场怎样处理边界与反例？",
    "answer": "开放曲面没有天然内外符号；尖角和中轴附近距离不可微；离散传播依赖邻域模板，可能产生各向异性。若把近似值当严格下界用于球追踪，会越过表面。 典型反例是：开放网格仍用奇偶射线决定全域符号，裂缝附近产生大片错误内区。",
    "tags": [
      "第5章 距离场",
      "边界与反例"
    ]
  },
  {
    "id": "gdscg-distance-fields-4",
    "chapter": "gdscg-distance-fields",
    "level": 4,
    "question": "第5章 距离场如何形成等值面？",
    "answer": "距离场中取固定数值的一组位置，零等值面通常恢复原表面。 先检测封闭与定向；开放表面使用无符号距离或显式窄带语义。",
    "tags": [
      "第5章 距离场",
      "验收证书"
    ]
  },
  {
    "id": "gdscg-voronoi-diagrams-1",
    "chapter": "gdscg-voronoi-diagrams",
    "level": 1,
    "question": "第6章 Voronoi图中的Voronoi单元是什么？",
    "answer": "离某个站点不远于任何其他站点的空间区域。",
    "tags": [
      "第6章 Voronoi图",
      "Voronoi单元"
    ]
  },
  {
    "id": "gdscg-voronoi-diagrams-2",
    "chapter": "gdscg-voronoi-diagrams",
    "level": 2,
    "question": "第6章 Voronoi图如何连接Delaunay三角剖分与空圆性质？",
    "answer": "连接共享Voronoi边或面的站点形成的对偶复形。 Delaunay单形存在通过其顶点且内部不含其他站点的圆或球。 查询时保存剪枝和候选轨迹。",
    "tags": [
      "第6章 Voronoi图",
      "构建与查询"
    ]
  },
  {
    "id": "gdscg-voronoi-diagrams-3",
    "chapter": "gdscg-voronoi-diagrams",
    "level": 3,
    "question": "第6章 Voronoi图怎样处理边界与反例？",
    "answer": "重复点、三点共线、四点共圆和无限单元破坏唯一性；浮点圆内测试的符号错误会产生非流形拓扑。必须为退化输入选择一致的符号扰动或精确谓词。 典型反例是：直接用浮点行列式处理近共圆四点，不同插入顺序产生互相矛盾的边翻转。",
    "tags": [
      "第6章 Voronoi图",
      "边界与反例"
    ]
  },
  {
    "id": "gdscg-voronoi-diagrams-4",
    "chapter": "gdscg-voronoi-diagrams",
    "level": 4,
    "question": "第6章 Voronoi图如何形成自然邻域插值？",
    "answer": "按插入查询点后从相邻Voronoi单元借得的面积或体积分配权重。 使用自适应精确方向和圆内谓词，并为真退化情况规定确定性扰动。",
    "tags": [
      "第6章 Voronoi图",
      "验收证书"
    ]
  },
  {
    "id": "gdscg-geometric-proximity-graphs-1",
    "chapter": "gdscg-geometric-proximity-graphs",
    "level": 1,
    "question": "第7章 几何邻近图中的相对邻域图是什么？",
    "answer": "仅当两点形成的月牙区域不含其他站点时连接它们。",
    "tags": [
      "第7章 几何邻近图",
      "相对邻域图"
    ]
  },
  {
    "id": "gdscg-geometric-proximity-graphs-2",
    "chapter": "gdscg-geometric-proximity-graphs",
    "level": 2,
    "question": "第7章 几何邻近图如何连接Gabriel图与beta骨架？",
    "answer": "仅当以两点连线为直径的闭球内部不含其他站点时连接。 通过参数化月牙邻域控制图的稀疏程度。 查询时保存剪枝和候选轨迹。",
    "tags": [
      "第7章 几何邻近图",
      "构建与查询"
    ]
  },
  {
    "id": "gdscg-geometric-proximity-graphs-3",
    "chapter": "gdscg-geometric-proximity-graphs",
    "level": 3,
    "question": "第7章 几何邻近图怎样处理边界与反例？",
    "answer": "非均匀采样会让固定半径图断裂或跨层粘连；重复点令最近邻半径为零；边界点缺少双侧邻域。局部尺度必须保存来源和置信度，不能无条件当作表面拓扑。 典型反例是：直接在全点集做固定半径连接，稠密区域边数爆炸而稀疏区域仍断开。",
    "tags": [
      "第7章 几何邻近图",
      "边界与反例"
    ]
  },
  {
    "id": "gdscg-geometric-proximity-graphs-4",
    "chapter": "gdscg-geometric-proximity-graphs",
    "level": 4,
    "question": "第7章 几何邻近图如何形成包含链？",
    "answer": "最小生成树、RNG、Gabriel图与Delaunay图之间的子图关系。 采用局部最近邻尺度和Delaunay候选，并用统计离群阈值裁剪过长边。",
    "tags": [
      "第7章 几何邻近图",
      "验收证书"
    ]
  },
  {
    "id": "gdscg-kinetic-data-structures-1",
    "chapter": "gdscg-kinetic-data-structures",
    "level": 1,
    "question": "第8章 动力数据结构中的动力数据结构是什么？",
    "answer": "对象沿已知轨迹运动时，通过局部事件维护组合关系的数据结构。",
    "tags": [
      "第8章 动力数据结构",
      "动力数据结构"
    ]
  },
  {
    "id": "gdscg-kinetic-data-structures-2",
    "chapter": "gdscg-kinetic-data-structures",
    "level": 2,
    "question": "第8章 动力数据结构如何连接证书与失效时间？",
    "answer": "当前为真的局部谓词，其共同成立保证全局结构正确。 证书谓词沿轨迹下一次变号或到达零点的时间。 查询时保存剪枝和候选轨迹。",
    "tags": [
      "第8章 动力数据结构",
      "构建与查询"
    ]
  },
  {
    "id": "gdscg-kinetic-data-structures-3",
    "chapter": "gdscg-kinetic-data-structures",
    "level": 3,
    "question": "第8章 动力数据结构怎样处理边界与反例？",
    "answer": "同时事件、切触不换序、重根、时间倒退和浮点根排序都会破坏事件顺序。若两个证书在同一时间互相依赖，应批处理同一时间戳并在处理后重新验证全局不变量。 典型反例是：对象轨迹改变后旧事件仍留在队列，稍后被执行并把结构恢复到过时次序。",
    "tags": [
      "第8章 动力数据结构",
      "边界与反例"
    ]
  },
  {
    "id": "gdscg-kinetic-data-structures-4",
    "chapter": "gdscg-kinetic-data-structures",
    "level": 4,
    "question": "第8章 动力数据结构如何形成外部事件？",
    "answer": "由应用改变轨迹或增删对象、而非证书自然失效触发的更新。 给证书加版本号和轨迹世代，处理事件前验证其仍对应当前状态。",
    "tags": [
      "第8章 动力数据结构",
      "验收证书"
    ]
  },
  {
    "id": "gdscg-degeneracy-robustness-1",
    "chapter": "gdscg-degeneracy-robustness",
    "level": 1,
    "question": "第9章 退化与鲁棒性中的鲁棒谓词是什么？",
    "answer": "即使输入接近退化也返回与精确算术一致符号的离散判断。",
    "tags": [
      "第9章 退化与鲁棒性",
      "鲁棒谓词"
    ]
  },
  {
    "id": "gdscg-degeneracy-robustness-2",
    "chapter": "gdscg-degeneracy-robustness",
    "level": 2,
    "question": "第9章 退化与鲁棒性如何连接精确几何计算与退化？",
    "answer": "以精确谓词保证组合拓扑，再按需要近似构造坐标的计算范式。 输入落在使一般位置假设失效的低维配置，如共线、共圆或重复。 查询时保存剪枝和候选轨迹。",
    "tags": [
      "第9章 退化与鲁棒性",
      "构建与查询"
    ]
  },
  {
    "id": "gdscg-degeneracy-robustness-3",
    "chapter": "gdscg-degeneracy-robustness",
    "level": 3,
    "question": "第9章 退化与鲁棒性怎样处理边界与反例？",
    "answer": "统一epsilon不具尺度不变性，可能同时产生a在b左侧和b在a左侧；NaN比较会静默落入错误分支；直接随机扰动不能复现。鲁棒性不仅是避免崩溃，还要维持组合不变量。 典型反例是：把所有绝对值小于固定epsilon的方向值判为零，不同尺度下得到矛盾的点在线段两侧关系。",
    "tags": [
      "第9章 退化与鲁棒性",
      "边界与反例"
    ]
  },
  {
    "id": "gdscg-degeneracy-robustness-4",
    "chapter": "gdscg-degeneracy-robustness",
    "level": 4,
    "question": "第9章 退化与鲁棒性如何形成误差过滤器？",
    "answer": "先用快速浮点估计及误差界判断符号，不确定时升级精度。 使用带推导误差界的过滤谓词，并为精确零值提供确定性退化处理。",
    "tags": [
      "第9章 退化与鲁棒性",
      "验收证书"
    ]
  },
  {
    "id": "gdscg-dynamization-1",
    "chapter": "gdscg-dynamization",
    "level": 1,
    "question": "第10章 几何数据结构动态化中的动态化是什么？",
    "answer": "把支持静态构建与查询的结构扩展为可增删元素且保留复杂度界。",
    "tags": [
      "第10章 几何数据结构动态化",
      "动态化"
    ]
  },
  {
    "id": "gdscg-dynamization-2",
    "chapter": "gdscg-dynamization",
    "level": 2,
    "question": "第10章 几何数据结构动态化如何连接二进制分解与摊还分析？",
    "answer": "按集合大小的二进制位维护若干互不相交的静态块。 把偶发昂贵重建分摊到导致它的一系列更新上。 查询时保存剪枝和候选轨迹。",
    "tags": [
      "第10章 几何数据结构动态化",
      "构建与查询"
    ]
  },
  {
    "id": "gdscg-dynamization-3",
    "chapter": "gdscg-dynamization",
    "level": 3,
    "question": "第10章 几何数据结构动态化怎样处理边界与反例？",
    "answer": "重复键、删除不存在元素、全删空块和更新期间查询会暴露版本语义。若查询只看新块而遗漏尚未迁移的旧块会产生假阴性；若两边都返回又不去重会重复报告。 典型反例是：只做懒删除从不重建，逻辑集合很小但查询仍扫描历史上所有元素。",
    "tags": [
      "第10章 几何数据结构动态化",
      "边界与反例"
    ]
  },
  {
    "id": "gdscg-dynamization-4",
    "chapter": "gdscg-dynamization",
    "level": 4,
    "question": "第10章 几何数据结构动态化如何形成全局重建？",
    "answer": "通过分阶段复制或替换恢复结构质量与最坏情况保证。 按半大小规则清理墓碑，并把重建成本记入触发它的更新序列。",
    "tags": [
      "第10章 几何数据结构动态化",
      "验收证书"
    ]
  }
];
