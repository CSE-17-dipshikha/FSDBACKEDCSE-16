import { useState } from "react";
import axios from "axios";

function UserForm() {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        user
      );

      console.log(response.data);
      alert("User saved successfully!");
    } catch (error) {
      console.log(error);
      alert("Error saving user");
    }
  };

  const handleReset = () => {
    setUser({
      id: "",
      name: "",
      email: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    alert("Form submitted!");
  };

  return (
    <div>
      <h2>ENTER USER DETAIL</h2>

      <form onSubmit={handleSubmit}>
        <label>User ID</label>
        <input
          type="text"
          name="id"
          value={user.id}
          onChange={handleChange}
        />

        <br /><br />

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />

        <br /><br />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        <br /><br />

        <button type="button" onClick={handleSave}>
          Save
        </button>

        <button type="button" onClick={handleReset}>
          Reset
        </button>

        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserForm;