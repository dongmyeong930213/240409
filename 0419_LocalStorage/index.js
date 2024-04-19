const inputKey = document.getElementById('inputKey');
const inputValue  = document.getElementById('inputValue');
const btnInsert  = document.getElementById('btnInsert');
const IsOutput  = document.getElementById('IsOutput');


btnInsert.onclick = ()=>{
    const key = inputKey.value;
    const value = inputValue.value;


if ( key && key ){
    localStorage.setItem(key,value);
    location.reload;
}
}

for(let i=0; i<localStorage.length; i++){
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    IsOutput.innerHTML += ` ${key} : ${value} <br>`
}