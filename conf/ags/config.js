import { TopBar } from "./topbar.js";
import { Launcher } from "./launcher.js";

App.config({
  style: "./style.css",
  windows: [TopBar(0), Launcher()],
});
