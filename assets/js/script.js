$(document).ready(function () {
    $("#search-btn").on("click", function () {
        const userInp = $("#user-inp").val().trim();

        if (userInp !== "") {
            const settings = {
                async: true,
                crossDomain: true,
                url: `https://tasty.p.rapidapi.com/recipes/list?q=${userInp}&from=0&size=20`,
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '459369c516mshfa57b82cae3e3b3p1b41a1jsn79b5694f966a',
                    'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
                }
            };

            const resultContainer = $(".recipe-cards"); // Define result container

            $.ajax(settings)
                .done(function (response) {
                    if (response.results && response.results.length > 0) {
                        const recipesWithVideos = response.results.filter(function (item) {
                            return item.renditions && item.renditions.length > 0;
                        });

                        if (recipesWithVideos.length > 0) {
                            // Clear previous results
                            resultContainer.empty();

                            recipesWithVideos.forEach(function (item) {
                                // Create a recipe card for each result
                                const recipeCard = $("<div>").addClass("recipe-card");

                                // Recipe image (you can use item.poster_url or other image source)
                                const recipeImage = $("<img>")
                                    .addClass("recipe-image")
                                    .attr("src", "https://example.com/recipe-image.jpg")
                                    .attr("alt", item.name);

                                // Recipe name as a clickable link to the video
                                const videoLink = $("<a>")
                                    .attr("href", item.renditions[0].url)
                                    .attr("target", "_blank")
                                    .text(item.name);

                                // Additional information (e.g., description)
                                const recipeInfo = $("<div>")
                                    .addClass("recipe-info")
                                    .text(`Description: ${item.description}`);

                                // Append elements to the recipe card
                                recipeCard.append(recipeImage, videoLink, recipeInfo);
                                resultContainer.append(recipeCard);
                            });
                        } else {
                            resultContainer.html("<p>No recipes with video links found for the given ingredient</p>");
                        }
                    } else {
                        resultContainer.html("<p>No recipes found for the given ingredient</p>");
                    }
                })
                .fail(function (xhr, status, error) {
                    resultContainer.html("<p>An error occurred while fetching data.</p>");
                });
        }
    });
});
