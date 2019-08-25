import styled, { keyframes, css } from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  display: flex;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    svg {
      margin-right: 5px;
    }
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    margin-top: 10px;
    font-size: 24px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          color: #333;
          background: #eee;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  align-self: auto;
  margin-left: 110px;
`;

export const ButtonFilter = styled.button`
  border: 1px solid #eee;
  border-radius: 4px;
  min-width: 100px;
  color: #fff;
  font-size: 16px;
  padding: 10px;
  margin: 20px;

  ${props =>
    props.enabled
      ? css`
          background: #7159c1;
        `
      : css`
          background: #eee;
          border: 1px solid #ccc;
          color: #ccc;
        `}
`;

export const ButtonPrevious = styled.button.attrs(props => ({
  disabled: props.disabled,
}))`
  border: 1px solid #eee;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  background: #7159c1;
  padding: 10px;
  margin-top: 20px;

  &:disabled {
    background: #eee;
    color: #666;
    cursor: unset;
    border: 1px solid #666;
  }
`;

export const ButtonNext = styled.button.attrs(props => ({
  disabled: props.disabled,
}))`
  border: 1px solid #eee;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  background: #7159c1;
  padding: 10px;
  float: right;
  margin-top: 20px;

  &:disabled {
    background: #eee;
    color: #666;
    cursor: unset;
    border: 1px solid #666;
  }
`;
