import {React} from "react";


export default function UserCheckbox() {
    let isChecked = new Array(3).fill(false);
    isChecked[1] = true;
    const handleOnChange = (id) => {
        for (let i = 0; i < isChecked.length; i++) {
            if (i === id) {
              isChecked[i] = true;
            } else {
              isChecked[i] = false;
            }
        }
    };
    return (
        <div className="userType">
        <input
          type="checkbox"
          id="1"
          name="All"
          value="All"
          checked={isChecked[this.id]}
          onChange={handleOnChange(this.id)}
        />
        <input
          type="checkbox"
          id="2"
          name="Drivers"
          value="Drivers"
          checked={isChecked[this.id]}
          onChange={handleOnChange(this.id)}
        />
        <input
          type="checkbox"
          id="3"
          name="Riders"
          value="Riders"
          checked={isChecked[this.id]}
          onChange={handleOnChange(this.id)}
        />
        Tester
      </div>
    );



}
