import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import { useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css'
import frame from '../assets/frame.png';
import { Grid } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E2237',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0px 30px',
    height: '100%',
    paddingBottom: '20px',  
  },
  header: {
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  search: {
    color: 'white',
  },
  title: {
    color: 'white',
    fontSize: '2em',
    fontWeight: 600
  },
  span:{
    color: '#FFCD00',
  },
  card: {
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#2A2E46',
    padding: '0 20px 0 15px',
    borderRadius: '10px',
    position: 'relative',
    cursor: 'pointer',
    '&:hover': {
      padding: '0 25px 0 15px',
      boxShadow: 'rgba(0, 0, 0, 0.2) 10px 10px 5px',
    }
  },
  content:{
    textAlign: 'left',
  },
  frame:{
    marginRight: '10px',
    position: 'absolute',
    left: '12px',
    width: '35px',
  },
  nomor:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    width: '30px',
    height: '30px',
    fontSize: '0.7em',
    marginRight: '20px',
  },
  latin: {
    color: 'white',
    fontSize: '1em',
    marginBottom: '-10px',
    fontWeight: 600,
  },
  arti: {
    color: 'gray',
    fontSize: '0.8em',
  },
  arab: {
    fontSize: '1.2em',
    marginLeft: 'auto',
    color: '#FFCD00',
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E2237',
  },
  footer: {
    width: '100%',
    height: '60px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A2E46',
    color: 'white',
    fontSize: '0.7em',
  },
}));

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Surat() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [color] = useState("#ffffff");
  const history = useNavigate();

  const getData = () => {
    fetch('https://equran.id/api/surat')
      .then((res) => res.json())
      .then((res) => {
        console.log(res[0])
        setData(res)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (data.length !== 0) {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
  }, [data]);

  const handleClick = (UserId) => {
    console.log(UserId)
    history('/ayat/' + UserId, { state: { UserId } });
  }

  return (
      <div sx={{backgroundColor: 'red'}}>
      {isLoading ? (
        <Box className={classes.loading}>
          <PulseLoader color={color} loading={isLoading} css={override} size={15} />
        </Box>
      ) : (
        <div>
          <Box className={classes.root}>
            <Box className={classes.header}>
              {/* <Tooltip title="Not Available">
                <IconButton>
                  <i class="ri-book-mark-line" style={{color: 'white', fontSize: '20px'}} ></i>
                </IconButton>
              </Tooltip> */}
              <Box></Box>
              <p className={classes.title}><span className={classes.span}>my</span>Quran</p>
              <Box></Box>
              {/* <Tooltip title="Not Available">
                <IconButton>
                  <i class="ri-search-line" style={{color: 'white', fontSize: '20px'}} ></i>
                </IconButton>
              </Tooltip> */}
            </Box>
            <Box className={classes.body}>
              <Grid container spacing={2}>
                {data.map((item, i) => {
                return <Grid item xs={12} md={6} lg={4} key={`data-${i}`} >
                  <Box className={classes.card} onClick={() => (handleClick(item.nomor))}>
                    <p className={classes.nomor}>{item.nomor}</p>
                    <img src={frame} alt="logo" className={classes.frame}/>
                    <Box className={classes.content}>
                      <p className={classes.latin}>{item.nama_latin}</p>
                      <p className={classes.arti}>{item.arti} <br/> {item.jumlah_ayat} Ayat</p>
                    </Box>
                    <p className={classes.arab}>{item.nama}</p> 
                  </Box>
                </Grid>
                })}
              </Grid>
            </Box>
          </Box>
            <Box className={classes.footer}>
              Developer 
              <i class="ri-github-line" style={{marginLeft: 10}} onClick={() => {window.open("https://github.com/gilarromadhon", "_blank");}}></i>
              <i class="ri-instagram-line" style={{marginLeft: 5}} onClick={() => {window.open("https://instagram.com/gilarromadhon", "_blank");}}></i>
              <i class="ri-linkedin-line" style={{marginLeft: 5}} onClick={() => {window.open("https://linkedin.com/in/gilarromadhon", "_blank");}}></i>
            </Box>
        </div>
      )}
    </div>
  );
}
