var afterX = `` //starts after parameter as empty string which defaults to start
var formSumbitEl = document.getElementById(`formSubmit`)
var formSubmitHandler = function (event) {
    event.preventDefault(); 
    var memeAmount = $(`#memeAmount`).val() 
    getMEME(memeAmount)
}

function getMEME(memeAmount){    
if($(`#memeType`).val()===`Blank Template`){fetchRequestBlank(memeAmount)
}else{fetchRequestReddit(memeAmount)
}}
$(`img`).on(`click`, function(){
    var abo = $(`this`)
    console.log(abo)
}
)
function renderContent(a, b){
var picEL = ` 
    <div class="card meme"> 
        <div class="card-divider top" id="saveMeme">${a}
        </div>
        <img src="${b}">
    </div>`//this html code will be rendered onto the html document in the main content area
    $(`.mainContent`).append(picEL)
}

function fetchRequestBlank(a){//if blank template is selected then it will execute this function for imgflip api to render blank memes on page
    var captionImgURL = `https://api.imgflip.com/get_memes`
$.ajax({
    url: captionImgURL,
    method: `GET`
}).then(function(response){
    console.log(response)
    $(`.mainContent`).empty()
    var rando = Math.floor(Math.random()*74)
    console.log(rando)
    var limit = parseInt(rando)+parseInt(a)
    for(let i=rando; i<limit; i++){ renderContent(response.data.memes[i].name, response.data.memes[i].url) }
})
}

function fetchRequestReddit(a){
var captionImgURL = `https://www.reddit.com/r/memes.json?limit=${a}&after=${afterX}`
$.ajax({
    url: captionImgURL,
    method: `GET`
}).then(function(response){ 
    afterX = response.data.after //getting after code will queue next available meme, next time button is clicked so that the same meme dont just pop up over and over
    $(`.mainContent`).empty()
    response.data.children.forEach(element => renderContent(element.data.title, element.data.url_overridden_by_dest))
        
    });
}

formSumbitEl.addEventListener('submit', formSubmitHandler);