import React, { useState } from "react";

function Profile() {
  const [login, setLogin] = useState(false);
  setTimeout(() => {
    setLogin(true);
  }, 3000);

  if (!login) {
    return <div>not authorized</div>;
  }
  return <div>Profile</div>;
}

export default Profile;
