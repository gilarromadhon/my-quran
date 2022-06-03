import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ChevronLeft';
import ArrowForwardIcon from '@mui/icons-material/ChevronRight';
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
    paddingBottom: '20px',  
  },
  checkBox: {
    [theme.breakpoints.down('md')]: {
      width: '85%',
    },
    [theme.breakpoints.up('md')]: {
      width: '95%',
    },
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '20px',
  },
  checkLabel: {
    marginLeft: '5px',
    color: 'white',
    fontWeight: 600,
    fontSize: '0.8em',
  },
  header: {
    [theme.breakpoints.down('md')]: {
      width: '85%',
    },
    [theme.breakpoints.up('md')]: {
      width: '95%',
    },
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontSize: '1.5em',
    fontWeight: 600
  },
  card: {
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#2A2E46',
    padding: '0 15px 5px 15px',
    borderRadius: '10px',
    position: 'relative',
  },
  content:{
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    textAlign: 'right',
  },
  frame:{
    marginRight: '10px',
    position: 'absolute',
    left: '11px',
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
  nomorSmall:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    width: '30px',
    height: '30px',
    fontSize: '0.6em',
    marginRight: '20px',
  },
  latin: {
    color: 'white',
    fontSize: '0.5em',
    fontWeight: 600,
    textAlign: 'right',
  },
  arti: {
    color: 'white',
    fontSize: '0.7em',
    textAlign: 'right',
    marginTop: '-10px',
  },
  arab: {
    fontSize: '1.2em',
    marginLeft: 'auto',
    color: '#FFCD00',
    textAlign: 'right',
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E2237',
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  next: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    color: 'white',
    fontSize: '0.8em',
    cursor: 'pointer',
    marginTop: '20px',
  },
  nextLabel: {
    fontWeight: 600,
    fontSize: '1em',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextHide: {
    display: 'none',
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

export default function Ayat() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [ayat, setAyat] = useState([]);
  const [color] = useState("#ffffff");
  const { surat } = useParams()
  const history = useNavigate();
  const scrollToTop = useRef();
  const [arti, setArti] = useState(false);

  function setListAyat (ayat) {
    let a = ayat[ayat.length - 1].ar.replace("ࣖ", "")
    let b = ayat[ayat.length - 1]
    delete b.ar
    b.ar = a
    return ayat 
  }

  const getData = () => {
    fetch('https://equran.id/api/surat/' + surat)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setData(res)
        setAyat(setListAyat(res.ayat))
      })
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (data.length !== 0) {
        setIsLoading(false)
        scrollToTop.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  const handleNext = (data) => {
    console.log(data.surat_selanjutnya.id)
    let id = data.surat_selanjutnya.id
    fetch('https://equran.id/api/surat/' + id)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setData(res)
        setAyat(setListAyat(res.ayat))
      })
    history('/ayat/' + id, { state: { id } });
  }

  const handleBack = (data) => {
    console.log(data.surat_sebelumnya.id)
    let id = data.surat_sebelumnya.id
    fetch('https://equran.id/api/surat/' + id)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setData(res)
        setAyat(setListAyat(res.ayat))
      })
    history('/ayat/' + id, { state: { id } });
  }

  function handleHome() {
    history("/surat");
  }

  function handleArti(){
    setArti(!arti)
  }

  return (
      <div>
      {isLoading ? (
        <Box className={classes.loading}>
          <PulseLoader color={color} loading={isLoading} css={override} size={15} />
        </Box>
      ) : (
        <div>
          <Box className={classes.root}>
            <Box className={classes.header} ref={scrollToTop}>
              <ArrowBackIcon color="primary" onClick={handleHome}  sx={{ fontSize: 35, cursor: 'pointer' }} />
              <p className={classes.title}>Surah { data.nama_latin }</p>
            </Box>
            <Box className={classes.checkBox}>
              <input type="checkbox" id="checkbox" onClick={handleArti}/> 
              <span className={classes.checkLabel}>Dengan Arti</span>
            </Box>
            <Box className={classes.body}>
              <Grid container spacing={2}>
                {ayat.map((item, i) => {
                return <Grid item xs={12} key={`ayat-${i}`} >
                  <Box className={classes.card}>
                    <p className={item.nomor > 99 ? classes.nomorSmall : classes.nomor}>{item.nomor}</p>
                    <img src={frame} alt="logo" className={classes.frame}/>
                    <Box className={classes.content}>
                      <p className={classes.arab}>{item.ar}</p> 
                      {
                        arti ? 
                        <p className={classes.arti}>{item.idn}</p> : null
                      }
                      {/* <p className={classes.latin} dangerouslySetInnerHTML={{ __html: item.tr }}></p> */}
                    </Box>
                  </Box>
                </Grid>
                })}
              </Grid>
              <Box className={classes.next}>
                <Grid item xs={5} className={classes.grid} style={{width: '45%', justifyContent: 'flex-start'}}>
                  <Box className={surat === "1" ? classes.nextHide : classes.nextLabel} onClick={() => (handleBack(data))}>
                    <ArrowBackIcon color="primary" sx={{ fontSize: 25 }} />
                    Surat Sebelumnya
                </Box>
                </Grid>
                <Grid item xs={2} className={classes.grid}>
                  <Box>
                    {surat}
                  </Box>
                </Grid>
                <Grid item xs={5} className={classes.grid} style={{width: '45%', justifyContent: 'flex-end'}}>
                  <Box className={surat === "114" ? classes.nextHide : classes.nextLabel} onClick={() => (handleNext(data))}>
                    Surat Selanjutnya
                    <ArrowForwardIcon color="primary" sx={{ fontSize: 25 }} />
                  </Box>
                </Grid>
              </Box>
            </Box>
            <Box className={classes.footer}>
              Developer 
              <i class="ri-github-line" style={{marginLeft: 10}} onClick={() => {window.open("https://github.com/gilarromadhon", "_blank");}}></i>
              <i class="ri-instagram-line" style={{marginLeft: 5}} onClick={() => {window.open("https://instagram.com/gilarromadhon", "_blank");}}></i>
              <i class="ri-linkedin-line" style={{marginLeft: 5}} onClick={() => {window.open("https://linkedin.com/in/gilarromadhon", "_blank");}}></i>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
}
