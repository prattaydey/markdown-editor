import { atom } from "recoil";

const userAtom = atom({
	key: "userAtom",
	default: localStorage.getItem("user-threads") 
	? JSON.parse(localStorage.getItem("user-threads") as string) 
	: null,
});

export default userAtom;