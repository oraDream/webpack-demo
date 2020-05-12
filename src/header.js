function Header() {
    // let root = document.getElementById("root")
    let p = document.createElement("p")
    p.className = "text";
    p.innerText = "header文字样式";
    document.body.appendChild(p)
}

export default Header