// add a site description @loops
import React from 'react';
import styled from 'styled-components';
import { createFragmentContainer, graphql } from 'react-relay';

const StyledComponent = styled.div`
  text-align: center;
`;

const App = () => (
  <StyledComponent>
    {/* <p>Proper JSX commenting </p> */}
    <input
      name="input"
      //  placeholder="comments properly if attributes are split"
    />
  </StyledComponent>
);

export default createFragmentContainer(
App,
graphql`
fragment Properly_Hi on Model {
  requestVariables
}`

);
