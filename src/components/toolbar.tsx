import React , {useState, useEffect} from 'react';
import '../css/toolbar.scss';
import {Box} from '@mui/joy';
import MyIconButton from './icon-button';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import MyButton from './button';
import MySelect from './select';

const Toolbar = () => {
  const [view,setView] = useState('Day')
  const [showTime,setShowTime] = useState('')
  const date = '01'
  const month= 'January'
  const year='2022'
  const week='01-07'

  useEffect(()=> {
    switch(view) {
      case 'Day':
        setShowTime([date,month,year].join(' '))
        break;
      case 'Week':
        setShowTime([week,month,year].join(' '))
        break;
      case 'Month':
        setShowTime([month,year].join(' '))
      break;
      case 'Year':
        setShowTime(year);
      break;
      default:      
    } 
  },[view])

  const handleChange = (event:any) => {
    const value = event.target.innerText
    setView(value);
  };

  const handleMenu = () => {
  }

  const handleSearch = () => {
  }

  const handleAddEvent = () => {
  }

  const viewOptions = {
    Day: 'Day',
    Week: 'Week',
    Month: 'Month',
    Year: 'Year',
  };

  return (
    <div className='toolbar'>
       <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
        <div className='left-content'>
          <MyIconButton onClick={handleMenu} icon={<MenuIcon/>}/>
          <h1>{showTime}</h1>
          <div  className='select-view-component'>   
            <MySelect value={view} onChange={handleChange} options={viewOptions} defaultValue='Day' size='sm' /> 
          </div>  
        </div>
        <div className='right-content'>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <MyIconButton onClick={handleSearch} icon={<SearchIcon/>}/>
            <div className='add-event-button-full'>
              <MyButton onClick={handleAddEvent} icon={<AddCircleOutlinedIcon/>} text={"Add Event"}/>
            </div>
            <div className='add-event-button-full-mobile'>
              <MyIconButton onClick={handleAddEvent} icon={<AddCircleOutlinedIcon />}/>
            </div>       
          </Box>        
        </div>
      </Box>
    </div>
  );
}

export default Toolbar;
