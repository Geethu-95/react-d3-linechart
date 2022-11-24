import React, { useEffect, useState } from "react";
import Data from "./Data";
import { Grid, Typography } from "@mui/material";

function App() {
    return (
        <>
            <Grid container >

                <Grid item xs={12}>
                    <Typography variant='h5' align="left">Hi Geethika!</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Data />
                </Grid>
            </Grid>

        </>
    );

}


export default App