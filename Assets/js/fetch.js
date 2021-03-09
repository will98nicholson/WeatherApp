class Fetch {
    async getCurrent(input) {
        const apiKey = "3b3b57943ecc5559dd982ec49a44012a";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`
        );

        const data = await response.json();

        console.log(data);

        return data;
    }
}