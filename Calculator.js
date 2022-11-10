
let enabled = true;

const mainDiv = document.createElement('div');
mainDiv.style.border = '2px solid red';
mainDiv.style.height = '100vh';
mainDiv.style.width = '100vw';
mainDiv.style.minWidth = '229px';
mainDiv.className = 'row';
mainDiv.style.justifyContent = 'center';
mainDiv.style.alignContent = 'center';
mainDiv.style.flexWrap = 'no-wrap';
mainDiv.style.textAlign = 'center';

const colDiv = document.createElement('div');
colDiv.style.border = '2px solid red';
colDiv.style.height = '550px';
colDiv.style.width = '98%'
colDiv.style.minWidth = '220px';
colDiv.style.borderRadius = '10px';
colDiv.style.backgroundColor = '#dddcdc';

var innerDiv = document.createElement('div');
innerDiv.style.margin = '20px 0';

const h1Tag = document.createElement('h1');
h1Tag.id = 'title';
h1Tag.innerText = 'Calculator';

const pTag = document.createElement('p');
pTag.id = 'description';
pTag.innerText = 'Only Numbers and Symbols(+, -, *, /, %, .) are allowed';

const inpTag = document.createElement('input');
inpTag.id = 'result';
inpTag.style.height = '50px';
inpTag.style.width = '90%';
inpTag.style.margin = '20px';
inpTag.style.textAlign = 'right';
inpTag.style.fontSize = '32px';

colDiv.append(inpTag);

mainDiv.append(h1Tag, pTag, colDiv);

doOperation = (btnName) => {

    if (typeof btnName !== 'number' && enabled === true && btnName !== '<' && btnName !== 'C'&& btnName !== '00' && btnName !== '=') {

        if ((btnName === 'x' || btnName === '*') && inpTag.value.length !== 0) {
            inpTag.value += '*';
            enabled = false;
        }
        else if (inpTag.value.length === 0 && btnName !== '-' && btnName !== '.') {
          inpTag.value = '';
        }
        else {
            inpTag.value += btnName;
            enabled = false;
        }
    }
    else if(typeof btnName === 'number' || btnName === '00') {
       inpTag.value += btnName;
       enabled = true;
    }

    if(btnName == 'C' && inpTag.value.length > 0) {
       inpTag.value = '';
       enabled = true;
    } else if (btnName == '<' && inpTag.value.length >= 0) {
        inpTag.value = inpTag.value.slice(0, inpTag.value.length - 1);

        if(!isNaN(Number(inpTag.value[inpTag.value.length - 1])) || inpTag.value.length === 0) {
            enabled = true;
        }
         

    } else if (btnName == '=') {

        if(!isNaN(Number(inpTag.value[inpTag.value.length - 1]))) {
           
           var tmp = inpTag.value;
        }
        else {
           var tmp = inpTag.value.slice(0, inpTag.value.length - 1); 
        }
    
        inpTag.value = '';
        
        if(eval(tmp) !== undefined)
        {
           inpTag.value = eval(tmp);
        }
        else {
            inpTag.value = 0;
        }
        
        enabled = true;
    }
}

btnNames = ['C', '<', '.', 'x', 7, 8, 9, '/', 4, 5, 6, '-', 1, 2, 3, '+', 0, '00', '=', '%'];

var count = 0;

btnNames.forEach( (btnName) => {

    const btnTag = document.createElement('button');
    btnTag.innerText = btnName;
    btnTag.style.width = '20%';
    btnTag.style.minWidth = '40px';
    btnTag.style.height = '70px';
    btnTag.style.margin = '0 4px';
    btnTag.style.borderRadius = '10px';
    innerDiv.append(btnTag);
    
    count++;

    if(count === 4) {
        colDiv.append(innerDiv);
        innerDiv = document.createElement('div');
        innerDiv.style.margin = '20px 0';
        count = 0;
    }

    if(btnName === '=') {
       btnTag.id = 'equal';
       btnTag.style.backgroundColor = '#1e7e34';
       btnTag.style.color = 'white';
    }
    else if(btnName === 'C') {
       btnTag.id = 'clear';
       btnTag.style.backgroundColor = '#bd2130';
       btnTag.style.color = 'white';
    }
    else if(typeof btnName !== 'number' && btnName !== '00') {

       btnTag.style.backgroundColor = '#d39e00';
       btnTag.style.color = 'red';

       if(btnName === '+')
          btnTag.id = 'add';
       else if(btnName === '-')
          btnTag.id = 'subtract';
       else
          btnTag.id = btnName;
    }
    else {
       btnTag.style.backgroundColor = '#1d2124';
       btnTag.style.color = 'white';
       btnTag.id = btnName;
    }

    btnTag.addEventListener( 'click', () => {
        doOperation(btnName);
    })

})


inpTag.addEventListener ('keydown', (e) => {
   
   if(e.key === 'Enter') {
      doOperation('=');
   }
   else if((isNaN(e.key) || e.key === ' ') && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
       
       e.preventDefault();

       if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '%' || e.key === '.')
           doOperation(e.key);
       else if(e.key === 'Backspace') {
           doOperation('<');
       }
       else {
         alert('Only numbers are allowed');
       }
   }
   else {
       enabled = true;
   }
});


document.body.append(mainDiv);


