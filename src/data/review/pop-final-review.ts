import type { ReviewQuestion } from "./types";
export const popFinalReviewQuestions: ReviewQuestion[] = [
  { id: "pop-final-review-1", chapter: "pop-final-review", level: 1, question: "自动化运维最小闭环有哪些环节？", answer: "授权与预览、受限执行、逐项结果、判断与告警、审计证据、停止条件和可验证回滚。", tags: ["总复习", "闭环"] },
  { id: "pop-final-review-2", chapter: "pop-final-review", level: 2, question: "pexpect、Paramiko和声明式平台如何分工？", answer: "pexpect处理遗留交互终端，Paramiko直接提供SSH命令与文件协议，Ansible或Salt把期望状态和批量收敛组织成平台。", tags: ["总复习", "工具选择"] },
  { id: "pop-final-review-3", chapter: "pop-final-review", level: 3, question: "分布式质量监控怎样避免把未知当作成功？", answer: "区分成功、失败、超时和无数据，保存采集位置与双时间戳，报表标出unknown并允许下钻原始样本。", tags: ["总复习", "监控"] },
  { id: "pop-final-review-4", chapter: "pop-final-review", level: 4, question: "B/S和C/S平台共同的可信边界是什么？", answer: "服务端身份授权、资产清单、任务状态机、隔离执行器和不可变审计是共同边界；客户端不能直连数据库或持有管理员密钥。", tags: ["总复习", "平台"] },
];
