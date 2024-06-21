const { query } = await Service.import("applications");

const AppItem = (app) =>
  Widget.Button({
    attribute: { app },
    on_clicked: () => {
      App.closeWindow("launcher");
      app.launch();
    },
    child: Widget.Box({
      children: [
        Widget.Icon({
          icon: app.icon_name || "",
          size: 32,
        }),
        Widget.Label({
          label: app.name,
        }),
      ],
    }),
  });

export const Launcher = () => {
  let applications = query("").map(AppItem);

  const list = Widget.Box({
    vertical: true,
    children: applications,
  });

  const entry = Widget.Entry({
    hexpand: true,
    on_accept: () => {
      const results = applications.filter((item) => item.visible);
      if (results[0]) {
        App.toggleWindow("launcher");
        results[0].attribute.app.launch();
      }
    },
    on_change: ({ text }) =>
      applications.forEach(
        (item) => (item.visible = item.attribute.app.match(text ?? "")),
      ),
  });

  const frame = Widget.Box({
    class_name: "frame",
    vertical: true,
    children: [
      entry,
      Widget.Scrollable({
        css: "min-width: 400px; min-height: 300px",
        child: list,
      }),
    ],
  });

  return Widget.Window({
    name: "launcher",
    setup: (self) =>
      self.keybind("Escape", () => {
        App.closeWindow("launcher");
      }),
    visible: false,
    layer: "top",
    keymode: "exclusive",
    child: frame,
  });
};
