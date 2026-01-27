const colours = {
    pink: {
        500: '#FF99DD',
        400: '#FF99DDCC',
        300: '#FF99DD99',
        200: '#FF99DD66',
        100: '#FF99DD33',
    },
    blue: {
        500: '#9AD7FD',
        400: '#9AD7FDCC',
        300: '#9AD7FD99',
        200: '#9AD7FD66',
        100: '#9AD7FD33',
    },
    turquoise: {
        500: '#99FFFD',
        400: '#99FFFDCC',
        300: '#99FFFD99',
        200: '#99FFFD66',
        100: '#99FFFD33',
    },
    navy: {
        500: '#000080',
        400: '#000080CC',
        300: '#00008099',
        200: '#00008066',
        100: '#00008033',
    },
    white: '#FFFFFF',
    black: '#1C1C1C',
};

export const theme = {
    text: colours.navy['500'],
    backgroundText: colours.navy['300'],
    background: colours.white,
    button: {
        primary: {
            backgroundColor: colours.blue['100'],
            borderColor: colours.turquoise['500']
        }, secondary: {
            backgroundColor: colours.turquoise['100'],
            borderColor: colours.blue['500']
        },
        tertiary: {
            backgroundColor: colours.pink['100'],
            borderColor: colours.turquoise['500']
        }
    },
    border: {
        primary: {
            ...colours.pink
        }, secondary: {
            ...colours.pink
        },
        tertiary: {
            ...colours.turquoise
        }
    }
}
