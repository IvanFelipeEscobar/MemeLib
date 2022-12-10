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
// $(`#submitForm`).on(`submit`, function(event){
//     event.preventDefault()
//     var memeAmount = $(`#memeAmount`).val()
//     getMEME(memeAmount)
// })
var refreshButtonEl = $('#refresh-btn');

var formSumbitEl = document.getElementById(`formSubmit`)
var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var memeAmount = $(`#memeAmount`).val()
 
      getMEME(memeAmount)
     }
function getMEME(memeAmount){
var captionImgURL = `https://www.reddit.com/r/memes.json?limit=${memeAmount}`
$.ajax({
    url: captionImgURL,
    method: `GET`
}).then(function(response){
    $(`.maincontent`).empty()
    console.log(response.data.children)
    response.data.children.forEach(element => {
        console.log(element.data)
        var picEL = ` <div class="card"">
                        <div class="card-divider top">
                        ${element.data.title}
                        </div>
                        <img src="${element.data.url_overridden_by_dest}">
                      </div>`

    
        $(`.mainContent`).append(picEL)
       
    })
        
    });
}

formSumbitEl.addEventListener('submit', formSubmitHandler);

refreshButtonEl.on('click', function () {
    location.reload();
  });