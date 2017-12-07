
// shuffling array 
// https://www.frankmitchell.org/2015/01/fisher-yates/
// https://www.npmjs.com/package/shuffle-array
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// https://css-tricks.com/snippets/javascript/shuffle-array/

$('document').ready(function() {
card_colors = ['hsl(25,85%,65%)',
                    'hsl(55,85%,65%)',
                    'hsl(90,85%,65%)',
                    'hsl(160,85%,65%)',
                    'hsl(220,85%,65%)',
                    'hsl(265,85%,65%)',
                    'hsl(310,85%,65%)',
                    'hsl(360,85%,65%)',
                ];
    // build array of 8 unique random numbers from 1 to 8
    var numbers = [];
    while (numbers.length < 8) {
        var j = Math.floor(Math.random() * 8) + 1;
        if (numbers.indexOf(j) === -1) {
            numbers.push(j);
        }
    }

    // pair numbers with background-color
    var num_color_pairs = numbers.map(number => {
        return {number: number, color: card_colors[number - 1]};
    });
    // num_color_pairs = num_color_pairs.concat(num_color_pairs);
    num_color_pairs = shuffle(num_color_pairs.concat(num_color_pairs));

    function getColor(number) {
        var nc_pair = num_color_pairs.find(pair => pair.number == number);
        return nc_pair.color;
    }

    var cards = $('.card');

    // assign value and color
    var i = 0;
    $.each(cards, function(i, card) {
        var num_color_pair = num_color_pairs[i];  //.pop();
        i++;
        var background_color = num_color_pair.color;
        $(card).text(num_color_pair.number);
        // $(card).css('backgroundColor', background_color);
    });

    var card_match = 0;
    var $card_match;
    var can_play = true;
    
    // reveal number on click
    $('.card').click(function() {
        if (can_play && !$(this).hasClass('card-reveal')) {
        
            var card_number = Number($(this).text());
            var background_color = getColor(card_number);
            $(this).css('backgroundColor', background_color)
            $(this).addClass('card-reveal');

            if (card_match === 0) { // start of new game or after a match
                card_match = card_number;
                $card_match = $(this);

            } else if (card_match === card_number) {
                can_play = false
                $(this).addClass('card-match');
                $(this).css('backgroundColor', 'rgb(153, 153, 153)');
                $card_match.css('backgroundColor', 'rgb(153, 153, 153)');
                card_match = 0;
                can_play = true;
            } else {
                can_play = false
                setTimeout( () => {
                    $(this).removeClass('card-reveal');
                    $(this).css('backgroundColor', 'rgb(32, 64, 86)');
                    // $(this).addClass('hide');    
                    can_play = true;
                } ,500);
            }
        }
    });
});
