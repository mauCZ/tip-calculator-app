let number_inputs = document.getElementsByClassName('number-inputs');
let output = document.querySelectorAll('.tip-amount-person>label');


let bill_input = number_inputs[0];
let custom_perc_input = number_inputs[1];
let num_people_input = number_inputs[2];
let error = document.getElementById("error");
let tip_output = output[0];
let total_output = output[1];
let reset_btn = document.getElementById("reset-btn");


setEventListeners();

function setEventListeners(){
    
    // bill_input.addEventListener('blur',checkBill,false);
    // custom_perc_input.addEventListener('blur',checkCustomPercentage,false);
    // num_people_input.addEventListener('blur',calculate,false);

    reset_btn.addEventListener('click',reset,false);
    num_people_input.addEventListener('blur',calculate,false);

    for(let percs of document.getElementsByClassName("percentage")){
        percs.addEventListener('click',customPercentage,false);
    }
    for(let input of number_inputs){
        input.addEventListener('focus',cleanInput,false);
    }
}

function calculate(e){
    let bill = parseFloat(bill_input.value);
    let percentage = parseFloat(custom_perc_input.value);
    let people = parseFloat(e.target.value);
    
    if(checkBill(bill) && checkCustomPercentage(percentage) && checkPositiveIntegerNumber(people)){
        error.innerText = "";
        let tip_amount_person = (bill*(percentage/100))/people;
        let total_person = tip_amount_person + (bill/people);
    
        tip_output.innerText = `$${tip_amount_person.toFixed(2)}`;
        total_output.innerText = `$${total_person.toFixed(2)}`;
    }else{
        error.innerText = "ERROR";
    }
}
function reset(e){
    tip_output.innerText = "$0.00";
    total_output.innerText = "$0.00";
    bill_input.value = '';
    custom_perc_input.value = '';
    num_people_input.value = '';
    error.innerText = '';
}
function customPercentage(e){
    custom_perc_input.value = e.target.value;
    percentage = parseInt(e.target.value);
}
function checkPositiveIntegerNumber(n){
    if(n <= 0){
        return false;
    }else if(!Number.isInteger(n)){
        return false;
    }
    return true;
}
function checkBill(bill){
    if(bill < 0 || bill ==NaN) return false;
    return true;
}
function checkCustomPercentage(perc){
    if(!Number.isInteger(perc) || perc < 0 || perc > 100 ) return false;
    return true;
}
function cleanInput(e){
    e.target.value = "";
}