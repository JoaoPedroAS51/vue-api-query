window.__NUXT__=(function(a,b,c,d,e,f,g){return {staticAssetsBase:"\u002F_nuxt\u002Fstatic\u002F1603137882",layout:"default",error:null,state:{categories:{en:{"Getting Started":[{slug:"index",title:"Introduction",category:b,to:d},{slug:"installation",title:"Installation",category:b,to:"\u002Finstallation"},{slug:"configuration",title:"Configuration",category:b,to:"\u002Fconfiguration"},{slug:"usage",title:"Usage",category:b,to:"\u002Fusage"}],API:[{slug:"options",title:"Options",category:a,to:e},{slug:"query-methods",title:"Query Methods",category:a,to:"\u002Fapi\u002Fquery-methods"},{slug:"http-methods",title:"HTTP Methods",category:a,to:"\u002Fapi\u002Fhttp-methods"},{slug:"crud-operations",title:"CRUD Operations",category:a,to:"\u002Fapi\u002Fcrud-operations"},{slug:"relationship-operations",title:"Relationship Operations",category:a,to:"\u002Fapi\u002Frelationship-operations"}],Examples:[{slug:"full",title:"Nuxt Usage Example",menuTitle:"Nuxt",category:"Examples",to:"\u002Fexamples\u002Ffull"}],Community:[{slug:"releases",title:"Releases",category:"Community",to:"\u002Freleases"}]}},releases:[{name:"1.6.1",date:"2020-10-09T14:59:54Z",body:"\u003Cp\u003EBump\u003C\u002Fp\u003E\n"},{name:"Apply instances of relationships to nested objects. ",date:"2020-10-09T13:23:31Z",body:"\u003Cp\u003EThanks @JoaoPedroAS51 !\u003C\u002Fp\u003E\n\u003Cp\u003EYou can also apply a model instance to a nested object by setting the key and the model in \u003Ccode\u003Erelations\u003C\u002Fcode\u003E method.\u003C\u002Fp\u003E\n\u003Cp\u003EIf the backend responds with:\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-js\"\u003E\u002F\u002F response from API for \u002Fposts\u002F1\n{\n  title: &#39;My title&#39;\n  body: &#39;Some text here&#39;,\n  user: {\n    firstName: &#39;John&#39;,\n    lastName: &#39;Doe&#39;\n  }\n}\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003EWe just need to set \u003Ccode\u003Euser\u003C\u002Fcode\u003E to User model:\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cstrong\u003E\u002Fmodels\u002FPost.js\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-js\"\u003Eclass Post extends Model {\n  relations () {\n    return {\n      \u002F\u002F Apply User model to `user` object\n      user: User\n    }\n  }\n}\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003EIt also works for collections. So if the backend responds with:\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-js\"\u003E\u002F\u002F response from API for \u002Fcomments\n{\n  text: &#39;Some text here&#39;,\n  user: {\n    firstName: &#39;John&#39;,\n    lastName: &#39;Doe&#39;\n  },\n  replies: [\n    {\n      text: &#39;A reply here&#39;,\n      user: {\n        firstName: &#39;Joe&#39;,\n        lastName: &#39;Doe&#39;\n      }\n    },\n    {\n      text: &#39;Another reply here&#39;,\n      user: {\n        firstName: &#39;Mary&#39;,\n        lastName: &#39;Doe&#39;\n      },\n      replies: [\n        {\n          text: &#39;Yes, this is the reply of the reply!&#39;,\n          user: {\n            firstName: &#39;Max&#39;,\n            lastName: &#39;Doe&#39;\n          }\n        }\n      ]\n    }\n  ]\n}\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003EThen we just need to set \u003Ccode\u003Euser\u003C\u002Fcode\u003E to User model and \u003Ccode\u003Ereplies\u003C\u002Fcode\u003E to Comment model:\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cstrong\u003E\u002Fmodels\u002FComment.js\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-js\"\u003Eclass Comment extends Model {\n  relations () {\n    return {\n      \u002F\u002F Apply User model to `user` object\n      user: User,\n      \u002F\u002F Apply Comment model to each object of `replies` array\n      replies: Comment\n    }\n  }\n}\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n"},{name:"Fixes",date:"2020-05-15T17:30:52Z",body:"\u003Cul\u003E\n\u003Cli\u003EUpdate all dependencies\u003C\u002Fli\u003E\n\u003Cli\u003ESmall fix on README @manniL \u003C\u002Fli\u003E\n\u003Cli\u003EReset query string @MichMich\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003Esave()\u003C\u002Fcode\u003E method makes a \u003Ccode\u003EPUT\u003C\u002Fcode\u003E request to the correct URL on nested object thas was fetched with \u003Ccode\u003Efind()\u003C\u002Fcode\u003E method @taai\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003EThanks to @Peter-Krebs for reviewing.\u003C\u002Fp\u003E\n"},{name:"Fix for $find to use a constructor on the result ",date:"2019-05-02T18:02:22Z",body:"\u003Cp\u003EThanks @rossity for #67\u003C\u002Fp\u003E\n"},{name:"Add 'fetch' based methods: $first() and $find()",date:"2019-04-18T01:05:46Z",body:"\u003Cp\u003EThanks @leeovery  for #61.\u003C\u002Fp\u003E\n\u003Cp\u003EIntroduces new fetch style request for \u003Ccode\u003Efind()\u003C\u002Fcode\u003E and \u003Ccode\u003Efirst()\u003C\u002Fcode\u003E methods. See README for more info.\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-js\"\u003Elet user = await User.$find(1)\n\nlet user = await User.$first()\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n"},{name:"Fix custom resources baseURL()",date:"2019-02-27T00:05:50Z",body:"\u003Cp\u003EThanks @peterquentin \u003C\u002Fp\u003E\n"},{name:"The `custom()` method takes multiples parameters ",date:"2019-02-24T03:22:19Z",body:"\u003Cp\u003EThanks @Peter-Krebs \u003C\u002Fp\u003E\n\u003Cp\u003EThe \u003Ccode\u003Ecustom()\u003C\u002Fcode\u003E method can be called with multiple arguments to build\nresource endpoints and hierarchies. Simply supply them in the correct order.\nAny combination of strings and models is possible.\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-js\"\u003E    let user = new User({ id: 1 })\n    let post = new Post()\n\n    \u002F\u002F GET \u002Fusers\u002F1\u002Fposts\u002Flatest\n    const result = await Post.custom(user, post, &#39;latest&#39;).get()\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n"},{name:"Improvements and fixes",date:"2019-02-18T19:29:50Z",body:"\u003Ch2 id=\"update-dependencies\"\u003EUpdate dependencies\u003C\u002Fh2\u003E\n\u003Cp\u003EUpdated to latest babel and eslint features.\u003C\u002Fp\u003E\n\u003Ch2 id=\"added-ability-to-customize-query-parameter-names\"\u003EAdded ability to customize query parameter names\u003C\u002Fh2\u003E\n\u003Cp\u003EIf you need to change default values just override parametersName() on your Base Model. So, the generated query string will use this new values.\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-js\"\u003Eimport { Model as BaseModel } from &#39;vue-api-query&#39;\n\nexport default class Model extends BaseModel {\n\n  parameterNames () {\n    return {\n      include: &#39;include_custom&#39;,\n      filter: &#39;filter_custom&#39;,\n      sort: &#39;sort_custom&#39;,\n      fields: &#39;fields_custom&#39;,\n      append: &#39;append_custom&#39;,\n      page: &#39;page_custom&#39;,\n      limit: &#39;limit_custom&#39;\n    }\n  }\n}\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003EThanks @suth \n\u003Ca target=\"_blank\" href=\"https:\u002F\u002Fgithub.com\u002Frobsontenorio\u002Fvue-api-query\u002Fpull\u002F42\"\u003Ehttps:\u002F\u002Fgithub.com\u002Frobsontenorio\u002Fvue-api-query\u002Fpull\u002F42\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Ch2 id=\"fix-array-strategy-validation-for-ssr\"\u003EFix array strategy validation for SSR\u003C\u002Fh2\u003E\n\u003Cp\u003EGot error on using vue-api-query with NUXT on universal mode (SSR)\u003C\u002Fp\u003E\n\u003Cp\u003EThanks @MisterEffix \n\u003Ca target=\"_blank\" href=\"https:\u002F\u002Fgithub.com\u002Frobsontenorio\u002Fvue-api-query\u002Fpull\u002F43\"\u003Ehttps:\u002F\u002Fgithub.com\u002Frobsontenorio\u002Fvue-api-query\u002Fpull\u002F43\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n"},{name:"The `for()` method can take multiple objects to build hierarchy levels.",date:"2018-11-22T01:35:13Z",body:"\u003Cpre\u003E\u003Ccode class=\"language-js\"\u003E let user = new User({id: 1})\n let post = await user.posts().first()\n\n \u002F\u002F Related objects go in order of their appearance in the URL.\n let comment = new Comment({text: &#39;for() takes multiple objects.&#39;}).for(user, post)\n  \u002F\u002F POST \u002Fusers\u002F1\u002Fposts\u002F1\u002Fcomments\n await comment.save()\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n"},{name:".for() should use object.getPrimaryKey()",date:"2018-10-31T10:30:52Z",body:void 0},{name:"find() method for nested resources",date:"2018-07-26T02:56:35Z",body:"\u003Cp\u003EIf you need to get a nested resource, without getting the parent model at first, you can do something like this.\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-js\"\u003E\u002F\u002F GET \u002Fusers\u002F1\u002Fposts\n\nlet User = new User({id: 1})\nlet Post = await User.posts().get()\n\n\u002F\u002F GET \u002Fusers\u002F1\u002Fposts\u002F2\nlet User = new User({id: 1})\nlet Post = await User.posts().find(2)\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n"},{name:"Stable release and for() method",date:"2018-07-16T16:10:32Z",body:"\u003Cul\u003E\n\u003Cli\u003ETag 1.0.0 stable\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003Efor()\u003C\u002Fcode\u003E method for creating new related objects\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003ECreating new related objects is easy. Just use the for() method, passing the related object.\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-js\"\u003E  let post = new Post({title: &#39;Woo!&#39;})  \n\n  \u002F\u002F POST \u002Fposts\n  await post.save()\n\n  let comment = new Comment({text: &#39;New one for this post&#39;}).for(post)\n\n  \u002F\u002F POST \u002Fposts\u002F1\u002Fcomments\n  await comment.save()\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n"},{name:"Custom params",date:"2018-06-05T01:15:32Z",body:"\u003Cp\u003EIf you need to pass any extra param not provided by \u003Ccode\u003Evue-api-query\u003C\u002Fcode\u003E pattern, just use the \u003Ccode\u003Eparams()\u003C\u002Fcode\u003E method while querying:\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-js\"\u003E\u002F\u002F GET \u002Fusers?doSomething=yes&amp;process=no\n\nlet users = await User\n  .params({\n    doSomething: &#39;yes&#39;,\n    process: &#39;no&#39;\n  })\n  .get()\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003EOf course you can chain it with other methods, including on relationships.\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode class=\"language-js\"\u003E\u002F\u002F GET \u002Fposts\u002F1\u002Fcomments?include=user&amp;blah=123\n\nlet comments = await post\n  .comments()\n  .include(&#39;user&#39;)\n  .params({blah: 123})\n  .get()\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n"},{name:"Add `primaryKey()` method.",date:"2018-05-16T18:21:08Z",body:"\u003Cp\u003EIn case your model does not work with default primary key (&#39;id&#39;).\u003C\u002Fp\u003E\n"},{name:"0.5.0",date:"2018-04-11T03:49:06Z",body:"\u003Cp\u003ESupport PUT, POST, DELETE for nested relationships\u003C\u002Fp\u003E\n"},{name:"0.4.1",date:"2018-04-06T22:54:48Z",body:"\u003Cp\u003EFix internal variable name\u003C\u002Fp\u003E\n"},{name:"0.4.0",date:"2018-04-05T12:43:35Z",body:"\u003Cul\u003E\n\u003Cli\u003E\u003Cp\u003EAdd \u003Ccode\u003Eselect()\u003C\u002Fcode\u003E for sparse fields\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Cp\u003ERemove \u003Ccode\u003Efind()\u003C\u002Fcode\u003E restriction for integers\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n"},{name:"0.3.0",date:"2018-03-31T01:44:25Z",body:"\u003Cul\u003E\n\u003Cli\u003Eadd \u003Ccode\u003Edelete()\u003C\u002Fcode\u003E method\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n"},{name:"0.2.0",date:"2018-03-30T04:32:31Z",body:"\u003Cul\u003E\n\u003Cli\u003Eadd &quot;fetch style request&quot; with $get()\u003C\u002Fli\u003E\n\u003Cli\u003Eadd pagination with page() and limit()\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n"}],settings:{title:"Vue API Query",defaultDir:"docs",defaultBranch:"master",filled:c,slug:"settings",url:"https:\u002F\u002Fvue-api-query.github.io",github:"robsontenorio\u002Fvue-api-query",dir:d,path:"\u002Fsettings",extension:".json",createdAt:f,updatedAt:f,to:"\u002F\u002Fsettings"},menu:{open:false},i18n:{routeParams:{}}},serverRendered:c,routePath:e,config:{content:{dbHash:"bdae63fb"}},__i18n:{langs:{en:{search:{placeholder:"Search the docs (Press \"\u002F\" to focus)"},toc:{title:"On this page"},article:{github:"Edit this page on GitHub"}}}},colorMode:{preference:g,value:g,unknown:c}}}("API","Getting Started",true,"\u002F","\u002Fapi\u002Foptions","2020-10-19T20:03:36.461Z","system"));