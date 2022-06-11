img="";
Status="";
objects= [];

function setup() {
    canvas= createCanvas(380,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380,380)
    video.hide();
}

function start() {
    objectDetector= ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects...";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status="true";
    
}

function preload(){
    song = loadSound("rename.mp3");
}

function draw(){
    image(video,0,0,640,420);
  
    if(objects.length == "person"){
objectDetector.detect(video,gotResults);

r= random(255);
g= random(255);
b= random(255);

for(i=0; i < objects.length; i++){
document.getElementById("status").innerHTML= "Status: Baby";


fill(r,g,b);
percent= floor(objects[i].confidence * 100);
text(objects[i].label + " " + percent + "%" , objects[i].x + 15,objects[i].y - 15);
noFill();
stroke(r,g,b);
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

song.play();
song.setVolume(1);
song.rate(1);
}
    }
}

function gotResults(error,results){
if (error==true) {
    console.log(error);
} else {
    console.log(results);
    objects= results;
}
}