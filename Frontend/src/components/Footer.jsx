import { Link } from "react-router-dom";
import Instagram from "../assets/images/instagram.png";
import Spotify from "../assets/images/spotify.png";
import TikTok from "../assets/images/tik-tok.png";
import Youtube from "../assets/images/youtube.png";
import Facebook from "../assets/images/facebook.png";
import AIRA from "../assets/images/AIRA.png";

const Footer = () => {
  return (
    <footer
      style={{
        background: "#D3D3D3",
        color: "black",
        paddingInline: "10rem",
        paddingBlock: "2rem",
      }}
    >
      <div className="row">
        <div className="col">
          <p style={{ fontWeight: "bold", fontSize: "1rem" }}>Shop</p>
          <p style={{ fontSize: "0.87rem" }}>Women</p>
          <p style={{ fontSize: "0.87rem" }}>Men</p>
          <p style={{ fontSize: "0.87rem" }}>Kids</p>
        </div>
        <div className="col">
          <p style={{ fontWeight: "bold", fontSize: "1rem" }}>Corporate Info</p>
          <p style={{ fontSize: "0.87rem" }}>Career at the AIRA</p>
          <p style={{ fontSize: "0.87rem" }}>About AIRA group</p>
          <p style={{ fontSize: "0.87rem" }}>
            Sustainbaility The Outfit Hub Group
          </p>
          <p style={{ fontSize: "0.87rem" }}>Press</p>
          <p style={{ fontSize: "0.87rem" }}>Investor relations</p>
          <p style={{ fontSize: "0.87rem" }}>Corporate governance</p>
        </div>
        <div className="col">
          <p style={{ fontWeight: "bold", fontSize: "1rem" }}>Help</p>
          <p style={{ fontSize: "0.87rem" }}>Customer Service</p>
          <p style={{ fontSize: "0.87rem" }}>My AIRA</p>
          <p style={{ fontSize: "0.87rem" }}>Find a store</p>
          <p style={{ fontSize: "0.87rem" }}>Legal & privacy</p>
          <p style={{ fontSize: "0.87rem" }}>Contact</p>
          <p style={{ fontSize: "0.87rem" }}>Secure Shopping</p>
          <p style={{ fontSize: "0.87rem" }}>Cookie Notice</p>
          <p style={{ fontSize: "1rem" }}>Cookie Settings</p>
        </div>
        <div className="col">
          <p style={{ fontSize: "1rem" }}>
            Sign up now and be the first to know about exclusive offers, latest
            fashion news & style tips!
          </p>
          <Link to="/" className="text-decoration-none text-success">
            Continue Shopping <span className="">→</span>
          </Link>
        </div>
      </div>
      <div className="d-flex py-4" style={{ marginLeft: "40rem" }}>
        <img
          src={Instagram}
          alt=""
          style={{ width: "1.5rem", height: "1.5rem", marginRight: "1.5rem" }}
        />
        <img
          src={Facebook}
          alt=""
          style={{ width: "1.5rem", height: "1.5rem", marginRight: "1.5rem" }}
        />
        <img
          src={Spotify}
          alt=""
          style={{ width: "1.5rem", height: "1.5rem", marginRight: "1.5rem" }}
        />
        <img
          src={TikTok}
          alt=""
          style={{ width: "1.5rem", height: "1.5rem", marginRight: "1.5rem" }}
        />
        <img
          src={Youtube}
          alt=""
          style={{ width: "1.5rem", height: "1.5rem", marginRight: "1.5rem" }}
        />
      </div>
      <p className="text-center fs-6 text">
        The content of this site is copyright-protected and is the property of
        AIRA.
      </p>
      <img src={AIRA} style={{ width: "11rem", marginLeft: "40rem" }} />
    </footer>
  );
};
export default Footer;
