import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import { useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css'
import frame from '../assets/frame.png';
import { Grid, IconButton, TextField, Tooltip } from "@mui/material";
import Collapse from '@mui/material/Collapse';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#1E2237',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
    marginBottom: '50px',

  },
  header: {
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
    [theme.breakpoints.up('md')]: {
      width: '95%',
    },
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  search: {
    color: 'white',
    marginBottom: '30px',
    padding: '0px 30px',
  },
  input: {
    color: 'white',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: '4px',
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
    padding: '0 20px 0 15px',
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
  suratContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  noSurat: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  const [search, setSearch] = useState(false);
  const [color] = useState("#ffffff");
  const history = useNavigate();
  const [searchSurat, setSearchSurat] = useState(null);

  const getData = () => {
    fetch('https://equran.id/api/surat')
      .then((res) => res.json())
      .then((res) => {
        // console.log(res[0])
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

  const handleSearch = () => {
    setSearch(!search)
    if(!search === true) {
      setSearchSurat(null)
    }
  }

  const handleClick = (UserId) => {
    console.log(UserId)
    history('/ayat/' + UserId, { state: { UserId } });
  }

  const bySearch = (data, searchSurat) => {
    if (searchSurat) {
      return data.nama_latin.toLowerCase().includes(searchSurat.toLowerCase());
    } else return data;
  };

  const filteredList = (data, searchSurat) => {
    return data.filter((datas) => bySearch(datas, searchSurat));
  };

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
              <p className={classes.title}>
                <span className={classes.span}>my</span>Quran
              </p>
              <IconButton onClick={handleSearch}>
                <i className='ri-search-line' style={{ color: 'white', fontSize: '20px' }}></i>
              </IconButton>
            </Box>
            <Box className={classes.body}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={12}>
                    <Collapse in={search} className={classes.search}>
                      <TextField
                      id="filled-basic"  variant="filled"
                        label='Cari Surat'
                        type='search'
                        className={classes.input}
                        nam="searchSurat"
                        onChange={(e) => setSearchSurat(e.target.value) }
                      />
                    </Collapse>
                </Grid>
              </Grid>
              <Grid container className={filteredList(data, searchSurat).length !== 0 ? classes.suratContainer : classes.noSurat}>
                { filteredList(data, searchSurat).length !== 0 ? filteredList(data, searchSurat).map((item, i) => (
                  <Grid item xs={12} md={6} lg={4} key={`data-${i}`}>
                    <Box className={classes.card} style={ item.nomor%2 === 0 ? {backgroundColor: '#1E2237'} : {backgroundColor: '#2A2E46'} }  onClick={() => handleClick(item.nomor)}>
                      <p className={classes.nomor}>{item.nomor}</p>
                      <img src={frame} alt='logo' className={classes.frame} />
                      <Box className={classes.content}>
                        <p className={classes.latin}>{item.nama_latin}</p>
                        <p className={classes.arti}>
                          {item.arti} <br /> {item.jumlah_ayat} Ayat
                        </p>
                      </Box>
                      <p className={classes.arab}>{item.nama}</p>
                    </Box>
                  </Grid>
                )) : 
                (
                    <p className={classes.latin}>Tidak ada surat {searchSurat}</p>
                )}
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
