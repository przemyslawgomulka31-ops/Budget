import { NavLink } from "react-router-dom";

import {FaHome,FaArrowUp,FaArrowDown,FaChartBar,FaCog,} from "react-icons/fa";

export default function BottomNav() {
  return (
    <div className="bottom-nav">

      <NavLink
  to="/"
  end
  className={({ isActive }) =>
    isActive
      ? "nav-item active-nav"
      : "nav-item"
  }
>
        <FaHome />
        Home
      </NavLink>

     <NavLink
  to="/income"
  className={({ isActive }) =>
    isActive
      ? "nav-item active-nav"
      : "nav-item"
  }
>
  <FaArrowUp />
  Dochody
</NavLink>

      <NavLink
        to="/expenses"
        className={({ isActive }) =>
          isActive
            ? "nav-item active-nav"
            : "nav-item"
        }
      >
        <FaArrowDown />
        Wydatki
      </NavLink>

      <NavLink
        to="/summary"
        className={({ isActive }) =>
          isActive
            ? "nav-item active-nav"
            : "nav-item"
        }
      >
        <FaChartBar />
        Statystyki
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive
            ? "nav-item active-nav"
            : "nav-item"
        }
      >
        <FaCog />
        Ustawienia
      </NavLink>

    </div>
  );
}