import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

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
    fontFamily: 'Poppins',
    fontWeight: 600
  },
  span: {
    color: '#FFCD00',
  },
  icon: {
    color: 'white',
  }
}));

export default function Home() {
  const classes = useStyles();
  const history = useNavigate();

  function handleClick() {
    history('/surat');
  }

  return (
      <div className={classes.root}>
        <p className={classes.title}><span className={classes.span}>my</span>Quran</p>
        <ArrowCircleRightIcon className={classes.icon} onClick={handleClick} sx={{ fontSize: 40 }}/>
        {/* <Button color='primary' >mulai membaca</Button> */}
      </div>
  );
}
