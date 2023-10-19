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

            const resultContainer = $("#result"); // Define result container once

            $.ajax(settings)
                .done(function (response) {
                    if (response.results && response.results.length > 0) {
                        // Filter recipes with video links
                        const recipesWithVideos = response.results.filter(function (item) {
                            return item.renditions && item.renditions.length > 0;
                        });

                        if (recipesWithVideos.length > 0) {
                            const resultList = $("<ul>");
                            recipesWithVideos.forEach(function (item) {
                                const listItem = $("<li>");

                                // Create a clickable link for the video
                                const videoLink = $("<a>")
                                    .attr("href", item.renditions[0].url) // Assuming the first rendition is the video link
                                    .attr("target", "_blank")
                                    .text(item.name);

                                listItem.append(videoLink);
                                resultList.append(listItem);
                            });

                            // Clear previous results and display the new results
                            resultContainer.empty().append(resultList);
                        } else {
                            resultContainer.html("<p>No recipes with video links found for the given ingredient</p>");
                        }
                    } else {
                        resultContainer.html("<p>No recipes found for the given ingredient</p>");
                    }
                })
                .fail(function (xhr, status, error) {
                    // Handle AJAX request errors, e.g., display an error message to the user
                    resultContainer.html("<p>An error occurred while fetching data.</p>");
                });
        }
    });
});
