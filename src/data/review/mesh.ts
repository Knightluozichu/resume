/** 复习题库 · 网格（mesh）。Phase B 各章独立文件，避免并行写冲突。 */

import type { ReviewQuestion } from "./types";

export const meshQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / 结构 / 成员） ──
  {
    id: "me-1",
    chapter: "mesh",
    level: 1,
    question: "什么是「网格」（Mesh）？它由哪三样东西打包而成？",
    answer:
      "网格是一个能独立绘制的最小单元，由一组顶点、一组索引、一组纹理三样东西打包而成。代码里它是一个 `Mesh` 类，自带 `setupMesh`（配显存）和 `Draw`（画自己）两个本领。一辆车的车身、轮胎、玻璃各是一个网格。",
    tags: ["网格", "定义"],
  },
  {
    id: "me-2",
    chapter: "mesh",
    level: 1,
    question: "一个模型和一个网格是什么关系？",
    answer:
      "一个模型由多个网格组成。比如一辆车被拆成车身、轮胎、玻璃、车灯……每个零件是一个网格。本章只管单个网格怎么自给自足；把多个网格串起来统一管理，是下一章 `Model` 类的事。",
    tags: ["网格", "模型"],
  },
  {
    id: "me-3",
    chapter: "mesh",
    level: 1,
    question: "`Vertex` 结构体里打包了哪三样属性？分别是什么向量类型？",
    answer:
      "`Position`（位置，`glm::vec3`）、`Normal`（法线，`glm::vec3`）、`TexCoords`（纹理坐标，`glm::vec2`）。位置和法线各占 12 字节，纹理坐标占 8 字节，全用 GLM 的向量类型紧挨着声明。",
    tags: ["Vertex 结构体", "定义"],
  },
  {
    id: "me-4",
    chapter: "mesh",
    level: 1,
    question: "什么是 interleaved（交错排列）？",
    answer:
      "把一个顶点的位置、法线、纹理坐标紧挨着连续存放，下一个顶点紧跟其后，全挤在一条连续内存上——而不是所有位置存一片、所有法线存另一片。好处是上传一个 VBO 就够了，GPU 读一个顶点时数据就在一起。",
    tags: ["interleaved", "定义"],
  },
  {
    id: "me-5",
    chapter: "mesh",
    level: 1,
    question: "`Texture` 结构体存哪三样东西？",
    answer:
      "`id`（OpenGL 纹理对象的句柄）、`type`（类型字符串，如 `texture_diffuse`、`texture_specular`，标明这是漫反射图还是镜面图）、`path`（贴图文件路径，留作下一章去重缓存用）。",
    tags: ["Texture 结构体", "定义"],
  },
  {
    id: "me-6",
    chapter: "mesh",
    level: 1,
    question: "`Texture` 结构体里 `id` 字段是什么？",
    answer:
      "`id` 是已经加载好、可以拿去绑定的 OpenGL 纹理对象的句柄（`unsigned int`）。`Draw` 时用 `glBindTexture(GL_TEXTURE_2D, textures[i].id)` 就是把这个 `id` 对应的纹理绑到某个纹理单元上。",
    tags: ["Texture 结构体", "id"],
  },
  {
    id: "me-7",
    chapter: "mesh",
    level: 1,
    question: "`Texture` 结构体里 `path` 字段这一章用得上吗？留它做什么？",
    answer:
      "这一章用不上。留着是给下一章 `Model` 做去重缓存的键：同一张贴图可能被多个网格引用，记下路径就能判断「这张图已经加载过、直接复用」，避免重复占显存。本章先把字段摆上。",
    tags: ["Texture 结构体", "path"],
  },
  {
    id: "me-8",
    chapter: "mesh",
    level: 1,
    question: "`Mesh` 类持有哪三组数据？分别用什么容器装？",
    answer:
      "三组数据都用 `std::vector` 装：`vector<Vertex> vertices`（顶点）、`vector<unsigned int> indices`（索引）、`vector<Texture> textures`（纹理）。这三组正好对应「一组顶点 + 一组索引 + 一组纹理」。",
    tags: ["Mesh 类", "成员"],
  },
  {
    id: "me-9",
    chapter: "mesh",
    level: 1,
    question: "`Mesh` 类里哪个成员是公开（public）的？为什么外部需要它？",
    answer:
      "`VAO` 是公开的。因为绘制时外部要绑定它（`glBindVertexArray(VAO)`）——VAO 已经记住了 VBO/EBO 的配置，外部只需绑这一个。`VBO`、`EBO` 则是私有的，外部不必直接碰。",
    tags: ["Mesh 类", "VAO"],
  },
  {
    id: "me-10",
    chapter: "mesh",
    level: 1,
    question: "`Mesh` 的构造函数做了哪两件事？",
    answer:
      "先把传进来的三组数据（`vertices`、`indices`、`textures`）存到成员上，然后立刻调用 `setupMesh()` 把 VAO/VBO/EBO 配置妥当。一拿到数据就配好显存，是这个类「自装配」的体现。",
    tags: ["Mesh 类", "构造函数"],
  },
  {
    id: "me-11",
    chapter: "mesh",
    level: 1,
    question: "`offsetof` 是什么？拿来做什么？",
    answer:
      "`offsetof` 是 C/C++ 标准库的一个宏，`offsetof(结构体, 字段)` 返回该字段从结构体起始处算起的字节偏移。`setupMesh` 里用它自动算出每个顶点属性在 `Vertex` 里的偏移，省得手算，改了结构体也不会算错。",
    tags: ["offsetof", "定义"],
  },
  {
    id: "me-12",
    chapter: "mesh",
    level: 1,
    question: "`setupMesh()` 大致负责什么？",
    answer:
      "生成并绑定 VAO/VBO/EBO，把顶点和索引上传到显存，然后用 `glVertexAttribPointer` 告诉 GPU 每个顶点属性在那条 interleaved 内存里从哪个字节开始、隔多远是下一个顶点。配完一次，绘制时绑 VAO 就够。",
    tags: ["setupMesh", "定义"],
  },
  {
    id: "me-13",
    chapter: "mesh",
    level: 1,
    question: "什么是「顶点属性」（vertex attribute）？",
    answer:
      "一个顶点身上携带的各项数据——位置、法线、纹理坐标等，每一项就是一个属性。`glVertexAttribPointer` 告诉 GPU 每个属性在那条 interleaved 内存里从哪个字节起、隔多远是下一个顶点的同名属性。",
    tags: ["顶点属性", "定义"],
  },
  {
    id: "me-14",
    chapter: "mesh",
    level: 1,
    question: "什么是索引缓冲（EBO）？它存的是什么？",
    answer:
      "EBO 是 Element Buffer Object，索引缓冲对象。它存的不是顶点本身，而是一串「用第几个顶点」的编号。被多个三角形共用的顶点（如方块四个角）只需在 VBO 里存一份，绘制时按索引重复引用，省显存也省带宽。",
    tags: ["索引缓冲（EBO）", "定义"],
  },
  {
    id: "me-15",
    chapter: "mesh",
    level: 1,
    question: "什么是纹理单元（texture unit）？",
    answer:
      "GPU 里编了号的纹理插槽（`GL_TEXTURE0`、`GL_TEXTURE1`…）。先 `glActiveTexture` 选中第 `i` 号插槽，再 `glBindTexture` 把一张纹理插进去；着色器里把对应 sampler 的值设成 `i`，它就去第 `i` 号插槽取图。多张纹理同时用，靠不同编号区分。",
    tags: ["纹理单元", "定义"],
  },
  {
    id: "me-16",
    chapter: "mesh",
    level: 1,
    question: "什么是采样器命名约定（`texture_diffuseN`）？",
    answer:
      "网格纹理的 `type` 和着色器里 sampler 的 uniform 名遵守同一套起名规则：漫反射图叫 `texture_diffuse` 加序号（`texture_diffuse1`、`texture_diffuse2`…），镜面图叫 `texture_specular` 加序号，序号都从 1 起。`Draw` 按这套规则机械地拼名、把第 `i` 张纹理接到同名 sampler。",
    tags: ["采样器命名约定", "定义"],
  },
  {
    id: "me-17",
    chapter: "mesh",
    level: 1,
    question: "`Draw()` 最后用哪个 OpenGL 函数真正把网格画出来？",
    answer:
      "用 `glDrawElements`，参数是 `GL_TRIANGLES` 模式、`indices.size()` 个索引、索引类型 `GL_UNSIGNED_INT`、偏移 0。因为有 EBO、要按索引复用顶点，所以用 `glDrawElements` 而不是 `glDrawArrays`。",
    tags: ["Draw", "glDrawElements"],
  },
  {
    id: "me-18",
    chapter: "mesh",
    level: 1,
    question: "`sizeof(Vertex)` 是多少字节？怎么算出来的？",
    answer:
      "32 字节。`Position`（`vec3`）12 + `Normal`（`vec3`）12 + `TexCoords`（`vec2`）8 = 32。它就是 `setupMesh` 里每个顶点属性的步长（stride）——从一个顶点跳到下一个顶点要跨过整整一个结构体。",
    tags: ["Vertex 结构体", "sizeof"],
  },
  {
    id: "me-19",
    chapter: "mesh",
    level: 1,
    question:
      "`Draw(Shader &shader)` 里 `diffuseN` 和 `specularN` 这两个计数器初值是几？",
    answer:
      "都从 `1` 起，且各自独立计数。所以两张漫反射图会拼成 `texture_diffuse1`、`texture_diffuse2`，而第一张镜面图是 `texture_specular1`。这个起始序号必须和着色器里 sampler 的命名严格一致。",
    tags: ["Draw", "采样器命名约定"],
  },
  {
    id: "me-20",
    chapter: "mesh",
    level: 1,
    question: "`Vertex` 结构体里字段的声明顺序有什么意义？",
    answer:
      "字段的声明顺序就是它们在内存里的先后顺序。`Position` 在最前（偏移 0），`Normal` 紧随其后（偏移 12），`TexCoords` 再之后（偏移 24）。这正是 interleaved 排布，也是 `offsetof` 能算出正确偏移的前提。",
    tags: ["Vertex 结构体", "interleaved"],
  },
  {
    id: "me-21",
    chapter: "mesh",
    level: 1,
    question:
      "`glVertexAttribPointer` 的两个关键参数「步长」和「偏移」分别是什么？",
    answer:
      "步长（stride）是从一个顶点的某属性跳到下一个顶点同属性要跨过的字节数，一律填 `sizeof(Vertex)`；偏移（offset）是该属性在结构体里从开头算起的字节位置，用 `offsetof(Vertex, 字段)` 算。两者一起描述「这个属性在内存里怎么取」。",
    tags: ["glVertexAttribPointer", "顶点属性"],
  },

  // ── L2 理解（为什么 / 机制 / 区别） ──
  {
    id: "me-22",
    chapter: "mesh",
    level: 2,
    question: "为什么一个模型要拆成多个网格，而不是把整辆车塞进一个网格？",
    answer:
      "因为不同零件用的纹理不同：车身贴车漆、轮胎贴橡胶纹、玻璃贴反光图。一次绘制只能绑定一套纹理，所以「一套顶点 + 一套纹理」自然就是一个绘制单元。零件各成一个网格，才能各贴各的图。",
    tags: ["网格", "为什么"],
  },
  {
    id: "me-23",
    chapter: "mesh",
    level: 2,
    question:
      "为什么给每个网格配 `setupMesh` 和 `Draw` 两套本领，而不是写一大段流程统一画所有零件？",
    answer:
      "因为零件一多，统一流程就乱成一团——哪批顶点配哪张贴图、哪段索引连哪个三角形全靠人脑记，错一个就花屏。给每个零件配「自装配说明书」后，主程序只要对每个盒子喊一声「画」，整个模型就出来了。",
    tags: ["Mesh 类", "为什么"],
  },
  {
    id: "me-24",
    chapter: "mesh",
    level: 2,
    question: "为什么 interleaved 排布只用一个 VBO 就能上传所有顶点？",
    answer:
      "因为一个顶点的位置、法线、纹理坐标紧挨着、所有顶点又连成一条连续内存，整个 `vertices` 向量本来就是一片连续字节。`glBufferData` 把它当成一片连续数据一次性灌进 VBO 就够，不必为每种属性各开一个缓冲。",
    tags: ["interleaved", "VBO"],
  },
  {
    id: "me-25",
    chapter: "mesh",
    level: 2,
    question: "interleaved 排布带来的「代价」是什么？这一章靠什么化解？",
    answer:
      "代价是：告诉 GPU「位置从哪个字节开始、法线从哪个字节开始」时得算出每个属性在结构体里的字节偏移，手算很容易错。靠 `offsetof` 化解——让编译器替你算偏移，改了结构体也不出错。",
    tags: ["interleaved", "offsetof"],
  },
  {
    id: "me-26",
    chapter: "mesh",
    level: 2,
    question:
      "为什么 `setupMesh` 里步长一律填 `sizeof(Vertex)`，而不是写死 32？",
    answer:
      "步长意思是「跨过整整一个结构体到下一个顶点」，所以等于结构体大小。写 `sizeof(Vertex)` 而非 32，是为了一旦往 `Vertex` 里加字段（如做法线贴图加 `Tangent`），`sizeof` 自动变大，步长跟着对，不用手改。",
    tags: ["setupMesh", "sizeof"],
  },
  {
    id: "me-27",
    chapter: "mesh",
    level: 2,
    question: "为什么偏移非用 `offsetof` 不可，手写 `12`、`24` 不行吗？",
    answer:
      "手写当下能填对，但一旦往 `Vertex` 里加字段或调整顺序，所有手写的偏移就全错了，光照乱跳、贴图撕裂。`offsetof` 让编译器按结构体当前布局自动算，结构体怎么改它都算得对。这就是为什么禁止填魔法数字。",
    tags: ["offsetof", "为什么"],
  },
  {
    id: "me-28",
    chapter: "mesh",
    level: 2,
    question: "为什么 `VAO` 设为 public，而 `VBO`/`EBO` 设为 private？",
    answer:
      "因为绘制时外部只需要绑 `VAO`——它已经记住了第四步配好的所有属性指针和 EBO 配置。底下 `VBO`/`EBO` 的句柄外部不必关心，藏起来更干净，也防止外部误改。",
    tags: ["Mesh 类", "VAO"],
  },
  {
    id: "me-29",
    chapter: "mesh",
    level: 2,
    question: "构造函数里「一拿到数据就 `setupMesh()`」体现了什么设计意图？",
    answer:
      "体现这个类「自装配」的意图：使用者把顶点/索引/纹理交给它，它自己就把数据摆进显存，不用使用者记得手动初始化。配齐后主程序对每个网格喊一声「画」即可，封装把易错的摆数据步骤藏在内部。",
    tags: ["Mesh 类", "构造函数"],
  },
  {
    id: "me-30",
    chapter: "mesh",
    level: 2,
    question: "为什么 `Draw` 里要用纹理 `type` 字段，光有 `id` 不够吗？",
    answer:
      "不够。`id` 只是「哪张图」，但着色器里有多个 sampler（漫反射的、镜面的），得知道这张图该接到哪个 sampler。`type`（如 `texture_diffuse`）正是用来按命名约定拼出对应 sampler 名字、把图接到正确插槽的依据。",
    tags: ["Texture 结构体", "Draw"],
  },
  {
    id: "me-31",
    chapter: "mesh",
    level: 2,
    question:
      "为什么 `Draw` 里 `diffuseN` 和 `specularN` 要分开各自计数，而不共用一个序号？",
    answer:
      "因为着色器里漫反射和镜面是两套独立命名的 sampler（`texture_diffuse1`、`texture_specular1`）。各自从 1 起独立计数，才能保证第一张漫反射图叫 `texture_diffuse1`、第一张镜面图叫 `texture_specular1`，分别对上各自那套 sampler。",
    tags: ["Draw", "采样器命名约定"],
  },
  {
    id: "me-32",
    chapter: "mesh",
    level: 2,
    question: "为什么 `Draw` 用 `glDrawElements` 而不是 `glDrawArrays`？",
    answer:
      "因为网格有索引（EBO）、要按索引复用顶点。`glDrawElements` 会读 EBO 里的编号、按索引取顶点画三角形；`glDrawArrays` 则按顺序直读顶点、无视 EBO。用了后者会画错或什么都画不出。",
    tags: ["Draw", "glDrawElements"],
  },
  {
    id: "me-33",
    chapter: "mesh",
    level: 2,
    question: "「命名约定」到底约的是哪两边的什么名字？",
    answer:
      "约的是 CPU 侧 `Draw` 拼出的 uniform 名（如 `material.texture_diffuse1`）和 GLSL 着色器里 sampler 的声明名（`sampler2D texture_diffuse1;`）。两边约好用同一套名字、同一套序号规则，绑定才能自动对上、无需手写。",
    tags: ["采样器命名约定", "机制"],
  },
  {
    id: "me-34",
    chapter: "mesh",
    level: 2,
    question: "EBO 是怎么做到「省显存」的？",
    answer:
      "被多个三角形共用的顶点（比如方块的一个角被三个三角形共用）在 VBO 里只存一份，EBO 里用编号重复引用它即可。这样不必为每个三角形各存一份重复的顶点数据，省显存也省上传带宽。",
    tags: ["索引缓冲（EBO）", "机制"],
  },
  {
    id: "me-35",
    chapter: "mesh",
    level: 2,
    question: "为什么 `glVertexAttribPointer` 的偏移参数要强制转成 `(void*)`？",
    answer:
      "因为这个参数的类型是指针（历史包袱：这个偏移当年被当成「缓冲起始地址加上的偏移指针」）。所以 `offsetof` 算出的整数偏移得写成 `(void*)offsetof(Vertex, Normal)`，少了 `(void*)` 会编译报错或告警。",
    tags: ["glVertexAttribPointer", "void*"],
  },
  {
    id: "me-36",
    chapter: "mesh",
    level: 2,
    question: "为什么 `Mesh` 这个类是纯 C++ 写的、本章没有 WebGL2 对照？",
    answer:
      "因为 `Mesh` 是组织模型的 C++ 类，不是某段可移植的着色器逻辑。它处理的是 `std::vector`、结构体、`offsetof` 这些 C++ 层面的事，没有对应的 WebGL2 等价物，所以本章专心把这一版 C++ 看透。",
    tags: ["Mesh 类", "C++"],
  },
  {
    id: "me-37",
    chapter: "mesh",
    level: 2,
    question:
      "`glBufferData` 上传顶点时为什么能把整个 `vertices` 当成一片连续字节？",
    answer:
      "因为顶点是 interleaved 排布的，`std::vector<Vertex>` 内部就是一片连续的内存。`glBufferData` 传 `vertices.size() * sizeof(Vertex)` 的字节数和 `&vertices[0]` 的首地址，就能把这一整片一次性上传。",
    tags: ["setupMesh", "interleaved"],
  },
  {
    id: "me-38",
    chapter: "mesh",
    level: 2,
    question:
      "为什么往 `Vertex` 加 `Tangent` 字段后，前三个属性的偏移一行都不用改？",
    answer:
      "因为前三个属性的偏移都用 `offsetof(Vertex, 字段)`，而 `Tangent` 是加在 `TexCoords` 之后的，前面三个字段的位置没变，`offsetof` 算出来还是 0、12、24。这正是用 `offsetof` 而非手写魔法数字的好处。",
    tags: ["offsetof", "Vertex 结构体"],
  },
  {
    id: "me-39",
    chapter: "mesh",
    level: 2,
    question:
      "`Draw` 循环里 `glActiveTexture(GL_TEXTURE0 + i)` 和拼出的字符串名字，各管什么？两者独立吗？",
    answer:
      "`glActiveTexture(GL_TEXTURE0 + i)` 把第 `i` 张纹理绑到第 `i` 号纹理单元，只跟下标 `i` 有关；拼出的名字（`material.texture_diffuse1`）则是「告诉 sampler 去几号单元取图」。两者独立：名字拼错不影响纹理被绑到哪号单元，但 sampler 会找不到正确插槽。",
    tags: ["Draw", "纹理单元"],
  },
  {
    id: "me-40",
    chapter: "mesh",
    level: 2,
    question:
      '`Draw` 里 `shader.setInt("material.texture_diffuse1", i)` 设的是什么、设成什么值？',
    answer:
      "给名为 `material.texture_diffuse1` 的 sampler uniform 设值，值是纹理单元编号 `i`。这告诉着色器：这个采样器去第 `i` 号纹理单元取图。配合前面 `glActiveTexture + glBindTexture` 把第 `i` 张图放进第 `i` 号单元，绑定就闭环了。",
    tags: ["Draw", "sampler"],
  },

  // ── L3 应用（写代码 / 读代码 / 怎么做 / 判结果） ──
  {
    id: "me-41",
    chapter: "mesh",
    level: 3,
    question: "写出 `Vertex` 结构体的定义（位置/法线/纹理坐标三个字段）。",
    answer:
      "`struct Vertex { glm::vec3 Position; glm::vec3 Normal; glm::vec2 TexCoords; };`。三个字段紧挨着声明即 interleaved 排布，`sizeof(Vertex)` 为 32 字节。想做法线贴图时可在末尾再加 `glm::vec3 Tangent;`。",
    tags: ["Vertex 结构体", "应用"],
  },
  {
    id: "me-42",
    chapter: "mesh",
    level: 3,
    question: "写出 `Texture` 结构体的定义。",
    answer:
      '`struct Texture { unsigned int id; std::string type; std::string path; };`。`id` 是纹理句柄、`type` 形如 `"texture_diffuse"`、`path` 是文件路径（留作下一章去重）。',
    tags: ["Texture 结构体", "应用"],
  },
  {
    id: "me-43",
    chapter: "mesh",
    level: 3,
    question:
      "写出 `setupMesh` 里把 `vertices` 灌进 VBO 的那句 `glBufferData`。",
    answer:
      "先 `glBindBuffer(GL_ARRAY_BUFFER, VBO);`，再 `glBufferData(GL_ARRAY_BUFFER, vertices.size() * sizeof(Vertex), &vertices[0], GL_STATIC_DRAW);`。字节数是顶点个数乘以 `sizeof(Vertex)`，首地址用 `&vertices[0]`。",
    tags: ["setupMesh", "应用"],
  },
  {
    id: "me-44",
    chapter: "mesh",
    level: 3,
    question: "写出位置属性（属性 0）的 `glVertexAttribPointer` 那两行。",
    answer:
      "`glEnableVertexAttribArray(0);` 然后 `glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, sizeof(Vertex), (void*)0);`。位置是 3 个 float、步长 `sizeof(Vertex)`、偏移 0（位置在结构体最前）。",
    tags: ["setupMesh", "应用"],
  },
  {
    id: "me-45",
    chapter: "mesh",
    level: 3,
    question: "写出法线属性（属性 1）的 `glVertexAttribPointer`，偏移怎么填？",
    answer:
      "`glEnableVertexAttribArray(1);` 然后 `glVertexAttribPointer(1, 3, GL_FLOAT, GL_FALSE, sizeof(Vertex), (void*)offsetof(Vertex, Normal));`。法线是 3 个 float，偏移用 `(void*)offsetof(Vertex, Normal)`（自动算得 12）。",
    tags: ["setupMesh", "offsetof", "应用"],
  },
  {
    id: "me-46",
    chapter: "mesh",
    level: 3,
    question:
      "写出纹理坐标属性（属性 2）的 `glVertexAttribPointer`，注意分量个数。",
    answer:
      "`glEnableVertexAttribArray(2);` 然后 `glVertexAttribPointer(2, 2, GL_FLOAT, GL_FALSE, sizeof(Vertex), (void*)offsetof(Vertex, TexCoords));`。纹理坐标是 `vec2`，分量个数填 `2`（不是 3），偏移 `(void*)offsetof(Vertex, TexCoords)`（自动算得 24）。",
    tags: ["setupMesh", "offsetof", "应用"],
  },
  {
    id: "me-47",
    chapter: "mesh",
    level: 3,
    question:
      "写出 `setupMesh` 里把 `indices` 灌进 EBO 的那句 `glBufferData`。",
    answer:
      "先 `glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, EBO);`，再 `glBufferData(GL_ELEMENT_ARRAY_BUFFER, indices.size() * sizeof(unsigned int), &indices[0], GL_STATIC_DRAW);`。目标是 `GL_ELEMENT_ARRAY_BUFFER`，字节数按 `unsigned int` 算。",
    tags: ["setupMesh", "索引缓冲（EBO）", "应用"],
  },
  {
    id: "me-48",
    chapter: "mesh",
    level: 3,
    question: "写出 `Mesh` 构造函数的函数体（存三组数据 + 配显存）。",
    answer:
      "`this->vertices = vertices; this->indices = indices; this->textures = textures; setupMesh();`。先把三组传入数据存到成员，最后调 `setupMesh()` 把 VAO/VBO/EBO 一次配好。",
    tags: ["Mesh 类", "构造函数", "应用"],
  },
  {
    id: "me-49",
    chapter: "mesh",
    level: 3,
    question:
      "`setupMesh` 里 `glGenVertexArrays`、`glGenBuffers` 各生成几个、绑定 VAO 的顺序是怎样？",
    answer:
      "`glGenVertexArrays(1, &VAO)` 生成 1 个 VAO，`glGenBuffers(1, &VBO)`、`glGenBuffers(1, &EBO)` 各生成 1 个缓冲。然后先 `glBindVertexArray(VAO)`，再绑 VBO/EBO 并配属性指针——这样属性配置才会被记进当前绑定的 VAO。",
    tags: ["setupMesh", "应用"],
  },
  {
    id: "me-50",
    chapter: "mesh",
    level: 3,
    question: "写出 `Draw` 循环里给一张漫反射纹理拼名并设 sampler 的那几行。",
    answer:
      '`glActiveTexture(GL_TEXTURE0 + i);` 激活第 i 号单元；`std::string number = std::to_string(diffuseN++);`（type 是 `texture_diffuse` 时）；`shader.setInt(("material." + name + number).c_str(), i);` 拼出 `material.texture_diffuse1` 并设值 i；`glBindTexture(GL_TEXTURE_2D, textures[i].id);` 绑图。',
    tags: ["Draw", "采样器命名约定", "应用"],
  },
  {
    id: "me-51",
    chapter: "mesh",
    level: 3,
    question: "写出 `Draw` 末尾真正绘制的那几行（含收尾激活 0 号单元）。",
    answer:
      "`glActiveTexture(GL_TEXTURE0);` 收尾重置回 0 号；`glBindVertexArray(VAO);` 绑回记着配置的 VAO；`glDrawElements(GL_TRIANGLES, indices.size(), GL_UNSIGNED_INT, 0);` 按索引画三角形；`glBindVertexArray(0);` 解绑。",
    tags: ["Draw", "glDrawElements", "应用"],
  },
  {
    id: "me-52",
    chapter: "mesh",
    level: 3,
    question: "着色器里与 `Draw` 配套的 sampler 该怎么声明？",
    answer:
      "`struct Material { sampler2D texture_diffuse1; sampler2D texture_specular1; };` 加 `uniform Material material;`。片段里用 `texture(material.texture_diffuse1, TexCoords)` 取色。名字必须和 `Draw` 拼出来的一字不差。",
    tags: ["采样器命名约定", "GLSL", "应用"],
  },
  {
    id: "me-53",
    chapter: "mesh",
    level: 3,
    question:
      "一个网格有 2 张漫反射图、1 张镜面图，`Draw` 会拼出哪几个 uniform 名？",
    answer:
      "`material.texture_diffuse1`、`material.texture_diffuse2`（两张漫反射，序号从 1 递增）和 `material.texture_specular1`（一张镜面，序号也从 1 起、独立计数）。三者分别接到第 0、1、2 号纹理单元。",
    tags: ["Draw", "采样器命名约定", "应用"],
  },
  {
    id: "me-54",
    chapter: "mesh",
    level: 3,
    question:
      "要给 `Mesh` 支持法线贴图，需要改哪两处？写出新增的那个属性指针调用。",
    answer:
      "① 在 `Vertex` 末尾加 `glm::vec3 Tangent;`；② 在 `setupMesh` 里加属性 3：`glEnableVertexAttribArray(3); glVertexAttribPointer(3, 3, GL_FLOAT, GL_FALSE, sizeof(Vertex), (void*)offsetof(Vertex, Tangent));`。步长仍 `sizeof(Vertex)`、偏移用 `offsetof`。",
    tags: ["setupMesh", "offsetof", "应用"],
  },
  {
    id: "me-55",
    chapter: "mesh",
    level: 3,
    question:
      "`Mesh` 自带一个公开 `VAO`，主程序想画这个网格、绑定哪个对象、调哪个 Mesh 方法？",
    answer:
      "主程序不用直接碰 VAO，调用 `mesh.Draw(shader)` 即可——`Draw` 内部会 `glBindVertexArray(VAO)` 再 `glDrawElements`。公开 `VAO` 是给 `Draw` 内部用的；从使用者角度看，绑纹理、绑 VAO、画三角形都封装在 `Draw` 里。",
    tags: ["Mesh 类", "Draw", "应用"],
  },
  {
    id: "me-56",
    chapter: "mesh",
    level: 3,
    question:
      "`glVertexAttribPointer` 第二个参数（size，分量个数）对位置、法线、纹理坐标各填几？",
    answer:
      "位置填 3（`vec3`）、法线填 3（`vec3`）、纹理坐标填 2（`vec2`）。这个参数是该属性有几个 float 分量，要和 `Vertex` 里对应字段的向量维度一致，填错会读串数据。",
    tags: ["glVertexAttribPointer", "应用"],
  },
  {
    id: "me-57",
    chapter: "mesh",
    level: 3,
    question:
      "已知某 `Vertex` 偏移 `Position`=0、`Normal`=12、`TexCoords`=24，那 `offsetof(Vertex, TexCoords)` 返回多少？步长填多少？",
    answer:
      "`offsetof(Vertex, TexCoords)` 返回 24（纹理坐标前面有 12 字节位置 + 12 字节法线）。步长仍填 `sizeof(Vertex)` = 32。所以 `glVertexAttribPointer(2, 2, GL_FLOAT, GL_FALSE, 32, (void*)24)` 与之等价（但实际写法用 `sizeof`/`offsetof`，别填死数）。",
    tags: ["offsetof", "应用"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "me-58",
    chapter: "mesh",
    level: 4,
    question:
      "模型形状对、但完全没贴上纹理，一片纯黑或纯色。最可能的原因和修法是什么？",
    answer:
      "原因：`Draw` 拼出的 uniform 名（如 `material.texture_diffuse1`）和着色器里 sampler 的声明名对不上——序号从 0 起、漏了 `material.` 前缀、或大小写不一致，`setInt` 静默失败，sampler 没被赋值。修法：让两边名字一字不差，序号一律从 `1` 起。",
    tags: ["采样器命名约定", "陷阱"],
  },
  {
    id: "me-59",
    chapter: "mesh",
    level: 4,
    question:
      "把 `Draw` 里 `diffuseN` 初值从 1 改成 0（拼出 `texture_diffuse0`），但着色器仍声明 `texture_diffuse1`，会怎样？为什么 `glActiveTexture` 不受影响、纹理却照样贴不上？",
    answer:
      '会贴不上：`setInt("material.texture_diffuse0", i)` 找不到这个 uniform、静默失败，真正的 `texture_diffuse1` 没被赋值，默认采样到 0 号单元（或未定义），贴错或贴黑。而 `glActiveTexture(GL_TEXTURE0 + i)` 和 `glBindTexture` 照常执行——它们只跟下标 `i` 有关、跟字符串名无关。纹理被放进了插槽，但 sampler 不知道去哪个插槽取。',
    tags: ["采样器命名约定", "纹理单元", "陷阱"],
  },
  {
    id: "me-60",
    chapter: "mesh",
    level: 4,
    question:
      "法线和纹理坐标错位——光照乱跳、贴图像被撕开。最可能的原因和修法是什么？",
    answer:
      "原因：`glVertexAttribPointer` 的偏移或步长填错了，比如手写死 `(void*)12` 后又往 `Vertex` 加了字段，偏移没跟着变；或 stride 没填 `sizeof(Vertex)`。修法：偏移一律用 `offsetof(Vertex, 字段)`、stride 一律 `sizeof(Vertex)`，让编译器算，别填魔法数字。",
    tags: ["glVertexAttribPointer", "offsetof", "陷阱"],
  },
  {
    id: "me-61",
    chapter: "mesh",
    level: 4,
    question:
      "画出来什么都没有，或只画出一部分三角形。和绘制调用相关的两个常见原因是什么？",
    answer:
      "原因一：用了 `glDrawArrays` 而非 `glDrawElements`——前者按顺序读顶点、无视 EBO 里的索引。原因二：`glDrawElements` 的索引类型填成了 `GL_UNSIGNED_BYTE` 之类，和 `indices` 的 `unsigned int` 不符。修法：有索引就用 `glDrawElements`，类型填 `GL_UNSIGNED_INT`，数量填 `indices.size()`。",
    tags: ["Draw", "glDrawElements", "陷阱"],
  },
  {
    id: "me-62",
    chapter: "mesh",
    level: 4,
    question:
      "`glVertexAttribPointer(1, 3, GL_FLOAT, GL_FALSE, sizeof(Vertex), offsetof(Vertex, Normal))` 这行编译报错，为什么？怎么修？",
    answer:
      "因为 `offsetof` 返回的是整数，而 `glVertexAttribPointer` 最后一个参数要的是指针类型（历史包袱），类型不匹配所以报错。修法：把偏移强制转成 `(void*)`，写成 `(void*)offsetof(Vertex, Normal)`，每个偏移都加 `(void*)`。",
    tags: ["glVertexAttribPointer", "void*", "陷阱"],
  },
  {
    id: "me-63",
    chapter: "mesh",
    level: 4,
    question:
      "完整串一遍：从主程序拿到一个 `Mesh` 到它出现在屏幕上，经过哪几步？",
    answer:
      "① 构造时存好三组数据并调 `setupMesh`：生成绑定 VAO/VBO/EBO，上传顶点和索引，用 `offsetof`+`sizeof(Vertex)` 配好属性指针；② 主程序调 `mesh.Draw(shader)`；③ `Draw` 遍历 `textures`，按 `type` 拼名、`glActiveTexture`+`setInt`+`glBindTexture` 把每张图接到 sampler；④ 绑 `VAO`、`glDrawElements` 按索引画三角形。",
    tags: ["Mesh 类", "流程", "综合"],
  },
  {
    id: "me-64",
    chapter: "mesh",
    level: 4,
    question:
      "为什么 `setupMesh` 里属性指针要在 `glBindVertexArray(VAO)` 之后、`glBindVertexArray(0)` 之前配？顺序错了会怎样？",
    answer:
      "因为 `glVertexAttribPointer` 的配置（含当前绑定的 VBO 和 EBO 关联）会被记进「当前绑定的 VAO」。必须先绑 VAO 再配属性，VAO 才记得住；解绑（绑 0）后配置就定格了。若在绑 VAO 之前配，配置记不进这个 VAO，绘制时绑 VAO 取不到属性指针，画不出或画错。",
    tags: ["setupMesh", "VAO", "综合"],
  },
  {
    id: "me-65",
    chapter: "mesh",
    level: 4,
    question:
      "把 `TexCoords` 的属性指针分量个数误填成 3（应为 2），其余不变，会出什么问题？",
    answer:
      "GPU 会从那条 interleaved 内存里多读一个 float 当纹理坐标的第三分量，读到的是紧随其后的下一个顶点的 `Position.x`，纹理采样坐标全乱、贴图错位或撕裂。修：纹理坐标是 `vec2`，分量个数必须填 2，要和 `Vertex` 里字段的向量维度一致。",
    tags: ["glVertexAttribPointer", "陷阱", "综合"],
  },
  {
    id: "me-66",
    chapter: "mesh",
    level: 4,
    question:
      "为什么 `offsetof`（编译期常量）和 `sizeof(Vertex)`（编译期常量）这套写法，比手写偏移更经得起「改结构体」？举例说明。",
    answer:
      "因为这两个都由编译器按结构体当前布局算，结构体一改它们自动更新。例：往 `Vertex` 的 `TexCoords` 后加 `Tangent`——`sizeof(Vertex)` 从 32 变 44、`offsetof(Vertex, Tangent)` 算得 32，而前三个属性的 `offsetof` 仍是 0/12/24，一行都不用改。手写偏移则会全部错位、得逐个手改。",
    tags: ["offsetof", "sizeof", "综合"],
  },
  {
    id: "me-67",
    chapter: "mesh",
    level: 4,
    question:
      "一个网格只有漫反射图、没有镜面图，但着色器里同时声明了 `texture_diffuse1` 和 `texture_specular1`，会怎样？",
    answer:
      "`Draw` 循环只会拼出并设置 `texture_diffuse1`，`texture_specular1` 没被赋值、保持默认（多为 0），片段里采样它会取到 0 号单元的图或未定义值。通常表现为镜面贴图那部分用了错误纹理。要么着色器里别声明用不到的 sampler，要么保证有对应纹理喂进去。",
    tags: ["采样器命名约定", "边界", "综合"],
  },
  {
    id: "me-68",
    chapter: "mesh",
    level: 4,
    question:
      "为什么说本章的 `Mesh` 类是「为下一章 `Model` 打地基」？哪个字段专为下一章预留？",
    answer:
      "因为一个模型由多个网格组成，下一章 `Model` 要把上一章读出的一堆零件、每个包成一个 `Mesh` 再统一管起来。`Texture.path` 字段就是为下一章预留的——做「同一张贴图只加载一次」的去重缓存键，本章先摆上、暂不用。",
    tags: ["网格", "模型", "综合"],
  },
  {
    id: "me-69",
    chapter: "mesh",
    level: 4,
    question:
      "若把整辆车的所有顶点和纹理硬塞进一个 `Mesh`（不拆分），最直接的障碍是什么？",
    answer:
      "最直接的障碍是纹理：一次 `glDrawElements` 只能用当前绑定到各 sampler 的那一套纹理，但车身、轮胎、玻璃要用不同的图。塞进一个网格就没法在一次绘制里给不同部分配不同贴图。所以「一套顶点 + 一套纹理」才是自然的绘制单元，必须拆成多个网格。",
    tags: ["网格", "纹理单元", "综合"],
  },
  {
    id: "me-70",
    chapter: "mesh",
    level: 4,
    question:
      "`Draw` 末尾为什么要 `glActiveTexture(GL_TEXTURE0)` 重置回 0 号？不重置会有什么隐患？",
    answer:
      "因为循环里把激活单元推到了最后一张纹理的编号。重置回 0 号是良好的收尾习惯，让后续别的绘制从一个已知状态开始，避免「当前激活单元」残留在某个高编号上、影响后面代码里 `glBindTexture` 误绑到意料外的单元。这是状态机式 API 的卫生问题。",
    tags: ["Draw", "纹理单元", "综合"],
  },
];
