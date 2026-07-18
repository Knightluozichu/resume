import type { ReviewQuestion } from "./types";
export const pyaLearningMapQuestions: ReviewQuestion[] = [
 {id:"pya-learning-map-1",chapter:"pya-learning-map",level:1,question:"原书14章分成哪四段？",answer:"语言与API、包与应用、项目生命周期、性能与设计；顺序从写对局部代码推进到可发布、可测量系统。",tags:["导览","结构"]},
 {id:"pya-learning-map-2",chapter:"pya-learning-map",level:2,question:"为什么不能直接复制原书工具命令？",answer:"原书基于Python 2.5时代；应保留隔离、声明、持续反馈和可回滚发布等不变量，按当前维护文档更新实现。",tags:["导览","迁移"]},
 {id:"pya-learning-map-3",chapter:"pya-learning-map",level:3,question:"如何完成跨章实验？",answer:"建立模块化小应用，打包安装，在CI中运行测试和文档，再用剖析证据选择一种优化并比较前后基线。",tags:["导览","实验"]},
 {id:"pya-learning-map-4",chapter:"pya-learning-map",level:4,question:"高级Python的核心是什么？",answer:"用Python化接口表达责任，并以包、版本、测试、文档、生命周期和性能证据让软件可维护。",tags:["导览","综合"]},
];
