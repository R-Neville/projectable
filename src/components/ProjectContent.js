import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './shared/Sidebar';
import SidebarLink from './shared/SidebarLink';
import Frame from './shared/Frame';

const sidebarLinks = [
  {
    to: '/project/unassigned',
    title: 'Unassigned Tasks',
    lightSrc: TasksIconDark,
    darkSrc: TasksIconLight,
    testID: 'project-unassigned-tab',
  },
];

function ProjectContent() {
  const links = linkData.map((linkInfo, i) => {
    return (
      <SidebarLink
        key={i}
        to={linkInfo.to}
        lightSrc={linkInfo.lightSrc}
        darkSrc={linkInfo.darkSrc}
        testID={linkInfo.testID}
      />
    );
  });

  return (
    <div className="flex flex-row w-full h-full">
      <Sidebar links={links}></Sidebar>
      <Routes></Routes>
    </div>
  );
}

export default ProjectContent;
