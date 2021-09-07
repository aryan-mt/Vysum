import { StyleSheet } from 'react-native'

const palette = {
   green: '#009373',
   lightGreen: "#DFF2EE",
   red: '#CD0E61',
   black: '#0B0B0B',
   white: '#F0F2F3',
}

theme = {
   colors: {
      background: palette.green,
      foreground: palette.black,
      primary: palette.green,
      secondary: palette.lightGreen,
      danger: palette.red,
      failure: palette.red,
   },
   spacing: {
      s: 8,
      m: 16,
      l: 24,
      xl: 40,
   },
   textVariants: {
      header: {
         fontFamily: 'Raleway',
         fontSize: 36,
         fontWeight: 'bold',
      },
      body: {
         fontFamily: 'Merriweather',
         fontSize: 16,
      },
   }
};



export default StyleSheet.create({
   container: {
      backgroundColor: theme.colors.background,
      justifyContent: "center",
      flex: 1,
   },
   header: {
      backgroundColor: "#009373",
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      paddingHorizontal: 50,
      justifyContent: "center",
      flex: 1,
      zIndex: 1
   },
   splashHeader: {
      justifyContent: "center",
      alignItems: "center",
      flex: 2,
   },
   footer: {
      backgroundColor: "white",
      flex: 3,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      paddingVertical: 30,
      paddingHorizontal: '7%',
   },
   splashFooter: {
      backgroundColor: "#009373",
      flex: 1,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      paddingVertical: 30,
      paddingHorizontal: 50,
   },
   headerText: {
      fontSize: 40,
      color: "#fff",
      fontWeight: "bold",
   },
   formContainer: {
      marginVertical: 20,
      borderBottomColor: "grey",
      borderBottomWidth: 1
   },
   formTitle: {
      fontSize: 20,
      marginBottom: 20
   },
   formInput: {
      fontSize: 16,
   },
   button: {
      alignItems: "center",
      marginTop: "30%"
   },
   buttonText: {
      textAlign: "center",
      color: "white",
      fontSize: 16,
      fontWeight: "bold"
   },
   footerContainer: {
      flex: 1,
      alignItems: "center",
      marginTop: 20
   },
   footerText: {
      fontSize: 16,
      color: '#2e2e2d'
   },
   footerLinkText: {
      color: theme.colors.primary,
      fontWeight: "bold",
      fontSize: 16
   },
   boxContainer: {
      flexDirection: "row",
      alignItems:"center",
      justifyContent:"center",
      backgroundColor: "#DFF2EE",
      paddingVertical: "5%",
      paddingHorizontal: "5%",
      borderRadius: 8,
      marginHorizontal: "2%",
      marginVertical: 10,
   },
   shadowBoxContainer: {
      flexDirection: "row",
      alignItems:"center",
      justifyContent:"center",
      backgroundColor: "#DFF2EE",
      paddingVertical: "5%",
      paddingHorizontal: "5%",
      borderRadius: 8,
      marginHorizontal: "2%",
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 2,
      elevation: 8
   },
   medicineText: {
      fontSize: 30,
      color: "black",
   },
   descriptionText: {
      fontSize: 25,
      marginTop: "5%",
      marginLeft: "2%",
      color: "black",
   },
   divider: {
      borderBottomColor: '#cdc0e8',
      borderBottomWidth: 1,
      marginHorizontal: 15,
   },
   voucherContainer: {
      flexDirection:"row", 
      alignItems:"center",
      justifyContent:"flex-start",
      flexWrap: 'wrap', 
      marginVertical:20}
})