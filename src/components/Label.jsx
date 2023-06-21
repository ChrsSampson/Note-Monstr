// Label Component (refactor of the old Area)

import { useState } from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";


export default function Label ({text, color, updatePosition, remove, id}) {
    
    
    
    return (
        <div key={id}>
            <h4>{text || "Untitled"}</h4>
        </div>
    )
}

