"use client";
import { OfficialMysqlEssentialsLab } from "./official-mysql-essentials-lab";

const props = {
  unitTitle: "第16章 MySQL安全机制",
  part: "第3篇 MySQL数据库管理篇",
  focus: "按身份、来源、对象和动作建立最小权限并验证拒绝路径",
  invariant: "每个账户只拥有完成职责所需的最小权限，匿名、共享和过期凭据不可用",
  artifact: "账户清单、授权矩阵、拒绝测试和凭据轮换记录",
  nodes: [
    "16.1 MySQL权限系统",
    "16.2 用户名与主机的联合身份",
    "16.3 创建与修改账户",
    "16.4 口令和认证插件",
    "16.5 GRANT授权",
    "16.6 REVOKE回收",
    "16.7 查看有效权限",
    "16.8 数据库、表、列和例程权限",
    "16.9 角色与最小权限思想",
    "16.10 账户锁定和删除",
    "16.11 SQL注入与参数化查询",
    "16.12 安全验收清单",
  ],
};

export function MseCh16SecurityModelLab() {
  return <OfficialMysqlEssentialsLab mode="model" {...props} />;
}
export function MseCh16SecurityExperimentLab() {
  return <OfficialMysqlEssentialsLab mode="experiment" {...props} />;
}
export function MseCh16SecurityEvidenceLab() {
  return <OfficialMysqlEssentialsLab mode="evidence" {...props} />;
}
