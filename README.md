<h2>A toolset for Vue router, including dynamic routing, initialization routing, and more</h2>

## Essentials:

## 1. init-router

### Features:

#### 1.Injected router instances into the global routing guard, where 'this' can be used

#### 2.Redefining the replace and push methods to eliminate asynchronous error reporting by routing guards

#### 3.Delayed call to global routing guards, such as when using pinia in the guard, an error will be reported. This attribute can be used to fix this. If there is an infinite loop when resetting the dynamic route(use addRoute), please turn off this option

```js
// router/index.js

import initRouter from 'vue-router-tools/init-router';
import routes from './routes';
import beforeEach from './before-each';
import afterEach from './after-each';

export default initRouter({ routes, beforeEach, afterEach });
```

```js
// main.js

import router from './router/index';

new Vue({
  render: (h) => h(App),
  router
}).$mount('#app');
```

|            | desc                                                                                            | default                       | explain                                                                             |
| ---------- | ----------------------------------------------------------------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| beforeEach | navigation guards                                                                               | function (to,from,next) {...} | 'this' point to router instances in guard is available when not use arrow functions |
| afterEach  | navigation guards                                                                               | function (to,from,next) {...} | ditto                                                                               |
| lazyHooks  | delay call the route guard                                                                      | false                         |                                                                                     |
| ...others  | [vue-router-example](https://github.com/vuejs/vue-router/blob/dev/examples/named-routes/app.js) |                               |                                                                                     |

## 2. add-route

```js
// router/before-each.js

import addRoute from 'vue-router-tools/add-route';

const parentName = 'admin';
let isRouteAdded = false;

export default async function (to, from, next) {
  if (!isRouteAdded) {
    // replace your own dynamic-routes request here
    const routes = await fetch('/get-menu');
    const { replaceTo } = addRoute({
      to,
      routes,
      router: this, // if not use init-router and use arrow function,then the "this" is "undifined",or replace the router instance here
      parentName
    });
    isRouteAdded = true;
    replaceTo();
  } else {
    next();
  }
}
```

#### props:

|            | desc                                                                                              | type              |
| ---------- | ------------------------------------------------------------------------------------------------- | ----------------- |
| routes     | [the dynamic routes from request](https://v3.router.vuejs.org/guide/essentials/named-routes.html) | Array             |
| router     | the Router's instance                                                                             | Router's instance |
| parentName | [the parentName of dynamic-routes](https://v3.router.vuejs.org/api/#router-addroute-2)            | String            |
| to         | the navigation guard's "to"                                                                       | Object            |
| notFound   | the RouteConfig of notFound                                                                       | Object            |

#### return value:

|             | desc                                    | type     |
| ----------- | --------------------------------------- | -------- |
| replaceTo   | for dynamic route first time navigation | Function |
| resetRouter | reset the dynamic routes                | Function |

## 3.bread-crumbs

Auto generate dynamic bread crumbs based on vue router

### Note:

The route corresponding to each breadcrumb needs to configure the meta attribute, and configure the display text of the route in it

### Usage:

```js
import Vue from 'vue';
import Router from 'vue-router';
import autoCrumbs from 'vue-router-tools/bread-crumbs';

Vue.use(Router);
const router = new Router({...})

router.beforeEach((to,from,next)=>{
    const { matched } = to;
  /**
   * @first       --   When there is a homepage, put it at the first of the breadcrumbs
   * @metaNameKey --   Custom your meta name field, the 'name' is default
   */
  const crumbs = autoCrumbs({ matched, first: {text:'',to:''}, metaNameKey:''});
  // The value obtained here should be saved in store (vuex or pinia).
  console.log(crumbs);
    // ...
  next()
})
```
