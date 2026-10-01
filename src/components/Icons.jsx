const base = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const SearchIcon = (p) => (<svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>);
export const CartIcon = (p) => (<svg {...base} {...p}><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2" /><circle cx="10" cy="20.5" r="1.2" /><circle cx="17" cy="20.5" r="1.2" /></svg>);
export const HeartIcon = ({ filled, ...p }) => (<svg {...base} fill={filled ? 'currentColor' : 'none'} {...p}><path d="M12 20s-7.5-4.6-9.2-9.3C1.6 7.2 4 4 7.3 4c2 0 3.6 1.1 4.7 2.7C13.1 5.1 14.7 4 16.7 4 20 4 22.4 7.2 21.2 10.7 19.5 15.4 12 20 12 20Z" /></svg>);
export const MenuIcon = (p) => (<svg {...base} {...p}><path d="M4 6h16M4 12h16M4 18h16" /></svg>);
export const UserIcon = (p) => (<svg {...base} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>);
export const HomeIcon = (p) => (<svg {...base} {...p}><path d="M4 11 12 4l8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" /></svg>);
export const GridIcon = (p) => (<svg {...base} {...p}><rect x="4" y="4" width="7" height="7" rx="2" /><rect x="13" y="4" width="7" height="7" rx="2" /><rect x="4" y="13" width="7" height="7" rx="2" /><rect x="13" y="13" width="7" height="7" rx="2" /></svg>);
export const BoltIcon = (p) => (<svg {...base} fill="currentColor" stroke="none" {...p}><path d="M13.5 2 4 14h6.5L9 22l11-13h-7z" /></svg>);
export const StarIcon = (p) => (<svg {...base} fill="currentColor" stroke="none" {...p}><path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z" /></svg>);
export const XIcon = (p) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const ChevronLeft = (p) => (<svg {...base} {...p}><path d="m15 5-7 7 7 7" /></svg>);
export const ChevronRight = (p) => (<svg {...base} {...p}><path d="m9 5 7 7-7 7" /></svg>);
export const CheckIcon = (p) => (<svg {...base} strokeWidth={3} {...p}><path d="m5 12 5 5 9-10" /></svg>);
