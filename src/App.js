import React, { useEffect, useState } from "react";
import Data from "./Data";
import { Grid, Typography } from "@mui/material";
import LineGraph from "./LineGraph";
import axios from 'axios';

function App() {

    const [data, setData] = useState([]);

    axios.get('http://fetest.pangeatech.net/data')
    .then(response => setData(response.data))
    .catch(error => {
        console.log('There was an error',error);
    })

    return (
        <>
            <Grid container >

                <Grid item xs={12}>
                    <Typography variant='h5' align="left">Hi Geethika!</Typography>
                </Grid>

                <Grid item xs={12}>
                    <LineGraph data={data}/>
                </Grid>

                <Grid item xs={12}>
                    <Data data={data}/>
                </Grid>
            </Grid>

        </>
    );

}


export default App