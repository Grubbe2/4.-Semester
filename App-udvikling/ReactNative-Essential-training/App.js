
import { StyleSheet, Text, View } from 'react-native';
import Game from './src/components/Game'



export default function App() {
  return (
    <Game randomNumberCount={6}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
