// Initial References
let result = $("#result");
let searchBtn = $("#search-btn");
let url = "https://tasty.p.rapidapi.com/recipes/auto-complete";

searchBtn.on("click", () => {
    let userInp = $("#user-inp").val();
    if (userInp.length === 0) {
        result.html(`<h3>Input Field Cannot Be Empty</h3>`);
    } else {
        $.ajax({
            url: url,
            type: "GET",
            data: { prefix: userInp },
            headers: {
                "x-rapidapi-key": "459369c516mshfa57b82cae3e3b3p1b41a1jsn79b5694f966a",
                "x-rapidapi-host": "tasty.p.rapidapi.com",
            },
            success: function (response) {
                if (response && response.length > 0) {
                    let recipe = response[0];
                    if (recipe && recipe.thumbnail_url) {
                        console.log(recipe);

                        result.html(`
                        <img src="${recipe.thumbnail_url}">
                        <div class="details">
                            <h2>${recipe.name}</h2>
                            <h4>Cuisine: ${recipe.cuisine}</h4>
                        </div>
                        <div id="recipe">
                            <button id="hide-recipe">X</button>
                            <pre id="instructions">${recipe.instructions}</pre>
                        </div>
                        <button id="show-recipe">View Recipe</button>
                        `);
                    } else {
                        result.html(`<h3>Recipe data is missing or invalid</h3>`);
                    }
                } else {
                    result.html(`<h3>No recipe found for the given ingredient</h3>`);
                }
            }
        });
    }
});
