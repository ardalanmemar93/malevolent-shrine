import { Component } from 'react';
import { signUp } from '../../utilities/users-service';
import './SignUpForm.css';


export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const {name, email, password} = this.state;
      const formData = {name, email, password};
      // The promise returned by the signUp service
      // method will resolve to the user object included
      // in the payload of the JSON Web Token (JWT)
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      // An error occurred
      // Probably due to a duplicate email
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;

    return (
      <div>
        <div className="form-container neon max-w-md mx-auto mt-8 p-4 rounded-md">
          <form autoComplete="off" onSubmit={this.handleSubmit} className="flex flex-col space-y-4">
            <label className="text-white">Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
              className="px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            />
            <label className="text-white">Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
              className="px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            />
            <label className="text-white">Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
              className="px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            />
            <label className="text-white">Confirm</label>
            <input
              type="password"
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleChange}
              required
              className="px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={disable}
              className={`neon px-4 py-2 rounded-full transition duration-300 ${disable ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} focus:outline-none bg-red-500`}
            >
              SIGN UP
            </button>
          </form>
        </div>
        <p className="error-message text-red-500">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}