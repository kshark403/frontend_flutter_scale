import React from "react";

import { UserProvider } from "./UserContext";
import { ArticleProvider } from "./ArticleContext";

const providers = [
    UserProvider,
    ArticleProvider
]

// Chao: react version is not support, to get rid the error
// https://stackoverflow.com/questions/59106742/typescript-error-property-children-does-not-exist-on-type-reactnode
interface Props {
    children?: React.ReactNode;
}

//export const UserProvider: React.FC<Props> = ({ children }) => {
const ContextProvider = (...components: React.FC<Props>[]): React.FC<Props> => (
    components.reduce(
        (AccumComponents, Component) => (
            ({ children }): JSX.Element => (
                <AccumComponents>
                    <Component>{children}</Component>
                </AccumComponents>
            )
        ),
        ({ children }) => <>{children}</>
    )
)


export default ContextProvider(...providers)