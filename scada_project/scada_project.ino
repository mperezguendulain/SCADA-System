/*
*   Sketch: Systema SCADA
*   Autores:    Martín Alejandro Pérez Güendulain
*               Angel Robeto Montez Murgas
*/

// Entradas Analógicas
#define POT1 A2
#define POT2 A1
#define POT3 A0

// Entradas Digitales
#define SWITCH1 10
#define SWITCH2 11
#define SWITCH3 12
#define SWITCH4 13

// Salidas
#define ledPwmRojo 5
#define ledPwmAzul 6
#define ledPwmVerde 9

#define ledRojo 2
#define ledAmarillo 3
#define ledVerde 4


void setup() {
    pinMode(POT1, INPUT);
    pinMode(POT2, INPUT);
    pinMode(POT3, INPUT);

    pinMode(SWITCH1, INPUT);
    pinMode(SWITCH2, INPUT);
    pinMode(SWITCH3, INPUT);
    pinMode(SWITCH4, INPUT);

    pinMode(ledPwmRojo, OUTPUT);
    pinMode(ledPwmAzul, OUTPUT);
    pinMode(ledPwmVerde, OUTPUT);

    pinMode(ledRojo, OUTPUT);
    pinMode(ledAmarillo, OUTPUT);
    pinMode(ledVerde, OUTPUT);

    Serial.begin(9600);
}

int pot1, pot2, pot3;
int pot1_ant = -1, pot2_ant = -1, pot3_ant = -1;
int switch1, switch2, switch3, switch4;
int switch1_ant = -1, switch2_ant = -1, switch3_ant = -1, switch4_ant = -1;

char cmd[20];
int numsBytesRec;
int value;
void loop() {
    if(Serial.available() > 0)
    {
        numsBytesRec = Serial.readBytesUntil(13,cmd,20); // read bytes (max. 20) from buffer, untill <CR> (13). store bytes in data. count the bytes recieved.
        if(cmd[0] == 'n') {
            if(cmd[1] == 'r')
                digitalWrite(ledRojo, atoi(cmd+2));
            else if(cmd[1] == 'a')
                digitalWrite(ledAmarillo, atoi(cmd+2));
            else
                digitalWrite(ledVerde, atoi(cmd+2));
        } else {
            value = atoi(cmd+2);
            if(cmd[1] == 'r') {
                analogWrite(ledPwmRojo, value);
                Serial.print(value);
            }
            else if(cmd[1] == 'a') {
                analogWrite(ledPwmAzul, value);
                Serial.print(value);
            }
            else {
                analogWrite(ledPwmVerde, value);
                Serial.print(value);
            }
        }
        Serial.flush();
    }



    pot1 = analogRead(POT1);
    pot2 = analogRead(POT2);
    pot3 = analogRead(POT3);

    switch1 = digitalRead(SWITCH1);
    switch2 = digitalRead(SWITCH2);
    switch3 = digitalRead(SWITCH3);
    switch4 = digitalRead(SWITCH4);



    sendPotValues();
    sendSwitchValues();



    pot1_ant = pot1;
    pot2_ant = pot2;
    pot3_ant = pot3;

    switch1_ant = switch1;
    switch2_ant = switch2;
    switch3_ant = switch3;
    switch4_ant = switch4;

    delay(1);
}

void sendPotValues() {
    if(pot1 != pot1_ant) {
        Serial.print("p1:");
        Serial.println(pot1);
        delay(2);
    }
    if(pot2 != pot2_ant) {
        Serial.print("p2:");
        Serial.println(pot2);
        delay(2);
    }
    if(pot3 != pot3_ant) {
        Serial.print("p3:");
        Serial.println(pot3);
        delay(2);
    }
}

void sendSwitchValues() {
    if(switch1 != switch1_ant) {
        Serial.print("s1:");
        Serial.println(switch1);
        delay(2);
    }
    if(switch2 != switch2_ant) {
        Serial.print("s2:");
        Serial.println(switch2);
        delay(2);
    }
    if(switch3 != switch3_ant) {
        Serial.print("s3:");
        Serial.println(switch3);
        delay(2);
    }
    if(switch4 != switch4_ant) {
        Serial.print("s4:");
        Serial.println(switch4);
        delay(2);
    }
}
