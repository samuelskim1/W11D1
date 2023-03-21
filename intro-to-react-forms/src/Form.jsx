import {useState} from "react";

export default function Form() {
  const [user, setUser] = useState({
    Name: "",
    Email: "",
    Phone_number: "",
    Phone_type: "",
    Staff: "",
    Bio: "",
    Sign_up_for_email_notifications: ""
  });

  const handleChange = (field) => {
    return (e) => {
      const value = e.target.value;
      setUser({
        ...user,
        [field]: value
      });
    };
  };

  const [errors, setErrors] = useState({});

  const validate = () => {
    const currentErrors = {};

    // name validation
    if (!user.Name) currentErrors["nameError"] = "Name is missing.";
    // email validation
    if (!user.Email || !(user.Email.split("@").length === 2)) currentErrors["emailError"] = "Email is invalid.";
    // phone number validation
    if (!(user.Phone_number.length === 10)) currentErrors["phoneError"] = "Phone number is invalid.";
    const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    for (let char of user.Phone_number) {
        if (!nums.includes(char)) currentErrors["phoneError"] = "Phone number is invalid.";
    }
    // phone type validation
    if (user.Phone_number && !user.Phone_type) currentErrors["phoneTypeError"] = "Please select Phone type.";
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

        <input type="text" placeholder="Phone number" value={user.Phone_number} onChange={handleChange("Phone_number")} />
        <br />
        <p>{errors["phoneError"]}</p>
        <br />

        <select name="Phone_type" value="Phone type" onChange={handleChange("Phone_type")}>
          <option value="Phone type" disabled>Phone type</option>
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