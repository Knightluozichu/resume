/** 复习题库 · 高级数据（advanced-data）。HEL-78 高级OpenGL篇。 */

import type { ReviewQuestion } from "./types";

export const advancedDataQuestions: ReviewQuestion[] = [
  // ── L1 认记（定义 / 术语 / API 签名 / 字节约定） ──
  {
    id: "ad-1",
    chapter: "advanced-data",
    level: 1,
    question: "什么是「缓冲对象」（buffer）？一句话说清它的本质。",
    answer:
      "显存里一块连续的、能任意摆放字节的存储区。它**不关心**你存的是位置、法线还是索引——对它而言只是一串字节。你通过「绑定到某个目标」（如 `GL_ARRAY_BUFFER`）来操作它。",
    tags: ["缓冲对象", "定义"],
  },
  {
    id: "ad-2",
    chapter: "advanced-data",
    level: 1,
    question: "VBO 和 EBO 在「缓冲」这个层面上有什么共同点和区别？",
    answer:
      "共同点：两者**本质都是缓冲对象**，都是显存里一块字节货架。区别只在于绑到了哪个**目标**——VBO 绑 `GL_ARRAY_BUFFER`（顶点数据）、EBO 绑 `GL_ELEMENT_ARRAY_BUFFER`（索引）。",
    tags: ["缓冲对象", "VBO", "EBO"],
  },
  {
    id: "ad-3",
    chapter: "advanced-data",
    level: 1,
    question: "`glBufferData(target, size, data, usage)` 做的是什么事？",
    answer:
      "一次性给缓冲**分配空间并灌满数据**：它会（重新）开辟 `size` 大小的存储、把整块 `data` 拷进去。相当于「整架货推倒重来」。",
    tags: ["glBufferData", "定义"],
  },
  {
    id: "ad-4",
    chapter: "advanced-data",
    level: 1,
    question:
      "调 `glBufferData` 时把 data 参数传 `NULL`（WebGL2 传容量数字）是什么效果？",
    answer:
      "只**开辟空间、不填内容**——先占好位置，内容晚点再用 `glBufferSubData` 分段填进去。常用于分批布局：先开好总空间，再分三段灌位置/法线/纹理坐标。",
    tags: ["glBufferData", "NULL"],
  },
  {
    id: "ad-5",
    chapter: "advanced-data",
    level: 1,
    question: "`glBufferSubData(target, offset, size, data)` 做的是什么事？",
    answer:
      "在**已存在**的缓冲上只更新一小段：从字节 `offset` 起、长 `size` 的那一段覆盖成新的 `data`，**其余字节原封不动**。相当于「只补中间那一格」。",
    tags: ["glBufferSubData", "定义"],
  },
  {
    id: "ad-6",
    chapter: "advanced-data",
    level: 1,
    question: "调 `glBufferSubData` 之前有什么前提？",
    answer:
      "前提是这块缓冲**已经用 `glBufferData` 开辟过空间**。`glBufferSubData` 只覆盖、不重新分配，所以必须先有 `glBufferData` 开好的空间，且覆盖范围别越界。",
    tags: ["glBufferSubData", "前提"],
  },
  {
    id: "ad-7",
    chapter: "advanced-data",
    level: 1,
    question: "什么是「内存映射」（`glMapBuffer` / `glMapBufferRange`）？",
    answer:
      "把缓冲映射成一段你能**直接用指针读写**的内存：返回一个指针，你像写普通数组一样 `memcpy` 进去、写完 `glUnmapBuffer` 解除映射，省掉一次中间拷贝。",
    tags: ["内存映射", "glMapBuffer"],
  },
  {
    id: "ad-8",
    chapter: "advanced-data",
    level: 1,
    question:
      "WebGL2 里有 `glMapBuffer` / `glMapBufferRange` 吗？没有的话用什么替代？",
    answer:
      "**WebGL2 没有这套内存映射 API**。浏览器里没有「拿指针直接写显存」这条路，改缓冲内容一律用 `gl.bufferSubData(target, offset, data)` 替代。",
    tags: ["WebGL2", "内存映射"],
  },
  {
    id: "ad-9",
    chapter: "advanced-data",
    level: 1,
    question: "`glCopyBufferSubData` 是干什么的？它的源是哪里？",
    answer:
      "在**两块缓冲之间**直接复制一段字节，**全程在显存里完成、不经过 CPU**。它的源是**另一块缓冲**（区别于 `glBufferSubData` 的源是 CPU 内存）。",
    tags: ["glCopyBufferSubData", "定义"],
  },
  {
    id: "ad-10",
    chapter: "advanced-data",
    level: 1,
    question:
      "`glCopyBufferSubData(readtarget, writetarget, readoffset, writeoffset, size)` 五个参数各是什么？",
    answer:
      "依次是：**读目标、写目标、读偏移、写偏移、复制字节数**——从读缓冲的 `readoffset` 处取 `size` 字节，写到写缓冲的 `writeoffset` 处。",
    tags: ["glCopyBufferSubData", "参数"],
  },
  {
    id: "ad-11",
    chapter: "advanced-data",
    level: 1,
    question: "`glCopyBufferSubData` 常把两块缓冲分别绑到哪两个专用目标？",
    answer:
      "把源缓冲绑到 `GL_COPY_READ_BUFFER`、目标缓冲绑到 `GL_COPY_WRITE_BUFFER` 这两个专用目标上，再调它复制。",
    tags: ["glCopyBufferSubData", "GL_COPY_READ_BUFFER"],
  },
  {
    id: "ad-12",
    chapter: "advanced-data",
    level: 1,
    question: "什么是「交错布局」（interleaved）？",
    answer:
      "把一个顶点的各属性（位置、法线、纹理坐标）**紧挨着连续存放**，下一个顶点紧跟其后、循环重复（`P N U | P N U | …`）。一个顶点的数据是连续的一小块，是最常用的摆法。",
    tags: ["交错布局", "定义"],
  },
  {
    id: "ad-13",
    chapter: "advanced-data",
    level: 1,
    question: "什么是「分批布局」（batched）？",
    answer:
      "把**所有顶点的同类属性堆在一起**——所有位置一整段、所有法线一整段、所有纹理坐标一整段（`P P P … | N N N … | U U U …`）。每个属性各占连续的一块。",
    tags: ["分批布局", "定义"],
  },
  {
    id: "ad-14",
    chapter: "advanced-data",
    level: 1,
    question:
      "`glVertexAttribPointer` 里的 stride 和 offset 分别指什么？单位是什么？",
    answer:
      "**stride（步长）** = 隔多远是下一个同属性；**offset（偏移）** = 这个属性从第几字节起。两者**单位都是字节**——凡是 `float` 一律 ×4。",
    tags: ["glVertexAttribPointer", "stride", "offset"],
  },

  // ── L2 理解（为什么 / 机制 / 对比） ──
  {
    id: "ad-15",
    chapter: "advanced-data",
    level: 2,
    question: "为什么说「缓冲不关心你存的是什么」这一点很关键？",
    answer:
      "因为本章所有操作（灌、补、搬）都只是「对这块字节货架做不同的搬运动作」。缓冲只把数据当一串字节，怎么解释这串字节（是位置还是法线）是 `glVertexAttribPointer` 的事——理解了这层，stride/offset 的填法才不会乱。",
    tags: ["缓冲对象", "机制"],
  },
  {
    id: "ad-16",
    chapter: "advanced-data",
    level: 2,
    question:
      "`glBufferData` 全量上传和 `glBufferSubData` 局部更新，核心区别在哪？",
    answer:
      "`glBufferData` **重新分配空间**、整块换新（推倒重来）；`glBufferSubData` **不重新分配**、只覆盖指定的一段、其余不动。数据只小改一段时，后者省掉大量上传开销。",
    tags: ["glBufferData", "glBufferSubData", "对比"],
  },
  {
    id: "ad-17",
    chapter: "advanced-data",
    level: 2,
    question:
      "为什么交错布局下三个属性「共用同一个 stride」，分批布局下却各自独立？",
    answer:
      "交错布局里一个顶点的属性挨着摆，要跨到下一个同属性得**跨过整整一个顶点**，所以 stride 都等于一个顶点的总字节数。分批布局里同属性在自己那一段紧挨着，跨一步只需**跨过一个自己**，所以 stride 等于自身大小。",
    tags: ["交错布局", "分批布局", "stride"],
  },
  {
    id: "ad-18",
    chapter: "advanced-data",
    level: 2,
    question: "交错布局为什么被称作「缓存友好」、是最常用的摆法？",
    answer:
      "因为一个顶点的各属性挨在一起、是连续的一小块，GPU 读一个顶点时它的位置/法线/纹理坐标就在相邻内存里，一次就能取齐，缓存命中高。所以它是默认、最常用的摆法。",
    tags: ["交错布局", "为什么"],
  },
  {
    id: "ad-19",
    chapter: "advanced-data",
    level: 2,
    question: "什么场景下分批布局反而更省事？",
    answer:
      "当数据本来就**分散在三个数组**里（一个 positions、一个 normals、一个 texCoords）时，先 `glBufferData(NULL)` 开好总空间，再用 `glBufferSubData` 分三段直接灌进去最省事，不必先在 CPU 上交错拼接。",
    tags: ["分批布局", "应用"],
  },
  {
    id: "ad-20",
    chapter: "advanced-data",
    level: 2,
    question:
      "交错布局和分批布局存的是同一批数据、画出来一样吗？区别落到代码上是什么？",
    answer:
      "是。两种布局存的是**同一批顶点**、也都喂给**同一个 VAO**、画出来一模一样。唯一的区别就是 `glVertexAttribPointer` 里 **stride 和 offset 填的数不同**。",
    tags: ["交错布局", "分批布局", "对比"],
  },
  {
    id: "ad-21",
    chapter: "advanced-data",
    level: 2,
    question:
      "为什么 `glVertexAttribPointer` 的 stride/offset 必须以字节计、凡 float 一律 ×4？",
    answer:
      "因为缓冲是一串字节，GPU 按字节去寻址每个属性。一个 `float` 占 4 字节，所以「3 个分量」对应的字节数是 `3×4=12`，而不是 3。填「分量个数」当字节数会让属性错位、满屏花屏。",
    tags: ["glVertexAttribPointer", "字节", "为什么"],
  },
  {
    id: "ad-22",
    chapter: "advanced-data",
    level: 2,
    question: "`glCopyBufferSubData` 和「读回 CPU 再传上去」相比好在哪？",
    answer:
      "`glCopyBufferSubData` **全程在显存里完成、不绕 CPU 一圈**，省掉「显存→CPU→显存」两次跨总线传输。把旧 VBO 的数据迁到新 VBO 这类纯搬运用它最快。",
    tags: ["glCopyBufferSubData", "为什么"],
  },
  {
    id: "ad-23",
    chapter: "advanced-data",
    level: 2,
    question:
      "`glCopyBufferSubData` 和 `glBufferSubData` 都「只动一段」，区别是什么？",
    answer:
      "区别在**源不同**：`glCopyBufferSubData` 的源是**另一块缓冲**（显存到显存）；`glBufferSubData` 的源是 **CPU 内存**（内存到显存）。两者都不重新分配空间、只覆盖指定段。",
    tags: ["glCopyBufferSubData", "glBufferSubData", "对比"],
  },
  {
    id: "ad-24",
    chapter: "advanced-data",
    level: 2,
    question: "为什么每帧用 `glBufferData` 全量重传不变的顶点是浪费？",
    answer:
      "因为哪怕只有几个顶点动、大部分一帧没变，全量 `glBufferData` 也把**整块**数据重新上传一遍，白白占用带宽、CPU 上传忙。不变的数据只该初始化时传一次。",
    tags: ["glBufferData", "性能"],
  },
  {
    id: "ad-25",
    chapter: "advanced-data",
    level: 2,
    question: "内存映射相比 `glBufferSubData` 在桌面端能省什么？",
    answer:
      "省掉一次**中间拷贝**：`glBufferSubData` 要先把数据放 CPU 内存、再拷进显存；内存映射直接把显存「摊开」成一段指针，你 `memcpy` 一步写进去。但这只在桌面 OpenGL 有，WebGL2 无此路。",
    tags: ["内存映射", "对比"],
  },
  {
    id: "ad-26",
    chapter: "advanced-data",
    level: 2,
    question: "「布局」这个词落到代码里，本质上只是什么的差别？",
    answer:
      "本质只是 `glVertexAttribPointer` 那两个数字（**stride 和 offset**）的差别。同一批数据、同一个 VAO，换布局就是换这两个参数的填法，数据本身和绘制结果都不变。",
    tags: ["布局", "glVertexAttribPointer"],
  },
  {
    id: "ad-27",
    chapter: "advanced-data",
    level: 2,
    question:
      "为什么 C++ 端推荐用 `offsetof` / `sizeof` 而不是手填裸数字算 offset/stride？",
    answer:
      "手算字节偏移容易错（漏乘 4、改了结构体忘改偏移）。用 `sizeof(Vertex)` 填 stride、`offsetof(Vertex, 字段)` 填 offset，让**编译器代算**，改结构体也不会算错，更稳。",
    tags: ["offsetof", "sizeof"],
  },
  {
    id: "ad-28",
    chapter: "advanced-data",
    level: 2,
    question: "分批布局下各属性的 offset 为什么要「乘上顶点总数 N」？",
    answer:
      "因为分批布局里法线段排在「所有位置之后」、纹理坐标段排在「所有位置和所有法线之后」。一个属性整段的字节数 = `N × 单顶点该属性字节数`，所以后面段的起点偏移要按顶点总数 N 累加。",
    tags: ["分批布局", "offset"],
  },

  // ── L3 应用（读代码 / 给参数算字节 / WebGL2 写法） ──
  {
    id: "ad-29",
    chapter: "advanced-data",
    level: 3,
    question:
      "顶点结构体 `位置 vec3 + 法线 vec3 + 纹理坐标 vec2`（float），交错布局下 stride 是多少字节？",
    answer:
      "stride = 一个顶点的总字节数 = `3×4 + 3×4 + 2×4 = 12 + 12 + 8 = 32` 字节。三个属性**共用**这个 stride 32（跨一步正好到下一个顶点的同属性）。",
    tags: ["交错布局", "stride", "计算"],
  },
  {
    id: "ad-30",
    chapter: "advanced-data",
    level: 3,
    question:
      "同上结构体（位置+法线+纹理坐标，交错布局），三个属性的 offset 各填多少字节？",
    answer:
      "位置 `0`、法线 `12`（3×4，跨过位置）、纹理坐标 `24`（12+12，跨过位置和法线）。offset = 该属性前面所有字段的字节数之和。",
    tags: ["交错布局", "offset", "计算"],
  },
  {
    id: "ad-31",
    chapter: "advanced-data",
    level: 3,
    question:
      "同一批顶点（位置+法线+纹理坐标）改成分批布局，三个属性的 stride 各填多少？",
    answer:
      "各属性 stride = 自身大小：位置 `12`（3×4）、法线 `12`（3×4）、纹理坐标 `8`（2×4）。不再共用一个 stride——因为同属性在自己那段里紧挨着，跨一步只跨过一个自己。",
    tags: ["分批布局", "stride", "计算"],
  },
  {
    id: "ad-32",
    chapter: "advanced-data",
    level: 3,
    question:
      "分批布局、N 个顶点（位置+法线+纹理坐标），法线段和纹理坐标段的 offset 怎么算？",
    answer:
      "位置段 offset `0`；法线段 offset = 所有位置的字节数 = `N×3×4`；纹理坐标段 offset = 所有位置 + 所有法线 = `N×3×4 + N×3×4`。各段起点按 N 累加。",
    tags: ["分批布局", "offset", "计算"],
  },
  {
    id: "ad-33",
    chapter: "advanced-data",
    level: 3,
    question:
      "桌面 `glBufferData(GL_ARRAY_BUFFER, sizeof(data), data, GL_STATIC_DRAW)` 在 WebGL2 里怎么写？",
    answer:
      "写成 `gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)`。WebGL2 直接传类型化数组 `data`、不用单独的 size 参数（大小由数组自身决定）。",
    tags: ["WebGL2", "glBufferData"],
  },
  {
    id: "ad-34",
    chapter: "advanced-data",
    level: 3,
    question:
      "桌面 `glBufferSubData(GL_ARRAY_BUFFER, 24, sizeof(sub), sub)` 在 WebGL2 里怎么写？",
    answer:
      "写成 `gl.bufferSubData(gl.ARRAY_BUFFER, 24, sub)`——只覆盖从字节 24 起的那一段，长度由 `sub` 自身决定，其余不动。",
    tags: ["WebGL2", "glBufferSubData"],
  },
  {
    id: "ad-35",
    chapter: "advanced-data",
    level: 3,
    question:
      "WebGL2 里交错布局填 `gl.vertexAttribPointer`（位置/法线/纹理坐标），三行怎么写？",
    answer:
      "`gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 32, 0)`（位置 @0）、`(1, 3, gl.FLOAT, false, 32, 12)`（法线 @12）、`(2, 2, gl.FLOAT, false, 32, 24)`（纹理坐标 @24）。stride 全填 32，offset 是 0/12/24。",
    tags: ["WebGL2", "vertexAttribPointer", "交错布局"],
  },
  {
    id: "ad-36",
    chapter: "advanced-data",
    level: 3,
    question:
      "想在桌面端把 `vbo1` 的全部数据原样复制到 `vbo2`，三行 `glCopyBufferSubData` 怎么写？",
    answer:
      "`glBindBuffer(GL_COPY_READ_BUFFER, vbo1)`；`glBindBuffer(GL_COPY_WRITE_BUFFER, vbo2)`；`glCopyBufferSubData(GL_COPY_READ_BUFFER, GL_COPY_WRITE_BUFFER, 0, 0, sizeof(vertexData))`（读偏移0、写偏移0、整块大小）。",
    tags: ["glCopyBufferSubData", "代码"],
  },
  {
    id: "ad-37",
    chapter: "advanced-data",
    level: 3,
    question: "WebGL2 里 `gl.copyBufferSubData` 怎么写？参数顺序是什么？",
    answer:
      "`gl.bindBuffer(gl.COPY_READ_BUFFER, vbo1)`、`gl.bindBuffer(gl.COPY_WRITE_BUFFER, vbo2)`，再 `gl.copyBufferSubData(gl.COPY_READ_BUFFER, gl.COPY_WRITE_BUFFER, readOffset, writeOffset, sizeBytes)`——读目标、写目标、读偏移、写偏移、字节数。",
    tags: ["WebGL2", "copyBufferSubData"],
  },
  {
    id: "ad-38",
    chapter: "advanced-data",
    level: 3,
    question:
      "有人写 `gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 8, 0)` 给交错布局的位置属性，对吗？",
    answer:
      "错。stride 填了 `8`，那是「每顶点 8 个 float」的**个数**，真正的字节步长应是 `8×4 = 32`。stride 单位是**字节**，凡 float 一律 ×4。",
    tags: ["glVertexAttribPointer", "排错"],
  },
  {
    id: "ad-39",
    chapter: "advanced-data",
    level: 3,
    question:
      "分批布局先 `glBufferData(NULL)` 开好空间，再用 `glBufferSubData` 灌三个数组，三段 offset 怎么填（C++）？",
    answer:
      "`glBufferSubData(target, 0, sizeof(positions), positions)`；`glBufferSubData(target, sizeof(positions), sizeof(normals), normals)`；`glBufferSubData(target, sizeof(positions)+sizeof(normals), sizeof(tex), tex)`——每段 offset 是前面所有段的总字节数。",
    tags: ["分批布局", "glBufferSubData", "代码"],
  },
  {
    id: "ad-40",
    chapter: "advanced-data",
    level: 3,
    question:
      "顶点结构体 `位置 vec3 + 颜色 vec4`（float），交错布局下 stride 和两个 offset 各多少？",
    answer:
      "位置 3×4=12、颜色 4×4=16，stride = `12+16 = 28` 字节。offset：位置 `0`、颜色 `12`。两属性共用 stride 28。",
    tags: ["交错布局", "计算"],
  },
  {
    id: "ad-41",
    chapter: "advanced-data",
    level: 3,
    question:
      "WebGL2 里想只分配空间不填内容（对应桌面 `glBufferData(...NULL...)`），怎么写？",
    answer:
      "把第二参传**容量字节数**：`gl.bufferData(gl.ARRAY_BUFFER, data.byteLength, gl.STATIC_DRAW)`——只开辟 `data.byteLength` 字节空间、不填，之后再用 `subData` 分段填。",
    tags: ["WebGL2", "glBufferData", "NULL"],
  },

  // ── L4 综合 · 陷阱（多概念串联 / 常见坑 / 边界） ──
  {
    id: "ad-42",
    chapter: "advanced-data",
    level: 4,
    question:
      "模型扭曲、错位、满屏花，法线乱、贴图被撕——最可能是 `glVertexAttribPointer` 哪里错了？怎么修？",
    answer:
      "几乎都是 stride / offset **字节数算错**：最常见是忘了乘 `sizeof(float)=4`（把偏移填成 `3` 而非 `12`），或交错布局漏填 stride（填 `0` 让它当紧密排列）。修法：每个 float 4 字节，交错 stride 一律 `8×4=32`、offset `0/12/24`；C++ 端用 `sizeof`/`offsetof` 让编译器算，别填裸数字。",
    tags: ["glVertexAttribPointer", "陷阱", "花屏"],
  },
  {
    id: "ad-43",
    chapter: "advanced-data",
    level: 4,
    question:
      "照搬桌面教程写 `gl.mapBuffer(...)` 改缓冲，浏览器报错说没这个方法。原因和修法？",
    answer:
      "原因：`glMapBuffer` / `glMapBufferRange` 这套**内存映射 API WebGL2 根本不存在**，浏览器里没有「拿指针直接写显存」这条路。修法：改缓冲内容用 `gl.bufferSubData(target, offset, data)` 替代；要在缓冲间搬数据用 `gl.copyBufferSubData`。",
    tags: ["WebGL2", "内存映射", "陷阱"],
  },
  {
    id: "ad-44",
    chapter: "advanced-data",
    level: 4,
    question: "场景大部分顶点一帧都没变、帧率却很低、CPU 上传忙，怎么排？",
    answer:
      "原因多半是每帧都 `glBufferData` 把**整块**顶点重新上传——哪怕只有几个顶点动，也整架推倒重来，白白浪费带宽。修法：不变的数据**只在初始化时传一次**；真有一小段要改，用 `glBufferSubData(offset, size, data)` 只补那一段。",
    tags: ["glBufferData", "性能", "陷阱"],
  },
  {
    id: "ad-45",
    chapter: "advanced-data",
    level: 4,
    question:
      "「换布局要重写一遍顶点上传逻辑」——这说法对吗？同一批数据换布局到底要改什么？",
    answer:
      "基本不对。换布局改的是**数据怎么摆**和 `glVertexAttribPointer` 的 **stride/offset 填法**，不必改绘制调用、也不改 VAO 个数。交错与分批是同一批数据、同一个 VAO、画出来一样——核心改动就那两个参数（外加 SubData 灌数据的分段方式）。",
    tags: ["布局", "综合"],
  },
  {
    id: "ad-46",
    chapter: "advanced-data",
    level: 4,
    question: "交错布局漏填 stride（填了 0）会怎样？为什么 0 在这里很危险？",
    answer:
      "填 0 时 OpenGL 把它当作「紧密排列」——即认为该属性数据一个挨一个、stride 等于该属性本身大小。但交错布局里属性之间夹着别的属性，于是 GPU 读偏了、取到隔壁属性的字节，模型错乱花屏。交错布局必须显式填整顶点字节数（如 32），不能图省事留 0。",
    tags: ["glVertexAttribPointer", "stride", "陷阱", "边界"],
  },
  {
    id: "ad-47",
    chapter: "advanced-data",
    level: 4,
    question:
      "把一批顶点的属性指针写成 stride=8、offset=0/3/6（位置/法线/纹理坐标），模型严重扭曲。指出错误并修正。",
    answer:
      "两处都源于忘乘 4、把「分量个数」当字节数：① stride 填 `8` 是 8 个 float 的个数，应是 `8×4=32`；② offset 填 `3/6` 是 float 个数，应是 `3×4=12` 和 `6×4=24`。修正：stride 全填 32，offset 填 `0/12/24`。一句话：stride 和 offset 都以字节计，凡 float 一律 ×4。",
    tags: ["glVertexAttribPointer", "排错", "综合"],
  },
  {
    id: "ad-48",
    chapter: "advanced-data",
    level: 4,
    question:
      "结构体 `位置 vec3 + 法线 vec3 + 纹理坐标 vec2 + 切线 vec3`（float），交错布局下四个属性的 stride 和 offset？",
    answer:
      "字节：位置 12、法线 12、纹理坐标 8、切线 12，整体 `sizeof = 44`。stride **四个都填 44**；offset 依次累加：位置 `0`、法线 `12`、纹理坐标 `24`、切线 `32`。stride 是整个顶点的总字节数（与属性个数无关），offset 是该属性前面所有字段的字节数之和。",
    tags: ["交错布局", "计算", "综合"],
  },
  {
    id: "ad-49",
    chapter: "advanced-data",
    level: 4,
    question:
      "为什么交错布局通常更快，但当数据来自三个独立 CPU 数组时分批布局上传更省事？两者怎么权衡？",
    answer:
      "交错布局 GPU 读顶点缓存友好（各属性挨着、一次取齐），渲染更快，是默认首选。但若数据本就分散在 positions/normals/tex 三数组里，交错需先在 CPU 上逐顶点拼接；分批可 `glBufferData(NULL)` 后直接 `glBufferSubData` 三段灌入，省去拼接。权衡：渲染热路径优先交错（读得快）；上传方便或某类属性需单独更新时用分批。",
    tags: ["交错布局", "分批布局", "权衡", "综合"],
  },
  {
    id: "ad-50",
    chapter: "advanced-data",
    level: 4,
    question:
      "`glBufferData`、`glBufferSubData`、`glCopyBufferSubData` 三者在「分不分配空间、源在哪」上各是什么？连起来记。",
    answer:
      "`glBufferData`：**重新分配**空间 + 源是 CPU 内存（整块换新）；`glBufferSubData`：**不分配**、覆盖一段 + 源是 CPU 内存（内存→显存）；`glCopyBufferSubData`：**不分配**、覆盖一段 + 源是另一块缓冲（显存→显存，不经 CPU）。三者 WebGL2 都有等价；唯独内存映射 `glMapBuffer` WebGL2 没有。",
    tags: ["glBufferData", "glBufferSubData", "glCopyBufferSubData", "综合"],
  },
  {
    id: "ad-51",
    chapter: "advanced-data",
    level: 4,
    question:
      "分批布局里若把法线段 offset 误算成 `3×4`（只跨过一个位置而非所有位置），会出什么？",
    answer:
      "法线属性会从「第一个顶点的位置之后第 12 字节」开始读，而那里其实还是位置段的数据（位置段长 `N×12`，远大于 12）。于是法线读到的全是位置数据、彻底错乱，光照全黑或乱跳。修法：分批布局各段 offset 必须按**顶点总数 N** 累加（法线段 offset = `N×3×4`），不是单顶点的 12。",
    tags: ["分批布局", "offset", "陷阱", "边界"],
  },
];
