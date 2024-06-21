const hyprland = await Service.import("hyprland");
const mpris = await Service.import("mpris");
const audio = await Service.import("audio");
const battery = await Service.import("battery");
const network = await Service.import("network");
const systemtray = await Service.import("systemtray");
const notifications = await Service.import("notifications");

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

const WifiIndicator = () =>
  Widget.Box({
    child: Widget.Icon({
      icon: network.wifi.bind("icon_name"),
    }),
  });

const WiredIndicator = () =>
  Widget.Box({
    child: Widget.Icon({
      icon: network.wired.bind("icon_name"),
    }),
  });

const NetworkTooltip = () => {
  return network.wifi.bind("ssid").as((ssid) => ssid || "Unknown");
};

const Network = () =>
  Widget.Box({
    children: [
      Widget.Stack({
        children: {
          wifi: WifiIndicator(),
          wired: WiredIndicator(),
        },
        shown: network.bind("primary").as((p) => p || "wifi"),
      }),
    ],
    tooltip_text: NetworkTooltip(),
  });

const Notifications = () =>
  Widget.Box({
    children: [
      Widget.Label({
        label: notifications.bind("notifications").as((n) => `${n.length}`),
      }),
      Widget.Icon({
        icon: "notification-inactive",
      }),
    ],
  });

const ActionMenuToggle = () =>
  Widget.Box({
    children: [
      Widget.Icon({
        icon: "application-menu",
      }),
    ],
  });

const Workspaces = (monitor) => {
  const activeId = hyprland.active.workspace.bind("id");
  const workspaces = hyprland.bind("workspaces").as((ws) =>
    ws
      .filter((w) => w.monitorID == monitor)
      .map(({ id, name }) =>
        Widget.Button({
          on_clicked: () => hyprland.messageAsync(`dispatch workspace ${id}`),
          child: Widget.Label(`${name}`),
          class_name: activeId.as((i) => `${i === id ? "current" : ""}`),
        }),
      ),
  );

  return Widget.Box({
    class_name: "workspaces",
    children: workspaces,
  });
};

const ActiveWindowName = () =>
  Widget.Label({
    label: hyprland.active.client.bind("title"),
  });

export const TopBar = (monitor) => {
  const topbar = Widget.CenterBox({
    orientation: 0,
    hexpand: true,
    startWidget: Widget.Box({
      class_name: "lbox",
      children: [Workspaces(monitor), ActiveWindowName()],
    }),
    centerWidget: Widget.Box({
      children: [
        Widget.Label({
          label: Variable("", {
            poll: [10000, 'date "+%b %d %H:%M"'],
          }).bind(),
        }),
      ],
    }),
    endWidget: Widget.Box({
      hpack: "end",
      class_name: "rbox",
      children: [Network(), Battery(), Notifications(), ActionMenuToggle()],
    }),
  });
  return Widget.Window({
    name: `topbar-${monitor}`,
    monitor: monitor,
    anchor: ["top", "left", "right"],
    exclusivity: "exclusive",
    layer: "fg",
    class_name: "frame",
    margins: [8, 8, 0, 8],
    child: topbar,
  });
};
