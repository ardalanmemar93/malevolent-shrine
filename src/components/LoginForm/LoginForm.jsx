import { useState } from 'react';
import * as usersService from '../../utilities/users-service';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div>
      <div className="form-container neon max-w-xs mx-auto mt-8 p-4 rounded-md">
        <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="text-white">Email</label>
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
          />
          <label className="text-white">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className=" neon {`neon px-4 py-2 rounded-full transition duration-300 ${disable ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} focus:outline-none bg-red-500`}"
          >
            LOG IN
          </button>
        </form>
      </div>
      <p className="error-message text-red-500">&nbsp;{error}</p>
    </div>
  );
}
