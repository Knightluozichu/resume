import type { ReviewQuestion } from "./types";

export const flaNetworkQuestions: ReviewQuestion[] = [
  {
    id: "fla-nw-1",
    chapter: "fla-network",
    level: 2,
    question: "为什么Android中网络请求必须在子线程执行？有哪些异步处理方案？",
    answer:
      "网络请求必须在子线程的原因：Android系统禁止在主线程（UI线程）执行网络操作，否则抛出NetworkOnMainThreadException（Android 3.0/Honeycomb引入此限制）。原因：网络请求是耗时IO操作（可能几秒甚至超时），在主线程执行会阻塞UI渲染导致界面卡顿，超过5秒未响应触发ANR（Application Not Responding）。异步处理方案（从传统到现代）：①Thread+Handler——子线程执行网络请求，通过Handler.sendMessage()/handleMessage()或runOnUiThread()切回主线程更新UI。最底层方案，代码量大，需手动管理线程。②AsyncTask（已废弃）——Android 11标记废弃。doInBackground(子线程)执行网络请求，onPostExecute(主线程)更新UI。简化了线程切换但坑多（内存泄漏/屏幕旋转崩溃/默认串行执行）。③OkHttp enqueue——OkHttpClient.newCall(request).enqueue(Callback)，Callback的onResponse/onFailure在子线程回调，需手动切主线程更新UI。底层封装好连接池/超时/重试，推荐。④Retrofit+Coroutine——Retrofit接口方法声明suspend函数，在ViewModelScope协程中直接调用，协程自动切换线程。最现代方案，代码最简洁。⑤Retrofit+Callback——Retrofit接口方法返回Call，enqueue异步回调。最佳实践：现代项目用Retrofit+OkHttp+Coroutines/Flow，在ViewModel协程作用域中调用suspend API，返回LiveData/Flow给UI层观察。网络请求与UI完全解耦，生命周期安全。",
    tags: ["网络请求", "子线程", "异步", "OkHttp", "Retrofit", "协程"],
  },
  {
    id: "fla-nw-2",
    chapter: "fla-network",
    level: 3,
    question: "OkHttp和Retrofit各自的核心特性是什么？为什么要组合使用？",
    answer:
      "OkHttp核心特性：①连接池——默认维护5个空闲连接的连接池，复用TCP连接避免重复握手（Keep-Alive），减少延迟。②拦截器机制——Interceptor链式处理请求和响应（addInterceptor应用拦截器/addNetworkInterceptor网络拦截器），可统一添加Header/日志/缓存/重试/Gzip压缩。③超时配置——connectTimeout/connectTimeout/readTimeout/writeTimeout分别配置连接/读取/写入超时。④自动重试——连接失败自动重试（可配置）。⑤缓存——基于HTTP缓存头（Cache-Control/ETag）的磁盘缓存，离线可用。⑥HTTP/2支持——多路复用，一个连接并发多个请求。⑦Gzip透明压缩——自动解压服务器返回的gzip数据。Retrofit核心特性：①接口化API——用注解在接口中声明API方法（@GET/@POST/@PUT/@DELETE/@Path/@Query/@Body/@Field），无需手写URL拼接和参数处理。②类型安全——方法返回值直接定义为数据类型（如Call<User>或suspend函数返回User），自动通过Converter解析。③Converter转换——通过addConverterFactory(GsonConverterFactory.create())自动JSON↔对象转换，支持Gson/Moshi/Protobuf等。④适配器——addCallAdapterFactory支持Coroutine/Flow/RxJava等异步模式。⑤与OkHttp无缝集成——Retrofit底层默认使用OkHttp发请求，共享OkHttp的连接池/拦截器/缓存。组合使用原因：OkHttp提供高性能HTTP底层（连接池/拦截器/缓存），Retrofit在其之上提供接口化的高层抽象（声明式API/类型安全/自动解析）。Retrofit解决「怎么方便地定义和调用API」，OkHttp解决「怎么高效地发送HTTP请求」。典型配置：Retrofit.Builder().baseUrl(BASE_URL).addConverterFactory(GsonConverterFactory.create()).client(okHttpClient).build()。",
    tags: ["OkHttp", "Retrofit", "拦截器", "连接池", "类型安全"],
  },
  {
    id: "fla-nw-3",
    chapter: "fla-network",
    level: 2,
    question: "Android中如何解析JSON数据？Gson和JSONObject各有什么优缺点？",
    answer:
      "JSON解析方案：①JSONObject（手动解析）——Android内置，无需依赖。用法：JSONObject json = new JSONObject(responseString)，json.getString(\"name\")/json.getInt(\"age\")/json.getJSONArray(\"items\")逐字段读取。优点：无第三方依赖、轻量、可精细控制解析逻辑。缺点：代码冗长（每个字段手动读取）、容易类型出错、嵌套对象/数组解析复杂、不支持自动映射到对象。适合：简单JSON结构或只需提取少量字段。②Gson（自动映射，推荐）——Google开源库。用法：Gson().fromJson(jsonString, User::class.java)直接映射为对象，Gson().toJson(object)序列化。优点：一行代码完成对象映射、支持嵌套对象和集合、支持泛型、配置灵活（@SerializedName字段别名/@Expose控制序列化/自定义TypeAdapter）。缺点：需添加依赖、反射有一定性能开销（首次解析稍慢）。③Moshi——Square开源，Kotlin友好。用KSP/KAPT编译期生成适配器代码（避免反射），比Gson更快更安全，支持Kotlin nullable。现代Kotlin项目首选。数据类定义：data class User(val name: String, val age: Int, val items: List<Item>)，Gson自动按字段名映射，@SerializedName(\"user_name\") val userName: String处理JSON键名与Kotlin命名规范不一致的情况。最佳实践：用Gson/Moshi自动映射，结合Retrofit的Converter自动在网络请求返回时解析，业务代码只面对对象不面对JSON字符串。",
    tags: ["JSON解析", "Gson", "JSONObject", "Moshi", "数据映射"],
  },
  {
    id: "fla-nw-4",
    chapter: "fla-network",
    level: 1,
    question: "Android网络编程需要哪些权限配置？Android 9.0对HTTP有什么限制？",
    answer:
      "权限配置：①INTERNET权限——在AndroidManifest.xml中声明<uses-permission android:name=\"android.permission.INTERNET\"/>，这是普通权限（无需运行时申请），声明即可。所有网络请求（HttpURLConnection/OkHttp/Retrofit）都需要此权限。②ACCESS_NETWORK_STATE——如需查询网络状态（ConnectivityManager），需声明此权限。Android 9.0（API 28）的HTTP限制：①默认禁明文HTTP——Android 9.0起默认不允许应用使用HTTP（明文）网络请求，只允许HTTPS。原因：HTTP明文传输不安全，Google推动全站HTTPS。②表现——使用HTTP请求时抛出CLEARTEXT communication to ... not permitted by network security configuration异常。③解决方案——方式一：改用HTTPS（推荐）。方式二：配置networkSecurityConfig允许特定域名HTTP——在res/xml/下创建network_security_config.xml：<network-security-config><domain-config cleartextTrafficPermitted=\"true\"><domain includeSubdomains=\"true\">example.com</domain></domain-config></network-security-config>，在AndroidManifest的<application>标签设置android:networkSecurityConfig=\"@xml/network_security_config\"。方式三：全局允许明文（不推荐，仅调试用）——android:usesCleartextTraffic=\"true\"。④Android 7.0+的证书信任——默认只信任系统CA证书，自定义证书需在networkSecurityConfig中配置。最佳实践：生产环境全部用HTTPS，调试时用networkSecurityConfig临时放行HTTP域名，发布前移除。第三方API如不支持HTTPS应推动其升级。",
    tags: ["网络权限", "INTERNET", "HTTP限制", "networkSecurityConfig", "Android 9.0"],
  },
];
