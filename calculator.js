/*
    Computation:
    Interest to be paid = 1% per month of duration
    Ex. 12 months Installment:
    (Total to pay) = (Principal Amount) + 12%
    (Monthly payment) = (Total to pay) / (duration in months)
*/

function PaymentPlan(){
    var principal, monthlyMultiplier, duration;
    var currentBank;
}

//Bank Object Constructor
function Bank(name, isZeroPercent){
    this.name = name;
    this.isZeroPercent = isZeroPercent;
}

var CurrentPlan = new PaymentPlan();

//populate BankList Array
const BankList = [
    new Bank("BPI Regular", false),
    new Bank("BPI Zero %", true),
    new Bank("Chinabank", true),
    new Bank("HSBC", true),
    new Bank("Metrobank", true)
];

//populate Bank List drop-down using BankList values
BankList.forEach(function(e){
    document.getElementById("bankID").innerHTML += "<option>" + e.name + "</option>";
});

function updateBank(input){
    CurrentPlan.currentBank = BankList.find(({name}) => name === input.value);
    var target = document.getElementById("sliderContainer");
    
    setSliderValues(document.getElementById("sliderContainer"));
    setSliderStyles(document.getElementById("sliderContainer"));
    updateOutput();
}

function setSliderValues(slider){
    if(CurrentPlan.currentBank.isZeroPercent){
        slider.querySelector("#duration_slider").setAttribute("min", 3) ;
        slider.querySelector("#duration_slider").setAttribute("max", 6) ;
        slider.querySelector("#duration_slider").setAttribute("step", 3) ;
        slider.querySelector("#duration_min").innerHTML = "3 mos.";
        slider.querySelector("#duration_max").innerHTML = "6 mos.";
        
    }
    else{
        slider.querySelector("#duration_slider").setAttribute("min", 6) ;
        slider.querySelector("#duration_slider").setAttribute("max", 24) ;
        slider.querySelector("#duration_slider").setAttribute("step", 6) ;
        slider.querySelector("#duration_min").innerHTML = "9 mos.";
        slider.querySelector("#duration_max").innerHTML = "24 mos.";
    }
    slider.querySelector("#duration_slider").value = "0";
}

function setSliderStyles(slider){
    if(slider.querySelector("#duration_slider").hasAttribute("disabled"))
        slider.querySelector("#duration_slider").removeAttribute("disabled");
}

function updateOutput(){
    
    refreshDurationData();
    //refreshes monthly computation
    CurrentPlan.principal = document.getElementById("amountID").value == ""? 0.0 : parseFloat(document.getElementById("amountID").value);     

    if(CurrentPlan.principal != null && CurrentPlan.duration != null){
        CurrentPlan.monthlyMultiplier = (1 + (CurrentPlan.duration/100))/CurrentPlan.duration;
        document.getElementById("monthlyID").innerHTML = "&#8369; " + Math.round(CurrentPlan.principal*CurrentPlan.monthlyMultiplier*100)/100;
    }
}

function refreshDurationData(){
    //refreshes Duration Text
    CurrentPlan.duration = parseInt(document.getElementById("sliderContainer").querySelector("#duration_slider").value);
    if(!CurrentPlan.currentBank.isZeroPercent)
        CurrentPlan.duration = CurrentPlan.duration == 6 ? CurrentPlan.duration+3 : CurrentPlan.duration;
    document.getElementById("durationID").innerHTML = CurrentPlan.duration;
}

function showNotes(){
    switch(CurrentPlan.currentBank.name){
    case "BPI Regular":
    case "BPI Zero %":{
        document.getElementById("footnoteID").innerHTML = "*Minimum purchase amount is &#8369;3000";
    }
    default:
        document.getElementById("footnoteID").innerHTML = "";
    }
}
