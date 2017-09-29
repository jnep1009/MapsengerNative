## Web Application version
Mapsenger Webapp: *http://mapsenger.co:8080*

video demo for webapp: *https://vimeo.com/221850677*

## Getting Started
Clone this repository.

Install the npm packages using:

```bash
$ npm install -g react-native-cli
$ npm install
$ rm -rf /usr/local/var/run/watchman/ && brew uninstall watchman && brew install watchman
```
### iOS
- Go to github to register developer application.
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
