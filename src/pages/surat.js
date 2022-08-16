import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css'
import frame from '../assets/frame.png';
import { Grid, IconButton, TextField } from "@mui/material";
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
      boxShadow: 'rgba(0, 0, 0, 0.1) 5px 5px 3px',
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
    '&:hover': {
      color: '#FFCD00',
    }
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
  quote: {
    color: '#FFCD00',
    fontSize: '1em',
    margin: '30px 0',
    padding: '0 30px',
    textAlign: 'center',
    width: '75%',
  },
}));

export default function Surat() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [quote, setQuote] = useState([]);
  const [search, setSearch] = useState(false);
  const history = useNavigate();
  const [searchSurat, setSearchSurat] = useState(null);

  useEffect(() => {
    var surat = JSON.parse(localStorage.getItem('data'));
    setData(surat);

    var quote = [
      "",
      "Bacalah Al-Qur'an mu, agar selamat kehidupan dunia dan akhiratmu.",
      "Membaca Al-Qur'an adalah wajib bagimu, yuk kita baca sekarang.",
      "Membaca Al-Qur'an itu banyak manfaatnya, selain sebagai penolong juga bisa mengobati kesedihan.",
      "Al-Qur'an adalah cahaya. Bacalah Al-Qur'an dan kumpulkan cahaya penerangmu sebanyak-banyaknya.",
      "Al-Qur'an adalah petunjuk. Kalau gak dibaca kita tidak tau apa yang ditunjukkan didalamnya.",
      "Jika kamu menjadikan Al-Qur'an sebagai panduan, maka kamu tidak akan pernah kehilangan arah.",
      "Bacalah Al-Qur'an, karena ia akan memberikan syafaat di hari kiamat kelak kepada para pembacanya.",
      "Al-Qur'an itu menakjubkan. Meski kamu baca berulang-ulang, kamu tetap menemukan keajaiban yang tidak kamu sadari sebelumnya.",
      "Hidup tanpa Al-Qur'an bagaikan kapal tanpa nahkoda.",
      "Sebaik-baik di antara kalian adalah yang mempelajari Al-Qur'an dan mengajarkannya.",
    ]
    let randomNumber = Math.floor(Math.random()*(10-1+1)+1)
    setQuote(quote[randomNumber]);
    console.log(randomNumber);
  }, [])

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
      <div>
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
                <Grid item xs={12}>
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
              <Grid container justifyContent={"center"}>
                <p className={classes.quote}>{quote}</p>
                {
                  searchSurat ? <p className={classes.quote}>Hasil Pencarian</p> : ''
                }
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
              <i className="ri-github-line" style={{marginLeft: 10}} onClick={() => {window.open("https://github.com/gilarromadhon", "_blank");}}></i>
              <i className="ri-instagram-line" style={{marginLeft: 5}} onClick={() => {window.open("https://instagram.com/gilarromadhon", "_blank");}}></i>
              <i className="ri-linkedin-line" style={{marginLeft: 5}} onClick={() => {window.open("https://linkedin.com/in/gilarromadhon", "_blank");}}></i>
            </Box>
        </div>
    </div>
  );
}
