//https://teachablemachine.withgoogle.com/models/qyoF44L8f/model.json


let classifier;
let isClassifying = false;

function StartClassification() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            console.log('Microphone access granted.');
            classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/qyoF44L8f/model.json', modelReady);
        })
        .catch(function(err) {
            console.error('Microphone access denied:', err);
        });
}

function modelReady() {
    console.log('Model Loaded!');
    isClassifying = true;
    classifier.classify(gotResults);

    // Stop classification after 20 seconds
    setTimeout(stopClassification, 20000);
}

function stopClassification() {
    isClassifying = false;
    console.log('Classification stopped.');
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
        return;
    }

    if (!isClassifying) return;

    console.log(results);
    let label = results[0].label;
    let confidence = (results[0].confidence * 100).toFixed(2);

    document.getElementById('result_label').innerText = `I can Hear- ${label}`;
    document.getElementById('result_confidence').innerText = `Accuracy- ${confidence}%`;

    const animalImage = document.getElementById("animalImage");

    if (label === "Barking") {
        animalImage.src = "dog.jpg";
    } else if (label === "Meowing") {
        animalImage.src = "cat.jpg";
    } else if (label === "Mooing") {
        animalImage.src = "cow.jpg";
    } else if (label === "Roaring") {
        animalImage.src = "lion.jpg";
    } else {
        animalImage.src = "bg.jpg";
    }
}

document.getElementById('startButton').addEventListener('click', () => {
    StartClassification();
    document.getElementById('startButton').disabled = true;
    document.getElementById('startButton').textContent = "Recording...";
});
