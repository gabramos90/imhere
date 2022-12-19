import {Home} from './src/screens/Home'
import { StatusBar } from 'react-native';

export default function App() { //aqui tem que ser o default, pois é o padrao do arquvo app
  return (
    <>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Home />
    </>
  );
}