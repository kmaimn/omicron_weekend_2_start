//prev and next buttons will append to the dom on doc ready
$(document).ready(function () {
    $('#container').append('<button class="prev">Previous</button>' + '<button class="next">Next</button>');
    $('.next').on('click', moveNext);
    $('.next').on('click', moveCircleNext);
    $('.prev').on('click', moveBack);
    $('.prev').on('click', moveCircleBack);

    $.ajax({
        type: 'GET',
        url: '/data',
        //for loop will run through the data and append a div to the dom; i added a unique identifer to possibily take on the pro level, but got stuck on adding functionality to my buttons;
        success: function(data) {
            for (var i = 0; i < data.omicron.length; i++) {
                $('#information').append('<div class="person" id="primer' + i + '"></div>');
                var $el = $('#information').children().last();
                $el.append('<h2 class="name">' + data.omicron[i].name + '</h2>');
                $el.append('<p class="github">GitHub Link: http://www.github.com/' + data.omicron[i].git_username + '</p>');
                $el.append('<p class="shoutout">Shoutout: ' + data.omicron[i].shoutout + '</p>');
                $('#circles').append('<div class="boxes" id="box' + i +'"></div>');
                var $bx = $('#circles').children().last();
                $bx.append('<p></p');
            }

            //the info is initially hidden so that the buttons can cycle through
            $('#information').children().hide();
            $('#information div:first').show();
            $('#circles').children().hide();
            $('#circles div:first').show();
        }
    });
//created a click counter to follow the div position of the circles;
    // var clickCount = 0;
    //
    // function clickCounterAdd(){
    //   if(clickCount < 17){
    //     clickCount ++;
    //   }else if(clickCount = 17){
    //     clickCount = 1;
    //   }
    //   console.log(clickCount);
    // }
    //
    // function clickCounterSub(){
    //   if(clickCount > 0){
    //     clickCount --;
    //   }else if(clickCount = -1){
    //     clickCount = 17;
    //   }
    //   console.log(clickCount);
    // }
    // addbuttons();
    //I'm not sure this is the best code.. I can't get the last move next to move directly to the first div.
    function moveNext() {
        if ($('#information div:visible').next().length !== 0) {
            $('#information div:visible').next().show().prev().hide();
            // current();
        } else {
            $('#information div:visible').hide();
            $('#information div:first').show();
        }
    }

    function moveBack() {
        if ($('#information div:visible').prev().length !== 0) {
            $('#information div:visible').prev().show().next().hide();
            // current();
        } else {
            $('#information div:visible').hide();
            $('#information div:last').show();
        }
    }
    // tried to replicate the same stuff as the display for prime info;
    function moveCircleNext() {
        if ($('#circles div:visible').next().length !== 0) {
            $('#circles div:visible').next().show();
            // current();
        } else {
            $('#circles div:visible').hide();
            $('#circles div:first').show();
        }
    }

    function moveCircleBack() {
        if ($('#circles div:visible').prev().length !== 0) {
            $('#circles div:visible').prev().show().next().hide();
            // current();
        } else {
            $('#circles div:visible').hide();
            $('#circles div:last').show();
        }
    }

//created a current function that will toggle the class of the .box div concatenated with the current click count;
    // function current() {
    //   $('#box' + clickCount).toggleClass('currentBox');
    //   $('#box' + (clickCount -1)).toggleClass('currentBox');
    // }

//I still need to add a toggleClass function and connect it to my button clicks in order for the circles to change colors upon click;



});
