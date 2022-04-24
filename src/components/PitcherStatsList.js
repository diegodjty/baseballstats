import React from 'react';
import styled from '@emotion/styled';

const Number = styled.span`
  color: #ffe600;
`;
const PitcherStatsList = ({ pitcher, index, select }) => {
  return (
    <li>
      <span>{index + 1}-</span>
      {pitcher.name}
      <Number className="quantity">
        {select !== 'w' ? pitcher[select] : pitcher[select]}
      </Number>{' '}
      {/*only fix to 3 positions the avg*/}
    </li>
  );
};

export default PitcherStatsList;
