import React, { Component } from 'react';
import Header from "./components/Header";
import { FilteringTable } from "./components/FilteringTable"
import API from "../src/utils/API"


class App extends Component {
  // Create a state for the App component
  state = {
    users: []
  }

  componentDidMount() {
    // On mount, run the API call to get the user data that we will be displaying in the directory
    API.getData()
    .then(({data:{employees}}) => {
      // Set up the user object array that we will be passing into the table component
      let users = employees.map(user => {
        return {
          id: user.id || "N/A",
          avatar: <img src= {user.avatar} alt="Avatar" />,
          firstName: user.firstName,
          lastName: user.lastName,
          contactNo: user.contactNo,
          address: user.address
        }
      })
      this.setState({users})
    })
  }
// Render the web page, no need for a router since it's a single web page
  render() {

  return (
    <div className = "main">
      <Header />
      {/* pass in the user data into the filtering table as a prop */}
      <FilteringTable 
      data = {this.state.users} />
    </div>
  );
  }
}

export default App;


// return (
//   <div className="App">
//     <button onClick={() => setShow(true)}>Show Modal</button>
//     <Modal title="My Modal" onClose={() => setShow(false)} show={show}>
//       <p>This is modal body</p>
//     </Modal>
//   </div>
// );