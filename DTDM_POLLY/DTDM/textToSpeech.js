 // set the focus to the input box
    document.getElementById("input").focus();

    /**
     * Change the region and endpoint.
     */
    AWS.config.region = 'us-east-1'; // Region

    AWS.config.credentials = new AWS.Credentials("AKIA3KX46GCXRRBEYPEW", "cqtgDFkq/2X64ax1oVRPnQ+SB8sEdX7OEw9lVfXt");

    var translate = new AWS.Translate({region: AWS.config.region});
    var polly = new AWS.Polly();


    function doSynthesize(text, languageCode) {
        var voiceId;
        var textType = "text";
        // Get the checkbox
        var checkBox = document.getElementById("toggle");

        // If the checkbox is checked, display the output text
        if (checkBox.checked == true) {
            textType = "ssml"

        }
        switch (languageCode) {
            case"En-US":
                voiceId = "Matthew";
                break;
            case"En-UK":
                voiceId = "Emma";
                break;
            case"En-AU":
                voiceId = "Russell";
                break;
            case"Japanese":
                voiceId = "Takumi";
                break;
            case"Korean":
                voiceId = "Seoyeon";
                break;
            case"Norwegian":
                voiceId = "Liv";
                break;
            case"Polish":
                voiceId = "Male";
                break;
            case"Spanish":
                voiceId = "Lucia";
                break;
            case"Russian":
                voiceId = "Maxim";
                break;
            case"Dutch":
                voiceId = "Ruben";
                break;
            case"Danish":
                voiceId = "Vitoria";
                break;
            case"Chinese":
                voiceId = "Zhiyu";
                break;
            case"Arabic":
                voiceId = "Zeina";
                break;
            case"Hindi":
                voiceId = "Aditi";
                break;
            case"French":
                voiceId = "Mathieu";
                break;
            case"German":
                voiceId = "Marlene";
                break;
            case"Icelandic":
                voiceId = "Karl";
                break;
            case"Italian":
                voiceId = "Bianca";
                break;
            default:
                voiceId = null;
                break;
        }
        if (!voiceId) {
            alert("Speech synthesis unsupported for language code: \"" + languageCode + "\"");
            return;
        }
        var params = {
            OutputFormat: "mp3",
            SampleRate: document.querySelector("#rate").value,
            Text: text,
            TextType: textType,
            VoiceId: voiceId
        };
        polly.synthesizeSpeech(params, function (err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
                alert("Error calling Amazon Polly. " + err.message);
            } else {
                var uInt8Array = new Uint8Array(data.AudioStream);
                var arrayBuffer = uInt8Array.buffer;
                var blob = new Blob([arrayBuffer]);
                var url = URL.createObjectURL(blob);
                document.getElementById('audioSource').src = url;
                document.getElementById('audioPlayback').load();
                document.getElementById('audioPlayback').play();
            }
        });
    }

    function isCheckedById(id) {
        alert(id);
        var checked = $("input[@id=" + id + "]:checked").length;
        alert(checked);

        if (checked == 0) {
            return false;
        } else {
            return true;
        }
    }
     function doSynthesizeInput() {
        var text = document.getElementById('input').value.trim();
        if (!text) {
            return;
        }
        var sourceLanguageCode = document.getElementById("voices").value;
        doSynthesize(text, sourceLanguageCode);
    }

    document.querySelector("#cancel").addEventListener("click", () => {
        document.getElementById('input').value = "";
        document.getElementById('audioSource').src = "";
        document.getElementById('fileToLoad').value=""
        document.getElementById('audioPlayback').load();
        document.getElementById('audioPlayback').stop();
    });
    document.querySelector("#rate").addEventListener("input", () => {
        // Get rate Value from the input
        const rate = document.querySelector("#rate").value;

        // Set rate property of the SpeechSynthesisUtterance instance
        speech.rate = rate;

        // Update the rate label
        document.querySelector("#rate-label").innerHTML = rate;
    });
function loadFileAsText(){
  var fileToLoad = document.getElementById("fileToLoad").files[0];

  var fileReader = new FileReader();
  fileReader.onload = function(fileLoadedEvent){
      var textFromFileLoaded = fileLoadedEvent.target.result;
      document.getElementById("input").value = textFromFileLoaded;
  };

  fileReader.readAsText(fileToLoad, "UTF-8");
}

