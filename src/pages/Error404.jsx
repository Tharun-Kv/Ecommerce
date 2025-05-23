import React from "react";
import "./Error404.css";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center">
            <div className="four_zero_four_bg">
              <h1 className="text-center">404</h1>
            </div>
            <div className="contant_box_404">
              <h3 className="h1">Caution</h3>
              <p>The deltails You Entered are incorrect </p>
              <button className="link_404" onClick={() => navigate("/Welcome")}>Go to Home</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404;