

const Header = () => {
  return (
    <header className="bg-white shadow-lg py-4 px-6 flex justify-between items-center">
      <div className="text-2xl font-bold text-gray-800">CodeMingle</div>
      <div className="space-x-4">
        <button className="px-4 py-2 border border-gray-800 rounded text-gray-800 hover:bg-gray-200">Log In</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
