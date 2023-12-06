import './App.css';
import { useAgeSelector } from './store/slices/ageSlice';
import { useCountrySelector } from './store/slices/countrySlice';
import { useGenderSelector } from './store/slices/genderSlice';
import { useNameSelector } from './store/slices/nameSlice';

function App() {
    const name = useNameSelector();
    const age = useAgeSelector();
    const country = useCountrySelector();
    const gender = useGenderSelector();
  return (
      <div>
        {name.name && (
          <ul>
            <li>{name.name}</li>
            <li>{age.age}</li>
            <li>{country.country}</li>
            <li>{gender.gender}</li>
          </ul>
        )}
      </div>
  );
}

export default App;
