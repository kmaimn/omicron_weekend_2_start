//prev and next buttons will append to the dom on doc ready
$(document).ready(function () {
    $('#container').append('<button class="prev">Previous</button>' + '<button class="next">Next</button>');
    $('.next').on('click', moveNext);
    $('.prev').on('click', moveBack);

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
                $('#container').append('<div class="boxes"></div>');
                var $bx = $('#container').children().last();
            }

            //the info is initially hidden so that the buttons can cycle through
            $('#information').children().hide();
            $('#information div:first').show();
        }
    });

    // addbuttons();
    //I'm not sure this is the best code.. I can't get the last move next to move directly to the first div.
    function moveNext() {
        if ($('#information div:visible').next().length !== 0) {
            $('#information div:visible').next().show().prev().hide();
        } else {
            $('#information div:visible').hide();
            $('#information div:first').show();
        }
    }

    function moveBack() {
        if ($('#information div:visible').prev().length !== 0) {
            $('#information div:visible').prev().show().next().hide();
        } else {
            $('#information div:visible').hide();
            $('#information div:last').show();
        }
    }
//I still need to add a toggleClass function and connect it to my button clicks in order for the circles to change colors upon click;

});
