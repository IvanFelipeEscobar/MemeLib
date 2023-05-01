var afterX = `` //starts after parameter as empty string which defaults to start
var formSumbitEl = document.getElementById(`formSubmit`)
var url = ``
var memeLibrary = JSON.parse(localStorage.getItem(`savedURL`)) || []
var elem = new Foundation.Reveal($(`#confirmModal`));
var elem1 = new Foundation.Accordion($(`.accordion`));
function formSubmitHandler(event) {
    event.preventDefault(); 
    var memeAmount = $(`#memeAmount`).val() 
    getMEME(memeAmount)
}
var xxx = ['ba', 'be', 1, 2]
function getMEME(memeAmount){    
if($(`#memeType`).val()===`Blank Template`) {fetchRequestBlank(memeAmount)}else{fetchRequestReddit(memeAmount)}}

function renderContent(id, url){
var picEL = ` 
    <div class="card meme"> 
        <div id="saveMeme">${id}
        </div>
        <img class="thumbnail" src="${url}" alt="${id}">
    </div>`//this html code will be rendered onto the html document in the main content area
    $(`.mainContent`).append(picEL)
  
}
function renderLibrary(imgSrc){
    var libMeme = `
    <div class="card libMeme">
    <img src="${imgSrc}">
    </div>
    `
    $(`.library`).append(libMeme)
}

function fetchRequestBlank(amt){
var captionImgURL = `https://api.imgflip.com/get_memes`
$.ajax({
    url: captionImgURL,
    method: `GET`
}).then(function(response){
    //console.log(response)
    $(`.mainContent`).empty()
    var rando = Math.floor(Math.random()*74)
    //console.log(rando)
    var limit = parseInt(rando)+parseInt(amt)
    for(let i=rando; i<limit; i++){ renderContent(response.data.memes[i].name, response.data.memes[i].url) }
    populateLibrary()
  
})
}

function fetchRequestReddit(amt){
var captionImgURL = `https://www.reddit.com/r/memes.json?limit=${amt}&after=${afterX}`
$.ajax({
    url: captionImgURL,
    method: `GET`
}).then(function(response){ 
    console.log(response)
    afterX = response.data.after //getting after code will queue next available meme, next time button is clicked so that the same meme dont just pop up over and over
    $(`.mainContent`).empty()
    response.data.children.forEach(element => renderContent(element.data.title, element.data.url_overridden_by_dest))
    populateLibrary()
        
    });
}

function renderNumberChoice(){
    for(var i=1; i<26; i++){
        var opt= `<option>${i}</option>`
        $(`#memeAmount`).append(opt)
    }
 }

 function populateLibrary(){
    $(`img`).on(`click`, function(){
        var imgSrc = $(this).attr(`src`)
        if(!memeLibrary.includes(imgSrc)){
            memeLibrary.push(imgSrc)
            renderLibrary(imgSrc)}

        localStorage.setItem("savedURL", JSON.stringify(memeLibrary))
      
     })
 }

 function init(){
    memeLibrary.forEach(function(x){renderLibrary(x)})

 }
init()
renderNumberChoice()
formSumbitEl.addEventListener('submit', formSubmitHandler);
$(`#clearLib`).on("click", function () {
    localStorage.clear();
    memeLibrary = [];
    window.location.reload("Refresh")
    
})


