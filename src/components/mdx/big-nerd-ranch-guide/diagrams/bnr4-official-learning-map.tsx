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

export function BnrLifecycleLab() { return <OfficialBnr4BookLab mode="lifecycle" unitTitle="《Android Programming: The Big Nerd Ranch Guide（第4版）》权威学习地图" focus="从GeoQuiz、CriminalIntent、BeatBox、PhotoGallery、NerdLauncher和DragAndDraw六条项目线串联32章" nodes={nodes} />; }
export function BnrFailureLab() { return <OfficialBnr4BookLab mode="failure" unitTitle="《Android Programming: The Big Nerd Ranch Guide（第4版）》权威学习地图" focus="从GeoQuiz、CriminalIntent、BeatBox、PhotoGallery、NerdLauncher和DragAndDraw六条项目线串联32章" nodes={nodes} />; }
export function BnrEvidenceLab() { return <OfficialBnr4BookLab mode="evidence" unitTitle="《Android Programming: The Big Nerd Ranch Guide（第4版）》权威学习地图" focus="32章覆盖矩阵、六项目状态图、版本迁移账本、全书验收清单" nodes={nodes} />; }
