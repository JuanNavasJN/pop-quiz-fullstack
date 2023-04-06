import { ReactElement, useContext, useEffect } from "react";
import Menuitems from "./MenuItems";
import { useRouter } from "next/router";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { AuthContext } from "../../../../src/contexts/AuthContext";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const { user } = useContext(AuthContext);
  const { pathname } = useRouter();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            if (
              !item.roles || // public
              (item.roles && user && item.roles.includes(user.role))
            ) {
              return (
                <NavItem
                  item={item}
                  key={item.id}
                  pathDirect={pathDirect}
                  onClick={toggleMobileSidebar}
                />
              );
            }

            return null;
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
