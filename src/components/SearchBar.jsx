import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBar = (props) => {
const { handleInput } = props;

  return (
    <div className="c-search-bar__wrapper">
      <div className='c-search-bar__wrapper-input'>
        <input className="c-search-bar__input" type="text" placeholder="Search" onChange={(event) => handleInput(event.target.value.toLowerCase())}/>
        <FontAwesomeIcon className='c-search-bar__icon' icon="magnifying-glass" size="2x"/>
      </div>
    </div>
  )
};

export default SearchBar;