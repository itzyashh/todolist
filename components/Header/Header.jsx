import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import logoImg from '../../assets/logo.png'
import { s } from './Header.style'


const Header = () => {
    return (
        <>
            <Image
                resizeMode='contain'
                source={logoImg} style={s.img} />

                <Text style={s.subText}>You have to do something</Text>
        </>
    )
}

export default Header

