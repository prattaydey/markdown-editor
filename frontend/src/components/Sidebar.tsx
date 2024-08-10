import styled from "styled-components";
import iconDocument from "../../assets/icon-document.svg";

const StyledSidebar = styled.div`
  height: 100vh;
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #1d1f22;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;

  transform: translateX(${({ showSidebar }) => (showSidebar ? "0px" : "-250px")});
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
    color: #e46643;
  }
`;

const ThemeContainer = styled.div`
  padding-left: 24px;
  padding-bottom: 24px;
`;

const Sidebar = ({ isSidebar, toggleSidebar, documents }) => {
  return (
    <StyledSidebar isSidebar={isSidebar}>
      <DocumentsContainer>
        <DocumentsTitle>MY DOCUMENTS</DocumentsTitle>
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
      <ThemeContainer>
        {/* Add ThemeSelection component here */}
      </ThemeContainer>
    </StyledSidebar>
  );
};

export default Sidebar;
