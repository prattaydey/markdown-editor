import styled from "styled-components";
import iconDelete from "/assets/icon-delete.svg";

const StyledDeleteButton = styled.button`
  height: 20px;
  width: 18px;
  margin-right: 24px;
  padding: 0%;
  background-color: #2b2d31;
  cursor: pointer;
  border: none;

  /* &:hover {
    color: #e46643;
  } */
`;

// const DeleteIcon = styled.img`
//   &:hover {
//     filter: ${({ disabled }) =>
//       disabled
//         ? ""
//         : "invert(55%) sepia(52%) saturate(4781%) hue-rotate(339deg) brightness(99%) contrast(80%)"};
//   }
// `;

const DeleteButton = () => {
  return (
    <button className="ml-4 p-2 pr-6 bg-transparent hover">
        <div>
            <img src="/assets/icon-delete.svg" alt="trash icon" />
        </div>
    </button>
  );
};

export default DeleteButton;