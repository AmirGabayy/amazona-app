import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  //   const redirect_param = params.redirect;
  let redirect = params.redirect ? params.redirect : "/";

  //   const redirect = props.location.search
  //     ? props.location.search.split("=")[1]
  //     : "/";
  //   const params = useParams();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    // the form will not refresh when user clicks submit - we will use Ajax request for signing in
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      //   props.history.push(redirect);

      // if there is a logged in user already, we will send him to the next screen
      redirect = redirect === "/" ? "/" : `../${redirect}`;
      navigate(`${redirect}`);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          New customer?{" "}
          <Link to={`/register/${redirect}`}>Create your account</Link>
          {/* {redirect !== "/" && (
            <div>
              New customer?{" "}
              <Link to={`/register/${redirect}`}>Create your account</Link>
            </div>
          )}
          {redirect === "/" && (
            <div>
              New customer? <Link to={`/register`}>Create your account</Link>
            </div>
          )} */}
        </div>
      </form>
    </div>
  );
}
