import PropTypes from 'prop-types'
import Button from './Button'


const Header = (props) => {
    return (
        <header className='header'>
            <h1 style={headingStyle}>{props.title}</h1>
            <Button 
            color={ props.showPlus ? 'red' :'green'}
            text={ props.showPlus ? 'Cancel' :'Plus'}
            onClick={props.onShow}>
            </Button>
        </header>
    )
}

Header.defaultProps ={
    title: 'Track ToDos',
}

Header.propTypes = {
    title:PropTypes.string.isRequired,
}

//CSS in JS
const headingStyle ={
    color:'red', backgroundColor:'black', textAlign:'center',
}

export default Header