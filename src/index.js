import  './index.css';
import Header from './header'
import Number from './number'
import AddBtn from './addBtn'


Header();
Number();
AddBtn();
if(module.hot) {
	module.hot.accept('./number', () => {
		document.body.removeChild(document.getElementById('number'));
		Number();
	})
}

