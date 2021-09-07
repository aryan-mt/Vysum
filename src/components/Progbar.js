import * as React from 'react';
import {
    Easing,
    TextInput,
    Animated,
    Text,
    View,
    StyleSheet,
} from 'react-native';
import Svg, { G, Circle, Rect } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function Progbar({
    percentage = 50,
    radius = 145,
    strokeWidth = 40,
    duration = 500,
    color = "#009373",
    delay = 0,
    textColor,
    max = 20,
    streak = 0,
}) {

    const animatedValue = React.useRef(new Animated.Value(0)).current
    const circleRef = React.useRef()
    const inputRef = React.useRef()
    const halfCircle = radius + strokeWidth
    const circleCircumference = 2 * Math.PI * radius

    const animation = (toValue) => {
        return Animated.timing(animatedValue, {
            toValue,
            duration,
            delay,
            useNativeDriver: true
        }).start()
    }

    React.useEffect(() => {
        animation(streak)
        animatedValue.addListener((v) => {
            const maxPercentage = 100 * v.value / max
            const strokeDashoffset = circleCircumference - (circleCircumference * maxPercentage) / 100
            if (inputRef?.current) {
                inputRef.current.setNativeProps({
                  text: `${Math.round(v.value)}`,
                });
              }
            if (circleRef?.current) {
                circleRef.current.setNativeProps({
                    strokeDashoffset,
                })
            }
        }, [max, percentage])
        return () => {
            animatedValue.removeAllListeners();
          };
    })
    return (
        <View style={{ width: radius * 2, height: radius * 2 }}>
            <Svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
                <G
                    rotation="-90"
                    origin={`${halfCircle}, ${halfCircle}`}>
                    <Circle
                        cx="50%"
                        cy="50%"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill="transparent"
                        strokeOpacity={0.2}
                    >
                    </Circle>
                    <AnimatedCircle
                        ref={circleRef}
                        cx="50%"
                        cy="50%"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill="transparent"
                        strokeDasharray={circleCircumference}
                        strokeDashoffset={circleCircumference}
                        strokeLinecap="round"
                    >
                    </AnimatedCircle>
                </G>
            </Svg>
            <Text>
                Hi
            </Text>
            <AnimatedTextInput
                ref={inputRef}  
                editable={false}
                defaultValue='0'
                style={{...StyleSheet.absoluteFillObject, fontSize: radius / 2, color: "black", fontWeight:"700", textAlign:"center" }}>
            </AnimatedTextInput>
        </View>
    )
}
