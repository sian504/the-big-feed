$(document).ready(function () {
    $("#search-btn").on("click", function () {
        const userInp = $("#user-inp").val();

        if (userInp.trim() !== "") {
            let settings = {
                async: true,
                crossDomain: true,
                url: "https://tasty.p.rapidapi.com/recipes/list",
                data: {
                    q: userInp, // q parameter for searching by name or ingredient
                    from: 0,    // Required parameters
                    size: 20,
                },
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '459369c516mshfa57b82cae3e3b3p1b41a1jsn79b5694f966a',
                    'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
                }
            };

            const resultContainer = $("#result"); 

            $.ajax(settings).done(function (response) {
                // Handle the API response 
                if (response && response.length > 0) {
                    // Process the data and update page
                    let resultContainer = $("#result");

                    // Display the response as a list
                    let resultList = $("<ul>");
                    response.forEach(function (item) {
                        let listItem = $("<li>").text(item.name);
                        resultList.append(listItem);
                    });

                    resultContainer.append(resultList);
                } else {
                    // If no results are found
                    let resultContainer = $("#result");
                    resultContainer.html("<p>No recipes found for the given ingredient</p>");
                }
            });
        }
    });
});
