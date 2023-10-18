$(document).ready(function () {
    $("#search-btn").on("click", function () {
        const userInp = $("#user-inp").val();

        if (userInp.trim() !== "") {
            const settings = {
                async: true,
                crossDomain: true,
                url: `https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=${userInp}`,
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '459369c516mshfa57b82cae3e3b3p1b41a1jsn79b5694f966a',
                    'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
                }
            };

            $.ajax(settings).done(function (response) {
                // Handle the API response 
                if (response && response.length > 0) {
                    // Process the data and update page
                    let resultContainer = $("#result");

                    // Display the response as a list
                    const resultList = $("<ul>");
                    response.forEach(function (item) {
                        const listItem = $("<li>").text(item.name);
                        resultList.append(listItem);
                    });

                    resultContainer.append(resultList);
                } else {
                    // If no results are found
                    const resultContainer = $("#result");
                    resultContainer.html("<p>No recipes found for the given ingredient</p>");
                }
            });
        }
    });
});
