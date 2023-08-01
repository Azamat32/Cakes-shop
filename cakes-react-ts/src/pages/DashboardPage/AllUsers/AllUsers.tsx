import { useEffect, useState } from "react";
import axios from "axios";

type User = {
  id: number;
  username: string;
  phone_number: string;
  // Add more fields as needed
};

const AllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    // Make an API request to fetch all users from the backend
    const token = localStorage.getItem("tokenAdmin");

    axios
      .get("http://localhost:5000/api/user/allUsers", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setUsers(response.data);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>phone</th>
            {/* Add more table headers for additional fields */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.phone_number}</td>
              {/* Add more table data for additional fields */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
