# Weatherly

Weatherly is a browser-based weather dashboard that retrieves current conditions for a city and pairs the results with a full-screen, weather-specific video background. It is implemented as a static HTML, CSS, and JavaScript application, with weather data provided by OpenWeather's Current Weather API.

**Live demo:** [weatherly-six-neon.vercel.app](https://weatherly-six-neon.vercel.app)

## Features

- Look up current weather by entering a city name.
- Start with Uyo by default, or restore the most recently selected city from browser `localStorage`.
- Select one of the built-in city suggestions: Lagos, London, New York, or Uyo.
- View the city, temperature in Celsius, condition description, condition emoji, humidity, wind speed, pressure, and city-local date and time.
- Switch the page's animated video background to match thunderstorm, rain, drizzle, snow, fog, clear, or cloudy conditions.
- Use a responsive layout with a slide-in navigation/search panel on smaller screens.
- See a transient on-page message when a search or weather request fails.

## Technology stack

| Area | Technology |
| --- | --- |
| Frontend | HTML, CSS, vanilla JavaScript |
| Weather data | OpenWeather Current Weather API (external service) |
| Persistence | Browser `localStorage` for the preferred city |
| Media | Locally stored MP4 weather backgrounds and image assets |
| Deployment | Static site; the repository metadata links to a Vercel-hosted demo |

There is no application server, framework, package manager manifest, database, or authentication implementation in the repository.

## How it works

`index.html` provides the page markup, including separate sections for the different weather conditions, search forms, suggestions, and weather details. `css/style.css` styles the dashboard and responsive navigation. `js/index.js` fetches current conditions directly from OpenWeather, updates the displayed values, and selects the corresponding weather section and local video background. The selected city is saved in `localStorage` and loaded on the next visit.

The browser communicates directly with OpenWeather; there is no project-owned API or server-side proxy. The page uses the API response's city name, temperature, humidity, pressure, condition code and description, wind speed, timestamp, and timezone offset.

## Project structure

```text
Weatherly/
├── assets/
│   ├── imgs/           # Logo, favicon, and search image
│   └── videos/         # Weather-condition background videos
├── css/
│   └── style.css       # Layout, visual styling, and responsive rules
├── js/
│   └── index.js        # Weather requests, rendering, and interaction logic
├── index.html          # Single-page application markup
├── LICENSE             # MIT License
└── README.md
```

The weather video assets are `thunderstorm.mp4`, `rain4.mp4`, `drizzle7.mp4`, `snow6.mp4`, `fog4.mp4`, `sun4.mp4`, and `cloud.mp4`.

## Requirements

- A modern web browser with JavaScript enabled.
- An internet connection to request weather data from OpenWeather.
- A static web server for local development. No Node.js installation or build step is required by this repository.

## Installation and setup

1. Clone the repository and enter its directory:

   ```bash
   git clone https://github.com/Sisco1212/Weatherly.git
   cd Weatherly
   ```

2. Start a local static server from the repository root. For example, with Python 3:

   ```bash
   python3 -m http.server 8000
   ```

3. Open [http://localhost:8000](http://localhost:8000) in your browser.

The app requests weather for Uyo when no city has previously been saved. Searches require a working OpenWeather API credential. The current implementation has that credential embedded in `js/index.js`; it is not read from an environment variable. Since this is a client-side app, any credential included in its JavaScript is visible to visitors. Do not treat it as secret or reuse a credential that has been exposed. Before operating a deployment, rotate the exposed credential and use a server-side proxy with a credential stored securely, or another suitable protected integration. A frontend `.env` file would not keep a key secret.

## Configuration and environment variables

There are **no environment variables** defined or consumed by the current codebase. In particular, the static app does not load API credentials from a `.env` file. Weather requests are currently configured in `js/index.js`; see the security note above before deploying or reusing this implementation.

## Running the application

From the project root, run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. Stop the server with `Ctrl+C`. Alternatively, serve the repository root with any static file server that preserves the site's relative asset paths.

## Weather data integration

The project has no first-party API routes. The browser requests current conditions from OpenWeather's Current Weather endpoint:

```text
GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}
```

The request includes the entered city and an API credential. The credential is intentionally not reproduced in this documentation. OpenWeather must return a successful response for the requested city; otherwise, the app displays an error message. The application converts the API temperature from Kelvin to Celsius and uses the returned weather condition ID to choose a display state and background.

## Authentication, security, and privacy

There is no user account, login, or authentication flow. The selected city is stored in the browser's `localStorage`; no application database or project-owned server is present. Weather lookups send the city query to OpenWeather from the user's browser.

**Credential warning:** the current JavaScript source contains an OpenWeather credential. Client-side credentials are exposed to anyone who can load the site. Rotate that credential and move requests behind a server-side component before relying on the integration in a public deployment. Do not add secrets to the README or commit them to the repository.

## Database

Weatherly does not use a database. Its only persistent application preference is the last selected city, stored locally in the browser under the `defaultCity` key.

## Deployment

Weatherly is a static site: deploy the repository root to a static hosting provider, with `index.html` as the entry point and the `css/`, `js/`, and `assets/` directories served alongside it. No build command or server process is defined in the repository. The repository metadata lists [a Vercel-hosted demo](https://weatherly-six-neon.vercel.app); no Vercel configuration file is present in the repository.

Before deploying, address the exposed weather API credential as described in [Authentication, security, and privacy](#authentication-security-and-privacy). Also ensure the host serves the bundled video files, which are sizable assets.

## Screenshots

No screenshots are currently included in the repository. Add screenshots here when available, for example:

```markdown
![Weatherly dashboard](docs/screenshots/dashboard.png)
```

## Possible future improvements

These are suggestions, not features currently implemented:

- Route weather requests through a backend or serverless function so the API credential is not shipped to browsers.
- Improve request validation and show clearer messages for unknown cities, network failures, and API errors.
- Add automated tests for weather-condition mapping, rendering, and error handling.
- Review and correct the displayed units for pressure and wind speed; the current JavaScript assigns labels that do not match those values.
- Add screenshots and document the intended browser support.

## Author and acknowledgements

The repository's MIT license identifies **Sisco1212** in its copyright notice. Weather data is provided by [OpenWeather](https://openweathermap.org/).