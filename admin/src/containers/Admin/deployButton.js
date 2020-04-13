import React, { useState, useEffect } from "react";
import axios from "axios";

const DeployButton = (props) => {
  /*const [token, setToken] = useState(null);
  useEffect(() => {
    axios.get("/data.json").then((response) => {
      setToken(response.data.token);
    });
  }, []); */
  const onClickHandler = () => {
    const data = {
      request: {
        branch: "master",
      },
    };

    console.log("token", window.token);

    /*axios
      .post(
        "https://api.travis-ci.com/repo/yugrinkov%2Fcarnica/requests",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Travis-API-Version": "3",
            Authorization: "token ${token}",
          },
        }
      )
      .then((response) => {
        console.log(response);
      }); */
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        style={{
          height: "3rem",
          position: "relative",
          whiteSpace: "nowrap",
          marginRight: "1.8rem",
          lineHeight: "26px",
          fontSize: "13px",
          cursor: "pointer",
          fontFamily: "Lato",
          minWidth: "14rem",
          paddingLeft: "1.6rem",
          paddingRight: "1.6rem",
          fontWeight: "500",
          color: "white",
          borderRadius: "0.3rem",
          background: "#dc3545",
        }}
        onClick={onClickHandler}
      >
        Run Deploy
      </button>
    </div>
  );
};

export default DeployButton;
