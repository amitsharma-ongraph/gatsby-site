import React from "react";
import { useSiteMetadata } from "../hooks/useSiteMetadata";

function SiteData() {
  const { getValues } = useSiteMetadata();
  const data = getValues();
  return <div>SiteData</div>;
}

export default SiteData;
