# Weather App

A web-based weather application that provides current weather conditions, hourly forecasts, and a 7-day forecast for any searched location. This project was built as part of The Odin Project curriculum.

## Live Demo

Check out the live demo [here](https://mn-chetan.github.io/weather-app/).

## Features

*   **Current Weather:** Displays the current temperature, chance of rain, "feels like" temperature, wind speed, and UV index.
*   **Hourly Forecast:** Shows the weather forecast in 3-hour increments for the current day, from 6 AM to 9 PM.
*   **7-Day Forecast:** Provides a weather forecast for the next seven days, including high/low temperatures and weather conditions.
*   **Search Functionality:** Allows users to search for weather information for different cities.
*   **Responsive Design:** Adapts to different screen sizes (though specific responsive CSS might need further refinement).

## Technologies Used

*   HTML
*   CSS
*   JavaScript
*   [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api)
*   Webpack (for bundling and development server)
*   date-fns (for date formatting)

## Setup and Installation

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mn-chetan/weather-app.git
    cd weather-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm start
    ```
    This will open the application in your default browser, usually at `http://localhost:8080`.

## Usage

1.  Upon loading, the application will display the weather for a default location (currently London).
2.  To find weather information for a different city, type the city name into the search bar at the top and press Enter or click the search button (if one is implemented).
3.  The weather display will update with the information for the searched city.

## Acknowledgements

*   **The Odin Project:** For providing the project idea and curriculum.
*   **IconScout:** A majority of the icons used in this project are from IconScout.
*   **SVG Repo:** Some icons were sourced from SVG Repo.
*   **Visual Crossing:** For their weather data API.

## License

This project is licensed under the ISC License. See the `LICENSE` file for details (if one exists, or refer to `package.json`).
