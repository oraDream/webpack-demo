import plantImg from './taodan.jpg'


function AddImg() {
    var img = new Image();
    img.src = plantImg;
    document.body.appendChild(img)
}

export default AddImg