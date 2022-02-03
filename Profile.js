import React from 'react';
import { fetchUserData, cancelFetch } from './dataFetcher';
import { Userlist } from './Userlist';

export class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {userData: null};
    this.loadUserData = this.loadUserData.bind(this);
  }

  loadUserData() {
    this.setState({userData: null});
    this.fetchID = fetchUserData(this.props.username, (userData) => {
  this.setState({ userData });
});
  }

  render() {
    const isLoading = this.state.userData === null;
    //Displaying User Data
    //username
    let name;
    isLoading ? name = 'Loading...' : name = this.state.userData.name;
    //user bio
    let bio;
    isLoading ? bio = 'Bio loading...' : bio = this.state.userData.bio;
    //friend list
    let friends; 
    isLoading ? friends = [] : friends = this.state.userData.friends;


    let className = 'Profile';
    if (isLoading) {
      className += ' loading';
    }

    return (
      <div className={className}>
        <div className="profile-picture">
          {!isLoading && (
    <img src={this.state.userData.profilePictureUrl} alt="" />
  )}
        </div>
        <div className="profile-body">
          <h2>{name}</h2>
          <h3>@{this.props.username}</h3>
          <p>{bio}</p>
          <h3>My friends</h3>
          <Userlist usernames={friends} onChoose={this.props.onChoose} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.loadUserData();
  }
  componentWillUnmount()  {
    cancelFetch(this.fetchID);
  }
  componentDidUpdate(prevProps) {
    if(this.props.username !== prevProps.username) {
      cancelFetch(this.fetchID);
      this.loadUserData();
    }
  }
}
