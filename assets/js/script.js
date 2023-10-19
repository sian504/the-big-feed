$(document).ready(function () {
    //Onclick function for search button that starts the API call 
    $("#search-btn").on("click", function () {
        const userInp = $("#user-inp").val().trim();

        //Tasty API settings

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

            //Function to check for recipes that match user input and filter results for those with video instructions

            const resultContainer = $(".recipe-cards");

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

                                // Recipe image
                                const recipeImage = $("<img>")
                                    .addClass("recipe-image")
                                    .attr("src", item.thumbnail_url)
                                    .attr("alt", item.name);

                                // Recipe name as a clickable link to the video
                                const videoLink = $("<a>")
                                    .attr("href", item.renditions[0].url)
                                    .attr("target", "_blank")
                                    .text(item.name);

                                // Recipe description
                                const recipeInfo = $("<div>")
                                    .addClass("recipe-info");

                                if (item.description !== null && item.description.trim() !== "") {
                                    recipeInfo.text(`Description: ${item.description}`);
                                } else {
                                    recipeInfo.text("Click the video link to find out more.");
                                }

                                // Append elements to the recipe card
                                recipeCard.append(recipeImage, videoLink, recipeInfo);
                                resultContainer.append(recipeCard);
                            });
                                //Error handling
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