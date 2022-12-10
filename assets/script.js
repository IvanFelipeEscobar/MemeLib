var afterX = `` //starts after parameter as empty string which defaults to start
var formSumbitEl = document.getElementById(`formSubmit`)
var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var memeAmount = $(`#memeAmount`).val()
 
      getMEME(memeAmount)
     }
function getMEME(memeAmount){
    
if($(`#memeType`).val()===`Blank Template`){//if blank template is selected then it will execute this function for imgflip api to render blank memes on page
    var captionImgURL = `https://api.imgflip.com/get_memes`
$.ajax({
    url: captionImgURL,
    method: `GET`
}).then(function(response){
    console.log(response)
    $(`.mainContent`).empty()
    for(i=0; i<memeAmount; i++){
        console.log(response.data.memes[i].name)
        var picEL = ` 
        <div class="card meme"> 
            <div class="card-divider top">${response.data.memes[i].name}
            </div>
            <img src="${response.data.memes[i].url}">
        </div>`
        $(`.mainContent`).append(picEL)

    }
})
    

}else{//else reddit api call renders memes on page

var captionImgURL = `https://www.reddit.com/r/memes.json?limit=${memeAmount}&after=${afterX}`
$.ajax({
    url: captionImgURL,
    method: `GET`
}).then(function(response){ 
    afterX = response.data.after //getting after code will queue next available meme, next time button is clicked so that the same meme dont just pop up over and over
    $(`.mainContent`).empty()
    response.data.children.forEach(element => {
    //console.log(element.data)
    var picEL = ` 
    <div class="card meme"> 
        <div class="card-divider top">${element.data.title}
        </div>
        <img src="${element.data.url_overridden_by_dest}">
    </div>`//this html code will be rendered onto the html document in the main content area
    $(`.mainContent`).append(picEL)
        
       
    })
        
    });
}}

formSumbitEl.addEventListener('submit', formSubmitHandler);