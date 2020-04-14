import React, { useState } from "react";
import axios from "axios";

const DeployButton = (props) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const apiUrl = "https://api.travis-ci.com/repo/yugrinkov%2Fcarnica/requests";

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Travis-API-Version": "3",
    Authorization: `token ${window.token}`,
  };

  const polling = (requestId) => {
    console.log("requestId", requestId);
    const pollingInterval = 30000;
    const intervalId = setInterval(() => {
      axios
        .get(`${apiUrl}?limit=1`, {
          headers,
        })
        .then((response) => {
          const requests = response.data.requests;
          const targetRequest = requests.find((req) => req.id === requestId);
          const targetBuildState = targetRequest.builds[0].state;
          if (targetBuildState === "started") return;
          if (targetBuildState === "passed" || targetBuildState === "failed") {
            setLoading(false);
            if (targetBuildState === "failed") {
              setErrorMessage("Build failed!");
            } else {
              setSuccessMessage("Build succeeded!");
            }

            clearInterval(intervalId);
          }
        });
    }, pollingInterval);
  };

  const onClickHandler = () => {
    const data = {
      request: {
        branch: "master",
      },
    };

    axios
      .post(apiUrl, data, {
        headers,
      })
      .then((response) => {
        setLoading(true);
        polling(response.data.request.id);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {errorMessage && (
        <p style={{ color: "red", marginBottom: 0, marginRight: "10px" }}>
          {errorMessage}
        </p>
      )}

      {successMessage && (
        <p style={{ color: "green", marginBottom: 0, marginRight: "10px" }}>
          {successMessage}
        </p>
      )}
      {loading ? (
        <>
          <i className="fa fa-spinner fa-spin"></i>&nbsp; Running
        </>
      ) : (
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
          Run Deployment
        </button>
      )}
    </div>
  );
};

export default DeployButton;
