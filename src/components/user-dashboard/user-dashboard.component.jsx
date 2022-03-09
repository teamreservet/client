import { auth, signOut } from "../../firebase/firebase.utils";
import { useState } from "react";
import usericon from "../../assets/user-icon.svg";

import "./user-dashboard.styles.scss";
const data = [
  {
    ques: "EmaiL",
    ans: "kartikg052@GMAIL.COM",
  },
  {
    ques: "PhoneNo.",
    ans: "123456789",
  },
  {
    ques: "Previous Trip",
    ans: "ans of prev",
  },
  {
    ques: "Upcoming Trip",
    ans: "ans of upcm",
  },
  {
    ques: "About us",
    ans: "Reservet is an online portal that allows user to buy e-tickets from anywhere and at anytime. A completely contactless ticketing environment that solely focuses on eradicating the use of paper in this domain.",
  },
  {
    ques: "Customer Support",
    ans: "this is customer support ans",
  },
];
const UserDashboard = ({ showDashboard }) => {
  const [selected, setSelected] = useState(null);
  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    return setSelected(i);
  };
  return (
    <div
      className={`user-dashboard ${showDashboard ? "show" : "hide"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <h1>Dashboard</h1>
      <img src={usericon} className="logo" />

      <div className="toggle">
        {data.map((item, i) => (
          <div className="item" key={i} onClick={() => toggle(i)}>
            <div className="questions">
              {/* <h3>Previous Ticket</h3> */}
              <h3>{item.ques}</h3>
              <span>{selected === i ? "-" : "+"}</span>
            </div>
            <div className={selected === i ? "description_all" : "description"}>
              {/* <h3>Upcoming Tickets</h3> */}
              <div className="ans" onClick={() => toggle(i)}>
                {item.ans}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="authenticate" onClick={async () => await signOut(auth)}>
        Sign out
      </div>
    </div>
  );
};

export default UserDashboard;
