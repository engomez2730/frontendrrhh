import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

export default (ChildComponent) => {
  const ComposedComponent = (props) => {
    var navigate = useNavigate();

    const AmILoggedIn = () => {
      if (!props?.isLoggedIn?.isLoggedIn || props.user.user?.rol !== "admin") {
        navigate("/");
      }
    };
    useEffect(() => {
      AmILoggedIn();
    });
    return <ChildComponent {...props} />;
  };

  const mapStateToProps = (state) => {
    return { isLoggedIn: state.isLoggedIn, user: state.user };
  };
  return connect(mapStateToProps)(ComposedComponent);
};
