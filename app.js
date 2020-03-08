const Synth = window.speechSynthesis;
const getAllVoices = ()=>{
    const voices = speechSynthesis.getVoices();
    return voices;
};
//all documents on: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
window.speechSynthesis.onvoiceschanged = ()=> getAllVoices();
const speakIt = ()=>{
    //Chosing speak text
    const speakText = new SpeechSynthesisUtterance("halo, ich haise panzer");

    //Speak End
    speakText.onend = ()=>console.log(`Done Talking....`);

    //Speak Error
    speakText.onerror = ()=>console.log(`Somting got fucked!...`);

    //getAll Voices
    const allVoices = getAllVoices()

    //Selected Lang
    allVoices.forEach(voice =>{
        if(voice.lang === "de-DE"){
            speakText.voice = voice;
        }
    });

    //Speak it
    Synth.speak(speakText);
};

const playQuestionAudio = (e)=>{
    const text = e.target.parentElement.firstElementChild.innerHTML;

    //Chosing speak text
    const speakText = new SpeechSynthesisUtterance(text);

    //Speak End
    speakText.onend = ()=>console.log(`Done Talking....`);

    //Speak Error
    speakText.onerror = ()=>console.log(`Somting got fucked!...`);

    //getAll Voices
    const allVoices = getAllVoices()

    //Selected Lang
    allVoices.forEach(voice =>{
        if(voice.lang === "de-DE"){
            speakText.voice = voice;
        }
    });

    //Speak it
    Synth.speak(speakText);
};

const Database = {
    Header: "ترجمه ی صحیح را انتخاب کنید",
    question: "ich heiße amir.",
    answers: ["من من من من","تو تو تو تو"]
}

const creatCard = (Type,Content)=>{
    if(Type === `simple`){
        //Creating Card Elemnt
        const card = document.createElement("div");
        card.className = `card mx-5 my-3 bg-dark`

        //Creating Image Elemnt
        const imageElemnt = document.createElement("img");
        imageElemnt.src = `https://images.unsplash.com/photo-1542948338-ded3dbb75080?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1280`;
        imageElemnt.className = `card-img-top`;
        card.appendChild(imageElemnt);

        //creating Text Elemnts
        const textErea = document.createElement("div");
        textErea.className = `card-body`

        //creating Text Elemnts Header
        const Header = document.createElement("p");
        Header.className = `card-title h5 mb-3 text-right`
        Header.innerHTML = Content.Header;
        console.log()
        textErea.appendChild(Header);

        //creating Text Elemnts question
        const Question = document.createElement("div");
        Question.className = `card-text my-4 text-center row justify-content-center`;

        const QuestionP = document.createElement("p");
        QuestionP.className = `align-middle h3`;
        QuestionP.innerHTML = Content.question;
        Question.appendChild(QuestionP);

        const QuestionB = document.createElement("button");
        QuestionB.className = `align-middle btn btn-dark mx-2`;
        QuestionB.innerHTML = `🔊`;
        QuestionB.addEventListener("click",(e)=>playQuestionAudio(e));
        Question.appendChild(QuestionB);

        textErea.appendChild(Question);

        //making answers
        const setAnswers = (answers)=>{
            const AnswersSection = document.createElement("div");
            AnswersSection.className = `row d-flex justify-content-center`;

            answers.forEach((answer)=>{
                const answerBtn = document.createElement("button");
                answerBtn.className = `font-weight-bold my-2 mx-2 btn btn-light text-dark`;
                answerBtn.innerHTML = answer;
                AnswersSection.appendChild(answerBtn);
            });

            return AnswersSection;
        };

        //Apeding Answers Section
        textErea.appendChild(setAnswers(Content.answers));

        //appending TextErea
        card.appendChild(textErea);

        //retuning the card
        return card;
    };
}
document.getElementById(`speakIt`).addEventListener("click",()=>speakIt());
document.getElementById(`cardSection`).appendChild(creatCard(`simple`,Database))