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

var textAreaText = ['', '', '', '', '', '', '', '', '', '']

var time;
var currentHour;

function getFromLocal() {

  var retrieveData = JSON.parse(localStorage.getItem('savedData'))

  if (retrieveData !== null) {

    textAreaText = retrieveData

    for (var i = 0; i < textArea.length; i++) {
    textArea[i].text(textAreaText[i])
    }
  }
}

function saveToLocal(index) {

  textAreaText[index] = textArea[index].val()

  var stringData = JSON.stringify(textAreaText)
  localStorage.setItem('savedData', stringData)
}

function updateClock() {
  time = dayjs().format('MM/DD/YYYY HH:mm:ss');
  currentHour = dayjs().format('HH')
  $('#currentDay').text(time)
  changeColor(currentHour);
  setTimeout(updateClock, 1000)
}



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

$('button').on('click', function(){
  var index = $(this).data('index')-1
  saveToLocal(index)
  console.log(index)
})


updateClock();
changeColor();
getFromLocal();