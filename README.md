# DGUT_Campus-navigation
莞工地图
详情见 https://jyblog.stm32-mqtt.top/projects/ggdt_project/
调用腾讯地图接口和插件
## 项目成果
**目前用户量为 995 人（2023/9/13）(无宣传的情况下有这么多已经很不错了 QAQ)**

<img src="./image/baf4f19d1cebe733de24786a3527d6f.png" width="600" height="400"/><br/>

![gh_23f543467c24_258](./image/gh_fd34d48c276b_258.jpg)

## 项目演示
* 分类查看校内建筑物
<img src="./image/60aa525ba04d5331a101c17b9ca9026.jpg" width="400" height="800"/><br/>
* 搜索功能：
<img src="./image/f65839e1bc58206ebf0f9f0fc3868dd.jpg" width="400" height="800"/><br/>
* 自定义坐标点
<img src="./image/06d6dfbb48f847eae61a4d7c19dbfba.jpg" width="400" height="800"/>
<img src="./image/8f78ac17d4e64752166445cab593254.jpg" width="400" height="800"/>
## **一、项目研究的目的与意义**

**目的**：适用于对莞工还不甚了解的人群，尤其是大一新生，以及想要了解莞工的用户，小程序详细地介绍莞工松山湖校区，个性化地定制莞工地图，使得新生不再对陌生的路感到迷茫。

**意义**：为同学指引方向，同时也对莞工的优美景色进行记录和分享，展示和介绍，服务于同学的学习和生活。

## 二、项目简介

​		本小程序基于腾讯地图 API 开发，自定义地图样式，实现用户分享拍摄作品功能，是一款更简洁、更美观、更便捷的个性化地图小程序。操作简便，致力于提高用户的体验，更好地展示莞工的风貌。 

## **三、平台功能特色**

目前主要的模块分为三部分：地图展示、校园风光、个人页面。 

### **1.地图展示**

在这一部分主要通过将用户对地图的需求做出分类，分类展示用户在学习和生活中可能涉及的地点。其中包括在腾讯地图和高德地图中未能找到的地点，如桌球室、乒乓球室等等、便于新生更好更快地了解校园，通过腾讯地图插件对目的地进行导航和路径规划，添加搜索功能，实现对已有的地点标志进行检索。

其中最为突出和创新的是小程序添加了个性化定制的功能，用户可在个人页面的管理员模式中获取当前经纬度和上传图片，以及对于地点的介绍，然后将地点渲染到地图中的个人定制部分，便于用户个性化地保存在腾讯地图中未出现的地点，个性化地配图和描述也会带来更好的体验。

### **2.校园风光** 

这一部分主要展示东莞理工学院的校园风光，通过轮播图展示，页面美观、添加了校园资讯栏目，瀑布流展示用户上传校园风光照片，支持用户上传多张照片，通过分栏展示，点赞功能识别用户，记录点赞状态。获取学校官网的资讯以及网络空间安全学院的重要通知公告，分页展示，下拉无限刷新，一键返回顶部，将获取的HTML页面解析，转成WXML页面渲染到小程序中。

### **3.个人页面** 

这一部分主要通过精美的页面带给用户的良好使用体验，目前的功能有：每日一句（调用扇贝英语API）、管理员模式（用与定制上传个性化的 markers）、帮助中心（人性化地引导新用户更好地使用小程序）等。 

### 四、受众人群

1.适用于莞工学生：个性化地定制也能给莞工学子带来更好地使用体验，相对于高德地图和腾讯地图的干巴巴的地图来说使用体验会更好。

2.适用于想要了解莞工的用户：地图检测用户所处位置是否为校园、若不是还可选择东莞理工学院北门为默认地点，浏览校园。而校园风光栏目也能记录下校园的美好风光，可供用户分享和点赞。

### **五、技术实现方案**

针对校园风光栏目，后端服务采用云开发技术，将数据存储到云存储，实现不同用户之间数据的交互。通过调用云函数对数据进行增删查改操作，其中还涉及到检索和对数据排序，且小程序端通过缓存获取的页面数据，减少对云数据库的访问次数，提高了效率。

点赞功能通过每条作品记录存入用户的openid数组，识别用户的是否点过赞，防止用户重复点赞。删除功能通过识别发布者openid判断数据是否能被删除。

多处通过递归调用函数解决异步加载问题：如：瀑布流布局则通过识别页面布局高度，递归调用函数逐一判断添加的作品的位置。识别上传存储多张图片时的需要递归调用逐一上传以免造成顺序混乱的问题。

 
