import IconButton from '@mui/joy/IconButton';
import '../css/icon-button.scss'

const MyIconButton = (props: any) => {
  return (
    <IconButton className='icon-button' aria-label='Menu' component='a' variant='plain' color='neutral' onClick={props.onClick}>
     {props.icon}
    </IconButton>
  );
};

export default MyIconButton;