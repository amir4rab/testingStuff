let questionNumber = 0,
    seriesNumber = 0,
    quizCash = 0,
    testfinished = false;
const Synth = window.speechSynthesis;
const getAllVoices = ()=>{
    const voices = speechSynthesis.getVoices();
    return voices;
};

//all documents on: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
window.speechSynthesis.onvoiceschanged = ()=> getAllVoices();
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

const creatCard = (Type,Content)=>{
    if(Type === `simple`){
        //Creating Card Elemnt
        const card = document.createElement("div");
        card.className = `card mx-5 my-3 bg-dark`

        //Creating Image Elemnt
        const imageElemnt = document.createElement("img");
        imageElemnt.src = Content.photoUrl;
        imageElemnt.className = `card-img-top`;
        card.appendChild(imageElemnt);

        //creating Text Elemnts
        const textErea = document.createElement("div");
        textErea.className = `card-body`

        //creating Text Elemnts Header
        const Header = document.createElement("p");
        Header.className = `container card-title h5 mb-3 text-right`
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

        if(Content.hasAudio === `true`){
            const QuestionB = document.createElement("button");
            QuestionB.className = `align-middle btn btn-dark mx-2`;
            QuestionB.innerHTML = `🔊`;
            QuestionB.addEventListener("click",(e)=>playQuestionAudio(e));
            Question.appendChild(QuestionB);
        };

        textErea.appendChild(Question);

        //making answers
        const setAnswers = (answers)=>{
            const AnswersSection = document.createElement("div");
            AnswersSection.className = `row d-flex justify-content-center`;

            const checkIfTrue = ()=>{
                let falseAnswers = document.querySelectorAll(".isFalse");
                falseAnswers.forEach((Btn)=>{
                    Btn.className = "font-weight-bold my-2 mx-2 btn btn-danger text-dark isFalse"
                });
                let tureAnswers = document.querySelectorAll(".isAnswer");
                tureAnswers.forEach((Btn)=>{
                    Btn.className = "font-weight-bold my-2 mx-2 btn btn-success text-dark isAnswer"
                    goToNextBtnToggle();
                    console.log(`goToNextBtnToggle has been called`)
                });
            };

            answers.forEach((answer)=>{
                const answerBtn = document.createElement("button");
                answerBtn.className = `font-weight-bold my-2 mx-2 btn btn-light text-dark`;
                answerBtn.innerHTML = answer.answerText;
                AnswersSection.appendChild(answerBtn);
                if(answer.isAnswer === `true`){
                    answerBtn.className += " isAnswer";
                    answerBtn.addEventListener("click",(e)=>{checkIfTrue()});
                }else{
                    answerBtn.addEventListener("click",(e)=>{checkIfTrue()});
                    answerBtn.className += " isFalse";
                };
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
};

const goToNextBtnToggle = ()=>{
    if(document.querySelector(`#goToNextBtn`) === null){
        let Btn = document.createElement("button");
        Btn.id = `goToNextBtn`;
        Btn.className = `btn btn-success font-weight-bold container mx-5`;
        Btn.innerHTML = `سوال بعدی`;
        Btn.addEventListener("click",()=>engineQuiz(Data));
        document.getElementById(`nextButtonSection`).appendChild(Btn);
    }else{
        document.getElementById(`nextButtonSection`).innerHTML = ``;
    }
}
const Data = dataCenter.returnData()
const engineQuiz= (Data)=>{
    let thisQuiz = Data[seriesNumber].Data[questionNumber];
    document.getElementById(`cardSection`).innerHTML = ``;
    document.getElementById(`cardSection`).appendChild(creatCard(thisQuiz.type,thisQuiz));
    questionNumber++
    testfinished ? testfinished = false : testfinished = false;
    goToNextBtnToggle();
};
engineQuiz(Data);