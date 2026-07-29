"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "fragment-navigation",
  title: "Fragment Navigation",
  task: "用 Fragment arguments、返回栈和数据库 ID 导航 CriminalIntent",
  owner: "FragmentManager、导航容器与 CrimeRepository",
  state: "目的地、参数、返回栈、选中 Crime ID 和更新结果",
  event: "列表点击、详情编辑、返回、旋转与进程重建",
  invariant: "目的地只接收稳定 ID，并从事实源恢复详情而非携带整份可变对象",
  fault: "状态保存后继续提交事务，旋转时抛出 state loss 或显示重复 Fragment",
  evidence: "事务、back stack、argument、实例 ID 和数据库更新断言",
  concepts: [
    "12. Fragment Navigation",
    "Single Activity: Fragment Boss",
    "Fragment Arguments",
    "Using LiveData Transformations",
    "Updating the Database",
    "For the More Curious: Why Use Fragment Arguments?",
    "For the More Curious: Navigation Architecture Component Library",
    "Challenge: Efficient RecyclerView Reloading",
  ],
  transitions: [
    {
      action: "冻结入口：12. Fragment Navigation",
      state:
        "记录FragmentManager、导航容器与 CrimeRepository的初始目的地、参数、返回栈、选中 Crime ID 和更新结果",
      evidence:
        "事务、back stack、argument、实例 ID 和数据库更新断言中的“12. Fragment Navigation”轨迹",
    },
    {
      action: "触发事件：Fragment Arguments",
      state:
        "以“列表点击、详情编辑、返回、旋转与进程重建”改变目的地、参数、返回栈、选中 Crime ID 和更新结果",
      evidence:
        "事务、back stack、argument、实例 ID 和数据库更新断言中的“Fragment Arguments”轨迹",
    },
    {
      action: "提交状态：Using LiveData Transformations",
      state: "只由FragmentManager、导航容器与 CrimeRepository提交新状态",
      evidence:
        "事务、back stack、argument、实例 ID 和数据库更新断言中的“Using LiveData Transformations”轨迹",
    },
    {
      action: "重建边界：For the More Curious: Why Use Fragment Arguments?",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "事务、back stack、argument、实例 ID 和数据库更新断言中的“For the More Curious: Why Use Fragment Arguments?”轨迹",
    },
    {
      action: "核对交付：Challenge: Efficient RecyclerView Reloading",
      state:
        "以“目的地只接收稳定 ID，并从事实源恢复详情而非携带整份可变对象”判断通过",
      evidence: "事务、back stack、argument、实例 ID 和数据库更新断言",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“列表点击、详情编辑、返回、旋转与进程重建”",
      expected:
        "由FragmentManager、导航容器与 CrimeRepository提交目的地、参数、返回栈、选中 Crime ID 和更新结果，并持续满足“目的地只接收稳定 ID，并从事实源恢复详情而非携带整份可变对象”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“状态保存后继续提交事务，旋转时抛出 state loss 或显示重复 Fragment”",
      expected:
        "找到首个状态分岔，撤销后以事务、back stack、argument、实例 ID 和数据库更新断言证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function FragmentNavigationContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function FragmentNavigationLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function FragmentNavigationFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
