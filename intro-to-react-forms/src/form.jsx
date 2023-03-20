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
    })


    const handleChange = function(field) {
        return function(e) {
            const value = e.target.value;
            setUser({
                ...user,
                [field]: value
            });
        }
    }







    return (
        <>
            <form id="userform">
                <input type="text" placeholder="Name" value={user.Name} onChange={handleChange("Name")}/>
                <input type="email" placeholder="Email" value={user.Email} onChange={handleChange("Email")}/>
                <input type="text" placeholder="Phone_number" value={user.Phone_number} onChange={handleChange("Phone_number")}/>

                {/* <select name="Phone_type">
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Mobile">Mobile</option>
                </select>

                <label>Instructor
                    <input type="radio" name="Instructor"/>
                </label>

                <label>Student
                    <input type="radio" name="Student" />
                </label>

                <label>Sign Up for Email Notifications
                    <input type="checkbox" />
                </label> */}
                
            </form>
        
            {/* <textarea name="Bio" form="userform" value={user.Bio}>Enter text here...</textarea> */}
        </>
    
    );
}