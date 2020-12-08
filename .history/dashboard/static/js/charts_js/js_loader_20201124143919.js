// var loader_gif = document.getElementById("loader_gif").src;

function showLoader(div_id) {
    $('#' + div_id).css({
        "background-color": "#ffffff",
        "align-items": "center",
        "display": "flex",
        "position": "relative"
    })
    $('#' + div_id).append('<div id="loader_div" style="align-items: center; display: flex; background-color: #ffffff; width: 100%; height: 100%; position: absolute; top:0; left: 0; z-index: 10;">  <img src='+loader_gif+' style="width:30px; height:30px; margin-left: auto; margin-right: auto;"/>   </div>')
}


function removeLoader(div_id) {
    $('#' + div_id).css({
        "background-color": "",
        "align-items": "",
        "display": "",
        "position": ""
    })
    $('#' + div_id + " #loader_div").remove()
}