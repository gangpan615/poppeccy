var img = document.getElementById("poppeccy");
var count = document.getElementById("score");
var malaysiaScore = document.getElementById('my_score');
var score = 0;
var MyScore = 10000;
var audio = new Audio('pop.mp3');
var hk_score = 1000, tw_score = 430, th_score = 200, jp_score = 150, fi_score = 250, se_score = 100, pl_score = 500, dm_score = 280, id_score=590, hu_score=319, sr_score = 300; 

$(document).ready(function() {

    // mouseclick event
    img.addEventListener("mousedown", function(){
        increaseScore();
        img.src = 'popcat2.png';
        audio.play();
    });
        
    img.addEventListener("mouseup", function(){
        img.src = 'popcat1.png';
    });

    // touch event
    img.addEventListener("touchstart", function(){
        increaseScore();
        img.src = 'popcat2.png';
        audio.play();
    });

    img.addEventListener("touchmove", function(){
        img.src = 'popcat1.png';
    });

    var type = navigator.appName;
    if (type == 'Netscape') {
        var lang = navigator.language;
    } else {
        var lang = navigator.userLanguage;
    }

    var country_code = lang.substr(3, 5);
    console.log(country_code);

    $("#poppeccy").click(function() {
        $.ajax({
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify({count: 1}),
            url: "https://d3knqszg9e3hle.cloudfront.net/pops/" + country_code,
            success: function(data){
                console.log("Success", data);
            },
            error: function(data){
                console.log("Error", data);
            }
        });

    });

    // GET data list
    getPops();

});

function increaseScore(){

    document.getElementById("score").innerHTML = ++score;

    var type = navigator.appName;
    if (type == 'Netscape') {
        var lang = navigator.language;
    } else {
        var lang = navigator.userLanguage;
    }

    country_code = lang.substr(3, 5);
    document.getElementById("score_" + country_code).innerHTML = ++document.getElementById("score_" + country_code).innerHTML;
    
}

function getPops() {
    $.ajax({
        type: "GET",
        url: "https://d3knqszg9e3hle.cloudfront.net/pops",
        success: function(data){
            result_list = data.Items;
            total = 0;
            
            for(i=0; i<result_list.length; i++){
                location_code = result_list[i].location;
                count = result_list[i].count;
                
                try {
                    document.getElementById("score_" + location_code).innerHTML = count;
                    total += count;
                    document.getElementById("score_worldwide").innerHTML = total;
                    
                } catch(err) {
                    console.log("unknown location code");
                }
                    
            }
        },
        error: function(data){
            console.log("Error", data);
        }
    })
}