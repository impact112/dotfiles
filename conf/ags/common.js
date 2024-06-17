export const hyprland = await Service.import("hyprland");
export const mpris = await Service.import("mpris");
export const audio = await Service.import("audio");
export const battery = await Service.import("battery");
export const network = await Service.import("network");
//export const systemtray = await Service.import("systemtray");

export const date = Variable("", {
  poll: [10000, 'date "+%b %d %H:%M"'],
});

export function Workspaces() {
  const activeId = hyprland.active.workspace.bind("id");
  const workspaces = hyprland.bind("workspaces").as((ws) =>
    ws.map(({ id, name }) =>
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
}
