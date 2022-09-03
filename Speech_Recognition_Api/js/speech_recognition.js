let MIC = document.querySelector('#MIC');
let ST_container = document.querySelector('#Speech_Text_Container');
let Start_Btn = document.querySelector('#Start_Btn');
let Rec_Text = document.querySelector("#Text_Recognize");
let SearchBox = document.querySelector('#SearchBox');


// SPEECH RECOGNITION SECTION
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


const recognition = new window.SpeechRecognition();
recognition.lang = 'bn-IN';
// recognition.lang = 'en-US';
recognition.continuous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 1;
  
recognition.addEventListener('result', (e) =>{
    const text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join(' ');


    if (e.results[0].isFinal){
        let texts;
        texts = document.createTextNode(" "+text);
        
        console.warn(texts)
        Rec_Text.appendChild(texts)
        console.warn(Rec_Text.innerText.length)
    }
})

// DETECT USER TALKING OR NOT
console.warn(recognition)
recognition.onspeechstart = (e) => {
    console.warn(e)
}
recognition.onsoundstart = () => {
    Start_Btn.classList.add('Mic_Style');
    console.warn('Some sound is being received');
}
recognition.onsoundend = () => {
    Start_Btn.classList.remove('Mic_Style');
    console.warn('Sound has stopped being received');
}

// DETECT USER TALKING OR NOT
recognition.onspeechend = (e) => {
    recognition.stop();
    Start_Btn.addEventListener('click', SP_initialize);
    console.warn(e);
}

MIC.addEventListener('click', DisplayBlanket);
function DisplayBlanket(){
    ST_container.classList.remove('Hide_Speech_Text');
    Start_Btn.removeEventListener('click', SP_initialize)
    recognition.start();
}

Start_Btn.addEventListener('click', SP_initialize);
function SP_initialize(){
    recognition.stop();
    recognition.start();
    // Start_Btn.removeEventListener('click', SP_initialize)
    recognition.addEventListener('end', ()=>{
        recognition.start();
    })
}

Rec_Text.addEventListener('click', HideBlanket);
function HideBlanket(){
    // recognition.stop();
    // console.warn('Speech recognition has stopped.');
    // Start_Btn.removeEventListener('click', SP_initialize)
    SearchBox.value = Rec_Text.innerText;
    ST_container.classList.add('Hide_Speech_Text')
}