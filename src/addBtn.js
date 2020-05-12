import AddItem from './addItem'
function addBtn(){
    let btn = document.createElement("button");
    btn.className="btn_insert";
    btn.innerText="新增";
    btn.onclick= AddItem;
    
    document.body.appendChild(btn);
}
export default addBtn;