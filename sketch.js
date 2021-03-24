//Written by William Luk
// posts data to an Adafuit.io feed
let url = 'https://io.adafruit.com/api/v2/kovacchr/feeds/testdata/data';
// let url2 = 'https://io.adafruit.com/api/v2/kovacchr/feeds/testdata';
let url2 = 'https://io.adafruit.com/api/v2/kovacchr/feeds/button';

var data = 0;
var wData = 0;
var count = 0;
var counter = 0;
var buttonChange = 1;
var lastValue = 0;

function setup() {
  sketchWidth = document.getElementById("canvasArea");
  sketchHeight = document.getElementById("canvasArea");
    var myCanvas = createCanvas(sketchWidth, sketchHeight);
    myCanvas.parent("canvasArea");

    myButton = createButton('Click me to turn on the LED!');
    myButton.parent("canvasArea");
    myButton.mousePressed(press);
    myButton.mouseReleased(off);
}

function draw() {
    background(120);
    fill(255, 10);
rect(0, 0, width, height);
if (counter % 80 == 0) {
    getData();
    changePhysicalButton();
}
counter++;
}
// if(buttonChange === 0){
//   buttonChangeDo();
// }

function press() {
    wData = 1;
    obj.testVar = 1;
    console.log("Web Button = " + wData);
    sendData(wData);
}

function off() {
    wData = 0;
    obj.testVar = 0;
    console.log("Web Button = " + wData);
    sendData(wData);
}

function getData() {
    let data;
    httpGet(url2, 'json', function (response) {
        // console.log(response);
        data = response.last_value;
        let resize = map(data, 1, 0, 25, 150);
        noStroke();
        fill(255, 0, 0);
        ellipse(width / 2, height / 2, resize);
        // console.log("Physical Button = " + data);
        buttonChange = data;
    });
}

function sendData(turnOn) {
    let postData = {
        "value": turnOn,
        "X-AIO-Key": "AIO KEY INSERT HERE"
    };
    httpPost(url, 'json', postData, function (result) {
        // console.log(result);
    });
}


function changePhysicalButton() {
// console.log("this is " + buttonChange)
if(buttonChange != lastValue){
  console.log("Physical Button Change = " + buttonChange);
  obj2.testVar = buttonChange;
  lastValue = buttonChange;

}

}
