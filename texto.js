
var messagesStack = [
    [`TODAY IS SOMEONE SPECIAL'S BIRTHDAY`, 
'I AM A PROGRAM CREATED TO GREET YOU',
'ON YOUR 6TH BIRTHDAY', 
'I HAVE FOUND OUT THAT YOU HAVE A CRAZY UNCLE WHO LOVES YOU VERY MUCH',
'HE WANTS YOU TO BE VERY HAPPY',
'I LEAVE YOU A LITTLE PRESENTATION (: (: (:',
'THERE IS A HIDDEN MESSAGE FOR HER...',
'YOU HAVE TO DISCOVER IT BY WALKING AROUND A LITTLE AND LOOKING',
'MAYBE INSIDE SOME OBJECT'],
    ['HELLO AGAIN, IS THAT YOU [NAME]?',
'THIS PROGRAM IS CREATED TO GREET [NAME]',
'ON HER 6TH BIRTHDAY',
'SHE HAS A CRAZY UNCLE WHO LOVES HER VERY MUCH',
'AND WHO WANTS TO PLAY CHESS WITH HER',
'THIS IS A LITTLE PRESENTATION..',
'SO THAT YOU CAN DISCOVER THE HIDDEN MESSAGE...',
'WITH A SPECIAL GREETING FOR [NAME]'],
    ['I HOPE YOU LIKE MY GIFT',
`I'M JUST ENTERTAINING YOU FOR A FEW MOMENTS`,
'UNTIL EVERYTHING IS READY',
'THE VIRTUAL WORLD IS BEING BUILT',
`IT'S A SMALL WORLD`,
'WHICH HAS A HIDDEN MESSAGE...',
'HAPPY BIRTHDAY [NAME]!!']
];

var detener = false;
var ValorAnterior = localStorage.getItem('nroMsj') ? parseInt(localStorage.getItem('nroMsj')) : 0;
var textEl = document.querySelector('#marquesina');
/**
 * tendremo
 */
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function marquesina(callback) {
    const $botonMarquesina = document.body.querySelector('#detener-marquesina');
    $botonMarquesina.addEventListener('click', 
        () => {
            textEl.style.display = 'none'
            detener = true;
            new Notification('se está deteniendo la ejecución');
    }, false);
    var messages = messagesStack[ValorAnterior % messagesStack.length]
    textEl.innerHTML = "";
    let message = 0
    while(message < messages.length && !detener) {
        for(var character in messages[message]) {
            var a = textEl.innerHTML;
            await sleep(100);
            let char = messages[message][character];
            textEl.innerHTML = a + char;
        }
        await sleep(1000);

        for(var character in messages[message]) {
            await sleep(50);
            textEl.innerHTML = textEl.innerHTML.slice(0, -1);
        }
        message++
    };
    localStorage.setItem('nroMsj', parseInt(ValorAnterior)+1 );
    callback()
    $botonMarquesina.style.display = 'none';
}

window.onload = () => {
    document.body.querySelector('#detener-marquesina').disabled = false;
}
