var loader_gif = document.getElementById("loader_gif").src;

function showLoader(div_id) {
    $('#' + div_id).css({
        "background-color": "#ffffff",
        "align-items": "center",
        "display": "flex",
        "position": "relative"
    })
    $('#' + div_id)
}


function removeLoader(div_id) {
    $('#' + div_id).css({
        "background-color": "",
        "align-items": "",
        "display": "",
        "position": ""
    })
    $('#' + div_id ).remove()
}