import styled from "styled-components";
import iconDocument from "/assets/icon-document.svg";
import { Document } from "../types";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom.ts"

// This interface is for the props used by StyledSidebar only
interface StyledSidebarProps {
    $isSidebar: boolean;
}
  
// This interface is for the props passed to the Sidebar component
interface SidebarProps extends StyledSidebarProps {
    toggleSidebar: () => void;
    documents: Document[];
}

const StyledSidebar = styled.div<StyledSidebarProps>`
  height: 100vh;
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #1d1f22;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;

  transform: translateX(${({ $isSidebar }) => ($isSidebar ? "0px" : "-250px")});
  transition: transform 0.3s ease;
`;

const DocumentsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding-left: 24px;
`;

const DocumentsTitle = styled.div`
  margin-top: 27px;
  margin-bottom: 29px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 2px;
  color: #7c8187;
`;

const DocumentsList = styled.div`
  max-height: calc(100vh - 208px);
  margin-top: 24px;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  overflow-y: auto;
`;

const DocumentLink = styled.div`
  height: 36px;
  margin-bottom: 26px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const DocumentIcon = styled.img`
  margin-right: 16px;
`;

const DocumentInformation = styled.div``;

const DocumentDate = styled.div`
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 13px;
  color: #7c8187;
`;

const DocumentName = styled.div`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 15px;
  color: #ffffff;

  ${DocumentLink}:hover & {
    color: #7943e4;
  }
`;

const ThemeContainer = styled.div`
  padding-left: 24px;
  padding-bottom: 24px;
`;

const StyledCreateButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 202px;
  height: 40px;
  padding: 0px 17px;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  background-color: #7943e4;
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  cursor: pointer;

  &:hover {
    background-color: #8153db;
  }
`;

const StyledLogoutButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 202px;
    height: 40px;
    margin: 10px auto; // Center horizontally and add margin for spacing
    border: none;
    border-radius: 4px;
    color: #ffffff;
    background-color: #7943e4;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    cursor: pointer;

    &:hover {
      background-color: #8153db;
    }
`;



const Sidebar = ({ $isSidebar, toggleSidebar, documents } : SidebarProps) => {
  const setUser = useSetRecoilState(userAtom);

	const handleLogout = async () => {
		try {
			const res = await fetch("/api/users/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();

			if (data.error) {
        console.log(data.error)
				return;
			}

			localStorage.removeItem("user-info");
			setUser(null);
		} catch (error) {
			console.log(error)
		}
  };

  return (
    <StyledSidebar $isSidebar={$isSidebar}>
      <DocumentsContainer>
        <DocumentsTitle>MY DOCUMENTS</DocumentsTitle>
        <StyledCreateButton>+ New Document</StyledCreateButton>
        <DocumentsList>
          {documents &&
            documents.map((document) => (
              <DocumentLink
                onClick={() => {
                  // handle document click
                  toggleSidebar();
                }}
                key={document.id}
              >
                <DocumentIcon src={iconDocument} />
                <DocumentInformation>
                  <DocumentDate>{document.createdAt}</DocumentDate>
                  <DocumentName>
                    {document.name.length > 21
                      ? document.name.slice(0, 20) + "..."
                      : document.name}
                  </DocumentName>
                </DocumentInformation>
              </DocumentLink>
            ))}
        </DocumentsList>
      </DocumentsContainer>
      <StyledLogoutButton style={{ marginBottom: '30px' }} onClick={handleLogout}>Logout</StyledLogoutButton>
    </StyledSidebar>
  );
};

export default Sidebar;