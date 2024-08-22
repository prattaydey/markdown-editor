import { useState } from "react";

interface NavbarProps {
    isSidebar: boolean;
    toggleSidebar: () => void;
}

const Navbar = ({ isSidebar, toggleSidebar } : NavbarProps) => {
    const [documentName, setDocumentName] = useState("welcome.md");

    const changeDocumentName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDocumentName(e.target.value);
    };

    return (
    <div className="w-full h-13 bg-zinc-700/70 pr-6 flex justify-between items-center">
        <div className="flex items-center">
            {/* Menu button */}
            <button className="mr-4 p-7 bg-zinc-600/40 hover:bg-violet-600" onClick={toggleSidebar}>
                <div>
                    <img 
                    src={`/assets/${isSidebar? `icon-close` : `icon-menu`}.svg`} alt="menu" />
                </div>
            </button>
            {/* Markdown logo */}
            <div className="mr-1 pl-3 pr-3">
                <img src="/assets/logo.svg" alt="logo icon" />
            </div>
            {/* Divider */}
            <div className="w-px h-7 bg-gray-500 mx-4 py-6"></div>
            {/* Document Name and Icon */}
            <div className="pl-1">
                <img src="/assets/icon-document.svg" alt="file icon" />
            </div>
            <div className="pl-5">
                <div className="text-xs text-white">Document Name</div>
                <input
                    type="text"
                    className="bg-transparent border-none text-white text-lg outline-none focus:underline"
                    value={documentName}
                    onChange={changeDocumentName}
                    // disables red underlines
                    spellCheck="false"   
                    autoComplete="off"   
                    autoCorrect="off"    
                    autoCapitalize="off" 
                    aria-invalid="false" 
                />
            </div>
         </div>
        <div className="flex items-center">
            {/* Trash Icon */}
            <button className="ml-4 p-2 pr-6 bg-transparent">
                <div>
                    <img src="/assets/icon-delete.svg" alt="trash icon" />
                </div>
            </button>
            {/* Save Button */}
            <button className="flex items-center py-2 px-3 bg-violet-600 text-white rounded">
                <div className="pr-2">
                    <img src="/assets/icon-save.svg" alt="save icon" />
                </div>
                Save Changes
            </button>
        </div>
    </div>
  );
};

export default Navbar;

