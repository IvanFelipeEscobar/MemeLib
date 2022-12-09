var captionImgURL = `https://api.imgflip.com/get_memes`
$.ajax({
    url: captionImgURL,
    method: `GET`
}).then(function(response){
    console.log(response)
    response.data.memes.forEach(element => {
        console.log(element.url)
        var picEL = `<img src=${element.url}>`
        $(`.mainContent`).append(picEL)
    
    })
        
    });