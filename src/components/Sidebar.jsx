import { Grid, GridItem, Icon } from "@chakra-ui/react";
import { Link } from "gatsby";
import React from "react";
import { HiX } from "react-icons/hi";
import {
  BiBadgeCheck,
  BiHomeHeart,
  BiInfoCircle,
  BiMessage,
  BiTag,
} from "react-icons/bi";
import { MdRestaurantMenu } from "react-icons/md";
import SidebarOption from "./SidebarOption";
import Logo from "./Logo";

const options = [
  {
    icon: BiBadgeCheck,
    children: "Featured",
    path: "/",
  },
  {
    icon: BiTag,
    children: "Tags",
    path: "/tags/",
  },
  {
    icon: MdRestaurantMenu,
    children: "MyRecepies",
    path: "/personal-recepies/",
  },
  {
    icon: BiInfoCircle,
    children: "About",
    path: "/about/",
  },
];

function Sidebar({ onClose }) {
  return (
    <Grid templateRows="1fr 0fr" h="full" rowGap={5}>
      <GridItem>
        <Grid autoFlow="row">
          <GridItem borderBottom="1px solid" borderBottomColor="whiteAlpha.200">
            <Grid
              templateColumns="1fr 0fr"
              h={16}
              alignItems="center"
              px={{ base: 3, lg: 6 }}
            >
              <GridItem>
                <Link to="/">
                  <Logo />
                </Link>
              </GridItem>
              <GridItem>
                {onClose && (
                  <Icon
                    display="inline"
                    verticalAlign="-7px"
                    fontSize="2xl"
                    as={HiX}
                    color="black"
                    cursor="pointer"
                    onClick={() => onClose()}
                  />
                )}
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem>
            <Grid autoFlow="row" rowGap={2} px={3} pt={4}>
              {options.map((option, j) => (
                <GridItem key={`sidebar-option-${j}`}>
                  <SidebarOption {...option} />
                </GridItem>
              ))}
            </Grid>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem>
        <Grid autoFlow="row" rowGap={1} px={4}>
          <GridItem></GridItem>
          {/* Buffers */}
          <GridItem />
          <GridItem />
          <GridItem />
        </Grid>
      </GridItem>
    </Grid>
  );
}

export default Sidebar;
