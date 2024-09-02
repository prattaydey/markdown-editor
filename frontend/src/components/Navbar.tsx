import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Document } from "../types";

interface NavbarProps {
    isSidebar: boolean;
    toggleSidebar: () => void;
    username: string;
    fileId: string;
    fileName: string;
    setFileName: (title: string) => void;
    currentMarkdown: string;
    setFiles: React.Dispatch<React.SetStateAction<Document[]>>;
    fetchData: () => Promise<void>; // Add fetchData to props
}

const Navbar = ({ isSidebar, toggleSidebar, username, fileId, fileName, setFileName, currentMarkdown, setFiles, fetchData } : NavbarProps) => {
    const navigate = useNavigate();
    const [buttonText, setButtonText] = useState("Save Changes"); // State for button text
    const [buttonColor, setButtonColor] = useState("bg-violet-600"); // State for button color

    const changeDocumentName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.value);
    };

    const handleSaveFile = async() => {
        try {
            const res = await fetch(`/api/files/${fileId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: fileName, text: currentMarkdown })
            });
            const data = await res.json()
            if (data.error){
                console.log(data.error)
                return;
            }
            console.log("File saved successfully:", data);
            setButtonText("File Saved");
            setButtonColor("bg-green-600");
      
            // Revert button state after 3 seconds
            setTimeout(() => {
              setButtonText("Save Changes");
              setButtonColor("bg-violet-600");
              fetchData();
            }, 3000);
        } catch (error) {
            console.error("Error saving file:", error);
        }
    }

    const handleDeleteFile = async() => {
        try {
            const res = await fetch(`/api/files/${fileId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await res.json();
            if (data.error){
                console.log(data.error);
                return;
            }
            // Update files state by removing the deleted file
            setFiles((prevFiles) => {
                const updatedFiles = prevFiles.filter(file => file._id !== fileId);

            // Redirect to the top file of the updated files array
                if (updatedFiles.length > 0) {
                navigate(`/${username}/${updatedFiles[0]._id}`);
                } else {
                navigate("/");  // or navigate to a default route if no files remain
                }

                return updatedFiles;  // Return the updated files array to update the state
            });
            console.log("File deleted successfully:", data);
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    }
    
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
                    value={fileName}
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
            <button className="ml-4 p-2 pr-6 bg-transparent" onClick={handleDeleteFile}>
                <div>
                    <img src="/assets/icon-delete.svg" alt="trash icon" />
                </div>
            </button>
            {/* Save Button */}
            <button className={`flex items-center py-2 px-3 ${buttonColor} text-white rounded`} onClick={handleSaveFile}>
                <div className="pr-2">
                    <img src="/assets/icon-save.svg" alt="save icon" />
                </div>
                {buttonText}
            </button>
        </div>
    </div>
  );
};

export default Navbar;

