import { useNavigate } from "react-router-dom";
import { Document } from "../types";

// for the user atom that is passed in
interface User {
    _id: string;
    username: string;
    email: string;
  }

interface EmptyPageProps {
    user: User;
    files: Document[];
    setFiles: React.Dispatch<React.SetStateAction<Document[]>>;
}

export default function EmptyPage({ user, files, setFiles } : EmptyPageProps) {
    const username = user.username;
    const id = user._id;
    const navigate = useNavigate();

    const handleNewFile = async () => {
        try {
          const res = await fetch("/api/files/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ postedBy: id })
          });
          const data = await res.json();
          if (data.error) {
            console.log(data.error)
            return;
          }
          setFiles((prevFiles) => [...prevFiles, data as Document]);
          navigate(`/${username}/${data._id}`);
          console.log("New document created:", data)
    
        } catch (error) {
          console.log(error)
        }
      }

    return (
      <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center" style={{ height: 'calc(100vh - 3.5rem)' }}>
        <div className="mb-4 mr-3">
          <img
            src="/assets/circle-plus-sign.png"
            alt="Plus"
            className="w-16 h-16"
            onClick={handleNewFile}
          />
        </div>
        <div className="text-zinc-300 text-2xl font-bold text-center p-4">
          Press to Create File
        </div>
      </div>
    );
  }
  