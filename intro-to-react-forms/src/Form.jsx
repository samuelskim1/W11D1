import { useState } from "react";

export default function Form() {
  const [user, setUser] = useState({
    Name: "",
    Email: "",
    PhoneNumber: "",
    PhoneType: "PhoneType",
    Staff: "",
    Bio: "",
    Sign_up_for_email_notifications: ""
  });

  const handleChange = (field) => {
    return ((e) => {
      setUser({
        ...user,
        [field]: e.target.value
      });
    });
  };

  const [errors, setErrors] = useState({});

  const validate = () => {
    const currentErrors = {};

    // name validation
    if (!user.Name) currentErrors["nameError"] = "Name is missing.";
    // email validation
    if (!user.Email || !(user.Email.split("@").length === 2)) currentErrors["emailError"] = "Email is invalid.";
    // phone number validation
    if (!(user.PhoneNumber.length === 10)) currentErrors["phoneError"] = "PhoneNumber is invalid.";
    const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    for (let char of user.PhoneNumber) {
        if (!nums.includes(char)) currentErrors["phoneError"] = "PhoneNumber is invalid.";
    }
    // phone type validation
    if (user.PhoneNumber && !user.PhoneType) currentErrors["phoneTypeError"] = "Please select PhoneType.";
    // bio length validation
    if (user.Bio.length > 280) currentErrors["bioLengthError"] = "Bio has a character limit of 280.";

    return currentErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentErrors = validate();
    setErrors(currentErrors);
    if (Object.entries(currentErrors).length) console.log("errors!");
    else console.log("valid form submission!");
  };

  return (
    <>
      <form id="userform" onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={user.Name} onChange={handleChange("Name")} />
        <br />
        <p>{errors["nameError"]}</p>
        <br />

        <input type="email" placeholder="Email" value={user.Email} onChange={handleChange("Email")} />
        <br />
        <p>{errors["emailError"]}</p>
        <br />

        <input type="text" placeholder="PhoneNumber" value={user.PhoneNumber} onChange={handleChange("PhoneNumber")} />
        <br />
        <p>{errors["phoneError"]}</p>
        <br />

        <select name="PhoneType" value={user.PhoneType} onChange={handleChange("PhoneType")}>
          <option value="PhoneType" disabled>PhoneType</option>
          <option value="Home">Home</option>
          <option value="Work">Work</option>
          <option value="Mobile">Mobile</option>
        </select>
        <br />
        <p>{errors["phoneTypeError"]}</p>
        <br />

        {/* <label>Instructor
          <input type="radio" name="Instructor"/>
        </label>
        <label>Student
          <input type="radio" name="Student" />
        </label>

        <label>Sign Up for Email Notifications
          <input type="checkbox" />
        </label> */}

        <input type="submit" />
      </form>

      <textarea name="Bio" form="userform" value={user.Bio} maxLength="280" onChange={handleChange("Bio")}>Enter text here...</textarea>
      <br />
      <p>{errors["bioLengthError"]}</p>
      <br />
    </>
  );
}