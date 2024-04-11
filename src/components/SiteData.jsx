import React from "react";
import { useSiteMetadata } from "../hooks/useSiteMetadata";

function SiteData() {
  const { getValues } = useSiteMetadata();
  const data = getValues();
  console.log("site metadata----->", data);
  return <div>SiteData</div>;
}

export default SiteData;
