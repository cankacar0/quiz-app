// let soru = {
//     soruMetni: "hangisi js paket yönetim uygulamasıdır",
//     cevapSecenekleri: {
//         a: "node js",
//         b: "typescript",
//         c: "npm"
//     },
//     dogruCevap: "c",
//     cevabiKontrolEt: function(cevap) {
//         return cevap === this.dogruCevap
//     }
// }

// console.log(soru.soruMetni);
// console.log(soru.cevabiKontrolEt("a"));

// sınıf => nesne*30 

function Soru(soruMetni, cevapSecenekleri, dogruCevap) {
    this.soruMetni = soruMetni;
    this.cevapSecenekleri = cevapSecenekleri;
    this.dogruCevap = dogruCevap;
    
}

Soru.prototype.cevabıKontrolet = function(cevap) {
    return cevap === this.dogruCevap
}


let sorular = [
    new Soru("1-hangisi js paket yönetim uygulamasıdır", { a: "node js", b: "typescript", c: "npm", d: "react" }, "c"),
    new Soru("2-hangisi sql paket yönetim uygulamasıdır", { a: "node js", b: "typescript", c: "npm" }, "c"),
    new Soru("3-hangisi python paket yönetim uygulamasıdır", { a: "node js", b: "typescript", c: "npm", d: "apache" }, "c")
];


function Quiz(sorular) {
    this.sorular = sorular;
    this.soruIndex = 0;
}

Quiz.prototype.soruGetir = function() {
    return this.sorular[this.soruIndex];
}

const quiz = new Quiz(sorular);



document.querySelector(".btn-start").addEventListener("click", function() {
    
        document.querySelector(".quiz_box").classList.add("active");
        soruGoster(quiz.soruGetir());
        soruSayisi(quiz.soruIndex + 1, quiz.sorular.length);
        document.querySelector(".next-btn").classList.remove(".show");
        
    })
    
    document.querySelector(".next-btn").addEventListener("click",function(){
        if (quiz.sorular.length != quiz.soruIndex + 1) {
            document.querySelector(".quiz_box").classList.add("active");
            quiz.soruIndex += 1;
            soruGoster(quiz.soruGetir());
            soruSayisi(quiz.soruIndex + 1, quiz.sorular.length);
        document.querySelector(".next-btn").classList.remove(".show");

    } else {
        console.log("quiz bitti");
    }
});

const option_list = document.querySelector(".option_list");
const correctIcon = `<div class="icon"><i class="fas fa-check"></i></div>`;
const incorrectIcon = `<div class="icon"><i class="fas fa-times"></i></div>`;

function soruGoster(soru){
    let question = `<span>${soru.soruMetni}</span>`;
    let option ='';

    for(let cevap in soru.cevapSecenekleri){
        option += 
        `
            <div class="option">
                <span><b>${cevap}</b>: ${soru.cevapSecenekleri[cevap]}</span>
            </div>
        `;
    }

    document.querySelector(".question_text").innerHTML = question;
    option_list.innerHTML = option;

    const options = option_list.querySelectorAll(".option");

    for(let opt of options) {
        opt.setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(option){
    let cevap = option.querySelector("span b").textContent;
    let soru = quiz.soruGetir();

    if(soru.cevabıKontrolet(cevap)){
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", correctIcon);
    } else {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", incorrectIcon);
        
    }

    for (let i = 0; i < option_list.children.length; i++) {
        option_list.children[i].classList.add("disabled");
    }

    document.querySelector(".next-btn").classList.add("show");

} 

function soruSayisi(soruSirasi, toplamSoru){
    let tag = `<span class="badge bg-warning"> ${soruSirasi} / ${toplamSoru}</span>`
    document.querySelector(".quiz_box .question_index").innerHTML = tag;
}