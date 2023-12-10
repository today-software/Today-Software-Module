import Select from '@mui/joy/Select'; 
import Option from '@mui/joy/Option';

const MySelect = (props:any) => {
  const style = {
      fontFamily: "'Poppins', sans-serif"
  }

  return (
    <Select style={style} defaultValue={props.defaultValue} variant='soft' value={props.value} onChange={props.onChange} size={props.size}>
      {Object.entries(props.options).map(([key,value]) => (
        <Option key={key} value={value}>
          {key}
        </Option>
      ))}
    </Select>
  );
};

export default MySelect;
