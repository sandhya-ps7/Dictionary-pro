let btn = document.querySelector(".mode-toggler");

let body = document.createElement("body");


btn.addEventListener("click", () => {
    let color = getComputedStyle(document.body).backgroundColor;
    // console.log("btn clicked");
    console.dir(btn);
    
    if(color === "rgb(255, 255, 255)"){ 

        changeColor("black", "white");
        btn.innerText = "Light";
        btn.classList.add("light");
        search_btn.style.backgroundColor = "black";
        
    }else {
       changeColor("white", "black");
       btn.innerText = "Dark";
       search_btn.style.backgroundColor = "white";
       
    }
    
});

function changeColor(bgColor, textColor){
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = textColor;
  
};



let inp = document.querySelector("#search");
let search_btn = document.querySelector(".search-btn");
let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

search_btn.addEventListener("click", () => {
    let word = inp.value;
    getMeaning(word);
});

async function getMeaning(word) {
    try {
        let res = await axios.get(url+word);
        let data =  await res.data;

        printdetails(word, data);

        console.log(res);
        console.log(data);
    }catch(e) {
        console.log("ERROR FOUND - ", e);
    }
    
};
async function printdetails(word, data) {

    let h3 = document.createElement("h3");
    h3.classList.add("word");
    h3.innerText = word;

    let f = await data[0];
    collectData(data);
    // let meaning = await f.meanings[0].partOfSpeech;
    // let phonetic = f.phonetic;
    // let definitions = f.meanings[0].definitions;
    // let synonyms = await f.meanings[0].synonyms;
    // let antonyms = await f.meanings[0].antonyms;
    // for (let i = 0; i < definitions.length; i++) {
    
    //     console.log(definitions[i].definition);
    //     console.log(definitions[i].example);
    //     console.log(definitions[i].synonyms);
    //     console.log(definitions[i].antonyms)
    // }
    
    // console.log(meaning);
    // console.log(phonetic);
    // console.log(synonyms);
    // console.log(antonyms);
    // console.log(definitions);
};

function showData(definition, eg, synonyms, antonyms){
 
    let Container = document.createElement("div");
    Container.classList.add("psc");

    let define = document.createElement("p");
    define.classList.add("definition");
    define.innerText = definition;
    let e = document.createElement("p");
    e.innerText = eg;
    let ex = document.createElement("h6");
    ex.classList.add("example");
    ex.innerText = Example;

    let sh6 = document.createElement("h6");
    sh6.classList.add("synonyms");
    sh6.innerText = "Synonyms";
    let ps = document.createElement("p");
    let synos = Array.isArray ? synonyms.join(",") : "No synonyms";
    ps.innerText = synos;
    console.log(synos);


    let ah6 = document.createElement("h6");
    ah6.classList.add("antonyms");
    ah6.innerText = "Antonyms";
    let pa = document.createElement("p");
    // let antos = Array.isArray ?antonyms.join(",") : "No antonyms";
    // pa.innerText = antos;
    // console.log(antos);

    let antos = "";

    if (Array.isArray(antonyms) && antonyms.length > 0) {
        antos = antonyms.join(", ");
    } else {
        antos = "No antonyms available";
    }

    pa.innerText = antos;
    // console.log(antos);

    Container.appendChild(define);
    if(e.value != undefined){
        Container.appendChild(ex);
        Container.appendChild(e);  
    }
    if(synonyms.length > 0){
        Container.appendChild(sh6);
        sh6.appendChild(ps);  
    }
    console.log(pa.value);
    if(antonyms.length > 0){
        Container.appendChild(ah6);
        ah6.appendChild(pa);
    }
    

    document.body.appendChild(Container);
    
}


function showWord(word, phonet){

    let div = document.createElement("div");
    let h3 = document.createElement("h3");
    let h4 = document.createElement("h4");


    h3.innerText = word;
    h4.innerText = phonet;
    div.appendChild(h3);
    div.appendChild(h4);
    document.body.append(div);

}

function collectData(data){
    let item = data[0];
    let word = item.word;
    let phonet = item.phonetic;
    let meanings = item.meanings;
    showWord(word, phonet);

    for (let i = 0; i < meanings.length; i++) {


        let pos = meanings[i].partOfSpeech;
        let part = document.createElement("h4");
        part.classList.add("partOfSpeech");
        part.innerText = pos;
        document.body.appendChild(part);
        console.log(meanings[i]);
        for (let j = 0; j < meanings[i].definitions.length; j++) {
            console.log(meanings[i].definitions.length);
            let v = meanings[i].definitions[j]; 
            let define = v.definition;
            let syno = v.synonyms;
            let anto = v.antonyms;
            let eg = v.example;
            showData(define, eg, syno, anto);
        }
        let syno2 = meanings[i].synonyms;
        if(syno2.length > 0){
            let synonym = document.createElement("h6");
            synonym.innerText = syno2;
            document.body.appendChild(synonym);
        }
        
        
    }
}
 

// function extractData(pos, definitions, phonet, w){
//     for (let i = 0; i < definitions.length; i++) {
//         showData(definitions[i].definition, definitions[i].synonyms, definitions[i].antonyms, definitions[i].example, pos, phonet, w);
//     }
// }

// inp.addEventListener()

