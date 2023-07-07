import { useState } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@emotion/react";
import IconButton from "./IconButton";
import { socket } from "../App";

const Backdrop = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(5px);
    background: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    place-items: center;
    z-index: 100;
`;

const Panel = styled.article`
    width: 20em;
    background: ${() => useTheme().button.primary};
    color: ${() => useTheme().text};
    drop-shadow: 0 0 1em ${() => useTheme().shadow};
    padding: 1em;
    border-radius: 1em;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const FieldLabel = styled.label`
    font-size: 1.1em;
    margin-bottom: 0.5em;
`;

const TextField = styled.input`
    background-color: ${() => useTheme().background};
    color: ${() => useTheme().text};
    border: 1px solid;
    border-color: ${() => useTheme().background};
    border-radius: 0.25em;
    padding: 1em;
    font-size: 1.2em;
`;

const TitleBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SubmitButton = styled.button`
    background: ${() => useTheme().button.submit};
    color: ${() => useTheme().background};
    border: 1px solid;
    border-color: ${() => useTheme().background};
    border-radius: 0.25em;
    padding: 1em;
    font-size: 1.2em;
    margin-top: 1em;
    width: 100%;
`;

const ErrorText = styled(motion.p)`
    color: ${() => useTheme().error};
    font-size: 1.1em;
    margin-top: 1em;
`;

export default function SignUpForm({ display, setDisplay, handleSubmit }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");

    // when the user clicks off the main panel, close the settings dialog
    function unFocus(e) {
        if (e.target.id === "signup-backdrop") {
            setUsername("");
            setEmail("");
            setPassword("");
            setPasswordConfirm("");
            setError("");
            setDisplay(false);
        }
    }

    function formSubmit(e) {
        e.preventDefault();

        if (password !== passwordConfirm) {
            setError("Passwords do not match");
        } else {
            handleSubmit({ username, email, password }, (res) => {
                if (res.error) {
                    setError(res.error);
                } else {
                    console.log(res);
                }
            });
        }
    }

    return (
        <AnimatePresence>
            {display && (
                <Backdrop
                    id="signup-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => unFocus(e)}
                >
                    <Panel>
                        <TitleBar>
                            <h1>Sign Up 🤟</h1>
                            <IconButton
                                icon="❌"
                                onClick={(e) => setDisplay(false)}
                            />
                        </TitleBar>
                        <p>How totally rad of you to consider joining us.</p>
                        <motion.form
                            animate={{ height: error ? "auto" : "30em" }}
                            onSubmit={(e) => formSubmit(e)}
                        >
                            <InputGroup>
                                <FieldLabel htmlfor="email">Email</FieldLabel>
                                <TextField
                                    type="email"
                                    name="email"
                                    placeholder="..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup>
                                <FieldLabel htmlfor="username">
                                    Username
                                </FieldLabel>
                                <TextField
                                    type="text"
                                    name="username"
                                    placeholder="..."
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </InputGroup>
                            <InputGroup>
                                <FieldLabel htmlfor="password1">
                                    Password
                                </FieldLabel>
                                <TextField
                                    type="password"
                                    name="password1"
                                    placeholder="..."
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </InputGroup>
                            <InputGroup>
                                <FieldLabel htmlfor="password2">
                                    Confirm Password
                                </FieldLabel>
                                <TextField
                                    type="password"
                                    name="password2"
                                    placeholder="..."
                                    value={passwordConfirm}
                                    onChange={(e) =>
                                        setPasswordConfirm(e.target.value)
                                    }
                                />
                            </InputGroup>
                            <AnimatePresence>
                                {error && (
                                    <ErrorText
                                        initial={{ y: -300, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                    >
                                        {error}
                                    </ErrorText>
                                )}
                            </AnimatePresence>
                            <SubmitButton type="submit">Sign Up</SubmitButton>
                        </motion.form>
                    </Panel>
                </Backdrop>
            )}
        </AnimatePresence>
    );
}
