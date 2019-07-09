//Grab the article data from mongo
$("#start").click(function(event){

    event.preventDefault();
    $("#tableBody").html();
    tableRow = $("<tr>")
    var articleTitle = $("<td>");
    var articleSummary = $("<td>");
    var articleLink = $("<td>");
    var articleNotes = $("<td>");

    $.getJSON("/article", function(data){
        //Only scrape for first five news
        for (var i = 0; i < 5; i++){
            articleTitle.append(data[i].title);
            articleSummary.append(data[i].summary);
            articleLink.append(data[i].link);

            tableRow.append(articleTitle, articleSummary, articleLink);    
            $("#tableBody").append(tableRow);
        }
    })

})
