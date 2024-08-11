import styled from "styled-components";

const StyledCreateButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 202px;
  height: 40px;
  padding: 0px 17px;
  margin: 0px;
  margin-right: 16px;
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

const CreateButton = () => {
  return (
    <StyledCreateButton>
      + New Document
    </StyledCreateButton>
  );
};

export default CreateButton;