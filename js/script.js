let numAcm = 0;
let lastOpr;
let lastDig = '0';
let lastNum = '0';

let lastPressed = 'number';

let resultEl = document.querySelector('#result');
let lastResultEl = document.querySelector('#lastResult');

const numEvent = (e) => {
    lastDig = e.target.value;

    if(lastNum == 0 || lastPressed == 'opr')
        lastNum = lastDig;
    else
        lastNum += lastDig;

    resultEl.innerText = lastNum;
    lastPressed = 'number';
}

const opEvent = (e) => {
    let value = e.target.value;

    switch(value) {
        case 'CE':
            lastNum = '0';
            lastDig = '0';
            if(lastOpr == '=') {
                numAcm = 0;
                lastOpr = undefined;
            }
            reloadResult(lastNum);
            break;
        case 'C':
            lastNum = '0';
            lastDig = '0';
            numAcm = 0;
            lastOpr = undefined;
            lastResultEl.classList.remove('show');
            reloadResult('0');
            break;
        case 'ERASE':
            if(lastNum.length >= 2)
                lastNum = lastNum.slice(0, -1);
            else
                lastNum = '0';
            reloadResult(lastNum);
            break;

        case '/':
            if(lastNum != 0){
                numAcm != 0 ? numAcm /= Number(lastNum) : numAcm = Number(lastNum);
                reloadResult(numAcm);
                lastOpr = value;
                lastResultEl.innerText = `${numAcm} ${lastOpr}`;
                lastResultEl.classList.add('show');
            }
            break;
        case 'x':
            if(lastNum != 0){
                numAcm != 0 ? numAcm *= Number(lastNum) : numAcm = Number(lastNum);
                reloadResult(numAcm);
                lastOpr = value;
                lastResultEl.innerText = `${numAcm} ${lastOpr}`;
                lastResultEl.classList.add('show');
            }
            break;
        case '-':
            if(lastNum != 0){
                numAcm != 0 ? numAcm -= Number(lastNum) : numAcm = Number(lastNum);
                reloadResult(numAcm);
                lastOpr = value;
                lastResultEl.innerText = `${numAcm} ${lastOpr}`;
                lastResultEl.classList.add('show');
            }
            break;
        case '+':
            if(lastNum != 0){
                numAcm += Number(lastNum);
                reloadResult(numAcm);
                lastOpr = value;
                lastResultEl.innerText = `${numAcm} ${lastOpr}`;
                lastResultEl.classList.add('show');
            }
            break;
        case '=':
            parseCalc();
    }

    lastPressed = 'opr';
}

let opBtns = document.querySelectorAll('.option-btn');
opBtns.forEach(btn => {
    btn.addEventListener('click', opEvent);
})

let numBtns = document.querySelectorAll('.num-btn');
numBtns.forEach(btn => {
    btn.addEventListener('click', numEvent);
})


const parseCalc = () => {

    switch(lastOpr) {
        case '/':
            lastNum = numAcm / Number(lastNum);
            break;
        case 'x':
            lastNum = numAcm * Number(lastNum);
            break;
        case '-':
            lastNum = numAcm - Number(lastNum);
            break;
        case '+':
            lastNum = numAcm + Number(lastNum);
            break;
    }
    reloadResult(lastNum);
    numAcm = 0;
    lastResultEl.classList.remove('show');
}

const reloadResult = (text) => {
    resultEl.innerHTML = text;
}