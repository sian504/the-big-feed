const settings = {
    async: true,
    crossDomain: true,
    url: 'https://tasty.p.rapidapi.com/recipes/auto-complete',
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '459369c516mshfa57b82cae3e3b3p1b41a1jsn79b5694f966a',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
};

// Get a reference to the container element
const container = $('#result');
    $.ajax(settings).done(function (response) {
    // Display the response in the container
container.html(JSON.stringify(response, null, 2));
});