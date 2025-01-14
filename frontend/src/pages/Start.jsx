import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div
        className="bg-cover bg-center bg-[url(https://img.freepik.com/free-vector/taxi-application-theme_23-2148489550.jpg)] h-screen pt-8 flex justify-between flex-col w-full "
      >
        {/* Logo Section */}
        <header>
          <h2 className="text-3xl font-bold text-left py-4 px-4 ">Keshav</h2>
         {/* <img 
            className="w-16 ml-8" 
            src="../assets/k.png"
            alt="Keshav Logo"
          /> */}
        </header>

        {/* Main Content Section */}
        <div className="bg-white pb-7 py-4 px-4 flex flex-col items-center">
          <h2 className="text-[30px] font-bold text-center">Get Started with Keshav</h2>
          
          <Link
            to="/login"  // Adjust the path as needed
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5 max-w-xs mx-auto"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
 