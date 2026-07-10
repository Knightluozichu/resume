import type { ReviewQuestion } from "./types";

/** SOS 转储 复习题 */
export const dnmSosDumpQuestions: ReviewQuestion[] = [
  {
    id: "dnm-sos-dump-1",
    chapter: "dnm-sos-dump",
    level: 1,
    question: `SOS 调试扩展是什么？解决什么问题？`,
    answer: `SOS 是 .NET 调试扩展 DLL，加载到 WinDbg/dotnet-dump 中检查 CLR 内部结构（托管堆、GC、对象）。解决生产环境内存问题的离线诊断需求——生成 dump 快照后离线分析不影响运行进程。`,
    tags: ["SOS","调试","WinDbg","dump"],
  },
  {
    id: "dnm-sos-dump-2",
    chapter: "dnm-sos-dump",
    level: 2,
    question: `生产环境如何安全生成 dump 文件？`,
    answer: `用 dotnet-dump collect -p <PID> 生成完整 dump。dotnet-dump analyze <dump> 进入分析自动加载 SOS。生成 dump 会短暂暂停进程几秒，应在非高峰执行。dump 大小约等于进程工作集，需确保磁盘空间。`,
    tags: ["dotnet-dump","生产环境","dump"],
  },
  {
    id: "dnm-sos-dump-3",
    chapter: "dnm-sos-dump",
    level: 3,
    question: `!dumpheap -stat 输出包含哪些信息？如何定位问题？`,
    answer: `按 MethodTable 分组：MT、Count（对象数）、TotalSize（总字节）、Class Name。定位：1.按 TotalSize 排序找最大类型。2.看 Count 是否异常多。3.!dumpheap -mt <MT> 列出对象。4.!gcroot 追溯根引用找泄漏源。`,
    tags: ["dumpheap","stat","内存热点","定位"],
  },
  {
    id: "dnm-sos-dump-4",
    chapter: "dnm-sos-dump",
    level: 4,
    question: `如何用 SOS 追溯一个疑似泄漏对象的根引用链？`,
    answer: `1.!dumpheap -stat 找异常类型记 MT。2.!dumpheap -mt <MT> 列出对象记地址。3.!gcroot <地址> 输出根引用链，根类型含 Strong Handle/Pinned/Static/freachable。4.分析根类型：Static 说明静态字段持有，Strong Handle 说明 GCHandle 未释放。对应解除引用。`,
    tags: ["gcroot","根引用","泄漏","SOS"],
  }
];
