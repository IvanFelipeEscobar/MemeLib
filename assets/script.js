// var captionImgURL = `https://api.imgflip.com/get_memes`
// $.ajax({
//     url: captionImgURL,
//     method: `GET`
// }).then(function(response){
//     console.log(response)
//     response.data.memes.forEach(element => {
//         console.log(element.name)
//         var picEL = `<img src="${element.url}" id="${element.id}">`
//         $(`.mainContent`).append(picEL)
    
//     })
        
//     });
var captionImgURL = `https://www.reddit.com/r/memes.json`
$.ajax({
    url: captionImgURL,
    method: `GET`
}).then(function(response){
    console.log(response.data.children)
    response.data.children.forEach(element => {
        console.log(element.data)
        var picEL = `<img src="${element.data.url_overridden_by_dest}">`
        $(`.mainContent`).append(picEL)
    
    })
        
    });