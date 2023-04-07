import { IconUsers, IconCalendarEvent, IconNews } from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Dashboard",
  },
  {
    id: uniqueId(),
    title: "News",
    icon: IconNews,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Events",
    icon: IconCalendarEvent,
    href: "/events",
    roles: ["user", "admin"],
  },
];

export default Menuitems;
