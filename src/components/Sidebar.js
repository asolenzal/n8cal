import React from 'react';
import styled from 'styled-components';
import CalendarForm from './forms/CalendarForm';

const Sidebar = () => (
  <SidebarContainer>
    <Header className="mt-5">
      Calendar Data
    </Header>
    <CalendarForm />
    <div className="row">
      <div className="col">
        <Note className="mt-5">
          Hover on holidays to see holiday name
        </Note>
      </div>
    </div>
  </SidebarContainer>
);

const SidebarContainer = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  width: 300px;
  background-color: #2c3e50;
`;

const Header = styled.h1`
  color: #fff;
  font-size: 24px;
  text-align: center;
`;

const Note = styled.p`
  color: #f2f2f2;
  text-align: center;
`;

export default Sidebar;
