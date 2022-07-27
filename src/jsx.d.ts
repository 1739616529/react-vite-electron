import * as React from "react";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            item: React.DetailedHTMLProps<HTMLElement>;
        }
    }
}
