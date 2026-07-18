"use client";
import { OfficialMysqlEssentialsLab } from "./official-mysql-essentials-lab";

const props = {
  unitTitle: "第19章 Java+MySQL案例：在线书城",
  part: "第4篇 MySQL数据库实战案例篇",
  focus: "贯通需求、数据模型、JDBC事务、订单不变量、安全和上线验收",
  invariant:
    "库存不超卖、订单金额可重算、重复请求不重复扣库存，连接与事务总能关闭",
  artifact: "在线书城模式、DAO接口、订单事务、并发测试和部署清单",
  nodes: [
    "19.1 在线书城需求分析",
    "19.2 用户、图书、分类和订单模型",
    "19.3 建库建表与初始化数据",
    "19.4 Java工程和JDBC驱动",
    "19.5 连接配置与连接池",
    "19.6 DAO与参数化查询",
    "19.7 用户注册和登录",
    "19.8 图书检索与分页",
    "19.9 购物车状态",
    "19.10 下单事务与库存锁定",
    "19.11 订单查询和状态流转",
    "19.12 异常回滚与幂等请求",
    "19.13 权限、口令与SQL注入防护",
    "19.14 并发和故障测试",
    "19.15 部署、监控与验收",
  ],
};

export function MseCh19JavaBookstoreModelLab() {
  return <OfficialMysqlEssentialsLab mode="model" {...props} />;
}
export function MseCh19JavaBookstoreExperimentLab() {
  return <OfficialMysqlEssentialsLab mode="experiment" {...props} />;
}
export function MseCh19JavaBookstoreEvidenceLab() {
  return <OfficialMysqlEssentialsLab mode="evidence" {...props} />;
}
