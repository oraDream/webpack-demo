
// 1、同步代码
import _ from 'lodash';

var element = document.createElement('div');
element.innerHTML = _.join(['hello', 'world'], '-');
document.body.appendChild(element);


// 2、异步代码
// function getComponent() {
// 	// 魔法注释：将异步打包的文件命名为lodashname
// 	return import(/* webpackChunkName:"lodashname" */ 'lodash').then(({ default: _ }) => {
// 		var element = document.createElement('div');
// 		element.innerHTML = _.join(['hello', 'world'], '-');
// 		return element;
// 	})
// }

// getComponent().then(element => {
// 	document.body.appendChild(element);
// });
