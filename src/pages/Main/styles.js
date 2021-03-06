import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Form = styled.form.attrs(props => ({}))`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;

    ${props =>
      props.error
        ? css`
            border: 1px solid #f00;
          `
        : css`
            border: 1px solid #eee;
          `}
  }
`;

const rotate = keyframes`
from{
  transform:rotate(0deg)
}
to{
  transform:rotate(360deg)
}`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const ErrorMessage = styled.p`
  flex: 1;
  padding: 5px;
  font-size: 12px;
  min-height: 25px;
  color: #f00;
`;

export const LinkButton = styled(Link)`
  border: 1px solid #7159c1;
  color: #7159c1;
  padding: 10px;
  border-radius: 4px;

  :hover {
    background: #7159c1;
    color: #fff;
  }
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }

    span {
      font-size: 16px;
      line-height: 48px;
      color: #2b2b2b;
      text-transform: capitalize;
    }

    a {
      color: #7159c1;
      text-decoration: none;
      float: right;
    }

    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex-direction: row;
      flex: 1;
      margin-left: 15px;
    }
  }
`;
