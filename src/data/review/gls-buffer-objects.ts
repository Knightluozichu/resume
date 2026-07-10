import type { ReviewQuestion } from "./types";

export const glsBufferObjectsQuestions: ReviewQuestion[] = [
  {
    id: "gls-buffer-objects-1",
    chapter: "gls-buffer-objects",
    level: 1,
    question: `VBO的使用模式有哪些？`,
    answer: `STATIC_DRAW(一次上传反复用)、DYNAMIC_DRAW(频繁修改)、STREAM_DRAW(每次都改)。选择正确模式让驱动优化内存布局。静态用STATIC，粒子用DYNAMIC/STREAM。`,
    tags: ["VBO", "使用模式"],
  },
  {
    id: "gls-buffer-objects-2",
    chapter: "gls-buffer-objects",
    level: 2,
    question: `PBO(像素缓冲对象)的作用？`,
    answer: `异步传输像素数据。glBufferData上传到PBO后立即返回，GPU异步复制到纹理。glReadPixels到PBO也是异步。避免CPU等待GPU，实现纹理流式加载和屏幕捕获。`,
    tags: ["PBO"],
  },
  {
    id: "gls-buffer-objects-3",
    chapter: "gls-buffer-objects",
    level: 3,
    question: `持久映射(Persistent Mapping)是什么？`,
    answer: `OpenGL 4.4的glBufferStorage+GL_MAP_PERSISTENT_BIT|GL_MAP_WRITE_BIT。CPU指针持续有效，零拷贝更新数据。配合fence同步。适合频繁更新的粒子/动态网格数据。`,
    tags: ["持久映射", "零拷贝"],
  },
  {
    id: "gls-buffer-objects-4",
    chapter: "gls-buffer-objects",
    level: 4,
    question: `如何选择缓冲对象类型？`,
    answer: `静态几何→VBO STATIC_DRAW；共享uniform→UBO；GPU读写大数据→SSBO；异步像素传输→PBO；频繁更新→持久映射。根据数据大小、访问模式、更新频率选择。`,
    tags: ["缓冲选择"],
  },
];
