// client-side scripting
// use to change table display

const option = document.getElementById('filterOut');
const table = document.getElementById('displayPoiTable');

var previous = [];

option.addEventListener('change', function() {
  if (previous.length !== 0) {
    var row = document.getElementById(this.value);
    row.parentNode.appendChild(previous);
    previous = row;
    row.parentNode.removeChild(row);
  }
  else if(previous.length === 0) {
    var row = document.getElementById(this.value);
    previous = row;
    row.parentNode.removeChild(row);
  }
});