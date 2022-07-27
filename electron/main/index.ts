import { app } from "electron";
import { use_home_win } from "./module/home";
if (process.platform === "win32") app.setAppUserModelId(app.getName());
app.on("ready", () => {
    use_home_win();
});

app.on("quit", () => {
    console.log("quit");
});
