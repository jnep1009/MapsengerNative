## Web Application version
Mapsenge Webapp: *https://mapsenger.co*

## Getting Started
Clone this repository.

Install the npm packages using:

```bash
$ npm install
```
### iOS
- Go to **Developer applications** tab, then click on the **Register new application** button
- **Application name**: Your app name
- **Homepage URL**: *http://localhost:3000*
- **Authorization callback URL**: *http://localhost:3000/callback*
- Click on the **Register application** button
- Get your `Client ID` and `Client Secret`

## Run the application
Start the local server in a separate window.

For Android
```bash
$ npm run serve android &
$ react-native run-android
```

For iOS, to run the application, use:
```bash
$ npm run serve ios &
$ react-native run-ios
```
