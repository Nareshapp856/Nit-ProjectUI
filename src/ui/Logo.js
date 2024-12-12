import userLogo from "../assets/adminlogo.jpg";
import BrandLogo from "../assets/Naresh_IT_Logo.png";

function Logo() {
  return (
    <ul className="flex justify-between h-10">
      <li className="grid place-content-center mx-2">
        <img alt="Logo" src={BrandLogo} height="30" width="150" />
      </li>
      <li className="grid place-content-center mx-10">
        <img src={userLogo} width="30" height="30" alt="userLogo" />
      </li>
    </ul>
  );
}

export default Logo;
