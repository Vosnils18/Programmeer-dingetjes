
// Initialize the Image Classifier method with MobileNet
const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
let synth = window.speechSynthesis;
let model = false;

const image = document.getElementById('output')
const fileButton = document.querySelector("#file")

fileButton.addEventListener("change", (event)=>loadFile(event))

function loadFile(event) {
	image.src = URL.createObjectURL(event.target.files[0])
}

let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
    if(!model) {
        speak("still loading model");
    }else {
        classifyImage();
    }
  })

function modelLoaded() {
    console.log('Model Loaded!')
    model = true;
}

function classifyImage() {
    // Make a prediction with a selected image
    classifier.classify(document.getElementById('output'), (err, results) => {
        console.log(results);
        speak(`I am ${Math.round(results[0].confidence * 100)} percent sure this is a ${results[0].label}`)
    });
}

function speak(text) {
    if (synth.speaking) {
        console.log('still speaking...')
        return
    }
    if (text !== '') {
        let utterThis = new SpeechSynthesisUtterance(text)
        synth.speak(utterThis)
    }
}
