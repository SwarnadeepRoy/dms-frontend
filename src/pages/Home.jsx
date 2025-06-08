import { Link } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';


const Home = () => {

    const { openSignIn } = useClerk();
    const navigate = useNavigate();

    const handleGetStarted = () => {
        // If user is not signed in, open the sign-in modal
        // After successful sign-in, they'll be redirected to the dashboard
        openSignIn({
            afterSignInUrl: '/dashboard',
            afterSignUpUrl: '/dashboard'
        });
    };

    return (
        <div className="relative min-h-screen">
            {/* Background gradient */}
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            {/* Main content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Left side - Text content */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl lg:text-6xl">
                            The easiest way to upload and share files with your company
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Make an account and start managing your files in less than a minute.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                            <button
                                onClick={handleGetStarted}
                                className="w-full sm:w-auto rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center"
                            >
                                Get started
                            </button>
                            <a
                                href="/about"
                                className="text-sm font-semibold leading-6 text-white hover:text-indigo-200 transition-colors"
                            >
                                Learn more <span aria-hidden="true">→</span>
                            </a>
                        </div>

                        <div className="mt-8">
                            <Link
                                to="/nonexistent"
                                className="text-indigo-300 hover:text-white hover:underline transition-colors z-10 inline-block"
                            >
                                {/* Click here to test 404 page */}
                            </Link>
                        </div>
                    </div>

                    {/* Right side - Video */}
                    <div className="lg:w-1/2 w-full max-w-2xl mx-auto lg:mx-0">
                        <div className="relative overflow-hidden rounded-xl shadow-2xl">
                            <video autoPlay loop muted playsInline className="w-full h-auto rounded-lg">
                                <source
                                    src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;