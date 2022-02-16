import React, { useState } from "react";

function SignUpForm(props) {
  const [person, setPerson] = useState({
    name: "",
    job: ""
  });

  function submitForm() {
    props.handleSubmit(person);
    setPerson({ username: "", password: "" }); /*  id: ''  this was added*/
  }

  function handleChange(event) {
    const { name, value } = event.target; /* added id*/
    if (name === "password") setPerson({ username: person["username"], password: value });
    else setPerson({ username: value, password: person["password"] });
  }

  return (
    <form>
      <div className = "form">
      <label htmlFor="name">Username</label>
      <input
        type="text"
        name="username"
        value={person.username}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="text"
        name="password"
        value={person.password}
        onChange={handleChange}
      />
      </div>
      
      <input type="button" value="SignUp" onClick={submitForm} />
    </form>
  );
}

export default SignUpForm;
