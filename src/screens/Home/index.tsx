import { Text, View, TextInput, TouchableOpacity, /* ScrollView */ FlatList, Alert } from "react-native"
import { Participant } from "../../components/Participant"
import React, { useState } from "react"

import { styles } from './styles'


export function Home() {
    const [participants, setPaticipants] = useState<string[]>([])
    const [participantName, setParticipantName] = useState('') // estados sao assyncronos

    function handleParticipantAdd() {
        if (participantName === "") {
            return Alert.alert('Nome inválido', "Por favor, insira o nome do participante para continuar.")
        }

        if (participants.includes(participantName)) {
            return Alert.alert("Participante Existe", "Já existe um participante na lista com esse nome.")
        }

        setPaticipants(prevState => [...prevState, participantName])
        setParticipantName('')
    }

    function handleParticipantRemove(name: string) { 
        

        Alert.alert('Remover', `Remover o participante ${name}?`, [
            {
                text: 'Sim',
                onPress: () => setPaticipants(prevState => prevState.filter(participant => participant !== name))
            },
            {
                text: 'Não',
                style: 'cancel',
            }
        ])
        console.log(`Voçê clicou em remover o participante ${name}`)
    }


    return (
        <View style={styles.container}>
            <Text
                style={styles.eventName}>
                Nome do evento
            </Text>

            <Text style={styles.eventDate}>
                Sexta, 24 de novembro de 2022
            </Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='Nome do participante'
                    placeholderTextColor={'#6B6B6B'}
                    onChangeText={setParticipantName}
                    value={participantName}
                />

                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList // lida com map automaticamente || usado para crrregar componentes grandes
                data={participants}
                /* data={[]} array vazio no react native*/
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Participant
                        key={item}
                        name={item}
                        onRemove={() => handleParticipantRemove(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou no evento ainda? Adicione participantes a sua lista de espera
                    </Text>
                )}
            />
            {/*  <ScrollView showsVerticalScrollIndicator={false}> */}
            {/* {participants.map(participant => (
                  
                ))} */}
            {/* </ScrollView> melhor para componentes pequenos*/}
        </View>
    )
}
