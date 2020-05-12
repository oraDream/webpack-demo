
 function AddItem(){
    let item = document.createElement("div");
    item.className="item";
    item.innerText="新增条目";
    document.body.appendChild(item);
}

export default AddItem;