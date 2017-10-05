var config = {
    apiKey: "AIzaSyD5guEG1YSqmKhqcr_J4ML5PtG0OVQPTJE",
    authDomain: "train-schedule-3918b.firebaseapp.com",
    databaseURL: "https://train-schedule-3918b.firebaseio.com",
    projectId: "train-schedule-3918b",
    storageBucket: "train-schedule-3918b.appspot.com",
    messagingSenderId: "293576123647"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit").on("click", function() {
    var TrainName = $("#InputTrainName").val();
    var Destination = $("#InputDestination").val();
    var FirstTrainTime = $("#InputFirstTrainTime").val();
    var Frequency = $("#InputFrequency").val();


    database.ref().push({
      Name: TrainName,
      Dest: Destination,
      FirstTime: FirstTrainTime,
      Freq: Frequency
    });


    $("#InputTrainName").val("");
    $("#InputDestination").val("");
    $("#InputFirstTrainTime").val("");
    $("#InputFrequency").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  var trainData = childSnapshot.val().Name;
  var destData = childSnapshot.val().Dest;
  var nextData= childSnapshot.val().FirstTime;
  var freqData = childSnapshot.val().Freq;

  var tStart = nextData;
  var tFrequency = freqData;

// First Time Train from user?
    var firstTimeConverted = moment(tStart, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted + "#InputFirstTrainTime");

// Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

// Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("Next Train" + nextTrain);
  



  $("#infoTable").append("<tr><td>" + trainData + "</td><td>" + destData + "</td><td>" +
  freqData + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</tr>");

});
