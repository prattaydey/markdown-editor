const Navbar = () => {
  return (
    <div className="w-full h-17 bg-zinc-700 pr-6 flex justify-between items-center">
        <div className="flex items-center">
            {/* Menu button */}
            <button className="mr-4 p-7 bg-zinc-600">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
            {/* Markdown logo */}
            <div className="text-white font-bold mr-1 pl-1">M A R K D O W N</div>
            {/* Divider */}
            <div className="w-px h-7 bg-gray-500 mx-4 py-6"></div>
            {/* Document Name and Icon */}
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16h16V8l-6-4H4z"></path>
            </svg>
            <div className="pl-3">
                <div className="text-xs">Document Name</div>
                <div>welcome.md</div>
            </div>
         </div>
        <div className="flex items-center">
            {/* Trash Icon */}
            <button className="ml-4 p-2 pr-5 bg-transparent">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2m-5 0v12m0-12v12m0-12H9m6 0h-2m-4 0h2M6 6v14a2 2 0 002 2h8a2 2 0 002-2V6H6z"></path>
                </svg>
            </button>
            {/* Save Button */}
            <button className="flex items-center p-2 bg-orange-500 text-white rounded">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16v-2a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m-2 0h12M7 16v6m10-6v6m-7-3h6"></path> {/* Save icon */}
                </svg>
                Save Changes
            </button>
        </div>
    </div>
  );
};

export default Navbar;

