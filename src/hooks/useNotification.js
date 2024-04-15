import { useContext } from "react";
import { notificationContext } from "../context/notificationContext";

export const useNotification = () => useContext(notificationContext);
