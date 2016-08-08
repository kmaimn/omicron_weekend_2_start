//created an empty array to hold the information from the JSON thing;
var omicron = [];
//created a variable to be used as a marker for the current person/index we're looking at;
var currentOmicron = 0;

$(document).ready(function(){
//run my load function, which gets the data from the JSON thing and also runs two other functions;
  load();

//set the listeners for my buttons;
  $('.next').on('click', nextOmicron);
  $('.prev').on('click', prevOmicron);

  function load(){
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
        omicron = data.omicron;
        console.log(omicron);
//call two functions that will run along with the load function
        addOmicron();
        createCircles();
      }
    });
  }
//define function that will display the text in the defined areas
  function addOmicron(){
//set omi variable to point at the array; i can pull from the array because the function is being called in the .ajax area; set github var for input - i couldnt figure out how to get the link to work with attr();
    var omi = omicron[currentOmicron];
    var github = "http://github.com/" + omi.git_username;
    $('#name').text(omi.name);
    $('#git').text(github);
    $('#shoutout').text(omi.shoutout);
  }
//create the circles at the bottom using a for loop; append each circle with p tags..might not be the best? kept as p so I could style;
//used data function to assign an index number to each circle so that I can compare later;
    function createCircles(){
      for (var i = 0; i < omicron.length; i++) {
        $('#circles').append('<p>' + i + '</p>');
        $('#circles').children().last().data("index", i);
      }
//call update circles to update based on the start - 0 index (tyler)
      updateCircles();
    }
//update circles will update the class of the circle based on who is being click on; will compare the currentOmi with the index number;
    function updateCircles() {
      $('#circles').children().each(function(i, item) {
        if($(this).data("index") == currentOmicron){
          $(this).addClass('active');
        }else{
          $(this).removeClass('active');
        }
      })
    }
//button function: will increment based on clicks, but if it goes over 16, it will reset; will also run the addOmi to replace the next info and update circles to make the current one red;
  function nextOmicron(){
    currentOmicron++;
    if(currentOmicron >= omicron.length){
      currentOmicron = 0;
    }
    console.log(currentOmicron);
    addOmicron();
    updateCircles();
  }

  function prevOmicron(){
    currentOmicron--;
    if(currentOmicron < 0){
      currentOmicron = omicron.length - 1;
    }
    console.log(currentOmicron);
    addOmicron();
    updateCircles();
  }


});
