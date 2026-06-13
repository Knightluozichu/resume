/** 复习题库 · Assimp 装配（assimp）。Phase B 各章独立文件，避免并行写冲突。 */

import type { ReviewQuestion } from "./types";

export const assimpQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / 结构 / 数据成员） ──
  {
    id: "as-1",
    chapter: "assimp",
    level: 1,
    question: "Assimp 是什么？它的全称是什么？",
    answer:
      "Assimp 是一个开源的 C++ 模型加载库，全称 Open Asset Import Library。它的本事是把 `.obj`、`.fbx`、`.dae`、`.gltf` 等几十种不同格式的 3D 模型文件，统一加载成同一套内存数据结构，让你不必为每种格式各写一套解析器。",
    tags: ["Assimp", "定义"],
  },
  {
    id: "as-2",
    chapter: "assimp",
    level: 1,
    question: "Assimp 读完一个模型文件后，给你的「根对象」叫什么？",
    answer:
      "叫 `aiScene`。它像整批货的总仓库，集中持有所有网格数据、所有材质，以及一个指向场景图根节点的 `mRootNode`。要找任何数据，都从这个 `aiScene` 出发。",
    tags: ["aiScene", "定义"],
  },
  {
    id: "as-3",
    chapter: "assimp",
    level: 1,
    question: "`aiScene` 这个「总仓库」上集中挂着哪三样东西？",
    answer:
      "`mMeshes[]`（所有网格数据的数组）、`mMaterials[]`（所有材质的数组），以及 `mRootNode`（场景图这棵树的根节点）。真正的数据都堆在前两个数组里，`mRootNode` 只是组织结构的入口。",
    tags: ["aiScene", "数据结构"],
  },
  {
    id: "as-4",
    chapter: "assimp",
    level: 1,
    question: "什么是「场景图（scene graph）」？",
    answer:
      "场景图是一种把场景里的物体按「父子层级」组织成的树状结构，能表达「车身下挂着四个轮子」这类从属与相对位置关系。在 Assimp 里，这棵树由 `aiNode` 节点构成。",
    tags: ["场景图", "定义"],
  },
  {
    id: "as-5",
    chapter: "assimp",
    level: 1,
    question: "什么是 `aiNode`（节点）？它是场景图里的什么角色？",
    answer:
      "`aiNode` 是 Assimp 场景图这棵树上的一个结点。它本身不存网格数据，只存三样：一组指向 `aiScene.mMeshes[]` 的索引（`mMeshes`）、子节点（`mChildren`），以及一个相对父节点的变换矩阵。",
    tags: ["节点", "aiNode", "定义"],
  },
  {
    id: "as-6",
    chapter: "assimp",
    level: 1,
    question: "`aiNode` 节点里存的三样东西分别是什么？",
    answer:
      "① `mMeshes`——一串索引（下标），表示「我这个节点要用仓库里第几号网格」；② `mChildren`——它的子节点；③ 一个相对父节点的变换矩阵（描述位置/旋转/缩放）。注意它不存网格数据本身。",
    tags: ["节点", "aiNode", "数据结构"],
  },
  {
    id: "as-7",
    chapter: "assimp",
    level: 1,
    question: "什么是 `aiMesh`（网格）？它存在哪里？",
    answer:
      "`aiMesh` 是真正存放一块网格几何数据的对象，放在 `aiScene.mMeshes[]` 数组里。它含顶点位置、法线、纹理坐标、面索引等数据，还带一个指向材质的下标 `mMaterialIndex`。",
    tags: ["网格", "aiMesh", "定义"],
  },
  {
    id: "as-8",
    chapter: "assimp",
    level: 1,
    question: "`aiMesh` 里大致有哪几样数据成员？",
    answer:
      "`mVertices`（顶点位置）、`mNormals`（法线）、`mTextureCoords`（纹理坐标）、`mFaces`（每个面由哪几个顶点组成的索引），以及一个 `mMaterialIndex`（指向 `aiScene.mMaterials[]` 的材质下标）。这些正是之前手写过的东西，现在由库替你填好。",
    tags: ["网格", "aiMesh", "数据结构"],
  },
  {
    id: "as-9",
    chapter: "assimp",
    level: 1,
    question: "什么是 `aiMaterial`（材质）？它存在哪里？",
    answer:
      "`aiMaterial` 是描述一块表面「长什么样」的对象，放在 `aiScene.mMaterials[]` 数组里。它不直接塞颜色字节，而是按类型（漫反射 diffuse、镜面 specular 等）让你去查询这块表面用哪些贴图、什么属性。",
    tags: ["材质", "aiMaterial", "定义"],
  },
  {
    id: "as-10",
    chapter: "assimp",
    level: 1,
    question: "导入一个模型的入口函数是什么？属于哪个对象？",
    answer:
      "入口是 `Assimp::Importer` 对象的 `ReadFile` 方法。你先建一个 `Assimp::Importer importer;`，再调 `importer.ReadFile(路径, flags)` 来触发导入。",
    tags: ["ReadFile", "Importer"],
  },
  {
    id: "as-11",
    chapter: "assimp",
    level: 1,
    question: "`ReadFile` 需要传哪两个参数？",
    answer:
      "第一个参数是模型文件的路径（path），第二个参数是一组后处理选项（flags，多个开关用按位或 `|` 拼起来）。",
    tags: ["ReadFile", "参数"],
  },
  {
    id: "as-12",
    chapter: "assimp",
    level: 1,
    question: "`ReadFile` 的返回值是什么类型？",
    answer:
      "返回的是一个指向 `aiScene` 的指针（`const aiScene*`）。注意它可能加载失败，失败时这个指针不可靠，所以拿到后必须先做检查。",
    tags: ["ReadFile", "aiScene"],
  },
  {
    id: "as-13",
    chapter: "assimp",
    level: 1,
    question: "什么是「后处理选项」（后处理 flags）？",
    answer:
      "后处理选项是调用 `ReadFile` 时传入的一组开关，让 Assimp 在加载的同时顺手把数据整理成 OpenGL 好用的样子。多个开关用按位或 `|` 拼起来，常用的有 `aiProcess_Triangulate`、`aiProcess_FlipUVs`、`aiProcess_GenNormals`。",
    tags: ["后处理选项", "定义"],
  },
  {
    id: "as-14",
    chapter: "assimp",
    level: 1,
    question: "`aiProcess_Triangulate` 这个后处理选项是做什么的？",
    answer:
      "它把模型里所有多边形面（如四边形、五边形）全部拆成三角形。因为 OpenGL 只认三角形，加载时顺手三角化能省去后续的麻烦。",
    tags: ["后处理选项", "aiProcess_Triangulate"],
  },
  {
    id: "as-15",
    chapter: "assimp",
    level: 1,
    question: "`aiProcess_FlipUVs` 这个后处理选项是做什么的？",
    answer:
      "它在加载时把纹理坐标的 y 轴翻转过来。因为 OpenGL 的纹理 y 轴是反的（纹理章踩过这个坑），打开这个开关就省得后面手动处理贴图上下颠倒的问题。",
    tags: ["后处理选项", "aiProcess_FlipUVs"],
  },
  {
    id: "as-16",
    chapter: "assimp",
    level: 1,
    question: "`aiProcess_GenNormals` 这个后处理选项是做什么的？",
    answer:
      "万一模型文件里没带法线，这个开关让 Assimp 替你算一份法线出来。没有法线就没法做光照计算，所以它是「缺法线时」的兜底。",
    tags: ["后处理选项", "aiProcess_GenNormals"],
  },
  {
    id: "as-17",
    chapter: "assimp",
    level: 1,
    question: "`aiMesh` 里指向材质的那个成员叫什么？它存的是什么？",
    answer:
      "叫 `mMaterialIndex`。它存的不是材质本身，而是一个索引（下标），指向 `aiScene.mMaterials[]` 数组里的某个 `aiMaterial`，表示「这块网格该用第几号材质」。",
    tags: ["网格", "aiMesh", "mMaterialIndex"],
  },
  {
    id: "as-18",
    chapter: "assimp",
    level: 1,
    question: "加载这一步处在「文件 → 内存 → 渲染」流程的哪个环节？",
    answer:
      "处在最前端：先把磁盘上的外部文件变成内存里我们认得的数据结构（`aiScene`），后面才谈得上拿它去送进渲染管线画出来。本章只讲到「变成内存结构」为止。",
    tags: ["流程", "加载"],
  },
  {
    id: "as-19",
    chapter: "assimp",
    level: 1,
    question: "节点里的 `mMeshes` 字段装的是网格数据，还是别的？",
    answer:
      "装的不是网格数据本身，而是一串索引（下标），指向 `aiScene.mMeshes[]` 这个总数组，表示「我要用仓库里第几号网格」。真正的数据在 `aiScene` 那边。",
    tags: ["节点", "mMeshes", "索引"],
  },
  {
    id: "as-20",
    chapter: "assimp",
    level: 1,
    question: "Assimp 能读取哪些格式的模型文件（举几例）？",
    answer:
      "它能读取 `.obj`、`.fbx`、`.dae`、`.gltf` 等几十种不同格式，而不论是哪种格式，吐给你的产物永远是同一套内存结构 `aiScene`。",
    tags: ["Assimp", "格式"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "as-21",
    chapter: "assimp",
    level: 2,
    question: "为什么真实模型要用 Assimp 这类库加载，而不是手写顶点？",
    answer:
      "因为之前的方块、容器只有几十个顶点，手敲还扛得住；而一辆车、一个人物动辄几万几十万顶点，外加一堆贴图和材质，手敲到天荒地老也敲不完，还全是 bug。真实模型是在 Blender、Maya 里捏好导出的，我们的任务是写程序把文件读进来，这件事交给库做。",
    tags: ["Assimp", "为什么"],
  },
  {
    id: "as-22",
    chapter: "assimp",
    level: 2,
    question: "为什么需要 Assimp 来「统一」格式？没有它会怎样？",
    answer:
      "因为模型文件的格式五花八门，每种格式的字节布局、坐标约定、材质写法都不同，是个无底洞。没有 Assimp，你就得为每种格式各写一套解析器；有了它，你只管说「帮我读这个文件」，库内部消化格式差异，吐给你的永远是同一套结构。",
    tags: ["Assimp", "为什么"],
  },
  {
    id: "as-22b",
    chapter: "assimp",
    level: 2,
    question: "本章用「工厂收货」的比喻，Assimp 在这个比喻里扮演什么角色？",
    answer:
      "工厂不自己冶炼螺丝，而是把供应商做好的零件收货、拆箱、上料，再送上自己的流水线装配。Assimp 就是那个「收货员」：模型文件是各家软件导出的、长得都不一样的「箱子」，Assimp 负责把任意格式的箱子统一拆开、整理成一套我们认得的零件清单。",
    tags: ["Assimp", "比喻"],
  },
  {
    id: "as-23",
    chapter: "assimp",
    level: 2,
    question: "为什么节点（aiNode）只存索引，而不直接抱着网格数据？",
    answer:
      "因为同一块网格、同一个材质可能被场景里多个地方用到（想想一棵树上几十片一模一样的叶子）。集中存一份、各处用下标引用，既省内存，又能表达「这些位置共用同一块网格」。这正是节点里的 `mMeshes` 是「一串下标」而不是「一堆网格」的原因。",
    tags: ["节点", "索引", "为什么"],
  },
  {
    id: "as-24",
    chapter: "assimp",
    level: 2,
    question: "「数据集中在 aiScene、节点树只存索引」这条规则到底在说什么？",
    answer:
      "网格和材质的真身集中堆在 `aiScene` 的 `mMeshes[]`、`mMaterials[]` 数组里；场景图这棵树（由 `aiNode` 构成）上不放真数据，只放一串下标。要拿真数据，得拿着节点里的下标去 `aiScene` 的数组里取。这是本章最容易误解、也最核心的一条。",
    tags: ["aiScene", "节点", "索引"],
  },
  {
    id: "as-25",
    chapter: "assimp",
    level: 2,
    question: "`aiNode.mMeshes` 和 `aiScene.mMeshes` 名字很像，区别是什么？",
    answer:
      "`aiScene.mMeshes[]` 是真正的网格数据数组（一堆 `aiMesh`）；`aiNode.mMeshes` 只是一串索引（下标），指向 `aiScene.mMeshes[]` 里的元素。前者是「仓库里的货」，后者是「提货单上的编号」。",
    tags: ["节点", "aiScene", "对比"],
  },
  {
    id: "as-26",
    chapter: "assimp",
    level: 2,
    question: "`aiMesh` 和 `aiMaterial` 的关系是怎样的？谁引用谁？",
    answer:
      "`aiMesh` 通过它的 `mMaterialIndex` 引用 `aiMaterial`——这又是一个索引，指向 `aiScene.mMaterials[]` 里的某个材质。网格管几何（顶点/法线/面），材质管表面外观（用哪些贴图），网格拿下标去找自己该用的材质。",
    tags: ["网格", "材质", "mMaterialIndex"],
  },
  {
    id: "as-27",
    chapter: "assimp",
    level: 2,
    question:
      "为什么 `aiMaterial` 不直接存颜色和贴图字节，而是让你「按类型查询」？",
    answer:
      "因为材质描述的是「这块表面用哪些贴图、什么属性」，按漫反射、镜面等类型组织更通用——一块表面可能有好几张不同用途的贴图。所以它提供查询接口让你按类型去取，而不是塞死一堆字节。",
    tags: ["材质", "aiMaterial", "为什么"],
  },
  {
    id: "as-28",
    chapter: "assimp",
    level: 2,
    question:
      "后处理 flags 为什么要在「加载的同时」整理，而不是加载完再单独处理？",
    answer:
      "因为这些整理（三角化、翻 UV、补法线）本来就是把数据变成 OpenGL 好用的样子，Assimp 在解析文件时顺手做掉最省事。你只需在 `ReadFile` 时把开关拼上，库就在加载过程中一并完成，省得自己事后再遍历数据手动处理。",
    tags: ["后处理选项", "为什么"],
  },
  {
    id: "as-29",
    chapter: "assimp",
    level: 2,
    question: "为什么 OpenGL 渲染前常要开 `aiProcess_Triangulate`？",
    answer:
      "因为建模软件导出的模型里可能有四边形、五边形等多边形面，而 OpenGL 的渲染管线只认三角形。开了这个开关，Assimp 加载时就把所有面都拆成三角形，省去自己手动三角化的麻烦。",
    tags: ["后处理选项", "aiProcess_Triangulate", "为什么"],
  },
  {
    id: "as-30",
    chapter: "assimp",
    level: 2,
    question: "为什么 `ReadFile` 之后必须做检查，不能直接拿 `scene` 去遍历？",
    answer:
      "因为 `ReadFile` 可能加载失败（文件不存在、格式不支持、内容损坏），失败时返回的指针不可靠——可能是空指针，或是「读到一半」的半成品。不检查就直接遍历，会读出乱数据甚至崩溃。所以必须先确认真的拿到了一棵完整的场景树。",
    tags: ["ReadFile", "检查", "为什么"],
  },
  {
    id: "as-31",
    chapter: "assimp",
    level: 2,
    question: "ReadFile 后三连检查里的三个条件，各自防的是什么情况？",
    answer:
      "`!scene` 防的是彻底没读到（空指针）；`scene->mFlags & AI_SCENE_FLAGS_INCOMPLETE` 防的是「读到一半、数据不全」；`!scene->mRootNode` 防的是「没有根节点、场景图是空的」。三关都过了才能安心遍历。",
    tags: ["检查", "三连检查", "机制"],
  },
  {
    id: "as-32",
    chapter: "assimp",
    level: 2,
    question: "本章为什么只讲 C++ 代码、不像前几篇那样给 WebGL 对照版？",
    answer:
      "因为 Assimp 是一个 C++ 库，浏览器里跑不了，没有 WebGL 等价物可对照。所以本章直接照搬 LearnOpenGL 原版风格，只看 C++ 这一端的关键几行。",
    tags: ["代码", "C++"],
  },
  {
    id: "as-33",
    chapter: "assimp",
    level: 2,
    question: "为什么说 Assimp 把模型「整理成同一套结构」是它最值钱的地方？",
    answer:
      "因为格式差异是个无底洞，逐个格式写解析器代价极高。Assimp 屏蔽了格式差异：不论你喂它 obj 还是 fbx，它消化完吐出的永远是同一套 `aiScene` 结构，于是你的渲染代码只需面对这一套结构，不必关心源文件到底是什么格式。",
    tags: ["Assimp", "为什么"],
  },
  {
    id: "as-34",
    chapter: "assimp",
    level: 2,
    question:
      "为什么场景图要用「树」这种结构，而不是把所有物体平铺成一个列表？",
    answer:
      "因为树能表达父子层级和相对位置关系，比如「车身下挂着四个轮子」——轮子跟着车身一起动。平铺成列表就丢掉了这种从属关系。Assimp 用 `aiNode` 构成的树，加上每个节点的变换矩阵，正是为了保留这种层级。",
    tags: ["场景图", "树", "为什么"],
  },
  {
    id: "as-35",
    chapter: "assimp",
    level: 2,
    question: "节点上的变换矩阵和它的子节点放在一起，表达的是什么？",
    answer:
      "表达「这个节点相对它父节点的位置/旋转/缩放」，再配上 `mChildren` 子节点，就把整棵层级树串起来了。这样父节点一动，子节点跟着动——正是「车身带动四个轮子」这类关系的来源。",
    tags: ["节点", "变换矩阵", "场景图"],
  },
  {
    id: "as-36",
    chapter: "assimp",
    level: 2,
    question: "为什么本章说「加载只是最前端」，不算把模型画出来？",
    answer:
      "因为加载这一步只是把磁盘文件变成内存里的 `aiScene` 结构，相当于「收货、拆箱、整理零件」。真正把它送进渲染管线画出来是后面「网格」「模型」两篇的事，本章不写渲染、也不写真正的 Mesh 类。",
    tags: ["流程", "加载"],
  },

  // ── L3 应用（给场景怎么做 / 读代码 / 取数据 / 选 flags） ──
  {
    id: "as-37",
    chapter: "assimp",
    level: 3,
    question:
      "你要拿到某个 `aiNode` 节点对应的第一块网格的顶点数据，分几步怎么取？",
    answer:
      "三步：① 从节点拿到第一个索引 `unsigned int i = node->mMeshes[0];`；② 拿这个下标去仓库里取那块网格 `aiMesh* mesh = scene->mMeshes[i];`；③ 顶点就在 `mesh->mVertices` 里。一句话：拿节点的索引，去 `scene` 的数组里取数据。",
    tags: ["节点", "取数据", "应用"],
  },
  {
    id: "as-38",
    chapter: "assimp",
    level: 3,
    question:
      "已知某 `aiMesh* mesh`，你想知道它该用哪个材质、并把那个材质取出来，怎么写？",
    answer:
      "先读出材质下标 `unsigned int mi = mesh->mMaterialIndex;`，再拿它去仓库取 `aiMaterial* mat = scene->mMaterials[mi];`。和取网格一个套路：网格存的是下标，材质真身在 `aiScene.mMaterials[]` 里。",
    tags: ["网格", "材质", "应用"],
  },
  {
    id: "as-39",
    chapter: "assimp",
    level: 3,
    question:
      "你要加载一个用于 OpenGL 渲染的常规模型，`ReadFile` 的 flags 一般怎么拼？",
    answer:
      "常见拼法是 `aiProcess_Triangulate | aiProcess_FlipUVs`——三角化保证只剩三角形，翻 UV 适配 OpenGL 反向的纹理 y 轴。多个开关用按位或 `|` 连起来传给 `ReadFile` 的第二个参数。",
    tags: ["后处理选项", "ReadFile", "应用"],
  },
  {
    id: "as-40",
    chapter: "assimp",
    level: 3,
    question: "写出建立 Importer 并调用 ReadFile 的那两三行 C++。",
    answer:
      "`Assimp::Importer importer;` 建导入器；`const aiScene* scene = importer.ReadFile(path, aiProcess_Triangulate | aiProcess_FlipUVs);` 传路径和后处理 flags，拿回一个指向 `aiScene` 的指针。",
    tags: ["ReadFile", "Importer", "应用"],
  },
  {
    id: "as-41",
    chapter: "assimp",
    level: 3,
    question: "写出 `ReadFile` 之后那段「三连检查」的判断条件。",
    answer:
      "`if (!scene || (scene->mFlags & AI_SCENE_FLAGS_INCOMPLETE) || !scene->mRootNode)`——任一命中就报错返回，别再往下访问 `scene`。三个条件分别防：彻底没读到、数据不完整、没有根节点。",
    tags: ["检查", "三连检查", "应用"],
  },
  {
    id: "as-42",
    chapter: "assimp",
    level: 3,
    question: "加载失败时，怎么拿到具体的错误信息？",
    answer:
      '用 `importer.GetErrorString()`。常见写法是在三连检查命中后，把它打印出来：`std::cout << "ERROR::ASSIMP:: " << importer.GetErrorString() << std::endl;`，然后 `return`，别再碰这个 `scene`。',
    tags: ["检查", "GetErrorString", "应用"],
  },
  {
    id: "as-43",
    chapter: "assimp",
    level: 3,
    question:
      "你的 `.obj` 模型加载后一团漆黑、完全不受光照，最该加哪个 flag？为什么？",
    answer:
      "最该加 `aiProcess_GenNormals`。光照计算（漫反射、镜面）都依赖每个顶点的法线；如果这个 `.obj` 没导出法线，又没让 Assimp 补算，那么法线缺失或全零，光照一算全是 0，模型自然全黑。把它拼进 `ReadFile` 的 flags 即可。",
    tags: ["后处理选项", "aiProcess_GenNormals", "应用"],
  },
  {
    id: "as-44",
    chapter: "assimp",
    level: 3,
    question: "模型贴图上下颠倒、歪了，该加哪个后处理选项？",
    answer:
      "加 `aiProcess_FlipUVs`。OpenGL 的纹理 y 轴是反的，没翻就会贴反、上下颠倒。把它拼进 `ReadFile` 的 flags（如 `aiProcess_Triangulate | aiProcess_FlipUVs`）就在加载时把纹理坐标的 y 翻好了。",
    tags: ["后处理选项", "aiProcess_FlipUVs", "应用"],
  },
  {
    id: "as-45",
    chapter: "assimp",
    level: 3,
    question: "你想同时三角化、翻 UV、并补法线，flags 那一段怎么写？",
    answer:
      "用按位或把三个开关拼起来：`aiProcess_Triangulate | aiProcess_FlipUVs | aiProcess_GenNormals`。这样 Assimp 在一次加载里就把面全拆成三角形、把纹理 y 翻好、并在缺法线时补算一份。",
    tags: ["后处理选项", "ReadFile", "应用"],
  },
  {
    id: "as-46",
    chapter: "assimp",
    level: 3,
    question:
      "拿到一个有效的 `scene` 后，要遍历整个场景图，应该从哪个字段开始？",
    answer:
      "从 `scene->mRootNode` 开始——它是场景图这棵树的根节点。从根节点出发，读它的 `mMeshes`（索引）去 `scene->mMeshes[]` 取网格，再递归遍历它的 `mChildren` 子节点，就能走遍整棵树。",
    tags: ["场景图", "遍历", "应用"],
  },
  {
    id: "as-47",
    chapter: "assimp",
    level: 3,
    question: "你要读取某块网格第一个面用到了哪几个顶点，应该读哪个成员？",
    answer:
      "读 `aiMesh` 的 `mFaces`——它存的是每个面由哪几个顶点组成的索引。配合 `mVertices`（顶点位置）就能还原这个面的实际几何。",
    tags: ["网格", "mFaces", "应用"],
  },
  {
    id: "as-48",
    chapter: "assimp",
    level: 3,
    question: "三连检查通过、`scene` 确认有效后，你能放心做什么？",
    answer:
      "能放心遍历这棵场景树：从 `mRootNode` 出发，按节点里的索引去 `scene->mMeshes[]` 取网格，按网格的 `mMaterialIndex` 去 `scene->mMaterials[]` 取材质。检查通过保证了这些数组和根节点都是完整可访问的。",
    tags: ["检查", "遍历", "应用"],
  },
  {
    id: "as-49",
    chapter: "assimp",
    level: 3,
    question:
      "假设某节点 `node->mMeshes = {2, 5}`，这表示什么？画它要取哪些网格？",
    answer:
      "表示这个节点要用仓库里第 2 号和第 5 号网格。画它要取 `scene->mMeshes[2]` 和 `scene->mMeshes[5]` 这两块 `aiMesh`。节点本身不存数据，`{2, 5}` 只是提货单上的两个编号。",
    tags: ["节点", "索引", "应用"],
  },
  {
    id: "as-50",
    chapter: "assimp",
    level: 3,
    question: "你的模型自带完整法线，还有必要加 `aiProcess_GenNormals` 吗？",
    answer:
      "没必要。`aiProcess_GenNormals` 是「缺法线时」的兜底——很多正规模型自带法线，这时不加也能正常受光。它只在模型文件本身没有法线数据时才需要补上。",
    tags: ["后处理选项", "aiProcess_GenNormals", "应用"],
  },
  {
    id: "as-51",
    chapter: "assimp",
    level: 3,
    question: "你要拿一块网格的纹理坐标，去访问 `aiMesh` 的哪个成员？",
    answer:
      "访问 `mTextureCoords`。它和 `mVertices`（顶点位置）、`mNormals`（法线）、`mFaces`（面索引）一样，都是 `aiMesh` 上由库替你填好的几何/纹理数据成员。",
    tags: ["网格", "mTextureCoords", "应用"],
  },
  {
    id: "as-52",
    chapter: "assimp",
    level: 3,
    question: "你想确认导入流程没问题再往下写，应该按怎样的顺序搭这几行？",
    answer:
      "顺序是：建 `Assimp::Importer` → 调 `ReadFile(路径, flags)` 拿到 `aiScene` 指针 → 立刻做三连检查（失败就打印 `GetErrorString()` 并返回）→ 通过后再去遍历 `mRootNode` / `mMeshes[]`。检查这一步必须紧跟 `ReadFile`，不能往后拖。",
    tags: ["流程", "ReadFile", "应用"],
  },

  // ── L4 综合（多概念串联 / 判断权衡 / 常见坑 / 边界） ──
  {
    id: "as-53",
    chapter: "assimp",
    level: 4,
    question:
      "有人想从 `aiNode` 节点身上直接读顶点数据，怎么找都找不到。错在哪、怎么修？",
    answer:
      "错在搞反了「存数据」和「存索引」——节点的 `mMeshes` 只是一串下标，真正的网格数据集中在 `aiScene.mMeshes[]`。修法：拿节点里的索引 `i`，去 `scene->mMeshes[i]` 取那个 `aiMesh`，顶点在那儿。记住：树存索引、数据在 scene。",
    tags: ["节点", "索引", "陷阱"],
  },
  {
    id: "as-54",
    chapter: "assimp",
    level: 4,
    question:
      "完整串一遍：从一个节点出发，拿到它该画的网格顶点和对应材质，经过哪几跳索引？",
    answer:
      "两跳索引：① 节点 `node->mMeshes[k]` 给出网格下标 `i`，去 `scene->mMeshes[i]` 拿到 `aiMesh`，顶点在 `mesh->mVertices`；② 这块网格的 `mesh->mMaterialIndex` 给出材质下标 `mi`，去 `scene->mMaterials[mi]` 拿到 `aiMaterial`。两次都是「拿下标去 scene 的数组里取真身」。",
    tags: ["节点", "网格", "材质", "综合"],
  },
  {
    id: "as-55",
    chapter: "assimp",
    level: 4,
    question:
      "为什么「集中存数据、节点存索引」这套设计同时兼顾了省内存和表达共用？",
    answer:
      "因为同一块网格/材质常被多处复用（如一树几十片相同的叶子）。若每个节点各抱一份数据，重复的几十份既费内存、又看不出它们是同一块；改成集中存一份、各节点用下标引用，内存只占一份，而多个节点指向同一下标恰好表达了「它们共用同一块网格」。一举两得。",
    tags: ["aiScene", "索引", "综合"],
  },
  {
    id: "as-56",
    chapter: "assimp",
    level: 4,
    question:
      "`ReadFile` 返回了非空指针，能不能就此认为加载成功、直接遍历？为什么？",
    answer:
      "不能。非空只排除了「彻底没读到」一种情况，还可能是「读到一半、数据不全」（`AI_SCENE_FLAGS_INCOMPLETE`）或「没有根节点」（`!mRootNode`）。所以三连检查三个条件缺一不可，必须三关都过，才算真的拿到一棵完整的场景树。",
    tags: ["检查", "三连检查", "综合"],
  },
  {
    id: "as-57",
    chapter: "assimp",
    level: 4,
    question:
      "一个模型加载后既漆黑没光照、贴图又上下颠倒，最可能漏了哪两个 flag？各怎么补？",
    answer:
      "漆黑没光照——多半漏了 `aiProcess_GenNormals`，模型没带法线、光照算不出来；贴图颠倒——漏了 `aiProcess_FlipUVs`，OpenGL 纹理 y 轴是反的、没翻就贴反。修法：`ReadFile` 时把需要的 flags 用 `|` 拼上，缺光照补 `GenNormals`、贴图颠倒加 `FlipUVs`。",
    tags: ["后处理选项", "陷阱", "综合"],
  },
  {
    id: "as-58",
    chapter: "assimp",
    level: 4,
    question:
      "有人 `ReadFile` 后没检查就直接遍历 `scene`，程序时不时崩溃或读出乱数据。根因和根治办法？",
    answer:
      "根因是没检查加载是否成功——路径写错、格式不支持时 `scene` 可能是空指针或半成品（`AI_SCENE_FLAGS_INCOMPLETE`），直接访问就读到空/半成品数据。根治：`ReadFile` 后必做三连检查 `!scene || (mFlags & AI_SCENE_FLAGS_INCOMPLETE) || !mRootNode`，任一命中就报错返回，绝不碰这个 `scene`。",
    tags: ["检查", "陷阱", "综合"],
  },
  {
    id: "as-59",
    chapter: "assimp",
    level: 4,
    question:
      "为什么本章把 Assimp 讲透「数据结构」却不写真正的渲染代码？这样安排合理吗？",
    answer:
      "合理。加载只是「文件 → 内存」的最前端，搞清楚 `aiScene`/节点树/网格/材质这套结构以及「树存索引、数据集中」这条核心，是后续遍历和渲染的地基。怎么把数据送进管线画出来留给后面「网格」「模型」两篇——先把零件认清、再谈装配上线，分篇更清楚。",
    tags: ["流程", "综合"],
  },
  {
    id: "as-60",
    chapter: "assimp",
    level: 4,
    question:
      "若把 `aiScene.mMeshes[]` 比作仓库货架、节点的 `mMeshes` 比作提货单，那 `mMaterialIndex` 在这个比喻里是什么？",
    answer:
      "`mMaterialIndex` 是货物（网格）上贴的「配套配件编号」——它不直接带着材质，而是写着一个号，让你拿这个号去另一个货架 `aiScene.mMaterials[]` 领对应材质。整套设计里，节点、网格全都是「拿编号去 scene 的货架取真身」，`mMaterialIndex` 只是网格指向材质那一张提货单。",
    tags: ["mMaterialIndex", "索引", "综合"],
  },
  {
    id: "as-61",
    chapter: "assimp",
    level: 4,
    question:
      "Assimp 屏蔽了格式差异，对你写渲染代码意味着什么权衡？有没有代价？",
    answer:
      "好处是渲染代码只需面对统一的 `aiScene` 结构，不必管源文件是 obj 还是 fbx，省掉为每种格式写解析器的天荒地老。代价是多引入一个 C++ 库依赖、且产物结构固定为 Assimp 那套——但相比手写多套解析器，这点代价非常划算，本章正是推荐用它。",
    tags: ["Assimp", "权衡", "综合"],
  },
  {
    id: "as-62",
    chapter: "assimp",
    level: 4,
    question:
      "为什么三连检查里专门有一条查 `mRootNode`？空根节点会让后续遍历出什么问题？",
    answer:
      "因为遍历场景图必须从 `mRootNode` 出发递归走子节点。若根节点为空，说明场景图是空的，你一上来访问 `mRootNode` 就是访问空指针，遍历无从开始甚至崩溃。所以即便 `scene` 非空、数据也「完整」，仍要单查 `!scene->mRootNode` 这一关。",
    tags: ["检查", "场景图", "综合"],
  },
  {
    id: "as-63",
    chapter: "assimp",
    level: 4,
    question:
      "同一个 `.obj` 模型，分别用 `aiProcess_Triangulate` 和不加，导进来的网格数据会有什么不同？",
    answer:
      "加了 `aiProcess_Triangulate`，所有面在加载时都被拆成三角形，`aiMesh` 的 `mFaces` 里每个面都是三个顶点的索引，正好喂给只认三角形的 OpenGL；不加，模型里原本的四边形、五边形面会原样保留，面索引数目不一，直接送渲染管线会出问题。所以面向 OpenGL 渲染通常都开它。",
    tags: ["后处理选项", "aiProcess_Triangulate", "综合"],
  },
  {
    id: "as-64",
    chapter: "assimp",
    level: 4,
    question:
      "把「为什么用库加载」和「Assimp 统一格式」两点合起来，一句话概括 Assimp 解决的问题。",
    answer:
      "真实模型顶点海量、又有几十种互不兼容的文件格式，手写顶点和逐格式写解析器都不现实；Assimp 用一个 `ReadFile` 把任意格式的模型统一读进内存、整理成同一套 `aiScene` 结构，让你只面对一套数据、专心做渲染。",
    tags: ["Assimp", "综合"],
  },
  {
    id: "as-65",
    chapter: "assimp",
    level: 4,
    question:
      "节点的变换矩阵和「场景图是树」这两点结合，怎么实现「车身一动、四个轮子跟着动」？",
    answer:
      "车身是父节点、四个轮子是它的子节点（`mChildren`），每个轮子节点存的是相对车身的变换矩阵。遍历时把父节点变换层层乘下去，子节点的最终位置就建立在父节点之上——所以移动车身这个父节点，四个子节点（轮子）的世界位置随之整体平移。这正是用树+变换矩阵组织场景图的意义。",
    tags: ["场景图", "变换矩阵", "综合"],
  },
];
