(function () {
    var cards=[],
    level=2,
    flipCount= 0,
    correctCount=0,
    firstCard=null,
    secondCard=null,
    btn,
    stage;
btn=document.getElementById('btn');
stage = document.getElementById('stage');

init();
function init() {
    correctCount=0;
    btn.className='';
    while (stage.firstChild)stage.removeChild(stage.firstChild);
    for (var i = 1; i <= level; i++) {
        cards[cards.length] = createCard(i);
        cards[cards.length] = createCard(i);
    }
    while (cards.length) {
        var pos =Math.floor(Math.random()*cards.length);
        stage.appendChild(cards.splice(pos,1)[0]);
    }
}
    function createCard(num) {
        var inner,
        card,
        container;
        inner ='<div class="card-back">?</div><div class="card-front">*</div>';
        
        card = document.createElement('div');
        card.className='card';
        card.innerHTML=inner.replace('*',num);
        card.addEventListener('click',function (){
            flipCard(this);
        });
        container=document.createElement('div');
        container.className='card-container';
        container.appendChild(card);
        return container;
    }
    function flipCard(card) {
        if (firstCard !== null && secondCard !==null) {
            return;
        }
        if (card.className.indexOf('open')=== -1) {
            card.className='card open';
        } else {
            return;
        }
        flipCount++;
        if (flipCount % 2 === 1) {
            firstCard=card;
        } else {
            secondCard=card;
            setTimeout(function () {
                judge();
            },900);
        }
    }
    function judge() {
        if (firstCard.children[1].textContent===secondCard.children[1].textContent) {
            correctCount++;
            // console.log(correctCount);
            if (correctCount===level) {
                btn.className='visible';
            }
            } else {
                firstCard.className='card';
                secondCard.className='card';
            }
            firstCard=null;
            secondCard=null;
        }
        btn.addEventListener('click',function() {
            level++;
            init();
        });

})();