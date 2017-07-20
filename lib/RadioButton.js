import React, {Component, PropTypes} from "react";
import {StyleSheet, Text, View, TouchableHighlight, Dimensions} from "react-native";
import Icon from './Icon';
import IconToggle from './IconToggle';
import Button from './Button'
import { TYPO, PRIMARY, COLOR, THEME_NAME, PRIMARY_COLORS } from './config';

const typos = StyleSheet.create(TYPO);

export default class RadioButton extends Component {

    static propTypes = {
        label: PropTypes.string,
        theme: PropTypes.oneOf(THEME_NAME),
        primary: PropTypes.oneOf(PRIMARY_COLORS),
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        onSelect: PropTypes.func
    };

    static defaultProps = {
        theme: 'light',
        primary: PRIMARY,
        disabled: false
    };

    render() {
        const { theme, primary, value, checked, disabled, onSelect } = this.props;
        const primaryColor = COLOR[`${primary}500`].color;

        let status = (()=> {
            if (disabled) {
                return 'disabled'
            } else if (checked) {
                return 'checked'
            } else {
                return 'default'
            }
        })();

        const colorMap = {
            light: {
                disabled: '#000',
                checked: primaryColor,
                default: '#000'
            },
            dark: {
                disabled: '#fff',
                checked: primaryColor,
                default: '#fff'
            }
        };

        const opacityMap = {
            light: {
                checked: 1,
                default: 0.54,
                disabled: 0.26
            },
            dark: {
                checked: 1,
                default: 0.7,
                disabled: 0.3
            }
        };

        const underlayMap = {
            light: 'rgba(0,0,0,.12)',
            dark: 'rgba(255,255,255,.12)'
        }

        const labelColorMap = {
            light: '#000',
            dark: '#fff'
        };

        const CURR_COLOR = colorMap[theme][status];
        const OPACITY = opacityMap[theme][status];
        const LABEL_COLOR = labelColorMap[theme];
        const UNDERLAY_COLOR = underlayMap[theme];
        const UNCHECKED_COLOR = 'rgba(0,0,0,0)';
        const CHECKED_COLOR = '#ffbb00';

        return (
            <TouchableHighlight
                onPress={() => { disabled && !checked ? null : onSelect(value) }}
                underlayColor={disabled ? '#fefefe' : '#fefefe'}
                activeOpacity={1}
                style={{paddingVertical: 10}}
            >
                <View style={[styles.container
                , {backgroundColor:!checked ? UNCHECKED_COLOR : CHECKED_COLOR}
                ]} >
                    <IconToggle
                        disabled={disabled}
                        color={CURR_COLOR}
                        onPress={() => { disabled && !checked ? null : onSelect(value) }}
                    >
                        <Icon name={checked ? 'radio-button-checked' : 'radio-button-unchecked'}
                              size={24}
                              color={CURR_COLOR}
                              style={{
                                  opacity: OPACITY,
                                  margin: 16
                              }}
                        />
                    </IconToggle>
                    <View style={styles.labelContainer}>
                        <Text
                            style={styles.label}
                        >
                            {this.props.label}
                        </Text>
                                                <Text
                            style={styles.sublabel}
                        >
                            {this.props.sublabel}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fefefe',
        paddingVertical: 10,
        opacity: 1,
        borderRadius: 4,
        borderColor: '#949494',
        borderWidth: 1,
    },
	labelContainer: {
        // flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
	},
    label: {
        marginLeft: 16,
        opacity: COLOR.darkPrimaryOpacity.opacity,
        fontSize: 26,
    },
    sublabel: {
        marginLeft: 16,
        opacity: COLOR.darkPrimaryOpacity.opacity,
    }
});