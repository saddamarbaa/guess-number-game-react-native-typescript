import {
	StyleSheet,
	TextInput,
	View,
	ImageBackground,
	Alert,
} from 'react-native'
import { Card, PrimaryButton } from '../components'
import { LinearGradient } from 'expo-linear-gradient'

import { RootTabScreenProps } from '../types'
import { useState } from 'react'
import { colors } from '../constants'

export default function StartGameScreen({
	navigation,
}: RootTabScreenProps<'StartGame'>) {
	const [enteredNumber, setEnteredNumber] = useState('')

	const numberInputHandler = (enteredNumber: string) =>
		setEnteredNumber(enteredNumber)

	const restInputHandler = () => setEnteredNumber('')

	const confirmInputHandler = () => {
		const re = /^\d*(\.\d+)?$/

		const chosenNumber = parseInt(enteredNumber)
		if (!enteredNumber.match(re) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert(
				'Invalid number',
				'Number has to be a number between 0 and 99',
				[{ text: 'ok', style: 'destructive', onPress: restInputHandler }],
			)
			return
		} else {
			// api call
			navigation.navigate('Game', {
				userPickedNumber: '3',
			})

			console.log('vaild number')
		}
	}

	return (
		<LinearGradient colors={colors.gradient} style={styles.container}>
			<ImageBackground
				source={require('../assets/images/background.png')}
				resizeMode="cover"
				style={styles.container}
				imageStyle={styles.backgroundImage}>
				<Card style={styles.card}>
					<TextInput
						style={styles.input}
						maxLength={2}
						keyboardType="number-pad"
						autoCapitalize="none"
						autoCorrect={false}
						value={enteredNumber}
						onChangeText={numberInputHandler}
						selectionColor={colors.yellow500}
					/>
					<View style={styles.buttonsContainer}>
						<PrimaryButton
							buttonTitle="Confirm"
							onPress={confirmInputHandler}
							buttonOuterContainerStyle={styles.buttonOuterContainerStyle}
							buttonInnerContainerStyle={styles.buttonInnerContainer}
							androidRippleColor={colors.primary600}
						/>
						<PrimaryButton
							buttonTitle="Rest"
							onPress={restInputHandler}
							buttonOuterContainerStyle={styles.buttonOuterContainerStyle}
							buttonInnerContainerStyle={styles.buttonInnerContainer}
							androidRippleColor={colors.primary600}
						/>
					</View>
				</Card>
			</ImageBackground>
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	card: {
		marginTop: 100,
		backgroundColor: colors.primary800,
		marginHorizontal: 20,
		alignItems: 'center',
	},
	buttonsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	buttonOuterContainerStyle: {
		margin: 4,
		flex: 1,
		borderRadius: 28,
	},
	buttonInnerContainer: {
		backgroundColor: colors.primary500,
		elevation: 2,
	},
	input: {
		height: 50,
		fontSize: 32,
		borderBottomColor: colors.yellow500,
		borderBottomWidth: 2,
		color: colors.yellow500,
		marginHorizontal: 8,
		fontWeight: 'bold',
		marginBottom: 8,
		width: '100%',
		maxWidth: 70,
		textAlign: 'center',
	},
	backgroundImage: {
		opacity: 0.5,
	},
})
