let questionNumber = 0,
    seriesNumber = 0,
    quizCash = 0,
    testfinished = false;

window.onload = ()=>{
    startScreen("start");
    deBug();
};

const deBug = ()=>{
    const SynthDebug = getAllVoices();

    const makeDebug = (text)=>{
        const debugDiv = document.createElement("div");
        debugDiv.innerHTML = text;
        debugDiv.className = "my-2"
        
        document.getElementById("debug").appendChild(debugDiv);
    }

    // const allVoicesArray = [];

    SynthDebug.forEach(voice=>{
        const name = voice.name,
            lang = voice.lang,
            data = [`${name}: ${lang}`];
        makeDebug(data);
    })
}

const Synth = window.speechSynthesis,
    Data = dataCenter.returnData();

const getAllVoices = ()=>{
    const voices = speechSynthesis.getVoices();
    return voices;
};

const startScreen = (type)=>{
    const card = document.createElement("div");
    card.className = `text-center card mx-5 my-3 bg-dark`

    const mainDivInnerData = (HeaderText,btnText)=>{
        document.getElementById(`cardSection`).innerHTML = ``;

        const mainDiv = document.createElement("div");
        mainDiv.className = "card-body container";
        
        const Header = document.createElement("h5");
        Header.className = "text-center mb-5";
        Header.innerHTML = HeaderText;
        mainDiv.appendChild(Header);

        const Btn = document.createElement("button");
        Btn.className = "justify-content-center btn btn-success btn-lg mt-5 ";
        Btn.addEventListener("click",()=>engineQuiz(Data));
        Btn.innerHTML = btnText;
        mainDiv.appendChild(Btn);

        card.appendChild(mainDiv);
    };

    if(type==="start"){
        mainDivInnerData(`از همین الان آموزش زبان آلمانی را شروع کنید`,`شروع آموزش شماره ${seriesNumber + 1}`);
    }else if(type==="next"){

    };

    //Creating Image Elemnt
    const imageElemnt = document.createElement("img");
    imageElemnt.src = "https://lh3.googleusercontent.com/4JxliV5vFxhtTGx1bKo0hsIIfyrPe3VYMkxZBY_a4D0OnHX4dml79hlLLYHCt2nIofJ7oVWPAUMimfJT4BavbkB2Zn6oSdg1eemc-ctsN3_7O1o4MxkgmIqVtZJqFvDoFjSnXT9Zw55W9N3htITK7GVW8Axl1vgCL3UYrcFElWJYoUHmXyyogkHBVlpZVQtad8L9-t69sO6JhDQwJiM1EvzwMpg2WrU0JqD9dbYugmmd8RhpUyAFHKWFIu2_FoQQXUR88YpQuwKXnRviJ_MyqUPhWcQBG2ar2_HmdYUn06hmIbF2nkCER0RxhxDHCP5oqU5yomrwbem_4JaGY939SaBuVjv7u4EGpJVJNx2oaQj-mzSzZmVaUkmdX9ORw_F69D3fkXeB-EGm7OZh_WemC61s8dQu_8F9QRBCv_crKWSG7s-Nlsn92R-348CbHgJP4sCHCxTBVNxkB9Ap5G6c2tN8RLg-h7cqBz_bszQxqzIYkKFvs2usroj2AMhiS5YXTjzDKnNeS6BXy7HLvtxwhcF6UWxVJihcTaimT1oGB3wOZwOwOQC87eegykOBVllZUsXXd9bNnVtO6tJUNz8MvppbMmhOsehQ-Xw7Ue9QegfQppNoWH7WKQqiTf4qmgOM2QlmkVPAZ0jbsE2zfrupLodotv1H_Z-MRd8ZzF5RH6pF1oLXaCx9Yb5WU65IZaXP5CRSrIOAKE6tsE37jyHhbpNobA_m2X2BRIWBnsk0H6ZtLZg=w1280-h400-no";
    imageElemnt.className = `card-img-top`;
    card.appendChild(imageElemnt);

    document.getElementById(`cardSection`).appendChild(card);
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
    document.getElementById(`cardSection`).innerHTML = ``;
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

            answers.forEach((answer)=>{
                const answerBtn = document.createElement("button");
                answerBtn.className = `font-weight-bold my-2 mx-2 btn btn-light text-dark`;
                answerBtn.innerHTML = answer.answerText;
                AnswersSection.appendChild(answerBtn);
                if(answer.isAnswer === `true`){
                    answerBtn.addEventListener("click",(e)=>{
                        answerBtn.className = "font-weight-bold my-2 mx-2 btn btn-success text-dark isAnswer";
                        goToNextBtnToggle();
                    });
                }else{
                    answerBtn.addEventListener("click",(e)=>{
                        answerBtn.className = "font-weight-bold my-2 mx-2 btn btn-danger text-dark isFalse";
                    });
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
    console.log(`goToNextBtnToggle is called`)
    document.getElementById(`nextButtonSection`).innerHTML = ``;

    let Btn = document.createElement("button");
    Btn.id = `goToNextBtn`;
    Btn.className = `btn btn-success font-weight-bold container mx-5`;
    Btn.innerHTML = `سوال بعدی`;
    Btn.addEventListener("click",()=>{
        engineQuiz(Data);
        document.getElementById(`nextButtonSection`).innerHTML=``;
    });
    document.getElementById(`nextButtonSection`).appendChild(Btn);
}

const engineQuiz= (Data)=>{
    let thisQuiz = Data[seriesNumber].Data[questionNumber];
    document.getElementById(`cardSection`).appendChild(creatCard(thisQuiz.type,thisQuiz));
    questionNumber++
    testfinished ? testfinished = false : testfinished = false;
};