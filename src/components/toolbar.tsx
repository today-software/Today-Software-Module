import React , {useState, useEffect} from 'react';
import '../css/toolbar.scss';
import {Button , Box , Select, Option} from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';




function Toolbar() {
  const [view,setView] = useState('Day')
  const [showTime,setShowTime] = useState('')
  const date = '01'
  const month= 'January'
  const year='2022'
  const week='01-07'

  useEffect(()=> {
    console.log(view)
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
    console.log(event)
    setView(value);
    console.log(view);
  };


  return (
    <div className='toolbar'>
       <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
        <div className='left-content'>
          <IconButton aria-label="Menu" component="a" variant="plain" color="neutral">
              <MenuIcon />
            </IconButton>
          <h1>{showTime}</h1>
          <div  className='select-view-component'>    
            <Select defaultValue="Day" variant='soft' value={view} onChange={handleChange} size="sm">
              <Option value='Day'>Day</Option>
              <Option value='Week'>Week</Option>
              <Option value={'Month'}>Month</Option>
              <Option value={'Year'}>Year</Option>
            </Select>  
          </div>  
        </div>
        <div className='right-content'>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <IconButton aria-label="Search" component="a" href="#as-link" variant="soft" color="primary">
              <SearchIcon />
            </IconButton>
            
            <div className='add-event-button-full'>
              <Button  component="a" href="#as-link" endDecorator={<AddCircleOutlinedIcon />}>
                Add Event
              </Button>
            </div>
            <div className='add-event-button-full-mobile'>
              <IconButton aria-label="Add Event" component="a" href="#as-link" variant="solid" color="primary">
                <AddCircleOutlinedIcon />
              </IconButton>
            </div>

            
          </Box>
         
          
          
        </div>
      </Box>
    </div>
  );
}

export default Toolbar;
