<h2>A toolset for Vue router, including dynamic routing, routing modularity, initialization routing, and more</h2>

# usage:
    import foo from 'vue-router-tools/bar'

## 1.init-router
```
// router/index.js

import initRouter from 'vue-router-tools/init-router';
import routes from './routes';
import base from './base';
import beforeEach from './before-each';
import afterEach from './after-each';

export default initRouter({ routes, base, beforeEach, afterEach });
```
```
// main.js

import router from './router/index';

new Vue({
  render: (h) => h(App),
  router
}).$mount('#app');

```

|            | desc                                                                                            | default                       | explain                                                                                   |   |   |   |
|------------|-------------------------------------------------------------------------------------------------|-------------------------------|-------------------------------------------------------------------------------------------|---|---|---|
| beforeEach | navigation guards                                                                               | function (to,from,next) {...} | 'this' point to router instances in guard is available when not use arrow functions |   |   |   |
| afterEach  | navigation guards                                                                               | function (to,from,next) {...} | ditto                                                                                     |   |   |   |
| ...others  | [vue-router-example](https://github.com/vuejs/vue-router/blob/dev/examples/named-routes/app.js) |                               |                                                                                           |   |   |   |

## 2.add-route

// router/before-each.js

```
const parentName = 'admin';
let isAsyncRouteAdded = false;
let resetRouter = null;

export default async function (to, from, next) {
  const { name,  path } = to;
  
  // In this case, when the account exits and jumps to the login page, all dynamic routes are cleared.
  // Please choose whether to proceed according to the actual situation
  if (name === 'login') {
    next();
    if (isAsyncRouteAdded) {
      resetRouter && resetRouter();
      isAsyncRouteAdded = false;
    }
  } else {
      if (!isAsyncRouteAdded) {
        const [
          {
            value: { default: addRoute }
          },
          {
            value: { default: notFound }
          }
        ] = await Promise.allSettled([
          import('vue-router-tools/add-route'),
          import('@router/configuration/not-found')
        ]);

        // replace your dynamic-routes request here
        const routes = await fetch('/get-menu')
         
        // if use arrow function,then "this" is undifined here.
        const {
          replaceTo,
          resetRouter: reset,
        } = addRoute({
          to,
          routes,
          router: this,
          parentName,
          notFound
        });
        resetRouter = reset;
        isAsyncRouteAdded = true;
        isStaticRoute ? next() : replaceTo();
      } else {
        next();
      }
  }
  
    
}
```
