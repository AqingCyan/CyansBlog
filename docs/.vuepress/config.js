module.exports = {
  title: 'AqingCyan的技术积累',
  description: '一个赤脚学习者的个人修养',
  base: '/CyansBlog/',
  head: [
    ['link', {
      rel: 'icon',
      href: '/favicon.ico'
    }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    sidebarDepth: 1,
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
    nav: [{
      text: '前端学习',
      items: [
        {
          text: '样式学习',
          link: '/FE/Css/cover'
        },
        // {
        //   text: 'JavaScript',
        //   link: '/FE/JS/cover'
        // },
        {
          text: 'ECMAScript6学习',
          link: '/FE/ES6/cover'
        },
        {
          text: 'TypeScript',
          link: '/FE/TS/cover'
        },
        {
          text: 'Vue.js',
          link: '/FE/Vue/cover'
        },
        // {
        //   text: 'React.js',
        //   link: '/FE/React/cover'
        // },
      ]
    },
    // {
    //   text: '算法',
    //   items: [{
    //     text: '数据结构',
    //     link: '/Algorithm/DataStructure/cover'
    //   },
    //   {
    //     text: '算法解析',
    //     link: '/Algorithm/Leetcode/cover'
    //   }
    //   ]
    // },
    {
      text: '服务端',
      items: [
        //   {
        //   text: '计算机网络',
        //   link: '/Server/Net/cover'
        // },
        {
          text: 'NodeJs',
          link: '/Server/Node/cover'
        },
        {
          text: 'Koa小程序后台',
          link: '/Server/KoaServer/cover'
        },
      ]
    },
    // {
    //   text: '操作系统',
    //   link: '/OS/cover'
    // },
    {
      text: '工具',
      items: [{
        text: 'webpack相关',
        link: '/Tool/Webpack/cover'
      },
        // {
        //   text: 'Git与Github',
        //   link: '/Tool/Git/cover'
        // }
      ]
    },
    {
      text: 'GitHub',
      link: 'https://github.com/AqingCyan'
    }
    ],
    sidebar: {
      '/FE/Css/': [{
        title: 'CSS学习',
        collapsable: false,
        children: [
          ['cover', '前言'],
          '01.HTMLrecover',
          '3',
          '4',
        ]
      }],
      // '/FE/JS/': [{
      //   title: 'JavaScript基础',
      //   collapsable: false,
      //   children: [
      //     ['cover', '啥'],
      //     '2',
      //     '3',
      //     '4',
      //   ]
      // }],
      '/FE/ES6/': [{
        title: 'ECMAScript6学习笔记',
        collapsable: false,
        children: [
          ['cover', '学习之前'],
          '01_letAndconst',
          '02_jiegoufuzhi',
          '03_strInES6',
          '04_ArrInES6',
          '05_FunctionInES6',
          '06_ObjectInES6',
          '07_Symbol',
          '08_setAndmap',
          '09_proxyAndReflect',
          '10_class',
          '11_Promise'
        ]
      }],
      '/FE/Vue/': [{
        title: 'Vue学习指南',
        collapsable: false,
        children: [
          ['cover', '一段前言'],
          'StartFromTodoList',
          'VuesApiandHisHook',
          'ComputedAndWatch',
          'StyleAndV-if',
          'ListAndV-for',
          'Components',
          'Slot'
        ]
      },
      {
        title: 'Vuex学习指南',
        collapsable: false,
        children: [
          'vuex_cover',
          'vuex_install',
          'vuex_state',
          'vuex_webpack',
          'vuex_getter',
          'vuex_mutation',
          'vuex_action'
        ]
      }],
      // '/FE/React/': [{
      //   title: 'React学习',
      //   collapsable: false,
      //   children: [
      //     ['cover', '啥'],
      //     '2',
      //     '3',
      //     '4',
      //   ]
      // }],
      '/FE/TS/': [{
        title: 'TypeScript学习',
        collapsable: false,
        children: [
          ['cover', '起步'],
          '01_typeOfData',
          '02_TS_funtion',
          '03_TS_class',
          '04_interface',
          '05_ Generic'
        ]
      }],
      // '/Algorithm/DataStructure/': [{
      //   title: 'JS中数据结构的实现',
      //   collapsable: false,
      //   children: [
      //     ['cover', '啥'],
      //     '2',
      //   ]
      // },
      // {
      //   title: '拓展:Python中的数据结构实现',
      //   collapsable: false,
      //   children: [
      //     '3',
      //     '4',
      //   ]
      // }],
      // '/Algorithm/Leetcode/': [{
      //   title: 'Leetcode算法解析',
      //   collapsable: false,
      //   children: [
      //     ['cover', '啥'],
      //     '2',
      //     '3',
      //     '4',
      //   ]
      // }],
      // '/Server/Net/': [{
      //   title: '计算机网络基础',
      //   collapsable: false,
      //   children: [
      //     ['cover', '啥'],
      //     '2',
      //     '3',
      //     '4',
      //   ]
      // }],
      '/Server/Node/': [{
        title: 'Node实战',
        collapsable: false,
        children: [
          ['cover', '笔记说明'],
          '01_http',
          '02_create_project',
          '03_init_interface',
          '04_dev_interface',
          '05_blod-detail_interface',
          '06_dev_other_blog_router',
          '07_use_mysql',
          '08_node_mysql',
          '09_api_sql',
          '10_login',
          '11_session',
          '12_redis'
        ]
      }],
      '/Server/KoaServer/': [{
        title: 'Koa小程序后台',
        collapsable: false,
        children: [
          ['cover', '笔记说明'],
          '01.Koa_knowloage',
          '02. onionModel'
        ]
      }],
      // '/Tool/Git/': [{
      //   title: 'Git协同开发',
      //   collapsable: false,
      //   children: [
      //     ['cover', '啥'],
      //     '2',
      //     '3',
      //     '4',
      //   ]
      // }],
      '/Tool/Webpack/': [{
        title: 'Webpack打包',
        collapsable: false,
        children: [
          ['cover', '开始学习之前'],
          '01.what_is_loader',
          '02.use_loader_to_pack_picture',
          '03.use_loader_to_pack_css',
          '04.use_plugin_make_better',
          '05.entry_and_output',
          '06.source-map',
          '07.webpakDevServer',
          '08.HotModuleReplacement',
          '09.BabelHandleES6',
          '10.TreeShaking',
          '11.devAndprosDiff'
        ]
      }]
    }
  }
}