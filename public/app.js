//Grab the article data from mongo
$("#start").click(function (event) {

    event.preventDefault();
    $("#tableBody").html();

    // var articleTitle = $("<td>");
    // var articleSummary = $("<td>");
    // var articleLink = $("<td>");

    $.getJSON("/article", function (data) {
        //Only scrape for first five news
        for (var i = 0; i < 5; i++) {
            //Assign ID for each table row from mongo db
            var tableRow = $("<tr data-id='" + data[i]._id + "'>")
            tableRow.append("<td>" + data[i].title + "</td>");
            tableRow.append("<td>" + data[i].summary + "</td>");
            tableRow.append("<td> <a target='_blank' href='https://www.foxnews.com/" + data[i].link + "'/a>https://www.foxnews.com/"+data[i].link +"</td>");
            tableRow.append("<button id='addNote' data-id='"+data[i]._id+"'>Click to add Note</button>");
            $("#tableBody").append(tableRow);
        }

    })

})

$(document).on("click", "#addNote", function() {
    event.preventDefault();

    var thisID = $(this).attr("data-id");
    console.log("id: ", thisID);

});
