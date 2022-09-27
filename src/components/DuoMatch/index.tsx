import { ActivityIndicator, Alert, Modal, ModalProps, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import * as ClipBoard from 'expo-clipboard'

import { styles } from './styles'
import { THEME } from '../../theme'
import { CheckCircle } from 'phosphor-react-native'
import { Heading } from '../Heading'
import { useState } from 'react'

interface Props extends ModalProps {
    discord: string
    onClose: () => void
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
    const [isCopping, setIsCopping] = useState<boolean>(false)

    async function handleCopyDiscordToClipboard() {
        setIsCopping(true)

        await ClipBoard.setStringAsync(discord)
        Alert.alert('Discord copiado!', 'Usuário salvo na área de transferência. Você pode colar no app do Discord.')

        setIsCopping(false)
    }

    return (
        <Modal
            transparent
            statusBarTranslucent
            animationType='fade'
            onRequestClose={onClose}
            {...rest}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={onClose}
                    >
                        <MaterialIcons
                            name='close'
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>

                    <CheckCircle
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight='bold'
                    />

                    <Heading
                        title="Let's play"
                        subtitle='Agora é só começar a jogar'
                        style={{ alignItems: 'center', marginTop: 24 }}
                    />

                    <Text style={styles.label}>
                        Adicione no Discord
                    </Text>

                    <TouchableOpacity
                        onPress={handleCopyDiscordToClipboard}
                        style={styles.discordButton}
                        disabled={isCopping}
                    >
                        <Text style={styles.discord}>
                            {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}