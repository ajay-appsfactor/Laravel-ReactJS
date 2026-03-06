import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />

            <div className="uk-flex uk-flex-column" style={{ minHeight: "100vh" }}>

                {/* Navbar */}
                <nav className="uk-navbar-container uk-navbar-transparent" uk-navbar="true">
                    <div className="uk-container">
                        <div className="uk-navbar">

                            <div className="uk-navbar-left">
                                <span className="uk-navbar-item uk-logo">MyApp</span>
                            </div>

                            <div className="uk-navbar-right">
                                {auth.user && (
                                    <Link
                                        href={route("dashboard")}
                                        className="uk-button uk-button-primary"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                            </div>

                        </div>
                    </div>
                </nav>

                {/* Center Auth Switcher */}
                {!auth.user && (
                    <div className="uk-flex-1 uk-flex uk-flex-center uk-flex-middle">

                        <div className="uk-card uk-card-default uk-card-body uk-text-center" style={{ width: 320 }}>

                            {/* Switcher Tabs */}
                            <ul className="uk-subnav uk-subnav-pill uk-flex-center" uk-switcher="animation: uk-animation-fade">
                                <li className="uk-active">
                                    <Link href={route("login")}>Login</Link>
                                </li>

                                <li>
                                    <Link href={route("register")}>Register</Link>
                                </li>
                            </ul>

                            {/* Switcher Content */}
                            <ul className="uk-switcher uk-margin">
                                <li>
                                    <p>Go to Login Page</p>

                                    <Link
                                        href={route("login")}
                                        className="uk-button uk-button-primary uk-width-1-1"
                                    >
                                        Login
                                    </Link>
                                </li>

                                <li>
                                    <p>Create a new account</p>

                                    <Link
                                        href={route("register")}
                                        className="uk-button uk-button-secondary uk-width-1-1"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </ul>

                        </div>

                    </div>
                )}

                {/* Footer */}
                <footer className="uk-section uk-section-small uk-text-center uk-background-secondary uk-light">
                    <div className="uk-container">
                        © {new Date().getFullYear()} MyApp. All rights reserved.
                    </div>
                </footer>

            </div>
        </>
    );
}