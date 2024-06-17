import { date, hyprland, battery, network, Workspaces } from "./common.js";

const Battery = () =>
  Widget.Box({
    children: [
      Widget.Label({
        label: battery.bind("percent").as((p) => p + "%"),
      }),
      Widget.Icon({
        icon: battery.bind("icon_name"),
      }),
    ],
  });

const Network = () =>
  Widget.Box({
    children: [
      Widget.Icon({
        icon: network.wifi.bind("icon_name"),
      }),
    ],
  });

export function TopBar(monitor) {
  const topbar = Widget.CenterBox({
    orientation: 0,
    hexpand: true,
    startWidget: Widget.Box({
      class_name: "lbox",
      children: [
        Workspaces(),
        Widget.Label({
          label: hyprland.active.client.bind("title"),
        }),
      ],
    }),
    centerWidget: Widget.Box({
      children: [
        Widget.Label({
          label: date.bind(),
        }),
      ],
    }),
    endWidget: Widget.Box({
      hpack: "end",
      class_name: "rbox",
      children: [Network(), Battery()],
    }),
  });
  return Widget.Window({
    name: `topbar-${monitor}`,
    monitor: monitor,
    anchor: ["top", "left", "right"],
    exclusivity: "exclusive",
    layer: "overlay",
    class_name: "frame",
    margins: [8, 8, 0, 8],
    child: topbar,
  });
}
