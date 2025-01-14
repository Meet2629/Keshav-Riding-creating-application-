import  { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const navigate = useNavigate();

  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user)
        localStorage.setItem('token',data.token)
        navigate('/login')
      }

      setEmail('');
      setPassword('');
      setFirstname('');
      setLastname('');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="p-7 h-screen flex-col justify-between">
      <div>
        <div className="p-7">
          <h2 className="text-3xl font-bold text-left w-16 mb-10">Keshav</h2>
          <form onSubmit={submitHandler}>
            <h3 className="text-lg font-medium mb-2">What is your name</h3>
            <div className="flex gap-4 mb-6">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
                type="text"
                placeholder="First name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
                type="text"
                placeholder="Last name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <h3 className="text-lg font-medium mb-2">What is your email</h3>
            <input
              required
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h3 className="text-lg font-medium mb-2">Enter your password</h3>
            <input
              required
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-[#111] text-white font-semibold mb-6 rounded px-4 py-2 w-full text-lg placeholder:text-base">
              Create Account
            </button>
          </form>
          <p className="text-center">
            Already have an account? <Link to="/login" className="text-blue-600 mb-7">Login here</Link>
          </p>
        </div>
      </div>
      <div className="text-[10px] leading-tight">
        <p>This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service apply</span>.</p>
      </div>
    </div>
  );
};

export default UserSignup;
