import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Header = () => {
  return (
    <header className="fixed w-full z-50 border-b border-white/10">
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" />
      <div className="absolute inset-0 -z-10 h-full w-full bg-black/30 backdrop-blur-sm" />
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="group -m-1.5 p-1.5">
            <span className="text-2xl font-bold text-white">
              Vault
              <span className="block h-0.5 w-0 group-hover:w-full bg-white transition-all duration-300"></span>
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8 items-center">
          <Link to="/" className="text-sm font-semibold leading-6 text-white hover:text-opacity-80 transition-colors">Home</Link>
          <Link to="/dashboard" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white transition-colors">Dashboard</Link>
          <Link to="/pricing" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white transition-colors">Pricing</Link>
          <Link to="/about" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white transition-colors">About</Link>
          
          <div className="ml-4 flex items-center">
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-8 h-8',
                    userButtonPopoverCard: 'bg-gray-800 border border-gray-700',
                    userPreviewMainIdentifier: 'text-white',
                    userPreviewSecondaryIdentifier: 'text-gray-400',
                    userButtonPopoverActionButtonText: 'text-gray-300 hover:bg-gray-700',
                    userButtonPopoverActionButtonIcon: 'text-gray-400',
                    userButtonPopoverFooter: 'bg-gray-800 border-t border-gray-700',
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="ml-4 rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors">
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
