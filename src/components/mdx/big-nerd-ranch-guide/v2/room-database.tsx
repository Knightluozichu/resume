"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "room-database",
  title: "数据库与Room库",
  task: "用 Entity、DAO、RoomDatabase 与 Repository 建立 CriminalIntent 单一事实源",
  owner: "Room 数据库和 Repository",
  state: "schema、Crime 实体、查询流、事务和迁移版本",
  event: "插入、更新、查询、进程重启和 schema 升级",
  invariant: "持久事实由数据库拥有，界面观察结果不绕过 DAO 直接改写",
  fault: "升级 schema 后启用 destructive migration，用户案件无提示丢失",
  evidence: "schema 导出、DAO 测试、迁移样本、事务日志和查询断言",
  concepts: [
    "11. Databases and the Room Library",
    "Room Architecture Component Library",
    "Creating a Database",
    "Defining a Data Access Object",
    "Accessing the Database Using the Repository Pattern",
    "Testing Queries",
    "Application Threads",
    "Using LiveData",
    "Challenge: Addressing the Schema Warning",
    "For the More Curious: Singletons",
  ],
  transitions: [
    {
      action: "冻结入口：11. Databases and the Room Library",
      state:
        "记录Room 数据库和 Repository的初始schema、Crime 实体、查询流、事务和迁移版本",
      evidence:
        "schema 导出、DAO 测试、迁移样本、事务日志和查询断言中的“11. Databases and the Room Library”轨迹",
    },
    {
      action: "触发事件：Creating a Database",
      state:
        "以“插入、更新、查询、进程重启和 schema 升级”改变schema、Crime 实体、查询流、事务和迁移版本",
      evidence:
        "schema 导出、DAO 测试、迁移样本、事务日志和查询断言中的“Creating a Database”轨迹",
    },
    {
      action: "提交状态：Accessing the Database Using the Repository Pattern",
      state: "只由Room 数据库和 Repository提交新状态",
      evidence:
        "schema 导出、DAO 测试、迁移样本、事务日志和查询断言中的“Accessing the Database Using the Repository Pattern”轨迹",
    },
    {
      action: "重建边界：Using LiveData",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "schema 导出、DAO 测试、迁移样本、事务日志和查询断言中的“Using LiveData”轨迹",
    },
    {
      action: "核对交付：For the More Curious: Singletons",
      state:
        "以“持久事实由数据库拥有，界面观察结果不绕过 DAO 直接改写”判断通过",
      evidence: "schema 导出、DAO 测试、迁移样本、事务日志和查询断言",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“插入、更新、查询、进程重启和 schema 升级”",
      expected:
        "由Room 数据库和 Repository提交schema、Crime 实体、查询流、事务和迁移版本，并持续满足“持久事实由数据库拥有，界面观察结果不绕过 DAO 直接改写”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“升级 schema 后启用 destructive migration，用户案件无提示丢失”",
      expected:
        "找到首个状态分岔，撤销后以schema 导出、DAO 测试、迁移样本、事务日志和查询断言证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function RoomDatabaseContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function RoomDatabaseLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function RoomDatabaseFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
