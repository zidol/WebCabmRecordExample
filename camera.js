//dom
const recordButton = document.querySelector(".record-button");
const stopButton = document.querySelector(".stop-button");
const playButton = document.querySelector(".play-button");
const downloadButton = document.querySelector(".download-button");

const previewPlayer = document.querySelector("#preview");
const recordingPlayer = document.querySelector("#recording");

let recorder;
//녹화 할 내용 담는 변수
let recordedChunks;

//functions
function vodeoStart() {
    navigator.mediaDevices.getUserMedia({video:true, audio:true})
    .then(stream => {
        previewPlayer.srcObject = stream;
        startrecording(previewPlayer.captureStream())
    })
    console.log(navigator)
}

//녹화
function startrecording(stream) {
    recordedChunks = [];
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {recordedChunks.push(e.data)}
    recorder.start();
}

function stopRecording() {
    previewPlayer.srcObject.getTracks().forEach(track => track.stop());
    recorder.stop();
    console.log(recordedChunks)
}

function playRecording() {
    const recordedBlob = new Blob(recordedChunks, {type: "video/webm"});
    recordingPlayer.src = URL.createObjectURL(recordedBlob);
    recordingPlayer.play();
    downloadButton.href = recordingPlayer.src;
    downloadButton.download = `recording_${new Date()}.webm`;
    console.log(recordingPlayer.src);
}

//event
recordButton.addEventListener("click", vodeoStart);
stopButton.addEventListener("click", stopRecording);
playButton.addEventListener("click", playRecording);