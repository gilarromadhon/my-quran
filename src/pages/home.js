import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E2237'
  },
  title: {
    color: 'white',
    fontSize: '2em',
    fontWeight: 600
  },
  span: {
    color: '#FFCD00',
  },
  icon: {
    color: 'white',
  }
}));

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


export default function Home() {
  const classes = useStyles();
  const history = useNavigate();
  const [data, setData] = useState([]);

  function handleClick() {
    history('/surat');
  }

  const getData = () => {
    fetch('https://equran.id/api/surat')
      .then((res) => res.json())
      .then((res) => {
        // console.log(res[0])
        setData(res)
        localStorage.setItem('data', JSON.stringify(res))
      })
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (data.length !== 0) {
      setTimeout(() => {
        history('/surat');
      }, 2000)
    }
  }, [data, history]);

  return (
      <div className={classes.root}>
        <p className={classes.title}><span className={classes.span}>my</span>Quran</p>
        {/* <ArrowCircleRightIcon className={classes.icon} onClick={handleClick} sx={{ fontSize: 40 }}/> */}
        {/* <Button color='primary' >mulai membaca</Button> */}
        <BarLoader color={("#fff")} loading={true} css={override} size={15} />

      </div>
  );
}
