import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image } from 'react-native';

export default function App() {
  const [precoGasolina, setPrecoGasolina] = useState(0.0)
  const  [precoAlcool, setPrecoAlcool] = useState(0.0)

  const [combustivelCalculado, setCombustivelCalculado] = useState(false)
  const [combustivel, setCombustivel] = useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CombustívelApp</Text>


      <View style= {styles.hStack}>
      <View style={styles.containerCombustivel}>
        <Text>Preço do álcool</Text>
          <TextInput
            onChangeText={setPrecoAlcool}
            value={precoAlcool}
            style={styles.input}
            keyboardType='numeric'
          />

          <Image
            source={require('./assets/alcool.jpeg')} // Caminho da imagem na pasta assets
            style={styles.imageCombustivel}
          />
        </View>


        <View style={styles.containerCombustivel}>
          <Text>Preço da gasolina</Text>
          <TextInput 
            onChangeText={setPrecoGasolina}
            value={precoGasolina}
            style={styles.input}
            keyboardType='numeric'
          />

          <Image
            source={require('./assets/gasolina.jpeg')} // Caminho da imagem na pasta assets
            style={styles.imageCombustivel}
          />
        </View>
      </View>
      


      <Button
        title='Submeter'
        onPress={calcularMelhorCombustivel}
      />

      <Button
        title='Limpar'
        onPress={limpar}
      />


    {
      combustivelCalculado? (
        <View style={styles.rectangleResult}>
          <Text>{`O combustível que mais compensa é ${ combustivel }`}</Text>
        </View>
      ) : null
    }
      

      <StatusBar style="auto" />
    </View>
  );

  function calcularMelhorCombustivel () {
    if (precoAlcool <= 0 || precoGasolina <= 0) {
      Alert.alert(
        'Erro!',
        'Valores preenchidos incorretamente.'
      )
    } else {
      const proporcao = precoAlcool / precoGasolina

      if (proporcao < 0.7) {
        setCombustivel('álcool')
        setCombustivelCalculado(true)
      } else {
        setCombustivel('gasolina')
        setCombustivelCalculado(true)
      }
    }
  }

  function limpar () {
    setCombustivel('')
    setCombustivelCalculado(false)
    setPrecoAlcool(0.0)
    setPrecoGasolina(0.0)
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 100
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 75,
    borderRadius: 10
  },

  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'darkOrange',
    justifyContent: 'top',
    bottom: 150
  },

  rectangleResult: {
    width: 300,
    height: 75,
    backgroundColor: 'orange',
    borderRadius: 20,
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },

  imageCombustivel: {
    width: 100,
    height: 100,
    margin: 10
  },

  containerCombustivel: {
    paddingHorizontal: 20
  },

  hStack: {
    flexDirection: 'row', // Organiza os itens em uma linha
    width: '200%', // Largura total para a HStack
    justifyContent: 'space-between'
  }
});