import { atom } from "recoil";

const userAtom = atom({
	key: "userAtom",
	default: localStorage.getItem("user-info") 
	? JSON.parse(localStorage.getItem("user-info") as string) 
	: null,
});

export default userAtom;