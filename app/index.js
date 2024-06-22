import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider";

const index = () => {

    return <Redirect href={'/(auth)/login'} />;
  
}

export default index