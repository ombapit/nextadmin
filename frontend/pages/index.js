import React, { useEffect } from "react";
import Router from "next/router";

import { useShared } from 'store'

const Index = (props) => {
  const [general, setGeneral] = useShared('general')

  useEffect(() => {
    if (general.authenticated == true) {
      Router.push("/dashboard");
    } else {
      Router.push("/login");
    }
  },[])

  return (<div/>)
}
export default Index
