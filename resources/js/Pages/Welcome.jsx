import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";
import { X } from "lucide-react";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

export default function Welcome({ auth }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Head title="Welcome" />

            <div
                className="uk-flex uk-flex-column"
                style={{ minHeight: "100vh" }}
            >
                {/* Navbar */}
                <nav
                    className="uk-navbar-container uk-navbar-transparent"
                    uk-navbar="true"
                >
                    <div className="uk-container">
                        <div className="uk-navbar">
                            <div className="uk-navbar-left">
                                <span className="uk-navbar-item uk-logo">
                                    MyApp
                                </span>
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

                {/* Center Section */}
                {!auth.user && (
                    <div className="uk-flex-1 uk-flex uk-flex-center uk-flex-middle">
                        <div
                            className="uk-card uk-card-default uk-card-body uk-text-center"
                            style={{ width: 320 }}
                        >
                            <button
                                className="uk-button uk-button-default"
                                onClick={() => setOpen(true)}
                            >
                                Get started
                            </button>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <footer className="uk-section uk-section-small uk-text-center uk-background-secondary uk-light">
                    <div className="uk-container">
                        © {new Date().getFullYear()} MyApp. All rights reserved.
                    </div>
                </footer>

                {/* Modal */}
                {open && (
                    <div
                        className="uk-modal uk-open"
                        style={{ display: "block" }}
                    >
                        <div className="uk-modal-dialog uk-modal-body uk-position-relative">
                            {/* Close Icon Right Top */}
                            <button
                                onClick={() => setOpen(false)}
                                style={{
                                    position: "absolute",
                                    top: 15,
                                    right: 15,
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                <X size={20} />
                            </button>

                            {/* Switcher Tabs */}
                            <ul
                                className="uk-subnav uk-subnav-pill uk-flex-center"
                                uk-switcher="animation: uk-animation-fade"
                            >
                                <li className="uk-active">
                                    <Link href="#">Login</Link>
                                </li>

                                <li>
                                    <Link href="#">Register</Link>
                                </li>
                            </ul>

                            {/* Switcher Content */}
                            <ul className="uk-switcher uk-margin">
                                <li>
                                    <Login />
                                </li>

                                <li>
                                    <Register />
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
