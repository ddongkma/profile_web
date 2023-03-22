import './GlobalStyles.scss'
import PropTypes from 'prop-types';

function GlobalStyles({ children }) {
    return children
}

GlobalStyles.PropTypes = {
    children: PropTypes.node.isRequired,
}
export default GlobalStyles