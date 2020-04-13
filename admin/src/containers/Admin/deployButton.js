import React, { useState, useEffect } from "react";
import axios from "axios";

const DeployButton = (props) => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    axios.get("/data.json").then((response) => {
      setToken(response.data.token);
    });
  }, []);
  const onClickHandler = () => {
    const data = {
      request: {
        branch: "master",
      },
    };

    console.log("token", token);

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
    <div>
      <button onClick={onClickHandler}>Deploy</button>
    </div>
  );
};

export default DeployButton;
