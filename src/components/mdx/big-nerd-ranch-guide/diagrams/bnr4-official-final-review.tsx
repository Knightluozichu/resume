import { OfficialBnr4BookLab } from "./official-bnr4-book-lab";

const nodes = [
  "1. Your First Android Application",
  "2. Android and Model-View-Controller",
  "3. The Activity Lifecycle",
  "4. Persisting UI State",
  "5. Debugging Android Apps",
  "6. Your Second Activity",
  "7. Android SDK Versions and Compatibility",
  "8. UI Fragments and the Fragment Manager",
  "9. Displaying Lists with RecyclerView",
  "10. Creating User Interfaces with Layouts and Widgets",
  "11. Databases and the Room Library",
  "12. Fragment Navigation",
  "13. Dialogs",
  "14. The App Bar",
  "15. Implicit Intents",
  "16. Taking Pictures with Intents",
  "17. Localization",
  "18. Accessibility",
  "19. Data Binding and MVVM",
  "20. Unit Testing and Audio Playback",
  "21. Styles and Themes",
  "22. XML Drawables",
  "23. More About Intents and Tasks",
  "24. HTTP and Background Tasks",
  "25. Loopers, Handlers, and HandlerThread",
  "26. SearchView and SharedPreferences",
  "27. WorkManager",
  "28. Broadcast Intents",
  "29. Browsing the Web and WebView",
  "30. Custom Views and Touch Events",
  "31. Property Animation",
  "32. Afterword"
];

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="《Android Programming: The Big Nerd Ranch Guide（第4版）》全书总复习" focus="从一个用户症状反向定位组件、生命周期、线程、状态、持久化、外部合同与版本边界" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="《Android Programming: The Big Nerd Ranch Guide（第4版）》全书总复习" focus="从一个用户症状反向定位组件、生命周期、线程、状态、持久化、外部合同与版本边界" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="《Android Programming: The Big Nerd Ranch Guide（第4版）》全书总复习" focus="随机目录节点答辩、故障时间线、可重放构建、测试报告、迁移与回滚记录" nodes={nodes} />; }
