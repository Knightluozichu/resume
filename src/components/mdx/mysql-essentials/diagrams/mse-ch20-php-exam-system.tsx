"use client";
import { OfficialMysqlEssentialsLab } from "./official-mysql-essentials-lab";

const props = {
  unitTitle: "第20章 PHP+MySQL案例：智能考试系统",
  part: "第4篇 MySQL数据库实战案例篇",
  focus: "贯通题库、组卷、考试快照、提交评分、权限和报表的完整数据生命周期",
  invariant:
    "试卷发布后题目快照稳定，每次作答只归属一个考生和考试，重复提交不重复计分",
  artifact: "考试系统模式、PDO访问层、组卷算法、评分事务和安全测试",
  nodes: [
    "20.1 智能考试系统需求分析",
    "20.2 用户、角色、题库和考试模型",
    "20.3 建库建表与测试数据",
    "20.4 PHP环境和PDO连接",
    "20.5 登录、会话与权限",
    "20.6 题库增删改查",
    "20.7 题目选项和答案建模",
    "20.8 组卷规则与随机抽题",
    "20.9 发布试卷与内容快照",
    "20.10 考试开始和限时控制",
    "20.11 作答暂存和最终提交",
    "20.12 自动评分与人工评分边界",
    "20.13 成绩查询和统计报表",
    "20.14 重复提交、越权与注入防护",
    "20.15 并发、恢复和上线验收",
  ],
};

export function MseCh20PhpExamSystemModelLab() {
  return <OfficialMysqlEssentialsLab mode="model" {...props} />;
}
export function MseCh20PhpExamSystemExperimentLab() {
  return <OfficialMysqlEssentialsLab mode="experiment" {...props} />;
}
export function MseCh20PhpExamSystemEvidenceLab() {
  return <OfficialMysqlEssentialsLab mode="evidence" {...props} />;
}
