import './index.css';

let f1 = function (param) {
	return new Promise((resolve, reject) => {
		if(param>3){
			resolve(true)
		}else{
			resolve(false)
		}
	})
}
let f2 = async function(){
	let res = await f1(4);
	if(res){
		console.log("大于3")
	}else{
		console.log("不大于3")
	}
}

f2()