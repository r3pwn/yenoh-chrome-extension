# Yenoh - a Chrome Extension

This is a Chrome extension built using React and [Vite](https://vitejs.dev/) with TypeScript.

**NOTE**: Any relation to any browser extension (existing or planned) is entirely coincidental.

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 18+ or 20+) installed on your machine.

### Setup

1. Clone or fork the repository :

    ```sh
    # To clone
    git clone https://github.com/r3pwn/yenoh-chrome-extension
    cd yenoh-chrome-extension
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

## 🏗️ Development

To start the development server:

```sh
npm run dev
```

This will start the Vite development server and open your default browser.

## 📦 Build 

To create a production build:

```sh
npm run build
```

This will generate the build files in the `build` directory.

## 📂 Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable "Developer mode" using the toggle switch in the top right corner.
3. Click "Load unpacked" and select the `build` directory.

Yenoh should now be loaded as a Chrome extension!

## 🗂️ Project Structure

- `public/`: Contains static files and the `manifest.json`.
- `src/`: Contains the React source code.
- `vite.config.ts`: Vite configuration file.
- `tsconfig.json`: TypeScript configuration file.
- `package.json`: Contains the project dependencies and scripts.

## License

This project is licensed under the MIT License.