import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

type NavlinkActive = {
  isActive: boolean;
}

const RouterNavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>((navLinkProps, ref) => {
  const activeLinkClass = ({ isActive }: NavlinkActive) => (isActive ? 'active' : '');
  return (<NavLink className={activeLinkClass} ref={ref} {...navLinkProps} />);
});

RouterNavLink.displayName = 'RouterNavLink';

export default RouterNavLink;
