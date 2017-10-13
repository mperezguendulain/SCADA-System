/*
* Autores:  Martín Alejandro Pérez Güendulain
*           Ángel Roberto Móntez Murgas
*/

let socket;

window.onload = function() {
    socket = io();
    let trama_parts;
    socket.on('trama', (trama) => {
        trama_parts = trama.split(":");
        if(trama_parts[0][0] == "p")
            setValuePot(trama_parts[0][1], parseInt(trama_parts[1]));
        else {
            if(trama_parts[1][0] == "0")
                setValueSwitch(trama_parts[0][1],  true);
            else
                setValueSwitch(trama_parts[0][1],  false);
        }
    });
}

let ledRed = false;
let ledYellow = false;
let ledGreen = false;

// Control de Leds

function toggleLedRed() {
    if(ledRed == false) {
        $("#ledRojo").removeClass("luz-off-red");
        $("#ledRojo").addClass("luz-on-red");
        socket.emit('ledDig-power', {color: "r", valor: "001"});
    } else {
        $("#ledRojo").removeClass("luz-on-red");
        $("#ledRojo").addClass("luz-off-red");
        socket.emit('ledDig-power', {color: "r", valor: "000"});
    }
    ledRed = !ledRed;
}

function toggleLedYellow() {
    if(ledYellow == false) {
        $("#ledAmarillo").removeClass("luz-off-yellow");
        $("#ledAmarillo").addClass("luz-on-yellow");
        socket.emit('ledDig-power', {color: "a", valor: "001"});
    } else {
        $("#ledAmarillo").removeClass("luz-on-yellow");
        $("#ledAmarillo").addClass("luz-off-yellow");
        socket.emit('ledDig-power', {color: "a", valor: "000"});
    }
    ledYellow = !ledYellow;
}

function toggleLedGreen() {
    if(ledGreen == false) {
        $("#ledVerde").removeClass("luz-off-green");
        $("#ledVerde").addClass("luz-on-green");
        socket.emit('ledDig-power', {color: "v", valor: "001"});
    } else {
        $("#ledVerde").removeClass("luz-on-green");
        $("#ledVerde").addClass("luz-off-green");
        socket.emit('ledDig-power', {color: "v", valor: "000"});
    }
    ledGreen = !ledGreen;
}

// Control de Potenciometros

function changeValuePot1() {
    $("#txtValueLedR").html($("#pot1").val());
}

function sendValuePot1() {
    let value = $("#pot1").val().toString();
    while(value.length < 3)
        value = "0".concat(value);
    socket.emit('ledPwm', {color: "r", valor: value});
}

function changeValuePot2() {
    $("#txtValueLedA").html($("#pot2").val());
}

function sendValuePot2() {
    let value = $("#pot2").val().toString();
    while(value.length < 3)
        value = "0".concat(value);
    socket.emit('ledPwm', {color: "a", valor: value});
}

function changeValuePot3() {
    $("#txtValueLedV").html($("#pot3").val());
}

function sendValuePot3() {
    let value = $("#pot3").val().toString();
    while(value.length < 3)
        value = "0".concat(value);
    socket.emit('ledPwm', {color: "v", valor: value});
}

function setValuePot(index_pot, value) {
    $("#pb" + index_pot).css("width", (value/1023)*100 + "%");
    $("#txtValuePot" + index_pot).html(value);
}

function setValueSwitch(index_switch, value) {
    $("#switch" + index_switch).prop('checked', value);
}
