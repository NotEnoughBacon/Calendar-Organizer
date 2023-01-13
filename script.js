// We get the hour ids for each of the hours so we can log their data index for storage
var timeRows = [ 
  $('#hour-08'),
  $('#hour-09'),
  $('#hour-10'),
  $('#hour-11'),
  $('#hour-12'),
  $('#hour-13'),
  $('#hour-14'),
  $('#hour-15'),
  $('#hour-16'),
  $('#hour-17')
]

// These are the ids for text area in each of the hours so we can store the text data later
var textArea = [
  $('#textArea1'),
  $('#textArea2'),
  $('#textArea3'),
  $('#textArea4'),
  $('#textArea5'),
  $('#textArea6'),
  $('#textArea7'),
  $('#textArea8'),
  $('#textArea9'),
  $('#textArea10')
]

// An empty array so that we can store the text content in order of index
var textAreaText = ['', '', '', '', '', '', '', '', '', '']

var time;
var currentHour;

// This will pull the filled array from local storage and set the text content on screen to whatever was saved.
// If there is nothing saved it wont to anything to prevent an error on load
function getFromLocal() {

  var retrieveData = JSON.parse(localStorage.getItem('savedData'))

  if (retrieveData !== null) {

    textAreaText = retrieveData

    for (var i = 0; i < textArea.length; i++) {
    textArea[i].text(textAreaText[i])
    }
  }
}

// This saves the text content accoding to the data index value so that it is in order to where the user saved it at
function saveToLocal(index) {

  textAreaText[index] = textArea[index].val()

  var stringData = JSON.stringify(textAreaText)
  localStorage.setItem('savedData', stringData)
}

// This is the clock that both gets the full date to display at the top as well at the hour for resetting the classes in reference to the current time
// This will update every second to show a more accurate time at the top, as well as runs the change color function
function updateClock() {
  time = dayjs().format('MM/DD/YYYY HH:mm:ss');
  currentHour = dayjs().format('HH')
  $('#currentDay').text(time)
  changeColor(currentHour);
  setTimeout(updateClock, 1000)
}

// This takes in the current hour from the clock and depending on the row (I already have it set up to 24 hour time to make it easier)
// and removes all classes so that we can add the correct class
function changeColor (currentHour) {

  for (var i = 0; i < 10; i++) {

    var rowHour = i + 8;

    var colorCodedRows = timeRows[i]

    colorCodedRows.removeClass('past')
    colorCodedRows.removeClass('present')
    colorCodedRows.removeClass('future')

    if (rowHour < currentHour) {
      colorCodedRows.addClass('past')
    }
    else if (rowHour == currentHour) {
      colorCodedRows.addClass('present')
    }
    else if (rowHour > currentHour) {
      colorCodedRows.addClass('future')
    }
  }
}

// When you click a save button it will grab the data index of that row, so that we can save it to local storage later
$('button').on('click', function(){
  var index = $(this).data('index')-1
  saveToLocal(index)
  console.log(index)
})

// These are the starting functions for the clock, updating the color based on the time, and pulling any data that may be saved in local storage
updateClock();
changeColor();
getFromLocal();