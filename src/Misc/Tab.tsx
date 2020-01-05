
import React from 'react';
import './Tab.css';

interface IProps {
  setActive: () => void
  text: string
  active?: boolean
}

export const Tab: React.FC<IProps> = (props) => {
  const active = props.active ? "active" : ""
  return (
    <div className={`tab ${active}`} onClick={props.setActive}>
      {props.text}
    </div>
  );

}
Tab.defaultProps = {
  active: false
}