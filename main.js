song1 = "";
song2 = "";
right_x = 0;
right_y = 0;
left_x = 0;
left_y = 0;
left_score  = 0;
right_score = 0;
song_status1 =  "";
song_status2 = "";




function preload()
{
 song1 =  loadSound("night_dancer.mp3");
  song2 = loadSound("starboy.mp3");
}

function setup(){
  canvas = createCanvas(640,480);
  canvas.center();

  video = createCapture(640,480);
  video.hide();

  pose_net = ml5.poseNet(video,modelLoaded);
pose_net.on('pose',gotResults);
}

function draw(){
  image(video,0,0,640,480);

  fill("#FF0000");
  stroke("#FF0000");
  
  song_status1 = song1.isPlaying();
  song_status2 = song2.isPlaying();


  //song1.play();

  if(left_score > 0.2){
    circle(left_x,left_y,15);
    song2.stop();

    if(song_status1 === false){
      song1.play();
      document.getElementById("song_name").innerHTML = "Night Dancer";

    }    
  }
  else{
    console.log("not bigger than 0.2");
    
  }

  if(right_score > 0.2){
    circle(right_x,right_y,15);
    song1.stop();

    if(song_status2 === false){
      song2.play();
      document.getElementById("song_name").innerHTML = "Starboy";

    }    
  }
  else{
    console.log("not bigger than 0.2");
    
  }



}

function modelLoaded(){
  console.log("model is initialized");

}

function gotResults(results, error){
if(error){
  console.log(error);

}
else if (results){
  console.log(results);

  if (results>0){
    console.log(results);
    right_x = results[0].rightWrist.x;
right_y = results[0].rightWrist.y;
left_x = results[0].leftWrist.x;
left_y = results[0].leftWrist.y;
left_score = results[0].pose.keypoints[9].score;
right_score = results[0].pose.keypoints[10].score;
console.log(right_x);
console.log(right_y);
console.log(left_x);
console.log(left_y);
console.log(left_score);
  }
}
}