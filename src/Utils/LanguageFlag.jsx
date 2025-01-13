import PropTypes from 'prop-types';
import Flag from 'react-world-flags';

import { languageToCountry } from '../constants/languageMapping';

const LanguageFlag = ({ languageCode }) => {
    const countryCode = languageToCountry[languageCode];

    if (!countryCode) {
        return <span>⚠️ Bandeira não encontrada</span>;
    }

    return <Flag code={countryCode} style={{ width: 50 }} />;
};

LanguageFlag.propTypes = {
    languageCode: PropTypes.string.isRequired, //
};

export default LanguageFlag;
