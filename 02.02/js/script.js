$(document).ready(function(){
    var speed = 500;
    var change = true;
    var slideChange = 4000;
    // ustawiam 1slajd na aktywny
    $(".slide").first().addClass("active");

    //ukrywam wszystkie slajdy
    $(".slide").hide();

    //pokazuję aktywny slajd
    $(".active").show();

    $("#next").click(function(){
        //zmieniam nazwę klasy elementu z active na oldActive
        $(".active").removeClass("active").addClass("oldActive");
        //sprawdzam, czy slide nie jest ostatnim slajdem w kolejce
        if ($(".oldActive").is(":last-child")){
            //jest ostatni ustawiam klasę active na 1 slajdziie
            $(".slide").first().addClass("active");
        } else { //nie jest ostatni
            //kolejnemu elementowi nadaje klasę active
            $(".oldActive").next().addClass("active");
        }
        //usuwam zbędnego już oldActiv
        $(".oldActive").removeClass("oldActive");

        //chowamy slide
        $(".slide").fadeOut(speed);
        //pokazuje aktywny
        $(".active").fadeIn(speed);
    });
    $("#prev").click(function(){
        //zmieniam nazwę klasy elementu z active na oldActive
        $(".active").removeClass("active").addClass("oldActive");
        //sprawdzam, czy slide nie jest ostatnim slajdem w kolejce
        if ($(".oldActive").is(":first-child")){
            //jest ostatni ustawiam klasę active na 1 slajdziie
            $(".slide").last().addClass("active");
        } else { //nie jest ostatni
            //kolejnemu elementowi nadaje klasę active
            $(".oldActive").prev().addClass("active");
        }
        //usuwam zbędnego już oldActiv
        $(".oldActive").removeClass("oldActive");

        //chowamy slide
        $(".slide").fadeOut(speed);
        //pokazuje aktywny
        $(".active").fadeIn(speed);
    });
});