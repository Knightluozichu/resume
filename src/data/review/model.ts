/** 复习题库 · 模型（model）。Phase B 各章独立文件，避免并行写冲突。 */

import type { ReviewQuestion } from "./types";

export const modelQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / 结构 / 数值约定） ──
  {
    id: "mo-1",
    chapter: "model",
    level: 1,
    question: "在本章里，一个「模型」（Model）本质上是什么？",
    answer:
      "本质上就是上一章那个 `Mesh` 的「容器 + 加载器」。它内部装着一个 `vector<Mesh>`（这件物体被拆成的所有小网格），外加一套「把模型文件读进来、递归拆成这些网格、备好纹理」的加载逻辑，并提供一行 `Draw` 把所有 mesh 画出来。",
    tags: ["模型", "定义"],
  },
  {
    id: "mo-2",
    chapter: "model",
    level: 1,
    question: "一个 Mesh 和一个 Model 在本章的类比里分别对应什么？",
    answer:
      "一个 Mesh = 一块小积木（自带顶点、连法、贴图，会自己画自己，上一章讲过）；一个 Model = 一整盒积木加那张说明书 = `vector<Mesh>` 加加载代码（本章讲）。",
    tags: ["模型", "Mesh", "类比"],
  },
  {
    id: "mo-3",
    chapter: "model",
    level: 1,
    question: "`Model` 类要存哪三个成员？",
    answer:
      "三个：`meshes`（`vector<Mesh>`，这件物体被拆成的所有网格，最终成果）、`directory`（字符串，模型文件所在的文件夹路径，拼纹理路径用）、`textures_loaded`（已加载纹理的清单，做去重用）。",
    tags: ["Model 成员", "结构"],
  },
  {
    id: "mo-4",
    chapter: "model",
    level: 1,
    question: "`Model` 类的成员 `meshes` 是什么类型，装的是什么？",
    answer:
      "`meshes` 是一个 `vector<Mesh>`，装的是这件物体被递归拆开后得到的所有小网格——也就是整个加载过程的最终成果。画模型时就是遍历它逐个 `Draw`。",
    tags: ["Model 成员", "meshes"],
  },
  {
    id: "mo-5",
    chapter: "model",
    level: 1,
    question: "什么是 `directory`（目录）成员？它存的是什么？",
    answer:
      "`directory` 是一个字符串，存模型文件所在的文件夹路径。模型文件里记的贴图路径通常是「相对模型文件」的相对路径，所以加载纹理时要把这个目录前缀拼上去，才能拼出磁盘上的完整路径。",
    tags: ["directory", "定义"],
  },
  {
    id: "mo-6",
    chapter: "model",
    level: 1,
    question: "什么是 `textures_loaded`（纹理缓存）？它的作用是什么？",
    answer:
      "`textures_loaded` 是一份记录「已加载过哪些纹理」的清单。每加载一张贴图就把它的路径和数据记进来；下次再遇到同一张贴图，先在这里按路径查一遍，查到就直接复用、不重复从磁盘读。作用是去重，避免一个模型里多个网格共用同一张贴图时反复加载。",
    tags: ["textures_loaded", "定义"],
  },
  {
    id: "mo-7",
    chapter: "model",
    level: 1,
    question: "`Model` 的构造函数主要做什么事？",
    answer:
      "构造函数只做一件事：调 `loadModel(path)` 把整件加载流程跑起来。三个成员、一个入口——`Model` 类的骨架就这么简单。",
    tags: ["Model 成员", "构造函数"],
  },
  {
    id: "mo-8",
    chapter: "model",
    level: 1,
    question: "本章用哪个库读模型文件？它解决了什么麻烦？",
    answer:
      "用 Assimp。它能把各种格式（.obj、.gltf 等）统一读成一套通用的数据结构，省得你为每种格式各写一套解析器。",
    tags: ["Assimp", "定义"],
  },
  {
    id: "mo-9",
    chapter: "model",
    level: 1,
    question: "Assimp 把文件读进来后，给你的是什么形态的数据？",
    answer:
      "不是一个扁平的网格列表，而是一棵有父子层级的树——叫场景图（scene）。树的每个节点是一个 `aiNode`。",
    tags: ["Assimp", "场景图"],
  },
  {
    id: "mo-10",
    chapter: "model",
    level: 1,
    question: "场景图里一个 `aiNode` 节点上存的是网格数据本身吗？",
    answer:
      "不是。节点上不直接存网格数据，只存一串索引（`mMeshes`），指向场景里真正的网格数组 `scene->mMeshes`。同时节点还能有若干子节点（`mChildren`）。",
    tags: ["aiNode", "mMeshes"],
  },
  {
    id: "mo-11",
    chapter: "model",
    level: 1,
    question: "`loadModel(path)` 这个入口函数主要做哪三件事？",
    answer:
      "三件事：用 Assimp 的 `Importer` 读文件并指定一组处理标志、做错误检查、把模型文件所在的目录记进 `directory`，最后从场景图的根节点进入 `processNode` 递归。",
    tags: ["loadModel", "流程"],
  },
  {
    id: "mo-12",
    chapter: "model",
    level: 1,
    question: "`processNode` 是干什么的？",
    answer:
      "它是 Model 加载里的核心递归函数。对场景图（aiNode 树）做深度优先遍历：每到一个节点，先处理这个节点自己持有的所有网格（processMesh 后塞进 `meshes`），再对每个子节点递归调用自己，从而把整棵有层级的树压平成一个扁平的 `meshes` 列表。",
    tags: ["processNode", "定义"],
  },
  {
    id: "mo-13",
    chapter: "model",
    level: 1,
    question: "`processMesh` 负责做什么？",
    answer:
      "把 Assimp 的 `aiMesh` 翻译成上一章我们自己的 `Mesh`。它要填三样：顶点（位置、法线、纹理坐标）、索引（从各个面收集）、纹理（取材质后加载漫反射/镜面贴图），最后拼成一个 `Mesh` 返回。",
    tags: ["processMesh", "定义"],
  },
  {
    id: "mo-14",
    chapter: "model",
    level: 1,
    question:
      "`processMesh` 里逐个顶点要搬哪三样数据？分别来自 `aiMesh` 的哪些字段？",
    answer:
      "位置（来自 `mesh->mVertices[i]`）、法线（来自 `mesh->mNormals[i]`）、纹理坐标（来自 `mesh->mTextureCoords[0][i]`，且读前要判空）。三样填进一个 `Vertex` 再 push 进顶点列表。",
    tags: ["processMesh", "Vertex"],
  },
  {
    id: "mo-15",
    chapter: "model",
    level: 1,
    question: "`processMesh` 里索引（indices）是从哪里收集来的？",
    answer:
      "从网格的所有面（`mesh->mFaces`）里收集。遍历每个面 `aiFace`，再遍历面里的每个顶点索引 `face.mIndices[j]`，逐个 `push_back` 进 `indices`。",
    tags: ["processMesh", "indices", "mFaces"],
  },
  {
    id: "mo-16",
    chapter: "model",
    level: 1,
    question: "`loadMaterialTextures` 的职责是什么？",
    answer:
      "给定一个材质和一种贴图类型（如漫反射、镜面），把该类型的所有贴图加载出来。加载前先用 `textures_loaded` 按路径查缓存，命中就复用、不命中才真正读磁盘并登记进缓存。",
    tags: ["loadMaterialTextures", "定义"],
  },
  {
    id: "mo-17",
    chapter: "model",
    level: 1,
    question: "`Model::Draw` 的实现有多简单？它本质上是什么？",
    answer:
      "极简——它只是个转发器：`for (mesh : meshes) mesh.Draw(shader)`，把每个 mesh 各自的 `Draw` 调一遍。`Model` 自己不碰任何 OpenGL 调用，绑定 VAO、绑纹理、`glDrawElements` 都在上一章的 `Mesh::Draw` 里。",
    tags: ["Draw", "定义"],
  },
  {
    id: "mo-18",
    chapter: "model",
    level: 1,
    question: "`TextureFromFile` 是什么？本章只关心它的什么？",
    answer:
      "一个辅助函数，负责真正从磁盘把一张图片读成 OpenGL 纹理对象、返回纹理 id。它接收贴图的相对路径和模型所在目录（`directory`），内部把两者拼成完整路径再加载。本章只关心调用它时要把 `directory` 传进去；读图细节同纹理章。",
    tags: ["TextureFromFile", "定义"],
  },
  {
    id: "mo-19",
    chapter: "model",
    level: 1,
    question:
      "`loadModel` 里给 `ReadFile` 指定的两个后处理标志是什么？各干什么？",
    answer:
      "`aiProcess_Triangulate`：把所有面都拆成三角形（OpenGL 只认三角形）；`aiProcess_FlipUVs`：把纹理坐标的 y 翻转一下（多数图片原点在左上，而 OpenGL 纹理原点在左下）。",
    tags: ["loadModel", "Assimp", "flags"],
  },
  {
    id: "mo-20",
    chapter: "model",
    level: 1,
    question: "节点的 `mMeshes` 里存的是网格本身还是别的什么？",
    answer:
      "存的是索引，不是网格本身。真正的网格数据集中放在 `scene->mMeshes` 这个全局数组里，节点只是用索引「点名」自己用哪几个网格。",
    tags: ["mMeshes", "索引"],
  },

  // ── L2 理解（为什么 / 机制 / 区别） ──
  {
    id: "mo-21",
    chapter: "model",
    level: 2,
    question: "为什么一辆车、一个人物不能用一个网格搞定，要用一个 Model？",
    answer:
      "因为一件像样的复杂物体是几十上百块小网格拼起来的：车身一块、四个轮子各一块、玻璃一块、座椅一块……单个 Mesh 只能画自己那一块。Model 就是把这一整盒积木装在一起、并提供从文件读出这一堆网格的加载逻辑。",
    tags: ["模型", "为什么"],
  },
  {
    id: "mo-22",
    chapter: "model",
    level: 2,
    question: "为什么 Assimp 把模型读成一棵有层级的树，而不是一个扁平列表？",
    answer:
      "因为现实物体本就有层级：「车」下面挂着「车身」「四个轮子」，「轮子」下面可能又挂「轮毂」「轮胎」。这种父子关系对做动画、做整体变换很有用。不过本章只想要所有网格本身、不关心层级，所以核心工作是把树压平。",
    tags: ["场景图", "为什么"],
  },
  {
    id: "mo-23",
    chapter: "model",
    level: 2,
    question: "为什么 `aiNode` 节点上存的是网格的索引，而不是网格数据本身？",
    answer:
      "因为真正的网格数据集中放在 `scene->mMeshes` 这个全局数组里只存一份，节点只用索引「点名」自己用哪几个。这样同一份网格可以被引用、不必在每个节点里复制一份，节省存储也避免数据冗余。",
    tags: ["mMeshes", "为什么"],
  },
  {
    id: "mo-24",
    chapter: "model",
    level: 2,
    question:
      "为什么取网格永远要写成 `scene->mMeshes[node->mMeshes[i]]` 这种两层写法？",
    answer:
      "因为 `node->mMeshes[i]` 取出的只是一个索引（整数），要拿这个索引再去全局网格数组 `scene->mMeshes` 里取出真正的 `aiMesh`。一层取索引、一层用索引取真东西，所以是「拿节点的索引去全局数组里取」的两层写法。",
    tags: ["mMeshes", "机制"],
  },
  {
    id: "mo-25",
    chapter: "model",
    level: 2,
    question: "为什么 `processNode` 必须用递归？它把一棵 aiNode 树做了什么？",
    answer:
      "因为场景图是一棵任意深度的树，层级不固定，只有递归才能不限深度地走遍每个节点。`processNode` 对树做深度优先遍历，把每个节点持有的网格逐一收进 `meshes`，最终把整棵有层级的树压平成一个扁平的网格列表。",
    tags: ["processNode", "为什么"],
  },
  {
    id: "mo-26",
    chapter: "model",
    level: 2,
    question: "`processNode` 里两个循环的顺序为什么不能乱？",
    answer:
      "第一个循环先把当前节点自己持有的网格收进 `meshes`，第二个循环再钻进每个子节点重复同样的事。这是「先收本节点、再递归子节点」的深度优先顺序——保证遍历时每个节点的网格都被处理到，且整棵树被完整压平。",
    tags: ["processNode", "机制"],
  },
  {
    id: "mo-27",
    chapter: "model",
    level: 2,
    question:
      "为什么 `processNode` 里第二个循环（递归子节点）被称为「递归的关键」？",
    answer:
      "因为少了它，遍历到根节点处理完就停了，深藏在子节点里的车身、轮子、玻璃全都收不进 `meshes`。正是这个对每个 `node->mChildren[i]` 调 `processNode` 的循环，让遍历能一直钻到树的最深处，把整棵树压平。",
    tags: ["processNode", "递归", "为什么"],
  },
  {
    id: "mo-28",
    chapter: "model",
    level: 2,
    question:
      "为什么 `processMesh` 里读纹理坐标前一定要判 `if (mesh->mTextureCoords[0])`？",
    answer:
      "因为一个网格不一定有 UV（比如纯色、不贴图的件就没有），这时 `mesh->mTextureCoords[0]` 是空的。不判空就直接读 `mesh->mTextureCoords[0][i]` 会越界崩溃。判空后没有 UV 就给个 `vec2(0.0f, 0.0f)` 兜底。",
    tags: ["mTextureCoords[0]", "为什么"],
  },
  {
    id: "mo-29",
    chapter: "model",
    level: 2,
    question: "为什么 `processMesh` 里收集面的索引时能假定每个面正好三个顶点？",
    answer:
      "因为 `loadModel` 在 `ReadFile` 时指定了 `aiProcess_Triangulate`，让 Assimp 把所有面都拆成了三角形。所以遍历到 `mesh->mFaces` 时每个面都是三角形、正好三个索引。",
    tags: ["mFaces", "Triangulate", "机制"],
  },
  {
    id: "mo-30",
    chapter: "model",
    level: 2,
    question: "为什么要给纹理做 `textures_loaded` 缓存去重？不去重有什么坏处？",
    answer:
      "因为一个模型里车身、引擎盖、车门很可能共用同一张贴图。如果每个网格都各自从磁盘重新读一遍，同一张贴图会被加载几十遍——既慢（重复磁盘读和解码）又费内存/显存（存了多份一模一样的纹理）。去重让同一张贴图全模型只加载一次。",
    tags: ["textures_loaded", "为什么"],
  },
  {
    id: "mo-31",
    chapter: "model",
    level: 2,
    question: "`textures_loaded` 去重时是按什么来判断「这张贴图加载过」的？",
    answer:
      "按路径（path）。内层循环拿当前贴图的路径去 `textures_loaded` 里逐个比对 `textures_loaded[j].path == path.C_Str()`，路径相同就认为是同一张、命中复用。",
    tags: ["textures_loaded", "path", "机制"],
  },
  {
    id: "mo-32",
    chapter: "model",
    level: 2,
    question: "为什么加载纹理时一定要把 `directory` 拼到贴图路径前面？",
    answer:
      "因为模型文件里记的贴图路径几乎都是「相对模型文件」的（比如就写个 `textures/paint.png`）。不把 `directory` 拼在前面，程序会去当前工作目录找贴图，找不到，模型就变全黑或报错。",
    tags: ["directory", "为什么"],
  },
  {
    id: "mo-33",
    chapter: "model",
    level: 2,
    question: "为什么 `Model::Draw` 能简单到只有一个 `for` 循环？",
    answer:
      "因为加载阶段已经把整棵场景图树递归拆成了一组自治的 mesh，每块 mesh 都是上一章那种「会自己画自己」的网格。所以绘制阶段不需要任何细节，只要把每块各 `Draw` 一遍即可——加载阶段递归拆开、绘制阶段一行合拢。",
    tags: ["Draw", "为什么"],
  },
  {
    id: "mo-34",
    chapter: "model",
    level: 2,
    question: "Model 和上一章的 Mesh 是什么关系？谁负责画、谁负责加载？",
    answer:
      "Model 是 Mesh 的「容器 + 加载器」：Model 负责把文件读进来、递归拆成一组 Mesh、备好纹理，但自己不碰 OpenGL；真正的绘制（绑 VAO、绑纹理、`glDrawElements`）都在每个 Mesh 自己的 `Draw` 里。Model 只把活分给手下每个 mesh。",
    tags: ["模型", "Mesh", "区别"],
  },
  {
    id: "mo-35",
    chapter: "model",
    level: 2,
    question: "`processMesh` 是怎么找到一个网格该用哪个材质的？",
    answer:
      "通过索引。`mesh->mMaterialIndex` 是个索引，拿它去全局材质数组 `scene->mMaterials` 里取出对应的 `aiMaterial`，再把这个材质交给 `loadMaterialTextures` 去加载它的漫反射、镜面贴图。",
    tags: ["processMesh", "mMaterialIndex", "材质"],
  },
  {
    id: "mo-36",
    chapter: "model",
    level: 2,
    question: "`loadMaterialTextures` 里那个 `skip` 标志起什么作用？",
    answer:
      "它标记当前贴图是否在缓存里命中。内层循环比对路径，命中就把缓存里那份 push 进结果并置 `skip = true`、跳出循环；之后 `if (!skip)` 只在没命中时才走 `TextureFromFile` 真正加载。`skip` 就是「命中则跳过加载」的开关。",
    tags: ["loadMaterialTextures", "skip", "机制"],
  },
  {
    id: "mo-37",
    chapter: "model",
    level: 2,
    question:
      "为什么 `loadModel` 要做 `!scene || scene->mFlags & AI_SCENE_FLAGS_INCOMPLETE || !scene->mRootNode` 的检查？",
    answer:
      "这是读文件后的错误检查：场景为空、数据不完整（INCOMPLETE 标志）、或没有根节点，都说明读取失败。这时打印 Assimp 的错误信息并 `return`，避免后面拿着无效的 `scene`、`mRootNode` 去递归而崩溃。",
    tags: ["loadModel", "错误检查"],
  },
  {
    id: "mo-38",
    chapter: "model",
    level: 2,
    question:
      "`directory = path.substr(0, path.find_last_of('/'))` 这一句在算什么？",
    answer:
      "它把模型文件的完整路径截到最后一个 `/`，留下文件夹部分，存进 `directory`。比如 `objects/car/car.obj` 截出 `objects/car`。之后加载纹理就靠这个目录前缀拼出贴图的完整磁盘路径。",
    tags: ["directory", "loadModel", "机制"],
  },

  // ── L3 应用（读代码 / 给场景判结果 / 写片段 / 小推断） ──
  {
    id: "mo-39",
    chapter: "model",
    level: 3,
    question: "写出 `processNode` 递归函数的主体（两个循环）。",
    answer:
      "先收本节点网格：`for (i...) { aiMesh* mesh = scene->mMeshes[node->mMeshes[i]]; meshes.push_back(processMesh(mesh, scene)); }`；再递归子节点：`for (i...) processNode(node->mChildren[i], scene);`。顺序是先收本节点、再递归 children。",
    tags: ["processNode", "GLSL", "应用"],
  },
  {
    id: "mo-40",
    chapter: "model",
    level: 3,
    question:
      "在 §3 的查看器里把 mesh 下拉从「全部」切到某一个具体的件，画面会怎样？这印证了什么？",
    answer:
      "画面会只剩下那一块（被高亮、其余压暗）。这印证了「一个模型其实是一组各自独立、各有名字的 mesh 拼起来的」——每块都能被单独隔离出来看。",
    tags: ["ModelDemo", "应用"],
  },
  {
    id: "mo-41",
    chapter: "model",
    level: 3,
    question:
      "在 `processNode` 里，已知 `node` 和 `scene`，怎么取出本节点第 `i` 个网格的真正数据？",
    answer:
      "写 `aiMesh* mesh = scene->mMeshes[node->mMeshes[i]];`。先用 `node->mMeshes[i]` 取出索引，再拿这个索引去全局数组 `scene->mMeshes` 里取出真正的 `aiMesh`。",
    tags: ["mMeshes", "读代码", "应用"],
  },
  {
    id: "mo-42",
    chapter: "model",
    level: 3,
    question: "写出 `processMesh` 里搬一个顶点纹理坐标的那段（含判空）。",
    answer:
      "`if (mesh->mTextureCoords[0]) vertex.TexCoords = vec2(mesh->mTextureCoords[0][i].x, mesh->mTextureCoords[0][i].y); else vertex.TexCoords = vec2(0.0f, 0.0f);`。有 UV 就搬过来，没有就用 `(0,0)` 兜底。",
    tags: ["mTextureCoords[0]", "GLSL", "应用"],
  },
  {
    id: "mo-43",
    chapter: "model",
    level: 3,
    question: "写出 `processMesh` 里从面收集索引的那两层循环。",
    answer:
      "`for (i...) { aiFace face = mesh->mFaces[i]; for (j...) indices.push_back(face.mIndices[j]); }`。外层遍历每个面，内层把面里的每个顶点索引 `face.mIndices[j]` 收进 `indices`。",
    tags: ["mFaces", "indices", "应用"],
  },
  {
    id: "mo-44",
    chapter: "model",
    level: 3,
    question: "写出 `Model::Draw` 的实现。",
    answer:
      "`void Model::Draw(Shader& shader) { for (unsigned int i = 0; i < meshes.size(); i++) meshes[i].Draw(shader); }`。就是遍历 `meshes`，把每块的 `Draw` 各调一遍。",
    tags: ["Draw", "应用"],
  },
  {
    id: "mo-45",
    chapter: "model",
    level: 3,
    question: "`processMesh` 取材质并加载漫反射贴图的那几句大概怎么写？",
    answer:
      '`aiMaterial* material = scene->mMaterials[mesh->mMaterialIndex];` 取材质；`vector<Texture> diffuseMaps = loadMaterialTextures(material, aiTextureType_DIFFUSE, "texture_diffuse");` 加载漫反射贴图；再 `textures.insert(textures.end(), diffuseMaps.begin(), diffuseMaps.end());` 把它们并进 textures。',
    tags: ["processMesh", "材质", "应用"],
  },
  {
    id: "mo-46",
    chapter: "model",
    level: 3,
    question:
      "在 `loadMaterialTextures` 里没命中缓存（`!skip`）时，要做哪几步？",
    answer:
      "真正加载并登记缓存：建一个 `Texture`，`texture.id = TextureFromFile(path.C_Str(), directory);` 读磁盘（记得传 `directory`），设 `texture.type`、`texture.path`，`textures.push_back(texture)` 加进结果，再 `textures_loaded.push_back(texture)` 登记进缓存供下次复用。",
    tags: ["loadMaterialTextures", "读代码", "应用"],
  },
  {
    id: "mo-47",
    chapter: "model",
    level: 3,
    question:
      "在 `loadMaterialTextures` 里命中缓存时，那一段判断和动作怎么写？",
    answer:
      "`for (j...) if (textures_loaded[j].path == path.C_Str()) { textures.push_back(textures_loaded[j]); skip = true; break; }`。路径相同即命中，把缓存里那份 push 进结果、置 `skip = true` 并 `break`，跳过后面的磁盘加载。",
    tags: ["textures_loaded", "应用"],
  },
  {
    id: "mo-48",
    chapter: "model",
    level: 3,
    question:
      "假设一辆车的场景图根节点直接挂 1 块车身，4 个轮子各是一个子节点。`processNode` 跑完后 `meshes` 里有几块？",
    answer:
      "5 块——车身（根节点持有）加 4 个轮子（4 个子节点各持有 1 块）。因为 `processNode` 先收根节点的车身，再递归 4 个子节点各收一个轮子，全部压平进 `meshes`。",
    tags: ["processNode", "应用"],
  },
  {
    id: "mo-49",
    chapter: "model",
    level: 3,
    question:
      "模型文件路径是 `resources/objects/backpack/backpack.obj`，`directory` 会被截成什么？",
    answer:
      "`resources/objects/backpack`。`path.substr(0, path.find_last_of('/'))` 截到最后一个 `/`，留下文件夹部分；之后贴图路径就拼在这个前缀后面。",
    tags: ["directory", "应用"],
  },
  {
    id: "mo-50",
    chapter: "model",
    level: 3,
    question:
      "一个模型有 3 种材质类型的贴图（漫反射、镜面、法线），但本章 `processMesh` 只加载了哪几类？",
    answer:
      "本章只加载漫反射（`aiTextureType_DIFFUSE`）和镜面（`aiTextureType_SPECULAR`）两类，分别调 `loadMaterialTextures` 取出，再 insert 进 `textures`。法线等其它类型本章没涉及。",
    tags: ["processMesh", "材质", "应用"],
  },
  {
    id: "mo-51",
    chapter: "model",
    level: 3,
    question:
      "在查看器里切到「线框」观察某个轮子，能看清什么？这对应代码里的哪个事实？",
    answer:
      "能看清这块网格的三角网格结构（被 Triangulate 成的三角形）。对应代码里 `aiProcess_Triangulate` 把所有面拆成三角形，以及 `processMesh` 从 `mFaces` 逐面收集三个顶点索引——线框就是这些三角面的边。",
    tags: ["ModelDemo", "Triangulate", "应用"],
  },
  {
    id: "mo-52",
    chapter: "model",
    level: 3,
    question:
      "若一个网格没有 UV，`processMesh` 处理后这些顶点的 `TexCoords` 是多少？",
    answer:
      "全是 `vec2(0.0f, 0.0f)`。因为 `if (mesh->mTextureCoords[0])` 判空为假，走 else 分支给每个顶点的 `TexCoords` 赋兜底值 `(0,0)`，避免越界。",
    tags: ["mTextureCoords[0]", "应用"],
  },
  {
    id: "mo-53",
    chapter: "model",
    level: 3,
    question:
      "一个模型里 3 个网格共用同一张漆面贴图，带缓存的 `loadMaterialTextures` 实际从磁盘读了几次？",
    answer:
      "1 次。第一个网格未命中、真正读盘并登记进 `textures_loaded`；后两个网格按路径命中缓存、直接复用那份，不再读盘。所以全模型这张贴图只读 1 次。",
    tags: ["textures_loaded", "应用"],
  },
  {
    id: "mo-54",
    chapter: "model",
    level: 3,
    question:
      "调用 `TextureFromFile(path.C_Str(), directory)` 时，为什么要把 `directory` 作为第二个参数传进去？",
    answer:
      "因为 `path` 是相对模型文件的相对路径，`TextureFromFile` 内部会把 `directory` 和这个相对路径拼成完整路径再去读盘。不传 `directory`，它就只能拿裸相对路径找文件，会跑到当前工作目录、找不到贴图。",
    tags: ["TextureFromFile", "directory", "应用"],
  },

  // ── L4 综合 · 排错（多概念串联 / 常见坑 / 边界） ──
  {
    id: "mo-55",
    chapter: "model",
    level: 4,
    question:
      "模型画出来只剩一两块（比如只有车身，没有轮子玻璃），大半不见了。是哪一步出了问题？怎么修？",
    answer:
      "是 `processNode` 漏了递归子节点那个循环——遍历到根节点处理完就停了，子节点里的网格全没收进 `meshes`。修法：`processNode` 末尾一定要 `for (i...) processNode(node->mChildren[i], scene)` 对每个子节点递归。",
    tags: ["processNode", "排错", "递归"],
  },
  {
    id: "mo-56",
    chapter: "model",
    level: 4,
    question:
      "模型形状对，但全是黑的 / 贴图全丢，或报「找不到文件」。是哪一步出了问题？怎么修？",
    answer:
      "是纹理路径没拼 `directory`——模型文件里记的是相对模型文件的路径，直接拿去加载会跑到当前工作目录找、找不到。修法：加载纹理时一律把 `directory` 前缀拼上（由 `TextureFromFile(path, directory)` 内部完成拼接），别用裸相对路径。",
    tags: ["directory", "排错", "全黑"],
  },
  {
    id: "mo-57",
    chapter: "model",
    level: 4,
    question:
      "加载一个稍大的模型慢得离谱、内存暴涨，明明贴图就那么几张。是哪一步出了问题？怎么修？",
    answer:
      "是没做 `textures_loaded` 缓存去重——多个网格共用同一张贴图时，每个网格都各自从磁盘重新加载了一遍。修法：每张贴图加载前先按 `path` 在 `textures_loaded` 里查一遍，命中就复用、不命中才加载并登记进缓存。",
    tags: ["textures_loaded", "排错", "性能"],
  },
  {
    id: "mo-58",
    chapter: "model",
    level: 4,
    question:
      "加载某些模型时崩溃 / 读到一堆乱七八糟的纹理坐标。是哪一步出了问题？怎么修？",
    answer:
      "是 `processMesh` 读纹理坐标前没判空——网格不一定有 UV（纯色、不贴图的件就没有），直接读 `mesh->mTextureCoords[0][i]` 会越界。修法：读 UV 前先判 `if (mesh->mTextureCoords[0])`，没有就给个 `vec2(0.0f, 0.0f)` 兜底。",
    tags: ["mTextureCoords[0]", "排错", "越界"],
  },
  {
    id: "mo-59",
    chapter: "model",
    level: 4,
    question:
      "完整串一遍：从 `loadModel(path)` 到屏幕上画出整个模型，经过哪几步？",
    answer:
      "① `loadModel`：`Importer.ReadFile` 读文件（带 Triangulate/FlipUVs 标志）、错误检查、截出 `directory`，进 `processNode(根节点)`；② `processNode` 递归：先收本节点网格（processMesh 塞进 `meshes`）、再递归每个子节点，把树压平；③ `processMesh`：搬顶点/法线/UV（判空）、从 `mFaces` 收索引、取材质调 `loadMaterialTextures` 加载贴图，拼成 `Mesh`；④ `loadMaterialTextures`：按 `path` 查 `textures_loaded` 去重，命中复用、否则 `TextureFromFile`（拼 `directory`）加载并登记；⑤ `Model::Draw`：遍历 `meshes` 逐个 `mesh.Draw`。",
    tags: ["流程", "综合"],
  },
  {
    id: "mo-60",
    chapter: "model",
    level: 4,
    question:
      "有人把 `processNode` 里两个循环的顺序对调（先递归子节点、再收本节点网格），结果会怎样？",
    answer:
      "最终 `meshes` 里的网格还是全部都在（每个节点的网格仍被处理到），但它们进 `meshes` 的顺序变了——变成更靠近「后序遍历」的顺序。功能上一般不影响画面（Draw 不依赖顺序），但这偏离了课程「先收本节点、再递归子节点」的标准深度优先写法，不推荐随意改。",
    tags: ["processNode", "综合", "边界"],
  },
  {
    id: "mo-61",
    chapter: "model",
    level: 4,
    question:
      "为什么说本章是把上一章手写的 Mesh「升级」成 Model，而 Model 自己却一行 OpenGL 都不写？",
    answer:
      "因为绘制能力早在上一章就封进了每个 `Mesh::Draw`（绑 VAO、绑纹理、`glDrawElements`）。Model 要补的是「从文件读出一组 Mesh」这件上一章没有的事——读文件、递归拆树、缓存纹理。绘制阶段它只当转发器把活分给手下每个 mesh，所以自己不碰 OpenGL。",
    tags: ["模型", "Mesh", "综合"],
  },
  {
    id: "mo-62",
    chapter: "model",
    level: 4,
    question:
      "如果忘了在 `ReadFile` 里加 `aiProcess_Triangulate`，`processMesh` 收集索引那段会出什么隐患？",
    answer:
      "面可能不是三角形（如四边形，`face.mNumIndices` 为 4）。收集索引的内层循环按 `face.mNumIndices` 收没问题，但收出来的索引数不再是「每面三个」，丢给 OpenGL 的三角形绘制会出错或显示破碎。所以本章一开始就用 `aiProcess_Triangulate` 把面统一成三角形。",
    tags: ["Triangulate", "mFaces", "综合"],
  },
  {
    id: "mo-63",
    chapter: "model",
    level: 4,
    question:
      "`processNode` 收网格写成了 `scene->mMeshes[i]`（漏掉 `node->mMeshes`），会怎样？",
    answer:
      "会把全局网格数组从头按 `i` 顺序取，而不是按当前节点真正点名的那几个索引取。结果是网格归属错乱、可能重复或漏取，模型画出来错乱或重复。正确写法必须是两层：`scene->mMeshes[node->mMeshes[i]]`，先取节点的索引再去全局数组取。",
    tags: ["mMeshes", "排错", "综合"],
  },
  {
    id: "mo-64",
    chapter: "model",
    level: 4,
    question:
      "两个不同模型文件恰好都用了名为 `wood.png` 的贴图但在不同文件夹，`textures_loaded` 按 path 去重会误判吗？",
    answer:
      "在同一个 `Model` 实例内不会误判——它存的 `path` 就是模型文件里记的相对路径，同一模型里同名同路径才视为同一张。不同 `Model` 实例各有自己的 `textures_loaded`，互不共享。需要注意的只是同一模型内若两张不同贴图碰巧路径字符串相同才会误命中，正常模型文件不会这样。",
    tags: ["textures_loaded", "path", "边界"],
  },
  {
    id: "mo-65",
    chapter: "model",
    level: 4,
    question:
      "`loadMaterialTextures` 里命中缓存后忘了写 `break`，会有什么后果？",
    answer:
      "内层循环不会提前停，会继续把后面 `textures_loaded` 里其它项也比对完。如果缓存里恰好没有第二个相同路径，功能上还正常（只是多比对几次）；但若逻辑写得依赖命中即停，漏 `break` 可能导致重复 push 或多做无谓比对。规范写法是命中即 `skip = true; break;`。",
    tags: ["loadMaterialTextures", "综合", "边界"],
  },
  {
    id: "mo-66",
    chapter: "model",
    level: 4,
    question:
      "为什么说「加载阶段递归拆开、绘制阶段一行合拢」是把复杂物体拆成一组自治网格的回报？",
    answer:
      "因为前期 `processNode` 递归把一棵任意层级的树拆成了一组各自会画自己的 `Mesh`，承担了所有复杂度；到了绘制阶段，整件物体的复杂性已经被分摊进每块 mesh，`Model::Draw` 只需一个 `for` 把每块 `Draw` 一遍即可。复杂度前置到加载、绘制端因此极简。",
    tags: ["Draw", "processNode", "综合"],
  },
];
