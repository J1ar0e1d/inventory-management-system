import { Link } from "react-router-dom";
import styled from "styled-components";

const CategoryList = ({ categories }) => (
  <div>
    {categories.map((cat) => (
      <Link key={cat} to={`/category/${cat}`}>
        <StyledCategory>{cat}</StyledCategory>
      </Link>
    ))}
  </div>
);

const StyledCategory = styled.div`
  padding: 0.75rem;
  margin: 0.5rem 0;
  background: #def7e5;
  border-radius: 10px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: #c1efcf;
  }
`;

export default CategoryList;
